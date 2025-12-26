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
exports.updateAllProduct = exports.deletecart = exports.quantityincrease = exports.quantitydecrease = exports.allcart = exports.addcart = void 0;
const user_1 = __importDefault(require("../models/user"));
const product_1 = __importDefault(require("../models/product"));
const cart_1 = __importDefault(require("../models/cart"));
//recall function
const recall = ((cart) => {
    cart.totalquantity = cart.item.reduce((acc, i) => acc + i.quantity, 0);
    cart.totalamount = cart.item.reduce((acc, i) => acc + i.price, 0);
});
// product add to cart
const addcart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productid } = req.params;
        const finduser = yield user_1.default.findById(userid);
        const product = yield product_1.default.findById(productid);
        if (!finduser)
            return res.status(400).json({ status: "false", message: "userid not found" });
        if (finduser.role == "admin")
            return res.status(400).json({ status: "false", message: "you are elegible to add cart because your role is admin" });
        if (!product)
            return res.status(400).json({ status: "false", message: "product not found" });
        //    check exist product or not
        let cart = yield cart_1.default.findOne({ user: userid });
        if (!cart) {
            cart = new cart_1.default({
                user: userid,
                item: [
                    {
                        productid: productid,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                    }
                ],
                totalamount: product.price,
                totalquantity: 1,
            });
            yield cart.save();
            const itemlength = (_c = cart === null || cart === void 0 ? void 0 : cart.item[((_b = cart === null || cart === void 0 ? void 0 : cart.item) === null || _b === void 0 ? void 0 : _b.length) - 1]) === null || _c === void 0 ? void 0 : _c._id;
            yield user_1.default.findByIdAndUpdate(userid, { $push: { cart: itemlength } }, { new: true });
            return res.status(200).json({ status: true, data: cart, message: "item add to cart" });
        }
        const itemindex = cart.item.findIndex((itemm) => itemm.productid.toString() === productid);
        if (itemindex > -1) {
            cart.item[itemindex].quantity += 1;
            cart.item[itemindex].price = product.price * cart.item[itemindex].quantity;
        }
        else {
            cart.item.push({
                productid: productid,
                price: product.price,
                quantity: 1,
                image: product.image,
            });
            recall(cart);
            yield cart.save();
            const itemlength = (_e = cart === null || cart === void 0 ? void 0 : cart.item[((_d = cart === null || cart === void 0 ? void 0 : cart.item) === null || _d === void 0 ? void 0 : _d.length) - 1]) === null || _e === void 0 ? void 0 : _e._id;
            console.log("itemlength", itemlength);
            yield user_1.default.findByIdAndUpdate(userid, { $push: { cart: itemlength } }, { new: true });
            return res.status(200).json({ status: true, data: { cart, finduser }, message: "item add to cart" });
        }
        recall(cart);
        yield cart.save();
        return res.status(200).json({ status: true, data: cart, finduser, message: "item increase to cart" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.addcart = addcart;
// get all cart
const allcart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userid)
            return res.status(400).json({ status: false, message: "id not found" });
        const finduser = yield cart_1.default.findOne({ user: userid }).populate("item.productid").populate("user.address");
        if (!finduser)
            return res.status(400).json({ status: false, message: "cart is empty" });
        return res.status(200).json({ status: true, data: finduser });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.allcart = allcart;
// quantity decrease
const quantitydecrease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productid } = req.params;
        if (!productid)
            return res.status(400).json({ status: false, message: "product id not found" });
        const newuser = yield user_1.default.findById(userid).select("cart");
        const finduser = yield cart_1.default.findOne({ user: userid }).populate("item.productid");
        if (!finduser)
            return res.status(400).json({ status: false, message: "id not found" });
        const checkproduct = finduser.item.find((items) => items.productid._id.toString() === productid);
        if (!checkproduct)
            return res.status(400).json({ status: "true", message: "product not match" });
        if (checkproduct.quantity > 1) {
            checkproduct.quantity -= 1;
            checkproduct.price = (checkproduct === null || checkproduct === void 0 ? void 0 : checkproduct.quantity) * ((_b = checkproduct === null || checkproduct === void 0 ? void 0 : checkproduct.productid) === null || _b === void 0 ? void 0 : _b.price);
        }
        else {
            finduser.item = finduser.item.filter((item) => item.productid._id.toString() !== productid);
            yield user_1.default.findByIdAndUpdate(userid, { $pull: { cart: productid } }, { new: true });
        }
        recall(finduser);
        yield finduser.save();
        return res.status(200).json({ status: "true", data: finduser, newuser });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.quantitydecrease = quantitydecrease;
// quantity increase
const quantityincrease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productid } = req.params;
        if (!productid)
            return res.status(400).json({ status: false, message: "product id not found" });
        const finduser = yield cart_1.default.findOne({ user: userid }).populate("item.productid");
        if (!finduser)
            return res.status(400).json({ status: false, message: "id not found" });
        const checkproduct = finduser.item.find((items) => items.productid._id.toString() === productid);
        if (!checkproduct)
            return res.status(400).json({ status: "true", message: "product not match" });
        if (checkproduct.quantity >= 1) {
            checkproduct.quantity += 1;
            checkproduct.price = (checkproduct === null || checkproduct === void 0 ? void 0 : checkproduct.quantity) * ((_b = checkproduct === null || checkproduct === void 0 ? void 0 : checkproduct.productid) === null || _b === void 0 ? void 0 : _b.price);
        }
        recall(finduser);
        yield finduser.save();
        return res.status(200).json({ status: "true", data: finduser });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.quantityincrease = quantityincrease;
// delete per product
const deletecart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { cartid } = req.params;
        console.log("cartid", cartid);
        const newuser = yield user_1.default.findById(userid).select("cart");
        const removeproduct = yield cart_1.default.findOne({ user: userid });
        if (!removeproduct)
            return res.status(400).json({ message: "cart not found" });
        removeproduct.item = removeproduct.item.filter((details) => details._id.toString() !== cartid);
        recall(removeproduct);
        console.log("remove product", removeproduct);
        yield user_1.default.findByIdAndUpdate(userid, { $pull: { cart: cartid } }, { new: true });
        yield removeproduct.save();
        return res.status(200).json({ status: true, message: "cart delete", data: removeproduct, newuser });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.deletecart = deletecart;
// delete all product
const updateAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const clearcart = yield cart_1.default.findOneAndUpdate({ user: userid }, { $set: { item: [], totalamount: 0, totalquantity: 0 } }, { new: true });
        if (!clearcart) {
            return res.status(400).json({ status: "false", message: "cart not find" });
        }
        const usercart = yield user_1.default.findByIdAndUpdate(userid, { $set: { cart: [] } }, { new: true });
        if (!usercart) {
            return res.status(400).json({ status: "false", message: "user cart not find" });
        }
        return res.status(200).json({ status: "true", data: clearcart, data2: usercart, message: "cart is empty" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.updateAllProduct = updateAllProduct;
