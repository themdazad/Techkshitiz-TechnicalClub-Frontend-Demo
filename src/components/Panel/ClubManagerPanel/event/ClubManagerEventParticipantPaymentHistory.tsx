import React from 'react'
import HalfLoader from '../../../Loader/HalfLoader.tsx';
import Data_Fetch_Api from '../../../contexts/Data_Fetch_Api.tsx';
import { useNavigate } from 'react-router-dom';

function ClubManagerEventParticipantPaymentHistory() {

    const navigate = useNavigate();
    const [IsloadingIdRequest, ErrorIdRequest, getdataIdRequest] = Data_Fetch_Api('/api/v1/club/manager/auth/event/registration/payment/pending/data');
    const [IsloadingIdRequestVerified, ErrorIdRequestVerified, getdataIdVerifiedRequest] = Data_Fetch_Api('/api/v1/club/manager/auth/event/registration/payment/verified/data');
    const VerifyUser = (index) => {
        navigate('/club/manager/profile/api/event/registration/payment/pending/data/verify', { state: Object(getdataIdRequest).data[index] })
    }
    if (IsloadingIdRequest || IsloadingIdRequestVerified) {
        return <HalfLoader message="Loading.." />
    }
    if (ErrorIdRequest || ErrorIdRequestVerified) {
        return <h1>Some thing want wrong</h1>
    }
    return (
        <>
            <div id='user_Id_admin_profile' className='w-[100%] h-[100%] rounded-[4px]  bg-[#150f15c4] text-[#fff] overflow-auto '>
                <div className='w-[auto] h-[100%]  p-[20px]'>
                    <table className=' w-[auto]   border-[1px]  border-[#747a86] border-collapse ' >
                        <tr className='border-[1px]   border-[#747a86] '>
                            <th className='p-[10px] text-left'>Sno</th>
                            <th className='p-[10px] text-left'>Full Name</th>
                            <th className='p-[10px] text-left'>TechKshitiz Id</th>
                            <th className='p-[10px] text-left'>Email Id</th>
                            <th className='p-[10px] text-left'>Phone Number</th>
                            <th className='p-[10px] text-left'>Departement Name</th>
                            <th className='p-[10px] text-left'>Current Year</th>
                            <th className='p-[10px] text-left'>Admission Year</th>
                            <th className='p-[10px] text-left'>Registration Number</th>
                            <th className='p-[10px] text-left'>College Name</th>
                            <th className='p-[10px] text-left'>Date Of Birth</th>
                            <th className='p-[10px] text-left'>Event Name</th>
                            <th className='p-[10px] text-left'>Event Id</th>
                            <th className='p-[10px] text-left'>Event Club Name</th>
                            <th className='p-[10px] text-left'>Event Club Id</th>
                            <th className='p-[10px] text-left'>Event Start Date</th>
                            <th className='p-[10px] text-left'>Event End Date</th>
                            <th className='p-[10px] text-left'>Event Registration Start Date</th>
                            <th className='p-[10px] text-left'>Event Registration End Date</th>
                            <th className='p-[10px] text-left'>Participant Name As Per Banking</th>
                            <th className='p-[10px] text-left'>Transaction Id</th>
                            <th className='p-[10px] text-left'>Bank Last 4-digit/UPI Number</th>
                            <th className='p-[10px] text-left'>Payment Done Date</th>
                            <th className='p-[10px] text-left'>Verification Status</th>
                            <th className='p-[10px] text-center'>Verify</th>
                        </tr>
                        {
                            Object(getdataIdRequest).data ? (Object(getdataIdRequest).data[0] ? (
                                Object(getdataIdRequest).data.reverse().map((RequestData, index) => (
                                    <tr key={index} className=' border-[1px]     border-[#747a86]'>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[50px]  truncate capitalize flex justify-center items-center'>{index + 1}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.participant_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[300px]  truncate capitalize'>{RequestData.participant_techk_Shitiz_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[300px]  truncate capitalize'>{RequestData.participant_Email}</div>
                                        </td>
                                        <td className='p-[10px]  text-left    '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.participant_Phone}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[400px]  truncate capitalize'>{RequestData.participant_Branch}</div>
                                        </td>
                                        <td className='p-[10px] text-left '><div className='w-[150px]  truncate capitalize'>{RequestData.participant_Year_of_Study}</div></td>
                                        <td className='p-[10px] text-left '><div className='w-[200px]  truncate capitalize'>{RequestData.participant_Admission_Year}</div></td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.participant_Registration_Number}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.participant_College_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate capitalize'>{RequestData.participant_Date_of_Birth}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate capitalize'>{RequestData.event_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate capitalize'>{RequestData.event_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.event_Club_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate capitalize'>{RequestData.event_Club_Id}</div>
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
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestData.banking_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate   uppercase'>{RequestData.transaction_id}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[300px]  truncate capitalize'>{RequestData.bank_last_four_digit_number_upi_number}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestData.payment_Date}</div>
                                        </td>
                                        <td className={`p-[10px] text-left   ${RequestData.event_Registration_Verification_Status ? "text-[#39e639]" : "text-[red]"}`}>
                                            <div className='w-[200px]  font-[700]  truncate capitalize '>{RequestData.event_Registration_Verification_Status ? "Verified" : "Pending"}</div>
                                        </td>
                                        <td className={`p-[20px] font-[700] ${RequestData.event_Registration_Verification_Status ? "text-[#39e639]" : "text-[#fff]"}`}>
                                            {RequestData.event_Registration_Verification_Status ? "Verified" : (

                                                <div onClick={() => VerifyUser(index)}>
                                                    <button type="button" className='border-[1px] border-[#30434e] rounded-[10px] bg-[green] w-[200px] p-[10px]'>Verify Participant</button>
                                                </div>
                                            )}
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
                        {
                            Object(getdataIdVerifiedRequest).data ? (Object(getdataIdVerifiedRequest).data[0] ? (
                                Object(getdataIdVerifiedRequest).data.reverse().map((RequestVerifiedData, index) => (
                                    <tr key={index} className=' border-[1px]     border-[#747a86]'>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[50px]  truncate capitalize flex justify-center items-center'>{index + 1}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[200px]  truncate capitalize '>{RequestVerifiedData.participant_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[300px]  truncate uppercase'>{RequestVerifiedData.participant_techk_Shitiz_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[300px]  truncate capitalize'>{RequestVerifiedData.participant_Email}</div>
                                        </td>
                                        <td className='p-[10px]  text-left    '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.participant_Phone}</div>
                                        </td>
                                        <td className='p-[10px] text-left  '>
                                            <div className='w-[400px]  truncate capitalize'>{RequestVerifiedData.participant_Branch}</div>
                                        </td>
                                        <td className='p-[10px] text-left '><div className='w-[150px]  truncate capitalize'>{RequestVerifiedData.participant_Year_of_Study}</div></td>
                                        <td className='p-[10px] text-left '><div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.participant_Admission_Year}</div></td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.participant_Registration_Number}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestVerifiedData.participant_College_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate capitalize'>{RequestVerifiedData.participant_Date_of_Birth}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate capitalize'>{RequestVerifiedData.event_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate uppercase'>{RequestVerifiedData.event_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.event_Club_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[100px]  truncate uppercase'>{RequestVerifiedData.event_Club_Id}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.event_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.event_End_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestVerifiedData.event_Registration_Start_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestVerifiedData.event_Registration_End_date}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[250px]  truncate capitalize'>{RequestVerifiedData.banking_Name}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate   uppercase'>{RequestVerifiedData.transaction_id}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[300px]  truncate capitalize'>{RequestVerifiedData.bank_last_four_digit_number_upi_number}</div>
                                        </td>
                                        <td className='p-[10px] text-left '>
                                            <div className='w-[200px]  truncate capitalize'>{RequestVerifiedData.payment_Date}</div>
                                        </td>
                                        <td className={`p-[10px] text-left   ${RequestVerifiedData.event_Registration_Verification_Status ? "text-[#39e639]" : "text-[red]"}`}>
                                            <div className='w-[200px]  font-[700]  truncate capitalize '>{RequestVerifiedData.event_Registration_Verification_Status ? "Verified" : "Pending"}</div>
                                        </td>
                                        <td className={`p-[20px] font-[700] ${RequestVerifiedData.event_Registration_Verification_Status ? "text-[#39e639]" : "text-[#fff]"}`}>
                                            {RequestVerifiedData.event_Registration_Verification_Status ? "Verified" : (

                                                <div onClick={() => VerifyUser(index)}>
                                                    <button type="button" className='border-[1px] border-[#30434e] rounded-[10px] bg-[green] w-[200px] p-[10px]'>Verify Participant</button>
                                                </div>
                                            )}
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

export default ClubManagerEventParticipantPaymentHistory
