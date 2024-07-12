import React from 'react'
import { useSocketContext } from '../../../../contexts/Socket.tsx';

function Conversation({ conversation, setSelectedConversation }) {
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(Object(conversation)._id);
    return (
        <>
            <div onClick={() => { setSelectedConversation(Object(conversation)) }} className={`  ${isOnline ? 'bg-[green]' : 'bg-[#122733]'} w-full h-[50px]  p-[10px] mt-1 mb-2 border-[1px] border-[#20445c95]    transition ease-in-out delay-150 rounded-[5px]   cursor-pointer  flex     items-center `}>
                <div className=' w-[40px] h-[40px] rounded-[50%] bg-gray-900'>
                    <img src={Object(conversation).profileImage} alt="" />
                </div>
                <div className=' w-[70%] h-[50px]   '>
                    <div className=' w-[200px] h-[25px] flex items-center truncate'>
                        <b className=' m-2 mt-3  w-[200px] h-[20px] overflow-hidden text-[#d8effdda]'>{Object(conversation).screen_name}</b>
                    </div>
                    <div className=' w-[200px] h-[20px]  flex items-center overflow-hidden'>
                        <p className=' ml-2  h-[12px] flex items-center   overflow-hidden text-[#d8effdda]'>....</p>
                    </div>

                </div>
                <div className=' h-[50px]   w-[50px] flex justify-center '>
                    <b className=' mt-1 font-[600]'></b>
                </div>
            </div>
        </>
    )
}

export default Conversation
