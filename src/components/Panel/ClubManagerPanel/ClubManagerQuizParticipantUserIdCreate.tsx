import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SchawnnajAnimatedLoader from '../../Loader/SchawnnajAnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerQuizParticipantUserIdCreate() {
    const [getdata, setdata] = useState({ password: '', userid: '' });
    const [data, setData] = useState<string[]>([]);
    const [Error, setError] = useState<boolean>(false);
    const [IsLoading, SetIsLoading] = useState<boolean>(false);
    const [base64String, setbase64String] = useState<string>('')
    const [EmailId, SetEmailId] = useState<string>("");
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }
    const QuizUserdata = async (emailid) => {
        try {
            setError(false);
            SetIsLoading(true);
            const res = await fetch(`${baseUrl}/api/participant/quiz/register/data/filter?search=${emailid}`, {
                method: 'POST',
                credentials: 'include',
            })
            if (res.status === 200) {
                const data = await res.json();
                setData(data)
                if (data.ProfileImage) {
                    let arrayBuffer = data.ProfileImage.data.data
                    const base64Strings = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                    setbase64String(base64Strings)
                }
                SetIsLoading(false);
                toast.success("Data found sucessfully");
            } else if (res.status === 401) {
                toast.error("Data Not found");
                SetIsLoading(false);
            } else if (res.status === 500) {
                toast.error("Some technical issue")
                SetIsLoading(false);

            }

        } catch (error) {
            setError(true);
            SetIsLoading(false);
            toast.error("Some technical issue" + error);
        }
    }
    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            SetIsLoading(true);
            setError(false);
            const { userid, password } = getdata;
            const formdata = new FormData();
            formdata.append("name", Object(data).name);
            formdata.append("emailid", Object(data).emailid);
            formdata.append("mobilenumber", Object(data).mobilenumber);
            formdata.append("registrationnumber", Object(data).registrationnumber);
            formdata.append("branch", Object(data).branch);
            formdata.append("AdmissionYear", Object(data).AdmissionYear);
            formdata.append("EventSelectParticipant", Object(data).EventSelectParticipant);
            formdata.append("userid", userid);
            formdata.append("password", password);
            const res = await fetch(baseUrl + '/api/v1/club/manager/auth/participant/quiz/user-id/tech/form', {
                method: 'POST',
                body: formdata,
                credentials:'include'
            })
            if (res.status === 200) {
                setdata({ userid: '', password: '' });
                SetIsLoading(false);
                setbase64String("")
                setData(Object({ name: '', emailid: '', mobilenumber: '', registrationnumber: '', branch: '', AdmissionYear: '', EventSelectParticipant: '' }))
                toast.success("Quiz Participant Id Added");
            } else if (res.status === 401) {
                SetIsLoading(false);
                toast.error("Email id Exist please change your email");
                setbase64String("")
                setdata({ userid: '', password: '' });
                setData(Object({ name: '', emailid: '', mobilenumber: '', registrationnumber: '', branch: '', AdmissionYear: '', EventSelectParticipant: '' }))
            } else if (res.status === 402) {
                SetIsLoading(false);
                toast.error("Mobile number exist please change your mobile");
                setbase64String("")
                setdata({ userid: '', password: '' });
                setData(Object({ name: '', emailid: '', mobilenumber: '', registrationnumber: '', branch: '', AdmissionYear: '', EventSelectParticipant: '' }))

            } else if (res.status === 400) {
                SetIsLoading(false);
                toast.error("All field require");

            } else if (res.status === 500) {
                SetIsLoading(false);
                toast.error("Some technical issue please try after sum time");
            }

        } catch (error) {
            setError(true);
            SetIsLoading(false);
        }
    }
    if (IsLoading) {
        return <SchawnnajAnimatedLoader />
    }
    if (Error) {
        return <h1> This time sum technical issue </h1>
    }

    const verifydata = () => {
        if (EmailId === '') {
            toast.error('Input field  require');
        } else {
            QuizUserdata(EmailId);
            SetEmailId("");

        }

    }

    return (
        <>
            <div className='w-[100%] h-[100px] flex justify-center items-start'>
                <div className="input-box">
                    <span className="details text-[25px] font-[500] mr-2">Email : </span>
                    <input type="text" name='emailid' id='emailid' className='p-[10px] rounded-[5px] outline-[#087fa3]' value={EmailId} onChange={(event) => { SetEmailId(currentValue => currentValue = event.target.value) }} placeholder="Enter your Email id" required />
                    <button className='w-[150px] p-[10px] rounded-[10px] ml-4 text-[#ffffffd4] bg-[#0b201d] h-[45px]' onClick={verifydata}>Check Data</button>
                </div>
            </div>
            <div className="container ">
                <div className="title">Quiz User Id Registration</div>
                <hr />
                <div className="content ">
                    <form onSubmit={submidformdata} className='h-[auto]' encType='multipart/form-data' >
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" name='name' className=' uppercase' value={Object(data).name ? Object(data).name : ''} required />
                            </div>

                            <div className="input-box">
                                <span className="details">Mobile Number</span>
                                <input name='mobilenumber' value={Object(data).mobilenumber ? Object(data).mobilenumber : ''} required />
                            </div>

                            <div className="input-box">
                                <span className="details">Registration Number</span>
                                <input type="text" name='registrationnumber' value={Object(data).registrationnumber ? Object(data).registrationnumber : ''} required />
                            </div>

                            <div className="input-box">
                                <span className="details">Branch/Department</span>
                                <input name="branch" value={Object(data).branch ? Object(data).branch : ''} id='branch' required />
                            </div>

                            <div className="input-box">
                                <span className="details">Year</span>
                                <input name="AdmissionYear" value={Object(data).AdmissionYear ? Object(data).AdmissionYear : ''} id='AdmissionYear' required />
                            </div>

                            <div className="input-box">
                                <span className="details">Event</span>
                                <input name="EventSelectParticipant" value={Object(data).EventSelectParticipant ? Object(data).EventSelectParticipant : ""} id='eventselectparticipant' required />

                            </div>
                            <div className="input-box">
                                <span className="details">User Id</span>
                                <input type="text" maxLength={10} name='userid' value={getdata.userid} onChange={changedata} placeholder="Enter your User Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" name='password' value={getdata.password} onChange={changedata} placeholder="Enter your Password" required />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img src={`data:image/png;base64,${base64String}`} className='w-[100%] h-[100%] rounded-[10px]' alt='notSelected' />
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add Quiz Participant Id" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerQuizParticipantUserIdCreate
