// import {db} from "../db/db"
// import mysql from "mysql"
const {db} = require('../db/db.js')

var superhero_data = require('../data/superhero_info.json')
var ability_data = require('../data/superhero_powers.json')


/*
Migrate Abilties
*/
var x = ability_data[0]
for(var i of Object.keys(x)){
    var q = "INSERT INTO abilities(ability_name) VALUES ('"+i+"')"
    db.query(q)
    console.log(i)
}

/*
Migrate Superhero data
*/
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

/*
Populate hero_ability table
*/
populate_hero_abilities()

//Search for hero id by name
async function search_for_id(name, callback){
    db.query("SELECT id FROM superheros WHERE hero_name='"+name+"'",function(err,result){
        if(err) throw err
        return callback(result[0])
    })
}

//Search for ability id by name
async function search_for_ability_id(name, callback){
    db.query("SELECT id FROM abilities WHERE ability_name = '"+name+"'", function(err,result){
        if(err) throw err
        return callback(result[0])
    })
}


/*
Populate hero_ability table
*/
function populate_hero_abilities(){
    for(var i in ability_data){
        try{
        search_for_id(ability_data[i].hero_names, function(heroid){
            if(heroid != undefined){
                for(var y of Object.keys(ability_data[i])){
                    if(ability_data[i][y] ==='True'){
                        search_for_ability_id(y, function(abilityid){
                            db.query("INSERT INTO hero_abilities(hero_id, ability_id) VALUES ('"+heroid.id+"', '"+abilityid.id+"')")
                        })
                    }
                }
            }
        }
    )}catch(err){

    }
    }
}






