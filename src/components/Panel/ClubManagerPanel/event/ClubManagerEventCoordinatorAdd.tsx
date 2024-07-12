import React, { useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../../Loader/HalfLoader.tsx';
import Data_Fetch_Api from '../../../contexts/Data_Fetch_Api.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerEventCoordinatorAdd() {
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [getdata, setdata] = useState({ event_Coordinator_Name: '', event_Coordinator_mobile_Number: "", event_Coordinator_Branch: "", event_Coordinator_email: "", event_Coordinator_Twitter: "", event_Coordinator_Linkedin: "", event_Coordinator_role_Position: "" });
    const [IsEventListLoader, IsEventListError, EventDataList] = Data_Fetch_Api('/api/v1/club/manager/auth/event/data/list/')
    const [Event_Name, SetEvent_Name] = useState<string>("")
    const [Event_Id, SetEvent_Id] = useState<string>("")


    const [Error, SetError] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        const clubInchargeImage = document.querySelector('#clubInchargeImage');
        if (clubInchargeImage) {
            if (event.target.value) {
                const file = event.target.files[0];
                if (file.type === "image/jpeg" || file.type === "image/png") {
                    if (Number(file.size) >= 102400) {
                        toast.error('File size below the 100kb');
                        Object(clubInchargeImage).value = ""
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
                            Object(clubInchargeImage).value = ""
                        }

                    }
                } else {
                    setSelectedFile("");
                    Object(clubInchargeImage).value = ""
                    toast.error('Only Support image/jpeg png format');

                }
            }
        }
    };
    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            const { event_Coordinator_Name, event_Coordinator_role_Position, event_Coordinator_mobile_Number, event_Coordinator_Branch, event_Coordinator_email, event_Coordinator_Twitter, event_Coordinator_Linkedin } = getdata;


            if (event_Coordinator_Name && event_Coordinator_role_Position && Event_Name && Event_Id && event_Coordinator_mobile_Number && event_Coordinator_Branch && event_Coordinator_email && event_Coordinator_Twitter && event_Coordinator_Linkedin) {
                SetError(false)
                setIsLoadingRequest(true);
                const formData = new FormData();
                formData.append('event_Coordinator_name', event_Coordinator_Name);
                formData.append('event_Coordinator_role', event_Coordinator_role_Position);
                formData.append('event_Coordinator_department', event_Coordinator_Branch);
                formData.append('eventId', Event_Id);
                formData.append('eventName', Event_Name);
                formData.append('event_Coordinator_mobile_Number', event_Coordinator_mobile_Number);
                formData.append('event_Coordinator_email', event_Coordinator_email);
                formData.append('event_Coordinator_Twitter', event_Coordinator_Twitter);
                formData.append('event_Coordinator_Linkedin', event_Coordinator_Linkedin);
                formData.append('event_Coordinator_avatar', Object(image));
                const res = await fetch(baseUrl + '/api/v1/club/manager/auth/event/coordinator/add/', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });
                if (res.status === 200) {
                    toast.success("Event Coordinator Added  ");
                    setSelectedFile("");
                    setdata({ event_Coordinator_Name: '', event_Coordinator_mobile_Number: "", event_Coordinator_Branch: "", event_Coordinator_email: "", event_Coordinator_Twitter: "", event_Coordinator_Linkedin: "", event_Coordinator_role_Position: "" })
                    setIsLoadingRequest(false);
                }
                if (res.status === 401) {
                    toast.error("Email id already exist");
                    setIsLoadingRequest(false);
                }
                if (res.status === 402) {
                    toast.error("Mobile number already exist");
                    setIsLoadingRequest(false);
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
            }

        } catch (error) {
            SetError(true);
            toast.error("some technical issue");
            setIsLoadingRequest(false);
        }

    }
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }

    const ClubDataChange = (event) => {
        if (event.target.value) {
            const ClubData = JSON.parse(event.target.value);
            SetEvent_Id(ClubData.event_Id);
            SetEvent_Name(ClubData.event_Name);

        }
    }
    if (IsLoadingRequest) {
        return <HalfLoader message="Processing.." />

    }
    if (IsEventListLoader) {
        return <HalfLoader message="Loading.." />

    }
    if (Error) {
        return <h1>Something went wrong!!</h1>
    }
    return (
        <>
            <div className="container">
                <div className="title">Event Coordinator</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} encType='multipart/form-data'>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Event Coordinator Name</span>
                                <input type="text" name='event_Coordinator_Name' value={getdata.event_Coordinator_Name} onChange={changedata} placeholder="Enter your Event Coordinator Name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Event Name</span>
                                <select name="Incharge_Club_Name" className='text-[#000]' onChange={ClubDataChange} required >
                                    <option value=""> Select Incharge Club Name</option>
                                    {
                                        Object(EventDataList).data ? (
                                            Object(EventDataList).data.map((EventData, index) => (
                                                <option value={JSON.stringify(EventData)} key={index}>{EventData.event_Name}</option>
                                            ))
                                        ) : ""
                                    }

                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Position</span>
                                <select name='event_Coordinator_role_Position' className=' ' id='event_Coordinator_role_Position' value={getdata.event_Coordinator_role_Position} onChange={changedata} required >
                                    <option value="">Select Incharge Position</option>
                                    <option value="Facuilty Incharge">Facuilty Incharge</option>
                                    <option value="President">President</option>
                                    <option value="Vice President">Vice President</option>
                                    <option value="Secretary">Secretary</option>
                                    <option value="Treasurer">Treasurer</option>
                                    <option value="Event Coordinator">Event Coordinator</option>
                                    <option value="Public Relations Officer">Public Relations Officer</option>
                                    <option value="Membership Coordinator">Membership Coordinator</option>
                                    <option value="Committee Chairs">Committee Chairs</option>
                                    <option value="Historian">Historian</option>
                                    <option value="Mentorship Coordinator">Mentorship Coordinator</option>
                                    <option value="Historian">Historian</option>
                                    <option value="Webmaster">Webmaster</option>
                                    <option value="Volunteer Coordinator">Volunteer Coordinator</option>
                                    <option value="Outreach Coordinator">Volunteer Coordinator</option>
                                    <option value="Diversity and Inclusion Officer">Diversity and Inclusion Officer</option>
                                    <option value="Sustainability Coordinator">Sustainability Coordinator</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details"> Event Coordinator Branch</span>
                                <select name='event_Coordinator_Branch' value={getdata.event_Coordinator_Branch} onChange={changedata} required >
                                    <option value="">Select Event Coordinator Branch</option>
                                    <option value="civil egineering">Civil Engineering</option>
                                    <option value="electrical engineering">Electrical Engineering</option>
                                    <option value="mechanical engineering">Mechanical Engineering</option>
                                    <option value="applied science and huminities">Applied Science and Huminities</option>
                                    <option value="computer science and engineering">Computer Science and Engineering</option>
                                    <option value="computer science and technology (INTERNET OF THINGS)">Computer Science and Technology (INTERNET OF THINGS)</option>
                                    <option value="electronics engineering (VLSI DESIGN AND TECHNOLOGY)">Electronics Engineering (VLSI DESIGN AND TECHNOLOGY)</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Mobile Number</span>
                                <input type="text" name='event_Coordinator_mobile_Number' value={getdata.event_Coordinator_mobile_Number} onChange={changedata} placeholder="Enter your Event Coordinator Mobile Number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Email</span>
                                <input type="text" name='event_Coordinator_email' value={getdata.event_Coordinator_email} onChange={changedata} placeholder="Enter your Club Inncharge Email Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Twitter</span>
                                <input type="text" name='event_Coordinator_Twitter' value={getdata.event_Coordinator_Twitter} onChange={changedata} placeholder="Enter your Event Coordinator Twitter Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Linkedin</span>
                                <input type="text" name='event_Coordinator_Linkedin' value={getdata.event_Coordinator_Linkedin} onChange={changedata} placeholder="Enter your Event Coordinator Linkedin Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Event Coordinator Image</span>
                                <input type="file" id='clubInchargeImage' name='clubInchargeImage' onChange={handleFileChange} required />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='notSelected' />
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add Event Coordinator" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerEventCoordinatorAdd
