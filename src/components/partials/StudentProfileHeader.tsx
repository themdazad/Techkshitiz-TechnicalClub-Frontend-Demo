import React from 'react';
import { NavLink } from "react-router-dom"
import ClubLogo from '../images/TechKshitiz.png';

const StudentProfileHeader = ({ SetSideBarOpenClose, SideBarOpenClose }) => {
    return (
        <>
            <div className=" sideNavBar w-[100%] h-[60px]   sticky top-0 bg-[#0d1526] border-b-[1px] border-[#203450] flex justify-center items-center">

                <div className={`w-[50px]  max-ml:hidden  h-full flex justify-center items-center`}>
                    <span id='menuButton' onClick={() => { SetSideBarOpenClose(!SideBarOpenClose) }} className={`${!SideBarOpenClose ? "  ml:hidden" : ""} material-symbols-outlined cursor-pointer text-[36px]  max-ml:hidden`}>
                        apps
                    </span>
                    <span id='menuButton' onClick={() => { SetSideBarOpenClose(!SideBarOpenClose) }} className={`${SideBarOpenClose ? "hidden" : ""} material-symbols-outlined cursor-pointer text-[36px]  max-ml:hidden`}>
                        close
                    </span>
                </div>
                <div className={`w-[300px]  h-[auto] flex justify-start pl-3 max-lg:w-[250px] items-center `}>
                    <NavLink to="/" className="flex justify-center items-center">
                        <div className=" w-[250px] max-lg:w-full h-[100%] flex justify-center items-center  max-xl:w-[240px]    max-[800px]:w-[200px]">
                            <img
                                src={ClubLogo}
                                // max-[800px]:w-[40px] max-[800px]:h-[34px]
                                className="w-[250px] h-[40px]  max-xl:w-[240px]   max-sm:w-[200px] "
                                alt="Loading.."
                            />
                        </div>
                    </NavLink>
                </div>
                <div style={{ transition: 'all 1s' }} className={`${SideBarOpenClose ? "  w-[74%]" : " w-[34%] max-ml:w-[74%]"}  z-50  h-[auto] flex justify-end items-center pr-4 max-sm-m:pr-2`}>
                    <span id='menuButton' onClick={() => { SetSideBarOpenClose(!SideBarOpenClose) }} className={`${!SideBarOpenClose ? "hidden" : ""} material-symbols-outlined cursor-pointer text-[36px]  z-50 ml:hidden`}>
                        apps
                    </span>
                    <span id='menuButton' onClick={() => { SetSideBarOpenClose(!SideBarOpenClose) }} className={`${SideBarOpenClose ? "hidden" : ""} material-symbols-outlined cursor-pointer text-[36px]  z-50 ml:hidden`}>
                        close
                    </span>
                </div>
            </div>
        </>
    );
}

export default StudentProfileHeader;
