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

import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = process.env.PORT || 9000


const app: Application = express()


app.use(express.json())
app.use(cookieparser())
const allowedOrigins = [
    "https://ecom-frontend-seven-rose.vercel.app",
    "https://gagankaur153-ecom-frontend.vercel.app",
    "http://localhost:5173"
]

const vercelPreviewOriginPattern = /^https:\/\/.*ecom-frontend.*\.vercel\.app$/

app.use(cors({
    origin: function (origin: any, callback: any) {
        if (!origin) return callback(null, true); // Postman या server-to-server requests के लिए
        if (allowedOrigins.includes(origin) || vercelPreviewOriginPattern.test(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
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
app.get('/health', (req,res)=> res.json("server is awake all"))
app.get('/', (req, res) => res.json("server is running on..."))
mongoose.connect(process.env.CONNECT!)
    .then(() => { console.log("mongoose connected") })
    .catch((err) => { console.error(err) })
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
