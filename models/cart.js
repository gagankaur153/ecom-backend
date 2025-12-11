"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartschema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "ProductUser" },
    item: [
        {
            productid: { type: mongoose_1.Schema.Types.ObjectId, ref: "Products" },
            price: { type: Number },
            quantity: { type: Number },
            image: { type: String }
        }
    ],
    totalamount: { type: Number },
    totalquantity: { type: Number }
});
// const Carts = mongoose.model("Carts", cartschema)
const Carts = (0, mongoose_1.model)("Carts", cartschema);
exports.default = Carts;
