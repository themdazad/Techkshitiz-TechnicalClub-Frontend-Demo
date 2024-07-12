import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import HalfLoader from '../../Loader/HalfLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerMcqAnswerSubmitShow() {
    const [mcqQuizContestAnswer, setMcqQuizContestAnswer] = useState<string[]>([]);
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const [Error, SetError] = useState<boolean>(false);
    const [ContestDataLoader, setContestDataLoader] = useState(true);
    const [ContestData, SetContestData] = useState([]);
    const navigate = useNavigate();

    const Answersheetdata = async () => {
        try {
            SetError(false);
            SetIsLoading(true);
            const res = await fetch(baseUrl + '/api/v1/club/manager/auth/participant/question/answer', {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json();
            ContestDataLoad();
            setMcqQuizContestAnswer(data.data);
            SetIsLoading(false);

        } catch (error) {
            SetIsLoading(false);
            SetError(true);
        }

    }

    const ContestDataLoad = async () => {
        setContestDataLoader(true);
        try {
            const res = await fetch(baseUrl + '/api/v1/club/manager/auth/contest/data/show', { method: 'GET', credentials: 'include' });
            const dataContest = await res.json();
            if (dataContest.data) {
                SetContestData(dataContest.data);
            }
            setContestDataLoader(false);
        } catch (error) {
            console.log("Some technical issue");
            setContestDataLoader(false);

        }
    }

    useEffect(() => {
        Answersheetdata();
    }, [])
    if (Error) {
        return <h1>Something went wrong!!</h1>
    }
    const datadelete = async (id) => {
        try {
            const verify = window.confirm("Are you sure to delete data?");
            if (verify) {
                SetIsLoading(true)
                const res = await fetch(`${baseUrl}/api/answer/delete/id/${id}`, { method: 'DELETE', credentials: 'include', });
                if (res.status === 200) {
                    toast.success('Data Deleted sucessfully');
                    Answersheetdata();
                    SetIsLoading(false)


                } else if (res.status === 403) {
                    SetIsLoading(false)
                    toast.error('Some technical issue please reload the page')

                }
            }
        } catch (error) {
            SetIsLoading(false)
            toast.error('Some technical issue' + error);
        }
    }

    const answercopy = async (element) => {
        navigator.clipboard.writeText(element.answer);
        toast.success('Copy Answer');
    }

    if (ContestDataLoader) {
        return <HalfLoader message="Loading..." />
    }
    if (IsLoading) {
        return <HalfLoader />
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(mcqQuizContestAnswer);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'Mcq_Answer.xlsx');
    };
    const ChangeLeaderBoardContestData = (e) => {
        const ContestDataString = e.target.value;
        if (ContestDataString) {
            const ContestDataObject = JSON.parse(ContestDataString)
            navigate(`/club/manager/profile/api/answer/leaderboard?contestId=${ContestDataObject.contest_Id}&contestName=${ContestDataObject.contest_Name}`)
        }
    }

    return (
        <>
            <div className=' w-[100%] h-[30px]  flex justify-center items-center gap-10 '>
                <h1 className=' text-[30px] text-[#1c1b2a] font-[700] uppercase'>Mcq Answer List</h1>
                <button className='w-[150px] h-[40px] border-[1px] border-[#29445c]  bg-[#1f4c59] rounded-[5px] shadow-inner text-[#fff]' onClick={exportToExcel}>Export Excel</button>
                <select name="LeaderBoardContestId" id="LeaderBoardContestId" onChange={ChangeLeaderBoardContestData} className='w-[250px]'>
                    <option value="">Show Leader Board</option>
                    {
                        ContestData.length > 0 ? (
                            ContestData?.map((dataContestFilter) => (
                                <option value={JSON.stringify(Object(dataContestFilter))}>{Object(dataContestFilter)?.contest_Name}</option>
                            ))
                        ) : ("")
                    }
                </select>
            </div>
            <div className='w-[100%] h-[78vh] rounded-[4px]  overflow-auto overflow-x-hidden space-y-4'>

                {/* 
                <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                            <b className='text-[#3fff65]' >Remaining Times : </b><p>{Object(mcqQuizContestAnswer)?.remaining_contest_time[0]} Miniutes {Object(mcqQuizContestAnswer)?.remaining_contest_time[1]} Second {Object(mcqQuizContestAnswer)?.remaining_contest_time[2]} Milliseconds</p>
                        </div> */}
                {mcqQuizContestAnswer ? (
                    mcqQuizContestAnswer?.length <= 0 ? (
                        <>
                            <div className='w-[100%] h-[100%]  flex justify-center items-center '>
                                <div className='w-[90%] h-[auto] flex justify-center items-center  text-[#000] rounded-[6px] p-[20px]'>
                                    <h1 className='text-[40px] font-[600]'>Answer Not Submited!!</h1>
                                </div>
                            </div>
                        </>
                    ) : Object(mcqQuizContestAnswer)?.map((element, index) => (
                        <>
                            <div className='w-[100%] h-[auto]  rounded-[4px]  flex justify-center items-center '>
                                <div className='w-[90%] h-[auto]  bg-[#150f15c4] text-[#fff] rounded-[6px] p-[20px]'>

                                    <div className='w-[100%] h-[auto] flex justify-end items-center gap-4'>

                                        <span className="material-symbols-outlined cursor-pointer text-[#ffffff] font-[500]" onClick={() => { answercopy(Object(element)) }} >
                                            content_copy
                                        </span>
                                        <span className="material-symbols-outlined cursor-pointer text-[#ff5165] font-[500]" onClick={() => { datadelete(Object(element)._id) }}>
                                            delete
                                        </span>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Participant Name : </b><p>{Object(element)?.participant_Name}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >TechKshitiz Id : </b><p>{Object(element)?.techkshitiz_Id}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >College Name : </b><p>{Object(element)?.participant_College_Name}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Admission Year : </b><p>{Object(element)?.participant_Admission_Year}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Event Name : </b><p>{Object(element)?.event_Name}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Event Id : </b><p>{Object(element)?.event_Id}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Event Year : </b><p>{Object(element)?.event_Year}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Event Club Name : </b><p>{Object(element)?.event_Club_Name}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Event Club Id : </b><p>{Object(element)?.event_Club_Id}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Contest Name : </b><p>{Object(element)?.contest_Name}</p>
                                    </div>
                                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                        <b className='text-[#3fff65]' >Contest Id : </b><p>{Object(element)?.contest_Id}</p>
                                    </div>
                                    <div key={index} className='w-[100%] h-[auto] flex justify-start items-start gap-2  '>
                                        <div className=' w-[80px]'><b className='text-[#3fff65]  uppercase'>Answer : </b></div><div className='w-[700px] flex flex-col gap-4 h-[auto] bg-[#07101e] text-[#efefef] p-[30px]  pt-2 rounded-[5px]'>{Object(element).answer.map((answerSubmitData) => (
                                            <div>

                                                <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Question Name : </b><p>{Object(answerSubmitData).questionname}</p>
                                                </div>
                                                <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Question Number : </b><p>{Object(answerSubmitData).questionnumber}</p>
                                                </div>
                                                <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Participant Answer : </b><p>{answerSubmitData.participantAnswer ? answerSubmitData.participantAnswer : "Not Attempt"}</p>
                                                </div>
                                                <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Question Point : </b><p>{Object(answerSubmitData).questionPoint}</p>
                                                </div>
                                                <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Correct Answer : </b><p>{Object(answerSubmitData).mcqanswer}</p>
                                                </div>
                                                <div className='w-[100%] h-[45px] flex justify-end items-center select-none'>

                                                    {
                                                        String(Object(answerSubmitData).participantAnswer).toLowerCase() === String(Object(answerSubmitData).mcqanswer).toLowerCase() ? (
                                                            <div className='gap-[10px]  cursor-default flex justify-center items-center'>
                                                                <p className="text-[#ffffff] font-[500]" >
                                                                    {answerSubmitData?.questionPoint}
                                                                </p>
                                                                <span className="material-symbols-outlined  text-[30px] text-[#27d038] font-[500]" >
                                                                    check
                                                                </span>

                                                            </div>

                                                        ) : (
                                                            Object(answerSubmitData).participantAnswer ? (
                                                                <div className='gap-[10px] cursor-default flex justify-center items-center'>
                                                                    <p className="text-[#ffffff] font-[500]" >
                                                                        {-1}
                                                                    </p>
                                                                    <span className="material-symbols-outlined text-[30px] text-[#ff4534] font-[500]" >
                                                                        dangerous
                                                                    </span>

                                                                </div>
                                                            ) : (
                                                                <div className='gap-[10px] cursor-default flex justify-center items-center'>
                                                                    <p className=" text-[#ffffff] font-[500]" >
                                                                        {0}
                                                                    </p>
                                                                    <span className="material-symbols-outlined text-[30px] text-[#ff4534] font-[500]" >
                                                                        dangerous
                                                                    </span>

                                                                </div>

                                                            )

                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    <div className='w-[100%] h-[100%]  flex justify-center items-center '>
                        <div className='w-[90%] h-[auto] flex justify-center items-center  text-[#000] rounded-[6px] p-[20px]'>
                            <h1 className='text-[40px] font-[600]'>Answer Not Submited!!</h1>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default ClubManagerMcqAnswerSubmitShow
