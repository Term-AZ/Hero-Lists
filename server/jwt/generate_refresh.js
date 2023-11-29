const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generate_refresh = (data) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY  
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: "1d"})
    return token
}

module.exports = generate_refresh