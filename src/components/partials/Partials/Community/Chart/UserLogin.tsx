import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import CatrasoAnimationLoading from '../../../../Loader/CatrasoAnimationLoading.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const UserLogin = () => {
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
            const { username, password } = Object(data);
            const res = await fetch(baseUrl + '/api/v1/government-engineering-college-siwan/community/chart/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            })
            if (Number(res.status) === 200) {
                toast.success("Login Sucessfully");
                localStorage.setItem('Chart_Auth_User_Data', JSON.stringify(await res.json()));
                setdata(Object({ password: "", username: "" }));
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

        } catch (error) {
            toast.error("This time sum technical issue");
            SetIsLoader(false);
        }

    }
    if (IsLoader) {
        return <CatrasoAnimationLoading />
    }
    return (
        <div className="flex justify-center items-center  bg-[#081019] flex-col h-screen w-screen">
            <h1 className="text-3xl font-bold text-[#efefef]"> Chat App</h1>
            <form onSubmit={handleLogin} className="max-w-5xl w-1/2 p-8 flex justify-center items-center border-[#122336ee]  gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
                <h1 className="inline-flex items-center text-[#e7e7e7]  text-2xl mb-4 space-y-4 flex-col">
                    <i className="fa-solid fa-lock  "></i> Login
                </h1>
                <input
                    placeholder="Enter the username..."
                    type="text"
                    name='username'
                    value={Object(data).username}
                    onChange={handleDataChange}
                    className='p-[10px] w-[450px] border-[1px] rounded-[5px] text-[#dbdbdb] border-[#111c29]'
                    style={{ background: "none" }}
                />
                <input
                    placeholder="Enter the password..."
                    type="password"
                    name='password'
                    value={Object(data).password}
                    onChange={handleDataChange}
                    className='p-[10px] w-[450px] border-[1px] rounded-[5px] text-[#dbdbdb] border-[#111c29]'
                    style={{ background: "none" }}
                />
                <button
                    disabled={Object.values(data).some((val) => !val)}
                    className='p-[10px] w-[450px] border-[1px] rounded-[5px] text-[#dbdbdb] border-[#111c29] hover:bg-[#0f1a24] transition ease-in-out delay-150'
                >
                    Login
                </button>
                <small className="text-zinc-300">
                    Don&apos;t have an account?{" "}
                    <NavLink className="text-primary hover:underline text-[#7c9eb8]" to="/government-engineering-college-siwan/community/chat/register">
                        Register
                    </NavLink>
                </small>
            </form>
        </div>
    );
};

export default UserLogin;
