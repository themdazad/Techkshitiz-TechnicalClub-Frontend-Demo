import React from "react";
import { NavLink } from "react-router-dom";
const StudentProfileHeader = ({ SetSideBarOpenClose, SideBarOpenClose }) => {
  return (
    <>
      <div className=" sideNavBar w-[100%] h-[60px]   sticky top-0 bg-[#0d1526] border-b-[1px] border-[#203450] flex justify-center items-center">
        <div
          className={`w-[50px]  max-ml:hidden  h-full flex justify-center items-center`}
        >
          <span
            id="menuButton"
            onClick={() => {
              SetSideBarOpenClose(!SideBarOpenClose);
            }}
            className={`${
              !SideBarOpenClose ? "  ml:hidden" : ""
            } material-symbols-outlined cursor-pointer text-[36px]  max-ml:hidden`}
          >
            apps
          </span>
          <span
            id="menuButton"
            onClick={() => {
              SetSideBarOpenClose(!SideBarOpenClose);
            }}
            className={`${
              SideBarOpenClose ? "hidden" : ""
            } material-symbols-outlined cursor-pointer text-[36px]  max-ml:hidden`}
          >
            close
          </span>
        </div>
        <div
          className={`w-[300px]  h-[auto] flex justify-start pl-3 max-lg:w-[250px] items-center `}
        >
          <NavLink
            to="/"
            className="flex  object-contain justify-center items-center"
          >
            <img
              className="h-full w-[100px] lg:w-[120px]"
              src="/images/Techkshitiz_Logo.png"
              alt="TechKshitiz Logo"
            />
          </NavLink>
        </div>
        <div
          style={{ transition: "all 1s" }}
          className={`${
            SideBarOpenClose ? "  w-[74%]" : " w-[34%] max-ml:w-[74%]"
          }  z-50  h-[auto] flex justify-end items-center pr-4 max-sm-m:pr-2`}
        >
          <span
            id="menuButton"
            onClick={() => {
              SetSideBarOpenClose(!SideBarOpenClose);
            }}
            className={`${
              !SideBarOpenClose ? "hidden" : ""
            } material-symbols-outlined cursor-pointer text-[36px]  z-50 ml:hidden`}
          >
            apps
          </span>
          <span
            id="menuButton"
            onClick={() => {
              SetSideBarOpenClose(!SideBarOpenClose);
            }}
            className={`${
              SideBarOpenClose ? "hidden" : ""
            } material-symbols-outlined cursor-pointer text-[36px]  z-50 ml:hidden`}
          >
            close
          </span>
        </div>
      </div>
    </>
  );
};

export default StudentProfileHeader;
