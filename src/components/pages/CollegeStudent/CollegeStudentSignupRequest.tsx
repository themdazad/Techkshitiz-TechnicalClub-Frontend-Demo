import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainHeader from "../../partials/MainHeader.tsx";
import SchawnnajAnimatedLoader from "../../Loader/SchawnnajAnimatedLoader.tsx";
import Data_Fetch_Api from "../../contexts/Data_Fetch_Api.tsx";
// import paymentQrCode from "../../images/PayPayment.jpg";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const dateFetch = new Date();
const CollegeStudentSignupRequest = () => {
  const navigate = useNavigate();
  const [getdata, setdata] = useState({
    phone_Number: "",
    college_student_name: "",
    Date_Of_Birth: "",
    Registration_Number: "",
    email: "",
    branch: "",
    admissionYear: "",
    currentYear: "",
    // name_as_per_bank_account: "",
    // transaction_id: "",
    // bank_last_four_digit_and_upi_Number: "",
    // paymentDate: "",
  });
  const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
  const [GetStudentIdCard, SetStudentIdCard] = useState(null);
  //   const [GetTransactionScreenShot, SetTransactionScreenShot] = useState(null);
  const [Name, SetName] = useState({ college_Name: "", Branch_Name: "" });
  const [Id, SetId] = useState({ college_Id: "", Branch_Id: "" });
  const [IsLoaderCollegeName, ErrorMessageCollegeName, collegeNameData] =
    Data_Fetch_Api("/api/college/name/list/data");
  const [IsLoaderbranchName, ErrorMessageBranchName, branchNameData] =
    Data_Fetch_Api("/api/branch/name/list/data");
  const [OtherCollegeAllow, SetOtherCollegeAllow] = useState(false);
  const [OtherCollegeName, SetOtherCollegeName] = useState("");
  const changedata = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setdata({ ...getdata, [name]: value });
  };
  const OnChangeCollegIdCard = (event) => {
    if (event.target.value) {
      const file = event.target.files[0];
      const SudentId = document.querySelector("#student_id");
      if (file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size >= 102400) {
          Object(SudentId).value = "";
          toast.error("File size below the 100kb");
        } else {
          SetStudentIdCard(file);
        }
      } else {
        Object(SudentId).value = "";
        toast.error("Only Support image/jpeg format");
      }
    } else {
      toast.warning("Please select a file");
    }
  };
  //   const OnChangeTransactionScreenShot = (event) => {
  //     if (event.target.value) {
  //       const file = event.target.files[0];
  //       const SudentId = document.querySelector("#transaction_Screen_Short");
  //       if (file.type === "image/jpeg" || file.type === "image/png") {
  //         if (file.size >= 102400) {
  //           Object(SudentId).value = "";
  //           toast.error("File size below the 100kb");
  //         } else {
  //           SetTransactionScreenShot(file);
  //         }
  //       } else {
  //         Object(SudentId).value = "";
  //         toast.error("Only Support image/jpeg format");
  //       }
  //     } else {
  //       toast.warning("Please select a file");
  //     }
  //   };
  const datasubmit = async (event) => {
    event.preventDefault();
    setIsLoadingRequest(true);
    const {
      phone_Number,
      college_student_name,
      email,
      Registration_Number,
      Date_Of_Birth,
      admissionYear,
      currentYear,
      //   name_as_per_bank_account,
      //   transaction_id,
      //   bank_last_four_digit_and_upi_Number,
      //   paymentDate,
    } = getdata;
    const { college_Name, Branch_Name } = Object(Name);

    const { college_Id, Branch_Id } = Object(Id);
    if (
      phone_Number &&
      college_student_name &&
      email &&
      Branch_Name &&
      admissionYear &&
      Date_Of_Birth &&
      Registration_Number &&
      currentYear &&
      college_Name &&
      college_Id &&
      Branch_Id &&
      GetStudentIdCard
      //   GetTransactionScreenShot &&
      //   name_as_per_bank_account &&
      //   transaction_id &&
      //   bank_last_four_digit_and_upi_Number &&
      //   paymentDate
    ) {
      try {
        const SudentId = document.querySelector("#student_id");
        if (SudentId) {
          const CollegeStudentData = new FormData();
          CollegeStudentData.append("full_Name", college_student_name);
          CollegeStudentData.append("email_Id", email);
          CollegeStudentData.append("phone_Number", phone_Number);
          CollegeStudentData.append("admission_Year", admissionYear);
          CollegeStudentData.append("current_Year", currentYear);
          CollegeStudentData.append("college_Id_Prof", GetStudentIdCard);
          CollegeStudentData.append("college_Name", college_Name);
          CollegeStudentData.append("college_Name_Id", college_Id);
          CollegeStudentData.append("departement_Name", Branch_Name);
          CollegeStudentData.append("branch_Id", Branch_Id);
          CollegeStudentData.append("Registration_Number", Registration_Number);
          CollegeStudentData.append("Date_Of_Birth", Date_Of_Birth);
          //   CollegeStudentData.append(
          //     "name_as_per_bank_account",
          //     name_as_per_bank_account
          //   );
          //   CollegeStudentData.append("transaction_id", transaction_id);
          //   CollegeStudentData.append(
          //     "bank_last_four_digit_and_upi_Number",
          //     bank_last_four_digit_and_upi_Number
          //   );
          //   CollegeStudentData.append("paymentDate", paymentDate);
          //   CollegeStudentData.append("paymentAmount", "99");
          //   CollegeStudentData.append(
          //     "transaction_Screen_Short",
          //     GetTransactionScreenShot
          //   );
          const res = await fetch(
            baseUrl + "/api/college/student/request/college-student-id",
            {
              method: "POST",
              body: CollegeStudentData,
              credentials: "include",
            }
          );
          const CollegeStudentRequestResponse = await res.json();
          if (res.status === 200) {
            navigate("/");
            Object(SudentId).value = "";
            toast.success(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else if (res.status === 400) {
            Object(SudentId).value = "";
            toast.error(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else if (res.status === 401) {
            Object(SudentId).value = "";
            toast.error(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else if (res.status === 402) {
            toast.error(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else if (res.status === 403) {
            Object(SudentId).value = "";
            toast.error(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else if (res.status === 405) {
            Object(SudentId).value = "";
            toast.error(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else if (res.status === 406) {
            Object(SudentId).value = "";
            toast.error(CollegeStudentRequestResponse.message);
            setIsLoadingRequest(false);
          } else {
            Object(SudentId).value = "";
            toast.error("Some technical issue");
            setIsLoadingRequest(false);
          }
        } else {
        }
      } catch (error) {
        toast.error("Some technical issue");
        setIsLoadingRequest(false);
      }
    } else {
      toast.error("All field require");
      setIsLoadingRequest(false);
    }
  };
  const changeBranchNamedata = (event) => {
    const BranchData = event.target.value;
    if (BranchData !== "" && Object(branchNameData)?.data.length > 0) {
      Object(branchNameData)?.data?.forEach((data) => {
        if (String(data?.branch_Id) === String(BranchData)) {
          SetName({ ...Name, Branch_Name: data?.branch_Name });
        }
      });
      SetId({ ...Id, Branch_Id: BranchData });
    } else {
      SetName({ ...Name, Branch_Name: "" });
      SetId({ ...Id, Branch_Id: "" });
    }
  };
  const SetOtherCollegeNameChange = (e) => {
    const collegeName = "college_Name";
    const collegeId = "college_Id";
    SetOtherCollegeName(e.target.value);
    SetName({ ...Name, [collegeName]: e.target.value });
    SetId({ ...Id, [collegeId]: "otherCollege" });
  };
  const changeCollegeNamedata = (event) => {
    const CollegeData = event.target.value;
    const collegeName = "college_Name";
    const collegeId = "college_Id";
    if (String(CollegeData) === "otherCollege") {
      SetOtherCollegeAllow(true);
      SetId({ ...Id, [collegeId]: CollegeData });
    } else {
      SetOtherCollegeAllow(false);
      if (CollegeData !== "" && Object(collegeNameData)?.data?.length > 0) {
        Object(collegeNameData)?.data?.forEach((data) => {
          if (String(data?.college_Id) === String(CollegeData)) {
            SetName({ ...Name, [collegeName]: data?.college_Name });
          }
        });
        SetId({ ...Id, [collegeId]: CollegeData });
      } else {
        SetName({ ...Name, [collegeName]: "" });
        SetId({ ...Id, [collegeId]: "" });
      }
    }
  };
  if (IsLoaderbranchName || IsLoaderCollegeName) {
    return <SchawnnajAnimatedLoader />;
  }

  if (IsLoadingRequest) {
    return <SchawnnajAnimatedLoader />;
  }
  return (
    <>
      <MainHeader />
      <div className="w-[100%] min-h-screen h-[100%] max-md:p-[20px]  max-lg:pt-8  max-md:pt-8 max-md:pb-8  max-lg:p-[30px] pt-[30px] pb-[30px] bg-[#161f2f] flex justify-center items-center overflow-auto">
        <div className=" w-[800px] max-md:w-full bg-[#0e1c24] text-[#ffffffb4] h-[auto] rounded-[10px] border-[#122732]  border-[2px]">
          <div className=" w-[100%] h-[50px] flex justify-center items-center  ">
            <h1 className="text-[22px] font-[700] text-[#ffffffde] mt-6">
              TechKshitiz Id Request
            </h1>
          </div>
          <form onSubmit={datasubmit} className=" w-[100%] h-[auto]   p-[20px]">
            <div className=" w-[100%] h-[50px] max-md:h-auto max-md:block max-md:space-y-6 flex justify-center items-center  mt-4  gap-4  ">
              <input
                type="text"
                placeholder="Enter your Full Name : "
                name="college_student_name"
                onChange={changedata}
                value={getdata.college_student_name}
                required
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] w-[100%] max-md:mt-2 max-md:h-[50px] h-[100%] "
              />
              <input
                type="number"
                placeholder="Enter your  Phone Number : "
                name="phone_Number"
                onChange={changedata}
                value={getdata.phone_Number}
                required
                maxLength={10}
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] w-[100%] max-md:mt-2 max-md:h-[50px] h-[100%] "
              />
            </div>
            <div className=" w-[100%] h-[50px] max-md:h-auto  max-md:block max-md:space-y-6  flex justify-center items-center gap-4  mt-2">
              <input
                type="email"
                placeholder="Enter your Email id : "
                name="email"
                value={getdata.email}
                onChange={changedata}
                required
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] max-md:mt-2 w-[100%] max-md:h-[50px] h-[100%]"
              />
              <select
                name="college_Name"
                value={Object(Id)?.college_Id}
                onChange={changeCollegeNamedata}
                required
                className="p-[10px]   overflow-hidden border-[2px] border-[#162935] rounded-[5px] bg-[#0e1c24] outline-none focus:border-[#29465a] max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
              >
                <option value="">Select your College Name</option>
                {Object(collegeNameData)?.data?.length > 0 ? (
                  Object(collegeNameData)?.data?.map((data, index) => (
                    <option value={data?.college_Id} key={index}>
                      {data?.college_Name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
                <option value={"otherCollege"}>Other</option>
              </select>
            </div>
            <div
              className={`${
                OtherCollegeAllow ? "flex" : "hidden"
              } w-[100%] h-[50px] max-md:h-auto  max-md:block max-md:space-y-6   justify-center items-center gap-4  mt-2`}
            >
              <input
                type="text"
                placeholder="Enter your college name : "
                name="college_name"
                value={OtherCollegeName}
                onChange={SetOtherCollegeNameChange}
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] max-md:mt-2 w-[100%] max-md:h-[50px] h-[100%]"
              />
            </div>
            <div className=" w-[100%] h-[50px] max-md:h-auto  max-md:block max-md:space-y-6  flex justify-center items-center gap-4  mt-2">
              <select
                name="branch"
                value={Object(Id)?.Branch_Id}
                onChange={changeBranchNamedata}
                required
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-[#0e1c24] outline-none focus:border-[#29465a]   max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
              >
                <option value="">Select your branch</option>
                {Object(branchNameData)?.data?.length > 0 ? (
                  Object(branchNameData)?.data?.map((data, index) => (
                    <option value={data?.branch_Id} key={index}>
                      {data?.branch_Name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <input
                type="text"
                placeholder="Enter your Registration Number : "
                name="Registration_Number"
                value={getdata.Registration_Number}
                onChange={changedata}
                required
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a]   max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
              />
            </div>
            <div className=" w-[100%] h-[50px] max-md:h-auto  max-md:block max-md:space-y-6  flex justify-center items-center gap-4  mt-2">
              <select
                name="admissionYear"
                value={getdata.admissionYear}
                onChange={changedata}
                required
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-[#0e1c24] outline-none focus:border-[#29465a]   max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
              >
                <option value="">Select your admission year</option>
                <option value={dateFetch.getFullYear()}>
                  {dateFetch.getFullYear()}
                </option>
                <option value={dateFetch.getFullYear() - 1}>
                  {dateFetch.getFullYear() - 1}
                </option>
                <option value={dateFetch.getFullYear() - 2}>
                  {dateFetch.getFullYear() - 2}
                </option>
                <option value={dateFetch.getFullYear() - 3}>
                  {dateFetch.getFullYear() - 3}
                </option>
                <option value={dateFetch.getFullYear() - 4}>
                  {dateFetch.getFullYear() - 4}
                </option>
                <option value={dateFetch.getFullYear() - 5}>
                  {dateFetch.getFullYear() - 5}
                </option>
                <option value={dateFetch.getFullYear() - 6}>
                  {dateFetch.getFullYear() - 6}
                </option>
                <option value={dateFetch.getFullYear() - 7}>
                  {dateFetch.getFullYear() - 7}
                </option>
                <option value={dateFetch.getFullYear() - 8}>
                  {dateFetch.getFullYear() - 8}
                </option>
                <option value={dateFetch.getFullYear() - 9}>
                  {dateFetch.getFullYear() - 9}
                </option>
                <option value={dateFetch.getFullYear() - 10}>
                  {dateFetch.getFullYear() - 10}
                </option>
              </select>
              <select
                name="currentYear"
                value={getdata.currentYear}
                onChange={changedata}
                required
                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-[#0e1c24] outline-none focus:border-[#29465a]   max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
              >
                <option value="">Select your current year</option>
                <option value="1st">First Year</option>
                <option value="2nd">Second Year</option>
                <option value="3rd">Third Year</option>
                <option value="4th">Fourth Year</option>
              </select>
            </div>
            <div className=" w-[100%] h-[150px] max-sm:h-auto max-md:block  max-md:h-auto max-md:space-y-6  flex justify-center items-start gap-4  mt-2">
              {/* <div className="w-[100%] h-[100%] max-md:h-auto space-y-2"> */}

              <div className="w-[100%] h-[50px] max-md:h-[80px] max-md:mt-2 space-y-2">
                <label htmlFor="student_id" className="font-[600]  ">
                  Date Of Birth :{" "}
                </label>
                <input
                  type="date"
                  name="Date_Of_Birth"
                  id="Date_Of_Birth"
                  value={getdata.Date_Of_Birth}
                  onChange={changedata}
                  required
                  className="p-[10px]   max-md:mt-2 max-md:h-[50px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] w-[100%] h-[100%]"
                />
              </div>
              <div className="w-[100%] h-[50px] max-md:h-[150px] max-md:mt-2 space-y-2">
                <label htmlFor="student_id" className="font-[600]  ">
                  Upload College Id Card :{" "}
                </label>
                <input
                  type="file"
                  name="student_id"
                  id="student_id"
                  onChange={OnChangeCollegIdCard}
                  required
                  className="p-[10px]  max-md:h-[50px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] w-[100%] h-[100%]"
                />
                <span className="flex  gap-2 text-[#ffeb39]">
                  <b>Note: </b>Only jpeg & png image accepted <br /> Size should
                  be less then 100kb
                </span>
              </div>

              {/* </div> */}
              {/* <div className="max-md:mt-8 border-[1px]  max-md:h-[400px] max-md:mb-6 border-[#c2c2c2] rounded-[5px] outline-[#bb2470] w-[100%] h-[260px] flex justify-center max-sm:h-[250px] items-center">
                                <img src={paymentQrCode} className="w-[100%] h-[100%] rounded-[5px] " alt="No File chosen" />
                            </div> */}
            </div>
            {/* <div className=" w-[100%] h-[50px] max-md:block max-md:h-auto max-md:space-y-6   flex justify-center items-center gap-4  mt-2">
                            <input
                                type="text"
                                placeholder="Enter your name as per bank account : "
                                name="name_as_per_bank_account"
                                value={getdata.name_as_per_bank_account}
                                onChange={changedata}
                                required
                                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a]   max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
                            />
                            <input
                                type="text"
                                placeholder="Enter your transaction id  : "
                                name="transaction_id"
                                value={getdata.transaction_id}
                                onChange={changedata}
                                required
                                className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a]   max-md:mt-2 max-md:h-[50px] w-[100%] h-[100%]"
                            />

                        </div>
                        <div className=" w-[100%] h-[60px] max-md:block max-md:h-auto max-md:space-y-6   flex justify-center items-center gap-4  mt-2">
                            <input
                                type="text"
                                placeholder="Enter bank last 4-digit/UPI number : "
                                name="bank_last_four_digit_and_upi_Number"

                                value={getdata.bank_last_four_digit_and_upi_Number}
                                onChange={changedata}
                                required
                                className="p-[10px] h-[50px] mt-10  max-md:mt-2 max-md:h-[50px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] w-[100%]"
                            />
                            <div className="w-[100%] h-[50px] ">
                                <label htmlFor="paymentDate" className="font-[600] mb-1  ">Payment Date:  </label>
                                <input
                                    type="date"
                                    id="paymentDate"
                                    name="paymentDate"
                                    value={getdata.paymentDate}
                                    onChange={changedata}
                                    required
                                    className="p-[10px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a]   max-md:mt-2 w-[100%] h-[100%] max-md:h-[50px]"
                                />
                            </div>
                        </div>
                        <div className=" w-[100%] h-[auto] max-md:block max-md:h-auto max-md:space-y-6   flex justify-start items-center gap-4  mt-8">
                            <div className="w-[50%] max-md:w-full h-[150px] max-md:h-[150px] max-md:mt-8 space-y-2">
                                <label htmlFor="student_id" className="font-[600]  ">Upload Payment ScreenShot :  </label>
                                <input
                                    type="file"
                                    name="transaction_Screen_Short"
                                    id="transaction_Screen_Short"
                                    onChange={OnChangeTransactionScreenShot}
                                    required
                                    className="p-[10px]  h-[50px] max-md:h-[50px] border-[2px] border-[#162935] rounded-[5px] bg-transparent outline-none focus:border-[#29465a] w-[100%]"
                                />
                                <span className="flex  gap-2 text-[#ffeb39]"><b>Note: </b>Only jpeg & png image accepted <br /> Size should be less then 100kb</span>

                            </div>

                        </div> */}
            <div className=" w-[100%] h-[50px]  max-sm:mt-[20px]     flex justify-center  items-center mt-[40px]">
              <button
                type="submit"
                style={{ transition: "all 0.6s" }}
                className=" p-[11px] border-2 border-[#162935]   bg-[#11212b] w-[250px] rounded-[10px] hover:bg-[#46d95f] hover:text-[#0e1c24] text-[#fff] font-[700]"
              >
                Send Id Request
              </button>
            </div>
            <div className=" p-[10px] mt-[10px]">
              <span className="font-[500] text-[#eeeeeee6]">
                <span className="font-[800]  text-[#ff2600d4]">Note : </span>
                <span className=" ml-[6px] font-[400] text-[#ffffffaf]">
                  After you registration done, we will verify your data within
                  24 hours. If your data is accurate , your Techkshitiz ID will
                  be generated. In case of incorrect data , your request will be
                  rejected. You will receive updates about the status of your
                  registration via email. If your Techkshitiz ID is not
                  generated or if you encounter any registration-related
                  problems, please contact us at:
                </span>{" "}
                <br />
                <br />
                <span className=" font-[600] ">
                  What'sApp :{" "}
                  <NavLink
                    to="https://wa.me/7352514546"
                    target="_"
                    className="text-[#67ff62d9] ml-2 font-[400] cursor-pointer"
                  >
                    7352514546
                  </NavLink>
                </span>{" "}
                <br />
                <span className=" font-[600]   ">
                  Email :{" "}
                  <NavLink
                    to="mailto:techkshitiz.org@gmail.com"
                    className="text-[#67ff62da] ml-2 font-[400] cursor-pointer"
                  >
                    techkshitiz.org@gmail.com
                  </NavLink>
                </span>
                <br />
              </span>
            </div>
            <div className=" w-[100%] h-[50px] flex justify-center items-center   gap-1">
              <p className=" text-[15px]">have an account?</p>
              <NavLink
                to="/government-engineering-college-siwan/student/login/"
                className="text-[14px] font-[700] hover:text-[#ff4f98]"
              >
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CollegeStudentSignupRequest;
