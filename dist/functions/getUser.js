"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getUser(token) {
    try {
        let response = await axios_1.default.get(`https://discord.com/api/v10/users/@me`, {
            headers: {
                Authorization: token,
            },
        });
        let { data } = response;
        let createdTimestamp = (BigInt(data.id) >> BigInt("22")) + BigInt("1420070400000");
        data.created_at = Number(createdTimestamp);
        return data;
    }
    catch (err) {
        return null;
    }
}
exports.default = getUser;
//# sourceMappingURL=getUser.js.map