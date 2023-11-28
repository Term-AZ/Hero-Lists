import React from 'react'
import './Lists.css'

const Lists = () => {
    return(
        <div>
            <div >
            <input id="new_list_name" placeholder="Enter New List Name"/>
                <button id="create_list_btn">Create List</button>
                <button id="delete_list_btn">Delete List</button>
            </div>
            <h1 id="list_title"></h1>
            <select name="sort_list" id="sort_list" className="option_dropdown">
                <option value="Name">Name Asc</option>
                <option value="Id">Name Dec</option>
                <option value="Race">Race Asc</option>
                <option value="Race">Race Dec</option>
                <option value="Publisher">Publisher Asc</option>
                <option value="Publisher">Publisher Dec</option>
            </select>
            <div className="list_view">
                <div className="data_view">
                    <ul className="data_list" id="data_list">

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Lists