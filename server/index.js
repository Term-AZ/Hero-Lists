var express = require('express');
var cors = require('cors')
const cookieParser = require('cookie-parser');
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const saltRounds=10
var generate_token = require('./jwt/generate_token.js')
var generate_refresh = require('./jwt/generate_refresh.js')
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
app.use(cookieParser())
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


//admin@gmail.com
//adminpassword1!
app.post("/user/register",(req,res)=>{
    const {email, nickname, password} = req.body
    
    if(!validate_email(email)){
        return res.status(400).send({"msg": "Please input valid email"})
    }
    if(!validate_password(password)){
        return res.status(400).send({"msg": "Password must be 6-16 character long and must contain at least one number and special character"})
    }

    var q = "SELECT * FROM users where email = ?"
    db.query(q, [email], (err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
        console.log(result)
        if(result.length == 0){
            bcrypt.genSalt(saltRounds, function(err,salt){
                if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
                bcrypt.hash(password, salt, function(err,hash){
                    var dbstatement = "INSERT INTO users(email, nickname, user_password, admin) VALUES(?,?,?,?)"
                    db.query(dbstatement, [email,nickname, hash, 'false'], (err2)=>{
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

app.get('/refresh', (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken)
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY  );
      const accessToken = jwt.sign({ email: decoded.email, admin:decoded.admin }, process.env.JWT_SECRET_KEY  , { expiresIn: '1h' });
  
    //   return res.json({jwt: accessToken})
      res
        .header('Authorization', accessToken)
        .send(decoded.email);
    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
  });

app.post('/user/login',(req,res)=>{
    const {email , password} = req.body
    var q ="SELECT * FROM users WHERE email = ?"
    db.query(q,[email], (err,result)=>{
        if(result[0] ==null){
            return res.status(400).send({"msg":"Email not registered "})
        }
        if(result[0].disabled == 1){
            return res.status(400).send({"msg":"Account has been disabled "})
        }else{
            bcrypt.compare(password, result[0].user_password, function(err, hashresult){
                if(err){console.log(err) ; return res.status(500).send({"msg":"Error has occured"})}
                if(hashresult){
                    var token = generate_token({id:result[0].id,email: email, admin:result[0].admin})
                    return res
                        .cookie('refreshToken', generate_refresh({email: email, admin:result[0].admin}), { httpOnly: true, sameSite: 'strict',path:"/" })
                        .header('Authorization', token)
                        .json({
                                id: result[0].id,
                                email: email,
                                admin: result[0].admin,
                                authorization:  token
                            });



                    // return res.json({
                    //     email: email,
                    //     admin: result[0].admin,
                    //     jwt: generate_token({email: email, admin:result[0].admin}),
                    //     jwt_refresh: generate_refresh({email: email, admin:result[0].admin})})
                }else{
                    return res.status(400).send({"msg":"Password does not match"})
                }
            })
        }
    })
})

app.get('/api/superhero_data/hero_names',(req,res)=>{
    // var q = 'SELECT superheros.id, superheros.hero_name, gender, eye_color, height, publisher, skin_color, alignment, hero_weight, ability_name from superheros inner join hero_abilities on superheros.id = hero_abilities.hero_id inner join abilities on abilities.id = hero_abilities.ability_id order by superheros.id'
    var q = "SELECT * FROM superheros"
    db.query(q, (err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})
app.get('/api/superhero_data/heronames',(req,res)=>{
    // var q = 'SELECT superheros.id, superheros.hero_name, gender, eye_color, height, publisher, skin_color, alignment, hero_weight, ability_name from superheros inner join hero_abilities on superheros.id = hero_abilities.hero_id inner join abilities on abilities.id = hero_abilities.ability_id order by superheros.id'
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
    var id =  req.params.hero_id
    //var q = 'SELECT ability_name FROM abilities INNER JOIN hero_abilities ON hero_abilities.ability_id = abilities.id WHERE hero_abilities = ?'
    var q ='SELECT ability_name FROM abilities INNER JOIN hero_abilities ON hero_abilities.ability_id = abilities.id where hero_id = ?'
    db.query(q, [id], (err,result)=>{
        if(err) return res.status(500).send({"msg":"Error has occured"})
        if(result[0]==null){
            return res.status(400).send({"msg":"Hero not found"})
        }else{
            return res.json(result)
        }
    })
})

app.get("/user/validateToken", validate_token, (req,res)=>{
    return res.status(200).json({"msg":"true"})
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

app.get('/superherosLists/publishers',(req,res)=>{
    var q="SELECT DISTINCT publisher FROM superheros where publisher !=?"
    db.query(q, [""],(err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})

app.get("/superheroLists/heros/data", function(req,res){
    var q = "SELECT id,hero_name FROM superheros"
    db.query(q, (err,result, fields)=>{
        // res.set('Access-Control-Allow-Origin', '*');
        res.send(result)
    })
}) 

app.post('/create/list', validate_token, (req,res)=>{
    console.log(req.body)
    const {listname,listdescription} = req.body
    console.log(listname)
    var id = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET_KEY).id
    
    var q ="INSERT INTO lists(user_id, list_name, description)VALUES(?,?,?)"
    db.query(q,[id,listname,listdescription],(err)=>{
        if(err) {console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json({'name':listname})
    })
})

app.get('/get/lists', validate_token, (req,res)=>{
    var id = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET_KEY).id
    var q = 'SELECT * FROM lists where user_id = ?'
    db.query(q,[id],(err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})

app.post('/superheros/search',(req,res)=>{
    var {user_input,user_input_race,user_input_publisher,user_input_ability,search_amount} = req.body
    var search = `%${user_input}%`
    var race = `%${user_input_race}%`
    var publisher = `%${user_input_publisher}%`
    var ability = `%${user_input_ability}%`
    if(search_amount ==""){
        search_amount="1000"
    }
    var amount = parseInt(search_amount)

    console.log(search)
    console.log(race)
    console.log(publisher)
    console.log(ability)

    var q = 'select distinct superheros.id, superheros.hero_name from superheros inner join hero_abilities on hero_id = superheros.id inner join abilities on hero_abilities.ability_id = abilities.id where superheros.hero_name like ? and superheros.race like ? and superheros.publisher like ? and abilities.ability_name like ? limit ?'
    db.query(q,[search,race,publisher,ability,amount],(err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })

})



app.get('/list/get/:id', validate_token, (req,res)=>{
    const id = req.params.id.replace(/[()\s-]/g,"")
    console.log(id)
    var q ="SELECT superheros.id, hero_name from superheros inner join list_heros on list_heros.hero_id = superheros.id WHERE list_id = ?"
    db.query(q,[id],(err,result)=>{
        if(err){ console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
        console.log(result)
        return res.json(result)
    })
})

app.post('/list/addhero',validate_token,(req,res)=>{
    const {listid, heroid} = req.body
    var q = "INSERT INTO list_heros(list_id, hero_id)VALUES(?,?)"
    db.query(q,[parseInt(listid),parseInt(heroid)],(err)=>{
        if(err){ console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
        return res.json({"msg":heroid})
    })
})

app.delete('/list/delete/:id', validate_token,(req,res)=>{
    console.log("in delete")
    const id = req.params.id.replace('\"',"")
    var q = "DELETE FROM lists WHERE id=?"
    db.query(q,[id],(err)=>{
        if(err){ console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
        return res.json({"id":id})
    })
})

app.delete('/list/:id/:heroid', validate_token, (req,res)=>{
    var list_id = req.params.id
    var hero_id = req.params.heroid 

    var q='DELETE FROM list_heros WHERE list_id = ? AND hero_id = ?'
    db.query(q, [list_id, hero_id], (err)=>{
        if(err){ console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
        return res.json({"id":list_id})
    })
})

app.get('/lists/free', (req,res)=>{
    var q = "select lists.list_name, lists.description, lists.rating, list_id, COUNT(hero_id) as c from list_heros  inner join lists on lists.id = list_heros.list_id  group by list_id   order by lists.rating asc limit 10"
    db.query(q,(err,result)=>{
        if(err){ console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})

app.get('/lists/account', validate_token, (req,res)=>{
    var q = "select lists.list_name, lists.description, lists.rating, list_id, COUNT(hero_id) as c from list_heros  inner join lists on lists.id = list_heros.list_id  group by list_id   order by lists.rating asc limit 20"
    db.query(q, (err,result)=>{
        if(err){ console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
        console.log(result)
        return res.json(result)
    })
})
