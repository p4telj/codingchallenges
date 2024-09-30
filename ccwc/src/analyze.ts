import fs from "node:fs";
import path from "node:path";
import process from "process";
import { Chunk, Counts, initChunk, initCounts, Options } from "./entities.js";

function output(opts: Options, file: string, counts: Counts): void {
  if (opts.countLines) {
    process.stdout.write(counts.lines + "\t");
  }
  if (opts.countWords) {
    process.stdout.write(counts.words + "\t");
  }
  if (opts.countBytes) {
    process.stdout.write(counts.bytes + "\t");
  }
  if (opts.countChars) {
    process.stdout.write(counts.chars + "\t");
  }
  process.stdout.write(file + "\n");
}

function countBytes(chunk: Chunk): number {
  return chunk.raw.byteLength;
}

function countLines(chunk: Chunk): number {
  const lines = chunk.adjusted.split("\r\n");
  if (chunk.prevChunkEndedOnSameLine) {
    lines.pop();
  }
  return lines.length;
}

function countWords(chunk: Chunk): number {
  return chunk.adjusted.trim().split(/\s+/).length;
}

function countChars(chunk: Chunk): number {
  return chunk.raw.toLocaleString().length;
}

function adjustChunk(prevChunk: Chunk, buffer: Buffer): Chunk {
  let chunk = initChunk();
  chunk.raw = buffer;

  // handle line splitting
  chunk.prevChunkEndedOnSameLine = !/\s/.test(prevChunk.remainingChars);

  let newChunkStr = buffer.toString("utf-8");
  if (prevChunk.remainingChars) {
    // need to prepend remaining chars of previous chunk to piece words together
    newChunkStr = prevChunk.remainingChars + newChunkStr;
  }

  // determine remaining chars of new chunk
  let ind = newChunkStr.length - 1;
  while (!/\s/.test(newChunkStr.charAt(ind))) {
    chunk.remainingChars = newChunkStr.charAt(ind) + chunk.remainingChars;
    ind--;
  }

  // remove remaining chars of split word from new chunk
  chunk.adjusted = newChunkStr.slice(0, ind + 1);

  return chunk;
}

export async function analyze(opts: Options, file: string): Promise<Counts> {
  try {
    const counts = initCounts();
    const stream = fs.createReadStream(path.resolve(file));
    // we are creating a read stream to account for large files
    // that cannot be loaded into memory.
    //
    // however, this will have issues of its own:
    // 1. chunks may split words
    // 2. chunks may split lines
    //
    // to handle this, we will adjust each chunk accordingly
    let chunk = initChunk();
    for await (const buffer of stream) {
      chunk = adjustChunk(chunk, buffer);

      if (opts.countLines) {
        counts.lines += countLines(chunk);
      }
      if (opts.countWords) {
        counts.words += countWords(chunk);
      }
      if (opts.countBytes) {
        counts.bytes += countBytes(chunk);
      }
      if (opts.countChars) {
        counts.chars += countChars(chunk);
      }
    }

    output(opts, file, counts);
    return counts;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
