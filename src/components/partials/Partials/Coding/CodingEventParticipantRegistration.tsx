import React, { useEffect, useState } from 'react'
import '../../../partials/Partials/Form.css';
import MainHeader from '../../MainHeader.tsx';
import MainFooter from '../../MainFooter.tsx';
import { toast } from 'react-toastify'
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx';
import CatrasoAnimationLoading from '../../../Loader/CatrasoAnimationLoading.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function CodingEventParticipantRegistration() {
    const [getdata, setdata] = useState({ name: '', emailid: '', mobilenumber: '', registrationnumber: '' });
    const [getData, SetData] = useState({ branch: '', AdmissionYear: '', EventSelectParticipant: '' })
    const [Error, setError] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [IsLoading, SetIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [Permission, SetPermission] = useState(1);
    const PermissionCheck = async () => {
        try {
            SetIsLoading(true);
            const res = await fetch(baseUrl + '/api/permission', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                SetPermission(data.coding_registration_permission);
                SetIsLoading(false);
            } else {
                SetPermission(1)
                SetIsLoading(false);
            }
        } catch (error) {
            SetPermission(1)
            SetIsLoading(false);

        }
    }
    useEffect(() => {
        PermissionCheck();
    }, [])
    if (IsLoading) {
        return <CatrasoAnimationLoading />
    }
    if (Permission) {
        return <>
            <MainHeader />
            <div className='w-[100%] h-[83.3vh] flex justify-center items-center bg-[#0f1627] text-[]'>

                <h1 className=' uppercase text-[50px] font-[700] animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px]'>Registration Close</h1>

            </div>
            <MainFooter />

        </>
    }
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }
    const selectDatachange = (event) => {
        let branch = document.querySelector('#branch').value;
        let admissionyear = document.querySelector('#admissionyear').value;
        let eventselectparticipant = document.querySelector('#eventselectparticipant').value;
        SetData({ branch: branch, AdmissionYear: admissionyear, EventSelectParticipant: eventselectparticipant })
    }
    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            SetIsLoading(true);
            setError(false);
            const { name, emailid, mobilenumber, registrationnumber } = getdata;
            const { branch, AdmissionYear, EventSelectParticipant } = getData;
            const formdata = new FormData();
            formdata.append("file", Object(image));
            formdata.append("name", name);
            formdata.append("emailid", emailid);
            formdata.append("mobilenumber", mobilenumber);
            formdata.append("registrationnumber", registrationnumber);
            formdata.append("branch", branch);
            formdata.append("AdmissionYear", AdmissionYear);
            formdata.append("EventSelectParticipant", EventSelectParticipant);
            const res = await fetch('/api/participant/coding/tech/form', {
                method: 'POST',
                body: formdata,
                credentials: 'include',
            })
            if (res.status === 200) {
                SetData({ branch: '', AdmissionYear: '', EventSelectParticipant: '' })
                setdata(Object({ name: '', emailid: '', mobilenumber: '' }));
                SetIsLoading(false);
                setSelectedFile("")
                window.location.assign('https://whatsapp.com/channel/0029VaJOMRBCnA7uvuG1z03d');
                toast.success("Registration Done");
            } else if (res.status === 401) {
                SetIsLoading(false);
                toast.error("Email id Exist please change your email");
                setSelectedFile("")

            } else if (res.status === 402) {
                SetIsLoading(false);
                toast.error("Mobile number exist please change your mobile");
                setSelectedFile("")
            } else if (res.status === 400) {
                SetIsLoading(false);
                toast.error("All field require");
                setSelectedFile("")
            } else if (res.status === 500) {
                SetIsLoading(false);
                toast.error("Some technical issue please try after sum time");
                setSelectedFile("")
            }

        } catch (error) {
            setError(true);
            SetIsLoading(false);
            setSelectedFile("")
        }
    }
    if (IsLoading) {
        return <SchawnnajAnimatedLoader />
    }
    if (Error) {
        return <h1> This time sum technical issue </h1>
    }
    const handleFileChange = (event) => {
        if (event.target.value) {
            const file = event.target.files[0];
            if (file.type === "image/jpeg") {
                if (file.size >= 100000) {
                    toast.error('File size below the 100kb');
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
            } else {
                document.querySelector('#profileimage').value = ""
                setSelectedFile("");
                toast.error('Only Support image/jpeg format');

            }
        }
    };
    const vv = () => {
        console.log(image);
    }
    return (
        <>
            <MainHeader />
            <div className='w-[100%] h-[100%] p-[40px] bg-[#0b1321] flex  justify-center items-center'>
                <div className="container ">
                    <div className="title">Coding Registration</div>
                    <hr />
                    <div className="content ">
                        <form onSubmit={submidformdata} onClick={vv} className='h-[auto]' encType='multipart/form-data' >
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" name='name' value={getdata.name} onChange={changedata} placeholder="Enter your Name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email Id</span>
                                    <input type='email' name='emailid' value={getdata.emailid} onChange={changedata} placeholder="Enter your Email Id" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Mobile Number</span>
                                    <input type="number" name='mobilenumber' value={getdata.mobilenumber} onChange={changedata} placeholder="Enter your Mobile Number" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Registration Number</span>
                                    <input type="text" name='registrationnumber' value={getdata.registrationnumber} onChange={changedata} placeholder="Enter your Registration Number" required />
                                </div>

                                <div className="input-box">
                                    <span className="details">Branch/Department</span>
                                    <select name='branch' id='branch' onChange={selectDatachange} required >
                                        <option value=''>Select Your Department</option>
                                        <option value='Computer Science and Engineering'>Computer Science and Engineering</option>
                                        <option value='Computer Science and Technology (INTERNET OF THINGS)'>Computer Science and Technology (INTERNET OF THINGS)</option>
                                        <option value='Civil Engineering'> Civil Engineering</option>
                                        <option value='Electrical Engineering'> Electrical Engineering</option>
                                        <option value='Electronics Engineering (VLSI DESIGN AND TECHNOLOGY)'>Electronics Engineering (VLSI DESIGN AND TECHNOLOGY)</option>
                                        <option value='Mechanical Engineering'>Mechanical Engineering</option>
                                        <option value='Applied Science and Huminities'>Applied Science and Huminities</option>
                                    </select>
                                </div>

                                <div className="input-box">
                                    <span className="details">Year</span>
                                    <select name="AdmissionYear" id='admissionyear' onChange={selectDatachange} required >
                                        <option value=''>Select Your Year</option>
                                        <option value='2023'>2023</option>
                                        <option value='2022'>2022</option>
                                        <option value='2021'>2021</option>
                                        <option value='2020'>2020</option>
                                    </select>
                                </div>

                                <div className="input-box">
                                    <span className="details">Event</span>
                                    <select name="EventSelectParticipant" id='eventselectparticipant' onChange={selectDatachange} required >
                                        <option value=''>Select Your Type Of Event </option>
                                        <option value='Coding'>Coding</option>

                                    </select>
                                </div>
                                <div className="input-box">
                                    <span className="details">Profile Image</span>
                                    <input type="file" name='profileimage' id='profileimage' onChange={handleFileChange} required />
                                </div>
                                <div className=' w-[100%] h-[auto] p-[10px]   flex justify-center items-center    '>
                                    <p className='text-[14px] max-[480px]:text-[12px] text-center text-[#ff1414] font-[700]'>We would like to notify you that the maximum file upload size will be capped at 100 KB</p>
                                </div>
                                <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                    <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='notSelected' />
                                </div>

                            </div>
                            <div className="button-container">
                                <div className="button">
                                    <input type="submit" value="Registration" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    )
}

export default CodingEventParticipantRegistration
