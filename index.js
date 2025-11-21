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
app.use(cookieparser())
const allowedOrigins= [
   "https://ecom-frontend-seven-rose.vercel.app",
   "http://localhost:5173"
]
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); // Postman या server-to-server requests के लिए
        if(allowedOrigins.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true
}));


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