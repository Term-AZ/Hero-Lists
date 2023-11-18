var mysql = require('mysql')

db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Ywy957p3!',
    database: 'superheros'
})

db.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
})

module.exports = db