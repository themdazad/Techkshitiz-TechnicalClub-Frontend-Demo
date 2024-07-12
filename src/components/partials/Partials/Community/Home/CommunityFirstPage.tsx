import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import CommunityHeader from '../CommunityHeader.tsx';
import TopicBox from './TopicBox.tsx';

function CommunityFirstPage() {
    const onHandelNewDiscussion = () => {
        const verify = localStorage.getItem('Verify_User');
        if (verify !== null) {
            const verifyUserData = JSON.parse(verify);
            console.log(verifyUserData);

            if (verifyUserData.AuthUser === true) {
                const post_create = document.getElementById('post_create');
                if (post_create !== null) {
                    if (post_create.classList.contains("hidden")) {
                        post_create.classList.remove("hidden");
                    } else {
                        post_create.classList.add("hidden");
                    }
                }

            } else {
                alert("/government-engineering-college-siwan/community/signup");
            }
        } else {
            alert("You not login")
        }
    }
    return (
        <>
            <div id='post_create' className=' hidden w-[100%] h-[100vh]  fixed top-0 left-0 bg-[#00000070]  '>
                <div className='w-[100%] h-[10%]  flex justify-end items-center pr-[30px]'>
                    <span className="material-symbols-outlined text-[40px] font-[800] cursor-pointer text-[#ffff]" onClick={onHandelNewDiscussion}>
                        close
                    </span>
                </div>
                <div className='w-[100%] h-[90%] flex justify-center items-center'>
                    <div className='w-[1000px] h-[95%] rounded-[20px] flex justify-center items-center bg-[#fff]'></div>
                </div>
            </div>
            <CommunityHeader />
            <div className='w-[100%] h-[auto] bg-[#102834]'>
                <div className=' p-[130px] pt-[60px] pb-0  h-[100%]'>
                    <div className='w-[100%] h-[200px] '>
                        <h1 className=' text-[30px] text-[#e3e3e3] font-[700] pt-[5px] pb-[5px]'>Ask me anything</h1>
                        <h1 className=' text-[20px] text-[#bfbfbf] font-[300]  pb-[5px]'>Host an AMA or discover ones to contribute to</h1>
                        <button className='w-[150px]  p-[10px] bg-[#ff2d7d] mt-[45px] rounded-[5px] text-[15px] text-[#fff]' onClick={onHandelNewDiscussion}>New discussion</button>
                    </div>
                    <div className='w-[100%] h-[auto] pt-[80px]  flex '>
                        <div className='w-[70%] h-[auto]  border-r-[1px] border-[#2f5465]'>
                            <div className='w-[100%] h-[60px] flex justify-between items-center'>
                                <div className='w-[auto ] h-[auto] flex justify-center items-center'>
                                    <ul className='flex justify-center items-center gap-8'>
                                        <li><NavLink to={"/government-engineering-college-siwan/community/?discussions_type=new"} className=" flex justify-center items-center text-[#d9d9d9] font-[400] text-[14px]">New</NavLink></li>
                                        <li><NavLink to={"/government-engineering-college-siwan/community/?discussions_type=popular"} className="flex justify-center items-center  text-[#d9d9d9] font-[600] text-[14px]" >Popular</NavLink></li>
                                        <li><NavLink to={"/government-engineering-college-siwan/community/"} className={"flex justify-center items-center text-[#d9d9d9] font-[400] text-[14px]"}>Now
                                            <span className="material-symbols-outlined flex justify-center items-center text-[14px] font-[800]">expand_more
                                            </span></NavLink></li>
                                    </ul>
                                </div>
                                <div className='w-[350px] pr-[10px] h-[20px] flex justify-center items-center'>
                                    <div className='w-[250px] h-[40px] border-[1px] border-[#d4d8dd5a] rounded-[6px] flex justify-start items-center'>
                                        <label htmlFor="disscussionSearch">
                                            <span className="material-symbols-outlined w-[35px] h-[100%] text-[#b9b9b9] cursor-default text-[20px] flex justify-center items-center">
                                                search
                                            </span>

                                        </label>
                                        <input type="text" style={{ background: 'none' }} id='disscussionSearch' className=' text-[#dadada] w-[210px] p-[8px] border-none outline-none text-[14px] font-[500]' placeholder='Search discussions' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100%] h-[auto] pt-[10px] pb-[20px] pr-[55px]  text-[#e1e1e1] '>
                                <Outlet />
                            </div>
                        </div>
                        <div className='w-[30%] h-[auto] pl-[50px] '>
                            <div className='w-[100%] h-[auto] pt-[10px] pb-[20px]'>
                                <div className='w-[100%] h-[auto] pb-[20px] border-b-[1px] border-[#2f5465]'>
                                    <h1 className='text-[14px] font-[400] text-[#d8d8d8]'>TOPICS</h1>
                                    <div className=' pt-[20px] space-y-3 pb-[20px] w-[100%] h-[auto]'>
                                        <TopicBox link="/government-engineering-college-siwan/community/ask-me-anything" topicName="Ask me anything" topicIcon="❓" />
                                        <TopicBox link="/government-engineering-college-siwan/community/introduce-yourself" topicName="Introduce yourself" topicIcon="👋" />
                                        <TopicBox link="/government-engineering-college-siwan/community/design" topicName="Design" topicIcon="🎮" />
                                        <TopicBox link="/government-engineering-college-siwan/community/artificial-intelligence" topicName="Artificial Intelligence" topicIcon="🧠" />
                                        <TopicBox link="/government-engineering-college-siwan/community/development" topicName="Development" topicIcon="👨‍💻" />
                                        <TopicBox link="/government-engineering-college-siwan/community/marketing" topicName="Marketing" topicIcon="📯" />
                                        <TopicBox link="/government-engineering-college-siwan/community/launch-tips" topicName="Launch tips" topicIcon="🚀" />
                                        <TopicBox link="/government-engineering-college-siwan/community/ask-for-feedback" topicName="Ask for feedback" topicIcon="💬" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}


export default CommunityFirstPage
