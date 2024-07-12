import React, { useEffect, useState } from "react";
import LiveStream from "./LiveStream.tsx";
import MainHeader from "./components/partials/MainHeader.tsx";
import MainFooter from "./components/partials/MainFooter.tsx";
import AnimatedLoader from "./components/Loader/AnimatedLoader.tsx";
const baseUrl = process.env.REACT_APP_BACKEND_URL
const BgmiLiveStream = () => {
  const [videoIds, setvideoId] = useState<string[]>([]);
  const [IsLoading, SetIsLoading] = useState(false);
  const [NoVideoUrl, setNoVideoUrl] = useState(true);
  const videourlfetch = async () => {
    try {
      SetIsLoading(true);
      const res = await fetch(baseUrl + "/api/live-stream/data", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setvideoId(data);
      SetIsLoading(false);
    } catch (error) {
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    videourlfetch();
  }, []);
  if (IsLoading) {
    return <AnimatedLoader />;
  }
  return (
    <>
      <MainHeader />
      {
        !Object(videoIds).videoid ? (
          <div className=" w-full h-[100vh] bg-[#091522] flex justify-center items-center">
            <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>Wait for upcomming live events🌻🌻</h1>
          </div>
        ) : (
          <div className="w-[100%] bg-[#091522] h-[100vh] p-[48px] flex justify-center items-center">
            <LiveStream videoIdProps={Object(videoIds).videoid} />
          </div>
        )
      }
      <MainFooter />
    </>
  );
};

export default BgmiLiveStream;
