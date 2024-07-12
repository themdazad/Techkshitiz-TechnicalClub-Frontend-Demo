import React from 'react'
import ClubManagerDashboardNumberBox from './ClubManagerDashboardNumberBox.tsx'
import Data_Fetch_Api from '../../contexts/Data_Fetch_Api.tsx'
import HalfLoader from '../../partials/HalfLoader.tsx'

function DashboardPage() {
    const [IsEventListLoader, IsEventListError, EventDataList] = Data_Fetch_Api('/api/v1/club/manager/auth/event/data/list/')
    if (IsEventListLoader) {
        return <HalfLoader message="Loading.." />
    }
    return (
        <>
            <div className='w-full h-[100%] '>

            </div>
            {
                Object(EventDataList)?.data?.length ? (
                    Object(EventDataList)?.data?.map((EventData, index) => (
                        <ClubManagerDashboardNumberBox key={index} link={`/club/manager/profile/api/event/data/list/${EventData._id}`} state={EventData} totalnumber={Object(EventData)?.EventRegisteredParticipantLength} text={`${EventData.event_Name} Event Register`} icon="app_registration" />
                    ))
                ) : (
                    <>
                        <div className='w-[250px] hover:scale-105 transition ease-in-out delay-200  flex h-[150px] bg-[#5a2ce5] rounded-[20px] justify-center items-center  gap-6 float-left m-[20px] text-[#fff] cursor-default'>
                            No Event Register List
                        </div>
                    </>
                )
            }
            <ClubManagerDashboardNumberBox link={`/club/manager/profile/api/event/data/list/`} state={"EventData"} totalnumber={Object(EventDataList)?.EventRegisteredParticipantLength} text={`${Object(EventDataList)?.event_Name} Event Register`} icon="app_registration" />


        </>
    )
}

export default DashboardPage
