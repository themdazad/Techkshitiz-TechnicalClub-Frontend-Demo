import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../../Loader/HalfLoader.tsx';
import Data_Fetch_Api from '../../../contexts/Data_Fetch_Api.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerEventAdd() {
    const [getdata, setdata] = useState({ eventname: '', event_description: "", event_Prices: "", start_Date: "", End_Date: "", event_Registration_Start_date: "", event_Registration_End_date: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [image, setImage] = useState(null);
    const [RuleBook, setRuleBook] = useState(null);
    const [ClubName, setClubName] = useState<string>("");
    const [ClubId, setClubId] = useState<string>("");
    const [EventRuleBook, setEventRuleBookSelectedFile] = useState<string>("");
    const [IsUserAuthVerification, IsUserErrorAuthVerification, UserAuthData] = Data_Fetch_Api('/api/v1/student/profile/data');

    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }
    useEffect(() => {
        if (Object(UserAuthData)?.data) {
            setClubId(Object(UserAuthData)?.data?.participant_Club_Roll_id);
            setClubName(Object(UserAuthData)?.data?.participant_Club_Roll_name);
        }
    }, [UserAuthData])

    const handleFileChange = (event) => {
        if (event.target.value) {

            const file = event.target.files[0];
            if (file.type === "application/pdf") {
                setSelectedFile("");
                toast.error('Only Support image formet');
            } else {
                if (file.size >= 409600) {
                    toast.error('File size below the 400kb');
                }
                else {
                    setImage(file);
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setSelectedFile(String(reader.result));
                        };
                        reader.readAsDataURL(file);
                    } else {
                        setSelectedFile("");
                    }

                }

            }
        }
    };

    const handleEventRuleBoookFileChange = (event) => {
        const event_rule_book = document.querySelector('#event_rule_book');
        if (event_rule_book) {
            if (event.target.value) {
                const file = event.target.files[0];
                if (file.type === "application/pdf") {
                    if (file.size >= 409600) {
                        toast.error('File size below the 400kb');
                        Object(event_rule_book).value = ""
                    }
                    else {
                        setRuleBook(file);
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setEventRuleBookSelectedFile(String(reader.result));
                            };
                            reader.readAsDataURL(file);
                        } else {
                            setEventRuleBookSelectedFile("");
                            Object(event_rule_book).value = ""
                        }

                    }
                } else {
                    Object(event_rule_book).value = ""
                    setEventRuleBookSelectedFile("");
                    toast.error('Only Support pdf formet');

                }
            }
        }
    };


    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            setIsLoadingRequest(true);
            const { eventname, event_description, event_Registration_End_date, End_Date, start_Date, event_Registration_Start_date, event_Prices } = getdata;
            if (eventname && event_description && End_Date && start_Date && ClubName && event_Prices && event_Registration_End_date && ClubId && image && RuleBook && event_Registration_Start_date) {
                const formData = new FormData();
                formData.append('event_image', Object(image));
                formData.append('event_rulebook_Pdf', Object(RuleBook));
                formData.append('event_Club_Name', ClubName);
                formData.append('event_Club_Id', ClubId);
                formData.append('event_description', getdata.event_description);
                formData.append('event_Start_date', getdata.start_Date);
                formData.append('event_End_date', getdata.End_Date);
                formData.append('event_Name', getdata.eventname);
                formData.append('event_Registration_Start_date', getdata.event_Registration_Start_date);
                formData.append('event_Registration_End_date', getdata.event_Registration_End_date);
                formData.append('event_Prices', getdata.event_Prices);
                const res = await fetch(baseUrl + '/api/v1/club/manager/auth/event/create', {
                    method: "POST",
                    body: formData,
                    credentials: 'include',
                })
                if (res.status === 200) {
                    setdata({ eventname: '', event_description: "", start_Date: "", End_Date: "", event_Registration_Start_date: "", event_Registration_End_date: "", event_Prices: "" });
                    setClubId("");
                    setClubName("");
                    setSelectedFile("");
                    setImage(null);
                    setRuleBook(null);
                    setEventRuleBookSelectedFile("");
                    toast.success("Club Added Sucessfully ");
                    setIsLoadingRequest(false);
                } else if (res.status === 401) {
                    setIsLoadingRequest(false);
                    toast.error("Event  Already exist");
                } else if (res.status === 402) {
                    setIsLoadingRequest(false);
                    toast.error("Event Name Already exist");
                } else if (res.status === 500) {
                    toast.error("Some technical issue");
                    setIsLoadingRequest(false);
                } else if (res.status === 400) {
                    toast.error("All field require");
                    setIsLoadingRequest(false);
                } else {
                    setIsLoadingRequest(false);
                }

            } else {
                toast.error("All field require");
                setIsLoadingRequest(false);
            }

        } catch (error) {
            toast.error("Some technical issue");
            setIsLoadingRequest(false);
        }

    }

    // if (IsLoading) {
    //     return <HalfLoader message="Loading.." />
    // }
    if (IsLoadingRequest) {
        return <HalfLoader message="Processing.." />

    }
    if (IsUserAuthVerification) {
        return <HalfLoader message="Loading.." />

    }
    return (
        <>
            <div className="container">
                <div className="title">Event Add</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} encType='multipart/form-data'>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Event Name</span>
                                <input type="text" name='eventname' value={getdata.eventname} onChange={changedata} placeholder="Enter your Club Name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Amount</span>
                                <input type="number" name='event_Prices' id='event_Prices' placeholder='Enter the event price' value={getdata.event_Prices} onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Start Date</span>
                                <input type="date" name='start_Date' id='start_Date' value={getdata.start_Date} onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event End Date</span>
                                <input type="date" name='End_Date' id='End_Date' value={getdata.End_Date} onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Registration Start Date</span>
                                <input type="date" name='event_Registration_Start_date' id='event_Registration_Start_date' value={getdata.event_Registration_Start_date} onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Registration End Date</span>
                                <input type="date" name='event_Registration_End_date' id='event_Registration_End_date' value={getdata.event_Registration_End_date} onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Description</span>
                                <textarea className='textarea' name='event_description' value={getdata.event_description} placeholder='Enter short description on this club' id='club_description' onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details mt-4">Event Poster</span>
                                <input type="file" name='contest_poster' id='contest_poster' onChange={handleFileChange} required />
                                <span className="details mt-4">Event Rule Book PDF</span>
                                <input type="file" name='event_rule_book' id='event_rule_book' onChange={handleEventRuleBoookFileChange} required />
                            </div>

                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='notSelected' />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <iframe className='w-[100%] h-[100%] rounded-[10px]' src={EventRuleBook} />
                            </div>

                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add Event" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerEventAdd
