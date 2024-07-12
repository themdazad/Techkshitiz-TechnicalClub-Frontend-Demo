import React, { useEffect, useState } from 'react'
import Header from '../../Header.tsx'
import CodeEditor from './codeEditor.tsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Timer from '../../../views/Timer.tsx';
import CatrasoAnimationLoading from '../../../Loader/CatrasoAnimationLoading.tsx';
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx';
import Popup from '../Popup/Popup.tsx';
import OutPutTerminal from './OutPutTerminal.tsx';
import { VerifyChange } from '../Popup/Popupchange.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function CodingIde() {
    document.title = "Coding contests Government Engineering College, Siwan ";
    const navigate = useNavigate();
    const [numericalquestion, setnumericalquestion] = useState([]);
    const [Allquestion, setAllquestion] = useState([]);
    const [IsLoadingAttempt, setIsLoading] = useState(false);
    const [IsLoadingRequest, setIsLoadingRequest] = useState(false);
    const [CurrentQuestion, SetCurrentQuestion] = useState(1);
    const [Submit, SetSubmit] = useState(false);
    const [CodeLanguage, SetCodeLanguage] = useState({ language_Select: "cpp" });
    const [miniutes, remainingSeconds] = Timer(JSON.parse(localStorage.getItem('timercoding')) ? JSON.parse(localStorage.getItem('timercoding')).remainingSeconds : 1800)
    // localStorage.setItem("timercoding", JSON.stringify({ remainingSeconds: (miniutes * 60 + remainingSe/conds), name: Object(data).name, userid: Object(data).userid }))
    const Participant_Question_coding_Contest = sessionStorage.getItem('Participant_Question_coding_Contest');



    const numericalquestionfetch = async () => {
        try {
            setIsLoading(true);
            if (Participant_Question_coding_Contest !== null && Participant_Question_coding_Contest !== undefined) {
                const Participant_Question_coding_Contest_Data = JSON.parse(Participant_Question_coding_Contest);
                setAllquestion(Participant_Question_coding_Contest_Data?.data?.questionData)
                if (CurrentQuestion === 1) {
                    setnumericalquestion(Participant_Question_coding_Contest_Data?.data?.questionData[0]);
                }
                setIsLoading(false);
            } else {
                navigate('/coding/participant/login');
                toast.error("Some technical issue Question Data Note Found ");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    const onHandelSubmitData = async (event) => {
        event.preventDefault();
        const userData = sessionStorage.getItem('Coding_Participant_Auth_Data');
        const Participant_Question_coding_Contest = sessionStorage.getItem('Participant_Question_coding_Contest');
        if (((userData !== null) && (Participant_Question_coding_Contest !== null))) {
            if (Submit) {
                event.preventDefault();
                try {
                    const AuthParticipantData = JSON.parse(userData);
                    const Participant_Question_coding_Contest_Data = JSON.parse(Participant_Question_coding_Contest);
                    setIsLoadingRequest(true)
                    const time = [
                        miniutes,
                        remainingSeconds
                    ]
                    const res = await fetch(baseUrl + '/api/coding-contest/api/answer/participant', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: AuthParticipantData.name, year: AuthParticipantData.AdmissionYear, branch: AuthParticipantData.branch, emailid: AuthParticipantData.emailid, userid: AuthParticipantData.userid, answer: Participant_Question_coding_Contest_Data?.data, submittime: time }),
                        credentials: 'include',
                    })
                    if (res.status === 200) {
                        toast.success("Done");
                        setIsLoadingRequest(false)
                    } else if (res.status === 400) {
                        toast.error('Please Select your question !!')
                        setIsLoadingRequest(false)
                    } else if (res.status === 500) {
                        toast.error('This time some technical issue !!')
                        setIsLoadingRequest(false)
                    } else if (res.status === 402) {
                        toast.error(`Contest You  submit!!`)
                        setIsLoadingRequest(false)
                    } else if (res.status === 403) {
                        toast.error('Internal server error please reload the page!!')
                        setIsLoadingRequest(false)

                    }

                } catch (error) {
                    setIsLoadingRequest(false)
                }
            }
        }
    }



    // const verifyQuestion = async (userid) => {
    //     try {
    //         seterror(false);
    //         setIsLoading(true);
    //         const res = await fetch(`${baseUrl}/api/participant/question/answer/total/userid/${userid}`, {
    //             method: 'GET'
    //             credentials: 'include',
    //            
    //         })
    //         if (res.status === 200) {
    //             const fetchdatas = await res.json();
    //             setverifyquestion(fetchdatas);
    //             setIsLoading(false);
    //         } else {

    //             setIsLoading(false);
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //         seterror(true);

    //     }

    // }

    // const AttemptdataShow = async (userid) => {
    //     try {
    //         SetAttemptuserError(false);
    //         setIsLoading(true);
    //         const res = await fetch(`${baseUrl}/api/participant/question/answer/total/userid/${userid}`,{
    // credentials: 'include',
    // })
    //         const datas = await res.json();
    //         SetAttemptdata(datas);
    //         setIsLoading(false);

    //     } catch (error) {
    //         setIsLoading(false);
    //         SetAttemptuserError(true);
    //     }

    // }

    // const formdatasubmit = async (event) => {
    //     const { name, userid } = Object(data);
    //     event.preventDefault();
    //     try {

    //         setIsLoadingRequest(true)
    //         if (getdata.codewrite === '' || getdata.codewrite === ' ' || getdata.codewrite === '_' || getdata.codewrite === '\n') {
    //             toast.error('Please fill the answer then submit the answer!!');
    //             setIsLoadingRequest(false)

    //         } else {
    //             setIsLoadingRequest(true)
    //             const time = [
    //                 miniutes,
    //                 remainingSeconds
    //             ]
    //             const res = await fetch(baseUrl+'/api/coding-contest/api/answer/participant', {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ username: name, userid, questionid: Object(numericalquestion).questionnumber, questionname: Object(numericalquestion).questionname, answer: getdata.codewrite, submittime: time }),
    //                 credentials: 'include',
    //             })
    //             if (res.status === 200) {
    //                 toast.success("Done");
    //                 AttemptdataShow(userid);
    //                 setIsLoadingRequest(false)
    //             } else if (res.status === 400) {
    //                 toast.error('Please Select your question !!')
    //                 setIsLoadingRequest(false)
    //             } else if (res.status === 500) {
    //                 toast.error('This time some technical issue !!')
    //                 setIsLoadingRequest(false)
    //             } else if (res.status === 402) {
    //                 toast.error(`Question number ${Object(numericalquestion).questionnumber} already submit please submit next answer!!`)
    //                 setIsLoadingRequest(false)
    //             } else if (res.status === 403) {
    //                 toast.error('Internal server error please reload the page!!')
    //                 setIsLoadingRequest(false)

    //             }
    //         }
    //     } catch (error) {
    //         setIsLoadingRequest(false)
    //     }
    // }


    // const clickbubbledata = (indexquestion) => {
    //     if (indexquestion === 0) {
    //         SetCurrentQuestion(1)
    //         if (localstoragedata) {
    //             if (localstoragedata[indexquestion] !== null) {
    //                 localstoragedata.forEach((element, index) => {
    //                     if (index === indexquestion) {
    //                         setdata({ codewrite: element.code });
    //                     } else {
    //                         setdata({ codewrite: '' });
    //                     }

    //                 })
    //             } else {
    //                 setdata({ codewrite: '' });
    //             }
    //         }
    //     } else {
    //         SetCurrentQuestion(indexquestion)
    //         if (localstoragedata) {
    //             if (localstoragedata[indexquestion - 1] !== null) {
    //                 localstoragedata.forEach((element, index) => {
    //                     if (index === indexquestion - 1) {
    //                         setdata({ codewrite: element.code });
    //                     } else {

    //                         setdata({ codewrite: '' });
    //                     }

    //                 })
    //             } else {
    //                 setdata({ codewrite: '' });
    //             }
    //         }
    //     }
    //     if (Allquestion) {
    //         Object(Allquestion).forEach((element, index) => {
    //             if (indexquestion === element.questionnumber) {
    //                 setnumericalquestion(element);
    //             }
    //         })
    //     }
    // }


    const clickbubbledata = (Question_Id) => {
        SetCurrentQuestion(Question_Id + 1);
        setnumericalquestion(Allquestion[Question_Id]);
    }

    const Onhandelnextbutton = () => {
        if (CurrentQuestion < Allquestion.length) {
            setnumericalquestion(Allquestion[CurrentQuestion]);
            SetCurrentQuestion(curr => curr + 1);
        }
    }
    const OnhandelPreviewbutton = () => {
        if (CurrentQuestion > 0) {
            setnumericalquestion(Allquestion[CurrentQuestion - 2]);
            SetCurrentQuestion(curr => curr - 1);
        }
    }

    const onResetHandelData = () => {
        const Participant_Question_coding_Contest = sessionStorage.getItem('Participant_Question_coding_Contest');
        if (Participant_Question_coding_Contest !== null && Participant_Question_coding_Contest !== undefined) {
            const Participant_Question_coding_Contest_Data = JSON.parse(Participant_Question_coding_Contest);
            Participant_Question_coding_Contest_Data.data.questionData[CurrentQuestion - 1].code = "//Write a code here \n\n"
            Participant_Question_coding_Contest_Data.data.questionData[CurrentQuestion - 1].Attempt = false
            Participant_Question_coding_Contest_Data.data.questionData[CurrentQuestion - 1].MarkforReview = false
            sessionStorage.setItem('Participant_Question_coding_Contest', JSON.stringify(Participant_Question_coding_Contest_Data))
        }
    }

    const onhandelMarkforreview = () => {
        if (!Object(Allquestion[CurrentQuestion - 1]).MarkforReview) {
            Object(Allquestion[CurrentQuestion - 1]).MarkforReview = true;
            sessionStorage.setItem('Participant_Question_coding_Contest', JSON.stringify(Allquestion))
            Onhandelnextbutton();
        }
    }


    useEffect(() => {
        numericalquestionfetch();
    }, [Participant_Question_coding_Contest])

    // if (AttemptErrorUser) {
    //     navigate('/coding/participant/login')
    // }

    // if (miniutes <= 0 && remainingSeconds <= 0) {
    //     toast.success('Your time is over Quiz Submit');
    //     const logout = async () => {
    //         try {
    //             setIsLoading(true)
    //             const res = await fetch(baseUrl'/api/logout/', { method: 'GET', credentials: 'include',})
    //             if (res.status === 200) {
    //                 if (Object(data).EventSelectParticipant === "quiz") {
    //                     navigate('/coding/contest/end/thanks/message')
    //                     setIsLoading(false)

    //                     return;
    //                 } else if (Object(data).EventSelectParticipant === "coding") {
    //                     navigate('/coding/contest/end/thanks/message')
    //                     setIsLoading(false)
    //                     return;
    //                 }
    //             }
    //         } catch (error) {
    //             setIsLoading(false)
    //         }

    //     }
    //     logout();
    // } 


    const backgroundColorSet = (Question_Data, index) => {
        if ((Number(CurrentQuestion) === Number(index + 1))) {
            return "#dddddd"
        } else {
            if (Question_Data.MarkforReview === true) {
                return "#0c458f"
            }
            else if (Object(Question_Data).Attempt === true) {
                return "green"
            } else {
                return "#9f080884";
            }
        }
    }
    const TextColorSet = (Question_Data, index) => {
        if ((Number(CurrentQuestion) === Number(index + 1))) {
            return "#1f1f1f"
        } else {
            if (Question_Data.MarkforReview === true) {
                return "#fff"
            }
            else if (Object(Question_Data).Attempt === true) {
                return "#fff"
            } else {
                return "#fff";
            }

        }



    }

    const OnCodeLanguageModeChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        SetCodeLanguage({ ...CodeLanguage, [name]: value });
    }

    if (IsLoadingAttempt) {
        return <CatrasoAnimationLoading />
    }
    if (IsLoadingRequest) {
        return <SchawnnajAnimatedLoader />
    }

    const outputTerminalButton = () => {
        const outputTerminal = document.querySelector('#outputTerminal');
        if (outputTerminal?.classList.contains('left-[-100%]')) {
            outputTerminal?.classList.remove('left-[-100%]');
            outputTerminal?.classList.add('left-[0%]');

        } else {
            outputTerminal?.classList.remove('left-[0%]');
            outputTerminal?.classList.add('left-[-100%]');
        }
    }
    const outputCompileTerminalButton = () => {
        const outputTerminal = document.querySelector('#outputTerminal');
        if (outputTerminal?.classList.contains('left-[-100%]')) {
            outputTerminal?.classList.remove('left-[-100%]');
            outputTerminal?.classList.add('left-[0%]');

        }
    }


    const AuthParticipant = sessionStorage.getItem('Coding_Participant_Auth_Data');
    if (AuthParticipant !== null && AuthParticipant !== undefined) {
        const AuthParticipantData = JSON.parse(AuthParticipant);
        if (AuthParticipantData.StudentData.techk_Shitiz_Id) {
            return (
                <>
                    <div className='w-[100%] h-[100vh] bg-[#292424] m-auto overflow-x-hidden '>
                        <Header verify={!AuthParticipantData.AuthUser} image={AuthParticipantData.avtar_profile} datas={AuthParticipantData} />
                        <Popup SetSubmit={SetSubmit} setIsLoadingRequest={setIsLoadingRequest} time={[miniutes, remainingSeconds]} title="End Contest!" bgcolor="green" btn1="Re Check" btn2="Submit" message="Are you absolutely sure you want to proceed with submitting your coding contest entry? Once submitted, changes cannot be made. Take a moment to review before finalizing. Thank you for your participation and good luck" />
                        <div id='form' onSubmit={onHandelSubmitData} className='w-[100%] h-[83.8%] absolute  select-none bg-[#292424]'>
                            <div className='w-[100%] h-[60px] bg-slate-300 flex justify-center items-center '>
                                <div className='w-[40%] h-[100%] flex justify-center border-r-[1px] border-[#dedede] bg-[#545151] items-center'>
                                    <div className='w-[90%] h-[100%] flex justify-start items-center  cursor-default text-[#fff] gap-2'><h1 className=' text-[25px] font-[700] text-[#00ee83]'>CONTEST TYPE : </h1>
                                        <h1 className='text-[25px] font-[700] text-[#cdf8ff]  '>CODING</h1>
                                    </div>
                                </div>
                                <div className=' w-[60%] h-[100%] bg-[#545151] flex justify-center items-center'>
                                    <div className=' w-[80%] h-[100%] flex justify-between items-center '>

                                        <div className=' text-[#fff] w-[150px] h-[26px] flex justify-center items-center  gap-2'>
                                            <select name="language_Select" value={Object(CodeLanguage).language_Select} className=' bg-[#535151] border-[2px] border-[#737373]  w-[200px]  p-[10px] cursor-pointer' id="language_Select" onChange={OnCodeLanguageModeChange}>
                                                <option className='' value="cpp">C++</option>
                                                <option value="c">C</option>
                                                <option value="java">Java</option>
                                                <option value="py">Python</option>
                                            </select>
                                        </div>
                                        <div className=' text-[#fff] w-[250px] h-[26px] flex justify-center items-center  gap-2'>
                                            <span className="material-symbols-outlined  text-[#fff] ">
                                                alarm_on
                                            </span>
                                            <p>{miniutes > 9 ? miniutes : '0' + miniutes} : {remainingSeconds > 9 ? remainingSeconds : '0' + remainingSeconds}  : Left</p>
                                        </div>
                                        <div className=' flex gap-2'>
                                            <div className='text-[#fff] flex justify-end items-center w-[100px]  h-[auto] gap-1'>
                                                <button type="submit" onClick={outputCompileTerminalButton} className='flex justify-center text-[12px] font-[600] cursor-pointer gap-1 items-center bg-[#2a86a7]    p-[8px] w-[150px] h-[34px] text-[#fffffff7] rounded-[5px]'>Compile & Run</button>
                                            </div>
                                            <div className='text-[#fff] flex justify-center items-center w-[140px]  h-[auto]'>
                                                <button type="submit" onClick={outputCompileTerminalButton} className='flex justify-center text-[12px] font-[600] cursor-pointer gap-1 items-center bg-[#238825]    p-[8px] w-[120px] h-[34px] text-[#fffffff7] rounded-[5px]'>Run All Test Case</button>
                                            </div>
                                            <div className=' text-[#fff] flex justify-end items-center w-[100px]  h-[auto] gap-1'>
                                                <button type="submit" onClick={VerifyChange} className='flex justify-center text-[14px] cursor-pointer gap-1 items-center bg-[#ecd13c]  h-[34px]  font-[600]  p-[8px] w-[100px] text-[#535151] rounded-[5px]'>Contest End</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100%] h-[90%] flex  justify-center items-start'>
                                <div className=' w-[40%] h-[100%] bg-[#0a0e0f] text-[#a5a5a5] '>
                                    <div className=' relative w-[100%] border-r-[1px] h-[100%]   text-[#dedede] '>
                                        <div className=' w-[96%] h-[30%] flex justify-center items-center '>

                                            <div className='w-[94%] h-[124px] p-[6px] pl-[15px] pb-[10px] overflow-hidden bg-[#1f1f1f] rounded-[8px]   '>
                                                {
                                                    Allquestion.map((Question_Data, index) => (
                                                        <div style={{ backgroundColor: backgroundColorSet(Question_Data, index), color: TextColorSet(Question_Data, index) }} key={index} id={"verify" + index + 1} onClick={() => { clickbubbledata(index) }} className={` w-[50px] h-[50px] rounded-[50%] bg-[#dddddd] p-[4px] cursor-pointer text-[#1f1f1f]    transform ease-in-out delay-200 mt-[6px] mr-[10px] flex justify-center items-center font-[700]  float-left`}>{index + 1}</div>
                                                    ))
                                                }
                                            </div>
                                        </div>


                                        <div className=' w-[96%] pl-[24px] pr-[20px] h-[70%] bg-[#0a0e0f] text-[#a5a5a5] pb-[20px] overflow-y-auto overflow-x-hidden '>
                                            <div className='w-[100%] h-[auto] flex flex-col'>
                                                <h1 className=' text-[24px] font-[600] flex gap-1 text-[#e9e9ea] cursor-default whitespace-pre-line '>
                                                    {Object(numericalquestion)?.question_Title}
                                                    <span className="material-symbols-outlined text-[24px] cursor-pointer  flex justify-start items-center">
                                                        bookmark
                                                    </span>
                                                </h1>
                                                <div className=' pt-[10px] pb -[10px]  p-0 pr-0 flex gap-10 justify-start items-center'>
                                                    <span className='text-[green] font-[600] text-[16px] capitalize'>
                                                        {Object(numericalquestion)?.question_label}
                                                    </span>
                                                    <span className=' text-[#a5a5a5] text-[14px] capitalize flex gap-1'>
                                                        <span>Accuracy:</span>
                                                        <span>2{CurrentQuestion}.5{CurrentQuestion}%</span>
                                                    </span>
                                                    <span className=' text-[#a5a5a5] text-[14px] capitalize flex gap-1'>
                                                        <span>Submissions:</span>
                                                        <span>1.{CurrentQuestion * 2}K</span>
                                                    </span>
                                                    <span className=' text-[#a5a5a5] text-[14px] capitalize flex gap-1'>
                                                        <span>Points:</span>
                                                        <span>{Object(numericalquestion)?.question_Point}</span>
                                                    </span>
                                                </div>
                                                <hr className='w-[100%] border-[#161a1b] h-[10px] border-t-[2px] pb-[4px] pt-[4px] mt-4' />
                                            </div>
                                            <div className='w-[100%] h-[auto] flex flex-col mt-1'>
                                                {/* <div className='w-[6%] h-[100%] flex justify-center '>
                                                        <h1 className=' text-[18px] cursor-default font-[700]'>{CurrentQuestion}.</h1>
                                                    </div> */}
                                                <div className={` w-[100%] h-[auto] flex`}>
                                                    <h1 className=' text-[16px] leading-[34px] font-[400] cursor-default whitespace-pre-line '>
                                                        {Object(numericalquestion)?.questionname}
                                                    </h1>
                                                </div>
                                                <div className={`${Object(numericalquestion)?.answer_Find ? "flex" : "hidden"} w-[100%] h-[auto] flex mt-10`}>
                                                    <h1 className=' text-[16px] leading-[34px] font-[400] cursor-default whitespace-pre-line '>
                                                        {Object(numericalquestion)?.answer_Find}
                                                    </h1>
                                                </div>
                                                <div className={`${Object(numericalquestion)?.example_One ? "flex" : "hidden"} w-[100%] h-[auto] mt-[20px]  flex-col gap-6`}>
                                                    <span className='text-[17px] font-[700]'>Example 1:</span>
                                                    <div className='w-[100%] h-[auto] p-[20px]  bg-[#252525] rounded-[5px] border-[2px] border-[#413e3e]'>
                                                        <h1 className=' text-[16px] leading-[34px] font-[500] cursor-default whitespace-pre-line '>
                                                            {Object(numericalquestion)?.example_One}
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className={`${Object(numericalquestion)?.example_Two ? "flex" : "hidden"} w-[100%] h-[auto] mt-[20px]  flex-col gap-6 mb-4`}>
                                                    <span className='text-[17px] font-[700]'>Example 2:</span>
                                                    <div className='w-[100%] h-[auto] p-[20px]  bg-[#252525] rounded-[5px] border-[2px] border-[#413e3e]'>
                                                        <h1 className=' text-[16px] leading-[34px] font-[500] cursor-default whitespace-pre-line '>
                                                            {Object(numericalquestion)?.example_Two}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <OutPutTerminal CodeLanguage={CodeLanguage} AllQuestion={Allquestion} CurrentQuestion={CurrentQuestion} />
                                    </div>

                                </div>
                                <div className=' w-[60%] h-[100%] bg-[#0e0e13] '>
                                    <div className=' w-[100%] text-[#fff]  h-[100%] flex justify-center items-center'>
                                        <CodeEditor CurrentQuestion={CurrentQuestion} Allquestion={Allquestion} />
                                    </div>
                                </div>

                            </div>
                            <div className=' w-[100%] z-40 h-[10%] bg-[#777777] flex justify-center items-center'>
                                <button onClick={outputTerminalButton} type='button' className={`${" text-[#070f27cc] font-[900] cursor-pointer"} flex relative right-[21%]  text-[40px]  justify-center gap-1 items-center`}>
                                    <span className="material-symbols-outlined text-[25px]  " >
                                        terminal
                                    </span>

                                </button>
                                <div className=' w-[800px] h-[100%] flex  justify-between items-center  '>
                                    <button disabled={CurrentQuestion <= 1} onClick={OnhandelPreviewbutton} type='button' className={`${CurrentQuestion <= 1 ? "text-[#b0b0b0cc] cursor-not-allowed bg-[#525252]" : "bg-[#11283a] text-[#fffc] cursor-pointer"} flex  text-[14px]  justify-center gap-1 items-center  p-[8px] w-[110px] rounded-[5px]`}>
                                        <span className="material-symbols-outlined text-[15px]  " >
                                            arrow_back_ios
                                        </span>
                                        BACK
                                    </button>

                                    <button type='button' onClick={onhandelMarkforreview} className='flex text-[14px] cursor-pointer justify-center gap-1 items-center bg-[#2e4eda] p-[8px] w-[220px] text-[#fffe] rounded-[5px]'>
                                        MARK FOR REVIEW & NEXT
                                    </button>

                                    <button type='reset' onClick={onResetHandelData} className='flex justify-center text-[14px] cursor-pointer gap-1 items-center bg-[#11283ad8] border-[1px] border-[#163d50cc] p-[8px] w-[110px] text-[#fffc] rounded-[5px]'>
                                        CLEAR
                                    </button>
                                    <button type='button' disabled={CurrentQuestion >= Allquestion.length} onClick={Onhandelnextbutton} className={`${CurrentQuestion >= Allquestion.length ? "text-[#b0b0b0cc] cursor-not-allowed bg-[#525252]" : "bg-[#11283a] text-[#fffc] cursor-pointer"} flex  text-[14px] justify-center gap-1 items-center  p-[8px] w-[110px] rounded-[5px]`}>
                                        NEXT
                                        <span className="material-symbols-outlined  text-[15px]  " >
                                            arrow_forward_ios
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )

        }
    } else {
        navigate('/coding/participant/login');
    }


}

export default CodingIde




