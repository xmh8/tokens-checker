import { readFileSync } from "fs";

export default function loadTokens(): string[] {
  let tokensFile: string = readFileSync("input/tokens.txt", "utf-8");
  let tokens: string[] = tokensFile
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => x.replace(/\r|"/g, ""));

  return tokens;
}
