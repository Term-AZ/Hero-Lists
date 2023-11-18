var express = require('express');
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')


dotenv.config()
const port = process.env.port;

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

app.post("/user/generateToken", (req,res)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY
})


