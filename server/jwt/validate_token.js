const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



const validate_token = (req,res,next)=>{

    const authHeader = req.headers.gfg_token_header_key
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid")
            }
            req.user = user
            next();
        })
    }else{
        res.status(401).json("You are not authenticated!")
    }
}

module.exports = validate_token
// const validate_token = (token) =>{
//     let jwtSecretKey = process.env.JWT_SECRET_KEY
//     try{
//         const verified = jwt.verify(token, jwtSecretKey)
//         if(verified){
//             return true
//         }else{
//             return false
//         }
//     }catch(err){
//         console.log(err)
//         return false
//     }
// }

// module.exports = validate_token