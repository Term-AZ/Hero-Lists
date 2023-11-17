var mysql = require('mysql')

db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Ywy957p3!',
    database: 'superheros'
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
})

module.exports = con