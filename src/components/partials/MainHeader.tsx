// icons 
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import ClubLogo from '../images/TechKshitiz.png';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function MainHeader() {
  const [getYear, SetYear] = useState([0, 0, 0, 0]);
  const [IsLoading, SetIsLoading] = useState<boolean>(false);
  const [getdata, setdata] = useState<string[]>([]);
  const [IsLogin, SetIsLogin] = useState(false);
  const [MenuBarOn, SetMenuBarOn] = useState(false);
  const verifydata = async () => {
    try {
      SetIsLoading(true);
      const res = await fetch(baseUrl + "/api/v1/student/profile/data", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        if (data.data) {
          if (data.data.participant_Profile_Avtar) {
            const uint8Array = new Uint8Array(
              data.data.participant_Profile_Avtar.data.data
            );
            const blob = new Blob([uint8Array], { type: "image/jpeg" });
            const dataUrl = URL.createObjectURL(blob);
            data.data.participant_Profile_Avtar = dataUrl;
          }
        }
        setdata(data.data);
        SetIsLoading(false);
        SetIsLogin(true);
      } else {
        SetIsLoading(false);
        SetIsLogin(false);
      }
    } catch (error) {
      SetIsLogin(false);
      SetIsLoading(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    verifydata();
    let year = new Date().getUTCFullYear();
    SetYear([year, year - 1, year - 2, year - 3]);
  }, []);
  document.addEventListener("click", (event) => {
    let mainheader = document.getElementById("mainheader");
    let menuButton = document.getElementById("menuButton");
    let isNavbarClicked = Object(event).target.closest(".navBar");
    let isToggleButtonClicked = event.target === menuButton;
    if (mainheader) {
      if (!isNavbarClicked && !isToggleButtonClicked) {
        mainheader.classList.add("max-xl:left-[-300px]");
        if (MenuBarOn) {
          SetMenuBarOn(false);
        }
      }
    }
  });
  const mainheaderslidehandel = () => {
    const mainheader = document.querySelector("#mainheader");
    if (mainheader !== null) {
      if (mainheader.classList.contains("max-xl:left-[-300px]")) {
        mainheader.classList.remove("max-xl:left-[-300px]");
        SetMenuBarOn(!MenuBarOn);
      } else {
        mainheader.classList.add("max-xl:left-[-300px]");
        SetMenuBarOn(!MenuBarOn);
      }
    }
  };
  const mouseovereffect = () => {
    clickevent();
  };
  const mouseouteffect = () => {
    clickevent();
  };
  const mouseovereffectLogin = () => {
    clickLoginevent();
  };
  const mouseouteffectLogin = () => {
    clickLoginevent();
  };
  const clickevent = () => {
    const halloffame = document.querySelector("#halloffame");
    if (halloffame !== null) {
      if (halloffame.classList.contains("hidden")) {
        halloffame.classList.remove("hidden");
      } else {
        halloffame.classList.add("hidden");
      }
    }
  };
  const clickLoginevent = () => {
    const halloffame = document.querySelector("#login");
    if (halloffame !== null) {
      if (halloffame.classList.contains("hidden")) {
        halloffame.classList.remove("hidden");
      } else {
        halloffame.classList.add("hidden");
      }
    }
  };

  const OnClickprofileMenu = () => {
    const profileMenu = document.querySelector("#profileMenu");
    if (profileMenu) {
      if (profileMenu.classList.contains("xl-[1280px]:hidden")) {
        profileMenu.classList.remove("xl-[1280px]:hidden");
      } else {
        profileMenu.classList.add("xl-[1280px]:hidden");
      }
    }
  };

  const settingParticipantDetail = () => {
    navigate("/student/profile/settings/");
    OnClickprofileMenu();
  };
  const LogOutParticipant = async () => {
    const logOutverification = window.confirm("Are you sure to logout ");
    if (logOutverification) {
      try {
        SetIsLoading(true);
        const res = await fetch(baseUrl + "/api/v1/student/profile/logout", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 200) {
          setdata([]);
          SetIsLoading(false);
          SetIsLogin(false);
        } else {
          SetIsLoading(false);
          SetIsLogin(false);
        }
      } catch (error) {
        SetIsLogin(false);
        SetIsLoading(false);
      }
      OnClickprofileMenu();
    } else {
      OnClickprofileMenu();
    }
  };

  return (
    <>
      <div className=" w-[100%] h-[60px] z-40 sticky top-0 bg-[#0c0f1e] border-b-[1px] border-[#2b3148] flex justify-center items-center">
        <div
          className={`w-[24%] select-none h-[auto] flex justify-center items-center max-xl:w-[90%] max-xl-[1280px]:pl-6  max-sm:pl-3 ${
            IsLogin ? "max-[700px]:w-[80%]" : ""
          } max-xl:justify-start`}
        >
          <NavLink
            to="/"
            className="flex  object-contain justify-center items-center"
          >
            <img
              className="h-full w-[120px]"
              src="/images/Techkshitiz_Logo.png"
              alt="TechKshitiz Logo"
            />
          </NavLink>
        </div>
        {IsLogin ? (
          <div className="hidden  select-none w-[70px] pr-[10px] h-[100%] max-xl:flex justify-end items-center  ">
            <div
              onClick={mainheaderslidehandel}
              className={`  w-[45px] h-[45px] cursor-pointer    rounded-[50%] border-[2px] border-[#2c4056] flex justify-center items-center`}
            >
              <img
                className="w-[45px] h-[45px] rounded-[50%] "
                src={
                  Object(getdata).participant_Profile_Avtar
                    ? Object(getdata).participant_Profile_Avtar
                    : Object(getdata).participant_Avtar
                }
                alt="Avtar"
              />
              <span
                id="menuButton"
                className=" material-symbols-outlined text-[#ffffff] font-[800] rounded-[10px] absolute max-[480px]:text-[20px] top-[37px] text-[25px] cursor-pointer"
              >
                {MenuBarOn ? "close" : "menu"}
              </span>
            </div>
          </div>
        ) : (
          <div className="hidden  select-none w-[10%]  pr-[10px] h-[100%] max-xl:flex justify-end items-center  ">
            <span
              id="menuButton"
              onClick={mainheaderslidehandel}
              className=" material-symbols-outlined text-[#ffffff] font-[800] rounded-[10px]   max-[480px]:text-[30px]   text-[35px] cursor-pointer"
            >
              {MenuBarOn ? "close" : "menu"}
            </span>
          </div>
        )}
        <nav
          id="mainheader"
          style={{ transition: "all 1s" }}
          className="w-[76%] navBar h-[100%] flex transition ease-in-out delay-200 justify-center max-xl:h-[100%] max-xl:w-[300px] max-[480px]:w-[250px]     max-xl:bg-[#0c0f1e]     max-xl:fixed top-[60px] left-0   max-xl:left-[-300px] items-center max-[480px]:justify-end overflow-auto max-xl:pl-[20px]   "
        >
          <ul className="w-[100%] h-[100%] max-[480px]:ml-[20px]   flex justify-center items-center ml:gap-6 mll:gap-8 gap-4 max-xl:gap-4  max-xl:overflow-y-auto  max-xl:w-[250px]  max-[480px]:w-[210px]  max-xl:block">
            <NavLink
              onClick={mainheaderslidehandel}
              to={`/government-engineering-college-siwan/events/bgmi/live-stream`}
              className="text-[#fff] text-center max-xl:text-start text-[14px] transition-all ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6 max-xl:mt-[24px] ">LIVE STREAM</li>
            </NavLink>
            <NavLink
              onClick={mainheaderslidehandel}
              to="/government-engineering-college-siwan/total/events/list"
              className="text-[#fff] text-center  text-[14px] transition-all max-xl:text-start ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">EVENT</li>
            </NavLink>
            <NavLink
              onClick={mainheaderslidehandel}
              to="/government-engineering-college-siwan/total/clubs/list"
              className="text-[#fff]  text-center text-[14px] transition-all max-xl:text-start ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6"> CLUB</li>
            </NavLink>
            <NavLink
              to="/government-engineering-college-siwan/contest/lists"
              className="text-[#fff] text-center text-[14px] transition-all max-xl:text-start ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">CONTEST</li>
            </NavLink>
            <NavLink
              to="/government-engineering-college-siwan/certificate/"
              className="text-[#fff] text-center text-[14px] transition-all  max-xl:text-start ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">CERTIFICATE</li>
            </NavLink>
            <div
              onMouseOut={mouseouteffect}
              onMouseOver={mouseovereffect}
              className="text-[#fff] cursor-pointer  max-xl:w-[80%] max-xl:mt-[20px]     max-xl:flex justify-center max-xl:justify-start items-center text-center text-[14px]  transition-all ease-in-out delay-200 font-[600] h-[auto]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">HALL OF FAME</li>
              <div
                id="halloffame"
                className="hidden w-[150px] h-[auto] pb-[2px] pt-[5px] rounded-[5px]   max-xl:top-[40%] max-xl:right-[20%]   border-[#182739] bg-[#0a121e] border-[1px] absolute right-[34.4%] top-[43px] z-50"
              >
                {getYear.map((element, index) => (
                  <div key={index} className=" p-[1px] pl-0 pr-0 text-[#fff] ">
                    <NavLink
                      to={`/government-engineering-college-siwan/hall-of-fame?year=${element}`}
                      className=" hover:text-[#f3ff46]  text-[16px]  flex justify-center items-center h-[35px] hover:bg-[#191e36e1] w-[100%]"
                    >
                      {element}
                    </NavLink>
                  </div>
                ))}
                <div className=" text-[#fff] p-[6px]  pl-0 pr-0 flex justify-center items-center  ">
                  <NavLink
                    to="/government-engineering-college-siwan/hall-of-fame/?type=hall-of-fame&year=all"
                    className=" hover:text-[#f3ff46]  flex justify-center items-center gap-2 h-[35px] text-[16px] hover:bg-[#191e36e1] w-[100%]"
                  >
                    More Year{" "}
                    <span className="material-symbols-outlined text-[20px] ">
                      read_more
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              onClick={mainheaderslidehandel}
              to="/government-engineering-college-siwan/event/gallery/"
              className="text-[#fff] text-[14px]  max-xl:text-start    text-center transition-all ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">EVENTS GALLERY</li>
            </NavLink>
            <NavLink
              onClick={mainheaderslidehandel}
              to="/government-engineering-college-siwan/community"
              className="text-[#fff] text-center max-xl:text-start text-[14px] transition-all ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">COMMUNITY</li>
            </NavLink>
            <NavLink
              onClick={mainheaderslidehandel}
              to="/government-engineering-college-siwan/campus/ambassador/internship/"
              className="text-[#fff] text-center max-xl:text-start text-[14px] transition-all ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6">CA</li>
            </NavLink>

            <NavLink
              onClick={mainheaderslidehandel}
              to="/government-engineering-college-siwan/technical-club/contacts"
              className="text-[#fff] text-center max-xl:text-start text-[14px] transition-all ease-in-out delay-200 font-[600]  hover:text-[red]"
            >
              <li className="max-xl:mb-6"> CONTACT US</li>
            </NavLink>

            {IsLogin ? (
              <div className="text-[#fff] max-xl:w-[100%] max-xl:flex max-xl:mt-[20px] justify-center max-xl:justify-start max-xl:items-start items-center  text-center text-[14px]   transition-all ease-in-out delay-200 font-[600] h-[auto] max-xl:h-[250px] pr-[10px] ">
                <div
                  onClick={OnClickprofileMenu}
                  className="w-[45px] max-xl:hidden cursor-pointer  h-[45px] rounded-[50%] border-[2px] border-[#2c4056] flex justify-center items-center"
                >
                  <img
                    className="w-[45px] h-[45px] rounded-[50%] "
                    src={
                      Object(getdata).participant_Profile_Avtar
                        ? Object(getdata).participant_Profile_Avtar
                        : Object(getdata).participant_Avtar
                    }
                    alt="Avtar"
                  />
                </div>
                <div
                  id="profileMenu"
                  className="xl-[1280px]:hidden  bg-[#0d0f1e] max-xl:pl-[10px] xl-[1280px]:absolute right-[30px] top-[60px] max-xl:w-[240px] w-[300px] h-[auto] rounded-[5px] border border-[#1a2941] p-[10px]  pl-[30px]"
                >
                  <NavLink
                    to={
                      Object(getdata).participant_Roll === 0
                        ? "/intra/college/student/profile/"
                        : Object(getdata).participant_Roll === 2
                        ? "/professor/profile/"
                        : Object(getdata).participant_Roll === 3
                        ? "/club/manager/profile"
                        : Object(getdata).participant_Roll === 3
                        ? "/club/manager/profile"
                        : Object(getdata).participant_Roll === 4
                        ? "/campus/ambassador/profile"
                        : "/student/profile/"
                    }
                    className="w-[100%] cursor-pointer h-[50px] flex gap-3 justify-start items-center hover:text-[#c84c4c] text-[#4f6b8f] "
                  >
                    <img
                      className="w-[40px] h-[40px] rounded-[50%] "
                      src={
                        Object(getdata).participant_Profile_Avtar
                          ? Object(getdata).participant_Profile_Avtar
                          : Object(getdata).participant_Avtar
                      }
                      alt="Avtar"
                    />
                    <div className="">
                      <h4 className="text-[#fff] uppercase text-start text-[16px]    ">
                        {Object(getdata).participant_Name.substring(0, 12)}
                      </h4>
                      <p className=" underline  text-[12px] text-start  font-[500] ">
                        {Object(getdata).techk_Shitiz_Id}
                      </p>
                    </div>
                  </NavLink>
                  <div
                    onClick={settingParticipantDetail}
                    className=" hover:text-[#fff] text-[#e2e3e4] flex cursor-pointer justify-start items-center gap-3 w-[100%] h-[50px] pl-[10px]"
                  >
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                  </div>
                  <div
                    onClick={LogOutParticipant}
                    className="hover:text-[#fff] text-[#e2e3e4] flex cursor-pointer justify-start items-center gap-3 w-[100%] h-[50px] pl-[10px]"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onMouseOut={mouseouteffectLogin}
                onMouseOver={mouseovereffectLogin}
                className="text-[#fff] cursor-pointer max-xl:w-[80%] max-xl:flex max-xl:mt-[20px] justify-center max-xl:justify-start items-center  text-center text-[14px]   transition-all ease-in-out delay-200 font-[600] h-[auto]   hover:text-[red]"
              >
                <li className=" text-center  uppercase  h-[30px] flex items-center  max-xl:hidden ">
                  Login
                </li>
                <div className="xl:hidden text-[yellow] w-[200px]   h-[auto] pb-[10px]">
                  <NavLink
                    onClick={mainheaderslidehandel}
                    to="/government-engineering-college-siwan/student/login"
                    className=" hover:text-[#f3ff46]  text-[16px]  flex justify-start items-center h-[35px] mb-3  w-[100%]"
                  >
                    Student Login{" "}
                  </NavLink>
                  <NavLink
                    onClick={mainheaderslidehandel}
                    to="/government-engineering-college-siwan/professor/login"
                    className=" hover:text-[#f3ff46]  text-[16px]  flex justify-start items-center h-[35px]  w-[100%]"
                  >
                    Professor Login
                  </NavLink>
                </div>
                <div
                  id="login"
                  className="hidden w-[200px] z-50 h-[auto] pb-[10px] pt-[10px] rounded-[5px]   max-xl:hidden  max-[800px]:right-[10%]   border-[#182739] bg-[#0a121e] border-[1px] absolute right-[1%] top-[43px]"
                >
                  <div className=" p-[1px] pl-0 pr-0 text-[#fff] ">
                    <NavLink
                      to="/government-engineering-college-siwan/student/login"
                      className=" hover:text-[#f3ff46]  text-[16px]  flex justify-center items-center h-[35px] hover:bg-[#191e36e1] w-[100%]"
                    >
                      Student Login{" "}
                    </NavLink>
                  </div>
                  <div className=" p-[1px] pl-0 pr-0 text-[#ffff] ">
                    <NavLink
                      to="/government-engineering-college-siwan/professor/login"
                      className=" hover:text-[#f3ff46]  text-[16px]  flex justify-center items-center h-[35px] hover:bg-[#191e36e1] w-[100%]"
                    >
                      Professor Login
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default MainHeader;
