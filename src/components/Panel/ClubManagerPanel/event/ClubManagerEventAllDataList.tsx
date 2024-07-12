import React, { useEffect, useState } from 'react'
import HalfLoader from '../../../Loader/HalfLoader.tsx';
import Data_Fetch_Api from '../../../contexts/Data_Fetch_Api.tsx'; 

function ClubManagerEventAllDataList() {
 
    const [IsloadingLiveEvent, ErrorIdRequest, EventData] = Data_Fetch_Api('/api/v1/club/manager/auth/live/event/data/list');
    const [IsloadingUpcomingEvent, UpcomingErrorIdRequest, UpcomingEventData] = Data_Fetch_Api('/api/v1/club/manager/auth/upcoming/event/data/list');
    const [IsloadingEventEnded, EndedErrorIdRequest, EndedEventData] = Data_Fetch_Api('/api/v1/club/manager/auth/ended/event/data/list');
    const [EventDataIsCheck, SetEventDataIsCheck] = useState({ event_Name: "", event_Amount: "", event_Description: "", event_Start_Date: "", event_End_Date: "", event_Registration_Start_Date: "", event_Registration_End_Date: "" })



    useEffect(() => {
        SetEventDataIsCheck({ event_Name: Object(EventData)?.event_Name, event_Amount: Object(EventData)?.event_Prices, event_Description: Object(EventData)?.event_description, event_Start_Date: Object(EventData)?.event_Start_date, event_End_Date: Object(EventData)?.event_End_date, event_Registration_Start_Date: Object(EventData)?.event_Registration_Start_date, event_Registration_End_Date: Object(EventData)?.event_Registration_End_date })
    }, [EventData])
  
    const ChangeEventNameData = (event) => { 
        window.alert(event.target.value)
    }

    const EditEventData = (event_Edit_Data_Submit_Button_Tag_Name, event_Data_Edit_Button_Tag_Name, event_Data_Cross_Button_Tag_Name, ShowEventTagName, EditEventDataTagName, index) => {
        const eventDataEditTag = document.querySelector(`#${(EditEventDataTagName + index)}`);
        const eventDataShowTag = document.querySelector(`#${(ShowEventTagName + index)}`);
        const eventDataCrossButtonTag = document.querySelector(`#${(event_Data_Cross_Button_Tag_Name + index)}`);
        const eventDataEditButtonTag = document.querySelector(`#${(event_Data_Edit_Button_Tag_Name + index)}`);
        const eventEditDataSubmitButtonTagName = document.querySelector(`#${(event_Edit_Data_Submit_Button_Tag_Name + index)}`);
        if (eventEditDataSubmitButtonTagName?.classList.contains('hidden')) {
            eventEditDataSubmitButtonTagName.classList.remove('hidden');
        } else {
            eventEditDataSubmitButtonTagName?.classList.add('hidden');

        }
        if (eventDataCrossButtonTag?.classList.contains('hidden')) {
            eventDataCrossButtonTag.classList.remove('hidden');
        } else {
            eventDataCrossButtonTag?.classList.add('hidden');

        }
        if (eventDataEditButtonTag?.classList.contains('hidden')) {
            eventDataEditButtonTag?.classList.remove('hidden');
        } else {
            eventDataEditButtonTag?.classList.add('hidden');

        }
        if (eventDataShowTag?.classList.contains('hidden')) {
            eventDataShowTag.classList.remove('hidden');
        } else {
            eventDataShowTag?.classList.add('hidden');
        }
        if (eventDataEditTag?.classList.contains('hidden')) {
            eventDataEditTag.classList.remove('hidden');
        } else {
            eventDataEditTag?.classList.add('hidden');
        }
    }
    const eventDataChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        SetEventDataIsCheck({ ...EventDataIsCheck, [name]: value })
    }

    const eventDataEditSubmitButtonLoaderHandel = (event_Data_Name_Edit_Button_Loader, index) => {
        const event_Data_Name_Edit_Button_Loader_Tag_Name = document.querySelector(`#${event_Data_Name_Edit_Button_Loader + index}`);
        if (event_Data_Name_Edit_Button_Loader_Tag_Name?.classList.contains('hidden')) {
            event_Data_Name_Edit_Button_Loader_Tag_Name?.classList.remove('hidden');
        } else {
            event_Data_Name_Edit_Button_Loader_Tag_Name?.classList.add('hidden');
        }
    }

    if (IsloadingLiveEvent || IsloadingUpcomingEvent || IsloadingEventEnded) {
        return <HalfLoader message="Loading.." />
    }
    if (ErrorIdRequest) {
        return <h1>Some thing want wrong</h1>
    }
    return (
        <>
            <div id='user_Id_admin_profile' className='w-[100%] h-[100%] rounded-[4px]  bg-[#150f15c4] text-[#fff] overflow-auto '>
                <div className='w-[auto] h-[100%]  p-[20px]'>
                    <table className=' w-[auto]   border-[1px]  border-[#747a86] border-collapse ' >
                        <tr className='border-[1px]   border-[#747a86] '>
                            <th className='p-[10px] text-left'>Sno</th>
                            <th className='p-[10px] text-left'>Event Name</th>
                            <th className='p-[10px] text-left'>Event Id</th>
                            <th className='p-[10px] text-left'>Event Club Name</th>
                            <th className='p-[10px] text-left'>Event Club Id</th>
                            <th className='p-[10px] text-left'>Event Prices</th>
                            <th className='p-[10px] text-left'>Event Data Id</th>
                            <th className='p-[10px] text-left'>Event Year</th>
                            <th className='p-[10px] text-left'>Event Description</th>
                            <th className='p-[10px] text-left'>Event Start date</th>
                            <th className='p-[10px] text-left'>Event End date</th>
                            <th className='p-[10px] text-left'>Event Registration Start Date</th>
                            <th className='p-[10px] text-left'>Event Registration End Date</th>
                        </tr>
                        <tr>
                            <div className='p-[10px]  w-[300px]  text-[#49ff86] text-[20px] text-left'>Live Event Registration List</div>
                        </tr>
                        {
                            Object(EventData).data ? (Object(EventData).data[0] ? (
                                Object(EventData).data.map((RequestData, index) => (
                                    <tr key={index} className=' border-[1px]     border-[#747a86]'>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[50px]  truncate capitalize flex justify-center items-center'>{index + 1}</div>
                                        </td>
                                        <td className='p-[10px] text-left flex justify-start items-center gap-2'>
                                            <div id={`event_Name${index + 1}`} className='w-[300px]  truncate capitalize'>{RequestData.event_Name}</div>
                                            <div id={`event_Name_Edit${index + 1}`} className={` hidden  w-[300px]  truncate capitalize`}>
                                                <input type="text" name='event_Name' value={EventDataIsCheck.event_Name} onChange={eventDataChange} className='text-[#fff] p-[10px] bg-transparent border-[1px]  rounded-[4px] border-[#696969] focus:border-[#c4c4c4] w-[95%] outline-none' />
                                            </div>
                                            <button type='button' onClick={() => { eventDataEditSubmitButtonLoaderHandel("event_Data_Name_Edit_Button_Loader", index + 1) }} className={`bg-[green] hidden flex justify-center items-center rounded-[5px] mr-4 "hidden" text-[#fff] w-[150px] h-[40px] gap-2  p-[5px]`} id={`event_Edit_Data_Submit_Button_Tag_Name${(index + 1)}`}>Edit Changes
                                                <div id={`event_Data_Name_Edit_Button_Loader${index + 1}`} className='w-[20px] hidden rounded-full h-[20px] border-[2px] border-t-[#000] border-[#fff] animate-spin'></div>

                                            </button>
                                            <span id={`event_Name_Edit_Button${index + 1}`} onClick={() => { EditEventData('event_Edit_Data_Submit_Button_Tag_Name', 'event_Name_Edit_Button', 'event_Name_Close_Button', 'event_Name_Edit', 'event_Name', index + 1) }} className="material-symbols-outlined cursor-pointer select-none">
                                                edit
                                            </span>
                                            <span id={`event_Name_Close_Button${index + 1}`} onClick={() => { EditEventData('event_Edit_Data_Submit_Button_Tag_Name', 'event_Name_Edit_Button', 'event_Name_Close_Button', 'event_Name_Edit', 'event_Name', index + 1) }} className=" text-[red] hidden material-symbols-outlined cursor-pointer select-none">
                                                close
                                            </span>

                                        </td>
                                        <td className='p-[10px]  text-left    '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Prices}</div>
                                        </td>
                                        <td className='p-[10px] text-left '><div className='w-[150px]  truncate capitalize'>{RequestData.event_Data_Id}</div></td>
                                        <td className='p-[10px] text-left '><div className='w-[200px]  truncate capitalize'>{RequestData.event_Year}</div></td>

                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_description}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_End_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.event_Registration_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.event_Registration_End_date}</div>
                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <>
                                </>

                            )) : (
                                <></>
                            )
                        }
                        <tr>
                            <div className='p-[10px]  w-[320px] text-[#49ff86]  text-[20px] text-left'>Upcoming Event Registration List</div>
                        </tr>
                        {
                            Object(UpcomingEventData).data ? (Object(UpcomingEventData).data[0] ? (
                                Object(UpcomingEventData).data.reverse().map((RequestData, index) => (
                                    <tr key={index} className=' border-[1px]     border-[#747a86]'>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[50px]  truncate capitalize flex justify-center items-center'>{index + 1}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[300px]  truncate capitalize'>
                                                <input type="text" value={RequestData.event_Name} onChange={(event) => { ChangeEventNameData(event) }} className='text-[#fff] p-[10px] bg-transparent border-[1px]  rounded-[4px] border-[#696969] focus:border-[#c4c4c4] w-[95%] outline-none' />
                                            </div>
                                        </td>
                                        <td className='p-[10px]  text-left    '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Prices}</div>
                                        </td>
                                        <td className='p-[10px] text-left '><div className='w-[150px]  truncate capitalize'>{RequestData.event_Data_Id}</div></td>
                                        <td className='p-[10px] text-left '><div className='w-[200px]  truncate capitalize'>{RequestData.event_Year}</div></td>

                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_description}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_End_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.event_Registration_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.event_Registration_End_date}</div>
                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <>
                                </>

                            )) : (
                                <></>
                            )
                        }
                        <tr>
                            <div className='p-[10px]  w-[300px]  text-[#49ff86] text-[20px] text-left'>Ended Event Registration List</div>
                        </tr>
                        {
                            Object(EndedEventData).data ? (Object(EndedEventData).data[0] ? (
                                Object(EndedEventData).data.reverse().map((RequestData, index) => (
                                    <tr key={index} className=' border-[1px]     border-[#747a86]'>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[50px]  truncate capitalize flex justify-center items-center'>{index + 1}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[300px]  truncate capitalize'>
                                                <input type="text" value={RequestData.event_Name} onChange={(event) => { ChangeEventNameData(event) }} className='text-[#fff] p-[10px] bg-transparent border-[1px]  rounded-[4px] border-[#696969] focus:border-[#c4c4c4] w-[95%] outline-none' />
                                            </div>
                                        </td>
                                        <td className='p-[10px]  text-left    '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Prices}</div>
                                        </td>
                                        <td className='p-[10px] text-left '><div className='w-[150px]  truncate capitalize'>{RequestData.event_Data_Id}</div></td>
                                        <td className='p-[10px] text-left '><div className='w-[200px]  truncate capitalize'>{RequestData.event_Year}</div></td>

                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_description}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_End_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.event_Registration_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.event_Registration_End_date}</div>
                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <>
                                </>

                            )) : (
                                <></>
                            )
                        }

                    </table>
                </div>
            </div>
        </>
    )
}

export default ClubManagerEventAllDataList
