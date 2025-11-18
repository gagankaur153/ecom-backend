require('dotenv').config(); 

const express = require ('express')

const mongoose = require ('mongoose')
const cors = require ('cors')
const cookieparser = require('cookie-parser')
const useroute = require ('./routes/userroute')
const productroute = require('./routes/productroute')
const cartroute = require('./routes/cartroutes')
const paymentroute = require('./routes/paymentroute')
const addressroute = require('./routes/addressroute')



const PORT = process.env.PORT || 9000


const app = express()

  
app.use (express.json())
app.use(cors({
    origin: "https://ecom-frontend-seven-rose.vercel.app",
    credentials: true
}));
app.use(cookieparser())

// user route
app.use("/api",useroute)

// product route
app.use("/product",productroute)
app.use("/cart", cartroute)
app.use("/payment", paymentroute)
app.use('/address', addressroute)


mongoose.connect(process.env.CONNECT)
.then(()=>{ console.log("mongoose connected")})
.catch(()=>{console.log("not connected")})
app.get('/', (req,res)=> res.json("server is running on..."))

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})