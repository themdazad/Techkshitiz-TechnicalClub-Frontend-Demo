import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../MainHeader.tsx';
import MainFooter from '../../MainFooter.tsx';
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx';
import { toast } from 'react-toastify';
const baseUrl = process.env.REACT_APP_BACKEND_URL
const ContestDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const pathdata = path.split('/');
  const [Permission, SetPermission] = useState(false);
  const [IsPermissionLoading, SetPermissionLoading] = useState(true);
  const [IsContestLoading, setIsContestLoading] = useState(true);
  const [ContestDatastate, SetContestData] = useState([]);
  const [IsLoading, SetIsLoading] = useState<boolean>(true);
  const [StudentData, SetStudentData] = useState<string[]>([]);
  const [StudentIsLogin, SetStudentIsLogin] = useState(false);
  const [IsContestEventLogin, setIsContestEventLogin] = useState(false);
  const [IsContestEventLoading, setIsContestEventloading] = useState(true);
  const [IsContestEventRegisterData, setIsContestEventregisterData] = useState(true);
  const [ProjectSumbitData, setProjectSubmitData] = useState<string[]>({ project_title: "", github_repo_link: "", hosted_project_link: "", team_member_two_id: "", team_member_three_id: "", team_member_four_id: "" });
  const [IsLoadingRequest, setIsLoadingRequest] = useState(false);
  const [projectSubmitFormActive, setprojectSubmitFormActive] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [submitButtonActive, SubmitButtonNonActive] = useState(false);

  document.title = `TechKshitiz'${String(new Date().getFullYear()).substring(2, 4)} ${Object(ContestDatastate)?.contest_Name} Contest || Government Engineering College, Siwan `
  const ContestRegisterUserVerify = async (techk_Shitiz_Id, contestData) => {
    try {
      setIsContestEventloading(true)
      const res = await fetch(baseUrl + '/api/v1/student/profile/contest/event/register/verification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contest_Club_Id: Object(contestData)?.contest_Club_Id, contest_EventId: Object(contestData)?.contest_EventId, participant_techk_Shitiz_Id: techk_Shitiz_Id }),
        credentials: 'include'
      })
      if (res.status === 200) {
        const data = await res.json();
        setIsContestEventregisterData(data.data);
        setIsContestEventLogin(true);
        setIsContestEventloading(false);
      } else {
        toast.warning("you did not participant in this event");
        navigate('/government-engineering-college-siwan/contest/lists')
        setIsContestEventLogin(false);
        setIsContestEventloading(false)
        return;
      }
    } catch (error) {
      toast.warning("you did not participant in this event");
      navigate('/government-engineering-college-siwan/contest/lists')
      setIsContestEventLogin(false);
      setIsContestEventloading(false)
      return;
    }
  }
  const verifydataStudent = async () => {
    try {
      SetIsLoading(true)
      const res = await fetch(baseUrl + '/api/v1/student/profile/data', {
        method: 'GET',
        credentials: 'include'
      })
      if (res.status === 200) {
        const data = await res.json();
        if (Number(data?.data?.participant_Roll) === 0 || Number(data?.data?.participant_Roll) === 1) {
          if (data.data) {
            if (data.data.participant_Profile_Avtar) {
              const uint8Array = new Uint8Array(data.data.participant_Profile_Avtar.data.data);
              const blob = new Blob([uint8Array], { type: 'image/jpeg' });
              const dataUrl = URL.createObjectURL(blob);
              data.data.participant_Profile_Avtar = dataUrl;
            }
          }
          SetStudentData(data?.data);
          SetStudentIsLogin(true);
          SetIsLoading(false);
        } else {
          toast.warning("You're not a student only student can access this contest")
          navigate('/')
          SetIsLoading(false);
          SetStudentIsLogin(false);
        }
      } else if (res.status === 400) {
        toast.warning("You did not login please login")
        SetStudentIsLogin(false);
        SetIsLoading(false)

      }
      else {
        toast.warning("You did not login please login")
        SetStudentIsLogin(false);
        SetIsLoading(false)
      }
    } catch (error) {
      toast.warning("You did not login please login")
      SetStudentIsLogin(false);
      SetIsLoading(false)
    }
  }
  const verifydata = async (contestData) => {
    try {
      SetIsLoading(true)
      const res = await fetch(baseUrl + '/api/v1/student/profile/data', {
        method: 'GET',
        credentials: 'include'
      })
      if (res.status === 200) {
        const data = await res.json();
        if (Number(data?.data?.participant_Roll) === 0 || Number(data?.data?.participant_Roll) === 1) {
          if (data.data) {
            if (data.data.participant_Profile_Avtar) {
              const uint8Array = new Uint8Array(data.data.participant_Profile_Avtar.data.data);
              const blob = new Blob([uint8Array], { type: 'image/jpeg' });
              const dataUrl = URL.createObjectURL(blob);
              data.data.participant_Profile_Avtar = dataUrl;
            }
          }
          SetStudentData(data?.data);
          ContestRegisterUserVerify(Object(data)?.data?.techk_Shitiz_Id, contestData);
          SetStudentIsLogin(true);
          SetIsLoading(false);
        } else {
          toast.warning("You're not a student only student can access this contest")
          navigate('/government-engineering-college-siwan/student/login')
          SetIsLoading(false);
          setIsContestEventloading(false);
          SetStudentIsLogin(false);
        }
      } else if (res.status === 400) {
        toast.warning("You did not login please login")
        navigate('/government-engineering-college-siwan/student/login')
        SetStudentIsLogin(false);
        setIsContestEventloading(false);
        SetIsLoading(false)

      }
      else {
        toast.warning("You did not login please login")
        navigate('/government-engineering-college-siwan/student/login')
        setIsContestEventloading(false);
        SetStudentIsLogin(false);
        SetIsLoading(false)
      }
    } catch (error) {
      toast.warning("You did not login please login")
      navigate('/government-engineering-college-siwan/student/login')
      setIsContestEventloading(false);
      SetStudentIsLogin(false);
      SetIsLoading(false)
    }
  }
  const ContestDataShow = async () => {
    try {
      setIsContestLoading(true);
      const res = await fetch(`${baseUrl}/api/contest/data/filter/list/${pathdata[pathdata.length - 1]}`, {
        method: 'GET',
        credentials: 'include'
      })
      if (res.status === 200) {
        const data = await res.json();
        const contestData = data.data
        if (contestData) {
          if (contestData.contest_image?.data) {
            const uint8Array = new Uint8Array(contestData.contest_image.data.data);
            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
            const dataUrl = URL.createObjectURL(blob);
            contestData.contest_image = dataUrl;
          }
          if (contestData.contest_rulebook_Pdf?.data) {
            const uint8Array = new Uint8Array(contestData.contest_rulebook_Pdf.data.data);
            const blob = new Blob([uint8Array], { type: 'application/pdf' });
            const dataUrl = URL.createObjectURL(blob);
            contestData.contest_rulebook_Pdf = dataUrl;
          };
        }
        if (String(Object(contestData)?.contest_Type).toLowerCase() === String("hackathon")) {
          verifydata(contestData);
        } else {
          verifydataStudent();
          SetIsLoading(false);
          setIsContestEventloading(false);
        }
        SetContestData(contestData);
        setIsContestLoading(false);
      } else {
        setIsContestLoading(false);
      }
    } catch (error) {
      setIsContestLoading(false);
    }
  }
  useEffect(() => {
    if (!ContestDatastate) {
      navigate('/government-engineering-college-siwan/contest/lists');
    } else {
      ContestDataShow()
    }
  }, [])


  const PermissionCheck = async () => {
    try {
      SetPermissionLoading(true);
      const res = await fetch(`${baseUrl}/api/permission/contest`, {
        method: 'GET',
        credentials: 'include'
      })
      if (res.status === 200) {
        const data = await res.json();
        // const findData = Array(data?.data?.permission).find((dataIndexFind) => (String(dataIndexFind.permisson_Set_Page_Name).toLowerCase() === String("coding_contest_permission")));
        SetPermission(data.data.permission[0].permisson_Set_Page_On_Off);
        ContestDataShow();
        SetPermissionLoading(false);
      } else {
        SetPermission(false)
        SetPermissionLoading(false);
      }
    } catch (error) {
      SetPermission(false)
      SetPermissionLoading(false);
    }
  }
  useEffect(() => {
    PermissionCheck();
  }, [])
  const ContestStart = () => {
    if (StudentIsLogin) {
      if (String(Object(ContestDatastate)?.contest_Type) === String("coding")) {
        const data = {
          StudentData,
          ContestDatastate
        }
        navigate('/technical/events/coding/contest', { state: data });
      } else if (String(Object(ContestDatastate)?.contest_Type) === String("quiz")) {
        const data = {
          StudentData,
          ContestDatastate
        }
        navigate('/technical/events/quiz/contest', { state: data });
      } else if (String(Object(ContestDatastate)?.contest_Type) === String("hackathon")) {
        if (StudentIsLogin) {
          //ContestRegisterUserVerify(Object(data)?.data?.techk_Shitiz_Id, contestData);
          setprojectSubmitFormActive(!projectSubmitFormActive);
        } else {
          toast.warning("you're not login please login");
        }
        // navigate('/technical/events/quiz/contest', { state: ContestDatastate });
      }
    } else {

      navigate('/government-engineering-college-siwan/student/login')

    }
  }
  const changeProjectSubmitData = (event) => {
    const { project_title, github_repo_link, hosted_project_link } = Object(ProjectSumbitData);
    if (pdf && project_title && github_repo_link && hosted_project_link) {
      SubmitButtonNonActive(true);
    } else {
      SubmitButtonNonActive(false);

    }
    const name = event.target.name;
    const value = event.target.value;
    setProjectSubmitData({ ...ProjectSumbitData, [name]: value });
  }
  if (IsContestLoading || IsLoading || IsContestEventLogin || IsPermissionLoading) {
    return <SchawnnajAnimatedLoader />
  }
  if (IsContestEventLoading) {
    return <SchawnnajAnimatedLoader />
  }
  const onFileHandelChange = (event) => {
    const { project_title, github_repo_link, hosted_project_link } = Object(ProjectSumbitData);
    if (event.target.value) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        if (file.size >= 409600) {
          toast.error('File size below the 400kb');
        }
        else {
          setPdf(file);
        }
        if (file && project_title && github_repo_link && hosted_project_link) {
          SubmitButtonNonActive(true);
        } else {
          SubmitButtonNonActive(false);
        }
      } else {
        toast.error('Only Support image formet');

      }
    }
    if (event.target.value && project_title && github_repo_link && hosted_project_link) {
      SubmitButtonNonActive(true);
    } else {
      SubmitButtonNonActive(false);
    }
  }
  const SubmitProjectDetails = async (event) => {
    setIsLoadingRequest(true);
    event.preventDefault();
    const { project_title, github_repo_link, hosted_project_link, team_member_two_id, team_member_three_id, team_member_four_id } = Object(ProjectSumbitData);
    const { contest_Name, contest_Id, contest_Start_date, contest_End_date, contest_Year, contest_Club_Name, contest_Club_Id, contestUrl_Id, contest_End, contest_Type, ContestModeOnline, contest_EventName, contest_EventId } = Object(ContestDatastate)
    if (pdf && project_title && github_repo_link && hosted_project_link && contest_Name && contest_Id && contest_Start_date && contest_End_date && contest_Year && contest_Club_Name && contest_Club_Id && contestUrl_Id && contest_Type && contest_EventName && contest_EventId && Object(StudentData)?.techk_Shitiz_Id) {
      const project_documentation_pdf = document.querySelector("#project_documentation_pdf");
      try {
        const formData = new FormData();
        formData.append('contest_Name', contest_Name);
        formData.append('contest_Id', contest_Id);
        formData.append('contest_Start_date', contest_Start_date);
        formData.append('contest_End_date', contest_End_date);
        formData.append('contest_Year', contest_Year);
        formData.append('contest_Club_Name', contest_Club_Name);
        formData.append('contest_Club_Id', contest_Club_Id);
        formData.append('contestUrl_Id', contestUrl_Id);
        formData.append('contest_End', contest_End);
        formData.append('contest_Type', contest_Type);
        formData.append('ContestModeOnline', ContestModeOnline);
        formData.append('contest_EventName', contest_EventName);
        formData.append('contest_EventId', contest_EventId);
        formData.append('project_title', project_title);
        formData.append('github_repo_link', github_repo_link);
        formData.append('hosted_project_link', hosted_project_link);
        formData.append('project_documentation_Pdf', pdf);
        formData.append('team_member_one_techkshitiz_Id', Object(StudentData)?.techk_Shitiz_Id);
        formData.append('team_member_two_techkshitiz_Id', team_member_two_id);
        formData.append('team_member_three_techkshitiz_Id', team_member_three_id);
        formData.append('team_member_four_techkshitiz_Id', team_member_four_id);
        const res = await fetch(baseUrl + '/api/v1/student/profile/contest/project/submittion', {
          method: "POST",
          body: formData,
          credentials: 'include',
        })
        if (res.status === 200) {
          setprojectSubmitFormActive(!projectSubmitFormActive);
          setProjectSubmitData({ project_title: "", github_repo_link: "", hosted_project_link: "", team_member_two_id: "", team_member_three_id: "", team_member_four_id: "" });
          if (project_documentation_pdf) {
            Object(project_documentation_pdf).value = ""
          }
          toast.success("Your project details submit sucessfully");
          setIsLoadingRequest(false);
        } else if (res.status === 401) {
          setIsLoadingRequest(false);
          toast.error("Your project details  Already exist");
        } else if (res.status === 402) {
          setIsLoadingRequest(false);
          toast.error("2nd member techkshitiz id invalid");
        } else if (res.status === 403) {
          setIsLoadingRequest(false);
          toast.error("3rd member techkshitiz id invalid");
        } else if (res.status === 408) {
          setIsLoadingRequest(false);
          toast.error("4th member techkshitiz id invalid");
        } else if (res.status === 406) {
          setIsLoadingRequest(false);
          toast.error("1st member techkshitiz id invalid");
        } else if (res.status === 500) {
          toast.error("Some technical issue");
          setIsLoadingRequest(false);
        } else if (res.status === 400) {
          toast.error("All field require");
          setIsLoadingRequest(false);
        } else {
          setIsLoadingRequest(false);
        }

      } catch (error) {
        toast.error("Some technical issue");
        setIsLoadingRequest(false);
      }
    } else {
      toast.warning("All field require");
    }
  }
  if (!Permission) {
    return <>
      <MainHeader />
      <div className='w-[100%] h-[100vh] bg-[#0a1722] flex justify-center items-center '>
        <div className='w-[1400px] p-[26px] max-[1350px]:w-[1000px] max-[1050px]:w-[800px] space-y-10'>
          <h1 className=' uppercase text-[40px] font-[700] max-[1050px]:text-[30px] max-[800px]:text-[25px] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px]  '>We appreciate your participation in the All competition hosted by the TechKshitiz of Gec Siwan</h1>
          <h1 className=' uppercase text-[30px] max-[800px]:text-[25px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[15px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>Thank You 🌻🌻</h1>
        </div>
      </div>
      <MainFooter />
    </>
  }
  return (
    <>
      <section className={`${projectSubmitFormActive ? "flex" : "hidden"} w-full h-[100vh] fixed top-0 left-0 z-50 bg-[#0f1526c0] flex-col justify-center items-center overflow-auto p-7 `}>
        <div className=' w-full h-[100px] p-4 flex justify-end items-center  mt-56 '>
          <span onClick={() => { setprojectSubmitFormActive(!projectSubmitFormActive) }} className="material-symbols-outlined text-[40px] font-[700] cursor-pointer text-[#fff]">
            close
          </span>
        </div>
        <form onSubmit={SubmitProjectDetails} className=' w-[700px] h-[auto] border-2 bg-[#16203a] border-[#131c32]  rounded-[20px]  p-5 flex flex-col justify-start items-center'>
          <h1 className=' text-center text-[40px] font-[700] text-[#fff] uppercase leading-8'>
            <span >Submition</span>
            <br />
            <span className='text-[16px]'>{Object(ContestDatastate)?.contest_Name}</span>
          </h1>
          <div className=" w-full h-[100px] flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">Project Title</span>
            <input type="text" name='project_title' value={Object(ProjectSumbitData)?.project_title} onChange={changeProjectSubmitData} className='border-2 w-full h-[50px] bg-transparent outline-none p-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='project_title' placeholder='Add your project title ' required />
          </div>
          <div className=" w-full h-[100px] flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">2st Member TechKshitiz Id (Optional)</span>
            <input type="text" name='team_member_two_id' value={Object(ProjectSumbitData)?.team_member_two_id} onChange={changeProjectSubmitData} className='border-2 w-full h-[50px] bg-transparent outline-none p-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='team_member_one_id' placeholder='Add your team member two techkshitiz id ' />
          </div>
          <div className=" w-full h-[100px] flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">3rd Member TechKshitiz Id (Optional)</span>
            <input type="text" name='team_member_three_id' value={Object(ProjectSumbitData)?.team_member_three_id} onChange={changeProjectSubmitData} className='border-2 w-full h-[50px] bg-transparent outline-none p-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='team_member_one_id' placeholder='Add your team member three techkshitiz id ' />
          </div>
          <div className=" w-full h-[100px] flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">4th Member TechKshitiz Id (Optional)</span>
            <input type="text" name='team_member_four_id' value={Object(ProjectSumbitData)?.team_member_four_id} onChange={changeProjectSubmitData} className='border-2 w-full h-[50px] bg-transparent outline-none p-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='team_member_four_id' placeholder='Add your team member four techkshitiz id' />
          </div>
          <div className=" w-full h-[100px] mt-2 flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">GitHub Repository Link </span>
            <input type="url" name='github_repo_link' value={Object(ProjectSumbitData)?.github_repo_link} onChange={changeProjectSubmitData} className='border-2 w-full h-[50px] bg-transparent outline-none p-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='github_repo_link' placeholder='Paste your github repository link' required />
          </div>
          <div className=" w-full h-[100px] flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">Live Project Hosted Link</span>
            <input type="url" name='hosted_project_link' value={Object(ProjectSumbitData)?.hosted_project_link} onChange={changeProjectSubmitData} className='border-2 w-full h-[50px] bg-transparent outline-none p-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='hosted_project_link' placeholder='Paste your project live hosted link ' required />
          </div>
          <div className=" w-full h-[100px] flex justify-center items-start flex-col  p-4">
            <span className="text-[18px] text-[#ffffffd1]">Project Documentation Pdf </span>
            <input type="file" onChange={onFileHandelChange} name='project_documentation_pdf' className='border-2 cursor-pointer w-full h-[60px] bg-transparent outline-none p-1 pl-3 mt-1 rounded-[2px]  text-[#ffffffda] border-[#1f2d51] focus:border-[#35466b]' id='project_documentation_pdf' placeholder='Enter your hosted project on any platform link ' required />
          </div>
          <div className={`${IsLoadingRequest ? "hidden" : "flex"} w-full h-[100px]  justify-center items-center   p-4`}>
            <input type="submit" disabled={!submitButtonActive} style={{ transition: 'all 0.6s' }} className={`border-2 w-full h-[50px] bg-transparent outline-none p-1 pl-3 mt-1 rounded-[2px]   border-[#1f2d51] focus:border-[#35466b]   font-[700] ${submitButtonActive ? "hover:bg-[#33f649] cursor-pointer  hover:text-[#0f1526] text-[#ffffff]" : " text-[#ffffff75] cursor-not-allowed"} `} value={"Submit Project"} />
          </div>
          <div className={`${IsLoadingRequest ? "flex" : "hidden"} w-[95%] h-[50px] border-2 rounded-[2px]  gap-3  border-[#1f2d51]  select-none cursor-not-allowed  justify-center items-center   p-4`}>
            <span className='text-[#ffffff86] font-[700]'>Submit Project</span>
            <span className='w-[30px] h-[30px] border-4  animate-spin rounded-full  border-t-[#0f1526]  border-[#fff]'>

            </span>

          </div>
        </form>

      </section>
      <div className=' w-full h-[100vh]'>
        <MainHeader />
        <div className='w-full h-[auto] bg-[#0f1526] p-[20px] flex flex-col justify-start items-center gap-4'>
          <iframe src={Object(ContestDatastate)?.contest_rulebook_Pdf} title='contest_rulebook_Pdf' className='w-[96%] h-[100vh] rounded-[20px]  bg-[#0f1526] '>
            Loading...
          </iframe>
          {
            Object(ContestDatastate)?.contestNote ? (
              <div className=' flex justify-start items-center w-[96%] h-[auto] p-3  pl-0'>
                <h1 className='text-[20px] text-[#fff]'>
                  <b className='text-[#fff]'>Note</b>
                  <b className='text-[#ff1f53]'>*</b>
                  <span>:-</span>
                  <span className=' ml-2'> {Object(ContestDatastate)?.contestNote}</span>
                </h1>
              </div>

            ) : ("")
          }
          <div className='w-full h-[150px] pr-6 flex justify-end items-center'>
            {
              Object(ContestDatastate)?.contestsubmit_form_Mode ? (
                <div onClick={ContestStart} className='w-[160px] gap-2 h-[45px] rounded-[5px] text-[14px] font-[600] hover:bg-[#182d3b]  transition ease-in-out delay-150  border-[#2a4651] text-[#fff] border-[1px] flex justify-center items-center cursor-pointer select-none'>
                  Fill Out Form
                  <span className="material-symbols-outlined animate-pulse text-[#ffdd00]">
                    start
                  </span>
                </div>

              ) : (
                <div onClick={ContestStart} className='w-[160px] gap-2 h-[45px] rounded-[5px] text-[14px] font-[600] hover:bg-[#182d3b]  transition ease-in-out delay-150  border-[#2a4651] text-[#fff] border-[1px] flex justify-center items-center cursor-pointer select-none'>
                  Start Contest
                  <span className="material-symbols-outlined animate-pulse text-[#ffdd00]">
                    start
                  </span>
                </div>

              )
            }

          </div>
        </div>
        <MainFooter />

      </div>
    </>
  );
}

export default ContestDescription;
