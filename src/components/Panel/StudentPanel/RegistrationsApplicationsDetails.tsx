import React, { useEffect, useState } from 'react'
import SchawnnajAnimatedLoader from '../../Loader/SchawnnajAnimatedLoader.tsx';
import { useNavigate } from 'react-router-dom';
import LoaderCustomise from '../../Loader/LoaderCustomise.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function RegistrationsApplicationsDetails() {
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [getdata, setdata] = useState<string[]>([]);
    const [getEventdata, setEventdata] = useState<string[]>([]);
    const [EventRegisterDate, SetEventRegisterDate] = useState<Date[]>([]);
    const [EventRegistrationEndDate, SetEventRegistrationDate] = useState<Date[]>([]);
    const [MonthDateShow, _] = useState<string[]>(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

    const EventParticipantDataDataFetch = async (techk_Shitiz_Id) => {
        try {
            SetIsLoading(true)
            const res = await fetch(`${baseUrl}/api/v1/student/profile/event/register/data/list/${techk_Shitiz_Id}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();

                setEventdata(data.data);
                data?.data?.forEach((EventData) => {
                    if (EventData.event_image) {
                        const utfstring = new Uint8Array(EventData.event_image.data.data);
                        const blob = new Blob([utfstring], { type: 'image/jpeg' });
                        const dataurl = URL.createObjectURL(blob);
                        EventData.event_image = dataurl;
                    }
                })
                data?.data?.forEach((EventRegisterData, EventDataindex) => {
                    SetEventRegisterDate(prev => [...prev, (new Date(EventRegisterData.createdAt))]);
                })
                data?.data?.forEach((EventRegistrationData, EventDataindex) => {
                    SetEventRegistrationDate(prev => [...prev, (new Date(EventRegistrationData.event_Registration_End_date))]);
                })
                SetIsLoading(false)
            } else {
                SetIsLoading(false)
            }
        } catch (error) {
            SetIsLoading(false)
        }
    }
    const verifydata = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl + '/api/v1/student/profile/data', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                if (data.data) {
                    if (data.data.participant_Profile_Avtar) {
                        const uint8Array = new Uint8Array(data.data.participant_Profile_Avtar.data.data);
                        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                        const dataUrl = URL.createObjectURL(blob);
                        data.data.participant_Profile_Avtar = dataUrl;
                    }
                }
                setdata(data.data);
                EventParticipantDataDataFetch(data.data.techk_Shitiz_Id);
                SetIsLoading(false)
            } else {
                SetIsLoading(false)
            }
        } catch (error) {
            SetIsLoading(false)
        }
    }
    const OnEventRegisterButton = () => {
        navigate('/government-engineering-college-siwan/total/events/list');
    }
    const OnEventDetailsView = (EventData) => {
        navigate(`/event/${EventData.event_Name}/details/${EventData.event_Detail_Show_Id}`);

    }
    useEffect(() => {
        verifydata();
    }, [])

    // Driver code 
    return (
        <>
            {IsLoading ? (
                <div className=' w-full h-[100vh] ' >
                    <LoaderCustomise />
                </div>
            ) : (
                <div className='  w-[100%] h-[100%] select-none flex justify-start items-center flex-col gap-6 p-[10px] overflow-auto max-sm-m:p-0 max-sm-m:pt-4'>
                    {
                        getEventdata.length ? (
                            Object(getEventdata).map((EventParticipantData, index) => (
                                <div style={{transition:'all 1s'}} onClick={() => { OnEventDetailsView(EventParticipantData) }} key={index} className='w-[90%]  bg-[#101c30] cursor-pointer flex justify-center items-center flex-col  h-[140px] p-[10px] pl-[15px] pr-[15px] border-[2px] border-[#0d1526] hover:text-[#d55151] text-[#e9e9e9] bg-[#]  rounded-[15px] pb-0 max-sm-m:p-0 max-sm-m:w-full max-sm-m:h-[90px]  shadow-[inset_0px_0px_4px_0px_#123344] hover:shadow-[0px_0px_12px_0px_#508096] '>
                                    <div className='w-[100%] h-[70%]  max-sm-m:h-full  flex justify-start items-center gap-4 max-sm-m:p-2'>
                                        <div className='w-[100px] h-[100%] max-sm-m:w-[60px]   border-[2px] border-[#152230] rounded-[5px] p-[5px] flex justify-center items-center '>
                                            <img src={EventParticipantData?.event_image} alt="EventPoster" className='w-[100%] text-[#fff] h-[100%] ' />
                                        </div>
                                        <div>
                                            <h1 className=' capitalize text-[18px] font-[400] flex justify-start items-center max-sm-m:text-[15px]'>{EventParticipantData.event_Name}</h1>
                                            <h2 className='flex justify-start items-center gap-1 max-sm-m:gap-[2px]'>
                                                <span className='mr-[2px] text-[#cdcdcd] text-[14px] font-[300] max-sm-m:text-[12px]'> Registered on :</span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1  max-sm-m:text-[10px] max-sm-m:mt-0' >{EventRegisterDate[index]?.getDate() > 9 ? EventRegisterDate[index]?.getDate() : "0" + EventRegisterDate[index]?.getDate()} </span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 max-sm-m:text-[10px] max-sm-m:mt-0'>{MonthDateShow[EventRegisterDate[index]?.getMonth()]} </span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 max-sm-m:text-[10px] max-sm-m:mt-0'>{String(EventRegisterDate[index]?.getFullYear()).substring(2, 4)}, </span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 max-sm-m:text-[10px] max-sm-m:mt-0'>{EventRegisterDate[index]?.getHours() > 9 ? EventRegisterDate[index]?.getHours() : "0" + EventRegisterDate[index]?.getHours()} : <span>{EventRegisterDate[index]?.getMinutes()} </span> </span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 max-sm-m:text-[10px] max-sm-m:mt-0'>IST </span>
                                                {/* <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 ml-[10px] mr-[10px]'>|</span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1'>By: </span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1'>You</span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1'>({EventParticipantData.participant_Email})</span> */}
                                            </h2>
                                            <h2 className='flex justify-start items-center gap-1 max-sm-m:gap-[2px]'>
                                                <span className='mr-[2px] text-[#cdcdcd] text-[14px] font-[300] max-sm-m:text-[12px]'>Deadline:</span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 max-sm-m:text-[10px] max-sm-m:mt-0'>{EventRegistrationEndDate[index]?.getDate() > 9 ? EventRegistrationEndDate[index]?.getDate() : "0" + EventRegistrationEndDate[index]?.getDate()}</span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 max-sm-m:text-[10px] max-sm-m:mt-0'>{MonthDateShow[EventRegistrationEndDate[index]?.getMonth()]}</span>
                                                <span className='text-[#b0adad] text-[12px] font-[300] flex items-center mt-1  max-sm-m:text-[10px] max-sm-m:mt-0'>{String(EventRegistrationEndDate[index]?.getFullYear()).substring(2, 4)},</span>
                                                <span className=' text-[#b0adad] text-[12px] font-[300] flex items-center mt-1 ml-[10px] mr-[10px] max-sm-m:text-[10px] max-sm-m:mt-0  max-sm-m:mr-1 max-sm-m:ml-1'>|</span>
                                                {
                                                    (Number(EventRegistrationEndDate[index]) - Number(new Date())) ? (
                                                        <span className=' text-[11px] font-[600] text-[#da3500]  mt-1 border-radius: 22px; border-[1px] border-[D63500] bg-[#f7dcd9] flex h-[14px] p-[8px]  items-center test-[10px] rounded-[8px]     overflow-hidden max-sm-m:h-[10px] max-sm-m:mt-0 max-sm-m:p-[3px] max-sm-m:text-[8px] ' >Open</span>
                                                    ) : (
                                                        <span className=' text-[11px] font-[600] text-[#da3500]  border-radius: 22px; border-[1px] border-[D63500] bg-[#f7dcd9] flex h-[14px] p-[8px]  items-center test-[10px] rounded-[8px]     overflow-hidden  max-sm-m:h-[10px] max-sm-m:p-[6px] max-sm-m:text-[8px]' >Closed</span>
                                                    )
                                                }
                                            </h2>
                                        </div>
                                    </div>
                                    <div className='w-[100%] h-[20%] max-sm-m:hidden'>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="w-[100%] h-[100%] flex items-center justify-center flex-col gap-[30px]">
                                    <h1 className=' capitalize text-[20px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[18px] '>Not Event Register Data🌻🌻</h1>
                                    <button onClick={OnEventRegisterButton} style={{ transition: 'all 1s' }} className='text-[#dedede] border-[2px] w-[250px] font-[600] bg-[#fdde4146]   border-[#a28f32] p-[10px]  rounded-[40px] cursor-pointer max-md:w-[200px]  max-md:h-[45px] max-md:p-0 max-md:text-[18px]  max-sm-m:w-[150px] max-sm-m:text-[13px] max-sm-m:h-[34px]'>Event Register</button>
                                </div>
                            </>

                        )
                    }
                </div>
            )
            }
        </>
    )
}

export default RegistrationsApplicationsDetails
