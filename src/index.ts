require('dotenv').config();

import express, { Application } from 'express'

import mongoose from 'mongoose'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import useroute from './routes/userroute'
// import useroute from './routes/userroute'
import productroute from './routes/productroute'
import cartroute from './routes/cartroutes'
import paymentroute from './routes/paymentroute'
import addressroute from './routes/addressroute'



const PORT = process.env.PORT || 9000


const app: Application = express()


app.use(express.json())
app.use(cookieparser())
const allowedOrigins = [
    "https://ecom-frontend-seven-rose.vercel.app",
    "http://localhost:5173"
]
app.use(cors({
    origin: function (origin: any, callback: any) {
        if (!origin) return callback(null, true); // Postman या server-to-server requests के लिए
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true
}));


// user route
app.use("/api", useroute)

// product route
app.use("/product", productroute)
app.use("/cart", cartroute)
app.use("/payment", paymentroute)
app.use('/address', addressroute)

console.log("token change")
mongoose.connect(process.env.CONNECT!)
    .then(() => { console.log("mongoose connected") })
    .catch(() => { console.log("not connected") })
app.get('/', (req, res) => res.json("server is running on..."))

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})