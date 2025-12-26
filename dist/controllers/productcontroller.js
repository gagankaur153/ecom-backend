"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteproduct = exports.updateproduct = exports.getsingleproduct = exports.getallproduct = exports.addproduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
// add Product
const addproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const checkuser = yield user_1.default.findById(userid);
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
        yield payload.save();
        return res.status(200).json({ status: true, data: payload, message: "product added successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.addproduct = addproduct;
// get all products
const getallproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const getallproduct = yield product_1.default.find(searchcreteria).sort({ updatedAt: -1 });
        return res.status(200).json({ status: true, data: getallproduct });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.getallproduct = getallproduct;
// get single product
const getsingleproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productid } = req.params;
        const getoneproduct = yield product_1.default.findById(productid);
        if (!getoneproduct)
            return res.status(400).json({ status: false, message: "id not ofund" });
        return res.status(200).json({ status: true, data: getoneproduct });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.getsingleproduct = getsingleproduct;
// update Product
const updateproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productid } = req.params;
        const checkuser = yield user_1.default.findById(userid);
        if ((checkuser === null || checkuser === void 0 ? void 0 : checkuser.role) == "user")
            return res.status(400).json({ status: false, message: "you are not eligible to update book" });
        if (!checkuser)
            return res.status(400).json({ status: false, message: "user not found" });
        const body = req.body || {};
        if (!body.category || !(body === null || body === void 0 ? void 0 : body.title) || !(body === null || body === void 0 ? void 0 : body.price) || !body.description)
            return res.status(400).json({ status: false, message: "All fields are required" });
        const image = req.file && ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
        const payload = {
            category: body.category,
            title: body.title,
            price: body.price,
            description: body.description,
            image: image
        };
        const update = yield product_1.default.findByIdAndUpdate(productid, payload, { new: true });
        return res.status(200).json({ status: true, data: update, message: "product update successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.updateproduct = updateproduct;
// delete product
const deleteproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productid } = req.params;
        const deleteproduct = yield product_1.default.findByIdAndDelete(productid);
        if (!deleteproduct)
            return res.status(400).json({ status: false, message: "id not ofund" });
        return res.status(200).json({ status: true, data: deleteproduct, message: "product delete successfully" });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.deleteproduct = deleteproduct;
