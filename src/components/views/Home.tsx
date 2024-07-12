import React, { useEffect, useState } from 'react'
import MainHeader from '../partials/MainHeader.tsx';
import MainFooter from '../partials/MainFooter.tsx';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeHeroSection from '../Home/HomeHeroSection.tsx';
import AzadImage from '../images/azad_EE.jpeg';
import heeralal from '../images/heeralal_CSE(IOT).jpg';
import shivamJee from '../images/Shivam_Jee_CSE(IOT).jpg';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function Home() {
    const [winnerParticipantData, SetWinnerParticipantData] = useState([{ Participant_Avtar: AzadImage, Participant_Name: "Md Azad", Participant_Event_Name: "Logo  Design", Participant_Event_Year: 2024 },{ Participant_Avtar: heeralal, Participant_Name: "Heeralal Kumar", Participant_Event_Name: "Quiz", Participant_Event_Year: 2024 },{ Participant_Avtar: shivamJee, Participant_Name: "Shivam Jee", Participant_Event_Name: "Coding", Participant_Event_Year: 2024 }]);
    const [LiveRegistrationEventLoader, SetLiveRegistrationEventLoader] = useState(true);
    const [LiveRegistrationEvent, SetLiveRegistrationEvent] = useState<string[]>([]);
    const [IsLoader, SetLoader] = useState<boolean>(false);

    const WinnerParticipantDataFetch = async () => {
        try {
            SetLoader(true);
            const res = await fetch(`${baseUrl}/api/event/winner/participant/?winner_Participant_Event_Year=${new Date().getUTCFullYear()}&winner_position=1`, {
                method: "GET",
                credentials: 'include'
            })
            const WinnerParticipantDataFetch = await res.json();
            if (WinnerParticipantDataFetch.data[0]) {
                WinnerParticipantDataFetch.data.forEach((Winnerdata, index) => {
                    const uint8Array = new Uint8Array(Object(Winnerdata).Participant_Avtar.data.data);
                    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                    const dataUrl = URL.createObjectURL(blob);
                    Object(WinnerParticipantDataFetch).data[index].Participant_Avtar = dataUrl
                })
            }
            // SetWinnerParticipantData(WinnerParticipantDataFetch.data);
            SetLoader(false);
        } catch (error) {
            console.log('Some technical issue' + error);
        }
    }

    const LiveRegistraionEventFetchData = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/live/event/data/fetch?currentPage=${0}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const EventDataFilter = await res.json();
                if (EventDataFilter) {
                    if (EventDataFilter.data[0]) {
                        Object(EventDataFilter).data.forEach((element, index) => {
                            const uint8Array = new Uint8Array(element.event_image.data.data);
                            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                            const dataUrl = URL.createObjectURL(blob);
                            EventDataFilter.data[index].event_image = dataUrl;
                        })

                    }
                }

                if (EventDataFilter?.data[0]) {
                    SetLiveRegistrationEvent([]);
                    EventDataFilter?.data.forEach((EventData, index) => {
                        if (index < 4) {
                            SetLiveRegistrationEvent(prev => [...prev, EventData]);
                        }
                    })
                }


            }
            SetLiveRegistrationEventLoader(false);

        } catch (error) {
            SetLiveRegistrationEventLoader(false);
            console.log("Some technical issue");
        }

    }


    useEffect(() => {
        WinnerParticipantDataFetch();
        const interval = setTimeout(() => {
            LiveRegistraionEventFetchData();
        }, 1000);
        return () => {
            clearTimeout(interval);
        }
    }, [])


    const navigate = useNavigate();
    const EventDetailsFind = (data) => {
        navigate(`/event/${Object(data).event_Name}/details/${Object(data)._id}`, { state: data });
    }

    return (
        <>
            <MainHeader />
            <div className=' w-[100%] h-[100%]  '>
                <HomeHeroSection winnerParticipantData={winnerParticipantData} IsLoading={IsLoader} />
                <div className='w-[100%] h-[auto] bg-[#0d1526] p-[4px]'>
                    <div className='w-[100%]  h-[160px] mt-4 space-y-4 mb-8'>
                        <h1 className=' text-[35px]  text-center font-[600] text-[#ffffffe4] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[15px]'>Check our <span className='text-[#fd0]'>Events</span></h1>
                        <div className='w-[100%] h-[auto] flex justify-center items-center'>

                            <p className=' text-[14px]  text-center font-[500] text-[#ffffffe0] max-[1024px]:w-[400px]  max-[1024px]:text-[12px] max-[800px]:w-[350px] max-[480px]:text-[10px] max-[480px]:w-[90%]' >All events are chargeable to cover the expenses and enhance the quality of the fest.</p>
                        </div>
                        <div className='w-[100%] h-[auto] flex justify-center items-center'>
                            <p className=' text-[14px]  text-center font-[500] w-[700px] max-[1024px]:text-[12px] max-[1024px]:w-[510px] max-[800px]:w-[400px]  text-[#ffffffe0] pl-[10px] max-[480px]:w-[100%] max-[480px]:text-[10px] pr-[10px]' >As a token of your victory, each winner will be presented with an exclusive and beautifully crafted certificate, recognizing your outstanding achievement. 🏆✨</p>
                        </div>
                    </div>
                    <div className=' w-[100%] h-[auto] flex justify-center items-center'>
                        <div className=' w-[93%] max-[480px]:w-[100%] h-[auto] flex justify-center items-center'>
                            <div className='w-[100%]  max-[1380px]:w-[1000px]  max-[950px]:w-[570px] max-sm:w-[100%]   h-[auto] '>

                                {/* <BoxClub rulebookpdf={codingrulebook} image_Url={codingContestLogo} eventname="coding" description=" A coder closing their eyes and visualizing their coding goals" /> */}
                                {/* <BoxClub rulebookpdf={logodesignrulebook} image_Url={logodesignContestLogo} eventname="logo-design" description="Rhyme Rendezvous: Paint Emotions with Words" /> */}
                                {/* <BoxClub rulebookpdf={quizrulebook} image_Url={quizContestLogo} eventname="quiz" description="Test your skills with our advanced software engineering quiz" /> */}

                                {/* <BoxClub rulebookpdf={hackathonrulebook} image_Url={hackathonContestLogo} eventname="hackathon" description="A hackathon is more than just coding; it's a breeding ground for creativity" /> */}

                                {LiveRegistrationEventLoader ? (
                                    <div className='w-[100%] h-[400px] p-[30px] mb-6'>
                                        <div className='loaderDateEvent'></div>
                                    </div>
                                ) : (
                                    Object(LiveRegistrationEvent).length ? (

                                        <>
                                            <div className=' w-[100%] h-[85%] flex justify-center items-center p-[30px] max-[480px]:p-[20px] '>
                                                <div className='w-[100%]  h-[auto] max-[1400px]:w-[1100px] max-[1200px]:w-[720px] max-[800px]:w-[350px] max-[480px]:w-[100%]'>
                                                    {
                                                        LiveRegistrationEvent.length > 0 ? Object(LiveRegistrationEvent).map((EventMapedData, index) => (
                                                            <>
                                                                <div onClick={() => EventDetailsFind(EventMapedData)} className='cursor-pointer w-[300px] max-[480px]:w-[100%] max-[480px]:m-0 max-[480px]:mb-[40px]  m-[20px]  space-y-4 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[380px] rounded-[10px]  p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                                                                    <div className=' w-[100%] h-[50%] flex justify-center items-center '>
                                                                        <img src={EventMapedData.event_image} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                                                                    </div>
                                                                    <h1 className=' text-center text-[#ffc71e] w-[100%] truncate text-[26px] font-[600] mt-6 cursor-pointer uppercase'>{EventMapedData.event_Name}</h1>
                                                                    <p className='text-[12px] max-[350px]:hidden text-[#fff] pl-[10px]'>{String(EventMapedData.event_description).substring(0, 200)}....</p>
                                                                    <p className='text-[12px] max-[350px]:block hidden  text-[#fff] pl-[10px]'>{String(EventMapedData.event_description).substring(0, 140)}....</p>

                                                                </div>
                                                            </>
                                                        )) : ""}

                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='w-[100%]  h-[60vh] flex justify-center items-center '>
                                            <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>No More Event Live Data🌻🌻</h1>

                                        </div>
                                    )
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-[100%] h-[auto] p-[30px] max-[480px]:pr-[2px]  pt-[40px] flex justify-end max-[480px]:justify-center items-center'>
                        <NavLink style={{ transition: 'all 1s' }} to='/government-engineering-college-siwan/total/events/list' className='w-[160px]   gap-2 h-[45px] mr-[150px] max-[480px]:mr-[0px] rounded-[5px] text-[14px] font-[600] hover:bg-[#182d3b]  transition ease-in-out delay-150  border-[#2a4651] text-[#fff] border-[1px] flex justify-center items-center'>
                            More Events
                            <span className="material-symbols-outlined animate-pulse text-[#ffdd00]">
                                read_more
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    )
}

export default Home
