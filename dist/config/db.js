"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const PASSWORD = process.env.PASSWORD;
        const DATABASE_URL = process.env.MONGO_URI;
        const connect = await mongoose_1.default.connect(DATABASE_URL);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }
    catch (err) {
        console.error(`Error: ${err}`);
    }
};
exports.default = connectDB;
