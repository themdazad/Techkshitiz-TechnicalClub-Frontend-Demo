import React from 'react'
import { useNavigate } from 'react-router-dom'

function ContestListBox(props) {
    const navigate = useNavigate();
    const contestPageNavigate = (url) => {
        navigate(url, { state: props?.ContestData })
    }

    return (
        <>
            <div key={props.key} className=' w-[320px]  m-[20px]  select-none space-y-2 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[450px] rounded-[10px]  cursor-default  p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                <div className=' w-[100%] h-[40%] flex justify-center items-center '>
                    <img src={props.image_Url} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                </div>
                <div className=' w-[100%] h-[60%]  space-y-3'>

                    <h1 className=' text-center text-[#ffc71e] text-[26px] w-[90%] truncate font-[600] mt-4 cursor-default uppercase'>{props.contestname}</h1>
                    <p className='text-[14px] text-[#fff] text-wrap w-[100%]  h-[110px]  pl-[10px]   overflow-hidden '>{String(props.clubdescription).substring(0, 214)}</p>
                    <div className=' w-[100%] h-[80px] flex cursor-pointer   pr-[10px] pb-[14px] pt-[20px] justify-end  items-center'>
                        <div onClick={() => { contestPageNavigate(props.url) }} className='w-[160px] gap-2 h-[45px] rounded-[5px] text-[14px] font-[600] hover:bg-[#182d3b]  transition ease-in-out delay-150  border-[#2a4651] text-[#fff] border-[1px] flex justify-center items-center'>
                            View Contest
                            <span className="material-symbols-outlined animate-pulse text-[#ffdd00]">
                                start
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ContestListBox
