


import React, { useState } from 'react'
import { toast } from 'react-toastify';
import CatrasoAnimationLoading from '../../../Loader/CatrasoAnimationLoading.tsx';
import Data_Fetch_Api from '../../../contexts/Data_Fetch_Api.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerEventWinnerAdd() {
    const [getdata, setdata] = useState({ Participant_techk_Shitiz_Id: '', Participant_Event_Year: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("")
    const [winner_Participant_Avtar, setwinner_participant_avtar] = useState(null);
    const [IsLoader, IsError, EventNameData] = Data_Fetch_Api("/api/v1/club/manager/auth/event/data/list/")
    const [Participant_Event_Name, SetParticipant_Event_Name] = useState<string>("")
    const [Participant_Event_Id, SetParticipant_Event_Id] = useState<string>("");
    const [winnerPosition, SetWinnerPosition] = useState("");
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }
    let CurrentYear = new Date().getUTCFullYear();
    const handleFileChange = (event) => {
        const winner_participant_avtar = document.querySelector('#winner_participant_avtar');
        if (winner_participant_avtar) {
            if (event.target.value) {
                const file = event.target.files[0];
                if (file.type === "image/jpeg" || file.type === "image/png") {
                    if (file.size >= 102400) {
                        toast.error('File size below the 100kb');
                    }
                    else {
                        setwinner_participant_avtar(file);
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setSelectedFile(String(reader.result));
                            };
                            reader.readAsDataURL(file);
                        } else {
                            setSelectedFile("");
                            Object(winner_participant_avtar).value = ""
                        }

                    }
                } else {
                    setSelectedFile("");
                    Object(winner_participant_avtar).value = ""
                    toast.error('Only Support image/jpeg format');

                }
            }
        }
    };


    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            setIsLoadingRequest(true)

            const { Participant_techk_Shitiz_Id, Participant_Event_Year } = getdata;
            if (Participant_techk_Shitiz_Id && winner_Participant_Avtar && Participant_Event_Name && winnerPosition && Participant_Event_Year && Participant_Event_Id && Participant_techk_Shitiz_Id) {
                const FormDataGET = new FormData();
                // winner_Participant_Avtar,  Participant_Event_Name, Participant_Position, Participant_Event_Year, Participant_Event_Id,  Participant_techk_Shitiz_Id
                FormDataGET.append("Participant_techk_Shitiz_Id", Participant_techk_Shitiz_Id);
                FormDataGET.append("Participant_Event_Name", Participant_Event_Name);
                FormDataGET.append("Participant_Event_Year", Participant_Event_Year);
                FormDataGET.append("Participant_Event_Id", Participant_Event_Id);
                FormDataGET.append("winner_Participant_Avtar", winner_Participant_Avtar);
                FormDataGET.append("Participant_Position", winnerPosition);
                const res = await fetch(baseUrl + '/api/v1/club/manager/auth/event/winner/perticipant/add', {
                    method: 'POST',
                    body: FormDataGET,
                    credentials: 'include',
                })
                if (res.status === 200) {
                    setdata({ Participant_techk_Shitiz_Id: '', Participant_Event_Year: "" });
                    setIsLoadingRequest(false)
                    setSelectedFile("");
                    toast.success('Winner Participant Added Sucessfully');

                } else if (res.status === 403) {
                    setIsLoadingRequest(false)
                    toast.error('Winner Participant  already exist');
                } else if (res.status === 402) {
                    setIsLoadingRequest(false)
                    toast.error('Winner Participant position  already exist');
                } else if (res.status === 401) {
                    setIsLoadingRequest(false)
                    toast.error('Invalid TechKshitiz id');

                } else if (res.status === 400) {
                    setIsLoadingRequest(false)
                    toast.error('All field require');

                } else {
                    setIsLoadingRequest(false)
                    toast.error('Some technical issue');

                }

            } else {
                toast.warning("All field require");
            }



        } catch (error) {
            setIsLoadingRequest(false)
        }
    }
    if (IsLoadingRequest || IsLoader) {
        return <CatrasoAnimationLoading />
    }
    const ClubDataChange = (event) => {
        if (event.target.value) {
            const ClubData = JSON.parse(event.target.value);
            SetParticipant_Event_Id(ClubData.event_Id);
            SetParticipant_Event_Name(ClubData.event_Name);

        }
    }
    const WinnerPositonChange = (event) => {
        if (event.target.value) {
            SetWinnerPosition(event.target.value)
        }
    }
    return (
        <>
            <div className="container">
                <div className="title">Winner Participant Add</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} encType='multipart/form-data' >
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Participant TechKShitiz Id</span>
                                <input type="text" name='Participant_techk_Shitiz_Id' className=' uppercase' value={getdata.Participant_techk_Shitiz_Id} onChange={changedata} placeholder="Add Winner Participant TechKShitiz Id" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Participant Event Name</span>
                                <select name='Participant_Event_Name' onChange={ClubDataChange} required >
                                    <option value="">Select Participant Event Name</option>
                                    {
                                        Object(EventNameData).data ? (
                                            Object(EventNameData).data.map((EventData, index) => (
                                                <option value={JSON.stringify(EventData)} key={index}>{EventData.event_Name}</option>
                                            ))
                                        ) : ""
                                    }

                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Winner Position</span>
                                <select name='Participant_Event_Name' onChange={WinnerPositonChange} required >
                                    <option value="">Select Winner Position</option>
                                    <option value={1}>First</option>
                                    <option value={2}>Second</option>
                                    <option value={3}>Third</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Participant Event Year</span>
                                <select name='Participant_Event_Year' value={getdata.Participant_Event_Year} onChange={changedata} required >
                                    <option value="">Select Participant Event Year</option>
                                    <option value={CurrentYear}>{CurrentYear}</option>
                                    <option value={CurrentYear - 1}>{CurrentYear - 1}</option>
                                    <option value={CurrentYear - 2}>{CurrentYear - 2}</option>
                                    <option value={CurrentYear - 3}>{CurrentYear - 3}</option>
                                    <option value={CurrentYear - 4}>{CurrentYear - 4}</option>
                                    <option value={CurrentYear - 5}>{CurrentYear - 5}</option>
                                </select>
                            </div>

                            <div className="input-box">
                                <span className="details">Winner Participant Avtar</span>
                                <input type="file" id='winner_participant_avtar' name='conformpassword' onChange={handleFileChange} required />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='club_Poster' />
                            </div>

                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Winner Participant Add" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerEventWinnerAdd
