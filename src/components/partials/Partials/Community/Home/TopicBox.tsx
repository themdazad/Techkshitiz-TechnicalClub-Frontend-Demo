import React from 'react'
import { NavLink } from 'react-router-dom'

function TopicBox(props) {
    return (
        <>
            <NavLink to={props.link} className='  h-[40px] pl-0 pr-0 flex justify-start gap-4 cursor-pointer items-center'>
                <div className='w-[40px] h-[100%] flex justify-center items-center rounded-[4px] bg-[#1e3b48]'>
                    <span className="flex justify-center items-center">
                        {props.topicIcon}
                    </span>
                </div>
                <h1 className='text-[#ccc] text-[15px] font-[500]' >{props.topicName}</h1>
            </NavLink>

        </>
    )
}

export default TopicBox
