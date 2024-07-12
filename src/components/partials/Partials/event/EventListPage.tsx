import React, { useEffect, useState } from 'react'
import MainHeader from '../../MainHeader.tsx'
import MainFooter from '../../MainFooter.tsx'
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function EventListPage() {
    const [LivecurrentPage, SetLiveCurrentPage] = useState(0);
    const [UpcommingcurrentPage, SetUpcommingCurrentPage] = useState(0);
    const [EndedcurrentPage, SetEndedCurrentPage] = useState(0);
    const [LiveTotalPages, SetLiveTotalPage] = useState(0);
    const [UpCommingTotalPages, SetUpcommingTotalPage] = useState(0);
    const [EndedtotalPages, SetEndedTotalPage] = useState(0);
    const [LiveRegistrationEvent, SetLiveRegistrationEvent] = useState<string[]>([]);
    const [UpcomingRegistrationEvent, SetUpcomingRegistrationEvent] = useState<string[]>([]);
    const [EndRegistrationEvent, SetEndRegistrationEvent] = useState<string[]>([]);
    const [LiveRegistrationEventLoader, SetLiveRegistrationEventLoader] = useState(true);
    const [UpcomingRegistrationEventLoader, SetUpcomingRegistrationEventLoader] = useState(true);
    const [EndRegistrationEventLoader, SetEndRegistrationEventLoader] = useState(true);

    const EndRegistraionEventFetchData = async () => {
        try {
            SetEndRegistrationEventLoader(true);
            const res = await fetch(`${baseUrl}/api/end/event/data/fetch?currentPage=${EndedcurrentPage}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const EventDataFilter = await res.json();
                if (EventDataFilter) {
                    SetEndedTotalPage(Math.ceil(Number(EventDataFilter.Event_Data_Length) / 10))
                    if (EventDataFilter.data) {
                        if (EventDataFilter.data[0]) {
                            Object(EventDataFilter).data.forEach((element, index) => {
                                const uint8Array = new Uint8Array(element.event_image.data.data);
                                const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                                const dataUrl = URL.createObjectURL(blob);
                                EventDataFilter.data[index].event_image = dataUrl;
                            })

                        }
                    }
                }
                SetEndRegistrationEvent(EventDataFilter.data)

            }
            SetEndRegistrationEventLoader(false);

        } catch (error) {
            SetEndRegistrationEventLoader(false);
            console.log("Some technical issue");
        }

    }
    const UpcomingRegistraionEventFetchData = async () => {
        try {
            SetUpcomingRegistrationEventLoader(true);
            const res = await fetch(`${baseUrl}/api/upcoming/event/data/fetch?currentPage=${UpcommingcurrentPage}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const EventDataFilter = await res.json();
                if (EventDataFilter) {
                    SetUpcommingTotalPage(Math.ceil(Number(EventDataFilter.Event_Data_Length) / 10))
                    if (EventDataFilter.data) {
                        if (EventDataFilter.data[0]) {
                            Object(EventDataFilter).data.forEach((element, index) => {
                                const uint8Array = new Uint8Array(element.event_image.data.data);
                                const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                                const dataUrl = URL.createObjectURL(blob);
                                EventDataFilter.data[index].event_image = dataUrl;
                            })

                        }
                    }
                }
                SetUpcomingRegistrationEvent(EventDataFilter.data)

            }
            SetUpcomingRegistrationEventLoader(false);

        } catch (error) {
            SetUpcomingRegistrationEventLoader(false);
            console.log("Some technical issue");
        }

    }

    const LiveREgistraionEventFetchData = async () => {
        try {
            SetLiveRegistrationEventLoader(true);
            const res = await fetch(`${baseUrl}/api/live/event/data/fetch?currentPage=${LivecurrentPage}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const EventDataFilter = await res.json();
                if (EventDataFilter) {
                    SetLiveTotalPage(Math.ceil(Number(EventDataFilter.Event_Data_Length) / 10))
                    if (EventDataFilter.data) {
                        if (EventDataFilter.data[0]) {
                            Object(EventDataFilter).data.forEach((element, index) => {
                                const uint8Array = new Uint8Array(element.event_image.data.data);
                                const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                                const dataUrl = URL.createObjectURL(blob);
                                EventDataFilter.data[index].event_image = dataUrl;
                            })

                        }
                    }
                }
                SetLiveRegistrationEvent(EventDataFilter.data)

            }
            SetLiveRegistrationEventLoader(false);

        } catch (error) {
            SetLiveRegistrationEventLoader(false);
            console.log("Some technical issue");
        }

    }

    useEffect(() => {
        const interval = setTimeout(() => {
            UpcomingRegistraionEventFetchData();
        }, 1000)
        return () => {
            clearTimeout(interval);
        }
    }, [UpcommingcurrentPage])
    useEffect(() => {
        LiveREgistraionEventFetchData();
    }, [LivecurrentPage])
    useEffect(() => {
        // EventDataFetch();

        const interval2 = setTimeout(() => {
            EndRegistraionEventFetchData();
        }, 1000)
        return () => {
            clearTimeout(interval2);
        }
    }, [EndedcurrentPage])
    const OnNextLiveButtonHandel = () => {
        if (LivecurrentPage < EndedtotalPages - 1) {
            SetLiveCurrentPage(preview => preview + 1);
        }
    }
    const OnPrivewLiveButtonHandel = () => {
        if (LivecurrentPage !== 0) {
            SetLiveCurrentPage(preview => preview - 1);
        }
    }
    const OnNextUpcommingButtonHandel = () => {
        if (UpcommingcurrentPage < EndedtotalPages - 1) {
            SetUpcommingCurrentPage(preview => preview + 1);
        }
    }
    const OnPrivewUpcommingButtonHandel = () => {
        if (UpcommingcurrentPage !== 0) {
            SetUpcommingCurrentPage(preview => preview - 1);
        }
    }
    const OnNextEndedButtonHandel = () => {
        if (EndedcurrentPage < EndedtotalPages - 1) {
            SetEndedCurrentPage(preview => preview + 1);
        }
    }
    const OnPrivewEndedButtonHandel = () => {
        if (EndedcurrentPage !== 0) {
            SetEndedCurrentPage(preview => preview - 1);
        }
    }
    const navigate = useNavigate();
    const EventDetailsFind = (data) => {
        navigate(`/event/${Object(data).event_Name}/details/${Object(data)._id}`, { state: data });
    }
    return (
        <>
            <MainHeader />
            <div className=' w-[100%] h-[100%] overflow-auto bg-[#0f1627]'>
                <div className='w-[100%] h-[auto] bg-[#14050507] p-[5px]'>
                    <div className='w-[100%]  h-[160px] mt-4 space-y-4 mb-8'>
                        <h1 className=' text-[35px]  text-center font-[600] text-[#ffffffe4] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[15px]'>Check our <span className='text-[#fd0]'>Events</span></h1>
                        <div className='w-[100%] h-[auto] flex justify-center items-center'>

                            <p className=' text-[14px]  text-center font-[500] text-[#ffffffe0] max-[1024px]:w-[400px]  max-[1024px]:text-[12px] max-[800px]:w-[350px] max-[480px]:text-[10px] max-[480px]:w-[90%]' >All events are chargeable to cover the expenses and enhance the quality of the fest.</p>
                        </div>
                        <div className='w-[100%] h-[auto] flex justify-center items-center'>
                            <p className=' text-[14px]  text-center font-[500] w-[700px] max-[1024px]:text-[12px] max-[1024px]:w-[510px] max-[800px]:w-[400px]  text-[#ffffffe0] pl-[10px] max-[480px]:w-[100%] max-[480px]:text-[10px] pr-[10px]' >As a token of your victory, each winner will be presented with an exclusive and beautifully crafted certificate or goodies, recognizing your outstanding achievement. 🏆✨</p>
                        </div>
                    </div>


                    <div className='w-[100%] h-[auto] p-[10px] pl-[30px] '>
                        <h1 className=' text-[35px]  text-start font-[700] text-[#fd0] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[20px] max-sm:pb-6'>Live Event Registration</h1>
                        {LiveRegistrationEventLoader ? (
                            <div className='w-[100%] h-[600px] p-[30px] mb-6 max-md:pl-0'>
                                <div className='loaderDateEvent'></div>
                            </div>
                        ) : (
                            Object(LiveRegistrationEvent).length ? (

                                <>
                                    <div className=' w-[100%] h-[auto] flex justify-center items-center p-[30px] max-[480px]:p-0 max-md:pl-0'>
                                        <div className='w-[100%]  h-[auto] max-[1400px]:w-[1100px] max-[1200px]:w-[720px] max-[800px]:w-[350px] max-[480px]:w-[100%] max-sm-m:pr-5'>

                                            {LiveRegistrationEvent ? Object(LiveRegistrationEvent).map((EventMapedData, index) => (

                                                <>
                                                    <div key={index} onClick={() => EventDetailsFind(EventMapedData)} className='cursor-pointer w-[300px] max-[480px]:w-[100%] max-[480px]:m-0 max-[480px]:mb-[40px]  m-[20px]  space-y-4 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[380px] rounded-[10px]  p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                                                        <div className=' w-[100%] h-[50%] flex justify-center items-center '>
                                                            <img src={EventMapedData.event_image} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                                                        </div>
                                                        <h1 className=' text-center text-[#ffc71e] w-[100%] truncate text-[26px] font-[600] mt-6 cursor-pointer uppercase'>{EventMapedData.event_Name}</h1>
                                                        <p className='text-[12px] max-[350px]:hidden text-[#fff] pl-[10px]'>{EventMapedData.event_description.substring(0, 200)}....</p>
                                                        <p className='text-[12px] max-[350px]:block hidden  text-[#fff] pl-[10px]'>{EventMapedData.event_description.substring(0, 140)}....</p>

                                                    </div>
                                                </>
                                            )) : ""}

                                        </div>
                                    </div>
                                    {
                                        LiveTotalPages > 1 ? (
                                            <div className=' w-[100%] h-[100%] flex justify-center items-center pt-[20px] pb-[20px]'>
                                                <div className=' w-[94%] h-[100%]  flex justify-center items-center    pt-0'>
                                                    <div className='w-[100%]  h-[auto] max-[1500px]:w-[1050px] max-[1150px]:w-[700px] max-[800px]:w-[350px] flex justify-between'>
                                                        <button disabled={LivecurrentPage <= 0} onClick={OnPrivewLiveButtonHandel} style={LivecurrentPage <= 0 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e28', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px]'  >Preview</button>
                                                        <button disabled={LivecurrentPage > LiveTotalPages - 1} style={LivecurrentPage >= LiveTotalPages - 1 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e29', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px] ' onClick={OnNextLiveButtonHandel}>Next</button>

                                                    </div>
                                                </div>
                                            </div>

                                        ) : ''
                                    }
                                </>
                            ) : (
                                <div className='w-[100%]  h-[60vh] flex justify-center items-center '>
                                    <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>No More Event Live Data🌻🌻</h1>

                                </div>
                            )
                        )
                        }
                    </div>
                    <div className='w-[100%] h-[auto] p-[10px] pl-[30px] '>
                        <h1 className=' text-[35px]  text-start font-[700] text-[#fd0] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[20px] max-sm:pb-6'>Upcoming Event Registration</h1>
                        {UpcomingRegistrationEventLoader ? (
                            <div className='w-[100%] h-[600px] p-[30px] mb-6 max-md:pl-0'>
                                <div className='loaderDateEvent'></div>
                            </div>
                        ) : (
                            Object(UpcomingRegistrationEvent).length ? (

                                <>
                                    <div className=' w-[100%] h-[auto] flex justify-center items-center p-[30px] max-[480px]:p-0 max-md:pl-0'>
                                        <div className='w-[100%]  h-[auto] max-[1400px]:w-[1100px] max-[1200px]:w-[720px] max-[800px]:w-[350px] max-[480px]:w-[100%] max-sm-m:pr-5'>

                                            {UpcomingRegistrationEvent ? Object(UpcomingRegistrationEvent).map((EventMapedData, index) => (

                                                <>
                                                    <div key={index} onClick={() => EventDetailsFind(EventMapedData)} className='cursor-pointer w-[300px] max-[480px]:w-[100%] max-[480px]:m-0 max-[480px]:mb-[40px]  m-[20px]  space-y-4 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[380px] rounded-[10px]  p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                                                        <div className=' w-[100%] h-[50%] flex justify-center items-center '>
                                                            <img src={EventMapedData.event_image} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                                                        </div>
                                                        <h1 className=' text-center text-[#ffc71e] w-[100%] truncate text-[26px] font-[600] mt-6 cursor-pointer uppercase'>{EventMapedData.event_Name}</h1>
                                                        <p className='text-[12px] max-[350px]:hidden text-[#fff] pl-[10px]'>{EventMapedData.event_description.substring(0, 200)}....</p>
                                                        <p className='text-[12px] max-[350px]:block hidden  text-[#fff] pl-[10px]'>{EventMapedData.event_description.substring(0, 140)}....</p>

                                                    </div>
                                                </>
                                            )) : ""}

                                        </div>
                                    </div>
                                    {
                                        UpCommingTotalPages > 1 ? (
                                            <div className=' w-[100%] h-[100%] flex justify-center items-center pt-[20px] pb-[20px]'>
                                                <div className=' w-[94%] h-[100%]  flex justify-center items-center    pt-0'>
                                                    <div className='w-[100%]  h-[auto] max-[1500px]:w-[1050px] max-[1150px]:w-[700px] max-[800px]:w-[350px] flex justify-between'>
                                                        <button disabled={UpcommingcurrentPage <= 0} onClick={OnPrivewUpcommingButtonHandel} style={UpcommingcurrentPage <= 0 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e28', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px]'  >Preview</button>
                                                        <button disabled={UpcommingcurrentPage > UpCommingTotalPages - 1} style={UpcommingcurrentPage >= UpCommingTotalPages - 1 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e29', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px] ' onClick={OnNextUpcommingButtonHandel}>Next</button>

                                                    </div>
                                                </div>
                                            </div>

                                        ) : ''
                                    }
                                </>
                            ) : (
                                <div className='w-[100%]  h-[60vh] flex justify-center items-center '>
                                    <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>No More Event Upcoming Data🌻🌻</h1>

                                </div>
                            )
                        )
                        }
                    </div>

                    <div className='w-[100%] h-[auto] p-[10px] pl-[30px] '>
                        <h1 className=' text-[35px]  text-start font-[700] text-[#fd0] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[20px]  max-sm:pb-6'>Past Event Registration</h1>
                        {EndRegistrationEventLoader ? (
                            <div className='w-[100%] h-[600px] p-[30px] mb-6 max-md:pl-0'>
                                <div className='loaderDateEvent'></div>
                            </div>
                        ) : (
                            Object(EndRegistrationEvent).length ? (

                                <>
                                    <div className=' w-[100%] h-[auto] flex justify-center items-center p-[30px] max-[480px]:p-0 max-md:pl-0'>
                                        <div className='w-[100%]  h-[auto] max-[1400px]:w-[1100px] max-[1200px]:w-[720px] max-[800px]:w-[350px] max-[480px]:w-[100%] max-sm-m:pr-5'>

                                            {EndRegistrationEvent ? Object(EndRegistrationEvent).map((EventMapedData, index) => (

                                                <>
                                                    <div key={index} onClick={() => EventDetailsFind(EventMapedData)} className='cursor-pointer w-[300px] max-[480px]:w-[100%] max-[480px]:m-0 max-[480px]:mb-[40px]  m-[20px]  space-y-4 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[380px] rounded-[10px]  p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                                                        <div className=' w-[100%] h-[50%] flex justify-center items-center '>
                                                            <img src={EventMapedData.event_image} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                                                        </div>
                                                        <h1 className=' text-center text-[#ffc71e] w-[100%] truncate text-[26px] font-[600] mt-6 cursor-pointer uppercase'>{EventMapedData.event_Name}</h1>
                                                        <p className='text-[12px] max-[350px]:hidden text-[#fff] pl-[10px]'>{EventMapedData.event_description.substring(0, 200)}....</p>
                                                        <p className='text-[12px] max-[350px]:block hidden  text-[#fff] pl-[10px]'>{EventMapedData.event_description.substring(0, 140)}....</p>

                                                    </div>
                                                </>
                                            )) : ""}

                                        </div>
                                    </div>
                                    {
                                        EndedtotalPages > 1 ? (
                                            <div className=' w-[100%] h-[100%] flex justify-center items-center pt-[20px] pb-[20px]'>
                                                <div className=' w-[94%] h-[100%]  flex justify-center items-center    pt-0'>
                                                    <div className='w-[100%]  h-[auto] max-[1500px]:w-[1050px] max-[1150px]:w-[700px] max-[800px]:w-[350px] flex justify-between'>
                                                        <button disabled={EndedcurrentPage <= 0} onClick={OnPrivewEndedButtonHandel} style={EndedcurrentPage <= 0 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e28', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px]'  >Preview</button>
                                                        <button disabled={EndedcurrentPage > EndedtotalPages - 1} style={EndedcurrentPage >= EndedtotalPages - 1 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e29', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px] ' onClick={OnNextEndedButtonHandel}>Next</button>

                                                    </div>
                                                </div>
                                            </div>

                                        ) : ''
                                    }
                                </>
                            ) : (
                                <div className='w-[100%]  h-[60vh] flex justify-center items-center '>
                                    <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>No More Event Ended Data🌻🌻</h1>

                                </div>
                            )
                        )
                        }
                    </div>
                </div>
            </div>
            <MainFooter />

        </>
    )
}

export default EventListPage
