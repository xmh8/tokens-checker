"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const moment_1 = __importDefault(require("moment"));
const getUser_1 = __importDefault(require("./functions/getUser"));
const loadTokens_1 = __importDefault(require("./functions/loadTokens"));
async function run() {
    process.title = "Tokens Checker | 0 Tokens | https://github.com/xmh8";
    let tokens = (0, loadTokens_1.default)();
    if (!tokens.length) {
        console.log(chalk_1.default.red.bold(`${date()} No tokens found in file (input/tokens.txt)`));
        console.log();
        console.log(`${chalk_1.default.red.bold("•")} ${chalk_1.default.blue.bold("PRESS ANY KEY TO EXIT ...")}`);
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on("data", () => process.exit());
        return;
    }
    console.log(`${date()} ${chalk_1.default.red.bold(`Checking ${chalk_1.default.blue(`${tokens.length}`)} tokens..`)}`);
    console.log();
    process.title = `Tokens Checker | ${tokens.length} Tokens | https://github.com/xmh8`;
    let stats = {
        valid: 0,
        nitro: 0,
        verified: 0,
        phone: 0,
    };
    let startTimestamp = Date.now();
    for (let i = 0; i < tokens.length; i++) {
        let user = await (0, getUser_1.default)(tokens[i]);
        if (user?.id) {
            try {
                (0, fs_1.appendFileSync)("output/valid.txt", tokens[i] + "\n");
            }
            catch { }
            stats.valid++;
            if (user.premium_type == 2)
                stats.nitro++;
            if (user.verified)
                stats.verified++;
            if (user.phone)
                stats.phone++;
            console.log(`${date()} ${chalk_1.default.green.bold("Valid")} >>> [${chalk_1.default.white.bold(tokens[i].split(".")[0])}..], ${chalk_1.default.white.bold(`${user.global_name} | Phone: ${user.phone ? chalk_1.default.green.bold("true") : chalk_1.default.red.bold("false")} | Verified: ${user.verified ? chalk_1.default.green.bold("true") : chalk_1.default.red.bold("false")} | Nitro: ${user.premium_type == 2 ? chalk_1.default.green.bold("true") : chalk_1.default.red.bold("false")}`)}`);
        }
        else {
            try {
                (0, fs_1.appendFileSync)("output/invalid.txt", tokens[i] + "\n");
            }
            catch { }
            console.log(`${date()} ${chalk_1.default.red.bold("Invalid")} >>> [${chalk_1.default.red.bold(tokens[i])}]`);
        }
    }
    console.log();
    let duration = Date.now() - startTimestamp;
    let minutes = Math.floor(duration / 60000);
    let seconds = Math.floor((duration % 60000) / 1000);
    let ms = (duration % 60000) % 1000;
    console.log(`${date()} Finished in ${chalk_1.default.blue(minutes.toString())} minutes, ${chalk_1.default.blue(seconds.toString())} seconds, ${chalk_1.default.blue(ms.toString())} ms`);
    console.log(`${chalk_1.default.yellow.bold("•")} Valid: ${chalk_1.default.blue.bold(stats.valid.toString())} | ${chalk_1.default.yellow.bold("•")} Invalid: ${chalk_1.default.blue.bold((tokens.length - stats.valid).toString())}`);
    console.log(`${chalk_1.default.yellow.bold("•")} Verified: ${chalk_1.default.blue.bold(stats.verified.toString())} | ${chalk_1.default.yellow.bold("•")} Unverified: ${chalk_1.default.blue.bold((stats.valid - stats.verified).toString())}`);
    console.log(`${chalk_1.default.yellow.bold("•")} Has Nitro: ${chalk_1.default.blue.bold(stats.nitro.toString())} | ${chalk_1.default.yellow.bold("•")} Hasn't Nitro: ${chalk_1.default.blue.bold((stats.valid - stats.nitro).toString())}`);
    console.log(`${chalk_1.default.yellow.bold("•")} Phone Verified: ${chalk_1.default.blue.bold(stats.phone.toString())} | ${chalk_1.default.yellow.bold("•")} Phone Unverified: ${chalk_1.default.blue.bold((stats.valid - stats.phone).toString())}`);
    console.log();
    console.log(`${chalk_1.default.red.bold("•")} ${chalk_1.default.blue.bold("PRESS ANY KEY TO EXIT ...")}`);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", () => process.exit());
}
function date() {
    return chalk_1.default.grey.bold(`[${(0, moment_1.default)(new Date()).format("hh:mm:ss")}]`);
}
run();
//# sourceMappingURL=index.js.map