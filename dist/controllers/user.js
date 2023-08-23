"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.myController = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../models/user");
function myController(req, res, next) {
    res.json({ msg: 'respond with a resource from users' });
}
exports.myController = myController;
async function signup(req, res, next) {
    const newId = (0, uuid_1.v4)();
    const { username, email, password } = req.body;
    try {
        await user_1.User.create({
            id: newId,
            username,
            email,
            password
        });
        res.status(201).json({ msg: 'New user added successfully!' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
}
exports.signup = signup;
