var express = require('express');
var cors = require('cors')
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))

dotenv.config()
const port = process.env.port;

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

app.post("/user/generateToken", (req,res)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY  
})

app.get("/superheroLists/heros/data", (req,res)=>{
    var q = "SELECT hero_name FROM superheros"
    db.query(q, (err,result, fields)=>{
        res.send(result)
    })
})

