export const HelpText = `
Usage: ccwc -[(c|m)lw] <file>

Optional flags: -[(c|m)lw]

-c = number of bytes in <file>, conflicts with -m
-l = number of lines in <file>
-m = number of chars in <file>, conflicts with -c
-w = number of words in <file>
`;

export type Options = {
  countBytes: boolean;
  countLines: boolean;
  countWords: boolean;
  countChars: boolean;
};

export type Counts = {
  bytes: number;
  lines: number;
  words: number;
  chars: number;
};

export function initCounts(): Counts {
  return {
    bytes: 0,
    lines: 0,
    words: 0,
    chars: 0,
  };
}

export type Chunk = {
  raw: Buffer;
  adjusted: string;
  remainingChars: string;
  prevChunkEndedOnSameLine: boolean;
};

export function initChunk(): Chunk {
  return {
    raw: Buffer.from(""),
    adjusted: "",
    remainingChars: "",
    prevChunkEndedOnSameLine: false,
  };
}
