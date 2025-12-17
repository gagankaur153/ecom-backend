import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { Request, Response, NextFunction } from 'express'
import { MyjwtPayload } from '../controllers/types/jwt'

const tokenn = process.env.TOKEN as string

const authmiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token
        console.log("authtoken", token)
        if(!token) res.clearCookie("token" || "cookietoken")
        if (!token) return res.status(400).json({ status: "false", message: "session expires! login again" })
     
        const verify = jwt.verify(token, tokenn)   as MyjwtPayload
        if (!verify) return res.status(400).json({ message: "token not verfied" })
        req.user = verify
        next()
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
    }
}

export { authmiddleware }