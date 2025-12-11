"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.alluser = exports.getprofile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenn = process.env.TOKEN;
// register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body || {};
        if (!username || !email || !password)
            return res.status(400).json({ status: false, message: "All fields are required" });
        const existingUser = await user_1.default.findOne({ username });
        if (existingUser)
            return res.status(400).json({ status: false, message: "Username already exists" });
        const existingEmail = await user_1.default.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ status: false, message: "Email already exists" });
        const emailregex = /^[a-z0-9_#%&]+@gmail\.com$/;
        const emailmatch = emailregex.test(email);
        if (!emailmatch) {
            return res.status(400).json({ status: false, message: "emailformat is yourgmail@gmail.com" });
        }
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
        const match = regex.test(password);
        if (!match) {
            return res.status(400).json({ status: true, message: "password length is minimum 8 character maximum 12 character one special character one numeric one capital letter include" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ status: true, message: "User registered successfully", data: newUser });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.register = register;
// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password)
            return res.status(400).json({ status: false, message: "All fields are required" });
        const existingEmail = await user_1.default.findOne({ email });
        if (!existingEmail)
            return res.status(400).json({ status: false, message: "Email not registered" });
        const comparePassword = await bcrypt_1.default.compare(password, existingEmail.password);
        if (!comparePassword)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({
            id: existingEmail._id,
            email: existingEmail.email, username: existingEmail.username, role: existingEmail.role
        }, tokenn, {
            expiresIn: '30d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            domian: process.env.COOKIE_DOMAIN || undefined,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ status: true, message: "User registered successfully", token: token, role: existingEmail.role });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.login = login;
// get profile
const getprofile = async (req, res) => {
    try {
        const userinfo = req.user;
        return res.status(200).json({ status: true, data: userinfo });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.getprofile = getprofile;
// get all user
const alluser = async (req, res) => {
    try {
        let alluser = await user_1.default.find().populate("address").sort({ createdAt: -1 });
        alluser = alluser.filter((user) => user.role !== "admin");
        return res.status(200).json({ status: true, data: alluser });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.alluser = alluser;
// logout
const logout = async (req, res) => {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const logout = await user_1.default.findById(userid);
        if (!logout)
            return res.status(400).json({ status: "false", message: "id not found" });
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            domian: process.env.COOKIE_DOMAIN || undefined,
        });
        return res.status(200).json({ status: true, message: "logout sucessfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err });
    }
};
exports.logout = logout;
