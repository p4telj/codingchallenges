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
