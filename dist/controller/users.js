"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const user_1 = require("../models/user");
const uuid_1 = require("uuid");
const Register = async (req, res) => {
    try {
        const { email, firstName } = req.body;
        const iduuid = (0, uuid_1.v4)();
        const user = await user_1.UserInstance.findOne({
            where: { email: email }
        });
        if (!user) {
            let newUser = await user_1.UserInstance.create({
                id: iduuid,
                email,
                firstName,
            });
            return res.status(201).json({
                msg: 'user created successfully'
            });
            newUser;
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
