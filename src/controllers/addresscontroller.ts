import { Request, Response } from "express"
import Address from "../models/address";
import ProductUser from "../models/user";

// add address
const addaddress = async (req: Request, res: Response) => {
  try {
    const userid = req.user?.id
    if (!userid) return res.status(400).json({ status: false, message: "user id not find" });
    const { fullname, country, state, city, pincode, address } = req.body || {}
    if (!fullname || !country || !state || !city || !pincode || !address) return res.status(400).json({ status: false, message: "all fields are required" })
    const addresses = new Address({
      user: userid,
      fullname,
      country,
      state,
      city,
      pincode,
      address
    })
    await addresses.save()
    const updateuser = await ProductUser.findByIdAndUpdate(userid, { address: addresses._id }, { new: true })
    return res.status(200).json({ status: true, data: addresses, message: "address saved" })
  }
  catch (err: any) {
    console.log(err)
    return res.status(500).json({ status: false, message: err.message });
  }
}

// get address
const getaddress = async (req: Request, res: Response) => {
  try {
    const userid = req.user?.id
    if (!userid) return res.status(400).json({ status: false, message: "user id not find" });


    let exisitnguser = await Address.find({ user: userid })
      .sort({ createdAt: -1 })
    if (!exisitnguser) return res.status(400).json({ status: false, message: "address not add" })
    // if(exisitnguser){
    //   exisitnguser =  await Address.findOneAndUpdate({user:userid}, payload, {new:true})
    // }else{
    //     exisitnguser = new Address(payload)
    //     await exisitnguser.save()
    // }

    return res.status(200).json({ status: true, data: exisitnguser });
  }

  catch (err: any) {
    console.log(err)
    return res.status(500).json({ status: false, message: err.message });
  }

}

//  one address
const getoneaddress = async (req: Request, res: Response) => {
  try {
    const userid = req.user?.id
    if (!userid) return res.status(400).json({ status: false, message: "user id not find" });
    const { addressid } = req.params
    if (!addressid) return res.status(400).json({ status: false, message: 'address id not found' })
    let exisitnguser = await Address.find({ user: userid })
    const singleaddress = exisitnguser.find((item) => item._id.toString() === addressid)
    if (!singleaddress) return res.status(400).json({ status: false, message: "id not match" })
    return res.status(200).json({ status: true, data: singleaddress })

  }
  catch (err: any) {
    console.log(err)
    return res.status(500).json({ status: false, message: err.message });
  }

}

//  delete address
const removeaddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ status: false, message: "User ID not found" });
    }

    const { addressid } = req.params;
    if (!addressid) {
      return res.status(400).json({ status: false, message: "Address ID not found" });
    }

    // Ensure the address belongs to the logged-in user
    const address = await Address.findOne({ _id: addressid, user: userId });
    if (!address) {
      return res.status(404).json({ status: false, message: "Address not found or does not belong to the user" });
    }

    await Address.deleteOne({ _id: addressid, user: userId });

    return res.status(200).json({ status: true, message: "Address removed successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ status: false, message: err.message });
  }
};



export {
  addaddress,
  getaddress,
  getoneaddress,
  removeaddress,

}