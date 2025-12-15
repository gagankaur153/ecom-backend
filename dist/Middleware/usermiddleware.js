"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenn = process.env.TOKEN;
const authmiddleware = (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        console.log("authheader", authheader);
        if (!authheader)
            return res.status(400).json({ status: "false", message: "token expire" });
        if (!authheader.startsWith("Bearer "))
            return res.status(400).json({ status: "false", message: "bearer missing" });
        const token = authheader.split(" ")[1];
        console.log("token", token);
        const verify = jsonwebtoken_1.default.verify(token, tokenn);
        if (!verify)
            return res.status(400).json({ message: "token not verfied" });
        req.user = verify;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.authmiddleware = authmiddleware;
