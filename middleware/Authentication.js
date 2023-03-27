const jwt =require("jsonwebtoken")
const Authentication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded =jwt.verify(token,"vishal");
        if(decoded){
            req.body.userid=decoded.userid;
            next()
        }else{
            res.status(400).send({"msg":"login fisrt"})
        }
    }else{
        res.status(400).send({"msg":"login fisrt"})
    }
}


module.exports={Authentication}