import util from "node:util";
import { exec as syncExec } from "node:child_process";
import { analyze } from "../src/analyze.js";

const exec = util.promisify(syncExec);

describe("analyze()", () => {
  it("passes for the art of war", async () => {
    // arrange
    const file = "test/the-art-of-war.txt";
    let res = await exec(`wc -l -w -c ${file}`);
    const split = res.stdout.trim().split(/\s+/);
    const expectedLineCount = parseInt(split[0]);
    const expectedWordCount = parseInt(split[1]);
    const expectedByteCount = parseInt(split[2]);
    res = await exec(`wc -m ${file}`);
    const expectedCharCount = parseInt(res.stdout.trim().split(/\s+/)[0]);
    // act
    const counts = await analyze(
      {
        countBytes: true,
        countChars: true,
        countLines: true,
        countWords: true,
      },
      file
    );
    // assert
    expect(counts.bytes).toEqual(expectedByteCount);
    expect(counts.chars).toEqual(expectedCharCount);
    expect(counts.lines).toEqual(expectedLineCount);
    expect(counts.words).toEqual(expectedWordCount);
  });
});
