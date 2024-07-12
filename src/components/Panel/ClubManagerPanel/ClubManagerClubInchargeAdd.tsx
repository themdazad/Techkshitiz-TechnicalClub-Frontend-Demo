import React, { useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../Loader/HalfLoader.tsx';
import Data_Fetch_Api from '../../contexts/Data_Fetch_Api.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerClubInchargeAdd() {
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [getdata, setdata] = useState({ club_Incharge_Name: '', club_incharge_role: "", club_incharge_mobile_Number: "", Club_Incharge_Branch: "", club_incharge_email: "", club_incharge_Twitter: "", club_incharge_Linkedin: "", club_incharge_role_Position: "" });
    const [IsUserDataLoading, IsUserDataError, UserData] = Data_Fetch_Api('/api/v1/student/profile/data');

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
            const { club_Incharge_Name, club_incharge_role, club_incharge_role_Position, club_incharge_mobile_Number, Club_Incharge_Branch, club_incharge_email, club_incharge_Twitter, club_incharge_Linkedin } = getdata;


            if (club_Incharge_Name && club_incharge_role && club_incharge_role_Position && Object(UserData)?.data?.participant_Club_Roll_id && Object(UserData)?.data?.participant_Club_Roll_name && club_incharge_mobile_Number && Club_Incharge_Branch && club_incharge_email && club_incharge_Twitter && club_incharge_Linkedin) {
                SetError(false)
                setIsLoadingRequest(true);
                const formData = new FormData();
                formData.append('club_incharge_name', club_Incharge_Name);
                formData.append('club_incharge_role', club_incharge_role_Position);
                formData.append('club_incharge_department', Club_Incharge_Branch);
                formData.append('clubId', Object(UserData)?.data?.participant_Club_Roll_id);
                formData.append('clubName', Object(UserData)?.data?.participant_Club_Roll_name);
                formData.append('club_incharge_mobile_Number', club_incharge_mobile_Number);
                formData.append('club_incharge_email', club_incharge_email);
                formData.append('club_incharge_Twitter', club_incharge_Twitter);
                formData.append('club_incharge_Linkedin', club_incharge_Linkedin);
                formData.append('facuilty_Incharge', club_incharge_role === "0" ? "false" : club_incharge_role === "1" ? "true" : "false");
                formData.append('student_Incahrge', club_incharge_role === "0" ? "false" : club_incharge_role === "1" ? "false" : "true");
                formData.append('member', club_incharge_role === "0" ? "true" : club_incharge_role === "1" ? "false" : "false");
                formData.append('club_incharge_avatar', Object(image));

                const res = await fetch(baseUrl + '/api/v1/club/manager/auth/club/incharge/add/', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });
                if (res.status === 200) {
                    toast.success("Club Incharge Added ");
                    setSelectedFile("");
                    setdata({ club_Incharge_Name: '', club_incharge_role: "", club_incharge_mobile_Number: "", Club_Incharge_Branch: "", club_incharge_email: "", club_incharge_Twitter: "", club_incharge_Linkedin: "", club_incharge_role_Position: "" })
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
    if (IsLoadingRequest) {
        return <HalfLoader message="Processing.." />

    }
    if (IsUserDataLoading) {
        return <HalfLoader message="Loading.." />

    }
    if (Error) {
        return <h1>Something went wrong!!</h1>
    }
    return (
        <>
            <div className="container">
                <div className="title">Club Incharge Add</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} encType='multipart/form-data'>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Club Incharge Name</span>
                                <input type="text" name='club_Incharge_Name' value={getdata.club_Incharge_Name} onChange={changedata} placeholder="Enter your Club Incharge Name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Club Incharge Role</span>
                                <select name='club_incharge_role' id='club_incharge_role' value={getdata.club_incharge_role} onChange={changedata} required >
                                    <option value="">Select a club incharge role</option>
                                    <option value="1">Facuilty Incharge</option>
                                    <option value="2">Student Incharge</option>
                                    <option value="0">Member</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Club Incharge Position</span>
                                <select name='club_incharge_role_Position' id='club_incharge_role_Position' value={getdata.club_incharge_role_Position} onChange={changedata} required >
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
                                <span className="details"> Club Incharge Branch</span>
                                <select name='Club_Incharge_Branch' value={getdata.Club_Incharge_Branch} onChange={changedata} required >
                                    <option value="">Select Club Incharge Branch</option>
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
                                <span className="details">Club Incharge Mobile Number</span>
                                <input type="text" name='club_incharge_mobile_Number' value={getdata.club_incharge_mobile_Number} onChange={changedata} placeholder="Enter your Club Incharge Mobile Number" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Club Incharge Email</span>
                                <input type="text" name='club_incharge_email' value={getdata.club_incharge_email} onChange={changedata} placeholder="Enter your Club Inncharge Email Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Club Incharge Twitter</span>
                                <input type="text" name='club_incharge_Twitter' value={getdata.club_incharge_Twitter} onChange={changedata} placeholder="Enter your Club Incharge Twitter Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Club Incharge Linkedin</span>
                                <input type="text" name='club_incharge_Linkedin' value={getdata.club_incharge_Linkedin} onChange={changedata} placeholder="Enter your Club Incharge Linkedin Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Club Incharge Image</span>
                                <input type="file" id='clubInchargeImage' name='clubInchargeImage' onChange={handleFileChange} required />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='notSelected' />
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add Club Incharge" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerClubInchargeAdd
