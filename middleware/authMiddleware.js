const JWT = require('jsonwebtoken')
exports.verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(403).json({message:"Forbidden"});
    }
    const token = authHeader.split('')[1];
    try{
        const decoded  = JWT.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){

        res.status(401).json({message:"Invalid Token"})

    }
}
exports.authorizeRoles = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({message:"Access Denied"})
        }
        next();
    }
}