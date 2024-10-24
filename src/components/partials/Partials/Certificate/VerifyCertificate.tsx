import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";
import MainHeader from "../../MainHeader.tsx";
import "./Form.css";
import "./CertificateHome.css";
import { useLocation } from "react-router-dom";
const certificateTemplate = "/images/certificates/template.svg";
function VerifyCertificate() {
  const location = useLocation();
  document.title = "TechKshitiz verified certificate download";
  const certificateDataGet = location.state;
  const certificateData = certificateDataGet?.certificateData;
  const downloadPDF = async (): Promise<void> => {
    const element = document.getElementById("certificate");
    if (!element) return;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      hotfixes: [],
    });
    const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
    const yPos = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
    pdf.save("certificate.pdf");
  };

  return (
    <section className="bg-[#080c17]  h-[100vh] ">
      <MainHeader />
     
      {/* certificate */}
      <div className=" w-[100%] flex place-content-center px-[5%] py-12">
        {/* <FirstPriceCertificate /> */}
        <div
          id="certificate"
          style={{
            backgroundImage: `url(${certificateTemplate})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="max-w-[700px] w-full max-h-[500px] overflow-hidden rounded-[10px] relative select-none open-sans-font aspect-[3/2] "
        >
          <p className="text-[#000] text-[clamp(10px,2vw,12px)]  max-sm:scale-75 max-sm-m:scale-50 absolute top-[22.5%] font-semibold left-[10%]  open-sans-font  max-md:text-[10px] max-sm:text-[8px] max-sm:left-[8%] max-sm-m:left-[5%] ">
            CERTIFICATE ID:
            <span className="text-[#000] text-[12px] font-semibold   open-sans-font ml-[2px] max-md:text-[10px]  max-sm:text-[8px]">
              {certificateData?.certificateId}
            </span>
          </p>
          <div className="absolute top-[47%] max-sm:top-[44%]    left-0 flex justify-center items-center w-full ">
            <p className="text-[#000] text-2xl max-md:text-[20px] max-sm:text-[18px]   text-center font-semibold  uppercase font-mono max-sm:scale-75 max-sm-m:scale-50  ">
              {certificateData?.name}
            </p>
          </div>
          <div className="absolute top-[60%] left-0 flex justify-center items-center w-full px-[12%] max-sm:px-[8%] max-sm-m:px-[6%]">
            <p
              className={`text-[#000] hidden text-[12px]  max-md:text-[10px]  max-sm:text-[8px]  text-center font-[500]   max-sm:scale-75 max-sm-m:scale-50   open-sans-font ${
                String(certificateData?.certificateType).toLowerCase() !==
                  "participation" &&
                !certificateData?.isTeamParticipation &&
                "hidden"
              } `}
            >
              for securing{" "}
              <b>
                {String(certificateData?.certificateType).toLowerCase() ===
                "winner"
                  ? "1st"
                  : String(certificateData?.certificateType).toLowerCase() ===
                    "runner up"
                  ? "2nd"
                  : String(certificateData?.certificateType).toLowerCase() ===
                    "second runner up"
                  ? "3rd"
                  : ""}
              </b>{" "}
              position in <b>{certificateData?.eventName}</b> Organized by{" "}
              <b>TECHKSHITIZ</b> Technical Club of Government Engineering
              College, Siwan on 20th-21st September 2024.
            </p>
            <p
              className={`text-[#000] text-[12px]  max-md:text-[10px] max-sm:text-[8px]  text-center font-[500]   open-sans-font   max-sm:scale-75  max-sm-m:scale-50 ${
                String(certificateData?.certificateType).toLowerCase() !==
                  "participation" &&
                certificateData?.isTeamParticipation &&
                "hidden"
              }`}
            >
              of team{" "}
              <b>
                {certificateData?.teamName
                  ? certificateData?.teamName
                  : "Vikash Kumar"}
              </b>{" "}
              for securing{" "}
              <b>
                {String(certificateData?.certificateType).toLowerCase() ===
                "winner"
                  ? "1st"
                  : String(certificateData?.certificateType).toLowerCase() ===
                    "runner up"
                  ? "2nd"
                  : String(certificateData?.certificateType).toLowerCase() ===
                    "second runner up"
                  ? "3rd"
                  : ""}
              </b>{" "}
              position in <b>{certificateData?.eventName}</b> Organized by{" "}
              <b>TECHKSHITIZ</b> Technical Club of Government Engineering
              College, Siwan on 20th-21st September 2024.
            </p>
            <p
              className={`text-[#000] text-[12px]   max-md:text-[10px]  max-sm:text-[8px] text-center font-[500]    max-sm:scale-75   max-sm-m:scale-50 open-sans-font ${
                String(certificateData?.certificateType).toLowerCase() !==
                  "participation" && "hidden"
              }  `}
            >
              participated in the <b>{certificateData?.eventName}</b> organized
              by <b>TECHKSHITIZ</b> at Government Engineering College, Siwan, on
              20th-21st September 2024.
            </p>

          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-[#080c17] justify-center">
        <p className="text-[#ffffff] px-4">
          <b className="text-[#ff0659]"> Note:</b> This certificate is only for
          verification purposes. Please contact the TechKshitiz team for any
          queries.
        </p>
      </div>

      {/* download certificate button  */}
      {/* <button
          onClick={downloadPDF}
          className="bg-[#35A6DC] text-[#fff]  p-[10px] rounded-[5px] cursor-pointer"
        >
          Download Certificate
        </button> */}
    </section>
  );
}

export default VerifyCertificate;
