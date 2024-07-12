import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../Loader/HalfLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL

function ClubManagerNumericalQuestionAdd() {
    const [questionnumbers, setquestionnumber] = useState<string[]>([]);
    const [getdata, setdata] = useState({ questionname: '', question_Title: "", answer_Find: "", example_One: "", example_Two: "", question_label: "", question_Point: "", topic_Tag: "" });
    const [IsLoading, SetIsLoader] = useState<boolean>(false);
    const [Error, SetError] = useState<boolean>(false);
    const [IsLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const datafetch = async () => {
        try {
            SetError(false);
            SetIsLoader(true);
            const datares = await fetch(baseUrl + '/api/contest/question-numerical', { method: 'GET',credentials:'include' })
            const data = await datares.json();
            setquestionnumber(data.data);
            SetIsLoader(false)

        } catch (error) {
            SetError(true);
            SetIsLoader(false)

        }
    }
    useEffect(() => {
        datafetch();
    }, [])
    if (Error) {
        return <h1>Something went wrong</h1>
    }
    if (IsLoading) {
        return <HalfLoader message="Loading.." />
    }
    if (IsLoadingRequest) {
        return <HalfLoader message="Processing.." />
    }
    const changedata = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setdata({ ...getdata, [name]: value });
    }
    const submitformdata = async (event) => {
        event.preventDefault();
        try {
            setIsLoadingRequest(true)

            const { questionname, question_Title, answer_Find, example_One, example_Two, question_label, question_Point, topic_Tag } = getdata;

            const res = await fetch(baseUrl + '/api/contest/api/question-numerical/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ questionname, questionnumber: questionnumbers.length + 1, question_Title, answer_Find, example_One, example_Two, question_label, question_Point, topic_Tag }),
                credentials: 'include',
            })
            if (res.status === 200) {
                toast.success('Done Question Added');
                datafetch();
                setdata({ questionname: '', question_Title: "", answer_Find: "", example_One: "", example_Two: "", question_label: "", question_Point: "", topic_Tag: "" });
                setIsLoadingRequest(false)

            } else if (res.status === 401) {
                toast.error("Question number already exist");
                setdata({ questionname: '', question_Title: "", answer_Find: "", example_One: "", example_Two: "", question_label: "", question_Point: "", topic_Tag: "" });
                setIsLoadingRequest(false)


            } else if (res.status === 400) {
                toast.error("All field require");
                setdata({ questionname: '', question_Title: "", answer_Find: "", example_One: "", example_Two: "", question_label: "", question_Point: "", topic_Tag: "" });
                setIsLoadingRequest(false)


            }
            else {
                toast.error("Some technical issue");
                setIsLoadingRequest(false)

            }
        } catch (error) {
            setIsLoadingRequest(false)
        }
    }


    return (
        <>
            <div className="container ">
                <div className="title">Add Questions</div>
                <hr />
                <div className="content">
                    <form onSubmit={submitformdata} >
                        <div className="user-details flex flex-col">

                            <div className="input-box">
                                <span className="details  font-[700] ">Question Title<span className='text-[#ff3434] text-[18px]'>*</span> : </span>
                                <textarea name='question_Title' value={getdata.question_Title} onChange={changedata} typeof='text' className=' mt-2 text-[#fff] outline-none rounded-[2px] resize-none bg-[#2b2525] p-[20px]' placeholder="Enter your Question Title" rows={2} cols={72} required />
                            </div>
                            <div className="input-box">
                                <span className="details  font-[700] ">Question<span className='text-[#ff3434] text-[18px]'>*</span>: </span>
                                <textarea name='questionname' value={getdata.questionname} onChange={changedata} typeof='text' className=' mt-2 text-[#fff] outline-none rounded-[2px] resize-none bg-[#2b2525] p-[20px]' placeholder="Enter your Question" rows={10} cols={72} required />
                            </div>
                            <div className="input-box">
                                <span className="details  font-[700] w-full ">What would be find user question<span className='text-[#ff3434] text-[18px]'>*</span> : </span>
                                <textarea name='answer_Find' value={getdata.answer_Find} onChange={changedata} typeof='text' className=' mt-2 text-[#fff] outline-none rounded-[2px] resize-none bg-[#2b2525] p-[20px]' placeholder="What would be find user given in this question" rows={10} cols={72} required />
                            </div>
                            <div className="input-box">
                                <span className="details  font-[700] w-full ">Example One<span className='text-[#ff3434] text-[18px]'>*</span> : </span>
                                <textarea name='example_One' value={getdata.example_One} onChange={changedata} typeof='text' className=' mt-2 text-[#fff] outline-none rounded-[2px] resize-none bg-[#2b2525] p-[20px]' placeholder="Enter your question first example" rows={10} cols={72} required />
                            </div>
                            <div className="input-box">
                                <span className="details  font-[700] w-full ">Example Two<span className='text-[#ff3434] text-[18px]'>*</span> : </span>
                                <textarea name='example_Two' value={getdata.example_Two} onChange={changedata} typeof='text' className=' mt-2 text-[#fff] outline-none rounded-[2px] resize-none bg-[#2b2525] p-[20px]' placeholder="Enter your question second example" rows={10} cols={72} required />
                            </div>
                            <div className='flex w-full h-auto gap-2'>
                                <div className="input-box">
                                    <span className="details  font-[700] w-full ">Question Points<span className='text-[#ff3434] text-[18px]'>*</span> : </span>
                                    <input type="number" name="question_Point" id="question_Point" onChange={changedata} value={getdata?.question_Point} placeholder='Enter your question point' />
                                </div>
                                <div className="input-box">
                                    <span className="details  font-[700] w-full ">Question Label<span className='text-[#ff3434] text-[18px]'>*</span> : </span>
                                    <select name="question_label" onChange={changedata} value={getdata.question_label} id="question_label">
                                        <option value="">Select Question Label</option>
                                        <option value="School">School</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>

                            </div>
                            <div className="input-box">
                                <span className="details  font-[700] w-full ">Question Topic Tag <span className='text-[#0d0c0c] text-[18px]'> (Optional)</span> : </span>
                                <textarea name='topic_Tag' value={getdata.topic_Tag} onChange={changedata} typeof='text' className=' mt-2 text-[#fff] outline-none rounded-[2px] resize-none bg-[#2b2525] p-[20px]' placeholder="Enter your question topic" rows={4} cols={72} />
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

export default ClubManagerNumericalQuestionAdd
