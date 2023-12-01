const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()



const validate_token = (req,res,next)=>{

    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refreshToken'];
    
    if (!accessToken && !refreshToken) {
        return res.status(401).json({"msg":'Access Denied. No token provided.'});
      }
    
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.userid = decoded.id;
        next();
      } catch (error) {
        if (!refreshToken) {
          return res.status(401).json({"msg":'Access Denied. No refresh token provided.'});
        }
    
        try {
          const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
          const accessToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
          res
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .header('Authorization', accessToken)
            .send(decoded.user);
        } catch (error) {
            console.log(error)
          return res.status(400).json({"msg":'Invalid Token.'});
        }
      }
    

    
    // if(authHeader){
    //     const token = authHeader.split(" ")[1]
    //     jwt.verify(token, process.env.JWT_SECRET_KEY, (err,user)=>{
    //         if(err){
    //             return res.status(403).json("Token is not valid")
    //         }
    //         req.user = user
    //         next();
    //     })
    // }else{
    //     res.status(401).json("You are not authenticated!")
    // }
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