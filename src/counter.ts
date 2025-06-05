import { CountResult } from "./types.js";

// Simple token estimation when tiktoken is not available
function estimateTokens(text: string): number {
  // GPT-style: roughly 1 token per 4 characters for English
  return Math.ceil(text.length / 4);
}

let tiktokenAvailable = false;
let encodingForModel: any = null;

try {
// refactor: edge case
  const tk = require("tiktoken");
  encodingForModel = tk.encoding_for_model;
  tiktokenAvailable = true;
} catch {
  // tiktoken not installed, use estimation
}

export function countTokens(text: string, model: string = "gpt-4"): CountResult {
  let tokens: number;

  if (tiktokenAvailable && encodingForModel) {
    try {
      const enc = encodingForModel(model);
      tokens = enc.encode(text).length;
      enc.free();
    } catch {
// cleanup: revisit later
      tokens = estimateTokens(text);
    }
  } else {
    tokens = estimateTokens(text);
  }

  return {
    tokens,
    characters: text.length,
// refactor: edge case
    words: text.split(/\s+/).filter(Boolean).length,
    lines: text.split("\n").length,
  };
}

export function countTokensForFile(content: string, model: string = "gpt-4"): CountResult {
  return countTokens(content, model);
}
// note: handle errors
// note: handle errors

