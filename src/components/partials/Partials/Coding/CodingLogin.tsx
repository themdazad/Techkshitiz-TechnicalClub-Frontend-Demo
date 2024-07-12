import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Data_Fetch_Api from "../../../contexts/Data_Fetch_Api.tsx";
import MainHeader from "../../MainHeader.tsx";
import CatrasoAnimationLoading from "../../../Loader/CatrasoAnimationLoading.tsx";
import SchawnnajAnimatedLoader from "../../../Loader/SchawnnajAnimatedLoader.tsx";
import AnimatedLoader from "../../../Loader/AnimatedLoader.tsx";
import MainFooter from "../../MainFooter.tsx";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const CodingLogin = () => {
  const navigate = useNavigate();
  const [getdata, setdata] = useState({ userid: "", password: "" });
  const [IsLoading, Error] = Data_Fetch_Api('/api/users/data');
  const [IsLoadingRequest, setIsLoadingRequest] = useState(false);
  const [Permission, SetPermission] = useState<number>(1);
  const [IsLoadingData, SetLoading] = useState<boolean>(false);
  const changedata = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setdata({ ...getdata, [name]: value });
  };
  const datasubmit = async (event) => {
    event.preventDefault();
    setIsLoadingRequest(true)
    if (Number(Object(getdata).userid) >= 0 && Number(Object(getdata).userid) <= 9999999999) {
      try {
        const { userid, password } = getdata;
        const res = await fetch(baseUrl + "/api/coding/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid, password }),
          credentials: 'include',
        });

        if (res.status === 200) {
          toast.success("Login Sucessfully");
          setIsLoadingRequest(false)
          navigate("/technical/events/coding/contest/");
        } else if (res.status === 500) {
          toast.error("All field require");
          setIsLoadingRequest(false)

        } else if (res.status === 402) {
          toast.error("Invalid login details");
          setIsLoadingRequest(false)

        } else if (res.status === 403) {
          toast.error("Some technical issue");
          setIsLoadingRequest(false)

        }
      } catch (error) {
        setIsLoadingRequest(false)

      }
    } else {
      toast.error("Alphabet not Allow user name only number");
      setIsLoadingRequest(false)

    }
  };
  const PermissionCheck = async () => {
    try {
      SetLoading(true);
      const res = await fetch(baseUrl + '/api/permission', {
        method: 'GET',
        credentials: 'include'
      })
      if (res.status === 200) {
        const data = await res.json();
        SetPermission(data.coding_contest_login_permission);
        SetLoading(false);
      } else {
        SetPermission(1)
        SetLoading(false);
      }
    } catch (error) {
      SetPermission(1)
      SetLoading(false);
    }
  }

  useEffect(() => {
    PermissionCheck();
  }, [])
  if (IsLoadingData) {
    return <AnimatedLoader />
  }
  if (Permission) {
    return <>
      <MainHeader />
      <div className='w-[100%] h-[100vh] bg-[#0a1722] flex justify-center items-center '>
        <div className='w-[1400px] p-[26px] max-[1350px]:w-[1000px] max-[1050px]:w-[800px] space-y-10'>
          <h1 className=' uppercase text-[40px] font-[700] max-[1050px]:text-[30px] max-[800px]:text-[25px] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px]  '>We appreciate your participation in the Coding competition hosted by the Technical Club of Gec Siwan</h1>
          <h1 className=' uppercase text-[30px] max-[800px]:text-[25px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>Thank You 🌻🌻</h1>
        </div>
      </div>
      <MainFooter />
    </>
  }
  if (Error) {
    // navigate('/participant/login')
  } else {
    // navigate('/technical/events/coding/contest/')
  }
  if (IsLoading) {
    return <CatrasoAnimationLoading />
  }
  if (IsLoadingRequest) {
    return <SchawnnajAnimatedLoader />
  }
  return (
    <>
      <MainHeader />
      <div className="w-[100%] h-[91.6vh] bg-[#161f2f] flex justify-center items-center">
        <div className=" w-[350px] bg-[#efefef] h-[400px] rounded-[10px]  border-[2px]">
          <div className=" w-[100%] h-[50px] flex justify-center items-center  ">
            <h1 className="text-[22px] font-[700]">Coding Login</h1>
          </div>
          <form onSubmit={datasubmit} className=" w-[100%] h-[350px]   ">
            <div className=" w-[100%] h-[50px] flex justify-center items-center  mt-4">
              <input
                type="text"
                placeholder="Enter your event id : "
                name="userid"
                onChange={changedata}
                value={getdata.userid}
                required
                maxLength={10}
                className="p-[10px] border-[1px] rounded-[5px] outline-[#bb2470] w-[90%] h-[100%] "
              />
            </div>
            <div className=" w-[100%] h-[50px] flex justify-center items-center  mt-2">
              <input
                type="password"
                placeholder="Enter your password : "
                name="password"
                value={getdata.password}
                onChange={changedata}
                required
                className="p-[10px] border-[1px] rounded-[5px] outline-[#bb2470] w-[90%] h-[100%]"
              />
            </div>
            <div className=" w-[100%] h-[20px] flex justify-end items-center mt-[20px]">
              <NavLink
                to=""
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
                Login
              </button>
            </div>
            {/* <div className=" w-[100%] h-[auto] flex justify-center items-center mt-[20px] gap-1">
              <p className=" text-[15px]">Have an admin account?</p><NavLink  to="/admin/dashboard/login" className='text-[14px] font-[700]'>Admin Login</NavLink>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default CodingLogin;
