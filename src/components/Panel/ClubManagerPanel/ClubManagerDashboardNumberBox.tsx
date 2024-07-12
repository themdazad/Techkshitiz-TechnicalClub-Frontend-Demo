import React from 'react'
import { useNavigate } from 'react-router-dom'

function ClubManagerDashboardNumberBox(props) {
    const navigate = useNavigate();
    const navitePage = () => {
        navigate(props.link, { state: props.state });
    }
    return (
        <>
            <div onClick={navitePage} className="w-[250px] hover:scale-105 cursor-pointer transition ease-in-out delay-200  flex h-[150px] bg-[#5a2ce5] rounded-[20px] justify-center items-center  gap-6 float-left m-[20px]">
                <div className="text">
                    <h2 className="topic-heading font-[700] text-[#fff]">{props.totalnumber}</h2>
                    <h2 className="topic text-[#fff] w-[150px] truncate font-[700px] capitalize" >{props.text}</h2>
                </div>
                <div >
                    <span className="material-symbols-outlined text-[50px] text-[#fff]">
                        {props.icon}
                    </span>
                </div>
            </div>

        </>
    )
}

export default ClubManagerDashboardNumberBox
