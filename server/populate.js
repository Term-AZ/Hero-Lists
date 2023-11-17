// import {db} from "../db/db"
// import mysql from "mysql"

var mysql = require("mysql2")
var superhero_data = require('../data/superhero_info.json')
var ability_data = require('../data/superhero_powers.json')

const db = mysql.createConnection({
    host:'localhost',
    port: '3306',
    user:'root',
    password: 'ywy957p3', //for PC US Ywy957p3!
    database: 'superheros'
})
db.connect()

for(var i of superhero_data){    
    try{
        if(i.Weight===''){
            i.Weight=0
        }
        var q = "INSERT INTO superheros(hero_name, gender, eye_color, hair_color, height, publisher,skin_color, alignment, hero_weight) VALUES ( '"+i.name+"','"+i.Gender+"','"+i["Eye color"]+"','"+i["Hair color"]+"','"+i.Height+"','"+i.Publisher+"', '"+i["Skin color"]+"','"+i.Alignment+"','"+i.Weight+"')"
        db.query(q)
    }catch(err){
        console.log(err)
    }
}

var x = ability_data[0]

for(var i in Object.keys(x)){
    var q = "INSERT INTO abilities(ability) VALUES ('"+x[i]+"')"
    db.query(q)
}

