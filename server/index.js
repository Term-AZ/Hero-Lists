var express = require('express');
var cors = require('cors')
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const saltRounds=10
var generate_token = require('./jwt/generate_token.js')
var validate_token = require('./jwt/validate_token.js')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
var validate_email = require('./validate/validate_email.js')
var validate_password = require('./validate/validate_password.js')

//for developer build only
app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use("/", express.static('../client/public'))
app.use("/",express.static('../client/build'))

dotenv.config()
const port = process.env.port;

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

// const verify = (req,res,next)=>{

//     const authHeader = req.headers.gfg_token_header_key
//     if(authHeader){
//         const token = authHeader.split(" ")[1]
//         jwt.verify(token, 'gfg_jwt_secret_key', (err,user)=>{
//             if(err){
//                 return res.status(403).json("Token is not valid")
//             }
//             req.user = user
//             next();
//         })
//     }else{
//         res.status(401).json("You are not authenticated!")
//     }
// }



app.post("/user/register",(req,res)=>{
    const {email, password} = req.body
    
    if(!validate_email(email)){
        return res.status(400).send({"msg": "Please input valid email"})
    }
    if(!validate_password(password)){
        return res.status(400).send({"msg": "Password must be 6-16 character long and must contain at least one number and special character"})
    }

    var q = "SELECT * FROM users where email = ?"
    db.query(q, [email], (err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
        if(result==undefined){
            bcrypt.genSalt(saltRounds, function(err,salt){
                if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
                bcrypt.hash(password, salt, function(err,hash){
                    var dbstatement = "INSERT INTO users(email, user_password) VALUES(?,?)"
                    db.query(dbstatement, [email,hash], (err2)=>{
                        if(err2) {console.log(err2);return res.status(500).send({"msg": "Error has occured"})}
                        return res.status(200).send({"msg":"User added"})
                    })
                })
            })
        }else{
            return res.status(400).send({"msg": "Account with this email already exists"})
        }
    })

    // res.send(generate_token())
})

app.post('/user/login',(req,res)=>{
    const {email , password} = req.body
    var q ="SELECT * FROM users WHERE email = ?"
    db.query(q,[email], (err,result)=>{
        if(result[0] ==null){
            return res.status(400).send({"msg":"Email not registered "})
        }else{
            bcrypt.compare(password, result[0].user_password, function(err, hashresult){
                if(err){console.log(err) ; return res.status(500).send({"msg":"Error has occured"})}
                if(hashresult){
                    return res.json({
                        email: email,
                        jwt: generate_token({email: email, admin:result[0].admin})})
                }else{
                    return res.status(400).send({"msg":"Password does not match"})
                }
            })
        }
    })
})

app.get('/api/superhero_data/hero_names',(req,res)=>{
    var q = "SELECT id, hero_name FROM superheros"
    db.query(q, (err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})

app.get('/api/superhero_data/:hero_id',(req,res)=>{
    var id =  req.params.hero_id
    var q = "SELECT * from superheros WHERE id=?"
    db.query(q, [id], (err,result)=>{
        if(err) return res.status(500).send({"msg":"Error has occured"})
        if(result[0]==null){
            return res.status(400).send({"msg":"Hero not found"})
        }else{
            return res.json(result)
        }
    })
})

app.get('/api/superhero_data/abilities/:hero_id',(req, res)=>{
    var q = 'SELECT ability_name FROM abilities INNER JOIN hero_abilities ON hero_abilities.ability_id = abilities.id WHERE hero_abilities = ?'
    
})

app.get("/user/validateToken", validate_token, (req,res)=>{
    console.log(req.user)
    // let tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    // let jwtSecretKey = process.env.JWT_SECRET_KEY

    // try{
    //     const token = req.header(tokenHeaderKey)
    //     const verified = jwt.verify(token, jwtSecretKey)
    //     if(verified){
    //         return res.send("Success")
    //     }else{
    //         return res.send("error")
    //     }
    // }catch(err){
    //     console.log(err)
    // }
})

app.get("/superheroLists/heros/data", function(req,res){
    var q = "SELECT hero_name FROM superheros"
    db.query(q, (err,result, fields)=>{
        // res.set('Access-Control-Allow-Origin', '*');
        res.send(result)
    })
}) 



