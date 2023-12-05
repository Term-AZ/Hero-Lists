const Create_dropdown=async(id)=>{
    // if(e==""){
    //     return
    // }

    console.log("testing:"+id)
    var data = await get_hero(id)
    var abilities = await get_hero_ability(id)

    console.log(data)
    try{
        var s = document.getElementById("dropdown")
        s.remove()
    }catch(err){
        console.log(err)
    }
    
    var dropdown_container = document.createElement("div")
    dropdown_container.id = "dropdown"
    dropdown_container.className = "dropdown_container"
    
    var hero_data = document.createElement("div")
    var dropdown_list = document.createElement("ul")
    var ability_list = document.createElement("ul")
    dropdown_list.className='dropdown_list'
    ability_list.className='ability_list'

    for(var x of Object.keys(data[0])){
        var li = document.createElement("li")
        li.className = "drop_down_list_item"

        var name = document.createElement("div") 
        name.className = "name"
        name.setAttribute("name", "name")
        name.appendChild(document.createTextNode(`${x}:  `))
        li.appendChild(name)


        var val = document.createElement("div")
        val.className ="item"
        val.setAttribute("name","val")
        val.appendChild(document.createTextNode(`${data[0][x]}`))
        li.appendChild(val)

        dropdown_list.appendChild(li)
    }
    try{
        for(var x of abilities){
            var li= document.createElement("li")
            li.appendChild(document.createTextNode(`${x.ability_name}`))
            li.setAttribute("name", "ability")
            ability_list.appendChild(li)
        }
    }catch{}
    
    console.log("past loop 2")
    hero_data.appendChild(document.createTextNode("Data:"))
    hero_data.appendChild(dropdown_list)
    hero_data.appendChild(document.createTextNode("Abilities:"))
    hero_data.appendChild(ability_list)


    dropdown_container.appendChild(hero_data)


    try{
        var li = document.getElementById(id)
        console.log(li)
        li.appendChild(dropdown_container)
        li.scrollIntoViewIfNeeded({ behavior: "smooth", block: "end", inline: "nearest" });
    }catch(err){
        console.log(err)
    }
}
async function get_hero(id){
    const response = await fetch(`/api/superhero_data/${id}`).then(res=>res.json()).catch((err)=>{console.log(err)})
    
    return(response)
}

async function get_hero_ability(id){
    const response = await fetch(`/api/superhero_data/abilities/${id}`).then(res=>res.json()).catch((err)=>{console.log(err)})
    return(response)
}



export default Create_dropdown