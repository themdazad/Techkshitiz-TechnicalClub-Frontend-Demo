import React from 'react'
import { NavLink } from 'react-router-dom'

function ClubManagerLeftSideNavBar(props) {
    return (
        <>
            <NavLink to={props.link} className="nav-option option6">
                <span className="material-symbols-outlined">
                    {props.icon}
                </span>
                <div>
                    <h3 className='w-[190px] truncate'>{props.text}</h3>
                </div>
            </NavLink>
        </>
    )
}

export default ClubManagerLeftSideNavBar
