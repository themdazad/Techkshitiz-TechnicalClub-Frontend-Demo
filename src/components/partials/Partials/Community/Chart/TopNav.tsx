import React from 'react'
import logo from '../../../../images/WhatsApp.svg.webp'
function TopNav() {
    return (
        <>
            <div className=' cursor-default w-full h-[5vh]  bg-[#0b1620] flex items-center justify-start'>
                <div className=' w-200 h-full flex items-center justify-center  '>
                    <div>
                        <img src={logo} alt=" No loaded" className='w-[25px] h-[25px] ml-[10px] ' />
                    </div>
                    <b className='ml-[5px] text-[13px] text-[#a5b3bc] font-[600]'>VikashApp</b>
                </div>
            </div>

        </>
    )
}

export default TopNav
