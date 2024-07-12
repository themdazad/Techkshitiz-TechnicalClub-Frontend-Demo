import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../../Loader/HalfLoader.tsx';
import * as XLSX from 'xlsx';
import { useLocation, useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerEventRegisterDataShow() {
    const location = useLocation();
    const navigate = useNavigate();
    const EventShortData = location.state;
    const locationDataFilter = location.pathname.split('/');
    const EventId = locationDataFilter[locationDataFilter.length - 1];
    const [IsEventRegisterLoader, SetIsEventRegisterLoader] = useState(false);
    const [IsEventRegisterData, SetIsEventRegisterData] = useState([]);
    const [EventParticipantDataDelete, SetEventParticipantDataDelete] = useState(false);

    const EventParticipantDataFetch = async () => {
        try {
            SetIsEventRegisterLoader(true);
            const res = await fetch(`${baseUrl}/api/v1/club/manager/auth/event/registered/data/${EventId.toLowerCase()}`, { method: 'GET', credentials: 'include' });
            if (res.status === 200) {
                const data = await res.json();
                SetIsEventRegisterData(data);
                SetIsEventRegisterLoader(false);
            } else {
                SetIsEventRegisterLoader(false);

            }
        } catch (error) {
            SetIsEventRegisterLoader(false);
        }

    }

    const datadelete = async (id) => {
        try {
            const verify = window.confirm("Are you sure to delete data?");
            if (verify) {
                SetEventParticipantDataDelete(true);
                const res = await fetch(`${baseUrl}/api/v1/club/manager/event/registered/data/delete/${id}`, { method: 'DELETE', credentials: 'include', });
                if (res.status === 200) {
                    toast.success('Data Deleted sucessfully');
                    EventParticipantDataFetch();
                    SetEventParticipantDataDelete(false);
                }
                else if (res.status === 201) {
                    toast.error('Data Already Deleted sucessfully');
                    SetEventParticipantDataDelete(false);
                } else if (res.status === 403) {
                    toast.error('Some technical issue please reload the page')
                    SetEventParticipantDataDelete(false);

                }
            }
        } catch (error) {
            toast.error('Some technical issue' + error);
            SetEventParticipantDataDelete(false);
        }
    }
    useEffect(() => {
        EventParticipantDataFetch();
        if (!EventShortData) {
            navigate('/club/manager/profile')
        }
    }, [])
    if (IsEventRegisterLoader || EventParticipantDataDelete) {
        return <HalfLoader message="Loading.." />
    }
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(Object(IsEventRegisterData)?.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'Total_Participant_List.xlsx');
    };
    return (
        <>
            <div className=' w-[100%] h-[30px] flex justify-center items-center gap-10'>
                <h1 className=' text-[30px] text-[#1c1b2a] font-[700] capitalize'>{EventShortData?.event_Name} Event Register</h1>
                <button className='w-[150px] h-[40px] border-[1px] border-[#29445c]  bg-[#1f4c59] rounded-[5px] shadow-inner text-[#fff]' onClick={exportToExcel}>Export Excel</button>
            </div>
            <div className='w-[100%] h-[72vh] rounded-[4px] bg-[#150f15c4] overflow-y-auto overflow-x-hidden '>
                <div className='w-[100%] h-[100%]    '>
                    {!Object(IsEventRegisterData)?.data?.length ? (
                        <>
                            <div className='w-[100%] h-[100%]  flex justify-center items-center '>
                                <div className='w-[90%] h-[auto] flex justify-center items-center  text-[#000] rounded-[6px] p-[20px]'>
                                    <h1 className='text-[40px] font-[600] text-[#fff] capitalize'>No {EventShortData?.event_Name} Event  Register!!</h1>
                                </div>
                            </div>
                        </>
                    ) : Object(IsEventRegisterData)?.data?.map((element, index) => (
                        <div key={index} className='w-[90%] h-[auto]   text-[#fff] rounded-[6px] p-[20px]'>
                            <div className='w-[100%] h-[auto] flex justify-end items-center gap-4'>
                                <span className="material-symbols-outlined cursor-pointer text-[#ff5165] font-[500]" onClick={() => { datadelete(Object(element)._id) }}>
                                    delete
                                </span>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant Name : </b><p>{Object(element).participant_Name === '' ? 'No participant' : Object(element).participant_Name}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant TechKshitiz Id : </b><p>{Object(element).participant_techk_Shitiz_Id === '' ? 'No participant' : Object(element).participant_techk_Shitiz_Id}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant Email Id : </b><p>{Object(element).participant_Email === '' ? 'No participant' : Object(element).participant_Email}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant Branch : </b><p>{Object(element).participant_Branch === '' ? 'No participant' : Object(element).participant_Branch}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant Registration Number : </b><p>{Object(element).participant_Registration_Number === '' ? 'No participant' : Object(element).participant_Registration_Number}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant Event Name : </b><p>{Object(element).event_Name === '' ? 'No participant' : Object(element).event_Name}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Participant Event Data Id : </b><p>{Object(element).event_Data_Id === '' ? 'No participant' : Object(element).event_Data_Id}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Event Start Date : </b><p>{Object(element).event_Start_date === '' ? 'No participant' : Object(element).event_Start_date}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Event End Date : </b><p>{Object(element).event_End_date === '' ? 'No participant' : Object(element).event_End_date}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize '>
                                <b className='text-[#3fff65]' > Event Registration Start Date : </b><p>{Object(element).event_Registration_Start_date === '' ? 'No participant' : Object(element).event_Registration_Start_date}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Event Registration End Date  : </b><p>{Object(element).event_Registration_End_date === '' ? 'No participant' : Object(element).event_Registration_End_date}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Event Club Name : </b><p>{Object(element).event_Club_Name === '' ? 'No participant' : Object(element).event_Club_Name}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                                <b className='text-[#3fff65]' > Event Register Date : </b><p>{Object(element).createdAt === '' ? 'No participant' : Object(element).createdAt}</p>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export default ClubManagerEventRegisterDataShow
