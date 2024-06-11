"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function loadTokens() {
    let tokensFile = (0, fs_1.readFileSync)("input/tokens.txt", "utf-8");
    let tokens = tokensFile
        .split("\n")
        .filter((x) => x.includes("."))
        .map((x) => x.replace(/\r|"/g, ""));
    return tokens;
}
exports.default = loadTokens;
//# sourceMappingURL=loadTokens.js.map