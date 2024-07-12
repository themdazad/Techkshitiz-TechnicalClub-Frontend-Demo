import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../../partials/HalfLoader.tsx';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function AdminPanelClubManagerContestAdd() {
    const [getdata, setdata] = useState({ contestname: '', contest_description: "", start_Date: "", End_Date: "", contestNote: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [ClubNameAndClubId, SetClubNameAndClubId] = useState<string[]>([]);
    const [EventNameAndEventId, SetEventNameAndEventId] = useState<string[]>([]);
    const [image, setImage] = useState(null);
    const [ClubName, setClubName] = useState<string>("");
    const [ClubId, setClubId] = useState<string>("");
    const [EventName, setEventName] = useState<string>("");
    const [EventId, setEventId] = useState<string>("");
    const [ContestRuleBook, setContestRuleBookSelectedFile] = useState<string>("");
    const [ContestModeOnline, SetContestModeOnline] = useState("");
    const [RuleBook, setRuleBook] = useState(null);
    const [contestsubmit_form_Mode, Setcontestsubmit_form_Mode] = useState("");
    const [contest_Type, Setcontest_Type] = useState("");

    const changedata = (contest) => {
        let name = contest.target.name;
        let value = contest.target.value;
        setdata({ ...getdata, [name]: value });
    }

    const OnchangeClubNameClubIdData = (contest) => {
        if (contest.target.value) {
            let ClubData = JSON.parse(contest.target.value);
            setClubId(ClubData.club_Id);
            setClubName(ClubData.clubname);
        }

    }
    const OnchangeEventNameEventIdData = (contest) => {
        if (contest.target.value) {
            let EventData = JSON.parse(contest.target.value);
            setEventId(EventData.event_Id);
            setEventName(EventData.event_Name);
        }

    }


    useEffect(() => {
        ClubNameClubIdFind();
        EventNameEventIdFind();
    }, [])

    const ClubNameClubIdFind = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(baseUrl + '/api/club/name/club-id/', {
                method: "GET",
                credentials: 'include'
            })
            const data = await res.json();
            SetClubNameAndClubId(data.data);
            setIsLoading(false)
        } catch (error) {
            console.log("Some technical issue");
            setIsLoading(false)

        }

    }

    const EventNameEventIdFind = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(baseUrl + '/api/v1/club/manager/auth/event/data/list', {
                method: "GET",
                credentials: 'include'
            })
            const data = await res.json();
            SetEventNameAndEventId(data.data);
            setIsLoading(false)
        } catch (error) {
            console.log("Some technical issue");
            setIsLoading(false)

        }

    }

    const handleFileChange = (contest) => {
        if (contest.target.value) {

            const file = contest.target.files[0];
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


    const submidformdata = async (contest) => {
        contest.preventDefault();
        try {
            setIsLoadingRequest(true);
            const { contestname, contest_description, End_Date, start_Date, contestNote } = getdata;
            if (contestname && contest_description && End_Date && start_Date && ClubName && contestsubmit_form_Mode && ContestModeOnline && RuleBook && contest_Type && ClubId && image && EventId && EventName) {
                const formData = new FormData();
                formData.append('contest_image', Object(image));
                formData.append('contest_Club_Name', ClubName);
                formData.append('contest_Club_Id', ClubId);
                formData.append('contest_description', getdata.contest_description);
                formData.append('contest_Start_date', getdata.start_Date);
                formData.append('contest_End_date', getdata.End_Date);
                formData.append('contest_Name', getdata.contestname);
                formData.append('contest_EventName', EventName);
                formData.append('contest_EventId', EventId);
                formData.append('contest_Type', contest_Type);
                formData.append('contest_rulebook_Pdf', RuleBook);
                formData.append('ContestModeOnline', ContestModeOnline);
                formData.append('contestsubmit_form_Mode', contestsubmit_form_Mode);
                formData.append('contestNote', contestNote);
                const res = await fetch(baseUrl + '/api/v1/club/manager/auth/contest/create', {
                    method: "POST",
                    credentials: 'include',
                    body: formData
                })
                if (res.status === 200) {
                    setdata({ contestname: '', contest_description: "", start_Date: "", End_Date: "", contestNote: "" });
                    setClubId("");
                    setClubName("");
                    setSelectedFile("");
                    setImage(null);
                    toast.success("Contest Added Sucessfully ");
                    setIsLoadingRequest(false);
                } else if (res.status === 401) {
                    setIsLoadingRequest(false);
                    toast.error("contest  Already exist");
                } else if (res.status === 402) {
                    setIsLoadingRequest(false);
                    toast.error("contest Name Already exist");
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
                                setContestRuleBookSelectedFile(String(reader.result));
                            };
                            reader.readAsDataURL(file);
                        } else {
                            setContestRuleBookSelectedFile("");
                            Object(event_rule_book).value = ""
                        }

                    }
                } else {
                    Object(event_rule_book).value = ""
                    setContestRuleBookSelectedFile("");
                    toast.error('Only Support pdf formet');

                }
            }
        }
    };

    if (IsLoading) {
        return <HalfLoader message="Loading.." />
    }
    if (IsLoadingRequest) {
        return <HalfLoader message="Processing.." />
    }
    return (
        <>
            <div className="container">
                <div className="title">Contest Add</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} encType='multipart/form-data'>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Contest Name</span>
                                <input type="text" name='contestname' value={getdata.contestname} onChange={changedata} placeholder="Enter your Contest Name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Contest Start Date</span>
                                <input type="date" name='start_Date' id='start_Date' value={getdata.start_Date} onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Contest Event Name</span>
                                <select name='contest_Club_Name' id='contest_Club_Name' onChange={OnchangeEventNameEventIdData}  >
                                    <option value="">Select contest event name</option>
                                    {
                                        Object(EventNameAndEventId).map((data, index) => (
                                            <>
                                                <option key={index} value={JSON.stringify(data)} className=' capitalize'>{data.event_Name}</option>
                                            </>
                                        )
                                        )
                                    }
                                </select>
                                <span className="details">Contest End Date</span>
                                <input type="date" name='End_Date' id='End_Date' value={getdata.End_Date} onChange={changedata} required />
                                <span className="details">Event Contest Name</span>
                                <select name='contest_Club_Name' id='contest_Club_Name' onChange={OnchangeClubNameClubIdData}  >
                                    <option value="">Select contest club name</option>
                                    {
                                        Object(ClubNameAndClubId)?.map((data, index) => (
                                            <>
                                                <option key={index} value={JSON.stringify(data)} className=' capitalize'>{data.clubname}</option>
                                            </>
                                        )
                                        )
                                    }
                                </select>
                            </div>
                            <div className="input-box">

                                <span className="details mt-4">Contest Mode</span>
                                <select name='contest_Mode' id='contest_Mode' onChange={(e) => { SetContestModeOnline(e.target.value) }} required  >
                                    <option value="">Select contest Mode</option>
                                    <option value={"true"}>Online</option>
                                    <option value={"false"}>Offline</option>
                                </select>
                                <span className="details mt-4">Contest Submit form</span>
                                <select name='contestsubmit_form_Mode' id='contestsubmit_form_Mode' onChange={(e) => { Setcontestsubmit_form_Mode(e.target.value) }} required  >
                                    <option value="">Select contest Submit form</option>
                                    <option value={"true"}>On</option>
                                    <option value={"false"}>Off</option>
                                </select>

                            </div>
                            <div className="input-box">
                                <span className="details mt-4">Contest Type </span>
                                <select name='contest_Type' id='contest_Type' onChange={(e) => { Setcontest_Type(e.target.value) }} required  >
                                    <option value="">Select contest Type</option>
                                    <option value={"coding"}>Coding</option>
                                    <option value={"quiz"}>Quiz</option>
                                    <option value={"hackathon"}>Hackathon</option>
                                </select>
                                <span className="details mt-4">Contest Poster</span>
                                <input type="file" name='contest_poster' id='contest_poster' onChange={handleFileChange} required />
                                <span className="details mt-4">Contest Rule Book PDF</span>
                                <input type="file" name='event_rule_book' id='event_rule_book' onChange={handleEventRuleBoookFileChange} required />
                            </div>

                            <div className="input-box">
                                <span className="details">Contest Description</span>
                                <textarea className='textarea' name='contest_description' value={getdata.contest_description} placeholder='Enter short description on this contset' id='club_description' onChange={changedata} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Contest Note(Optional)</span>
                                <textarea className='textarea' name='contestNote' value={getdata.contestNote} placeholder='Enter the note for this contest' id='contestNote' onChange={changedata} />
                            </div>


                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='notSelected' />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <iframe className='w-[100%] h-[100%] rounded-[10px]' title="ContestRuleBook" src={ContestRuleBook} />
                            </div>

                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add contest" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default AdminPanelClubManagerContestAdd 