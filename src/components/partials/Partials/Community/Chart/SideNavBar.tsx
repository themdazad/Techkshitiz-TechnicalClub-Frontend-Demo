import React, { useEffect, useState } from 'react'
import SideTollBar from './SideTollBar.tsx'
import Unmessage from './Unmessage.tsx';
import MessageBox from './MessageBox.tsx';
import useGetConversation from '../hooks/useGetConversation.tsx';
import useConversation from './Zustand/useConversation.tsx'; 
import Conversation from './Conversation.tsx';

function SideNavBar() {
    const { loading, conversations } = useGetConversation();
    const [userdatas, setuserdatas] = useState([])
    const [inputget, inputset] = useState('');
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === Object(conversations)._id;


    // const datachange = (event) => {
    //     event.preventDefault();
    //     if (inputget !== '') {
    //         const data = getdata.filter((element) => {
    //             return Object(element).username === inputget
    //         })
    //         if (data) {
    //             setdata(Object(data));
    //         }
    //     } else {

    //         setdata(Object(conversations));
    //     }
    // }

    // const userlogindata = (obj) => {
    //     setIstrue(true);
    //     setuserdatas(obj);
    // }


    return (
        <>
            <div className={`w-[100%] h-[95vh] bg-[#0a1520] flex`}>
                <SideTollBar />
                <div className='w-[100%] h-[95vh]   flex   items-center'>
                    <div className='w-[350px] h-[95vh] border-l-[2px] border-t-[2px]  border-[#0e1a24] rounded-tl-[10px] bg-[#0a1520]'>

                        <div className='w-full h-[19vh]   flex justify-center items-center '>
                            <div className='w-[90%] h-full'>
                                <div className=' w-full h-[50%]   flex justify-center items-center'>
                                    <div className=' w-[50%] h-full  flex items-center justify-start '>
                                        <b className=' cursor-default text-[20px] text-[#d5d5d5]'>Chats</b>
                                    </div>
                                    <div className=' w-[50%] h-full  flex items-center justify-end '>
                                        <div className='w-[40px] h-full flex justify-center    items-center     '>
                                            <span className="material-symbols-outlined text-[#d5d5d5ea] text-[20px] cursor-pointer">
                                                edit_square
                                            </span>
                                        </div>
                                        <div className='w-[40px] h-full flex justify-center    items-center    '>
                                            <span className="material-symbols-outlined text-[#d5d5d5ea] text-[22px] cursor-pointer  ">
                                                label
                                            </span>
                                        </div>
                                        <div className='w-[40px] h-full flex justify-center    items-center    '>

                                            <span className="material-symbols-outlined text-[#d5d5d5ea] text-[20px] cursor-pointer">
                                                filter_list
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className=' w-full h-[50%]  flex justify-center items-center'>
                                    <form className=' w-[98%] h-[60%] border-[2px]   border-b-green-600 flex rounded-[5px] justify-center items-center bg-[#fff]'>

                                        <input type="text" id='message' name='search' value={inputget} onChange={(event) => { inputset(event.target.value) }} style={{ background: "none" }} placeholder='Search or start a new chat' className='w-[90%] bg-none  p-[6px] border-none outline-none text-[14px]' />
                                        <label htmlFor='message' className='w-[30px] h-full flex justify-center items-center '>
                                            <span className="material-symbols-outlined text-[20px] cursor-text">
                                                search
                                            </span>
                                        </label>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className=' w-full h-[74vh] bg-[#0a1520] flex justify-center   items-center ' >
                            <div className=' w-[100%] h-[76vh] flex justify-center  overflow-auto overflow-x-hidden'>
                                <div className='w-[90%] h-[auto]   ' >

                                    {conversations.map((element) => (
                                        <Conversation key={Object(element)._id} setSelectedConversation={setSelectedConversation} conversation={element} />

                                    )

                                    )}


                                </div>
                            </div>

                        </div>
                    </div>
                    {!isSelected ? (
                        <MessageBox userdata={selectedConversation} />
                    ) : (<Unmessage />)
                    }
                </div>
            </div>

        </>
    )
}

export default SideNavBar
