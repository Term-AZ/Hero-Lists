var express = require('express');
import db from "../db/db"
//const fs = require('fs')
var app = express();
const port = 8000;


// app.use('/', express.static('../client'))
// app.use(express.json());
// app.use(express.urlencoded());

saved_lists={"test list" : [5,2,4,20,109,300]}

app.get('/data' , (req,res)=>{
    db.query 
})

app.get('/api/superhero_data/hero_names', (req,res)=>{
    try{
        var names = []
        for(const hero of superhero_data ){
            names.push(hero.name)
        }
        res.json(names)
    }catch{
        res.status(500).send("Error loading JSON")
    }
})


app.get('/api/superhero_data/abilties/:hero_id', (req, res)=> {
    try{    
        var name =""
        console.log(req.params.hero_id)
        for(const hero of superhero_data){
            if(hero.id.toString().trim() === req.params.hero_id.toString().trim()){
                name = hero.name
                break
            }
        }
        console.log(name)
        for (const hero of superhero_ability_data){
            if(hero.hero_names === name){
                res.json(hero)
                return
            }
        }
        res.send("broken")
    }catch(err){ 
        console.log(err)
        res.status(500).send("Error loading JSON")
    }   
})

app.get('/api/lists', (req, res)=>{
    try{
        var data=[]
        for(const x in list_data){
            data.push(x)
        }
        
        res.json(data)
        // res.json(Object.keys(saved_lists))
    }catch (err){
        console.log(err)
        res.status(500).send("Error")
    }
})

app.post('/api/lists/add/:name', (req,res)=>{
    var name = req.params.name.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    try{
        // if(req.params.name in saved_lists){
        //     res.status(500).send("Cannot create list with same name")
        //     return
        // }
        if(store.get(name)){
            res.status(500).send("Cannot create list with same name")
            return
        }
        store.put(name,[])
        
        // saved_lists[req.params.name] = []
        res.json(Object.keys(store.store))
        res.status(200).send("Ok")
    }catch (err){
        console.log(err)
    }
})

app.delete('/api/lists/delete/:name', (req,res)=>{
    var name = req.params.name.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    try{
        store.remove(name)
        // delete saved_lists[req.params.name]
        res.status(200).send("Ok")
    }catch (err){
        console.log(err)
    }
})

app.get('/api/lists/get/:name', (req,res)=>{
    var name = req.params.name.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    try{
        var data = []
        var ids=store.get(name)
        for(const hero of superhero_data){
            if(ids.includes(hero.id.toString())){
                data.push(hero.name)
            }
            if(data.length == ids.length){
                break
            }
        }
        res.json(data)
    }catch (err){
        console.log(err)
    }
})

app.get('/api/lists/get_race/:name', (req,res)=>{
    var name = req.params.name.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    try{
        var data ={}
        var ids=store.get(name)
        for(const hero of superhero_data){
            if(ids.includes(hero.id.toString())){
                data[hero.name] = hero.Race
            }
        }
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.get('/api/lists/get_publisher/:name', (req,res)=>{
    var name = req.params.name.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    try{
        var data ={}
        var ids=store.get(name)
        for(const hero of superhero_data){
            if(ids.includes(hero.id.toString())){
                data[hero.name] = hero.Publisher
            }
        }
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.post('/api/lists/edit/add/:list/:id',(req,res)=>{
    try{
        var list = req.params.list.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
        var id = req.params.id.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
        var data = store.get(list.trim())
        data.push(id.trim())
        store.put(list.trim(), data)
        // saved_lists[req.params.list.trim()].push(parseInt(req.params.id))
        res.json(data)
    }catch (err){
        console.log(err)
        res.status(500).send("Error")
    }
})
app.delete('/api/lists/edit/delete/:list/:id',(req,res)=>{
    try{
        var temp=[]
        var item = store.get(req.params.list.trim())
        for(var a in item){
            if(item[a] != req.params.id){
                temp.push(item[a])
            }
        }
        store.put(req.params.list.trim(), temp)
        // saved_lists[req.params.list] = temp
        res.status(200).send("Ok")
    }catch (err){
        console.log(err)
        res.status(500).send("Error")
    }
})

app.get('/api/superhero_data/abilities/:hero_id',(req, res)=>{
    try{
        for(const hero of superhero_ability_data){
            if(hero.hero_names == req.params.hero_id){
                var abilities =[]
                for(const ability in hero){
                    if(hero[ability]=="True"){
                        abilities.push(ability)
                    }
                }
                res.json(abilities)
                return;
            }
        }
        res.send("Hero not found")
    }catch(err){
        console.log(err)
        res.status(500).send("Error loading JSON")
    }
})

app.get('/api/superhero_data', (req,res)=>{
    try{
        res.json(superhero_data)
    }catch{
        res.status(500).send("Error loading JSON")
    }
})

app.get('/api/superhero_ability_data', (req,res)=>{
    try{
        res.json(superhero_ability_data)
    }catch{
        res.status(500).send("Error loading JSON")
    }
})

app.get('/api/publishers',(req,res)=>{
    var data=[]
    try{
        for(var hero of superhero_data){
            if(data.includes(hero.Publisher)){
                continue
            }else{
                data.push(hero.Publisher)
            }
        }
        res.json(data)
    }catch (err){
        console.log(err)
        res.status(500).send("Error getting publishers")
    }
})

app.get('/api/superhero_data/search/:search_by/:search/:amount', (req, res)=>{
    var search = req.params.search.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    var search_by = req.params.search_by.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    var amount = req.params.amount.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    switch(search_by){
        case "Name":
            try{
                res.json((search_by_name(search=search, amount = amount)))
            }catch (err){
                console.log(err)
                res.status(500).send("Error loading JSON")
            }
            break
        case "Id":
            try{
                res.json((search_by_id(search=search, amount = amount)))
            }catch (err){
                console.log(err)
                res.status(500).send("Error loading JSON")
            }
            break
        case "Race":
            try{
                res.json((search_by_race(search=search, amount = amount)))
            }catch (err){
                console.log(err)
                res.status(500).send("Error loading JSON")
            }
            break
        case "Publisher":
            try{
                res.json((search_by_publisher(search=search, amount = amount)))
            }catch (err){
                console.log(err)
                res.status(500).send("Error loading JSON")
            }
            break
        case "Ability" :   
            try{
                res.json((search_by_ability(search=search, amount = amount)))
            }catch (err){
                console.log(err)
                res.status(500).send("Error loading JSON")
            }
            break
    }
})

app.post('/api/superhero_data/update/:hero_id',(req,res)=>{
    try{
        var f = false;
        let content = JSON.parse(fs.readFileSync('./data/superhero_info.json', 'utf-8'))
        let abilities = JSON.parse(fs.readFileSync('./data/superhero_powers.json', 'utf-8'))
        for(let i=0; i<content.length; i++){
            if(content[i].id == req.body[0].id){
                content[i] = req.body[0]
                fs.writeFileSync('./data/superhero_info.json', JSON.stringify(content))
                f = true;
                break
            }
        }
        for(let i=0; i<abilities.length;i++){
            if(abilities[i].hero_names == req.body[0].name || abilities[i].hero_names == req.body[2]){
                abilities[i] = req.body[1]
                fs.writeFileSync('./data/superhero_powers.json', JSON.stringify(abilities))
                f=true
                break
            }
        }
        f ? res.send(req.body):res.status(404).send("Hero not found")      
    }catch(err){
        console.log(err)
        res.status(500).send("Error loading JSON")
    }
})

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})


function search_by_name(...elements){
    var data=[]  
    for(const hero of superhero_data){
        if(checkSimilarity(hero.name, elements[0])){
            data.push(hero.name)
        }
        if(data.length>=elements[1]){
            return data
        }
    }
    return data
}
function search_by_id(...elements){
    var data=[]  
    console.log(elements[0])
    for(const hero of superhero_data){
        if(elements[0].toString().trim() === hero.id.toString()){
            data.push(hero.name)
        }
        if(data.length>=elements[1]){
            return data
        }
    }
    return data
}

app.get('/api/superhero_data/:hero_name', (req,res)=>{
    var hero_name = req.params.hero_name.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
    try{
        console.log(hero_name)
        for(var hero of superhero_data){
            if(hero.name.toString().trim() === hero_name.trim()){
                res.json(hero)
                return
            }
        }
        console.log("yafgafg")
        res.status(404).send("Hero not found")
    }catch(err){
        res.status(500).send("Error")
        console.log(err)
    }
})

function search_by_race(...elements){
    var data=[]  
    for(const hero of superhero_data){
        if(checkSimilarity(hero.Race, elements[0])){
            data.push(hero.name)
        }
        if(data.length>elements[1]){
            return data
        }
    }
    return data
}
function search_by_publisher(...elements){
    var data=[]  
    for(const hero of superhero_data){
        if(checkSimilarity(hero.Publisher, elements[0])){
            data.push(hero.name)
        }
        if(data.length>elements[1]){
            return data
        }
    }
    return data
}
function search_by_ability(...elements){
    var data=[]  
    for(const hero of superhero_ability_data){
        for(ability in hero){
            if(hero[ability] == "False"){
                continue
            }else{
                if(checkSimilarity(ability , elements[0])){
                    data.push(hero.hero_names)
                    break
                }
            }
        }
        if(data.length>=elements[1]){
            return data
        }
    }
    return data
}

function checkSimilarity(str1,str2){
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
    var st=""
    //loop over second word
    for(i=0;i<str2.length;i++){
        //set st to str1 and remove all current character
        st = str1.replace(str2[i],"")
        //if the strings are equal means nothing was changed therefor there is a letter that doest exist word 1
        if(st===str1){
            return false
        }
        str1 = st
    }
    return true
}