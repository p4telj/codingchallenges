#!/usr/bin/env node

import process from "process";
import { validate } from "./validate.js";
import { analyze } from "./analyze.js";

export default async function main() {
  const args = process.argv.slice(2);
  const opts = args.slice(0, args.length - 1);
  const file = args[args.length - 1];

  await analyze(validate(opts, file), file);
}

await main();
