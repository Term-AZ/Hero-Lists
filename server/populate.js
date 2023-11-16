// import {db} from "../db/db"
// import mysql from "mysql"

var mysql = require("mysql2")
var superhero_data = require('../data/superhero_info.json')
var ability_data = require('../data/superhero_powers.json')

const db = mysql.createConnection({
    host:'127.0.0.1',
    port: '3306',
    user:'root',
    password: 'Ywy957p3!',
    database: 'superheros'
})
db.connect()

for(var i of superhero_data){
    // const q = "INSERT INTO superheros(id, hero_name, gender, eye_color, hair_color, height, publisher,skin_color, alignment, hero_weight) VALUES (`${i.id}`, ${i.name},${i.Gender},${i["Eye color"]},${i["Hair color"]},${i.Height},${i.Publisher},${i["Skin color"]},${i.Alignment}, ${i.Weight})"
    
    try{
        if(i.Weight===''){
            i.Weight=0
        }
        var q = "INSERT INTO superheros(hero_name, gender, eye_color, hair_color, height, publisher,skin_color, alignment, hero_weight) VALUES ( '"+i.name+"','"+i.Gender+"','"+i["Eye color"]+"','"+i["Hair color"]+"','"+i.Height+"','"+i.Publisher+"', '"+i["Skin color"]+"','"+i.Alignment+"','"+i.Weight+"')"
        db.query(q)
    }catch(err){
        console.log(err)
    }
    //[i.id, i.name,i.Gender,i["Eye color"],i["Hair color"],i.Height,i.Publisher,i["Skin color"],i.Alignment,i.Weight]
    //(err,result)=>{
        // if(err){
        //     console.error(err.message)
        // }
        // console.log("Success:  "+ result.affectedRows)
    //})  
}
