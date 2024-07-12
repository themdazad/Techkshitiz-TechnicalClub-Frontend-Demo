import React, { useEffect, useState } from 'react'

function ParticipantProfile() {
    const [UserProfile, SetUserProfile] = useState<string[]>([]);
    useEffect(() => {
        const Coding_Participant_Auth_Data = localStorage.getItem("Coding_Participant_Auth_Data");
        if (Coding_Participant_Auth_Data !== null && Coding_Participant_Auth_Data !== undefined) {
            const Coding_Participant_Auth_Data_Show = JSON.parse(Coding_Participant_Auth_Data);
            SetUserProfile(Coding_Participant_Auth_Data_Show);
        }
    }, []) 
    return (
        <>
            <div className=' bg-[#0f182d] w-[100%] h-[100vh] text-[#fff]  flex justify-center items-center'>
                <div>


                    <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">A few miniutes ago</span>
                            <span className="text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-6 w-fit mx-auto">
                            <img src={`data:image/png;base64,${Object(UserProfile).avtar_profile}`} className="rounded-full w-28 " alt="profile picture" />
                        </div>

                        <div className="mt-8 ">
                            <h2 className="text-white font-bold text-2xl tracking-wide">{Object(UserProfile).name} <br /></h2>
                        </div>
                        <p className="text-emerald-400 font-semibold mt-2.5" >
                            Active
                        </p>

                        <div className="h-1 w-full bg-black mt-8 rounded-full">
                            <div className={`h-1 rounded-full  bg-yellow-500 ${Object(UserProfile).AdmissionYear === String(2022) ? "w-4/5" : "w-2/5"}`}></div>
                        </div>
                        <div className="mt-3 text-white text-sm">
                            <span className="text-gray-400 font-semibold">Storage:</span>
                            <span>{Object(UserProfile).AdmissionYear === String(2022) ? "80%" : "60%"}</span>
                        </div>

                    </section>
                    {/* <h1 className='text-[40px] text-center w-[800px]'>This Time Your Profile Not Visible Please visit After some time</h1>
                    <br /><div className=' text-center w-[100%] flex justify-center items-center'><button onClick={handelclickbutton} className='w-[100px] h-[40px] bg-[#16293e] rounded-[10px] border-[1px] border-[#263f56] shadow-inner'>Go back</button></div> */}
                </div>
            </div>

        </>
    )
}

export default ParticipantProfile
