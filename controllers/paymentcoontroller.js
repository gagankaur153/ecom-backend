const Razorpay = require('razorpay')
const Payment = require('../models/payment')

const razorpay = new Razorpay ({
    key_id: process.env.KEY_ID,
    key_secret : process.env.KEY_SECRET
})
 const Checkout = async (req,res)=>{
    try{
        const {amount , cartItems, userShipping, userId} = req.body

    var options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    res.json({
        orderId: order.id,
        amount: amount,
        cartItems,
        userShipping, userId,
        payStatus: "created"
    })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
      }
}

// verify payment
const verify = async (req,res)=>{
    const {
        orderId, paymentId, signature,amount,orderItems, userId ,userShipping
    } = req.body

    const orderConfirm = new Payment({
        orderId, paymentId, signature,amount,orderItems, userId ,userShipping, payStatus: "paid"
    })
    if(!orderConfirm){
        res.status(400).json({status:"false", message:"your order is not confirm Teachinal error"})
    }
    await orderConfirm.save()
    res.status(200).json({status:"true", message:" Pay Sucessfully...", data:orderConfirm})

}

// user order
const userOrder = async (req,res)=>{
    const userid = req.user.id

    const orders = await Payment.find({userId: userid}).sort({orderDate: -1})
    if(!orders) return res.status(400).json({status:"false", message:"order list is empty"})
  return  res.status(200).json({status:"true", data:orders})
}

// all orders for admin panel
const allOrder = async (req,res)=>{
    const role = req.user.role
    if(!role)  return res.status(400).json({status: "false", message: "role not found"})

    if(role === "user") return res.status(400).json({status: "false", message: "you cannot see all orders"})

    const orders = await Payment.find().sort({orderDate: -1})
    if(!orders) return res.status(400).json({status:"false", message:"order list is empty"})
  return  res.status(200).json({status:"true", data:orders})
}
module.exports = {
    Checkout,
    verify,
    userOrder,
    allOrder
}