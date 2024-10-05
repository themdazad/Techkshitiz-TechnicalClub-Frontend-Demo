import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CatrasoAnimationLoading from "../../Loader/CatrasoAnimationLoading.tsx";
import { log } from "console";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function StudentSideNavBar({ getdata, SideBarOpenClose, SetSideBarOpenClose }) {
  const [IsLoading, SetIsLoading] = useState(false);
  const navigate = useNavigate();
  const LogOutParticipant = async () => {
    const logOutverification = window.confirm("Are you sure to logout ");
    const windowsWidth = window.innerWidth;
    if (logOutverification) {
      try {
        SetIsLoading(true);
        const res = await fetch(baseUrl + "/api/v1/student/profile/logout", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 200) {
          navigate("/");
          SetIsLoading(false);
          if (Number(windowsWidth) < 1024) {
            SetSideBarOpenClose(!SideBarOpenClose);
          }
        } else {
          SetIsLoading(false);
        }
      } catch (error) {
        SetIsLoading(false);
      }
    } else {
      if (Number(windowsWidth) < 1024) {
        SetSideBarOpenClose(!SideBarOpenClose);
      }
    }
  };
  if (IsLoading) {
    return <CatrasoAnimationLoading />;
  }
  const ClickNavBarMenu = () => {
    const windowsWidth = window.innerWidth;
    if (Number(windowsWidth) < 1024) {
      SetSideBarOpenClose(!SideBarOpenClose);
    }
  };
  return (
    <>
      <section
        id="sideNavBar"
        style={{ transition: "all 1s" }}
        className={`${
          SideBarOpenClose
            ? "left-[-300px]  max-sm-m:left-[-250px]"
            : "left-[0px]"
        }  flex w-[300px] max-sm-m:w-[240px] absolute h-[100vh] border-r-2  justify-center items-start overflow-auto bg-[#0d1526] z-40 border-[#203450] max-sm-m:h-[90vh] max-sm-m:mt-[58px] `}
      >
        <div className="w-[100%] h-[100%] ">
          <div className="h-[90px] w-[100%] border-b-[1px] max-sm-m:h-[60px] max-sm-m:pl-2 max-sm-m:pr-2 border-[#203450] pl-[20px] pr-[20px] flex justify-start items-center">
            <NavLink
              to=""
              onClick={ClickNavBarMenu}
              className="w-[100%] h-[50px] flex justify-start items-center gap-2 cursor-pointer"
            >
              <div className="w-[40px] h-[40px] rounded-[50%] flex justify-center items-center border-[2px]">
                <img
                  className="w-[40px] h-[40px] rounded-[50%] "
                  src={
                    Object(getdata).participant_Profile_Avtar
                      ? Object(getdata).participant_Profile_Avtar
                      : Object(getdata).participant_Avtar
                  }
                  alt="Avtar"
                />
              </div>
              <div>
                <h1 className="font-[600] w-[150px] max-sm-m:w-[100px] h-[20px] truncate text-[16px] text-[#fffff7] capitalize max-lg:text-[14px]">
                  {Object(getdata).participant_Name}
                </h1>
                <p className="font-[400]  max-sm-m:text-[12px] text-[#adadad] w-[200px] max-sm-m:w-[150px] h-[20px] truncate  ">
                  {Object(getdata).participant_Email}
                </p>
              </div>
            </NavLink>
          </div>

          <div className="w-[100%] h-[auto] p-[20px] border-b-2 border-dashed border-[#1c2f48] max-sm-m:p-2">
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/add-members"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                person_add
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Add Members
              </span>
              <span className="NewButton text-[12px] font-[400] text-[#d63500]  border-radius: 22px; border-[1px] border-[D63500] bg-[#FBEBEA] flex h-[14px] p-[8px]  items-center test-[10px] rounded-[8px] relative   overflow-hidden left-[60px]">
                {" "}
                New
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/registrations/applications/"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px] ">
                person_add
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Registrations/Applications
              </span>
            </NavLink>

            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/referrals"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                supervisor_account
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Referrals
              </span>
            </NavLink>

            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/techKshitiz/awards"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                rewarded_ads
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                TechKshitiz Awards
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/watchlist"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                favorite
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Watchlist
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/recently/viewed"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                history
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Recently Viewed
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/mentor/sessions"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                mood
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Mentor Sessions
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/certificates/"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                book
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Certificates
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/coupons/rewards"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <i className="fa-regular fa-ticket-simple text-[18px]"></i>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Coupons and Rewards
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to="/student/profile/settings/"
              style={{ transition: "all 1s" }}
              className="w-[100%] h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                settings
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Settings
              </span>
            </NavLink>
          </div>
          <div className="w-[100%] h-[auto] p-[20px] pt-[10px] border-b-2 border-dashed border-[#1c2f48] max-sm-m:p-2">
            <span className="font-[400] text-[13px] text-[#fff] ">
              Organizers
            </span>
            <NavLink
              onClick={ClickNavBarMenu}
              to=""
              style={{ transition: "all 1s" }}
              className="w-[100%] mt-3 h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                folder_managed
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Manage Listings
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to=""
              style={{ transition: "all 1s" }}
              className="w-[100%]  h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                link_off
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                My Festivals
              </span>
            </NavLink>
            <NavLink
              onClick={ClickNavBarMenu}
              to=""
              style={{ transition: "all 1s" }}
              className="w-[100%]  h-[40px] flex justify-start gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer pl-[15px] mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                receipt_long
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">
                Plans & Billing
              </span>
            </NavLink>
          </div>
          <div className="w-[100%] h-[auto] p-[20px] pt-[10px]  max-sm-m:p-2">
            <div
              onClick={LogOutParticipant}
              style={{ transition: "all 1s" }}
              className="w-[100%] mt-3 h-[40px] flex justify-center gap-2 text-[#fff] items-center rounded-[10px] hover:bg-[#1b2e3d]  bg-[#10192d] border-[1px] border-[#1c2b4c] cursor-pointer  mb-2"
            >
              <span className="material-symbols-outlined text-[22px] max-sm-m:text-[18px]">
                logout
              </span>
              <span className="  max-sm-m:text-[12px] font-[400]">Logout</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudentSideNavBar;
