const jwt = require('jsonwebtoken')

const authmiddleware = (req,res,next)=>{
    try{
        const token = req.cookies?.token
        if(!token) return res.status(400).json({status: "false", message:"token expire"})
    const verify = jwt.verify(token, "hjfitn")
    if(!verify) return res.status(400).json({message: "token not verfied"})
     req.user = verify
    next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, message: err.message });
      }
}

module.exports = authmiddleware