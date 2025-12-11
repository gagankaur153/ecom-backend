import bcrypt from 'bcrypt'
import ProductUser from '../models/user';
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const tokenn = process.env.TOKEN as string

// register
const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body || {};


    if (!username || !email || !password)
      return res.status(400).json({ status: false, message: "All fields are required" });

    const existingUser = await ProductUser.findOne({ username });
    if (existingUser) return res.status(400).json({ status: false, message: "Username already exists" });

    const existingEmail = await ProductUser.findOne({ email });
    if (existingEmail) return res.status(400).json({ status: false, message: "Email already exists" });
    const emailregex = /^[a-z0-9_#%&]+@gmail\.com$/
    const emailmatch = emailregex.test(email)
    if (!emailmatch) {
      return res.status(400).json({ status: false, message: "emailformat is yourgmail@gmail.com" })
    }
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/
    const match = regex.test(password)
    if (!match) {
      return res.status(400).json({ status: true, message: "password length is minimum 8 character maximum 12 character one special character one numeric one capital letter include" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new ProductUser({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ status: true, message: "User registered successfully", data: newUser });

  } catch (err: any) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// login
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ status: false, message: "All fields are required" });
    const existingEmail = await ProductUser.findOne({ email });
    if (!existingEmail) return res.status(400).json({ status: false, message: "Email not registered" });
    const comparePassword = await bcrypt.compare(password, existingEmail.password);
    if (!comparePassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({
      id: existingEmail._id,
      email: existingEmail.email, username: existingEmail.username, role: existingEmail.role
    }, tokenn, {
      expiresIn: '30d'
    })
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({ status: true, message: "User registered successfully", token: token, role: existingEmail.role });

  } catch (err: any) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// get profile
const getprofile = async (req: Request, res: Response) => {
  try {
    const userinfo = req.user
    return res.status(200).json({ status: true, data: userinfo });
  } catch (err: any) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// get all user
const alluser = async (req: Request, res: Response) => {
  try {
    let alluser = await ProductUser.find().populate("address").sort({ createdAt: -1 })
    alluser = alluser.filter((user) => user.role !== "admin")
    return res.status(200).json({ status: true, data: alluser });
  }
  catch (err: any) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// logout
const logout = async (req: Request, res: Response) => {
  try {
    const userid = req.user?.id
    const logout = await ProductUser.findById(userid)
    if (!logout) return res.status(400).json({ status: "false", message: "id not found" })
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    }
    )
    return res.status(200).json({ status: true, message: "logout sucessfully" });
  }
  catch (err: any) {
    console.log(err)
    return res.status(500).json({ status: false, message: err });
  }
}





export {
  register,
  login,
  getprofile,
  alluser,
  logout
}