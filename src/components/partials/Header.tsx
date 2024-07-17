import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CatrasoAnimationLoading from "../Loader/CatrasoAnimationLoading.tsx";
import ClubLogo from '../images/TechKshitiz.png';
const baseUrl = process.env.REACT_APP_BACKEND_URL
const Header = (props) => {
  const navigate = useNavigate();
  const [Isloader, SetLoader] = useState(false);
  const loginlinkpage = () => {
    navigate("/participant/login");
  };
  const clickevent = () => {
    const profilebox = document.querySelector("#profilebox");
    if (profilebox !== null) {
      if (profilebox.classList.contains("hidden")) {
        profilebox.classList.remove("hidden");
      } else {
        profilebox.classList.add("hidden");
      }
    }
  };

  const logout = async () => {
    try {
      const verify = window.confirm("Are you sure to Logout this Site");
      clickevent();
      if (verify) {
        SetLoader(true);
        const res = await fetch(baseUrl + "/api/logout/", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 200) {
          SetLoader(false);
          localStorage.removeItem('Auth_participant_Data')
          if (props.datas.EventSelectParticipant === "quiz") {
            navigate("/Quiz/contest/end/thanks/message");
            toast.success("Logout sucessfully Done");
            localStorage.removeItem('timercoding');
            localStorage.removeItem('timer');
            localStorage.removeItem('Mcq_Question');
            localStorage.removeItem('Coding_Participant_Auth_Data');
            sessionStorage.clear();

            return;
          } else if (props.datas.EventSelectParticipant === "coding") {
            navigate("/coding/contest/end/thanks/message");
            toast.success("Logout sucessfully Done");
            localStorage.removeItem('timercoding');
            localStorage.removeItem('Coding_Participant_Auth_Data');
            localStorage.removeItem('timer');
            localStorage.removeItem('Mcq_Question');
            sessionStorage.clear();
            return;
          }
        }
      }
    } catch (error) {
      SetLoader(false);
    }
  };
  if (Isloader) {
    return <CatrasoAnimationLoading />
  }
  return (
    <>
      <div className="  w-[100%] h-[60px] sticky top-0 z-50 bg-[#132831] flex justify-center items-center">
        <div className="w-[60%] h-[100%] bg-[#132831] flex justify-start items-center">
          <div className="w-[275px] h-[100%] flex justify-center items-center">
            <NavLink to="#" className="flex  pl-36 justify-center items-center">
              <div className=" w-[250px] h-[100%] flex justify-center items-center  max-xl:w-[240px]    max-[800px]:w-[200px]">
                <img
                  src={ClubLogo}
                  // max-[800px]:w-[40px] max-[800px]:h-[34px]
                  className="w-[250px] h-[40px]  max-xl:w-[240px]   max-sm:w-[200px] "
                  alt="Loading.."
                />
              </div>
              {/* <h1 className=" text-[30px] font-[700] text-[#fff] uppercase max-[800px]:text-[25px] max-[480px]:text-[20px]">
              techkshitiz
            </h1> */}
            </NavLink>
          </div>
        </div>
        {props.verify ? (
          <div className="w-[40%] h-[100%]  flex justify-center items-center">
            <div className=" w-[50%] h-[100%]   flex justify-center items-center">
              <button
                type="button"
                onClick={loginlinkpage}
                className=" border-2 p-[10px] w-[120px] h-[80%]  text-[#fff] rounded-[10px] hover:bg-[#fff] font-[700] hover:text-[#000000] transition ease-in-out delay-150"
              >
                End Contest
              </button>
            </div>
          </div>
        ) : (
          <div className="w-[40%] h-[100%]  flex justify-center items-center">
            <div className=" w-[50%] h-[100%]   flex justify-end items-center">
              <button
                type="button"
                // onClick={clickevent}
                className=" w-[45px] h-[45px] flex justify-center items-center rounded-full border-[2px] border-[#deeeff] font-[700] transition ease-in-out delay-150 "
              >
                <img
                  className="w-[100%] h-[100%]  rounded-full"
                  src={`${props.image}`}
                  alt="User"
                />
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        id="profilebox"
        className="  hidden w-[200px] h-[auto] rounded-[5px] border-t-2  border-[#c6365f] bg-[#2a3154] absolute right-[13.4%] top-[60px] z-10"
      >
        <NavLink
          to="/participant/dashboard/profile/"
          onClick={clickevent}
          target="_"
          className="flex justify-start items-center p-[10px] cursor-pointer hover:bg-[#354077] rounded-tl-[5px] rounded-tr-[5px] "
        >
          <span className="material-symbols-outlined text-[25px] mr-[5px] ml-[5px] text-[#fff]">
            person
          </span>
          <span className=" ml-[5px] font-[600] text-[#fff] uppercase w-[130px] truncate">
            {props.datas.name}
          </span>
        </NavLink>

        <div
          className="flex rounded-bl-[5px] rounded-br-[5px]  justify-start items-center p-[10px] cursor-pointer hover:bg-[#354077] "
          onClick={logout}
        >
          <span className="material-symbols-outlined text-[25px] mr-[5px] ml-[5px] text-[#fff]">
            logout
          </span>
          <span className=" ml-[5px] font-[600] text-[#fff]">Logout</span>
        </div>
      </div>
    </>
  );
};

export default Header;
