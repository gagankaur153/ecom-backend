"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteproduct = exports.updateproduct = exports.getsingleproduct = exports.getallproduct = exports.addproduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
// add Product
const addproduct = async (req, res) => {
    var _a, _b;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const checkuser = await user_1.default.findById(userid);
        if ((checkuser === null || checkuser === void 0 ? void 0 : checkuser.role) == "user")
            return res.status(400).json({ status: false, message: "you are not eligible to add book" });
        const body = req.body || {};
        if (!body.category || !(body === null || body === void 0 ? void 0 : body.title) || !(body === null || body === void 0 ? void 0 : body.price) || !body.description)
            return res.status(400).json({ status: false, message: "All fields are required" });
        const image = req.file ? (_b = req.file) === null || _b === void 0 ? void 0 : _b.path : null;
        const payload = new product_1.default({
            category: body.category,
            title: body.title,
            price: body.price,
            description: body.description,
            image: image
        });
        await payload.save();
        return res.status(200).json({ status: true, data: payload, message: "product added successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.addproduct = addproduct;
// get all products
const getallproduct = async (req, res) => {
    try {
        const search = req.query.search || "";
        let searchcreteria = {};
        if (search) {
            searchcreteria = {
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } }
                ]
            };
        }
        const getallproduct = await product_1.default.find(searchcreteria).sort({ createdAt: -1 });
        return res.status(200).json({ status: true, data: getallproduct });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.getallproduct = getallproduct;
// get single product
const getsingleproduct = async (req, res) => {
    try {
        const { productid } = req.params;
        const getoneproduct = await product_1.default.findById(productid);
        if (!getoneproduct)
            return res.status(400).json({ status: false, message: "id not ofund" });
        return res.status(200).json({ status: true, data: getoneproduct });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.getsingleproduct = getsingleproduct;
// update Product
const updateproduct = async (req, res) => {
    var _a, _b;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productid } = req.params;
        const checkuser = await user_1.default.findById(userid);
        if ((checkuser === null || checkuser === void 0 ? void 0 : checkuser.role) == "user")
            return res.status(400).json({ status: false, message: "you are not eligible to update book" });
        if (!checkuser)
            return res.status(400).json({ status: false, message: "user not found" });
        const body = req.body || {};
        if (!body.category || !(body === null || body === void 0 ? void 0 : body.title) || !(body === null || body === void 0 ? void 0 : body.price) || !body.description)
            return res.status(400).json({ status: false, message: "All fields are required" });
        const image = req.file ? (_b = req.file) === null || _b === void 0 ? void 0 : _b.path : "";
        const payload = {
            category: body.category,
            title: body.title,
            price: body.price,
            description: body.description,
            image: image
        };
        const update = await product_1.default.findByIdAndUpdate(productid, payload, { new: true });
        return res.status(200).json({ status: true, data: update, message: "product update successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.updateproduct = updateproduct;
// delete product
const deleteproduct = async (req, res) => {
    try {
        const { productid } = req.params;
        const deleteproduct = await product_1.default.findByIdAndDelete(productid);
        if (!deleteproduct)
            return res.status(400).json({ status: false, message: "id not ofund" });
        return res.status(200).json({ status: true, data: deleteproduct, message: "product delete successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.deleteproduct = deleteproduct;
