import { HelpText, Options } from "./entities.js";

function validateOpts(opts: string[]): Options {
  const agg = opts
    .reduce((acc, opt) => {
      if (opt[0] !== "-") {
        console.error("Error: invalid option(s) format. Requires '-' (ex. -c)");
        console.info(HelpText);
        process.exit(1);
      }
      return acc + opt.slice(1);
    }, "")
    .split("");

  agg.forEach((opt) => {
    if (!"clmw".includes(opt)) {
      console.error("Error: invalid option(s) passed");
      console.info(HelpText);
      process.exit(1);
    }
  });

  return {
    countBytes: agg.includes("c"),
    countChars: agg.includes("m"),
    countLines: agg.includes("l"),
    countWords: agg.includes("w"),
  };
}

export function validate(opts: string[], file?: string): Options {
  if (!file) {
    console.error("Error: <file> is required");
    console.info(HelpText);
    process.exit(1);
  }
  if (opts.length) {
    return validateOpts(opts);
  }
  return {
    countBytes: true,
    countChars: true,
    countLines: true,
    countWords: true,
  };
}
