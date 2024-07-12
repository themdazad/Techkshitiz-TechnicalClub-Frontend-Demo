import React from 'react'
import logo from '../../../images/TechKshitiz.png'
import { NavLink } from 'react-router-dom';
function CommunityHeader() {
    return (
        <>
            <div className='bg-[#0b1b24]  w-[100vw] h-[70px] flex justify-between items-center start z-40 pr-[30px]'>
                <div className='w-[290px] p-[10px] gap-[6px] flex justify-end items-center '>
                    <NavLink to={'/'} className=" select-none">
                        <img src={logo} alt="Logo" className='w-[250px] h-[35px]' />
                    </NavLink>
                </div>
                <nav className='w-[80%] flex justify-end items-center'>
                    <ul className='w-[78%] flex justify-center items-center gap-5 text-[#c7daea] text-[14px]  '>
                        <li><NavLink to={'/government-engineering-college-siwan/community'}>Home</NavLink>  </li>
                        <li><NavLink to={"/government-engineering-college-siwan/community/contact-us"} > Contact Us</NavLink></li>
                        <li><NavLink to={"/government-engineering-college-siwan/community/resources"} >  Resources</NavLink></li>
                        <li><NavLink to={"/government-engineering-college-siwan/community/join-us"} >    Join Us</NavLink></li>
                        <li><NavLink to={"/government-engineering-college-siwan/community/feedback"} >   Feedback</NavLink></li>
                        <div className='w-[450px] h-[100%] flex justify-end items-center gap-8'>
                            <li><NavLink to={"/government-engineering-college-siwan/community/instruction/post_create/"} className="text-[#9cc0df]  font-[600]" >How to post?</NavLink></li>
                            {/* <li><NavLink to={"/government-engineering-college-siwan/community/signin"} >   Sign in</NavLink></li> */}
                            <NavLink to='/government-engineering-college-siwan/community/signin' className="text-[#c1c1c1] ">
                                <button className='w-[100px] h-[30px] flex justify-center items-center p-[20px] border-[1px] border-[#1e3343] bg-[#0e1d28]  hover:text-[#c0e0f3de] text-[#c0e0f3] transition ease-in-out delay-200 hover:bg-[#132634] rounded-[8px]'>Sign up</button>
                            </NavLink>

                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default CommunityHeader
