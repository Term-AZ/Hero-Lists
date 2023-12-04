const get_date = () =>{
    const date = new Date()
    const year= date.getFullYear()
    const month = date.getMonth()+1
    const day =date.getDate()
    let currentDate= `${year}-${day}-${month}`

    return currentDate
}

module.exports = get_date