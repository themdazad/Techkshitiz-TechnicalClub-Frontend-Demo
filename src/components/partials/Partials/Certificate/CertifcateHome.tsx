import React, { useState } from "react";
import MainHeader from "../../MainHeader.tsx";
import MainFooter from "../../MainFooter.tsx";
import "./Form.css";
import "./CertificateHome.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
function CertifcateHome() {
  const [GetCertificateId, SetCertificateId] = useState("");
  const [isCertificateLoading, setCertificateLoading] = useState(false);
  const navigate = useNavigate();
  const dataSubmited = async (event) => {
    try {
      event.preventDefault();
      const certificateIdPattern = /^[a-zA-Z0-9]{12}$/;
      if (!certificateIdPattern.test(GetCertificateId)) {
        toast.warning("Invalid certificate id");
        SetCertificateId("");
      } else {
        setCertificateLoading(true);
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/v2/certificate/getdetails`;
        const dataFetch = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ certificateNumber: GetCertificateId }),
        });
        const data = await dataFetch.json();
        if (dataFetch.status === 200) {
          navigate(
            `/government-engineering-college-siwan/certificate/verify/?certificate_number=${GetCertificateId}&certificate_id=${data.data.certificateId}&certificate_type=${data.data.certificateType}&certificate_year=${data.data.eventYear}`,
            {
              state: { certificateData: data.data },
            }
          );
          setCertificateLoading(false);
          return;
        } else {
          toast.error("Certificate not found");
          SetCertificateId("");
          setCertificateLoading(false);
          return;
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      setCertificateLoading(false);
      return;
    }
  };
  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="techkshitiz,  techkshitij, techk shitiz, techk-shitiz, tech k shitiz, tech-k-shitiz, tech-kshitiz, tech kshitiz, tech kshitij, gec siwan,gecsiwan, gec siwan techkshitiz, gec siwan techk shitiz, gec siwan techk-shitiz, gec siwan tech kshitiz, gecsiwan tech fest, gec siwan techfest gec siwan tech fest, gec siwan annual techfest , gecsiwan annual tech fest , gec siwan techkshitiz, gec siwan techk shitiz, gec siwan techk-shitiz, gec siwan tech kshitiz, government engineering college bihar, government engineering college siwan tech club, government engineering college siwan techclub, government engineering college siwan techchnical  club, government engineering college siwan techchnicalclub, government engineering college siwan  club, government engineering college  tech club, government engineering college  techclub, gec siwan techclub, gec siwan tech club, gec siwan technical club, tech club, technical club, technicil, technicil,, Technical Blogs, Programming, Competitive Programming, Coding Contests, HTML, CSS, React, NodeJS, Aptitude, Quiz, Computer Science , TECHKSHITIZ, "
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
        <meta
          property="og:description"
          name="description"
          content="TechkShitiz - Government Engineering College, Siwan Verified certificate"
        />
        <meta
          property="og:url"
          content="https://www.techkshitiz.in/government-engineering-college-siwan/certificate/"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="TechKshitiz Verified Certificate Download"
        />
        <meta property="og:site_name" content="TechKshitiz" />
        <meta
          name="title"
          content="TechKshitiz Verified Certificate Download"
        />
        <title>TechKshitiz verified certificate download</title>
      </Helmet>
      <div className="w-full h-[100vh] bg-[#0f1526] overflow-auto ">
        <MainHeader />
        <div className="w-[100%] h-[100%]   flex justify-center items-center max-sm:p-3 ">
          <div className="w-[600px] max-sm:w-full h-[300px] border-2 rounded-[15px] border-[#141a32] bg-[#0c101d] p-[40px]">
            <h1 className=" text-center text-[#fffffff3] text-[16px] font-[700]">
              Enter TechkShitiz Certificate Id Below To Verify
            </h1>
            <div className="w-[100%] h-[200px]  p-[30px] flex justify-center items-center">
              <form onSubmit={dataSubmited} className="w-[250px] h-[auto] ">
                <label
                  htmlFor="VerifyCertificate"
                  className="text-center text-[#fffd] text-[14px] font-[500]"
                >
                  Certificate Id{" "}
                  <span className="text-[#ff5487] text-[18px]">*</span>
                </label>
                <br />
                <input
                  type="text"
                  maxLength={12}
                  name="text"
                  value={GetCertificateId}
                  onChange={(event) => {
                    SetCertificateId(event.target.value.trim().toUpperCase());
                  }}
                  id="VerifyCertificate"
                  className=" bg-transparent capitalize border-2 border-[#0a151c] text-[#e9f7ffcf] focus:border-[#142331] outline-none p-[10px] w-full rounded-[4px] mt-[10px] h-[40px] text-[13px] max-lg:text-[13px]"
                  placeholder="Enter Certificate Id"
                ></input>
                <div className="w-[100%] h-[auto] p-[15px] pl-0 flex justify-center items-center">
                  <button
                    disabled={
                      GetCertificateId === "" ||
                      Number(GetCertificateId.length) < 10 ||
                      isCertificateLoading
                    }
                    className={`${
                      GetCertificateId === "" ||
                      Number(GetCertificateId.length) < 12 ||
                      isCertificateLoading
                        ? "cursor-not-allowed"
                        : "cursor-pointer bg-[#13222b] text-[#c4dff7] hover:text-[#c4dff7] hover:bg-[#1b303c]"
                    } w-[100px] h-[40px] p-[10px] rounded-[8px] border-[#0f232f] transition ease-in-out delay-200  text-[14px]   flex justify-center items-center text-[#565e67] border-[1px]`}
                  >
                    {isCertificateLoading ? "Fetching..." : "Verify"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    </>
  );
}

export default CertifcateHome;
