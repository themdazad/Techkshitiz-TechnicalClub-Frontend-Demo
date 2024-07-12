import React, { useEffect, useState } from 'react'
import useSendMessage from '../hooks/useSendMessage.tsx';
// import io from 'socket.io-client'
// const socket = io();
function MessageBoxBottomNavBar(props) {
    const [message, setmessageInput] = useState('');
    const { loading, sendMessage } = useSendMessage();
    // useEffect(() => {
    //     // socket.on("connect", () => {
    //     //     console.log("Connected User" + socket.id);
    //     // });
    //     // return () => {
    //     //     socket.on("disconnect", () => {
    //     //         console.log("Disconnected User" + socket.id);
    //     //     });
    //     // }
    // }, [])

    const onhandelSubmit = async (event) => {
        event.preventDefault();
        if (!message) {
            return;
        }
        await sendMessage(message);
        setmessageInput('')
    }
    return (
        <>
            <div className=' w-full h-[53px]  border-t-[1px] border-l-[2px] border-[#0e1a24]  bg-[#091520] flex justify-center items-center'>
                <div className=' w-[95%] h-[90%] flex justify-center items-center'>
                    <div className=' w-[100px] h-full  gap-6 flex justify-center items-center'>
                        <span className="material-symbols-outlined cursor-pointer text-[#c5c5c5]">
                            sentiment_satisfied
                        </span>
                        <span className="material-symbols-outlined cursor-pointer rotate-[30deg] text-[#bcbcbc]">
                            attach_file
                        </span>
                    </div>

                    <form className=' w-[90%] h-full flex justify-center items-center' onSubmit={onhandelSubmit}>
                        <textarea name='message' style={{ background: "none", resize: "none" }} value={message} onChange={(e) => setmessageInput(e.target.value)} className=' p-[7px] outline-none border-none h-[40px] w-[95%] text-clip text-[#c8c8c8] text-[13px]' placeholder='Type a message' />

                        <button type='submit' className='text-[#d4d4d4] w-[50px] h-full flex justify-center items-center  '>
                            <span className="material-symbols-outlined cursor-pointer text-[28px]">
                                send
                            </span>
                        </button>

                    </form>
                    <button className=' w-[50px] text-[#d4d4d4] h-full flex justify-center items-center  '>
                        <span className="material-symbols-outlined cursor-pointer ">
                            mic
                        </span>
                    </button>
                </div>
            </div>

        </>
    )
}

export default MessageBoxBottomNavBar
