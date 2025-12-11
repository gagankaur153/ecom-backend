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
exports.removeaddress = exports.getoneaddress = exports.getaddress = exports.addaddress = void 0;
const address_1 = __importDefault(require("../models/address"));
const user_1 = __importDefault(require("../models/user"));
// add address
const addaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userid)
            return res.status(400).json({ status: false, message: "user id not find" });
        const { fullname, country, state, city, pincode, address } = req.body || {};
        if (!fullname || !country || !state || !city || !pincode || !address)
            return res.status(400).json({ status: false, message: "all fields are required" });
        const addresses = new address_1.default({
            user: userid,
            fullname,
            country,
            state,
            city,
            pincode,
            address
        });
        yield addresses.save();
        const updateuser = yield user_1.default.findByIdAndUpdate(userid, { address: addresses._id }, { new: true });
        return res.status(200).json({ status: true, data: addresses, message: "address saved" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.addaddress = addaddress;
// get address
const getaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userid)
            return res.status(400).json({ status: false, message: "user id not find" });
        let exisitnguser = yield address_1.default.find({ user: userid })
            .sort({ createdAt: -1 });
        if (!exisitnguser)
            return res.status(400).json({ status: false, message: "address not add" });
        // if(exisitnguser){
        //   exisitnguser =  await Address.findOneAndUpdate({user:userid}, payload, {new:true})
        // }else{
        //     exisitnguser = new Address(payload)
        //     await exisitnguser.save()
        // }
        return res.status(200).json({ status: true, data: exisitnguser });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.getaddress = getaddress;
//  one address
const getoneaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userid)
            return res.status(400).json({ status: false, message: "user id not find" });
        const { addressid } = req.params;
        if (!addressid)
            return res.status(400).json({ status: false, message: 'address id not found' });
        let exisitnguser = yield address_1.default.find({ user: userid });
        const singleaddress = exisitnguser.find((item) => item._id.toString() === addressid);
        if (!singleaddress)
            return res.status(400).json({ status: false, message: "id not match" });
        return res.status(200).json({ status: true, data: singleaddress });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.getoneaddress = getoneaddress;
//  delete address
const removeaddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(400).json({ status: false, message: "User ID not found" });
        }
        const { addressid } = req.params;
        if (!addressid) {
            return res.status(400).json({ status: false, message: "Address ID not found" });
        }
        // Ensure the address belongs to the logged-in user
        const address = yield address_1.default.findOne({ _id: addressid, user: userId });
        if (!address) {
            return res.status(404).json({ status: false, message: "Address not found or does not belong to the user" });
        }
        yield address_1.default.deleteOne({ _id: addressid, user: userId });
        return res.status(200).json({ status: true, message: "Address removed successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: err.message });
    }
});
exports.removeaddress = removeaddress;
