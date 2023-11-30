import Create_dropdown from "./Create_dropdown"

const Populate_list = (data)=>{
    for(var hero of data){
        var heroList = document.getElementById(hero.hero_name[0].toUpperCase())
                var li = document.createElement("li")
                li.className = "hero_entry"
                li.appendChild(document.createTextNode(hero.hero_name))
                li.id = hero.id
                li.addEventListener('click', (e)=>{
                    Create_dropdown(e.target.id)
                    console.log(e.target.id)
                    // li.appendChild(<Dropdown/>)
                    // return(<Dropdown/>)
                })
                heroList.appendChild(li)
    }
}

export default Populate_list