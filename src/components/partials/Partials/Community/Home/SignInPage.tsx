import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import CatrasoAnimationLoading from '../../../../Loader/CatrasoAnimationLoading.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const SignInPage = () => {
    const [data, setdata] = useState<string[]>([]);
    const [IsLoader, SetIsLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDataChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...data, [name]: value });
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            SetIsLoader(true);
            const { techkshitiz_Community_Id, password } = Object(data);
            if (techkshitiz_Community_Id && password) {
                const res = await fetch(baseUrl + '/api/v1/government-engineering-college-siwan/community/chart/auth/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ techkshitiz_Community_Id, password }),
                    credentials: 'include',
                })
                if (Number(res.status) === 200) {
                    toast.success("Login Sucessfully");
                    setdata(Object({ password: "", techkshitiz_Community_Id: "" }));
                    navigate('/government-engineering-college-siwan/community/chat')
                    SetIsLoader(false);
                } else if (Number(res.status) === 401) {
                    toast.error("Invalid Login details");
                    SetIsLoader(false);
                } else if (Number(res.status) === 400) {
                    toast.error("All field require");
                    SetIsLoader(false);
                } else {
                    SetIsLoader(false);
                }

            } else {
                toast.error("All field require");
                SetIsLoader(false);
            }

        } catch (error) {
            toast.error("This time sum technical issue");
            SetIsLoader(false);
        }

    }
    if (IsLoader) {
        return <CatrasoAnimationLoading />
    }
    return (
        <div className="flex justify-center items-center  bg-[#081019] max-sm:pl-5 max-sm:pr-5 flex-col h-screen w-screen">
            <h1 className="text-3xl font-bold text-[#efefef]"> Community</h1>
            <form onSubmit={handleLogin} className="max-w-5xl w-1/2 max-sm:w-full p-8 flex justify-center items-center border-[#122336ee]  gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
                <h1 className="inline-flex items-center text-[#e7e7e7]  text-2xl mb-4 space-y-4 flex-col">
                    <i className="fa-solid fa-lock  "></i> Login
                </h1>
                <input
                    placeholder="Enter your techkshitiz community id"
                    type="text"
                    name='techkshitiz_Community_Id'
                    value={Object(data).techkshitiz_Community_Id}
                    onChange={handleDataChange}
                    className='p-[10px] w-[450px] max-lg:w-full border-[2px] rounded-[5px] text-[#dbdbdb] outline-none focus:border-[#304762]  border-[#111c29]'
                    style={{ background: "none" }}
                />
                <input
                    placeholder="Enter the password..."
                    type="password"
                    name='password'
                    value={Object(data).password}
                    onChange={handleDataChange}
                    className='p-[10px] w-[450px] max-lg:w-full border-[2px] rounded-[5px] text-[#dbdbdb] outline-none focus:border-[#304762]  border-[#111c29]'
                    style={{ background: "none" }}
                />
                <button
                    disabled={Object.values(data).some((val) => !val)}
                    className='p-[10px] w-[450px] max-lg:w-full border-[1px] outline-none  rounded-[5px] text-[#dbdbdb] border-[#111c29] hover:bg-[#0f1a24] transition ease-in-out delay-150'
                >
                    Login
                </button>
                {/* <small className="text-zinc-300">
                    Don&apos;t have an account?{" "}
                    <NavLink className="text-primary hover:underline select-none text-[#7c9eb8] border-none outline-none" to="/government-engineering-college-siwan/community/signup">
                        Sign Up
                    </NavLink>
                </small> */}
            </form>
        </div>
    );
};

export default SignInPage;
