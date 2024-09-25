export const HelpText = `
Usage: ccwc -[clwm] <file>

Optional flags: -[clwm]

-c = number of bytes in <file>
-l = number of lines in <file>
-m = number of chars in <file>
-w = number of words in <file>
`;

export type Options = {
  countBytes: boolean;
  countLines: boolean;
  countWords: boolean;
  countChars: boolean;
};
