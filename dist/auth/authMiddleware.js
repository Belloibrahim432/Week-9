"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const authenticateToken = (req, res, next) => {
    const authorised = (0, utils_1.verifyToken)(req);
    if (!authorised) {
        return res.status(403).json({ error: 'Unauthorised' });
    }
    next();
};
exports.default = authenticateToken;
