import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HalfLoader from '../../../Loader/HalfLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
const ClubManagerLeaderBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const data = Object.fromEntries(params.entries());
    const [LeaderBoardData, SetLeaderBoardData] = useState([]);
    const [IsLoader, setIsLoader] = useState(true);
    const [leaderBoardParticipantDataView, setleaderBoardParticipantDataView] = useState([]);
    const [leaderViewActive, setleaderBoardViewActive] = useState(false);

    const leaderBoardDataFetch = async () => {
        try {
            setIsLoader(true);
            const res = await fetch(`${baseUrl}/api/v1/club/manager/auth/quiz/contest/leaderboard/${data["contestId"]}`, { method: 'GET', credentials: 'include' });
            const LeaderBoardDataFilter = await res.json();
            SetLeaderBoardData(LeaderBoardDataFilter.data);
            setIsLoader(false);
        } catch (error) {
            setIsLoader(false);
            console.log('Some technical issue');
        }
    }

    useEffect(() => {
        if (!location.search) {
            navigate("/club/manager/profile/api/answer/mcq-question")
        } else {
            if (!data["contestId"] && !data["contestName"]) {
                navigate("/club/manager/profile/api/answer/mcq-question")
            } else {
                leaderBoardDataFetch();
            }
        }
    }, [])
    if (IsLoader) {
        return <HalfLoader message="Loading..." />
    }
    const ViewDetails = (LeaderBoardMapData) => {
        setleaderBoardParticipantDataView(LeaderBoardMapData);
        setleaderBoardViewActive(true);
    }
    return (
        <>
            <h1 className='text-[30px] font-[700] leading-4'>Leader Board {data["contestName"]}</h1>

            <div className={`${leaderViewActive ? "flex" : " hidden"} w-[100%] h-[auto]  rounded-[4px]   justify-center items-center `}>
                <div className='w-[90%] h-[auto]  bg-[#150f15c4] text-[#fff] rounded-[6px] p-[20px]'>
                    <div className='w-full h-[auto] p-2 flex justify-end items-center'>
                        <span className="material-symbols-outlined text-[40px] text-[#ffffff] select-none  cursor-pointer" onClick={() => setleaderBoardViewActive(false)}>
                            close
                        </span>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Participant Name : </b><p>{Object(leaderBoardParticipantDataView)?.participant_Name}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >TechKshitiz Id : </b><p>{Object(leaderBoardParticipantDataView)?.techkshitiz_Id}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >College Name : </b><p>{Object(leaderBoardParticipantDataView)?.participant_College_Name}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Admission Year : </b><p>{Object(leaderBoardParticipantDataView)?.participant_Admission_Year}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Event Name : </b><p>{Object(leaderBoardParticipantDataView)?.event_Name}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Event Id : </b><p>{Object(leaderBoardParticipantDataView)?.event_Id}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Event Year : </b><p>{Object(leaderBoardParticipantDataView)?.event_Year}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Event Club Name : </b><p>{Object(leaderBoardParticipantDataView)?.event_Club_Name}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Event Club Id : </b><p>{Object(leaderBoardParticipantDataView)?.event_Club_Id}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Contest Name : </b><p>{Object(leaderBoardParticipantDataView)?.contest_Name}</p>
                    </div>
                    <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                        <b className='text-[#3fff65]' >Contest Id : </b><p>{Object(leaderBoardParticipantDataView)?.contest_Id}</p>
                    </div>
                    <div className='w-[100%] h-[auto] flex justify-start items-start gap-2  '>
                        <div className=' w-[80px]'><b className='text-[#3fff65]  uppercase'>Answer : </b></div><div className='w-[700px] flex flex-col gap-4 h-[auto] bg-[#07101e] text-[#efefef] p-[30px]  pt-2 rounded-[5px]'>{
                            Object(leaderBoardParticipantDataView)?.answer ? (
                                Object(leaderBoardParticipantDataView)?.answer.map((answerSubmitData) => (
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
                                ))
                            ) : ("")}
                        </div>
                    </div>


                </div>
            </div>

            <div className={`${leaderViewActive ? " hidden" : ""} w-[100%] h-[76vh] rounded-[4px]  bg-[#150f15c4] text-[#fff] overflow-auto `}>
                {
                    Object(LeaderBoardData).length > 0 ? (
                        <div className='w-[auto] h-[100%]  p-[20px]'>
                            <table className=' w-[auto]   border-[1px]  border-[#747a86] border-collapse ' >
                                <tr className='border-[1px]   border-[#747a86] '>
                                    <th className='p-[10px] text-left'>Sno.</th>
                                    <th className='p-[10px] text-left'>Full Name</th>
                                    <th className='p-[10px] text-left'>TechKshitiz Id</th>
                                    <th className='p-[10px] text-left'>College Name</th>
                                    <th className='p-[10px] text-left'>Departement Name</th>
                                    <th className='p-[10px] text-left'>Admission Year</th>
                                    <th className='p-[10px] text-left'>Event Name</th>
                                    <th className='p-[10px] text-left'>Event Id</th>
                                    <th className='p-[10px] text-left'>Event Club Name</th>
                                    <th className='p-[10px] text-left'>Event Club Id</th>
                                    <th className='p-[10px] text-left'>Contest Name</th>
                                    <th className='p-[10px] text-left'>Contest Id</th>
                                    <th className='p-[10px] text-left'>Total Points</th>
                                    <th className='p-[10px] text-left'>Winner Position</th>
                                    <th className='p-[10px] text-center'>View Details</th>
                                </tr>
                                {
                                    Object(LeaderBoardData).length > 0 ? (
                                        Object(LeaderBoardData).map((LeaderBoardMapData, index) => (
                                            <tr key={index} className=' border-[1px]     border-[#747a86]'>
                                                <td className='p-[10px] text-left  '>
                                                    <div className='w-[100px] truncate'>{index + 1}</div>
                                                </td>
                                                <td className='p-[10px] text-left  '>
                                                    <div className='w-[200px] truncate'>{LeaderBoardMapData.participant_Name}</div>
                                                </td>
                                                <td className='p-[10px] text-left  '>
                                                    <div className='w-[300px] truncate'>{LeaderBoardMapData.techkshitiz_Id}</div>
                                                </td>
                                                <td className='p-[10px] text-left  '>
                                                    <div className='w-[400px] truncate'>{LeaderBoardMapData.participant_College_Name}</div>
                                                </td>
                                                <td className='p-[10px]  text-left    '>
                                                    <div className='w-[300px] truncate'>{LeaderBoardMapData.participant_branch_Name}</div>
                                                </td>
                                                <td className='p-[10px] text-left '><div className='w-[150px] truncate'>{LeaderBoardMapData.participant_Admission_Year}</div></td>
                                                <td className='p-[10px] text-left '><div className='w-[200px] truncate'>{LeaderBoardMapData.event_Name}</div></td>
                                                <td className='p-[10px] text-left '>
                                                    <div className='w-[200px] truncate'>{LeaderBoardMapData.event_Id}</div>
                                                </td>
                                                <td className='p-[10px] text-left '>
                                                    <div className='w-[200px] truncate'>{LeaderBoardMapData.event_Club_Name}</div>
                                                </td>
                                                <td className='p-[10px] text-left '>
                                                    <div className='w-[150px] truncate'>{LeaderBoardMapData.event_Club_Id}</div>
                                                </td>
                                                <td className='p-[10px] text-left '>
                                                    <div className='w-[250px] truncate'>{LeaderBoardMapData.contest_Name ? LeaderBoardMapData.contest_Name : "Not Available"}</div>
                                                </td>
                                                <td className='p-[10px] text-left '>
                                                    <div className='w-[200px] truncate'>{LeaderBoardMapData.contest_Id ? LeaderBoardMapData.contest_Id : "Not Available"}</div>
                                                </td>
                                                <td className='p-[10px] text-left '>
                                                    <div className='w-[150px] truncate'>{LeaderBoardMapData.totalPoints ? LeaderBoardMapData.totalPoints : "Not Available"}</div>
                                                </td>
                                                <td className='p-[10px] text-left '>
                                                    <div className={`w-[150px] truncate ${index + 1 <= 3 ? "text-[#39e639]" : index + 1 <= 10 ? "text-[#f4e644]" : "text-[#f4444a]"}`}>{index + 1}</div>
                                                </td>
                                                <td className={`p-[20px] font-[700] ${LeaderBoardMapData.verify ? "text-[#39e639]" : "text-[#fff]"}`}>
                                                    {LeaderBoardMapData.verify ? "Verified" : (

                                                        <div onClick={() => ViewDetails(LeaderBoardMapData)}>
                                                            <button type="button" className='border-[1px] border-[#30434e] rounded-[10px] bg-[green] w-[150px] p-[10px]'>View Details</button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>

                                        ))
                                    ) : (
                                        <div className='w-[100%] h-[100%]  flex justify-center items-center '>
                                            <div className='w-[90%] h-[auto] flex justify-center items-center  text-[#000] rounded-[6px] p-[20px]'>
                                                <h1 className='text-[40px] font-[600]'>Leader Board  Not Available!!</h1>
                                            </div>
                                        </div>

                                    )
                                }

                            </table>
                        </div>
                    ) : (
                        <div className='w-[100%] h-[100%]  flex justify-center items-center '>
                            <div className='w-[90%] h-[auto] flex justify-center items-center  text-[#000] rounded-[6px] p-[20px]'>
                                <h1 className='text-[40px] font-[600]'>Leader Board  Not Available!!</h1>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ClubManagerLeaderBoard;
