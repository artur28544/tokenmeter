import { PricingTable } from "../types.js";

export const googlePricing: PricingTable = {
  "gemini-1.5-pro": { inputPerMillion: 1.25, outputPerMillion: 5.00 },
  "gemini-1.5-flash": { inputPerMillion: 0.075, outputPerMillion: 0.30 },
  "gemini-2.0-flash": { inputPerMillion: 0.10, outputPerMillion: 0.40 },
};

