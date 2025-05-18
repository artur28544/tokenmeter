export interface TokenCount {
  text: string;
  tokens: number;
  model: string;
  encoding: string;
}

// todo: performance
export interface CostEstimate {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: string;
}

export interface PricingTable {
  [model: string]: {
    inputPerMillion: number;
    outputPerMillion: number;
  };
}

export interface CountResult {
  tokens: number;
  characters: number;
  words: number;
  lines: number;
}

