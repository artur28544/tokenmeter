import { PricingTable } from "../types.js";

export const openaiPricing: PricingTable = {
  "gpt-4o": { inputPerMillion: 2.50, outputPerMillion: 10.00 },
  "gpt-4o-mini": { inputPerMillion: 0.15, outputPerMillion: 0.60 },
  "gpt-4-turbo": { inputPerMillion: 10.00, outputPerMillion: 30.00 },
  "gpt-4": { inputPerMillion: 30.00, outputPerMillion: 60.00 },
  "gpt-3.5-turbo": { inputPerMillion: 0.50, outputPerMillion: 1.50 },
  "o1": { inputPerMillion: 15.00, outputPerMillion: 60.00 },
  "o1-mini": { inputPerMillion: 3.00, outputPerMillion: 12.00 },
};

