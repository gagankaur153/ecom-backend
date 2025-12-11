"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeaddress = exports.getoneaddress = exports.getaddress = exports.addaddress = void 0;
const address_1 = __importDefault(require("../models/address"));
const user_1 = __importDefault(require("../models/user"));
// add address
const addaddress = async (req, res) => {
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
        await addresses.save();
        const updateuser = await user_1.default.findByIdAndUpdate(userid, { address: addresses._id }, { new: true });
        return res.status(200).json({ status: true, data: addresses, message: "address saved" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.addaddress = addaddress;
// get address
const getaddress = async (req, res) => {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userid)
            return res.status(400).json({ status: false, message: "user id not find" });
        let exisitnguser = await address_1.default.find({ user: userid })
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
};
exports.getaddress = getaddress;
//  one address
const getoneaddress = async (req, res) => {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userid)
            return res.status(400).json({ status: false, message: "user id not find" });
        const { addressid } = req.params;
        if (!addressid)
            return res.status(400).json({ status: false, message: 'address id not found' });
        let exisitnguser = await address_1.default.find({ user: userid });
        const singleaddress = exisitnguser.find((item) => item._id.toString() === addressid);
        if (!singleaddress)
            return res.status(400).json({ status: false, message: "id not match" });
        return res.status(200).json({ status: true, data: singleaddress });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.getoneaddress = getoneaddress;
//  delete address
const removeaddress = async (req, res) => {
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
        const address = await address_1.default.findOne({ _id: addressid, user: userId });
        if (!address) {
            return res.status(404).json({ status: false, message: "Address not found or does not belong to the user" });
        }
        await address_1.default.deleteOne({ _id: addressid, user: userId });
        return res.status(200).json({ status: true, message: "Address removed successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: err.message });
    }
};
exports.removeaddress = removeaddress;
