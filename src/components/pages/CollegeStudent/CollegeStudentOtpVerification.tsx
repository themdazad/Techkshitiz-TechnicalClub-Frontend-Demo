import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../partials/MainHeader.tsx';
import { toast } from 'react-toastify';
import SchawnnajAnimatedLoader from '../../Loader/SchawnnajAnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function CollegeStudentOtpVerification() {
    const navigate = useNavigate();
    const { techk_Shitiz_Id } = useLocation().state;
    const [getdata, setdata] = useState({ otp: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    };
    useEffect(() => {
        if (!techk_Shitiz_Id) {
            navigate('/')
        }
    }, [])
    const VerifyStudentData = async (event) => {
        event.preventDefault();
        try {
            setIsLoadingRequest(true)
            const { otp } = getdata;
            if (otp) {
                const res = await fetch(baseUrl+"/api/college/student/techkshitiz-student/otp/verification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp, techk_Shitiz_Id }),
                    credentials: 'include',
                });

                if (res.status === 200) {
                    toast.success("Login Sucessfully");
                    setIsLoadingRequest(false)
                    navigate("/student/profile");
                } else if (res.status === 400) {
                    toast.error("All field require");
                    setIsLoadingRequest(false)
                } else if (res.status === 500) {
                    toast.error("Some technical issue");
                    setIsLoadingRequest(false)

                } else if (res.status === 401) {
                    toast.error("Invalid Otp");
                    setIsLoadingRequest(false)

                } else {
                    toast.error("Some technical issue");
                    setIsLoadingRequest(false)
                    
                }
            } else {
                toast.error("Otp Is require")
            }
            
        } catch (error) {
            toast.error("Some technical issue");
            setIsLoadingRequest(false)

        }
    };
    if (IsLoadingRequest) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>
            <MainHeader />
            <div id="otp_verification" className="   w-[100%] h-[100vh]    flex  bg-[#161f2f]   justify-center items-center">
                <div className=" w-[350px] bg-[#efefef] h-[300px] rounded-[10px]  border-[2px]">
                    <div className=" w-[100%] h-[50px] flex justify-center items-center  ">
                        <h1 className="text-[22px] font-[700]">Otp Verificaton</h1>
                    </div>
                    <form onSubmit={VerifyStudentData} className=" w-[100%] h-[250px]   ">
                        <div className=" w-[100%] h-[50px] flex justify-center items-center  mt-4">
                            <input
                                type="text"
                                placeholder="Enter your otp : "
                                name="otp"
                                onChange={changedata}
                                value={getdata.otp}
                                required
                                maxLength={6}
                                className="p-[10px] border-[1px] rounded-[5px] outline-[#bb2470] w-[90%] h-[100%] "
                            />
                        </div>
                        <div className=" w-[100%] h-[100px] flex justify-center items-center mt-[20px]">
                            <button
                                type="submit"
                                className=" p-[10px] border-2 w-[150px] rounded-[25px] bg-[#2c76c1] text-[#fff] font-[700]"
                            >
                                Verify
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CollegeStudentOtpVerification
