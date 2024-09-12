import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.status(401).json({success: false, msg: "Not autorized, Login again"})
    }

    try {

        const token_decode =jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
        
    } catch (error) {
       res.json({success: false, msg: "Could not get token"})  
       console.log(error)
    }
}

export default authMiddleware