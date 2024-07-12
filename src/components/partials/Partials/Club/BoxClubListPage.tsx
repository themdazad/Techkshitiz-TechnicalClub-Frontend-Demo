import React from 'react'
import { useNavigate } from 'react-router-dom'

function BoxClubListPage(props) {
    const navigate = useNavigate();
    const navigateurl = () => {
        navigate(`/details/${props.clubname}/club/${props.id}`, { state: props.clubData });
    }

    return (
        <>
            <div onClick={navigateurl} className='w-[320px] cursor-pointer  m-[20px] max-[480px]:w-[100%] max-[480px]:m-0 max-[480px]:mb-[40px] space-y-4 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[350px] rounded-[10px] p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                <div className=' w-[100%] h-[50%] flex justify-center items-center '>
                    <img src={`${props.image_Url}`} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                </div>
                <h1 className=' text-center text-[#ffc71e] text-[26px] font-[600] mt-6 cursor-pointer uppercase'>{props.clubname}</h1>
                <p className='text-[14px] text-[#fff] text-center w-[100%] capitalize  h-[80px]'>{props.clubdescription.substring(0,140)}...</p>
            </div>
        </>
    )
}

export default BoxClubListPage
