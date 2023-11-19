import React from 'react'
import './Landing.css'

const Landing = () => {
    return(
        <div className='mainpage_background'>
            <div className='mainpage_scrolling_image'>
                <div className='mainpage_info_container'>
                    <div className='mainpage_about_header_container'>
                        <h1 className='mainpage_title'>
                            Welcome to Superhero Lists!
                        </h1>
                    </div>
                    <div className='mainpage_about_text_container'>
                            Browse the information of various Superhero's here.
                            Create Your own lists and view other users' lists!
                    </div>
                    <div className='mainpage_about_button_container'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing