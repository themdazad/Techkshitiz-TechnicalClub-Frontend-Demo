import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function QuizEventTermsAndConditions() {
    const navigate = useNavigate();
    const QuizContestData = useLocation().state;
    const [checkbox, setcheckbox] = useState(false);
    const [verifycationUserQuestionSubmitOrNot, SetverifycationUserQuestionSubmitOrNot] = useState(false);
    const userFindAnswerSubmitOrNot = async () => {
        try {
            SetverifycationUserQuestionSubmitOrNot(true);
            const res = await fetch(`${baseUrl}/api/v1/student/profile/all/quiz/participant/data/${QuizContestData?.ContestDatastate?.contest_Id}?techkshitiz_id=${QuizContestData?.StudentData?.techk_Shitiz_Id}`, {
                method: 'GET',
                credentials: "include"
            })
            if (res.status === 200) {
                const data = await res.json();
                if (data?.data) {
                    toast.warning('Your Competition Completed');
                    localStorage.removeItem('Mcq_Question');
                    localStorage.removeItem('timer');
                    localStorage.removeItem('Auth_participant_Data');
                    navigate('/government-engineering-college-siwan/contest/lists');
                }
                SetverifycationUserQuestionSubmitOrNot(false);
            }
            SetverifycationUserQuestionSubmitOrNot(false);

        } catch (error) {
            toast.warning('Your Competition Completed' + error);
            localStorage.removeItem('Mcq_Question');
            localStorage.removeItem('timer');
            localStorage.removeItem('Auth_participant_Data');
            SetverifycationUserQuestionSubmitOrNot(false);
            navigate('/government-engineering-college-siwan/contest/lists');
        }
    }
    useEffect(() => {
        if (!QuizContestData) {
            toast.warning("Contest Data not available");
            navigate('/government-engineering-college-siwan/contest/lists');
        }
        const AuthParticipant = localStorage.getItem('Auth_participant_Data');
        const QuizQuestionDatafetch = localStorage.getItem('Mcq_Question');
        if (AuthParticipant && QuizQuestionDatafetch) {
            const QuizQuestionData = JSON.parse(QuizQuestionDatafetch);
            if (!QuizQuestionData?.data?.questionData) {
                toast.warning("Question  not set in this contest please wait");
                navigate("/government-engineering-college-siwan/contest/lists");
            }
            const AuthParticipantData = JSON.parse(AuthParticipant);
            userFindAnswerSubmitOrNot();
            if (!AuthParticipantData?.StudentData?.techk_Shitiz_Id) {
                navigate("/government-engineering-college-siwan/contest/lists");
            }
        } else {
            navigate("/government-engineering-college-siwan/contest/lists");
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Control' || event.key === 'F11' || event.key === 'Alt' || event.key === 'Escape' || event.key === 'Tab' || event.key === 'F1' || event.key === 'F2' || event.key === 'F3' || event.key === 'F4' || event.key === 'F5' || event.key === 'F6' || event.key === 'F7' || event.key === 'F8' || event.key === 'F9' || event.key === 'F10' || event.key === 'F12') {
                event.preventDefault();

            }
        })
    }, [])
    const checkBoxOneHandel = () => {
        const verify = Object(document.querySelector('#checkbox'))?.checked;
        if (verify) {
            setcheckbox(true);

        } else {
            setcheckbox(false);
        }
    }
    const onclickHandeldata = () => {
        if (checkbox) {
            navigate('/technical/events/quiz/contest/test/start-page');
        }
    }
    if (verifycationUserQuestionSubmitOrNot) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>
            <div className=' w-[100%] h-[auto] bg-[#0b1220]'>
                <h1 className=' text-center text-[40px] font-[700] italic p-[20px] pt-[30px] text-[#fff]'>TERMS  & CONDITIONS</h1>
                <hr />
                <div className='w-[100%] h-[100%]'>
                    <div className='w-[100%] h-[100vh] text-[#fff] bg-[#183747]'>
                        <div className='w-[100%] h-[auto] pb-[10px] p-[30px]'>
                            <h1 className='text-[30px] font-[700]'>Rules and Conduct :</h1>

                        </div>
                        <div className=' w-[100%] h-[auto] flex justify-center items-center  p-[10px]'>
                            <div className='w-[1250px] space-y-4 text-[#d7d7d7]'>
                                <p >  Participants must refrain from any form of cheating, plagiarism, or using unauthorized aids during the quiz.
                                </p><p>
                                    Any form of disruptive behavior may lead to disqualification.
                                    The decisions of the quiz organizers are final and binding.</p>
                                <p>Participants are not permitted to use mobile phones.
                                </p>
                                <p>Participants must only utilize the Quiz tab; if they are discovered to be using another tab, they will be disqualified.

                                </p>
                                <p>To get the most out of the test, which is meant to be  learning , you must comply with all of its terms and conditions.
                                </p>
                                <p>I appreciate you taking the exam.
                                </p>
                                <p>You may now click the box to see the questions now that the terms and conditions have ended.</p>
                            </div>
                        </div>

                    </div>
                    <div className='w-[100%] h-[70px] flex justify-center bg-[#0b1220] items-center'>
                        <div className='w-[50%] h-[100%] flex justify-start items-center gap-2 text-[#fff]'>
                            <input type='checkbox' onClick={checkBoxOneHandel} id='checkbox' className=' ml-[26px]' />
                            <label htmlFor='checkbox' className=''>I have agree to terms and conditions</label>
                        </div>
                        <div className='w-[50%] h-[100%] flex justify-end items-center '>
                            {
                                checkbox ? (

                                    <button onClick={onclickHandeldata} className='text-[#fff] text-[13px] w-[170px] h-[45px] border-[1px] mr-[40px] border-[#2c4962] bg-[#1d2e43] rounded-[5px]'>I am ready to begin</button>
                                ) : (
                                    <button onClick={onclickHandeldata} className='text-[#ffffff79] cursor-no-drop w-[170px] h-[45px] border-[1px] mr-[40px] border-[#1c354b] bg-[#0e1b2b] text-[13px] rounded-[5px]'>I am ready to begin</button>

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default QuizEventTermsAndConditions
