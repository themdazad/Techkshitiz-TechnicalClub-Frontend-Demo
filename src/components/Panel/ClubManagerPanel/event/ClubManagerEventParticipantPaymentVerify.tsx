import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Data_Fetch_Api from '../../../contexts/Data_Fetch_Api.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerEventParticipantPaymentVerify() {
    const VerifyUserData = useLocation().state;
    const [IsLoading, IsError, EventData] = Data_Fetch_Api(`/api/event/route/filter/data/fetch/${VerifyUserData.event_Detail_Show_Id}`);
    const [rejected_Resion, setrejected_Resion] = useState({ rejected_Resion: "" });
    const [rejectionResionBoxOpen, setrejectionResionBoxOpen] = useState(false);
    const [IsLoader, SetIsLoader] = useState(false);
    const [IsLoaderVerify, SetIsLoaderVerify] = useState(false);
    const navigate = useNavigate();
    const OnSubmitData = async (event) => {
        event.preventDefault();
        try {
            SetIsLoader(true);
            const rejected_Resion_data = Object(rejected_Resion).rejected_Resion;
            const { event_Name, participant_Email, event_Id } = VerifyUserData;
            if (rejected_Resion_data && event_Name && participant_Email && event_Id) {
                if (Number(rejected_Resion_data.length) > 10 && Number(rejected_Resion_data.length) < 200) {
                    const res = await fetch(`${baseUrl}/api/v1/club/manager/auth/event/registration/payment/verification/reject/${VerifyUserData._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ event_Name, participant_Email, event_Id, Rejection_Problem_Subject: rejected_Resion_data }),
                        credentials: 'include'
                    });
                    if (res.status === 200) {
                        toast.success("Payment Rejected sucessfully")
                        SetIsLoader(false);

                        navigate("/club/manager/profile/api/event/participant/payment/history")
                    }
                    else if (res.status === 400) {
                        SetIsLoader(false);
                        toast.warning("All field require");
                    }
                    else {
                        toast.warning("Payment Already Rejected");
                        SetIsLoader(false);
                        navigate("/club/manager/profile/api/event/participant/payment/history")

                    }
                } else {
                    SetIsLoader(false);
                    toast.warning("please enter the resion between 50 to 100 ");
                }
            } else {
                SetIsLoader(false);
                toast.warning("All field require");
            }
        }
        catch (error) {
            SetIsLoader(false);
            toast.error("Some technical issue");

        }
    }
    useEffect(() => {
        if (!VerifyUserData) {
            navigate("/club/manager/profile/api/event/participant/payment/history")

        }
    }, [])
    const VerifyEventParticipantPaymentVerify = async () => {
        const verificitation = window.confirm("Are you sure to Verify bis user request");
        if (verificitation) {
            try {
                SetIsLoaderVerify(true);
                const { participant_Name, event_Detail_Show_Id, participant_techk_Shitiz_Id, participant_Email, participant_Branch, participant_Registration_Number, event_Name, event_Data_Id, event_Id, event_Start_date, event_End_date, event_Registration_Start_date, event_Registration_End_date, event_Club_Name, event_Club_Id } = VerifyUserData;
                const { event_image, event_description } = Object(EventData).data;
                if (participant_Name && event_Detail_Show_Id && participant_techk_Shitiz_Id && participant_Email && participant_Branch && participant_Registration_Number && event_Name && event_Data_Id && event_Id && event_Start_date && event_End_date && event_Registration_Start_date && event_Registration_End_date && event_Club_Name && event_Club_Id && event_image && event_description) {
                    const res = await fetch(`${baseUrl}/api/v1/club/manager/auth/event/registration/payment/verification/${VerifyUserData._id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ participant_Name, event_Detail_Show_Id, participant_techk_Shitiz_Id, participant_Email, participant_Branch, participant_Registration_Number, event_Name, event_Data_Id, event_Id, event_Start_date, event_End_date, event_Registration_Start_date, event_Registration_End_date, event_Club_Name, event_Club_Id, event_description }),
                        credentials: 'include'
                    });
                    const response = await res.json();
                    if (res.status === 200) {
                        SetIsLoaderVerify(false);
                        toast.success("Veriification Done sucessfully")
                        navigate("/club/manager/profile/api/event/participant/payment/history")
                    }
                    else if (res.status === 400) {
                        SetIsLoaderVerify(false);
                        toast.error(response.message);
                    }
                    else if (res.status === 401) {
                        SetIsLoaderVerify(false);
                        toast.error(response.message);
                    }
                    else if (res.status === 402) {
                        SetIsLoaderVerify(false);
                        toast.error(response.message);
                    }
                    else if (res.status === 403) {
                        SetIsLoaderVerify(false);
                        toast.error(response.message);
                    }
                    else {
                        SetIsLoaderVerify(false);
                        toast.error("Some technical issue");

                    }
                }
                else {
                    SetIsLoaderVerify(false);
                    toast.warning("All field require");
                }
            }
            catch (error) {
                SetIsLoaderVerify(false);
                toast.error("Some technical issue");

            }
        }

    }
    const RejectEventParticipantPayment = async () => {
        const verificitation = window.confirm("Are you sure to reject be user request");
        if (verificitation) {
            setrejectionResionBoxOpen(true);
        } else {
            setrejectionResionBoxOpen(false);

        }

    }
    return (
        <>
            <div className='w-[100%] h-[72vh] rounded-[4px] bg-[#150f15c4] overflow-y-auto overflow-x-hidden '>
                <form onSubmit={OnSubmitData} className='w-[100%] h-[100%]    '>
                    <div className='w-[90%] h-[auto]   text-[#fff] rounded-[6px] p-[20px]'>


                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Full Name : </b>
                            <p>{Object(VerifyUserData).participant_Name === '' ? 'No participant' : Object(VerifyUserData).participant_Name}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>TechKshitiz Id : </b>
                            <p>{Object(VerifyUserData).participant_techk_Shitiz_Id === '' ? 'No participant' : Object(VerifyUserData).participant_techk_Shitiz_Id}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Email Id : </b>
                            <p>{Object(VerifyUserData).participant_Email}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Phone Number : </b>
                            <p>{Object(VerifyUserData).participant_Phone}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Departement Name : </b>
                            <p>{Object(VerifyUserData).participant_Branch}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Current Year : </b>
                            <p>{Object(VerifyUserData).participant_Year_of_Study}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Admission Year : </b>
                            <p>{Object(VerifyUserData).participant_Admission_Year}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2 capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Registration Number : </b>
                            <p>{Object(VerifyUserData).participant_Registration_Number}</p>
                        </div>

                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>College Name : </b>
                            <p>{Object(VerifyUserData).participant_College_Name}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Date Of Birth : </b>
                            <p>{Object(VerifyUserData).participant_Date_of_Birth}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Name : </b>
                            <p>{Object(VerifyUserData).event_Name}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Id : </b>
                            <p>{Object(VerifyUserData).event_Id}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Club Name : </b>
                            <p>{Object(VerifyUserData).event_Club_Name}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Club Id : </b>
                            <p>{Object(VerifyUserData).event_Club_Id}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Start Date : </b>
                            <p>{Object(VerifyUserData).event_Start_date}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event End Date : </b>
                            <p>{Object(VerifyUserData).event_End_date}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Registration Start Date : </b>
                            <p>{Object(VerifyUserData).event_Registration_Start_date}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Event Registration End Date : </b>
                            <p>{Object(VerifyUserData).event_Registration_End_date}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Participant Name As Per Banking : </b>
                            <p>{Object(VerifyUserData).banking_Name}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Transaction Id : </b>
                            <p>{Object(VerifyUserData).transaction_id}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Bank Last 4-digit/UPI Number : </b>
                            <p>{Object(VerifyUserData).bank_last_four_digit_number_upi_number}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Payment Done Date : </b>
                            <p>{Object(VerifyUserData).payment_Date}</p>
                        </div>
                        <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  capitalize'>
                            <b className='p-[10px] text-left text-[#3fff65]'>Verification Status : </b>
                            <p>{Object(VerifyUserData).event_Registration_Verification_Status ? "Verified" : "Pending"}</p>
                        </div>

                    </div>
                    <div className='w-[100%] p-[20px] flex justify-center items-center gap-8'>
                        <div className={`${rejectionResionBoxOpen ? "flex" : "hidden"} flex-col justify-center items-start`}>
                            <label htmlFor="rejected_Resion" className='text-[#fff] mb-1'>Rejection Resion: </label>
                            <textarea name="rejected_Resion" required className=' outline-none   bg-[#ffffffb7] text-[#000]  p-2 pl-4 rounded-[5px]' placeholder='Enter the rejection resion' value={rejected_Resion?.rejected_Resion} onChange={(e) => { setrejected_Resion({ rejected_Resion: e.target.value }) }} id="rejected_Resion" cols={50} rows={5} style={{ resize: "none" }}></textarea>
                            <button type="submit" className={`${IsLoader ? "flex cursor-not-allowed bg-[#e7344cc7]" : "cursor-pointer bg-[#e7344c]"} border-[1px] mt-4 border-[#30434e]  justify-center items-center gap-2  rounded-[10px]  w-[250px] p-[10px] text-[#fff]`}>Payment Rejected <div className={`${IsLoader ? "" : "hidden"} w-[20px] h-[20px] animate-spin rounded-full border-[2px] border-[#fff] border-t-[#000]`}></div></button>

                        </div>

                        <button type="button" onClick={RejectEventParticipantPayment} className={`${rejectionResionBoxOpen ? "hidden" : ""} border-[1px] border-[#30434e] rounded-[10px] bg-[#e7344c] w-[250px] p-[10px] text-[#fff]`}> Participant Payment Rejected</button>
                        <button type="button" onClick={VerifyEventParticipantPaymentVerify} className={`${IsLoaderVerify ? "flex cursor-not-allowed bg-[#008000bd]" : "cursor-pointer bg-[green]"} border-[1px] mt-4 border-[#30434e]  justify-center items-center gap-2  rounded-[10px]  w-[250px] p-[10px] text-[#fff]`}>Participant Payment Verify <div className={`${IsLoaderVerify ? "" : "hidden"} w-[20px] h-[20px] animate-spin rounded-full border-[2px] border-[#fff] border-t-[#000]`}></div></button>

                    </div >
                </form >
            </div >
        </>
    )
}

export default ClubManagerEventParticipantPaymentVerify
