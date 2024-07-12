import React, { useEffect, useState } from 'react'
import MainHeader from '../partials/MainHeader.tsx'
import MainFooter from '../partials/MainFooter.tsx'
const baseUrl = process.env.REACT_APP_BACKEND_URL
function GalleryEvent() {
    const [Image, SetImage] = useState("")
    const [imageurl, setimageurl] = useState<string[]>([]);
    const [imagelength, Setimagelength] = useState<number>(0);
    const [Isloading, SetIsLoading] = useState<boolean>(true);
    const [totalDatalength, SetTotalDataLength] = useState<number>(0)
    const [Page, SetPage] = useState<number>(1);
    const datafetch = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(`${baseUrl}/api/gallery/images/data/?currentpage=${Page}`, {
                method: 'GET',
                credentials: 'include',
            })
            if (res.status === 200) {
                const data = await res.json();
                Setimagelength(data.length);
                SetTotalDataLength(Number(data[0].datatotalDataLength))
                if (data[0].Image.data) {
                    setimageurl([]);
                    data.forEach((element, index) => {
                        const uint8Array = new Uint8Array(element.Image.data.data);
                        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                        const dataUrl = URL.createObjectURL(blob);
                        setimageurl(current => [...current, dataUrl]);
                    })
                }
                SetIsLoading(false)
            } else {
                SetIsLoading(false)
            }

        } catch (error) {
            SetIsLoading(false)
        }
    }
    useEffect(() => {
        datafetch();
    }, [Page])
    // if (Isloading) {
    //     return <AnimatedLoader />
    // }

    const OnclickHandeldata = (image) => {
        SetImage(image)
        const profilebox = document.querySelector('#imagebox');
        if (profilebox !== null) {
            if (profilebox.classList.contains('hidden')) {
                profilebox.classList.remove('hidden');
            } else {

                profilebox.classList.add('hidden');
            }

        }
    }
    const totalPages = Math.ceil(Number(totalDatalength) / 12);
    const onClickNextHandel = () => {
        if (Page < totalPages) {
            SetPage(Page + 1)
        }

    }
    const onClickPreviousHandel = () => {
        if (Page > 1) {
            SetPage(Page - 1);
        }

    }

    return (
        <>
            <div id='imagebox' className='w-[100%] hidden fixed top-0 left-0 z-50 h-[100vh] bg-[#000000e0] '>
                <div className=' w-[100%] h-[40px] flex justify-end items-center  p-[50px]  max-lg:pr-2 '>
                    <span className="material-symbols-outlined text-[#fff]  cursor-pointer text-[40px] font-[700]" onClick={OnclickHandeldata}>
                        close
                    </span>
                </div>
                <div className='w-[100%] h-[85%] flex justify-center items-center'>
                    <img src={Image} className='w-[60%] h-[100%] max-sm:w-[96%] max-sm:h-[300px] rounded-[10px] max-lg:w-[80%] max-lg:h-[400px]' alt='Loading..' />
                </div>
            </div>
            <div className={`w-[100%] overflow-auto   bg-[#0f1627] h-[100vh]`}>
            <MainHeader />
                {
                    Isloading ? (
                        <div className='w-full h-[100vh] p-4'>
                            <div className='loaderDateEvent'>

                            </div>

                        </div>
                    ) : (

                        <div className='w-[100%] h-[auto]  bg-[#0f1627] p-[5px]'>
                            <div className='w-[100%]  h-[160px] max-[1024px]:h-[120px] max-[800px]:h-[80px] mt-4 space-y-4 '>
                                <h1 className=' text-[35px]  text-center font-[600] text-[#ffffffe4] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[15px]'>Check our <span className='text-[#fd0]'>Event Gallery</span></h1>
                                <div className='w-[100%] h-[auto] flex justify-center items-center'>
                                    <p className=' text-[14px]  text-center font-[500] w-[700px] max-[1024px]:text-[12px]  text-[#ffffffe0] pl-[10px] max-[1024px]:w-[510px] max-[800px]:w-[400px]  max-[480px]:w-[100%] max-[480px]:text-[10px] pr-[10px]' >Glimpse of our Previous held TechKshitiz Events  in our College. 🏆✨</p>
                                </div>
                            </div>
                            <div className={`w-[100%]  ${imageurl.length > 4 ? "h-[100%]" : " h-[65vh] max-md:h-[70vh] "}   flex justify-center items-center`}>
                                <div className=' w-[96%] h-[100%] space-y-8 flex justify-center items-start   max-[480px]:p-[20px] pt-0'>
                                    {
                                        imageurl[0] ? (
                                            <div className='w-[100%] large:w-[1440px] h-[auto] max-[1500px]:w-[1100px] max-[1150px]:w-[750px] max-[800px]:w-[350px] '>
                                                {
                                                    imageurl.map((element, index) => (
                                                        <div key={index} onClick={() => { OnclickHandeldata(imageurl[(imagelength - 1) - index]) }} className=' w-[330px]  m-[15px]  max-[480px]:m-0 max-[480px]:w-[100%] max-[480px]:mb-[30px]  space-y-4 hover:shadow-[1px_1px_20px_1px_rgba(214,216,216,0.2)] shadow-[1px_1px_6px_1px_rgba(214,216,216,0.2)] h-[250px] rounded-[10px] cursor-pointer  p-[12px] transition float-left ease-in-out delay-200 border-[1px] border-[#1b3040] bg-[#0a1a23]'>
                                                            <div className=' w-[100%] h-[100%] flex justify-center items-center '>
                                                                <img id='clickableImage' src={imageurl[(imagelength - 1) - index]} className='w-[100%] h-[100%] rounded-[10px]' alt="Loading...." />
                                                            </div>
                                                        </div>
                                                    ))

                                                }

                                            </div>

                                        ) : (
                                            <div className='w-[100%]  h-[100%] flex justify-center items-center  max-[1500px]:w-[1100px] max-[1150px]:w-[750px] max-[800px]:w-[350px]'>
                                                <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>No More Gallery Image🌻🌻</h1>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={`w-[100%] h-[100%] flex justify-center items-center pt-[20px] pb-[20px] ${totalPages > 1 ? "" : " hidden"}`}>
                                <div className=' w-[94%] h-[100%]  flex justify-center items-center    pt-0'>
                                    <div className='w-[100%]  h-[auto] max-[1500px]:w-[1050px] max-[1150px]:w-[700px] max-[800px]:w-[350px] flex justify-between'>

                                        <button disabled={Page <= 1} style={Page <= 1 ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e28', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px]' onClick={onClickPreviousHandel}>Preview</button>
                                        <button disabled={Page > totalPages} style={Page >= totalPages ? { backgroundColor: '#131c32', border: '1px solid #0e2126', color: '#4b4b4bbb', cursor: 'not-allowed' } : { border: '1px solid #0f1e29', backgroundColor: '#0f1e28', color: '#ffffef', cursor: 'pointer' }} className='w-[150px] h-[30px] p-[20px] bg-[#] border-[1px] flex justify-center items-center rounded-[5px]   hover:bg-[#182935] transition ease-in-out delay-150 text-[14px] max-[800px]:w-[100px] ' onClick={onClickNextHandel}>Next</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            <MainFooter />
            </div>
        </>
    )
}

export default GalleryEvent
