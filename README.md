# tokenmeter

Token counter and LLM cost estimator. Counts tokens for any text and estimates API costs across OpenAI, Anthropic and Google models.

## Install

```
npm install
npm run build
```

## CLI

```bash
# count tokens in a file
node dist/cli.js count --file README.md

# count tokens in text
node dist/cli.js count --text "hello world" --model gpt-4o

# estimate cost
node dist/cli.js cost --input 10000 --output 2000 --provider openai

# list models
node dist/cli.js models
```

## API

```typescript
import { countTokens, estimateCost } from "tokenmeter";

const result = countTokens("hello world", "gpt-4o");
console.log(result.tokens);

const costs = estimateCost(1000, 500, "gpt-4o");
console.log(costs[0].totalCost);
```

## License

MIT



