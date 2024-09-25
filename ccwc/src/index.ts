#!/usr/bin/env node

import process from "process";
import { validate } from "./validate.js";

export default function main() {
  const args = process.argv.slice(2);
  const opts = args.slice(0, args.length - 1);
  const file = args[args.length - 1];

  const input = validate(opts, file);
  console.log("input", input);
}

main();
