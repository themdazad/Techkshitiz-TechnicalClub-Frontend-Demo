import React, { useEffect, useState } from 'react'
import MainHeader from '../../MainHeader.tsx'
import MainFooter from '../../MainFooter.tsx'
import { useLocation, useNavigate } from 'react-router-dom';
import registrationIcon from '../../../images/website.png';
import infoIcon from '../../../images/info.png'
import { toast } from 'react-toastify';
import CatrasoAnimationLoading from '../../../Loader/CatrasoAnimationLoading.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
let EventStartDate = new Date();
let EventEndDate = new Date();
let eventIsLive = true;
let EventRegistrationStartDate = new Date();
let EventRegistrationEndDate = new Date();
function EventListDescription() {
    const location = useLocation();
    const navigate = useNavigate();
    const event_Id_Find = location.pathname.split('/');
    const event_Id = event_Id_Find[event_Id_Find.length - 1];
    const Id = event_Id;
    const [Eventdata, SetEventData] = useState<string[]>([]);
    const [GetEventMonth, _] = useState(["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct.", "Nov.", "Dec."])
    const [GetEventSuggestionData, SetEventSuggestionData] = useState<string[]>([]);
    const [IsLoader, SetIsLoader] = useState(true);
    const [IsLogin, SetIsLogin] = useState(false);
    const [StudentData, SetStudentData] = useState<string[]>([]);
    const [Event_Register_Verify, Set_Event_Register_Verify] = useState(false);
    const [Event_Free_Register_Verify, Set_Event_Free_Register_Verify] = useState(false);
    const [StudentEventRegisterLoader, SetStudentEventRegisterLoader] = useState(true);
    const [EventCoordinatorData, SetEventCoordinatorData] = useState<string[]>([]);
    const [EventCoordinatorDataLoader, SetEventCoordinatorDataLoader] = useState<boolean>(true);
    const [TimerIsLoading, SetTimerIsLoading] = useState(true);
    const [eventPoster, SetEventPoster] = useState<string>();
    const [paymentFormSubmitLoader, SetPaymentFormSubmitLoader] = useState(false);
    const [paymentFormData, SetpaymentFormData] = useState({ banking_Name: "", transaction_id: "", bank_last_four_digit_number_upi_number: "", payment_date: "", payment_month: "", payment_year: "" });
    const [payment_mode, SetPaymentMode] = useState(false);
    const [paymentConformation, SetPaymentConformation] = useState(false);




    const EventRegistration = async () => {
        try {
            SetStudentEventRegisterLoader(true);
            const { participant_Name, techk_Shitiz_Id, participant_Email, participant_Branch, participant_Registration_Number } = Object(StudentData);
            const { event_Name, event_Data_Id, event_Id, event_Start_date, event_End_date, event_Registration_Start_date, event_Registration_End_date, event_description, event_Club_Name, event_Club_Id, event_image } = Object(Eventdata);
            if (participant_Name && techk_Shitiz_Id && participant_Email && participant_Branch && participant_Registration_Number && event_Name && event_Data_Id && event_Id && event_Start_date && event_End_date && event_Registration_Start_date && event_Registration_End_date && event_description && event_Club_Name && event_Club_Id && event_image) {
                const res = await fetch(baseUrl + '/api/v1/student/profile/event/free/registration/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ participant_Name, event_Detail_Show_Id: Id, eventPoster, participant_techk_Shitiz_Id: techk_Shitiz_Id, participant_Email, participant_Branch, participant_Registration_Number, event_Name, event_Data_Id, event_Id, event_Start_date, event_End_date, event_Registration_Start_date, event_Registration_End_date, event_description, event_Club_Name, event_Club_Id, event_image }),
                    credentials: 'include',
                })
                if (res.status === 200) {
                    StudentEventVerification(Object(Eventdata).event_Id, Object(Eventdata).event_Club_Id, Object(Eventdata)?.event_Prices)
                    toast.success("Your Registration Sucessfully  ");
                } else if (res.status === 400) {
                    SetStudentEventRegisterLoader(false);
                    toast.error("All field require");
                } else if (res.status === 403) {
                    SetStudentEventRegisterLoader(false);
                    toast.warning("Your are already register");
                }

            } else {
                SetStudentEventRegisterLoader(false);
                toast.error("All field require");

            }
        } catch (error) {
            SetStudentEventRegisterLoader(false);
            toast.error("This time Some technical issue please try again after sum time");
        }

    }

    const OnRegisterEvent = () => {
        if (IsLogin) {
            if (Number(Object(StudentData).participant_Roll) === 1 || Number(Object(StudentData).participant_Roll) === 0) {
                const verificationUserToRegisterOrNot = window.confirm(`Are you sure to register this ${Object(Eventdata).event_Name}  event`)
                if (verificationUserToRegisterOrNot) {
                    if (Object(Eventdata)?.event_Prices) {
                        if (Object(Eventdata)?.event_Prices > 0) {
                            SetPaymentMode(true);
                        } else {
                            EventRegistration();
                        }
                    } else {
                        EventRegistration();
                        SetPaymentMode(false);
                    }
                }
            } else {
                toast.warning("Only Student Register in this event")
            }
        } else {
            navigate('/government-engineering-college-siwan/student/login/');
        }
    }
    const EventDataFetch = async () => {
        try {
            SetIsLoader(true);
            const res = await fetch(`${baseUrl}/api/event/route/filter/data/fetch/${event_Id}`, {
                method: "GET",
                credentials: 'include'
            })
            const data = await res.json();
            if (data) {
                if (data.data) {
                    if (data.data.event_image) {
                        const utfstring = new Uint8Array(data.data.event_image.data.data);
                        const blob = new Blob([utfstring], { type: 'image/jpeg' });
                        const dataurl = URL.createObjectURL(blob);
                        data.data.event_image = dataurl;
                        SetEventPoster(dataurl);
                    }
                    if (data.data.event_rulebook_Pdf) {
                        const utfstring = new Uint8Array(data.data.event_rulebook_Pdf.data.data);
                        const blob = new Blob([utfstring], { type: 'application/pdf' });
                        const dataurl = URL.createObjectURL(blob);
                        data.data.event_rulebook_Pdf = dataurl;
                    }
                }
            }
            EventStartDate = new Date(data.data.event_Start_date)
            EventEndDate = new Date(data.data.event_End_date)
            EventRegistrationStartDate = new Date(data.data.event_Registration_Start_date)
            EventRegistrationEndDate = new Date(data.data.event_Registration_End_date)
            SetEventData(data.data)
            StudentEventVerification(data.data.event_Id, data.data.event_Club_Id, Object(data).data?.event_Prices);
            StudentIncharge(data.data.event_Id);
            SetIsLoader(false);
        } catch (error) {
            SetIsLoader(false);

        }

    }

    const StartDate = Number(new Date(EventRegistrationStartDate.toISOString())) - Number(new Date());
    const calculateTimeLeft = () => {
        const difference = Number(new Date(EventRegistrationEndDate.toISOString())) - Number(new Date());
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        if (Number(difference) <= 0) {
            eventIsLive = false;
        } else {
            eventIsLive = true;

        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        // if (eventIsLive) {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
        // }
    }, [timeLeft]);

    const StudentEventVerification = async (event_Id, event_Club_Id, event_Prices) => {
        try {
            const { techk_Shitiz_Id } = Object(StudentData);
            if (Number(event_Prices) > 0) {
                SetStudentEventRegisterLoader(true)
                const res = await fetch(`${baseUrl}/api/v1/student/profile/event/register/verification?event_Id=${event_Id}&participant_techk_Shitiz_Id=${techk_Shitiz_Id}&event_Club_Id=${event_Club_Id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res.status === 200) {
                    const data = await res.json();
                    const event_Registration_Data = data.data;
                    if (event_Registration_Data) {
                        if (event_Registration_Data.event_Registration_Submit_Status) {
                            Set_Event_Register_Verify(true);
                            SetPaymentConformation(false);
                        }
                        if (event_Registration_Data.event_Registration_Verification_Status) {
                            SetPaymentConformation(true);
                        } else if (event_Registration_Data.event_Registration_Rejection_Status) {
                            SetPaymentConformation(false);
                            Set_Event_Register_Verify(false);
                        }
                    }
                    SetStudentEventRegisterLoader(false)
                } else {
                    SetPaymentConformation(false);
                    SetStudentEventRegisterLoader(false)
                }

            } else {
                SetStudentEventRegisterLoader(true);
                const response = await fetch(`${baseUrl}/api/v1/student/profile/event/free/register/verification?event_Id=${event_Id}&participant_techk_Shitiz_Id=${techk_Shitiz_Id}&event_Club_Id=${event_Club_Id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (response.status === 200) {
                    const data = await response.json();
                    const event_Registration_Data = data.data;
                    if (event_Registration_Data) {
                        Set_Event_Free_Register_Verify(true)
                    }
                    SetStudentEventRegisterLoader(false)
                } else {
                    Set_Event_Free_Register_Verify(false)
                    SetStudentEventRegisterLoader(false)
                }
            }
        } catch (error) {
            SetStudentEventRegisterLoader(false)
        }
    }

    const verifydata = async () => {
        try {
            SetIsLoader(true)
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
                SetStudentData(data.data);

                SetIsLoader(false)
                SetIsLogin(true);
            } else {
                SetIsLoader(false)
                SetIsLogin(false);
            }
        } catch (error) {
            SetIsLogin(false);
            SetIsLoader(false)
        }
    }
    useEffect(() => {
        verifydata();
    }, [])
    useEffect(() => {
        EventDataFetch();
    }, [IsLogin]);

    useEffect(() => {
        const interval = setTimeout(() => {
            SetTimerIsLoading(false);
        }, 2000)
        return () => {
            clearTimeout(interval);
        }
    }, [])

    const downloadRulebook = () => {
        const verify = window.confirm(`Are you sure to download ${Object(Eventdata).event_Name} rulebook`);
        if (verify) {
            toast.success("File has been downloaded please check your download section");
            const a = document.createElement('a');
            a.href = Object(Eventdata).event_rulebook_Pdf;
            a.download = Object(Eventdata).event_Name + "_Rule_Book";
            a.click();
        }
    };

    const ShareButtonClicked = () => {
        if (navigator.share) {
            navigator.share({
                title: `TechKshitiz Government Engineering college, Siwan || ${Object(Eventdata).event_Name} event`,
                url: `/event/${Object(Eventdata).event_Name}/details/${event_Id}`
            })
        }
    }

    const paymentFormSubmit = async (event) => {
        event.preventDefault();
        try {
            SetStudentEventRegisterLoader(true);
            SetPaymentFormSubmitLoader(true);
            const { banking_Name, transaction_id, bank_last_four_digit_number_upi_number, payment_date, payment_month, payment_year } = paymentFormData
            const payment_Date = String(payment_date + '-' + payment_month + "-" + payment_year);
            const { participant_Name, techk_Shitiz_Id, participant_Email, participant_Branch, participant_Registration_Number, participant_Year_of_Study, participant_College_Name, participant_Admission_Year, participant_Phone, participant_Date_of_Birth } = Object(StudentData);
            const { event_Name, event_Data_Id, event_Id, event_Start_date, event_End_date, event_Registration_Start_date, event_Registration_End_date, event_Club_Name, event_Club_Id } = Object(Eventdata);
            if (participant_Name && techk_Shitiz_Id && participant_Email && participant_Date_of_Birth && participant_Year_of_Study && participant_College_Name && participant_Branch && participant_Registration_Number && event_Name && event_Data_Id && event_Id && event_Start_date && event_End_date && event_Registration_Start_date && event_Registration_End_date && participant_Admission_Year && participant_Phone && event_Club_Name && event_Club_Id && banking_Name && transaction_id && bank_last_four_digit_number_upi_number && payment_Date) {
                const res = await fetch(baseUrl + '/api/v1/student/profile/event/registration/fee/payment/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ participant_Name, event_Detail_Show_Id: Id, participant_techk_Shitiz_Id: techk_Shitiz_Id, participant_Email, participant_Branch, participant_Registration_Number, event_Name, event_Data_Id, event_Id, event_Start_date, event_End_date, event_Registration_Start_date, event_Registration_End_date, participant_College_Name, participant_Date_of_Birth, participant_Phone, participant_Admission_Year, event_Club_Name, event_Club_Id, banking_Name, transaction_id, participant_Year_of_Study, bank_last_four_digit_number_upi_number, payment_Date }),
                    credentials: 'include',
                })
                if (res.status === 200) {
                    StudentEventVerification(Object(Eventdata).event_Id, Object(Eventdata).event_Club_Id, Object(Eventdata)?.event_Prices)
                    toast.success("Your registration payment verification request send sucessfully  ");
                    SetpaymentFormData({ banking_Name: "", transaction_id: "", bank_last_four_digit_number_upi_number: "", payment_date: "", payment_month: "", payment_year: "" });
                    SetPaymentMode(false);
                    SetStudentEventRegisterLoader(false);
                    SetPaymentFormSubmitLoader(false);

                } else if (res.status === 400) {
                    toast.error("All field require");
                    SetStudentEventRegisterLoader(false);
                    SetPaymentFormSubmitLoader(false);
                } else if (res.status === 402) {
                    SetpaymentFormData({ ...paymentFormData, transaction_id: "" });
                    toast.warning("Transaction Id  Already exist");
                    SetStudentEventRegisterLoader(false);
                    SetPaymentFormSubmitLoader(false);
                } else if (res.status === 403) {
                    SetpaymentFormData({ banking_Name: "", transaction_id: "", bank_last_four_digit_number_upi_number: "", payment_date: "", payment_month: "", payment_year: "" });
                    toast.warning("Your registration payment verification request  already send");
                    SetStudentEventRegisterLoader(false);
                    SetPaymentFormSubmitLoader(false);
                } else {

                    toast.error("Some technical issue");
                    SetStudentEventRegisterLoader(false);
                    SetPaymentFormSubmitLoader(false);
                }

            } else {
                toast.error("All field require");
                SetStudentEventRegisterLoader(false);
                SetPaymentFormSubmitLoader(false);

            }
        } catch (error) {
            toast.error("This time Some technical issue please try again after sum time");
            SetStudentEventRegisterLoader(false);
            SetPaymentFormSubmitLoader(false);
        }

    }

    const paymentFormDataChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        SetpaymentFormData({ ...paymentFormData, [name]: value });
    }
    
    const OnClickRegisterView = () => {
        navigate('/student/profile/registrations/applications/')
    }
    const StudentIncharge = async (clubId) => {
        try {
            SetEventCoordinatorDataLoader(true);
            const resMember = await fetch(`${baseUrl}/api/event/coordinator/data/${clubId}`, {
                method: "GET",
            });
            const memberdata = await resMember.json();
            if (memberdata.data) {
                if (memberdata.data[0]) {
                    if (memberdata.data[0].event_Coordinator_avatar) {
                        memberdata.data.forEach((element, index) => {
                            const uint8Array = new Uint8Array(element.event_Coordinator_avatar.data.data);
                            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                            const dataUrl = URL.createObjectURL(blob);
                            Object(memberdata.data[index]).event_Coordinator_avatar = dataUrl
                        })
                    }
                }
                SetEventCoordinatorData(memberdata.data);
            } else {
                SetEventCoordinatorData([]);
            }
            SetEventCoordinatorDataLoader(false);
        } catch (error) {
            SetEventCoordinatorDataLoader(false);
        }
    }
    if (IsLoader) {
        return <CatrasoAnimationLoading />
    }
    return (
        <>
            <MainHeader />
            <section className={`w-[100%] h-[500px] max-sm:h-[400px]  max-sm-m:h-[300px]  bg-[#091522] relative select-none `}>
                <div className=' w-[100%] h-[100%] opacity-[0.7]  blur   flex justify-center items-center'>
                    <img className='w-[100%] h-[100%]' src={Object(Eventdata).event_image} alt={Object(Eventdata).event_Name} />
                </div>
                <div className='bg-[#00000067] gap-[300px]  min-xl:gap-64 select-none shadow-[inset_0_35px_60px_-15px_rgba(0,0,0,0.3)]   absolute top-0 left-0  z-10 w-[100%] h-[100%] flex justify-center max-lg:block items-center p-[80px] max-sm:pt-[50px] max-sm:pr-[10px] max-sm:pl-[30px] max-sm-m-:pl-[30px] max-sm-m:pt-4 max-sm-m:gap-10'>
                    <div className='w-[700px]  max-xl:w-[500px] max-sm:w-full max-lg:h-[50%] h-[100%] '>
                        <h1 className='text-[64px] max-xl:text-6xl  mt-10 max-lg:mt-4 max-lg:text-[40px] leading-[37px]   max-lg:leading-[20px] font-[700] text-[#FFDD00] capitalize max-[480px]:text-[30px] max-[480px]:leading-[15px]'>{Object(Eventdata).event_Name}</h1>
                        <p className='text-[18px]  leading-[70px] font-[400] text-[#FFDD00] max-[480px]:text-[15px]  max-sm-m:leading-[55px] '>by <span className=' capitalize'>{Object(Eventdata).event_Club_Name} club GEC, Siwan</span></p>
                        <h1 className='text-[#ececec] text-[20px] font-[600] pt-[10px] pb-[6px] max-lg:pb-0 flex gap-[12px] max-[480px]:text-[15px] max-sm-m:pt-0 '>
                            <span>{EventStartDate.getDate()}th - {EventEndDate.getDate()}th</span>
                            <span>{GetEventMonth[EventEndDate.getMonth()]}</span>
                            <span>{EventStartDate.getFullYear()}</span>
                        </h1>
                        <div className='w-[100%] p-[20px] max-lg:p-[10px] pl-0 flex  justify-start items-center text-[#ececec] gap-3'>
                            <img className='w-[30px] h-[30px] select-none' src={registrationIcon} alt="registrationIcon" />
                            <p className='text-[18px] font-[600] capitalize max-[480px]:text-[15px] '>{Object(Eventdata).event_Prices ? Object(Eventdata).event_Prices > 0 ? Object(Eventdata).event_Prices + ".00  ₹" : "Free Registration" : "Free Registration"}</p>
                        </div>
                    </div>
                    <div className='w-[300px] max-xl:w-[200px] max-lg:h-[50%] max-sm-m:h-auto  max-lg:mt-0 max-lg:w-full  h-[100%] flex justify-center items-start mt-[50px] '>
                        <div className='w-[100%] h-[auto] p-[20px] max-sm-m:mt-8  max-lg:p-0 pl-0'>
                            {
                                StartDate >= 0 ? (

                                    <h1 className='w-[100%] flex gap-2 text-[25px] leading-[60px] max-sm-m:leading-[40px] max-sm-m:p-2   pl-0 font-[500] text-[#ffdd04] animate-pulse'>
                                        Comming Soon..

                                    </h1>
                                ) : (

                                    !eventIsLive ? (
                                        <h1 className='w-[100%] flex gap-2 text-[20px] max-sm:text-[25px]  leading-[60px]  max-sm-m:leading-[40px] max-sm-m:p-2  p-0  pl-0 font-[500] text-[#ffdd04]'>
                                            <span>00 days</span>
                                            <span>:</span>
                                            <span>00</span>
                                            <span>:</span>
                                            <span>00</span>
                                            <span>Left</span>

                                        </h1>
                                    ) : (
                                        !TimerIsLoading ? (
                                            Object(timeLeft).days > 0 ? (
                                                <h1 className='w-[100%] flex gap-2 text-[40px]  max-sm:text-[25px] leading-[60px]  max-sm-m:leading-[40px]   max-sm-m:p-2   p-[20px] pl-0 font-[500] text-[#ffdd04]'>
                                                    <span>{Object(timeLeft).days}</span>
                                                    <span>days</span>
                                                    <span>Left</span>
                                                </h1>
                                            ) : (
                                                <h1 className='w-[100%] flex gap-2 text-[20px]  max-sm:text-[25px] leading-[60px]  max-sm-m:leading-[40px] max-sm-m:p-2  p-[20px] pl-0 font-[500] text-[#ffdd04]'>
                                                    <span>{Object(timeLeft).days > 0 ? (Object(timeLeft).days) : ("0" + Object(timeLeft).days)} days</span>
                                                    <span> : </span>
                                                    <span>{Object(timeLeft).hours > 0 ? (Object(timeLeft).hours) : ("0" + Object(timeLeft).hours)}</span>
                                                    <span> : </span>
                                                    <span>{Object(timeLeft).minutes > 0 ? (Object(timeLeft).minutes) : ("0" + Object(timeLeft).minutes)}</span>
                                                    <span>Left</span>
                                                </h1>
                                            )
                                        ) : (
                                            <>
                                                <h1 className='w-[100%] h-[60px] flex gap-2 text-[40px] leading-[60px] p-[20px] max-sm-m:leading-[40px] max-sm-m:p-2  pl-0 font-[500] text-[#ffdd04]'>
                                                    <div className='loaderDateEvent'></div>
                                                </h1>
                                            </>
                                        )
                                    )

                                )
                            }
                            {
                                StartDate >= 0 ? (
                                    <button style={{ transition: 'all 1s' }} className='text-[#dedede] border-[2px] w-[250px] font-[600] bg-[#fdde4146]   border-[#a28f32] p-[10px]  rounded-[40px] cursor-not-allowed  max-sm:w-[200px] max-sm:text-[13px]'>Registration Soon </button>
                                ) : (
                                    !StudentEventRegisterLoader ? (
                                        !eventIsLive ? (
                                            <button style={{ transition: 'all 1s' }} className='text-[#b0b0b0] border-[2px] w-[250px] font-[600] bg-[#fdde412d]   border-[#7d6f28] p-[10px] max-sm:w-[200px] max-sm:text-[13px]  rounded-[40px] cursor-not-allowed '>Registration closed</button>
                                        ) : (

                                            Object(Eventdata)?.event_Prices > 0 ? (
                                                paymentConformation ? (
                                                    <button onClick={OnClickRegisterView} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  max-sm:w-[200px] max-sm:text-[13px] rounded-[40px] cursor-pointer '>View Register Details</button>
                                                ) : (
                                                    Event_Register_Verify ? (
                                                        <>

                                                            <button style={{ transition: 'all 1s' }} className='text-[#b0b0b0] border-[2px] w-[280px] font-[600] bg-[#fdde412d]   border-[#7d6f28] p-[10px]  rounded-[40px] cursor-not-allowed max-sm:w-[200px] max-sm:text-[13px] '>Payment verification pending</button>
                                                        </>
                                                    ) : (
                                                        <button onClick={OnRegisterEvent} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  max-sm:w-[200px] max-sm:text-[13px] rounded-[40px] cursor-pointer '>Hurry Up, Register Now</button>
                                                    )

                                                )
                                            ) : (
                                                Event_Free_Register_Verify ? (
                                                    <button onClick={OnClickRegisterView} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  rounded-[40px] max-sm:w-[200px] max-sm:text-[13px] cursor-pointer '>View Register Details</button>
                                                ) : (
                                                    <button onClick={OnRegisterEvent} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  rounded-[40px] max-sm:w-[200px] max-sm:text-[13px] cursor-pointer '>Hurry Up, Register Now</button>
                                                )
                                            )

                                        )
                                    ) : (
                                        <h1 className='w-[100%] h-[80px] flex gap-2 text-[40px] leading-[60px] p-[20px] pl-0 font-[500] text-[#ffdd04]'>
                                            <div className='loaderDateEvent'></div>
                                        </h1>
                                    )
                                )
                            }

                        </div>
                    </div>
                </div>
            </section >
            <section id="event_payment_section" className={`${payment_mode ? "flex" : "hidden"} select-none fixed z-50 top-0 left-0  w-full h-[100vh]   justify-center items-start bg-[#091522a4] p-[10px]`}>
                <form onSubmit={paymentFormSubmit} id='Payment-Section' className='w-[800px] border-[1px] border-[#213d4e]  h-[450px] rounded-[10px]  flex justify-center select-none   items-center flex-col'>
                    <div className='w-[100%] h-[70px] bg-[#09132074] flex justify-center items-center '>
                        <h1 className=' text-center text-[35px] font-[700] capitalize text-[#ffffff]  select-none  '> {Object(Eventdata)?.event_Name} Payment</h1>
                    </div>
                    <div className='w-[100%] h-[430px] rounded-[10px] flex bg-[#09132074] justify-center gap-4 items-center'>
                        <div className='w-[300px] h-[100%]   flex flex-col justify-start items-center'>
                            <div id='payment-Scanner' className='w-[200px] h-[200px] flex justify-center items-center border-[2px] border-[#ffffff] rounded-[5px] mt-[10px]'>
                            </div>
                            <h1 className='text-[25px] font-[700] mt-4 text-[#fff] leading-[30px] tracking-[1px]'>Total Pay: <span>49.00</span></h1>
                        </div>
                        <div className=' w-[400px] h-[100%]  flex flex-col gap-2'>
                            <label htmlFor="banking-name" className='text-[16x] font-[500] text-[#fff]'>Name:</label>
                            <input type="text" name='banking_Name' value={paymentFormData.banking_Name} onChange={paymentFormDataChange} id='banking-name' className='pl-[10px] p-[5px] h-[40px] outline-none  rounded-[2px] text-[15px] font-[400] bg-[#11252d] w-[100%] border-[1px] border-[#213d4e] text-[#f7f7f7] focus:border-[#496676] selection:bg-[#517083]  ' placeholder='Enter your name as per bank account' />
                            <label htmlFor="transaction-id" className='text-[16x] font-[500] text-[#fff]'>Transaction Id:</label>
                            <input type="text" name='transaction_id' value={paymentFormData.transaction_id} onChange={paymentFormDataChange} id='transaction-id' className='pl-[10px] p-[5px] h-[40px] outline-none  rounded-[2px] text-[15px] font-[400] bg-[#11252d] w-[100%] border-[1px] border-[#213d4e] text-[#f7f7f7] focus:border-[#496676]  selection:bg-[#517083]' placeholder='Enter your transaction id' />
                            <label htmlFor="bank-last-4-digit" className='text-[16x] font-[500] text-[#fff]'>Bank Last 4-Digit/UPI Number:</label>
                            <input type="number" name='bank_last_four_digit_number_upi_number' value={paymentFormData.bank_last_four_digit_number_upi_number} onChange={paymentFormDataChange} id='bank-last-4-digit' className='pl-[10px] p-[5px] h-[40px] outline-none  rounded-[2px] text-[15px] font-[400] bg-[#11252d] w-[100%] border-[1px]  number-input-Default-properties-hide border-[#213d4e] text-[#f7f7f7] focus:border-[#496676]  selection:bg-[#517083]' placeholder='Enter bank last 4-digit/UPI number' />
                            <label htmlFor="payment-date" className='text-[16x] font-[500] text-[#fff]'>Payment Date:</label>
                            <div className='pl-[10px] p-[5px] h-[40px] outline-none  rounded-[2px] text-[15px] font-[400] bg-[#11252d] w-[100%] border-[1px] border-[#213d4e] text-[#f7f7f7] focus:border-[#496676] selection:bg-[#517083] flex  gap-2  '>
                                {/* <select type="date" className=' bg-transparent  ' id='payment-date' /> */}
                                <input type="number" name='payment_date' value={paymentFormData.payment_date} onChange={paymentFormDataChange} id="payment-date" className='w-[80px] h-[100%] text-center border-[2px] bg-transparent border-[#213d4e] text-[#f7f7f7] focus:border-[#496676] selection:bg-[#517083] number-input-Default-properties-hide outline-none' placeholder='DD' />
                                <span className='text-[20px] text-[#fff] font-[300] flex justify-center items-center mb-1'>-</span>
                                <input type="number" name='payment_month' value={paymentFormData.payment_month} onChange={paymentFormDataChange} className='w-[80px] h-[100%] text-center bg-transparent border-[2px] border-[#213d4e] text-[#f7f7f7] focus:border-[#496676] selection:bg-[#517083]  number-input-Default-properties-hide outline-none' placeholder='MM' />
                                <span className='text-[20px] text-[#fff] font-[300] flex justify-center items-center mb-1'>-</span>
                                <input type="number" name='payment_year' value={paymentFormData.payment_year} onChange={paymentFormDataChange} className='w-[80px] h-[100%] text-center bg-transparent border-[2px] outline-none border-[#213d4e] text-[#f7f7f7] focus:border-[#496676] selection:bg-[#517083] number-input-Default-properties-hide' placeholder='YY' />
                            </div>
                            <div className='flex justify-center items-center w-[100%] h-[auto] p-[10px]'>
                                <div style={{ transition: 'all 0.1s' }} className={`${paymentFormSubmitLoader ? "cursor-not-allowed bg-[#bda02a]" : " cursor-pointer active:bg-[#e5c339] bg-[#ffd429]"} w-[auto] h-[40px] rounded-[5px]  text-[15px] font-[500]  text-[#000] active:text-[#000]   flex justify-center items-center`}>
                                    <input disabled={paymentFormSubmitLoader} type="submit" className={`${paymentFormSubmitLoader ? "w-[90px] cursor-not-allowed" : "w-[120px] cursor-pointer"} border-none outline-none h-[40px] p-[10px] rounded-[5px]  text-[15px] font-[500]  `} value={paymentFormSubmitLoader ? "Processing" : "Register Now"} />
                                    <div className={`${paymentFormSubmitLoader ? "" : "hidden"} w-[15px] h-[15px] mt-1 mr-2 rounded-full border-[2px] border-t-[#fff] animate-spin border-[#000]`}></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </section>
            <div className="bg-[#091522] w-[100%] h-[100%]  p-[30px] max-sm:p-[10px] pb-[20px]  pt-[10px]  flex justify-center items-center">
                <div className="w-[90%] space-y-4 mt-6 ">

                    <div className="w-[100%] h-[auto] space-y-2 ">
                        <h1 className=" capitalize text-[#ffdd04] text-[25px] max-sm-m:text-[20px]  font-[700]">
                            Event Overview
                        </h1>
                        <div className=" pl-[20px]">
                            <p className="text-[#ebebebdb] whitespace-pre-line text-[14px] max-sm-m:text-[13px] font-[300]">
                                {Eventdata ? Object(Eventdata).event_description : ""}
                            </p>
                        </div>
                    </div>


                    <div className="w-[100%] h-[auto] space-y-2 ">
                        <h1 className=" capitalize text-[#ffdd04] text-[25px] max-sm-m:text-[20px]  font-[700]">
                            *Rewards
                        </h1>
                        <div className=" pl-[20px] text-[#ebebebea]  text-[16px] max-sm-m:text-[14px] font-[300]">
                            <ol className='ml-[20px] gap-4'>
                                <li className='list-disc'>Prize</li>
                                <li className='list-disc'>Swag Goodies</li>
                                <li className='list-disc'>Certificates or Badges</li>
                                <li className='list-disc'>Networking Opportunities</li>
                            </ol>
                            <button onClick={downloadRulebook} className='border-[2px] border-[#c7c7c7]  select-none rounded-[25px] h-[42px] mt-[20px] w-[180px] flex justify-center items-center gap-2 p-[10px]  cursor-pointer'>
                                <img src={infoIcon} className='w-[15px] mt-[2px] h-[15px] invert-100 sepia-100 saturate-[0] hue-rotate-[288deg] brightness-[1.02] contrast-[1.02]' alt="infoIcon" />
                                <span>Guidelines</span>
                            </button>
                        </div>
                    </div>

                    <div className="w-[100%] h-[auto] space-y-2 ">
                        <h1 className=" capitalize text-[#ffdd04] text-[25px] max-sm-m:text-[20px]  font-[700]">
                            Event Details
                        </h1>
                        <div className=" pl-[20px]  text-[#ebebebea] text-wrap text-[16px] font-[300]">

                            <div className="flex justify-start items-center  gap-4 mb-2">
                                <div className='w-[250px] max-sm:w-[120px] '>
                                    <h2 className='text-[20px] font-[700] max-sm:text-[15px]  max-sm-m:text-[13px]  text-[#00b8eb]'>Event Start Date</h2>
                                </div>
                                <span className='text-[20px] font-[700] max-sm:text-[18px]  text-[#00b8eb] max-sm-m:text-[16px]'>:</span>
                                <div className='text-[18px] flex gap-2 max-sm:text-[13px] max-sm-m:text-[12px] font-[600] text-[#ffffffe2]'>
                                    <span>{(EventStartDate.getDate() > 9 ? EventStartDate.getDate() : "0" + EventStartDate.getDate())}</span>
                                    <span>{GetEventMonth[EventStartDate.getMonth()]} </span>
                                    <span>{EventStartDate.getFullYear()}</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-4 mb-2">
                                <div className='w-[250px] max-sm:w-[120px]'>
                                    <h2 className='text-[20px] font-[700] max-sm:text-[15px] max-sm-m:text-[13px]  text-[#00b8eb]'>Event  End Date </h2>
                                </div>
                                <span className='text-[20px] font-[700] max-sm:text-[18px] max-sm-m:text-[16px]  text-[#00b8eb]'>:</span>
                                <div className='text-[18px] flex gap-2 font-[600] max-sm:text-[13px] max-sm-m:text-[12px]  text-[#ffffffe2]'>
                                    <span>{(EventEndDate.getDate() > 9 ? EventEndDate.getDate() : "0" + EventEndDate.getDate())}</span>
                                    <span>{GetEventMonth[EventEndDate.getMonth()]} </span>
                                    <span>{EventEndDate.getFullYear()}</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-4 mb-2">
                                <div className='w-[250px] max-sm:w-[120px]'>
                                    <h2 className='text-[20px] font-[700] max-sm:text-[15px] max-sm-m:text-[13px] sm:hidden text-[#00b8eb]'>Reg. Start Date </h2>
                                    <h2 className='text-[20px] font-[700] max-sm:text-[15px] max-sm:hidden max-sm-m:text-[13px]  text-[#00b8eb]'>Registration Start Date </h2>
                                </div>
                                <span className='text-[20px] font-[700] text-[#00b8eb] max-sm:text-[18px] max-sm-m:text-[16px] '>:</span>
                                <div className='text-[18px] flex gap-2 font-[600] max-sm:text-[13px]  max-sm-m:text-[12px] text-[#ffffffe2]'>
                                    <span>{(EventRegistrationStartDate.getDate() > 9 ? EventRegistrationStartDate.getDate() : "0" + EventRegistrationStartDate.getDate())}</span>
                                    <span>{GetEventMonth[EventRegistrationStartDate.getMonth()]} </span>
                                    <span>{EventRegistrationStartDate.getFullYear()}</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-4  mb-4">
                                <div className='w-[250px] max-sm:w-[120px]'>
                                    <h2 className='text-[20px]  max-sm:text-[15px] sm:hidden font-[700] text-[#00b8eb] max-sm-m:text-[13px]'>Reg. End Date </h2>
                                    <h2 className='text-[20px]  max-sm:text-[15px] max-sm:hidden  font-[700] text-[#00b8eb] max-sm-m:text-[13px]'>Registration End Date </h2>
                                </div>
                                <span className='text-[20px] font-[700] text-[#00b8eb] max-sm:text-[18px] max-sm-m:text-[16px]'>:</span>
                                <div className='text-[18px] flex gap-2 max-sm:text-[13px]  font-[600] text-[#ffffffe2] max-sm-m:text-[12px]'>
                                    <span>{(EventRegistrationEndDate.getDate() > 9 ? EventRegistrationEndDate.getDate() : "0" + EventRegistrationEndDate.getDate())}</span>
                                    <span>{GetEventMonth[EventRegistrationEndDate.getMonth()]} </span>
                                    <span>{EventRegistrationEndDate.getFullYear()}</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-4 sm:pt-6  mb-4">
                                <div className='w-[250px] max-sm:hidden'>
                                    <h2 className='text-[20px] max-sm-m:text-[15px] font-[700] text-[#00b8eb]'>Registration</h2>
                                </div>
                                <span className='text-[20px] font-[700] text-[#00b8eb] max-sm:hidden'>:</span>
                                {
                                    StartDate >= 0 ? (
                                        <button style={{ transition: 'all 1s' }} className='text-[#dedede] border-[2px] w-[250px] font-[600] bg-[#fdde4146]   border-[#a28f32] p-[10px]  rounded-[40px] cursor-not-allowed  max-sm:w-[200px] max-sm:text-[13px]'>Registration Soon </button>
                                    ) : (
                                        !StudentEventRegisterLoader ? (
                                            !eventIsLive ? (
                                                <button style={{ transition: 'all 1s' }} className='text-[#b0b0b0] border-[2px] w-[250px] font-[600] bg-[#fdde412d]   border-[#7d6f28] p-[10px] max-sm:w-[200px] max-sm:text-[13px]  rounded-[40px] cursor-not-allowed '>Registration closed</button>
                                            ) : (

                                                Object(Eventdata)?.event_Prices > 0 ? (
                                                    paymentConformation ? (
                                                        <button onClick={OnClickRegisterView} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  max-sm:w-[200px] max-sm:text-[13px] rounded-[40px] cursor-pointer '>View Register Details</button>
                                                    ) : (
                                                        Event_Register_Verify ? (
                                                            <>

                                                                <button style={{ transition: 'all 1s' }} className='text-[#b0b0b0] border-[2px] w-[280px] font-[600] bg-[#fdde412d]   border-[#7d6f28] p-[10px]  rounded-[40px] cursor-not-allowed max-sm:w-[200px] max-sm:text-[13px] '>Payment verification pending</button>
                                                            </>
                                                        ) : (
                                                            <button onClick={OnRegisterEvent} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  max-sm:w-[200px] max-sm:text-[13px] rounded-[40px] cursor-pointer '>Hurry Up, Register Now</button>
                                                        )

                                                    )
                                                ) : (
                                                    Event_Free_Register_Verify ? (
                                                        <button onClick={OnClickRegisterView} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  rounded-[40px] max-sm:w-[200px] max-sm:text-[13px] cursor-pointer '>View Register Details</button>
                                                    ) : (
                                                        <button onClick={OnRegisterEvent} style={{ transition: 'all 1s' }} className='text-[#fff] border-[2px] w-[250px] font-[600] bg-[#fdde412d]  hover:bg-[green] hover:border-[#eeeeee46] border-[#fdde41] p-[10px]  rounded-[40px] max-sm:w-[200px] max-sm:text-[13px] cursor-pointer '>Hurry Up, Register Now</button>
                                                    )
                                                )

                                            )
                                        ) : (
                                            <h1 className='w-[100%] h-[100px] flex gap-2 text-[40px] leading-[60px] p-[20px] pl-0 font-[500] text-[#ffdd04]'>
                                                <div className='loaderDateEvent'></div>
                                            </h1>
                                        )
                                    )
                                }

                            </div>




                        </div>
                    </div>


                    <div className="w-[100%] h-[auto] space-y-2  select-none ">
                        <h1 className=" capitalize text-[#ffdd04] text-[25px] max-sm-m:text-[20px] font-[700]">
                            Event Coordinator
                        </h1>

                        <div className={`w-[100%] h-[auto] p-[10px]  gap-8 flex  flex-wrap items-center  ${EventCoordinatorData.length < 4 ? " justify-start max-lg:justify-center" : " justify-center max-lg:justify-center"}`}>

                            {
                                !EventCoordinatorDataLoader ? (
                                    EventCoordinatorData.length ? (
                                        EventCoordinatorData.map((data, index) => (
                                            <div key={index} className="w-[230px] h-[auto] border-[1px] border-[#14273b] rounded-[6px] cursor-default transition ease-in-out delay-150 hover:shadow-[0_0px_15px_rgb(250,250,250,0.13)]">
                                                <div className="w-[100%] p-[10px] h-[60%] flex  justify-center ">
                                                    <div className="w-[120px] h-[120px] p-[10px] mt-2 border-[1px] bg-[#fff] border-[#143239] overflow-hidden rounded-[50%]">
                                                        <img
                                                            src={Object(data).event_Coordinator_avatar}
                                                            className="w-[100%] h-[100%]  scale-125"
                                                            alt={"Loading..."}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-[100%] p-[10px] pb-[20px] h-[40%]  space-y-2">
                                                    <h3 className="text-[#f3f3f3] capitalize truncate text-center text-[15px]">
                                                        <span className=" ml-[4px]">{Object(data).event_Coordinator_name}</span>
                                                    </h3>
                                                    <h3 className="text-[#ffc629] capitalize truncate text-center text-[15px]">
                                                        <span className=" ml-[4px]">{Object(data).event_Coordinator_role} </span>
                                                    </h3>
                                                    <h4 className="text-[#e6e6e6] capitalize truncate text-center text-[13px]">
                                                        {Object(data).event_Coordinator_department}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))) : (
                                        <div className="w-[100%] h-[400px] flex items-center justify-center">
                                            <h1 className=' uppercase text-[20px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[18px] '>No More Event Coordinator🌻🌻</h1>
                                        </div>
                                    )
                                ) : (
                                    <div className="w-[100%] h-[250px] flex items-center justify-center">
                                        <div className='loaderDateEvent'></div>

                                    </div>

                                )
                            }
                        </div>
                    </div>

                    <div className="w-[100%] h-[auto] space-y-2 ">
                        <h1 className=" text-[#ffdd04] text-[25px] max-sm-m:text-[20px]  font-[700]">
                            Share with your friends
                        </h1>



                        <div className="w-[100%] h-[80px] pl-[50px] flex items-center justify-start gap-4">
                            <div onClick={ShareButtonClicked} style={{ transition: 'all 1s' }} className=' border-[2px] cursor-pointer border-[#1d314d] hover:bg-[#2c4c5a] w-[50px] h-[50px] flex justify-center items-center rounded-full'>
                                <i className="fa-solid fa-share-from-square text-[15px] text-[#e3ffe3]"></i>
                            </div>


                        </div>
                    </div>


                    <div className="w-[100%] h-[auto] space-y-2 hidden ">
                        <h1 className=" capitalize text-[#ffdd04] text-[25px] max-sm-m:text-[20px] font-[700]">
                            Previous Event
                        </h1>
                        <div className="w-[100%] h-[auto] p-[20px]  gap-8  overflow-auto overflow-y-hidden">
                            {GetEventSuggestionData.length ? (
                                GetEventSuggestionData.map((element, index) => (
                                    <>
                                        <div
                                            onClick={() => {
                                                // dataUrlSend(element);
                                            }}
                                            key={index}
                                            className="w-[200px] m-[7px] float-left h-[auto] active:scale-90 border-[1px] border-[#14273b] rounded-[6px] cursor-pointer transition ease-in-out  delay-75 hover:shadow-[0_0px_15px_rgb(250,250,250,0.13)]"
                                        >
                                            <div className="w-[100%] h-[100%]  flex justify-center items-center">
                                                <h3 className="text-[#f3f3f3]  p-[10px]  capitalize text-center text-[15px]">
                                                    <span className=" ml-[4px]">
                                                        {Object(element).clubname} club
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                    </>
                                ))) : (
                                <div className="w-[100%] h-[80px] flex items-center justify-center">
                                    <h1 className=' uppercase text-[20px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[18px] '>No More Previous Event🌻🌻 </h1>

                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    )
}


export default EventListDescription
