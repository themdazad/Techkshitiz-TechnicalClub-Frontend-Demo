import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountDownEvent from "./CountDownEvent.tsx";
// import Slide from "../Loader/Slide.tsx";
import EventNotices from "../PopUpMessages/EventNotices.tsx";
import { useMemo } from "react";
// import { ComingSoon } from "../ComingSoon/ComingSoon.tsx";
function HomeHeroSection({ winnerParticipantData, IsLoading }) {
  const images = useMemo(
    () => [
      "/images/carousel/earth_surface.jpg",
      "/images/carousel/slide2.jpeg",
      "/images/carousel/slide4.jpeg",
      "/images/carousel/slide5.jpeg",
      "/images/carousel/slide6.jpeg",
      "/images/carousel/slide7.jpeg",
    ],
    []
  );
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
      <div className=" absolute md:top-[60px] top-[50px]  left-0  w-[100%] h-[600px] max-[750px]:h-[400px] max-[600px]:h-[350px] overflow-hidden z-[-1]">
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
        className={`  w-[100vw] h-[600px] max-[750px]:h-[400px]  max-[550px]:h-[350px]`}
      >
        {/* Hero section  */}
        <div className="w-[100%] h-[100%] px-[5%] md:shadow-[inset_0px_0px_255px_150px_#000] max-md:shadow-[inset_0px_0px_1000px_10px_#000]">
          {/* Hero contents  */}
          <div className="h-full grid place-content-center space-y-4 justify-items-center  text-center w-full">
            <h1 className=" italic text-[#fff] text-4xl  md:text-6xl font-[900] ">
              Unleash Your Potential <br /> with Tech
              <span className="text-sky-600">kshitiz</span>
            </h1>
            <div className="text-white text-lg">
              Explore - Innovate - Create
            </div>

            {/* hero section timer button  */}
            {/* Add event start and end date here */}

            <CountDownEvent
              EventStartDate="2024-07-01T00:00:00"
              EventEndDate="2024-08-01T00:00:00"
            />
          </div>

          <div className="w-[100%] flex justify-center items-center gap-2 -mt-6">
            {images.map((imageUrl, index) => (
              <span
                key={index}
                style={{ transition: "background-color 1s ease" }}
                className={`w-[16px] h-[4px] rounded-full  hover:bg-sky-600 ${
                  index === currentImageIndex ? "bg-sky-600" : "bg-[#ffffff18]"
                } cursor-pointer`}
                onClick={() => OnclickSlideImageSet(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      {/* Important announcement Popup Message bar */}
      <EventNotices />

      {/* past event winners section */}
      <section className="bg-[#0d1526] w-[100%] h-[420px] py-12">
        {/* heading  */}
        <div className="">
          <h1 className="text-sky-600    text-[40px]  text-center font-[700]   max-[1024px]:text-[35px] max-[800px]:text-[30px] max-[480px]:text-[25px]">
            WINNERS
          </h1>

          <div className="w-[100%] flex justify-center items-center">
            <hr
              className="h-[2px] w-[200px] md:w-[250px] border-none rounded-[10px] bg-gradient-to-r from-transparent via-sky-600 to-transparent"
              style={{
                borderImage:
                  "linear-gradient(to right, transparent, sky-600, transparent)",
                borderImageSlice: 1,
              }}
            />
          </div>
        </div>
        {/* heading:end  */}

        {/* IsLoading */}
        {/* {IsLoading && currentImageIndexWinner.length ? ( */}
        {/* {IsLoading? ( */}
        <>
          {/* winner profile  */}
          <div className="flex  items-center justify-between w-[100%] h-[auto] p-[10px]">
            <div className="p-[20px] flex justify-center items-center w-[100px]  h-[100%] max-[800px]:hidden">
              <span
                style={{ transition: "all 1s" }}
                onClick={OnHandelPreviousClick}
                className={`${
                  SlidePageCalculate > 1 ? "flex" : "hidden"
                } material-symbols-outlined w-[50px] h-[50px]  cursor-pointer text-[#fff]   hover:bg-[#1f314b] font-[700]  rounded-[50%]   justify-center items-center border-[2px] border-[#1f314b]`}
              >
                keyboard_arrow_left
              </span>
            </div>
            {/* winner cards section  */}
            <div className=" flex gap-6 p-[20px]">
              {currentImageIndexWinner.map((data, index) => (
                <>
                  {/* winner card  */}
                  <div
                    key={index}
                    style={{ transition: "all 0.5s" }}
                    className=" snap-x overflow-hidden bg-slate-900 rounded-3xl border-[#162435] w-[150px] h-[210px] p-3 cursor-default border-2 hover:border-[#1f3044] hover:shadow-[0px_opx_100px_10px_#1b2a3c]"
                    onClick={() => OnClickWinnerDataShow(data)}
                  >
                    <div className=" snap-center w-[100%] p-[10px] flex justify-center items-center">
                      <img
                        src={Object(data).Participant_Avtar}
                        className="w-[110px] aspect-square rounded-full "
                        alt="winners"
                      />
                    </div>
                    <div className="h-[52px] w-[100%]">
                      <p className="text-md md:text-lg text-center  w-full truncate  font-[700] capitalize text-[#EEEEEE]">
                        {String(Object(data).Participant_Name).substring(0, 15)}
                      </p>
                      <p className="text-[15px] w-full truncate text-center  font-[400] capitalize text-[#DFDFDF]">
                        {String(Object(data).Participant_Event_Name).substring(
                          0,
                          12
                        )}{" "}
                        {Object(data).Participant_Event_Year}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {/* winner cards section:end  */}
            <div className="p-[20px] flex justify-center items-center w-[100px] h-[100%] max-[800px]:hidden">
              <span
                style={{ transition: "all 1s" }}
                onClick={OnHandelNextClick}
                className={`${
                  SlidePageCalculate > 1 ? "flex" : "hidden"
                } material-symbols-outlined  w-[50px] h-[50px] cursor-pointer text-[#fff]  hover:bg-[#1f314b] font-[700] rounded-[50%] flex justify-center items-center border-[2px] border-[#1f314b]`}
              >
                keyboard_arrow_right
              </span>
            </div>
          </div>
          {/* winner profile:end  */}
          <div className="w-[100%] h-[40px] flex justify-center items-center gap-2 ">
            {bubbleArray.map((imageUrl, index) => (
              <span
                key={index}
                style={{ transition: "background-color 1s ease" }}
                className={`w-[16px] h-[4px] rounded-full  hover:bg-[#fff] ${
                  index === SlidePage ? "bg-sky-600" : "bg-[#ffffff1a]"
                } cursor-pointer`}
                onClick={() => OnclickWinnerSlideImageSet(index)}
              ></span>
            ))}
          </div>
        </>
        {/* ) : (
          <div className="w-[100%]  h-[250px] flex justify-center items-center ">
            <h1 className=" uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px]  ">
              <ComingSoon text="Winner not available"/>
            </h1>
          </div>
        )} */}
      </section>

      {/* Sponsorship  */}
      <SponsorshipPartener />

      {/* faculty details moved in about page  */}
    </>
  );
}

export default HomeHeroSection;

let sponsorData = [
  {
  name: "New Fassion House",
  link: "https://",
  image:
    "/images/sponsors/NewFashionHouse.png",
},
  {
  name: "Startup Cell Siwan",
  link: "https://",
  image:
    "/images/sponsors/scellsiwan.jpg",
},
];

function SponsorshipPartener() {
  const [sponsor, setSponsor] = useState(sponsorData);
  return (
    <>
      <section className="bg-[#0d1526]">
        <h1 className="text-sky-600    text-[40px]  text-center font-[700]   max-[1024px]:text-[35px] max-[800px]:text-[30px] max-[480px]:text-[25px]">
          Sponsorship Partener
        </h1>

        <div className="w-[100%] flex justify-center items-center">
          <hr
            className="h-[2px] w-[200px] md:w-[250px] border-none rounded-[10px] bg-gradient-to-r from-transparent via-sky-600 to-transparent"
            style={{
              borderImage:
                "linear-gradient(to right, transparent, sky-600, transparent)",
              borderImageSlice: 1,
            }}
          />
        </div>
        <div className="sponsorship_parteners bg-white py-2 mt-8 flex justify-center items-center">
              <a href={sponsor.link}>
                <img
                  className="image1 object-contain h-24 aspect-square"
                  src={sponsor.image}
                  alt="sponsorship member"
                />
              </a>
           
        </div>
      </section>
    </>
  );
}
