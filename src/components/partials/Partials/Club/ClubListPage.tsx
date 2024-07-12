import React, { useEffect, useState } from 'react'
import MainHeader from '../../MainHeader.tsx';
import MainFooter from '../../MainFooter.tsx';
import BoxClubListPage from './BoxClubListPage.tsx';
import AnimatedLoader from '../../../Loader/AnimatedLoader.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function ClubListPage() {
    const [getclubdata, SetClubData] = useState([]);
    const [Isloading, SetIsLoading] = useState(false);
    const [imageurl, SetImageUrl] = useState<string[]>([])
    const datafetch = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl + '/api/club/created/data/', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                SetClubData(data);
                if (data[0]) {
                    if (data[0].club_image.data) {
                        data.forEach((element) => {
                            const uint8Array = new Uint8Array(element.club_image.data.data);
                            const blob = new Blob([uint8Array], { type: 'image/png' });
                            const dataUrl = URL.createObjectURL(blob);
                            SetImageUrl(currentValue => [...currentValue, dataUrl])
                        })
                    }
                }
                SetIsLoading(false)
            } else {
                SetIsLoading(false)

            }

        } catch (error) {
            SetIsLoading(false)
            console.log('Some technical issue' + error);
        }
    }
    useEffect(() => {
        datafetch();
    }, [])
    if (Isloading) {
        return <AnimatedLoader />
    }


    return (
        <>
            <MainHeader />
            <div className=' w-[100%] h-[100%] overflow-auto bg-[#0f1627]'>
                <div className={`w-[100%] ${getclubdata.length > 4 ? "h-[auto]" : "h-[100vh]"}  bg-[#14050507] p-[5px]`}>
                    <div className='w-[100%]  h-[160px] mt-4 space-y-4 mb-8 max-[480px]:mb-0'>
                        <h1 className=' text-[35px]  text-center font-[600] text-[#ffffffe4] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[15px]'>Check our <span className='text-[#fd0]'>Clubs</span></h1>
                        {/* <div className='w-[100%] h-[auto] flex justify-center items-center'>

                            <p className=' text-[14px]  text-center font-[500] text-[#ffffffe0] max-[1024px]:w-[400px]  max-[1024px]:text-[12px] max-[800px]:w-[350px] max-[480px]:text-[10px] max-[480px]:w-[90%]' >All events are chargeable to cover the expenses and enhance the quality of the fest.</p>
                        </div> */}
                        <div className='w-[100%] h-[auto] flex justify-center items-center'>
                            <p className=' text-[14px]  text-center font-[500] w-[700px] max-[1024px]:text-[12px] max-[1024px]:w-[510px] max-[800px]:w-[400px]  text-[#ffffffe0] pl-[10px] max-[480px]:w-[100%] max-[480px]:text-[10px] pr-[10px]' >As a token of your victory, each winner will be presented with an exclusive and beautifully crafted certificate, recognizing your outstanding achievement. 🏆✨</p>
                        </div>
                    </div>
                    <div className=' w-[100%] h-[auto] flex justify-center items-center '>
                        <div className=' w-[96%] h-[80%] space-y-8  max-[480px]:p-[20px] flex justify-center items-center'>
                            <div className='w-[100%]  h-[auto] max-[1500px]:w-[1100px]  max-[1150px]:w-[720px] max-[800px]:w-[350px] max-[480px]:w-[100%]'>
                                {
                                    getclubdata.length ? (
                                        getclubdata.map((element, index) => (
                                            <BoxClubListPage key={index} id={Object(element)._id} clubData={Object(element)} image_Url={imageurl[index]} clubname={Object(element).clubname} clubdescription={Object(element).clubdescription} />
                                        ))
                                    ) : (
                                        <div className='w-[100%]  h-[55vh] flex justify-center items-center  max-[1500px]:w-[1100px] max-[1150px]:w-[750px] max-[800px]:w-[350px]'>
                                            <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>No More Club List🌻🌻</h1>

                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />

        </>
    )
}

export default ClubListPage
