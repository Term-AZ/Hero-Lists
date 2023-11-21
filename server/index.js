var express = require('express');
var cors = require('cors')
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// var corsOptions = {
//     origin: function (origin, callback) {
//       // db.loadOrigins is an example call to load
//       // a list of origins from a backing database
//       db.loadOrigins(function (error, origins) {
//         callback(error, origins)
//       })
//     }
//   }

dotenv.config()
const port = process.env.port;

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

app.post("/user/generateToken", (req,res)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY  
})

app.get("/superheroLists/heros/data", function(req,res){
    var q = "SELECT hero_name FROM superheros"
    db.query(q, (err,result, fields)=>{
        res.setHeader('Access-Control-Allow-Origin',true)
        res.send(result)
    })
})

