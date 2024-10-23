import React, { useEffect, useState } from "react";
import StudentSideNavBar from "./StudentSideNavBar.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import SchawnnajAnimatedLoader from "../../Loader/SchawnnajAnimatedLoader.tsx";
import StudentProfileHeader from "../../partials/StudentProfileHeader.tsx";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function StudentPaneHome() {
  const [IsLoading, SetIsLoading] = useState<boolean>(true);
  const [getdata, setdata] = useState<string[]>([]);
  const [SideBarOpenClose, SetSideBarOpenClose] = useState(true);
  const [windowsWidth, SetwindowsWidth] = useState<number>(window.innerWidth);

  const navigate = useNavigate();
  const verifydata = async () => {
    try {
      SetIsLoading(true);
      const res = await fetch(baseUrl + "/api/v1/student/profile/data", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 200) {
        const data = await res.json();
        if (
          Number(data?.data?.participant_Roll) === 1 ||
          Number(data?.data?.participant_Roll) === 0
        ) {
          if (data.data) {
            if (data.data.participant_Profile_Avtar) {
              const uint8Array = new Uint8Array(
                data.data.participant_Profile_Avtar.data.data
              );
              const blob = new Blob([uint8Array], { type: "image/jpeg" });
              const dataUrl = URL.createObjectURL(blob);
              data.data.participant_Profile_Avtar = dataUrl;
            }
            localStorage.setItem("userAuth", JSON.stringify(data.data));
            setdata(data.data);
          }
          SetIsLoading(false);
        } else {
          navigate("/");
        }
      } else {
        navigate("/government-engineering-college-siwan/student/login");
        SetIsLoading(false);
      }
    } catch (error) {
      navigate("/government-engineering-college-siwan/student/login");
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    verifydata();
  }, []);
  document.addEventListener("click", (e) => {
    const menuButton = document.getElementById("menuButton");
    const menuElement = Object(e).target.closest(".sideNavBar");
    const isToggleButtonClicked = e.target === menuButton;
    if (Number(windowsWidth) < 1024) {
      if (!isToggleButtonClicked && !menuElement) {
        SetSideBarOpenClose(true);
      }
    }
  });
  useEffect(() => {
    SetwindowsWidth(window.innerWidth);
    if (Number(windowsWidth) > 1024) {
      SetSideBarOpenClose(false);
    } else {
      SetSideBarOpenClose(true);
    }
  }, [windowsWidth]);
  if (IsLoading) {
    return <SchawnnajAnimatedLoader />;
  }
  return (
    <>
      <section
        style={{ transition: "all 1s" }}
        className={`w-[100%] h-[100vh] bg-[#0d1526] overflow-auto flex   ${
          SideBarOpenClose ? " justify-start" : " justify-end"
        } `}
      >
        <StudentSideNavBar
          SetSideBarOpenClose={SetSideBarOpenClose}
          SideBarOpenClose={SideBarOpenClose}
          getdata={getdata}
        />
        <section
          style={{ transition: "all 1s" }}
          className={` w-full h-[100vh] flex flex-col justify-start ${
            SideBarOpenClose ? " items-center" : " items-end"
          } max-lg:w-full capitalize text-[20px] text-[#e0fcff] `}
        >
          <StudentProfileHeader
            SetSideBarOpenClose={SetSideBarOpenClose}
            SideBarOpenClose={SideBarOpenClose}
          />
          <div
            style={{ transition: "all 1s" }}
            className={`${
              SideBarOpenClose ? " w-[100%]" : " w-[80%]"
            } p-[20px] justify-center items-center max-lg:w-full h-full capitalize text-[20px] text-center max-sm-m:text-[14px] text-[#e0fcff] max-sm-m:p-1`}
          >
            <Outlet />
          </div>
        </section>
      </section>
    </>
  );
}

export default StudentPaneHome;
