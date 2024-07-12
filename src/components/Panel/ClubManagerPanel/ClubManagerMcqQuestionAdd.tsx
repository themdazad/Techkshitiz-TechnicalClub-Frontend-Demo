import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../Loader/HalfLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerMcqQuestionAdd() {
    const [questionnumbers, setquestionnumber] = useState<number>(0);
    const [getdata, setdata] = useState({ questionname: '', option1: '', option2: '', option3: '', option4: '', mcqanswer: '', questionPoint: "", EventId: "" });
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [contestClubData, SetContestClubData] = useState([]);
    const [ContestDataFilter, SetContestDataFilter] = useState({ ContestId: "", ContestName: "" });
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const [Error, SetError] = useState<boolean>(false);

    const Contestdatafetch = async () => {
        try {
            SetIsLoading(true)
            SetError(false)
            const datares = await fetch(baseUrl + '/api/v1/club/manager/auth/contest/data/show', { method: 'GET', credentials: 'include' })
            const data = await datares.json();
            SetContestClubData(data.data);
            SetIsLoading(false)

        } catch (error) {
            SetIsLoading(false);
            SetError(true)

        }
    }
    useEffect(() => {
        Contestdatafetch();
    }, [])
    const datafetch = async (contest_Id) => {
        try {
            SetError(false)
            const datares = await fetch(`${baseUrl}/api/v1/club/manager/auth/quiz/mcq/question/show/${contest_Id}`, { method: 'GET', credentials: 'include' })
            const data = await datares.json();
            if (data?.data?.questionData) {
                setquestionnumber(data.data.questionData.length + 1);
            } else {
                setquestionnumber(1);
            }
        } catch (error) {
            SetError(true)
        }
    }
    useEffect(() => {
        // datafetch();

    }, [])
    if (IsLoading) {
        return <HalfLoader message="Loading.." />
    }
    if (IsLoadingRequest) {
        return <HalfLoader message="Processing.." />

    }
    if (Error) {
        return <h1>Something went wrong!!</h1>
    }
    const submidformdata = async (event) => {
        event.preventDefault();
        try {
            setIsLoadingRequest(true)
            const { questionname, option1, option2, option3, option4, mcqanswer, EventId, questionPoint } = getdata;
            const { ContestId, ContestName } = ContestDataFilter;
            const res = await fetch(baseUrl + '/api/v1/club/manager/auth/quiz/mcq/question/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ questionname, op1: option1, op2: option2, op3: option3, op4: option4, contest_Club_Name: ContestName, contest_Club_Id: ContestId, questionPoint, mcqanswer, event_Id: EventId, questionnumber: questionnumbers }),
                credentials: 'include',
            })
            if (res.status === 200) {
                setIsLoadingRequest(false)
                toast.success('Done Question Added');
                datafetch(ContestId);
                setdata({ questionname: '', option1: '', option2: '', option3: '', option4: '', mcqanswer: '', questionPoint: "", EventId: "" });

            } else if (res.status === 402) {
                setIsLoadingRequest(false)

                toast.error('Two Option Are Same Please change data')
            } else if (res.status === 400) {
                setIsLoadingRequest(false)
                toast.error('All field require')
            } else if (res.status === 401) {
                setIsLoadingRequest(false)
                toast.error("invalid event id")

            } else if (res.status === 403) {
                setIsLoadingRequest(false)

                toast.error('Question Number Already exist');

            } else if (res.status === 500) {
                setIsLoadingRequest(false)

                toast.error('Some technica issue');

            }
        } catch (error) {
            toast.error('Some technica issue' + error);
            setIsLoadingRequest(false)
        }
    }

    const clubDataChange = (e) => {
        const value = e.target.value;
        if (value) {
            const contestDataGet = JSON.parse(value);
            datafetch(String(contestDataGet.contest_Id))
            SetContestDataFilter({ "ContestId": String(contestDataGet.contest_Id), "ContestName": String(contestDataGet.contest_Name) })
            setdata({ ...getdata, "EventId": String(contestDataGet.contest_EventId) });
        }
    }
    return (
        <>
            <div className="container">
                <div className="title">Add Questions</div>
                <hr />
                <div className="content">
                    <form onSubmit={submidformdata} >
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Contest Name</span>
                                <select name="contest_Name_And_Id" onChange={clubDataChange} id="" required>
                                    <option value="">Select a contest name</option>
                                    {
                                        contestClubData?.length > 0 ? (
                                            Object(contestClubData).map((data, index) => (
                                                <option key={index} value={JSON.stringify(data)}>{data?.contest_Name}</option>
                                            ))
                                        ) : ("")
                                    }
                                </select>
                            </div>
                            <div className="input-box">
                                <span className="details">Question</span>
                                <input type="text" name='questionname' value={getdata.questionname} onChange={changedata} placeholder="Enter your Question" required />
                            </div>
                            <div className="input-box">
                                <span className="details">option -1</span>
                                <input type="text" name='option1' value={getdata.option1} onChange={changedata} placeholder="Enter Option-1" required />
                            </div>
                            <div className="input-box">
                                <span className="details">option -2</span>
                                <input type="text" name='option2' value={getdata.option2} onChange={changedata} placeholder="Enter Option-2" required />
                            </div>

                            <div className="input-box">
                                <span className="details">option -3</span>
                                <input type="text" name='option3' value={getdata.option3} onChange={changedata} placeholder="Enter Option-3" required />
                            </div>

                            <div className="input-box">
                                <span className="details">option -4</span>
                                <input type="text" name='option4' value={getdata.option4} onChange={changedata} placeholder="Enter Option-4" required />
                            </div>

                            <div className="input-box">
                                <span className="details">correct</span>
                                <input type="text" name='mcqanswer' value={getdata.mcqanswer} onChange={changedata} placeholder="Enter Correct Answer" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Question Point</span>
                                <input type="number" name='questionPoint' value={getdata.questionPoint} onChange={changedata} placeholder="Enter question point" required />
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="button">
                                <input type="submit" value="Add Question" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ClubManagerMcqQuestionAdd
