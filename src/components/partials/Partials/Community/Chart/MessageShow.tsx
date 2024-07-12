import React from 'react'
import useConversation from './Zustand/useConversation.tsx';
import ExtractTime from './ExtractTime.tsx';
import { useAuthChartContext } from '../../../../contexts/ChartAuthContext.tsx';

function MessageShow({ message }) {
    const { ChartAuthUser } = useAuthChartContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === ChartAuthUser._id;
    const chartClass = fromMe ? 'left-[53%]' : 'left-[10px]'
    const profileImage = fromMe ? ChartAuthUser.profileImage : selectedConversation?.profileImage;
    const bubbleBgColor = fromMe ? 'bg-[#173853] text-[#fff]' : ' bg-[#2e4c64] text-white rounded ';
    const formateTime = ExtractTime(message.createdAt);
    return (
        <>
            <div className={`w-[100%]  pb-[20px] pt-[20px]`}>
                <div className={` ml-[20px] w-[500px] h-[auto]   m-2 flex justify-center items-start relative     rounded-[10px] ${bubbleBgColor} ${chartClass}`}>
                    <div className=' w-[30px] h-[30px] mt-[6px] rounded-[50%] bg-gray-900'>
                        <img src={profileImage} alt="" />
                    </div>
                    <div className='w-[400px] h-[auto] p-[10px]'>
                        {message.message}
                    </div>
                    <p className=' w-[50px] h-[100%]  flex justify-center items-end mb-1  text-[13px]'>{formateTime}</p>
                </div>
            </div>

        </>
    )
}

export default MessageShow
