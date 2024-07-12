import React, { useEffect, useState } from 'react'
import Timer from '../../../views/Timer.tsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function McqSolvePage(props) {
    const navigate = useNavigate();
    const timerLocalStroage = localStorage.getItem('timer');
    const [IsLoadingData, SetIsLoadingData] = useState<boolean>(false);
    const [clickEvent, SetClickEvent] = useState<number>(1);
    const [miniutes, remainingSeconds] = Timer(timerLocalStroage !== null ? JSON.parse(timerLocalStroage).remainingSeconds : 1800)
    const [McqQuestion, SetMcqQuestion] = useState<string[]>([])
    const [McqQuestionOption, SetMcqQuestionOptions] = useState<string[]>([])
    const [data, setdata] = useState([]);
    const [answer, setanswer] = useState('')
    const [GetPage, SetPage] = useState<number>(1)
    const [GetButtonCount, SetButtonCount] = useState<number>(1)
    const [GetSaveQuestion, SetSaveQuestion] = useState<string[]>([]);
    const [questionAttemptCount, SetQuestionAttemptCount] = useState(0);

    const mcqquestionsetfun = async () => {
        const McqData = localStorage.getItem('Mcq_Question');
        if (McqData === '') {
            navigate("");
        }
        else if (McqData !== null) {
            const McqDataobject = JSON.parse(McqData);
            if (McqDataobject?.data) {
                setdata(McqDataobject?.data?.questionData);
                SetMcqQuestion(McqDataobject?.data?.questionData[clickEvent - 1])
                SetMcqQuestionOptions(McqDataobject?.data?.questionData[clickEvent - 1].options)
            }
        } else {
            navigate("");
        }
    }
    useEffect(() => {
        const QuizDataAndUserDataFetch = localStorage.getItem("Auth_participant_Data");
        const QuizQuestionDataFetch = localStorage.getItem("Mcq_Question");
        if (!QuizDataAndUserDataFetch && !QuizQuestionDataFetch) {
            navigate("government-engineering-college-siwan/contest/lists");
        }
        if (QuizQuestionDataFetch) {
            const QuizQuestionData = JSON.parse(QuizQuestionDataFetch);
            if (QuizQuestionData?.data?.questionData.length <= 0) {
                toast.warning("Question are not set please wait");
                navigate("/government-engineering-college-siwan/contest/lists");
            }
        }
        mcqquestionsetfun();
    }, [])

    localStorage.setItem("timer", JSON.stringify({ remainingSeconds: (miniutes * 60 + remainingSeconds) }))
    const AuthParticipant = localStorage.getItem('Auth_participant_Data');
    useEffect(() => {
        document.addEventListener('paste', (event) => {
            event.preventDefault();
        })
        document.addEventListener('copy', (event) => {
            event.preventDefault();
        })
        if (miniutes <= 0 && remainingSeconds <= 0) {
            toast.success('Your time is over quiz contest submited');
            timeOutAutoSubmit();
            const logout = async () => {
                try {
                    SetIsLoadingData(true)
                    const res = await fetch(baseUrl + '/api/logout/', { method: 'GET', credentials: 'include' })
                    if (res.status === 200) {
                        localStorage.removeItem('Auth_participant_Data')
                        if (props.datas.EventSelectParticipant === "quiz") {
                            localStorage.removeItem('Mcq_Question');
                            localStorage.removeItem('timer');
                            localStorage.removeItem('Auth_participant_Data');
                            navigate('/quiz/contest/end/thanks/message')
                            SetIsLoadingData(false)

                            return;
                        } else if (props.datas.EventSelectParticipant === "coding") {
                            localStorage.removeItem('Mcq_Question');
                            localStorage.removeItem('timer');
                            localStorage.removeItem('Auth_participant_Data');
                            navigate('/quiz/contest/end/thanks/message')
                            SetIsLoadingData(false)
                            return;
                        }

                    }
                } catch (error) {
                    SetIsLoadingData(false);
                }

            }
            logout();
        }
        if (AuthParticipant) {
            const AuthParticipantData = JSON.parse(AuthParticipant);
            if (!AuthParticipantData?.StudentData?.techk_Shitiz_Id) {
                navigate("/government-engineering-college-siwan/contest/lists");
            }
        } else {
            navigate("/government-engineering-college-siwan/contest/lists");
        }
        mcqquestionsetfun();
    }, [AuthParticipant, miniutes === 0 && remainingSeconds === 0])

    const clickdata = (indexquestion) => {
        SetClickEvent(indexquestion);
        SetPage(indexquestion);
        SetButtonCount(indexquestion)
        if (data) {
            data.forEach((element) => {
                if (Number(indexquestion) === Number(Object(element).questionnumber)) {
                    SetMcqQuestion(element);
                    SetMcqQuestionOptions(Object(element).options)
                }
            })
        }
    }

    const timeOutAutoSubmit = async () => {
        try {
            SetIsLoadingData(true)
            const QuizDataAndUserDataFetch = localStorage.getItem("Auth_participant_Data");
            const QuizQuestionDataFetch = localStorage.getItem("Mcq_Question");
            if (QuizDataAndUserDataFetch && QuizQuestionDataFetch) {
                const QuizDataAndUserData = JSON.parse(QuizDataAndUserDataFetch);
                const QuizQuestionData = JSON.parse(QuizQuestionDataFetch);
                const { contest_Id, contest_Name, event_Club_Id, event_Club_Name, event_Id, event_Name } = QuizQuestionData.data;
                const { techk_Shitiz_Id, participant_Name, participant_College_Name, participant_Branch, participant_Admission_Year } = QuizDataAndUserData.StudentData;
                const res = await fetch(baseUrl + '/api/v1/student/profile/quiz/contest/answer/submittion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ contest_Id, contest_Name, event_Club_Id, event_Club_Name, event_Id, event_Name, answer: data, techkshitiz_Id: techk_Shitiz_Id, participant_Name, participant_branch_Name: participant_Branch, participant_College_Name, participant_Admission_Year, remaining_contest_time: [miniutes, remainingSeconds] }),
                    credentials:'include'
                })
                if (res.status === 200) {
                    toast.success("You quiz contest submit sucessfully");
                    localStorage.removeItem('Auth_participant_Data');
                    localStorage.removeItem('timer');
                    localStorage.removeItem('Mcq_Question');
                    SetIsLoadingData(false)
                    navigate('/quiz/contest/end/thanks/message')

                } else if (res.status === 401) {
                    toast.error("You're already submited this quiz contest");
                    SetIsLoadingData(false)
                }
            } else {
                toast.warning("Some technical issue Try after sum time");
                SetIsLoadingData(false)
            }
        } catch (error) {
            console.log('Some technical issue');
            SetIsLoadingData(false)

        }
    }
    const SubmitFormData = async (event) => {
        event?.preventDefault();
        const Permission = window.confirm("Are you sure to submit the quiz contest");
        if (Permission) {
            try {
                SetIsLoadingData(true)
                const QuizDataAndUserDataFetch = localStorage.getItem("Auth_participant_Data");
                const QuizQuestionDataFetch = localStorage.getItem("Mcq_Question");
                if (QuizDataAndUserDataFetch && QuizQuestionDataFetch) {
                    const QuizDataAndUserData = JSON.parse(QuizDataAndUserDataFetch);
                    const QuizQuestionData = JSON.parse(QuizQuestionDataFetch);
                    const { contest_Id, contest_Name, event_Club_Id, event_Club_Name, event_Id, event_Name } = QuizQuestionData.data;
                    const { techk_Shitiz_Id, participant_Name, participant_College_Name, participant_Branch, participant_Admission_Year } = QuizDataAndUserData.StudentData;
                    const res = await fetch(baseUrl + '/api/v1/student/profile/quiz/contest/answer/submittion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ contest_Id, contest_Name, event_Club_Id, event_Club_Name, event_Id, event_Name, answer: data, techkshitiz_Id: techk_Shitiz_Id, participant_Name, participant_branch_Name: participant_Branch, participant_College_Name, participant_Admission_Year, remaining_contest_time: [miniutes, remainingSeconds] }),
                        credentials:'include'
                    })
                    if (res.status === 200) {
                        toast.success("You quiz contest submit sucessfully");
                        localStorage.removeItem('Auth_participant_Data');
                        localStorage.removeItem('timer');
                        localStorage.removeItem('Mcq_Question');
                        SetIsLoadingData(false)
                        navigate('/quiz/contest/end/thanks/message')

                    } else if (res.status === 401) {
                        toast.error("You're already submited this quiz contest");
                        SetIsLoadingData(false)
                    }
                } else {
                    toast.warning("Some technical issue Try after sum time");
                    SetIsLoadingData(false)
                }
            } catch (error) {
                console.log('Some technical issue');
                SetIsLoadingData(false)

            }
        }
    }

    useEffect(() => {
        SetClickEvent(GetPage);
        clickdata(GetPage)
    }, [GetPage])
    const dataSend = (event) => {
        setanswer(event.target.value)
    }
    const OnQuestionAnswerSaveHandel = (event) => {
        event.preventDefault();
        const QuizQuestionDataFetch = localStorage.getItem("Mcq_Question");
        if (QuizQuestionDataFetch) {

            if (answer !== '') {
                data.forEach((element) => {
                    if (Object(element).questionnumber === Object(McqQuestion).questionnumber) {
                        Object(McqQuestion).Submit = true;
                        if (data.length > questionAttemptCount) {
                            SetQuestionAttemptCount(prev => prev + 1);
                        }
                    }
                })
                if (GetSaveQuestion.length > 0) {
                    const filterData = GetSaveQuestion.find(obj => Number(Object(obj).questionnumber) === Number(Object(McqQuestion).questionnumber));
                    if (filterData === undefined) {
                        SetSaveQuestion(current => [...current, Object(McqQuestion)])
                    }
                } else {
                    SetSaveQuestion(current => [...current, Object(McqQuestion)])
                }
                const QuizQuestionData = JSON.parse(QuizQuestionDataFetch);
                QuizQuestionData.data.questionData = data;
                localStorage.setItem("Mcq_Question", JSON.stringify(QuizQuestionData));
                OnNextHandel();
            } else {
                toast.warning("Select Option then save ");
            }
        } else {
            toast.warning("Some technical issue Try after sum time");
        }
    }

    const RatioButtonSelected = () => {
        let radioButtons = document.querySelectorAll('input[type="radio"][name="answer"]');
        radioButtons.forEach(function (radioButton) {
            Object(radioButton).checked = false;
        });
        setanswer('');
    }
    const OnPreviewsHandel = () => {
        if (GetPage > 1) {
            RatioButtonSelected();
            SetButtonCount(prevState => prevState - 1)
            SetPage(GetPage - 1);
        }
        if (answer !== '') {
            data.forEach((element) => {
                if (Object(element).questionnumber === Object(McqQuestion).questionnumber) {
                    Object(McqQuestion).Submit = true;
                }
            })
            if (GetSaveQuestion.length > 0) {
                const filterData = GetSaveQuestion.find(obj => Number(Object(obj).questionnumber) === Number(Object(McqQuestion).questionnumber));
                if (filterData === undefined) {
                    SetSaveQuestion(current => [...current, Object(McqQuestion)])
                }
            } else {
                SetSaveQuestion(current => [...current, Object(McqQuestion)])
            }

        }
    }
    const OnNextHandel = () => {
        if (GetPage < data.length) {
            RatioButtonSelected();
            SetPage(GetPage + 1);

        }
        // if (GetPage <= data.length) {
        //     SetButtonCount(prevState => prevState + 1)
        // }
        if (answer !== '') {
            data.forEach((element) => {
                if (Object(element).questionnumber === Object(McqQuestion).questionnumber) {
                    Object(McqQuestion).Submit = true;
                }
            })
            if (GetSaveQuestion.length > 0) {
                const filterData = GetSaveQuestion.find(obj => Number(Object(obj).questionnumber) === Number(Object(McqQuestion).questionnumber));
                if (filterData === undefined) {
                    SetSaveQuestion(current => [...current, Object(McqQuestion)])
                }
            } else {
                SetSaveQuestion(current => [...current, Object(McqQuestion)])
            }

        }
    }
    const RatioInputChange = (index) => {
        Object(McqQuestionOption).forEach((element) => {
            if (index === element.id) {
                Object(element).Select = true
            } else {
                Object(element).Select = false

            }
        })
    }
    const ResetHandel = () => {
        const checkboxFind = data.find((obj) => Object(obj).questionnumber === Object(McqQuestion).questionnumber)
        if (checkboxFind) {
            Object(McqQuestion).Submit = false;
            if (answer !== '') {
                if (questionAttemptCount > 0) {
                    SetQuestionAttemptCount(prev => prev - 1);
                }
            }
            setanswer('');
        }
        McqQuestionOption.forEach((element, index) => {
            Object(element).Select = false
            setanswer('')
        })
        const QuizQuestionDataFetch = localStorage.getItem("Mcq_Question");
        if (QuizQuestionDataFetch) {
            const QuizQuestionData = JSON.parse(QuizQuestionDataFetch);
            QuizQuestionData.data.questionData = data;
            localStorage.setItem("Mcq_Question", JSON.stringify(QuizQuestionData));
        }
    }
    const SetBgColor = (bubbleData, index) => {
        console.log(bubbleData);

        if (index + 1 === clickEvent) {
            return "#444f55"
        } else {

            return Object(bubbleData).Submit === true ? "green" : "#81080892"
        }
    }
    if (IsLoadingData) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>
            <form id='form' onSubmit={SubmitFormData} className='w-[100%] h-[92%] select-none  overflow-hidden bg-[#292424]'>
                <div className=' w-[100%]  h-[90%] flex justify-center items-center ' >
                    <div className=' w-[40%] h-[100%]  '>
                        <div className='w-[100%] h-[10%] flex justify-center border-r-[1px] border-[#b8b8b8] bg-[#545151] items-center'>
                            <div className='w-[90%] h-[100%] flex justify-start items-center  cursor-default text-[#fff] gap-2'><h1 className=' text-[25px] font-[700] text-[#7dff4e]'>QUESTION TYPE : </h1> <h1 className='text-[25px] font-[700]'>MCQ</h1>
                            </div>
                        </div>
                        <div className=' w-[100%] border-r-[1px] p-[20px] h-[90%]   text-[#fff] '>
                            <div className=' w-[96%] h-[auto] flex justify-center items-center '>

                                <div className='w-[100%] h-[auto] p-[6px] pb-[10px] bg-[#171414d5] border-[2px] border-[#1d1818d3] rounded-[8px]   '>
                                    {data.map((element, index) => (
                                        <div key={index} onClick={() => { clickdata(index + 1) }} style={{ backgroundColor: SetBgColor(element, index) }} className=' w-[45px] h-[45px] rounded-[50%] bg-[#81080892] text-[#fff] p-2 cursor-pointer   transform ease-in-out delay-200 mt-[6px] mr-[10px] flex justify-center items-center font-[700]  float-left'>{index + 1}</div>
                                    ))
                                    }
                                </div>
                            </div>
                            <div className='mt-[10px]   w-[96%] h-[70%] overflow-y-auto overflow-x-hidden space-y-4 select-none'>

                                <div className='w-[98%] h-[auto] ml-[10px] p-[2px] flex'>
                                    <p className=' text-[18px] cursor-default font-[700] whitespace-pre-line'>
                                        <span className='text-[#cbe4fa]'>{clickEvent}.</span>

                                        <span className=' ml-2 text-[16px] h-[auto]  font-[500] text-[#ffffffbe] cursor-default  select-none  whitespace-pre-line'>{Object(McqQuestion).questionname}</span>
                                        .</p>


                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=' w-[60%] h-[100%] bg-[#0e0e13] '>
                        <div className=' w-[100%] h-[10%] bg-[#545151] flex justify-center items-center'>
                            <div className=' w-[60%] h-[100%] flex justify-end items-center '>
                                <div className=' text-[#fff] w-[250px] h-[26px] flex justify-center items-center  gap-2'>
                                    <span className="material-symbols-outlined  text-[#fff] ">
                                        alarm_on
                                    </span>
                                    <p>{miniutes > 9 ? miniutes : '0' + miniutes} : {remainingSeconds > 9 ? remainingSeconds : '0' + remainingSeconds}  : Remaining times</p>
                                </div>
                                <div className=' ml-[40px] gap-8 text-[#fff] flex  justify-end items-center w-[260px]  h-[auto]'>
                                    {/* <p className=' text-[18px] font-[700] text-[#45ff51]'>{totalsubmition}</p> */}
                                    {/* <p className='text-[18px] font-[700]'>/</p> */}
                                    <p className=' text-[18px] font-[700] text-[#45ff51]'>
                                        <span>{questionAttemptCount}</span>
                                        <span>/</span>
                                        <span>{data.length}</span>
                                    </p>
                                    <button type="submit" className='flex justify-center text-[14px] cursor-pointer gap-1 items-center bg-[#1e9320] p-2 w-[80px] text-[#0f2330f7] font-[700] rounded-[5px]'>End</button>
                                </div>
                            </div>
                        </div>
                        <div className=' w-[100%] h-[90%]  flex justify-center items-center'>
                            <div className='w-[100%] h-[90%] flex justify-center items-center'>
                                <div className=' w-[80%] h-[auto] rounded-[10px] shadow-inner border-[1px] border-[#243152] bg-[#0a131c] p-[10px] pt-[16px] pl-[26px] pb-[26px]'>
                                    <h1 className=' text-[#cecece] w-[98%] h-[auto] text-[18px] font-[700]'>Options: <span className='ml-[10px] text-[#bababaef] text-[16px] font-[600]'> Pick one correct answer from below</span></h1>
                                    {
                                        Object(McqQuestionOption).map((element, index) => (
                                            <div key={index} className={`${element.Select === true ? 'border-[#284156]' : ''} w-[98%] hover:border-[#284156] cursor-pointer h-[45px] border-[2px] border-[#132534] mt-4 rounded-[5px] p-[10px] pl-[20px] flex items-center justify-start gap-2`}>
                                                <label htmlFor={`option${index}`} className=' w-[100%]  h-[45px] text-[#cfcfcfef] cursor-pointer flex items-center justify-start gap-2'>
                                                    <input type='radio' checked={element.Select} onChange={() => RatioInputChange(index + 1)} name='answer' id={`option${index}`} onClick={dataSend} value={element[`option${index + 1}`]} /><p>{element[`option${index + 1}`]}</p>

                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-[100%] h-[10%] bg-[#777777] flex justify-center items-center'>
                    <div className=' w-[700px] h-[100%] flex  justify-between items-center  '>
                        <button disabled={GetPage <= 1} type='button' onClick={OnPreviewsHandel} className={`${GetPage <= 1 ? "text-[#b0b0b0cc] cursor-not-allowed bg-[#525252]" : "bg-[#11283a] text-[#fffc] cursor-pointer"} flex  text-[14px]  justify-center gap-1 items-center  p-[8px] w-[110px] rounded-[5px]`}>
                            <span className="material-symbols-outlined text-[15px]  " >
                                arrow_back_ios
                            </span>
                            BACK
                        </button>

                        {/* <button type='button' className='flex text-[14px] cursor-pointer justify-center gap-1 items-center bg-[#2e4eda] p-[8px] w-[220px] text-[#fffe] rounded-[5px]'>
                            MARK FOR REVIEW & NEXT
                        </button> */}

                        <button type='reset' onClick={ResetHandel} className='flex justify-center text-[14px] cursor-pointer gap-1 items-center bg-[#11283ad8] border-[1px] border-[#163d50cc] p-[8px] w-[110px] text-[#fffc] rounded-[5px]'>
                            CLEAR
                        </button>
                        {
                            GetButtonCount >= data.length + 1 ? (<button type="submit" className='flex justify-center text-[14px] cursor-pointer gap-1 items-center bg-[#1e9320] p-[8px] w-[110px] text-[#fffffff7] rounded-[5px]'>Submit</button>) : (
                                <button type="button" onClick={OnQuestionAnswerSaveHandel} className='flex justify-center text-[14px] cursor-pointer gap-1 items-center bg-[#1e9320] p-[8px] w-[110px] text-[#fffffff7] rounded-[5px]'>SAVE & NEXT</button>
                            )
                        }

                        <button type='button' onClick={OnNextHandel} className={`${GetButtonCount >= data.length ? "text-[#b0b0b0cc] cursor-not-allowed bg-[#525252]" : "bg-[#11283a] text-[#fffc] cursor-pointer"} flex  text-[14px] justify-center gap-1 items-center  p-[8px] w-[110px] rounded-[5px]`}>
                            NEXT
                            <span className="material-symbols-outlined  text-[15px]  " >
                                arrow_forward_ios
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default McqSolvePage
