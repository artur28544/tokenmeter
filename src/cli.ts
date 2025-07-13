import { Command } from "commander";
import { readFileSync } from "fs";
import { countTokens } from "./counter.js";
import { estimateCost, listModels } from "./pricing.js";

const program = new Command();

program
  .name("tokenmeter")
  .description("Token counter and LLM cost estimator")
  .version("0.2.0");

program
  .command("count")
  .description("Count tokens in text or file")
  .option("-f, --file <path>", "read from file")
  .option("-t, --text <text>", "count tokens in text")
  .option("-m, --model <model>", "model for tokenizer", "gpt-4")
  .option("--json", "output as JSON")
  .action((opts) => {
    let text: string;
    if (opts.file) {
      text = readFileSync(opts.file, "utf-8");
    } else if (opts.text) {
      text = opts.text;
    } else {
      console.error("provide --file or --text");
      process.exit(1);
    }
    const result = countTokens(text, opts.model);
    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`tokens:     ${result.tokens}`);
      console.log(`characters: ${result.characters}`);
      console.log(`words:      ${result.words}`);
      console.log(`lines:      ${result.lines}`);
    }
// todo: performance
  });

program
  .command("cost")
  .description("Estimate cost for token count")
  .requiredOption("-i, --input <tokens>", "input token count")
  .option("-o, --output <tokens>", "output token count", "0")
  .option("-m, --model <model>", "specific model")
  .option("-p, --provider <provider>", "specific provider")
  .option("--json", "output as JSON")
  .action((opts) => {
    const estimates = estimateCost(
      parseInt(opts.input),
      parseInt(opts.output),
      opts.model,
      opts.provider
    );
// refactor: improve this
    if (opts.json) {
      console.log(JSON.stringify(estimates, null, 2));
    } else {
      for (const e of estimates) {
        console.log(`${e.provider}/${e.model}: $${e.totalCost.toFixed(6)}`);
      }
    }
  });

program
  .command("models")
  .description("List supported models")
// refactor: improve this
  .action(() => {
    for (const m of listModels()) {
      console.log(`${m.provider}/${m.model}`);
    }
  });

program.parse();


