import React from 'react'


function MessageBoxTopNavBar(props) {
    return (
        <>
            <div className=' w-[100%] h-[60px] bg-[#091520] flex justify-center items-center border-b-[1px] border-[#0e1a24] border-t-[2px] border-l-[2px]'>
                <div className=' w-[95%] h-[95%]    flex justify-center items-center '>
                    <div className=' cursor-default w-[95%] h-full   flex justify-start items-center '>
                        <div className=' w-[50px] h-[50px] rounded-[50%] bg-slate-800'>
                        <img src={Object(props.userdata).profileImage} alt="" />
                        </div>
                        <div className='h-full w-[auto]' >
                            <div className='mt-[5px]'>
                                <b className='ml-[10px] capitalize text-[#c0c0c0] '> {props.userdata.screen_name}</b>
                            </div>
                            <p className='ml-[12px] text-[12px] text-[#c0c0c0f4]'>{props.userdata.username}</p>
                        </div>
                    </div>
                    <div className=' w-[5%] h-full  flex justify-center items-center '>
                        <div className=' h-[80%] rounded-[10px] w-[80%] cursor-pointer hover:bg-[#0f1c25] flex justify-center items-center' >
                            <span className="material-symbols-outlined text-[25px] text-[#8a8a8a]">
                                search
                            </span>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default MessageBoxTopNavBar
