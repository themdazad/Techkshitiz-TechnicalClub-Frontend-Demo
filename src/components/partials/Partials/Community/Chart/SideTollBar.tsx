import React from 'react'

function SideTollBar() {
 
    return (
        <>
            <div className=' h-[95vh] w-[50px] bg-[#0b1620]   flex items-center justify-center'>
                <div className=' h-full w-[80%]   '>
                    <div className='h-[50%] w-full '>
                        <div className='w-full h-[40px] flex justify-center  hover:bg-[#182532] items-center hover:border-l-2 border-cyan-500  cursor-pointer'>
                            <i className="fa-solid fa-comment-lines text-[#c0c7d2]     text-[15px] cursor-pointer"></i>
                         
                        </div>
                        <div className='w-full h-[40px] flex justify-center hover:bg-[#182532] items-center hover:border-l-2 border-cyan-500  cursor-pointer'>
                            <span className="material-symbols-outlined text-[#c0c7d2]     text-[20px]">
                                call
                            </span>
                        </div>
                        <div className='w-full h-[40px] flex justify-center  hover:bg-[#182532]  items-center hover:border-l-2 border-cyan-500  cursor-pointer'>
                            <span className="material-symbols-outlined text-[#c0c7d2]     text-[20px] cursor-pointer">
                                donut_large
                            </span>
                        </div>
                    </div>
                    <div className='h-[50%] w-full flex justify-center items-end '>
                        <div className='w-full  h-[auto]'>
                            <div>
                                <div className='w-full h-[40px] flex justify-center  hover:bg-[#182532] items-center    cursor-pointer'>
                                    <span className="material-symbols-outlined text-[#c0c7d2]     text-[22px]">
                                        star
                                    </span>
                                </div>
                                <div className='w-full h-[40px] flex justify-center hover:bg-[#182532] items-center    cursor-pointer'>
                                    <span className="material-symbols-outlined text-[#c0c7d2]     text-[20px]">
                                        inventory_2
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className='w-full h-[40px] flex justify-center  hover:bg-[#182532]  items-center    cursor-pointer'>
                                    <span className="material-symbols-outlined  text-[#c0c7d2]     text-[20px]">
                                        settings
                                    </span>
                                </div>
                                <div className='w-full h-[40px] flex justify-center  hover:bg-[#182532]  items-center    cursor-pointer'>
                                    <div className='w-[30px] h-[30px] rounded-[50%] bg-gray-600'>

                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default SideTollBar
