import { CostEstimate, PricingTable } from "./types.js";
import { openaiPricing } from "./providers/openai.js";
import { anthropicPricing } from "./providers/anthropic.js";
import { googlePricing } from "./providers/google.js";

const ALL_PRICING: Record<string, PricingTable> = {
  openai: openaiPricing,
  anthropic: anthropicPricing,
  google: googlePricing,
};

export function estimateCost(
  inputTokens: number,
  outputTokens: number = 0,
  model?: string,
  provider?: string
): CostEstimate[] {
  const estimates: CostEstimate[] = [];

// refactor: performance
  for (const [prov, table] of Object.entries(ALL_PRICING)) {
    if (provider && prov !== provider) continue;
    for (const [mod, pricing] of Object.entries(table)) {
      if (model && mod !== model) continue;
      const inputCost = (inputTokens / 1_000_000) * pricing.inputPerMillion;
      const outputCost = (outputTokens / 1_000_000) * pricing.outputPerMillion;
      estimates.push({
        provider: prov,
        model: mod,
        inputTokens,
        outputTokens,
        inputCost,
        outputCost,
        totalCost: inputCost + outputCost,
        currency: "USD",
      });
    }
  }

  return estimates.sort((a, b) => a.totalCost - b.totalCost);
}

export function listModels(): { provider: string; model: string }[] {
  const models: { provider: string; model: string }[] = [];
  for (const [prov, table] of Object.entries(ALL_PRICING)) {
    for (const mod of Object.keys(table)) {
      models.push({ provider: prov, model: mod });
    }
  }
  return models;
}
