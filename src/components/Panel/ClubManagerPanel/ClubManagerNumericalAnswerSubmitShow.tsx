import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HalfLoader from '../../Loader/HalfLoader.tsx';
import * as XLSX from 'xlsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ClubManagerNumericalAnswerSubmitShow() {
    const [getdata, setdata] = useState([]);
    const [IsLoading, SetIsLoading] = useState(false);
    const [Error, SetError] = useState(false);
    const Answersheetdata = async () => {
        try {
            SetError(false);
            SetIsLoading(true);
            const res = await fetch(baseUrl + '/api/participant/numerical/question/answer', {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json();
            setdata(data);
            SetIsLoading(false);

        } catch (error) {
            SetIsLoading(false);
            SetError(true);
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

    if (IsLoading) {
        return <HalfLoader message="Processing.." />
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(getdata);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'Numerical_Answer.xlsx');
    };
    return (
        <>
            <div className=' w-[100%] h-[25px] flex justify-center items-center gap-10 '>
                <h1 className=' text-[30px] text-[#1c1b2a] font-[700] uppercase'>Number Answer List</h1>
                <button className='w-[150px] h-[40px] border-[1px] border-[#29445c]  bg-[#1f4c59] rounded-[5px] shadow-inner text-[#fff]' onClick={exportToExcel}>Export Excel</button>
            </div>
            <div className='w-[100%] h-[75vh] rounded-[4px]  overflow-y-auto overflow-x-hidden space-y-4'>
                {getdata.length === 0 ? (
                    <>
                        <div className='w-[100%] h-[100%]  flex justify-center items-center '>
                            <div className='w-[90%] h-[auto] flex justify-center items-center  text-[#000] rounded-[6px] p-[20px]'>
                                <h1 className='text-[40px] font-[600]'>Answer Not Submited!!</h1>
                            </div>
                        </div>
                    </>
                ) : getdata.map((element, index) => (
                    <div key={index} className='w-[100%] h-[auto]  flex justify-center items-center '>
                        <div className='w-[90%] h-[auto] bg-[#150f15c4] text-[#fff] rounded-[6px] p-[20px]'>
                            <div className='w-[100%] h-[auto] flex justify-end items-center gap-4'>

                                <span className="material-symbols-outlined cursor-pointer text-[#ffffff] font-[500]" onClick={() => { answercopy(Object(element)) }} >
                                    content_copy
                                </span>
                                <span className="material-symbols-outlined cursor-pointer text-[#ff5165] font-[500]" onClick={() => { datadelete(Object(element)._id) }}>
                                    delete
                                </span>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                <b className='text-[#3fff65]' >Participant Name : </b><p>{Object(element).username}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                <b className='text-[#3fff65]' >Participant Id : </b><p>{Object(element).userid}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2 uppercase '>
                                <b className='text-[#3fff65]' >Branch  : </b><p>{Object(element).branch}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                <b className='text-[#3fff65]' >Email Id : </b><p>{Object(element).emailid}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                <b className='text-[#3fff65]' >Year : </b><p>{Object(element).year}</p>
                            </div>
                            <div className='w-[100%] h-[28px] flex justify-start items-center gap-2  uppercase'>
                                <b className='text-[#3fff65]' >Remaining Times : </b><p>{Object(element).submittime[0]} Miniutes {Object(element).submittime[1]} Second {Object(element).submittime[2]} Milliseconds</p>
                            </div>
                            <div className='w-[100%] h-[auto] flex justify-start  items-start gap-2  '>
                                <div className=' w-[100px]'><b className='text-[#3fff65]  uppercase'>Answer : </b></div>
                                <div className='w-[100%] h-[auto] p-[10px] bg-[#03080cf0] text-[#000]  rounded-[5px]'>
                                    {
                                        Object(element).answer.map((data, index) => (
                                            <div key={index} className='w-[700px] h-[auto] pb-[20px] p-[10px] text-[#fcfcfc]  rounded-[5px]'>
                                                <div className='w-[100%] h-[auto] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Attempt : </b><p >{Object(data).Attempt ? "Yes" : "No"}</p>
                                                </div>
                                                <div className='w-[100%] h-[auto] flex justify-start items-center gap-2  uppercase'>
                                                    <b className='text-[#3fff65]' >Mark for Review : </b><p>{Object(data).MarkforReview ? "Yes" : "No"}</p>
                                                </div>
                                                <div className='w-[100%] h-[auto] flex justify-start items-start gap-2  uppercase'>

                                                    <div className="w-[180px] h-[100%] flex justify-start items-center">
                                                        <b className='text-[#3fff65] uppercase ' >Question Number  : </b>
                                                    </div>
                                                    <div className=' pt-0 flex justify-start items-center'>
                                                        {Object(data).questionnumber}
                                                    </div>
                                                </div>
                                                <div className='w-[100%] h-[auto] flex justify-start items-start gap-2  uppercase'>
                                                    <div className="w-[180px] h-[100%] flex justify-start items-center">
                                                        <b className='text-[#3fff65] uppercase ' >Question Name  : </b>
                                                    </div>
                                                    <div className='p-[20px] pt-0 flex justify-start items-center'>
                                                        {Object(data).questionname}
                                                    </div>
                                                </div>
                                                <div className='w-[100%] h-[auto] flex justify-start items-start gap-2 select-none  '>
                                                    <div className="w-[80px] h-[100%] flex justify-start items-start">
                                                        <b className='text-[#3fff65] uppercase ' >Code  : </b>
                                                    </div>
                                                    <div className='whitespace-pre text-wrap w-[600px] h-[400px] overflow-auto text-[#000] rounded-[5px] bg-[#d6d6d6] p-[20px] pt-0'>
                                                        <div className=' w-[100%] p-[10px] pt-[20px] flex justify-end items-center'>
                                                            <span className="material-symbols-outlined cursor-pointer text-[#32841c] font-[500] " onClick={() => { answercopy({ answer: Object(data).code }) }} >
                                                                content_copy
                                                            </span>
                                                        </div>
                                                        {Object(data).code}</div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default ClubManagerNumericalAnswerSubmitShow
