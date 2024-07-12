import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function OutPutTerminal(props) {
    const [CodeOutput, SetCodeOutput] = useState({ Output: "" });
    const [Errors, SetError] = useState(false);
    const [CustomInput, SetCustomInput] = useState("45 45");
    const [currentTerminal, setCurrentTerminal] = useState(1);
    const [ExpectedOutput, SetExpectedOutput] = useState("16 32");
    const [CompileCodeLoader, SetCompileCodeLoader] = useState(true);
    useEffect(() => {

    }, [Errors, props.CurrentQuestion])
    const onHandelCodeDataSend = async (event) => {
        event.preventDefault()
        SetCompileCodeLoader(true);
        const Participant_Question_Code = sessionStorage.getItem('Participant_Question_coding_Contest');
        if (Participant_Question_Code) {
            const Participant_Question_coding_Contest = JSON.parse(Participant_Question_Code);
            try {
                console.log(props.CurrentQuestion - 1);
                const data = {
                    code: Participant_Question_coding_Contest[props.CurrentQuestion - 1].code,
                    language: props.CodeLanguage.language_Select,
                    input: CustomInput
                }
                const res = await fetch(baseUrl + '/api/v1/government-engineering-college-siwan/code-compiler', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include',
                })
                const dataOutput = await res.json();
                if (dataOutput.error !== undefined) {
                    SetCodeOutput({ Output: dataOutput.error })
                    SetError(true);
                    SetCompileCodeLoader(false);
                } else {
                    console.log(dataOutput);

                    SetCodeOutput({ Output: dataOutput.Output })
                    SetError(false);
                    SetCompileCodeLoader(false);
                }
            } catch (error) {
                SetCompileCodeLoader(false);
                toast.error("Some technical issue");
            }
        }
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

    const compilationTerminalOpenCloseFunction = () => {
        const compilationTerminal = document.querySelector('#compilationTerminal');
        const customInputTerminal = document.querySelector('#customInputTerminal');
        const customInputText = document.querySelector('#customInputText');
        const compilationResultText = document.querySelector('#compilationResultText');
        if (compilationTerminal?.classList.contains('hidden')) {
            compilationTerminal?.classList.remove('hidden');
            customInputTerminal?.classList.add('hidden');
            customInputText?.classList.remove('text-[#e8d039]');
            customInputText?.classList.remove('border-b-[2px]');
            compilationResultText?.classList.add('text-[#e8d039]');
            compilationResultText?.classList.add('border-b-[2px]');
            if (currentTerminal !== 1) {
                setCurrentTerminal(1);
            }
        }


    }
    const customInputTerminalOpenCloseFunction = () => {
        const customInputTerminal = document.querySelector('#customInputTerminal');
        const compilationTerminal = document.querySelector('#compilationTerminal');
        const compilationResultText = document.querySelector('#compilationResultText');
        const customInputText = document.querySelector('#customInputText');
        if (customInputTerminal?.classList.contains('hidden')) {
            customInputTerminal.classList.remove('hidden');
            compilationTerminal?.classList.add('hidden');
            customInputText?.classList.remove('text-[#e8d039]');
            customInputText?.classList.remove('border-b-[2px]');
            compilationResultText?.classList.add('text-[#e8d039]');
            compilationResultText?.classList.add('border-b-[2px]');
            if (currentTerminal !== 2) {
                setCurrentTerminal(2);
            }
        }
    }

    return (
        <>
            <form id='outputTerminal' style={{ transition: 'all 1s' }} className=" absolute left-[-100%] top-0 overflow-auto  w-[100%] h-[100%]  rounded-t-[15px] border-[2px] border-[#5f5f5f] bg-[#535151]" onSubmit={onHandelCodeDataSend}>
                <div className=" bg-[#266856] w-[100%] h-[60px] p-[10px] sticky top-0 text-[#f0f4f3] text-[20px] font-[600] pl-[25px] flex justify-between items-center">
                    <span>Output Window</span>
                    <span onClick={outputTerminalButton} className="material-symbols-outlined cursor-pointer mr-2">
                        arrow_back
                    </span>
                </div>
                <div className=" bg-[#535151] w-[100%] h-[60px] border-b-[2px] border-[#5f5e5e]  pb-0 sticky top-0 text-[#f0f4f3] text-[17px] gap-8 font-[600]   flex justify-start items-center">
                    <span id='compilationResultText' onClick={compilationTerminalOpenCloseFunction} className={`${currentTerminal === 1 ? "text-[#e8d039] border-b-[2px]" : ""} w-[auto] h-[100%]  cursor-pointer  border-[#e8d039] p-[24px] pt-0 pb-0 flex justify-center items-center`}>Compilation Results</span>
                    <span id='customInputText' onClick={customInputTerminalOpenCloseFunction} className={`${currentTerminal === 2 ? "text-[#e8d039] border-b-[2px]" : ""} w-[auto] h-[100%] cursor-pointer p-[20px] pt-0 pb-0 flex justify-center items-center border-[#e8d039]`}>Custom Input</span>
                </div>
                <div id='compilationTerminal' className="w-[100%] h-[auto]  bg-[#535151]  p-[20px]  space-y-4">
                    {
                        CompileCodeLoader ? (
                            <div className='w-[100%] h-[400px] bg-[#dcdcdc4e] rounded-[5px]'>
                                <div className="loaderDateEvent"></div>
                            </div>
                        ) : (
                            <>
                                <div className='text-[#f0f4f3] text-[18px]  '>
                                    <span className='font-[700]'>Compilation Completed</span>
                                </div>
                                <div className=' w-[100%] h-[auto] '>
                                    <div id="description" className={` flex  flex-col h-[auto] resize-none bg-[#ffffff47] p-2.5 w-full rounded-[4px] pt-[20px] pb-[20px]`} >
                                        <div className=' flex flex-col'>
                                            <span className='mb-[10px] text-[#fff]'>For Input: </span>
                                            <span className='  pl-[10px] text-[#dfdfdf]'>
                                                {CustomInput}
                                            </span>
                                        </div>
                                        <div className={`${Errors === true ? 'text-[#f90000]' : "text-[#44ff44]"} flex  flex-col`}>
                                            <span className='mb-[6px] mt-[6px] text-[#fff]'>Your Output:</span>
                                            {CodeOutput.Output ? (
                                                <span className={` ${Errors === true ? 'text-[#ff9933]' : ExpectedOutput === CodeOutput.Output ? "text-[#24ff24]" : "text-[#f68e3f]"}  pl-[15px] font-[600] `}> {CodeOutput.Output}</span>
                                            ) : (
                                                <span className={`  pl-[10px] font-[400] text-[#fff]`}> Please compile your code then check your output!!</span>
                                            )}
                                        </div>
                                        <div className={` flex  flex-col`}>
                                            <span className='mb-[6px] mt-[6px] text-[#fff]'>Expected Output:</span>
                                            <span className={`  pl-[10px] font-[500] text-[#fff]`}> {ExpectedOutput}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div >
                <div id='customInputTerminal' className="hidden w-[100%] h-[auto]    p-[20px]" >
                    <div className='w-[100%] h-[auto]'>
                        {/* <label htmlFor="description" className="block mb-2 text-sm font-medium text-[#fff] dark:text-white">Custom Input</label> */}
                        <textarea value={CustomInput} onChange={(event) => { SetCustomInput(Object(event).target.value) }} id="description" rows={6} cols={75} className=" p-[10px] rounded-[2px] outline-none mb-8 tracking-[2px] bg-[#ffffff5b] text-[#fff]" ></textarea>
                        <button type='submit' onClick={compilationTerminalOpenCloseFunction} className="text-white bg-[#36ae29] w-full justify-center items-center  rounded-[5px] p-[10px]  h-[40px] pb-0 pt-0 border-none outline-none">
                            Compile & Run
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default OutPutTerminal
