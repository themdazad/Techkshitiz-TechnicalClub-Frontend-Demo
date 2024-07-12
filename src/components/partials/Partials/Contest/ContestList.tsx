import React, { useEffect, useState } from 'react'
import MainHeader from '../../MainHeader.tsx'
import MainFooter from '../../MainFooter.tsx'
import ContestListBox from './ContestListBox.tsx'
import AnimatedLoader from '../../../Loader/AnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function ContestList() {
    const [Permission, SetPermission] = useState(false);
    const [IsLoading, SetLoading] = useState(true);
    const [IsContestLoading, setIsContestLoading] = useState(true);
    const [ContestData, SetContestData] = useState<string[]>([]);
    const ContestDataShow = async () => {
        try {
            setIsContestLoading(true);
            const res = await fetch(baseUrl + '/api/contest/data/list', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                const contestData = data.data
                if (contestData) {
                    if (contestData && contestData.length > 0) {
                        contestData.forEach((element, index) => {
                            if (element.contest_image?.data) {
                                const uint8Array = new Uint8Array(element.contest_image.data.data);
                                const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                                const dataUrl = URL.createObjectURL(blob);
                                contestData[index].contest_image = dataUrl;
                            }
                            if (element.contest_rulebook_Pdf?.data) {
                                const uint8Array = new Uint8Array(element.contest_rulebook_Pdf.data.data);
                                const blob = new Blob([uint8Array], { type: 'application/pdf' });
                                const dataUrl = URL.createObjectURL(blob);
                                contestData[index].contest_rulebook_Pdf = dataUrl;
                            }
                        });
                    }

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
    const PermissionCheck = async () => {
        try {
            SetLoading(true);
            const res = await fetch(`${baseUrl}/api/permission/contest`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                SetPermission(data?.data?.permission_Allow);
                ContestDataShow();
                SetLoading(false);
            } else {
                SetPermission(false)
                SetLoading(false);
            }
        } catch (error) {
            SetPermission(false)
            SetLoading(false);
        }
    }
    useEffect(() => {
        PermissionCheck();
    }, [])

    if (IsLoading) {
        return <AnimatedLoader />
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
            <div className=' w-[100%] h-[100vh] overflow-auto bg-[#0f1627]'>
                <MainHeader />
                {
                    IsContestLoading ? (
                        <>
                            <div className='w-[100%] h-[90vh] p-[30px] mb-6 max-md:pl-8'>
                                <div className='loaderDateEvent'></div>
                            </div></>

                    ) : (
                        ContestData[0] ? (
                            Object(ContestData)?.length < 0 ? (
                                <div className=' w-full h-[100vh] flex justify-center items-center bg-[#0f1526]'>
                                    <h1 className=' text-center text-[30px] text-[#fff93f] max-md:text-[30px] select-none'>
                                        <span className=' text-center text-[35px] font-[700] max-md:text-[30px] max-sm:text-[20px] '>Techkshitiz Contest!</span>
                                        <br />
                                        <span className=' text-center text-[#fff93f83] max-md:text-[25px]  max-sm:text-[15px] font-[500]'>Exciting updates on the Contest coming soon.</span>
                                    </h1>
                                </div>
                            ) : (
                                <div className='w-[100%] h-[auto] bg-[#14050507] p-[5px] pb-10'>
                                    <div className='w-[100%]  h-[160px] mt-4 space-y-4 mb-8'>
                                        <h1 className=' text-[35px]  text-center font-[600] text-[#ffffffe4]'>Check our <span className='text-[#fd0]'>Contest</span></h1>
                                        <div className='w-[100%] h-[auto] flex justify-center items-center'>
                                            <p className=' text-[14px]  text-center font-[500] w-[700px] text-[#ffffffe0]' >As a token of your victory, each winner will be presented with an exclusive and beautifully crafted certificate or goodies, recognizing your outstanding achievement. 🏆✨</p>
                                        </div>
                                    </div>
                                    <div className=' w-[100%] h-[85%] flex justify-center items-center '>
                                        <div className=' w-[96%] h-[80%] space-y-8'>
                                            <div className={`w-[100%]  h-[auto] flex flex-wrap  gap-0 items-center   ${ContestData.length > 4 ? " justify-center" : " justify-start"}`}>
                                                {
                                                    Object(ContestData).map((data, index) => (
                                                        <>
                                                            <ContestListBox ContestData={data} key={index} url={`/techkshitiz/event/${data?.contest_Name}/contest/${data?.contestUrl_Id}`} image_Url={data?.contest_image} contestname={data?.contest_Name} clubdescription={data?.contest_description} />
                                                        </>
                                                    ))
                                                }                                            <>

                                                    {/* <ContestListBox url="/technical/events/quiz/contest/" image_Url={"https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cXVpenxlbnwwfHwwfHx8MA%3D%3D"} contestname="quiz" clubdescription="A quiz is a game or mind sport where players answer questions about a specific topic or topics. Quizzes can be used as a hobby or as a brief assessment to measure growth in skills, knowledge, and abilities." /> */}
                                                    {/* <ContestListBox image_Url={"https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVpenxlbnwwfHwwfHx8MA%3D%3D"} contestname="Test" clubdescription="A test is a set of questions or problems that measure a person's knowledge, skills, or abilities. For example, a spelling test or a multiple-choice question test a student's knowledge." /> */}
                                                </>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        ) : (
                            <div className=' w-full h-[100vh] flex justify-center items-center bg-[#0f1526]'>
                                <h1 className=' text-center text-[30px] text-[#fff93f] max-md:text-[30px] select-none'>
                                    <span className=' text-center text-[35px] font-[700] max-md:text-[30px] max-sm:text-[20px] '>Techkshitiz Contest!</span>
                                    <br />
                                    <span className=' text-center text-[#fff93f83] max-md:text-[25px]  max-sm:text-[15px] font-[500]'>Exciting updates on the Contest coming soon.</span>
                                </h1>
                            </div>
                        )
                    )
                }
                <MainFooter />
            </div>

        </>
    )
}

export default ContestList
