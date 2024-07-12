import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slide1 from "../images/slide1.jpeg";
import slide2 from "../images/slide2.jpeg";
import slide4 from "../images/slide4.jpeg";
import slide5 from "../images/slide5.jpeg";
import slide6 from "../images/slide6.jpeg";
import slide7 from "../images/slide7.jpeg";
import slide8 from "../images/slide8.jpeg";
import slide9 from "../images/slide9.jpeg";
import CountDownEvent from "./CountDownEvent.tsx";
import firstWinner from "../images/firstWinner.svg";
import Slide from "../Loader/Slide.tsx";
import ProfessorAndPrincipalPortfolio from "./ProfessorAndPrincipalPortfolio.tsx";
import EventNotices from "../PopUpMessages/EventNotices.tsx";
function HomeHeroSection({ winnerParticipantData, IsLoading }) {
  const images = [
    slide6,
    slide7,
    slide8,
    slide9,
    slide2,
    slide1,
    slide5,
    slide4,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndexWinner, setCurrentImageIndexWinner] = useState<
    string[]
  >([]);
  let limit =
    window.innerWidth >= 1080
      ? 5
      : window.innerWidth >= 900
      ? 4
      : window.innerWidth >= 600
      ? 3
      : 2;
  const [SlidePageCalculate, SetSlidePageCalculate] = useState(
    Math.ceil(winnerParticipantData.length / limit)
  );
  const [SlidePage, SetSlidePage] = useState(0);
  const [StartIndex, SetStartIndex] = useState(0);
  let bubbleArray = [SlidePageCalculate];
  for (let i = 1; i < SlidePageCalculate; i++) {
    bubbleArray.push(i);
  }

  useEffect(() => {
    let limitData = Math.ceil(winnerParticipantData.length / limit);
    SetSlidePageCalculate(limitData);
    setCurrentImageIndexWinner([]);
    if (SlidePage < limitData) {
      for (
        let i = StartIndex;
        i < (SlidePage + 1) * limit && i < winnerParticipantData.length;
        i++
      ) {
        setCurrentImageIndexWinner((previews) => [
          ...previews,
          winnerParticipantData[i],
        ]);
      }
      if ((SlidePage + 1) * limit < winnerParticipantData.length) {
        SetStartIndex((previews) => previews + limit);
      } else {
        SetStartIndex(0);
      }
    } else {
      SetStartIndex(0);
      SetSlidePage(0);
    }
  }, [SlidePage, winnerParticipantData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images, 4000]);

  useEffect(() => {
    if (SlidePageCalculate >= 2) {
      const intervalId = setInterval(() => {
        SetSlidePage(
          (prevIndex) =>
            (prevIndex = SlidePage >= SlidePageCalculate ? 0 : prevIndex + 1)
        );
      }, 8000);
      return () => clearInterval(intervalId);
    }
  }, [SlidePageCalculate, 8000]);

  const OnclickSlideImageSet = (index) => {
    setCurrentImageIndex(index);
  };
  const OnclickWinnerSlideImageSet = (index) => {
    if (SlidePageCalculate !== 1) {
      SetSlidePage(index);
    }
  };
  const OnHandelNextClick = () => {
    if (SlidePageCalculate !== 1) {
      SetSlidePage(
        (prevIndex) =>
          (prevIndex = SlidePage >= SlidePageCalculate ? 0 : prevIndex + 1)
      );
    }
  };
  const OnHandelPreviousClick = () => {
    if (SlidePageCalculate !== 1) {
      SetSlidePage(
        (prevIndex) =>
          (prevIndex =
            (prevIndex - 1 + SlidePageCalculate) % SlidePageCalculate)
      );
    }
  };
  const navigate = useNavigate();
  const OnClickWinnerDataShow = (WinnerParticipantClickedData) => {
    // navigate(`student/v1/${WinnerParticipantClickedData?.Participant_Name}/${WinnerParticipantClickedData?.Participant_profile_Id}`, { state: WinnerParticipantClickedData })
  };
  return (
    <>
      <div className=" absolute top-[60px]  left-0  w-[100%] h-[500px] max-[750px]:h-[400px] max-[550px]:h-[350px] overflow-hidden z-[-1]">
        {images.length > 0 ? (
          images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Background ${index}`}
              style={{ transition: " opacity 1s ease" }}
              className={`background-image absolute top-0 left-0 w-[100%] h-[100%] object-cover   ${
                index === currentImageIndex ? "opacity-[1]" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <div className="bg-[#080b11a3] loaderDateEvent h-[500px]"></div>
        )}
      </div>
      <div
        className={`  w-[100vw] h-[500px] max-[750px]:h-[400px]  max-[550px]:h-[350px]`}
      >
        <div className="w-[100%] h-[100%]   md:shadow-[inset_0px_0px_1000px_80px_#000] max-md:shadow-[inset_0px_0px_1000px_10px_#000]">
          <div className="w-[810px] h-[90%]  pl-[71px] pt-[100px] max-[750px]:pt-[70px] max-[550px]:pt-[60px]  max-[350px]:pt-[70px] max-[550px]:pl-[20px] max-[1150px]:w-[710px] max-[850px]:pl-[50px]  max-[750px]:w-[600px]   max-[750px]:pl-[30px] select-none max-[600px]:w-[100%]">
            {/* <div className=' w-[100%] h-[auto]'>
                            <h2 className=' text-[#fff] text-[32px] font-[400] h-[35px] max-[750px]:text-[24px] max-[750px]:h-[25px] max-[550px]:text-[20px] max-[350px]:h-[15px] max-[350px]:mb-2 '>Welcome to</h2>
                            <h1 className='text-[#FFDD00]  text-[64px] font-[700] h-[60px]  max-[1150px]:text-[55px] max-[750px]:text-[45px] max-[750px]:h-[45px] max-[550px]:text-[30px] max-[550px]:h-[35px] max-[350px]:text-[25px] max-[350px]:h-[25px] '>INSTITUTE TECHNICAL </h1>
                            <h1 className='text-[#FFDD00]  text-[64px] font-[700] h-[85px] max-[1150px]:text-[55px] max-[750px]:text-[45px] max-[750px]:h-[60px] max-[550px]:text-[30px] max-[550px]:h-[40px] max-[350px]:text-[25px] max-[350px]:h-[35px] '>COUNCIL </h1>
                            <div className=' flex gap-4 mb-4'>
                                <span className='text-[24px] font-[700] text-[#FFDD00] max-[750px]:text-[18px] max-[550px]:text-[15px]'>Innovate</span>
                                <span className='text-[24px] font-[700] text-[#fff] max-[750px]:text-[18px] max-[550px]:text-[15px]'>Tinker</span>
                                <span className='text-[24px] font-[700] text-[#4ae4ff] max-[750px]:text-[18px] max-[550px]:text-[15px]'>Create!</span>
                            </div>
                        </div>
                        <div>
                            <CountDownEvent EventStartDate="2024-06-27T00:00:00" EventEndDate="2024-06-30T00:00:00" />
                        </div> */}
          </div>
          <div className="w-[100%] h-[40px] flex justify-center items-center gap-2">
            {images.map((imageUrl, index) => (
              <span
                key={index}
                style={{ transition: "background-color 1s ease" }}
                className={`w-[10px] h-[10px] rounded-[50%]  hover:bg-[#fff] ${
                  index === currentImageIndex ? "bg-[#ffffff]" : "bg-[#747474]"
                } cursor-pointer`}
                onClick={() => OnclickSlideImageSet(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <EventNotices />

      <section className="bg-[#0d1526] w-[100%] h-[420px] pb-5">
        <div className="w-[100%] h-[auto] p-[20px] pt-[30px]">
          <div className="flex justify-center items-center gap-2">
            <img
              className="w-[40px] h-[30px] select-none"
              src={firstWinner}
              alt="firstWinner"
            />
            <h1 className="text-[#FFDD00]   select-none text-[40px]  text-center font-[700]   max-[1024px]:text-[35px] max-[800px]:text-[30px] max-[480px]:text-[25px]">
              {" "}
              WINNERS
            </h1>
          </div>
          <div className="w-[100%] flex justify-center items-center">
            <hr className="w-[423px]  border-[1px] border-[#FFDD00] rounded-[10px] max-[800px]:w-[300px] max-[480px]:w-[250px]" />
          </div>
        </div>
        {IsLoading ? (
          <div className=" w-[100%] h-[100%] p-[20px]">
            <Slide />
          </div>
        ) : currentImageIndexWinner.length ? (
          <>
            <div className="flex  items-center justify-between w-[100%] h-[auto] p-[10px]">
              <div className="p-[20px] flex justify-center items-center w-[100px]  h-[100%] max-[800px]:hidden">
                <span
                  style={{ transition: "all 1s" }}
                  onClick={OnHandelPreviousClick}
                  className={`${
                    SlidePageCalculate > 1 ? "flex" : "hidden"
                  } material-symbols-outlined w-[50px] h-[50px]  cursor-pointer text-[#fff] select-none  hover:bg-[#1f314b] font-[700]  rounded-[50%]   justify-center items-center border-[2px] border-[#1f314b]`}
                >
                  keyboard_arrow_left
                </span>
              </div>
              <div
                style={{ transition: "all 1s" }}
                className="w-[80%] h-[100%] flex gap-6 justify-between max-[1080px]:justify-center max-[800px]:w-[100%] p-[20px]"
              >
                {currentImageIndexWinner.map((data, index) => (
                  <>
                    <div
                      key={index}
                      style={{ transition: "all 0.5s" }}
                      className=" rounded-sm border-[#121d2a] w-[161px] h-[210px] p-3 cursor-default border-2 hover:border-[#1f3044] hover:shadow-[0px_opx_100px_10px_#1b2a3c]"
                      onClick={() => OnClickWinnerDataShow(data)}
                    >
                      <div className="w-[100%] h-[auto] p-[10px] flex justify-center items-center">
                        <img
                          src={Object(data).Participant_Avtar}
                          className="w-[110px] h-[110px] rounded-[50%] select-none"
                          alt="winners"
                        />
                      </div>
                      <div className="h-[52px] w-[100%]">
                        <p className="text-[20px] text-center select-none w-full truncate  font-[700] capitalize text-[#EEEEEE]">
                          {String(Object(data).Participant_Name).substring(
                            0,
                            15
                          )}
                        </p>
                        <p className="text-[15px] w-full truncate text-center select-none font-[400] capitalize text-[#DFDFDF]">
                          {String(
                            Object(data).Participant_Event_Name
                          ).substring(0, 12)}{" "}
                          {Object(data).Participant_Event_Year}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="p-[20px] flex justify-center items-center w-[100px] h-[100%] max-[800px]:hidden">
                <span
                  style={{ transition: "all 1s" }}
                  onClick={OnHandelNextClick}
                  className={`${
                    SlidePageCalculate > 1 ? "flex" : "hidden"
                  } material-symbols-outlined  w-[50px] h-[50px] cursor-pointer select-none text-[#fff]  hover:bg-[#1f314b] font-[700] rounded-[50%] flex justify-center items-center border-[2px] border-[#1f314b]`}
                >
                  keyboard_arrow_right
                </span>
              </div>
            </div>
            <div className="w-[100%] h-[40px] flex justify-center items-center gap-2 mt-4">
              {bubbleArray.map((imageUrl, index) => (
                <span
                  key={index}
                  style={{ transition: "background-color 1s ease" }}
                  className={`w-[10px] h-[10px] rounded-[50%]  hover:bg-[#fff] ${
                    index === SlidePage ? "bg-[#ffffff]" : "bg-[#747474]"
                  } cursor-pointer`}
                  onClick={() => OnclickWinnerSlideImageSet(index)}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <div className="w-[100%]  h-[250px] flex justify-center items-center ">
            <h1 className=" uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] select-none ">
              No More Winner List🌻🌻
            </h1>
          </div>
        )}
      </section>
      <ProfessorAndPrincipalPortfolio />
    </>
  );
}

export default HomeHeroSection;
