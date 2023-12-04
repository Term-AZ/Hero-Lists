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
        req.admin = decoded.admin
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
    
}

module.exports = validate_token
