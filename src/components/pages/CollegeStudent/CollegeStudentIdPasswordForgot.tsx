import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainHeader from "../../partials/MainHeader.tsx";
import CatrasoAnimationLoading from "../../Loader/CatrasoAnimationLoading.tsx";
import SchawnnajAnimatedLoader from "../../Loader/SchawnnajAnimatedLoader.tsx";
const baseUrl = process.env.REACT_APP_BACKEND_URL
const CollegeStudentIdPasswordForgot = () => {
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [getdata, setdata] = useState({ techk_Shitiz_Id: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const verifydata = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl + '/api/v1/student/profile/data', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                await res.json();
                SetIsLoading(false)
                navigate('/student/profile/')
            } else {
                SetIsLoading(false)
                navigate('/government-engineering-college-siwan/student/password/forget')
            }
        } catch (error) {
            SetIsLoading(false)
            navigate('/government-engineering-college-siwan/student/password/forget')
        }
    }
    useEffect(() => {
        verifydata();
    }, [])
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    };


    const datasubmit = async (event) => {
        event.preventDefault();
        setIsLoadingRequest(true)
        const { techk_Shitiz_Id } = getdata;
        if (techk_Shitiz_Id) {
            try {
                const res = await fetch(baseUrl + "/api/college/student/techkshitiz-student/password/forget", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ techk_Shitiz_Id: String(techk_Shitiz_Id).toUpperCase() }),
                    credentials: 'include',
                });
                if (res.status === 200) {
                    navigate("/government-engineering-college-siwan/student/verification", { state: { techk_Shitiz_Id: String(techk_Shitiz_Id).toUpperCase() } });
                    toast.success("Otp Send your email Id Please check your email ");
                    setIsLoadingRequest(false)
                } else if (res.status === 400) {
                    toast.error("All field require");
                    setIsLoadingRequest(false)

                } else if (res.status === 401) {
                    toast.error("Invalid login details");
                    setIsLoadingRequest(false)

                } else if (res.status === 403) {
                    toast.error("Some technical issue");
                    setIsLoadingRequest(false)

                } else {
                    toast.error("Some technical issue");
                    setIsLoadingRequest(false)

                }
            } catch (error) {
                setIsLoadingRequest(false)

            }
        } else {
            toast.error("All field require");
            setIsLoadingRequest(false)

        }
    };


    if (IsLoading) {
        return <CatrasoAnimationLoading />
    }
    if (IsLoadingRequest) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>
            <MainHeader />
            <div className="w-[100%] h-[100vh] flex justify-center items-center overflow-auto">
                <div className="w-[100%] h-[100%] bg-[#161f2f] p-[50px] flex justify-center items-center">
                    <div className=" w-[350px] bg-[#efefef] h-[300px] rounded-[10px]  border-[2px]">
                        <div className=" w-[100%] h-[50px] flex justify-center items-center  ">
                            <h1 className="text-[22px] font-[700]">Forget Password</h1>
                        </div>
                        <form onSubmit={datasubmit} className=" w-[100%] h-[200px]   ">
                            <div className=" w-[100%] h-[50px] flex justify-center items-center  mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter your TechkShitiz id : "
                                    name="techk_Shitiz_Id"
                                    onChange={changedata}
                                    value={getdata.techk_Shitiz_Id}
                                    required
                                    className="p-[10px] border-[1px] rounded-[5px] outline-[#bb2470] w-[90%] h-[100%] "
                                />
                            </div>
                            <div className=" w-[100%] h-[20px] flex justify-end items-center mt-[20px]">
                                <NavLink
                                    to="/government-engineering-college-siwan/student/techkshitiz/id/forget"
                                    className=" mr-[20px] text-[15px] font-[600] hover:text-blue-600 text-[#1b0d1e]"
                                >
                                    Forget Id
                                </NavLink>
                            </div>
                            <div className=" w-[100%] h-[100px] flex justify-center items-center mt-[20px]">
                                <button
                                    type="submit"
                                    className=" p-[10px] border-2 w-[150px] rounded-[25px] bg-[#2c76c1] text-[#fff] font-[700]"
                                >
                                    Send Otp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollegeStudentIdPasswordForgot;
