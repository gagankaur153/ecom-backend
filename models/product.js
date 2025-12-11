"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    category: { type: String },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String }
});
const Products = (0, mongoose_1.model)("Products", productSchema);
exports.default = Products;
