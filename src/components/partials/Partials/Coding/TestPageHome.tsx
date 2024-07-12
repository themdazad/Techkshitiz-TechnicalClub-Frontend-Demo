import React, { useEffect, useState } from 'react'
import MainHeader from '../../MainHeader.tsx'
import MainFooter from '../../MainFooter.tsx'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Loader.tsx';
import { toast } from 'react-toastify';
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;

function TestPageHome() {
    const [isFullScreen, setFullScreen] = useState(false);
    const [Verify_Participant_Data, SetVerificationData] = useState([]);
    const [VerifyParticipantLoader, SetVerifyParticipantLoader] = useState(true);
    const ContestData = useLocation().state;

    const navigate = useNavigate();

    const ParticipantVerification = async (contest_Id) => {
        try {
            SetVerifyParticipantLoader(true);
            const res = await fetch(`${baseUrl}/api/v1/student/profile/participant/coding/register/data/filter?techk_Shitiz_Id=${ContestData?.StudentData?.techk_Shitiz_Id}&eventId=${ContestData?.ContestDatastate?.contest_EventId}`, {
                method: "GET",
                credentials: "include",
            });
            if (res.status === 200) {
                const datas = await res.json();
                SetVerificationData(datas.data);
                SetVerifyParticipantLoader(false);
                const Numericalres = await fetch(`${baseUrl}/api/v1/student/profile/coding/numerical/question/show/${contest_Id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const Numericaldata = await Numericalres.json();

                sessionStorage.setItem('Participant_Question_coding_Contest', JSON.stringify(Numericaldata))
                sessionStorage.setItem('Coding_Participant_Auth_Data', JSON.stringify(ContestData))
                localStorage.setItem('Coding_Participant_Auth_Data', JSON.stringify(ContestData))
            } else if (res.status === 401) {
                toast.error("You did not login please login");
                navigate("/government-engineering-college-siwan/student/login");
                SetVerifyParticipantLoader(false);
            } else if (res.status === 202) {
                toast.error("You did not participate in this event");
                navigate("/");
                SetVerifyParticipantLoader(false);
            } else if (res.status === 400) {
                toast.error("Some technical issue");
                navigate("/");
                SetVerifyParticipantLoader(false);
            } else {
                toast.error("Some technical issue");
                navigate("/");
                SetVerifyParticipantLoader(false);
            }
            // navigate("/government-engineering-college-siwan/student/login");
        } catch (error) {
            toast.error("Some technical issue");
            navigate("/");
            SetVerifyParticipantLoader(false);
        }
    }
    useEffect(() => {
        if (!ContestData?.StudentData) {
            navigate('government-engineering-college-siwan/contest/lists');
        }
        ParticipantVerification(ContestData?.ContestDatastate?.contest_Id);
    }, []);
    if (VerifyParticipantLoader) {
        return <SchawnnajAnimatedLoader />
    }
    const enterFullScreen = () => {
        const element = Object(document.documentElement);
        if (element?.requestFullscreen) {
            element.requestFullscreen();
            Object(document).fullscreenEnabled = true;
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            Object(document).fullscreenEnabled = true;
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
            Object(document).fullscreenEnabled = true;
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
            Object(document).fullscreenEnabled = true;
        }
    };
    const onHandelClickEvent = () => {
        let conformation = window.confirm(
            `Are you sure ${Object(ContestData)?.StudentData?.participant_Name} to enter contest page`
        );
        if (conformation) {
            navigate("/technical/events/coding/contest/terms/conditions", { state: ContestData });
            setFullScreen(!isFullScreen);
            if (!isFullScreen) {
                enterFullScreen();
            } else {
            }
        }
    };

    return (
        <>
            <div className='w-[100%] h-[100vh] bg-[#0e1b2f] '>
                <MainHeader />
                <div className='w-[100%] h-[100%] bg-[#0e1b2f] flex justify-center items-center'>
                    <div className=' h-[auto] space-y-4'>
                        <div className='w-[100%] h-[150px] p-[10px] flex justify-center items-center'>
                            <div className='w-[130px] h-[100%] rounded-full border-[1px] border-[#315b66] flex justify-center items-center'>
                                <img className='w-[100%] h-[100%]  rounded-full' src={Object(ContestData)?.StudentData?.participant_Avtar} alt="Loading.." />
                            </div>
                        </div>
                        <h1 className=' w-[700px] text-center uppercase bg-gradient-to-r italic animate-pulse from-[#436397] font-[600] to-slate-100 bg-clip-text text-transparent   text-[50px] max-[800px]:text-[25px] max-[580px]:text-[20px] max-[480px]:text-[15px] max-[330px]:text-[10px]'>WELCOME BACK <span>{Object(ContestData)?.StudentData?.participant_Name} </span></h1>
                        <div className=' w-[100%] flex justify-center items-center'>
                            <button onClick={onHandelClickEvent} className='w-[150px] h-[50px] border-[1px] border-[#152e4e] shadow-inner bg-[#102834] font-[600] text-[14px] text-[#ffffffdb] rounded-[5px] max-[800px]:w-[120px] max-[800px]:text-[11px] max-[800px]:h-[40px] max-[480px]:text-[10px] max-[480px]:w-[100px]'>Enter Test Page</button>
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>

        </>
    )
}

export default TestPageHome
