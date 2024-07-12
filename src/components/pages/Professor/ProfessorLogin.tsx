import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainHeader from "../../partials/MainHeader.tsx";
import CatrasoAnimationLoading from "../../Loader/CatrasoAnimationLoading.tsx";
import SchawnnajAnimatedLoader from "../../Loader/SchawnnajAnimatedLoader.tsx";
const baseUrl = process.env.REACT_APP_BACKEND_URL
const ProfessorLogin = () => {
    const [IsLoading, SetIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [getdata, setdata] = useState({ professorid: "", password: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);

    const verifydata = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl + '/api/auth/admin/data', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                await res.json();
                SetIsLoading(false)
                navigate('/professor/profile/')
            } else {
                SetIsLoading(false)
                navigate('/government-engineering-college-siwan/professor/login')
            }
        } catch (error) {
            navigate('/government-engineering-college-siwan/professor/login')

        }
    }
    // useEffect(() => {
    //     // verifydata();
    // }, [])
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    };
    const datasubmit = async (event) => {
        event.preventDefault();
        setIsLoadingRequest(true)
        try {
            const { professorid, password } = getdata;

            const res = await fetch(baseUrl + "/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ adminid:245645634567, password }),
            });

            if (res.status === 200) {
                navigate("/admin/dashboard/login/verification", { state: 'someValue' });
                toast.success("Otp Send your email Id Please check your mail ");
                setIsLoadingRequest(false)
            } else if (res.status === 500) {
                toast.error("All field require");
                setIsLoadingRequest(false)

            } else if (res.status === 400) {
                toast.error("Invalid login details");
                setIsLoadingRequest(false)

            } else if (res.status === 403) {
                toast.error("Some technical issue");
                setIsLoadingRequest(false)

            }
        } catch (error) {
            toast.error("Some technical issue");
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
            <div className="w-[100%] h-[100vh] bg-[#161f2f] flex justify-center items-center">
                <div className=" w-[350px] bg-[#efefef] h-[400px] rounded-[10px]  border-[2px]">
                    <div className=" w-[100%] h-[50px] flex justify-center items-center  ">
                        <h1 className="text-[22px] font-[700]">Professor Login</h1>
                    </div>
                    <form onSubmit={datasubmit} className=" w-[100%] h-[350px]   ">
                        <div className=" w-[100%] h-[50px] flex justify-center items-center  mt-4">
                            <input
                                type="text"
                                placeholder="Enter your professor id : "
                                name="professorid"
                                onChange={changedata}
                                value={getdata.professorid}
                                required
                                maxLength={10}
                                className="p-[10px] border-[1px] rounded-[5px] outline-[#bb2470] w-[90%] h-[100%] "
                            />
                        </div>
                        <div className=" w-[100%] h-[50px] flex justify-center items-center  mt-2">
                            <input
                                type="password"
                                placeholder="Enter your professor password : "
                                name="password"
                                value={getdata.password}
                                onChange={changedata}
                                required
                                className="p-[10px] border-[1px] rounded-[5px] outline-[#bb2470] w-[90%] h-[100%]"
                            />
                        </div>
                        <div className=" w-[100%] h-[20px] flex justify-end items-center mt-[20px]">
                            <NavLink
                                to="/professor/password/forget/"
                                className=" mr-[20px] text-[15px] font-[600] text-[#1b0d1e]"
                            >
                                Forget Password?
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
                        <div className=" w-[100%] h-[auto] flex justify-center items-center mt-[20px] gap-1">
                            <p className=" text-[15px]">Don't have an account?</p><NavLink to="/government-engineering-college-siwan/professor/signup/request" className='text-[14px] font-[700]'>Sign Up</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfessorLogin;
