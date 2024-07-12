import React, { useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../partials/HalfLoader.tsx';
import Data_Fetch_Api from '../../contexts/Data_Fetch_Api.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerGallery() {
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [IsUserDataLoading, IsUserDataError, UserData] = Data_Fetch_Api('/api/v1/student/profile/data');
    const [Error, SetError] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.value) {
            const file = event.target.files[0];
            if (file.type === "image/jpeg") {
                if (Number(file.size) >= 512000) {
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
            } else {
                setSelectedFile("");
                toast.error('Only Support image/jpeg format');

            }
        }
    };
    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            SetError(false)
            setIsLoadingRequest(true);
            const formData = new FormData();
            formData.append('club_Name', Object(UserData)?.data?.participant_Club_Roll_name);
            formData.append('club_Id', Object(UserData)?.data?.participant_Club_Roll_id);
            formData.append('contest_poster', Object(image));
            const res = await fetch(baseUrl + '/api/v1/club/manager/auth/gallery/images/add/data/', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (res.status === 200) {
                toast.success("Event Gallery Images  Added ");
                setSelectedFile("");
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

        } catch (error) {
            SetError(true);
            toast.error("some technical issue");
            setIsLoadingRequest(false);
        }

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
                <div className="title">Event Gallery Images Add</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} encType='multipart/form-data'>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Gallery Image</span>
                                <input type="file" name='club_Poster' id='club_Poster' onChange={handleFileChange} required />
                            </div>
                            <div className=' w-[300px] h-[250px] border-[2px] flex justify-center items-center border-[#000] rounded-[10px]'>
                                <img className='w-[100%] h-[100%] rounded-[10px]' src={selectedFile} alt='notSelected' />
                            </div>


                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add Club" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerGallery
