import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import MainHeader from '../../MainHeader.tsx';
import MainFooter from '../../MainFooter.tsx';
import CatrasoAnimationLoading from '../../../Loader/CatrasoAnimationLoading.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function HallOfFameHomePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year');
    const type = queryParams.get('type');
    const [getClub, SetClub] = useState<string[]>([])
    const [IsLoading, SetIsLoading] = useState<boolean>(false);
    useEffect(() => {
        SetIsLoading(true)
        setTimeout(() => {
            SetIsLoading(false)
        }, 1000)
        
        SetClub([]);
        SetClub(current => [...current, Object()])
    }, [year])
    if (IsLoading) {
        return <CatrasoAnimationLoading />
    }

    return (
        <>
            <MainHeader />

            <div className="bg-[#091522] w-[100%] h-[100vh] p-[30px] pb-[20px] pt-[10px] flex justify-center items-center">
                <div className="w-[90%] space-y-4  bg-[#091522] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-[4px] mt-[10px] h-[auto]">


                    {
                        Object(getClub).map((element, index) => (
                            <div key={index}>
                                <div className="pt-[20px]">
                                    <h1 className="uppercase text-center text-[#ffdd04]  animate-pulse text-[30px]  font-[700]">
                                        {element.clubName} Hall Of Fame {year} Wait a few month
                                    </h1>
                                </div>
                                {/* {
                                    Object(element).clubEvent.map((clubEvents, indexs) => (
                                        <div key={indexs} className=" p-[20px]  w-[100%] h-[450px] border-[1px] rounded-[5px] border-[#152333] flex justify-center items-center">
                                            {console.log(clubEvents.CodingFirstWinner.year)}
                                            <img
                                                src={clubEvents.profileImage}
                                                className="text-[#fff] w-[1250px] h-[100%] rounded-[5px]"
                                                alt={"Clubdata.clubName"}
                                            />
                                        </div>

                                    ))
                                } */}
                            </div>

                        ))
                    }
                </div>
            </div>
            <MainFooter />
        </>
    )
}

export default HallOfFameHomePage
