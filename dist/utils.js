"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
function createToken(id) {
    const token = jsonwebtoken_1.default.sign({ userId: id }, process.env.SECRET, {
        expiresIn: "2h",
    });
    return token;
}
exports.createToken = createToken;
async function verifyToken(req) {
    const token = req.header("Authorization") || req.cookies.token;
    if (!token) {
        return false;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    if (!decoded) {
        return false;
    }
    return decoded;
}
exports.verifyToken = verifyToken;
