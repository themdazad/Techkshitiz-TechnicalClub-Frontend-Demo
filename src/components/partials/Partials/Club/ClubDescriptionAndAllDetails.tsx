import React, { useEffect, useState } from "react";
import MainHeader from "../../MainHeader.tsx";
import MainFooter from "../../MainFooter.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import CatrasoAnimationLoading from "../../../Loader/CatrasoAnimationLoading.tsx";
import Slide from "../../../Loader/Slide.tsx";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function ClubDescriptionAndAllDetails() {
  const Clubdata = useLocation().state;
  const navigate = useNavigate();
  const [image_Url, SetImage_Url] = useState(String);
  const [GetClubData, SetClubData] = useState<string[]>([]);
  const [GetClubFacuiltyData, SetClubFacuiltyData] = useState([]);
  const [GetClubStudentData, SetClubStudentData] = useState([]);
  const [GetClubMemberData, SetClubMemberData] = useState([]);
  const [IsLoader, SetLoader] = useState(false);
  const [FacuiltyInchargeLoader, SetFacuiltyInchargeLoader] = useState(false);
  const [StudentInchargeLoader, SetStudentInchargeLoader] = useState(false);
  const [memberLoader, SetmemberLoader] = useState(false);
  const Member = async (clubId) => {
    try {
      SetmemberLoader(true);
      const res = await fetch(`${baseUrl}/api/club/member/data/${clubId}`, {
        method: "GET",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.data) {
        if (data.data[0].club_incharge_avatar) {
          data.data.forEach((element, index) => {
            const uint8Array = new Uint8Array(element.club_incharge_avatar.data.data);
            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
            const dataUrl = URL.createObjectURL(blob);
            Object(data.data[index]).club_incharge_avatar = dataUrl
          })
        }
        SetClubMemberData(data.data);
      } else {
        SetClubMemberData([]);

      }
      SetmemberLoader(false);
    } catch (error) {
      SetmemberLoader(false);
    }
  }
  const StudentIncharge = async (clubId) => {
    try {
      SetStudentInchargeLoader(true);
      const res = await fetch(`${baseUrl}/api/club/student/incharge/data/${clubId}`, {
        method: "GET",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.data) {
        if (data.data[0].club_incharge_avatar) {
          data.data.forEach((element, index) => {
            const uint8Array = new Uint8Array(element.club_incharge_avatar.data.data);
            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
            const dataUrl = URL.createObjectURL(blob);
            Object(data.data[index]).club_incharge_avatar = dataUrl
          })
        }
        SetClubStudentData(data.data);
      } else {

        SetClubStudentData([]);
      }
      SetStudentInchargeLoader(false);
    } catch (error) {
      SetStudentInchargeLoader(false);
    }
  }
  const FacuiltyIncharge = async (clubId) => {
    try {
      SetFacuiltyInchargeLoader(true);
      const res = await fetch(`${baseUrl}/api/club/facuilty/incharge/data/${clubId}`, {
        method: "GET",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.data) {
        if (data.data[0].club_incharge_avatar) {
          data.data.forEach((element, index) => {
            const uint8Array = new Uint8Array(element.club_incharge_avatar.data.data);
            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
            const dataUrl = URL.createObjectURL(blob);
            Object(data.data[index]).club_incharge_avatar = dataUrl
          })
        }
        SetClubFacuiltyData(data.data);
      }
      SetFacuiltyInchargeLoader(false);
    } catch (error) {
      SetFacuiltyInchargeLoader(false);
    }
  }
  const Datafetchurl = async () => {
    try {
      SetLoader(true);
      const res = await fetch(baseUrl + "/api/club/created/data/", {
        method: "GET",
        credentials: 'include'
      });
      const data = await res.json();
      if (data) {
        SetClubData([]);
        data.forEach((element) => {
          if (element.clubname !== Clubdata.clubname) {
            SetClubData((current) => [...current, element]);
          }
        });
      }
      SetLoader(false);
    } catch (error) {
      SetLoader(false);
    }
  };

  useEffect(() => {
    FacuiltyIncharge(Clubdata ? Clubdata.club_Id : "");
    StudentIncharge(Clubdata ? Clubdata.club_Id : "");
    Member(Clubdata ? Clubdata.club_Id : "");
    window.addEventListener("online", () => {
      return <h1>online</h1>;
    });
    Datafetchurl();
    if (Clubdata) {
      if (Clubdata.club_image.data) {
        const uint8Array = new Uint8Array(Clubdata.club_image.data.data);
        const blob = new Blob([uint8Array], { type: "image/png" });
        const dataUrl = URL.createObjectURL(blob);
        SetImage_Url(dataUrl);
      }
    }
  }, [Clubdata]);
  if (IsLoader) {
    return <CatrasoAnimationLoading />;
  }
  const dataUrlSend = (element) => {
    SetClubMemberData([]);
    SetClubStudentData([]);
    SetClubFacuiltyData([]);
    navigate(`/details/${element.clubname}/club/${element._id}`, {
      state: element,
    });
  }

  const FacuiltyProfileView = (data) => {
    // navigate(`/profile/v/${data.Club_Incharge_Profile_Id}`, { state: data });
  }
  const StudentInchargeProfileView = (data) => {
    // navigate(`/profile/v/${data.Club_Incharge_Profile_Id}`, { state: data });
  }
  const MemberProfileView = (data) => {
    // navigate(`/profile/v/${data.Club_Incharge_Profile_Id}`, { state: data });
  }

  return (
    <>
      <MainHeader />
      <div className="bg-[#091522] w-[100%] h-[100%] p-[30px] pb-[20px] pt-[10px] flex justify-center items-center pl-[60px] max-sm:pl-8  max-sm-m:pl-5">
        <div className="w-[100%] space-y-4  bg-[#091522] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-[4px] mt-[10px] h-[auto]">
          <div className="pt-[20px]">
            <h1 className="uppercase text-[#ffdd04] text-[30px]  font-[700] max-sm-m:text-[20px]">
              {Clubdata ? Clubdata.clubname : ""} club
            </h1>
          </div>
          <div className=" p-[20px] mr-4  w-[100%] h-[450px] max-sm:h-[300px] border-[1px] rounded-[5px] border-[#152333] flex justify-center items-center">
            <img
              src={image_Url}
              className="text-[#fff] w-[100%] blur-[2px] h-[100%] rounded-[5px]"
              alt={Clubdata ? Clubdata.clubname : "Lo"}
            />
          </div>

          <div className="w-[100%] h-[auto] space-y-2 ">
            <h1 className="uppercase text-[#ffdd04] text-[25px] max-sm-m:text-[20px] font-[700]">
              Description
            </h1>
            <div className=" pl-[20px]">
              <p className="text-[#ebebebea] text-wrap text-[14px] max-sm-m:text-[13px] font-[300]">
                {Clubdata ? Clubdata.clubdescription : ""}
              </p>
            </div>
          </div>

          <div className="w-[100%] h-[auto] space-y-2 ">
            <h1 className="uppercase text-[#ffdd04] text-[25px] max-sm-m:text-[20px]  font-[700]">
              History
            </h1>
            <div className=" pl-[20px] text-[#ebebebea] text-wrap text-[16px] max-sm-m:text-[14px] font-[300]">
              <li className="">{Clubdata ? Clubdata.createddate : ""}</li>
            </div>
          </div>

          <div className="w-[100%] h-[auto] space-y-2 mt-[5px]  select-none ">
            <h1 className="uppercase text-[#ffdd04] text-[25px]  max-sm-m:text-[20px] font-[700]">
              Professor Incharge
            </h1>
            <div className="w-[100%] h-[auto] p-[20px]  gap-8 flex flex-wrap  max-lg:justify-center items-center justify-start">
              {
                FacuiltyInchargeLoader ? (
                  <Slide />
                ) : (
                  GetClubFacuiltyData.length ? (
                    GetClubFacuiltyData.map((data, index) => (

                      <div key={index} onClick={() => { FacuiltyProfileView(data) }} className="w-[200px] h-[auto] border-[1px] border-[#14273b] rounded-[6px] cursor-default transition ease-in-out delay-150 hover:shadow-[0_0px_15px_rgb(250,250,250,0.13)]">
                        <div className="w-[100%] p-[10px] h-[60%] flex  justify-center ">
                          <div className="w-[120px] h-[120px] p-[10px] mt-2 border-[1px] bg-[#fff] border-[#143239] overflow-hidden rounded-[50%]">
                            <img
                              src={Object(data).club_incharge_avatar}
                              className="w-[100%] h-[100%]  scale-125"
                              alt={"Loading..."}
                            />
                          </div>
                        </div>
                        <div className="w-[100%] p-[10px] pb-[20px] h-[40%]  space-y-2">
                          <h3 className="text-[#f3f3f3] capitalize truncate text-center text-[15px]">
                            <span className=" ml-[4px]">{Object(data).club_incharge_name}</span>
                          </h3>
                          <h3 className="text-[#ffc629] capitalize truncate text-center text-[15px]">
                            <span className=" ml-[4px]">{Object(data).club_incharge_role} </span>
                          </h3>
                          <h4 className="text-[#e6e6e6] capitalize truncate text-center text-[13px]">
                            {Object(data).club_incharge_department}
                          </h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-[100%] h-[250px] flex items-center justify-center">
                      <h1 className=' uppercase text-[20px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[18px] '>No More Professor Incharge🌻🌻</h1>

                    </div>
                  ))
              }
            </div>
          </div>

          <div className="w-[100%] h-[auto] space-y-2  select-none ">
            <h1 className="uppercase text-[#ffdd04] text-[25px] max-sm-m:text-[20px] font-[700]">
              Student Incharge
            </h1>
            <div className="w-[100%] h-[auto] p-[20px]  gap-8 flex flex-wrap items-center justify-start max-lg:justify-center">


              {
                StudentInchargeLoader ? (
                  <Slide />
                ) : (
                  GetClubStudentData.length ? (
                    GetClubStudentData.map((data, index) => (

                      <div key={index} onClick={() => { StudentInchargeProfileView(data) }} className="w-[200px] h-[auto] border-[1px] border-[#14273b] rounded-[6px] cursor-default transition ease-in-out delay-150 hover:shadow-[0_0px_15px_rgb(250,250,250,0.13)]">
                        <div className="w-[100%] p-[10px] h-[60%] flex  justify-center ">
                          <div className="w-[120px] h-[120px] p-[10px] mt-2 border-[1px] bg-[#fff] border-[#143239] overflow-hidden rounded-[50%]">
                            <img
                              src={Object(data).club_incharge_avatar}
                              className="w-[100%] h-[100%]  scale-125"
                              alt={"Loading..."}
                            />
                          </div>
                        </div>
                        <div className="w-[100%] p-[10px] pb-[20px] h-[40%]  space-y-2">
                          <h3 className="text-[#f3f3f3] capitalize truncate text-center text-[15px]">
                            <span className=" ml-[4px]">{Object(data).club_incharge_name}</span>
                          </h3>
                          <h3 className="text-[#ffc629] capitalize truncate text-center text-[15px]">
                            <span className=" ml-[4px]">{Object(data).club_incharge_role} </span>
                          </h3>
                          <h4 className="text-[#e6e6e6] capitalize truncate text-center text-[13px]">
                            {Object(data).club_incharge_department}
                          </h4>
                        </div>
                      </div>

                    ))) : (
                    <div className="w-[100%] h-[250px] flex items-center justify-center">
                      <h1 className=' uppercase text-[20px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[18px] '>No More Student Incharge🌻🌻</h1>

                    </div>
                  )
                )
              }
            </div>
          </div>


          <div className="w-[100%] h-[auto] space-y-2  select-none">
            <h1 className="uppercase text-[#ffdd04] text-[25px] max-sm-m:text-[20px]  font-[700]">
              Member
            </h1>
            <div className="w-[100%] h-[auto] p-[20px]  gap-8 flex flex-wrap items-center justify-start max-lg:justify-center">
              {
                memberLoader ? (
                  <Slide />
                ) : (

                  GetClubMemberData.length ? (
                    GetClubMemberData.map((data, index) => (
                      <div key={index} onClick={() => { MemberProfileView(data) }} className="w-[200px] h-[auto] border-[1px] border-[#14273b] rounded-[6px] cursor-default transition ease-in-out delay-150 hover:shadow-[0_0px_15px_rgb(250,250,250,0.13)]">
                        <div className="w-[100%] p-[10px] h-[60%] flex  justify-center ">
                          <div className="w-[120px] h-[120px] p-[10px] mt-2 border-[1px] bg-[#fff] border-[#143239] overflow-hidden rounded-[50%]">
                            <img
                              src={Object(data).club_incharge_avatar}
                              className="w-[100%] h-[100%]  scale-125"
                              alt={"Loading..."}
                            />
                          </div>
                        </div>
                        <div className="w-[100%] p-[10px] pb-[20px] h-[40%]  space-y-2">
                          <h3 className="text-[#f3f3f3] capitalize truncate text-center text-[15px]">
                            <span className=" ml-[4px]">{Object(data).club_incharge_name}</span>
                          </h3>
                          <h3 className="text-[#ffc629] capitalize truncate text-center text-[15px]">
                            <span className=" ml-[4px]">{Object(data).club_incharge_role} </span>
                          </h3>
                          <h4 className="text-[#e6e6e6] capitalize truncate text-center text-[13px]">
                            {Object(data).club_incharge_department}
                          </h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-[100%] h-[250px] flex items-center justify-center">
                      <h1 className=' uppercase text-[20px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[18px] '>No More Member Incharge🌻🌻</h1>
                    </div>
                  )
                )
              }
            </div>
          </div>

          {
            GetClubData.length > 1 ? (
              <div className="w-[100%] h-[auto] space-y-2 ">
                <h1 className="uppercase text-[#ffdd04] text-[25px]  font-[700]">
                  suggestion club
                </h1>
                <div className="w-[100%] h-[auto] p-[20px]  gap-8  overflow-auto overflow-y-hidden">
                  {GetClubData.map((element, index) => (
                    <>
                      <div
                        onClick={() => {
                          dataUrlSend(element);
                        }}
                        key={index}
                        className="w-[200px] m-[7px] float-left h-[auto] active:scale-90 border-[1px] border-[#14273b] rounded-[6px] cursor-pointer transition ease-in-out  delay-75 hover:shadow-[0_0px_15px_rgb(250,250,250,0.13)]"
                      >
                        <div className="w-[100%] h-[100%]  flex justify-center items-center">
                          <h3 className="text-[#f3f3f3]  p-[10px]  capitalize text-center text-[15px]">
                            <span className=" ml-[4px]">
                              {Object(element).clubname} club
                            </span>
                          </h3>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>

            ) : ("")
          }
        </div>
      </div>
      <MainFooter />
    </>
  );
}

export default ClubDescriptionAndAllDetails;
