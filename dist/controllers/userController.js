"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils");
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = (0, utils_1.createToken)(user._id.toString());
        req.headers.authorization = `Bearer ${token}`;
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
exports.loginUser = loginUser;
async function createUser(req, res) {
    try {
        const { AuthorName, email, password, PhoneNumber } = req.body;
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "User with this email already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await userModel_1.default.create({
            AuthorName,
            email,
            password: hashedPassword,
            PhoneNumber,
        });
        const token = (0, utils_1.createToken)(newUser._id.toString());
        req.headers.authorization = `Bearer ${token}`;
        res.cookie("token", token, { httpOnly: true });
        return res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error("User creation error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
exports.createUser = createUser;
