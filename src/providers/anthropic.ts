import { PricingTable } from "../types.js";

export const anthropicPricing: PricingTable = {
  "claude-3-5-sonnet": { inputPerMillion: 3.00, outputPerMillion: 15.00 },
  "claude-3-5-haiku": { inputPerMillion: 0.80, outputPerMillion: 4.00 },
  "claude-3-opus": { inputPerMillion: 15.00, outputPerMillion: 75.00 },
  "claude-3-sonnet": { inputPerMillion: 3.00, outputPerMillion: 15.00 },
  "claude-3-haiku": { inputPerMillion: 0.25, outputPerMillion: 1.25 },
};


