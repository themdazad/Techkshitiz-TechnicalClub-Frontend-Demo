import React, { useEffect, useState } from 'react';
import MainHeader from '../../partials/MainHeader.tsx';
import MainFooter from '../../partials/MainFooter.tsx';
import SchawnnajAnimatedLoader from '../../Loader/SchawnnajAnimatedLoader.tsx';
import { NavLink, useLocation } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BACKEND_URL
const TechKshitizUserPublicProfile = () => {
    const [TechKshitizUserData, SetTechKshitizUserData] = useState<string[]>([]);
    const [IsLoader, SetIsLoader] = useState(true);
    const location = useLocation().state;
    console.log(location);

    const TechKshitizUserDataFetch = async () => {
        SetIsLoader(true);
        try {
            const res = await fetch(`${baseUrl}/api/techkshitiz/user/profile/data/${location.Participant_techk_Shitiz_Id}`, {
                method: "GET",
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                const TechKshitizData = Object(data).data;
                if (TechKshitizData.participant_Profile_Avtar) {
                    if (TechKshitizData.participant_Profile_Avtar.data) {
                        const uint8Array = new Uint8Array(TechKshitizData.participant_Profile_Avtar.data.data);
                        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                        const dataUrl = URL.createObjectURL(blob);
                        TechKshitizData.participant_Profile_Avtar = dataUrl;
                    }
                }
                SetTechKshitizUserData(TechKshitizData);
                SetIsLoader(false);
            } else {
                SetIsLoader(false);
            }

        } catch (error) {
            SetIsLoader(false);

        }
    }
    useEffect(() => {
        TechKshitizUserDataFetch();
    }, [])
    if (IsLoader) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>
            <section className='w-full h-[100vh] bg-[#0f1526] text-[#fff] overflow-auto'>
                <MainHeader />
                <div className='w-full h-auto'>
                    <div id="TechKshitizUserPublicProfile" className='w-full h-[auto] select-none  mb-4 shadow-[inset_0px_0px_200px_100px_#1a202c] ' >
                        <div className=' w-full h-full bg-[#0f152676] p-3 pt-14 pb-8'>
                            <div className='w-full h-[150px] flex justify-center items-center'>
                                <img className='w-[150px] h-[150px] rounded-full bg-[#0f152664] flex justify-center items-center' src={Object(TechKshitizUserData)?.participant_Profile_Avtar ? Object(TechKshitizUserData)?.participant_Profile_Avtar : Object(location).Participant_Avtar ? Object(location).Participant_Avtar : Object(TechKshitizUserData)?.participant_Avtar} alt="User" />
                            </div>
                            <div className='w-full h-[70px]  flex justify-center items-center'>
                                <h1 className=' text-[30px] font-[700] capitalize text-center max-sm:text-[20px]'> {Object(TechKshitizUserData)?.participant_Name ? Object(TechKshitizUserData)?.participant_Name : ""}</h1>
                            </div>
                            <div className='w-full h-[auto]  p-[2px]   flex justify-center items-center'>
                                <p className=' text-center   text-[13px]  max-sm:text-[12px] text-[#1cfff4] '>2K{Object(TechKshitizUserData)?.participant_Admission_Year ? String(Object(TechKshitizUserData)?.participant_Admission_Year).substring(2, 4) : ""}</p>
                            </div>
                            <div className='w-full h-[auto]  p-[2px]   flex justify-center items-center'>
                                <p className=' uppercase text-center  leading-3 text-[13px] max-sm:text-[12px]'>{Object(TechKshitizUserData)?.participant_City ? Object(TechKshitizUserData)?.participant_City : ""}</p>
                            </div>
                            <div className='w-full h-[auto] flex justify-center items-center'>
                                <p className=' capitalize text-center text-[15px] max-sm:text-[14px]'>{Object(TechKshitizUserData)?.participant_Branch ? Object(TechKshitizUserData)?.participant_Branch : ""}</p>
                            </div>
                            <div className='w-full h-[auto] flex justify-center items-center'>
                                <p className=' capitalize text-center text-[16px] max-sm:text-[15px] font-[600] text-[#ffe432]'>{Object(TechKshitizUserData)?.participant_College_Name ? Object(TechKshitizUserData)?.participant_College_Name : ""}</p>
                            </div>
                            <div className='w-full h-[auto]  p-[2px] flex justify-center items-center'>
                                <NavLink to={Object(TechKshitizUserData)?.portfolio_Link ? Object(TechKshitizUserData)?.portfolio_Link : ""} style={{ transition: 'all 0.4s' }} className=' hover:text-[#d8dc61] text-[15px] lowercase'>{Object(TechKshitizUserData)?.portfolio_Link ? Object(TechKshitizUserData)?.portfolio_Link : ""} </NavLink>
                            </div>
                            {Object(TechKshitizUserData)?.portfolio_Link ? (
                                <div className='w-full h-[auto] max-sm:pl-2 max-sm:pr-2  flex justify-center items-center'>

                                    <p className=' text-center w-[800px] max-lg:w-[600px] max-md:[500px] max-sm:w-full  flex '>
                                        <span className="material-symbols-outlined">
                                            sell
                                        </span>{Object(TechKshitizUserData)?.Skills ? Object(TechKshitizUserData)?.Skills : ""} </p>
                                </div>
                            ) : ("")}
                            <div className="mb-2 flex items-center justify-center  mt-5">
                                {
                                    Object(TechKshitizUserData)?.participant_Email ? (
                                        <NavLink
                                            to={Object(TechKshitizUserData)?.participant_Email ? ("mailto:" + Object(TechKshitizUserData)?.participant_Email) : ""}
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
                                        >
                                            <i className="fa-solid fa-envelope text-xs"></i>
                                        </NavLink>
                                    ) : ("")
                                }
                                {
                                    Object(TechKshitizUserData)?.facebook_Social_Media_Link ? (
                                        <NavLink
                                            to={Object(TechKshitizUserData)?.facebook_Social_Media_Link ? Object(TechKshitizUserData)?.facebook_Social_Media_Link : ""}
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
                                        >
                                            <svg
                                                width="8"
                                                height="16"
                                                viewBox="0 0 8 16"
                                                className="fill-current"
                                            >
                                                <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                                            </svg>
                                        </NavLink>
                                    ) : ("")
                                }
                                {
                                    Object(TechKshitizUserData)?.twitter_Social_Media_Link ? (

                                        <NavLink
                                            to={Object(TechKshitizUserData)?.facebook_Social_Media_Link ? Object(TechKshitizUserData)?.facebook_Social_Media_Link : ""}
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
                                        >
                                            <svg
                                                width="16"
                                                height="12"
                                                viewBox="0 0 16 12"
                                                className="fill-current"
                                            >
                                                <path d="M14.2194 2.06654L15.2 0.939335C15.4839 0.634051 15.5613 0.399217 15.5871 0.2818C14.8129 0.704501 14.0903 0.845401 13.6258 0.845401H13.4452L13.3419 0.751468C12.7226 0.258317 11.9484 0 11.1226 0C9.31613 0 7.89677 1.36204 7.89677 2.93542C7.89677 3.02935 7.89677 3.17025 7.92258 3.26419L8 3.73386L7.45806 3.71037C4.15484 3.61644 1.44516 1.03327 1.00645 0.587084C0.283871 1.76125 0.696774 2.88845 1.13548 3.59296L2.0129 4.90802L0.619355 4.20352C0.645161 5.18982 1.05806 5.96477 1.85806 6.52838L2.55484 6.99804L1.85806 7.25636C2.29677 8.45401 3.27742 8.94716 4 9.13503L4.95484 9.36986L4.05161 9.93346C2.60645 10.8728 0.8 10.8024 0 10.7319C1.62581 11.7652 3.56129 12 4.90323 12C5.90968 12 6.65806 11.9061 6.83871 11.8356C14.0645 10.2857 14.4 4.41487 14.4 3.2407V3.07632L14.5548 2.98239C15.4323 2.23092 15.7935 1.8317 16 1.59687C15.9226 1.62035 15.8194 1.66732 15.7161 1.6908L14.2194 2.06654Z" />
                                            </svg>
                                        </NavLink>
                                    ) : ("")
                                }
                                {
                                    Object(TechKshitizUserData)?.instagram_Social_Media_Link ? (

                                        <NavLink
                                            to={Object(TechKshitizUserData)?.facebook_Social_Media_Link ? Object(TechKshitizUserData)?.facebook_Social_Media_Link : ""}
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
                                        >
                                            <svg
                                                width="16"
                                                height="12"
                                                viewBox="0 0 16 12"
                                                className="fill-current"
                                            >
                                                <path d="M15.6645 1.88018C15.4839 1.13364 14.9419 0.552995 14.2452 0.359447C13.0065 6.59222e-08 8 0 8 0C8 0 2.99355 6.59222e-08 1.75484 0.359447C1.05806 0.552995 0.516129 1.13364 0.335484 1.88018C0 3.23502 0 6 0 6C0 6 0 8.79263 0.335484 10.1198C0.516129 10.8664 1.05806 11.447 1.75484 11.6406C2.99355 12 8 12 8 12C8 12 13.0065 12 14.2452 11.6406C14.9419 11.447 15.4839 10.8664 15.6645 10.1198C16 8.79263 16 6 16 6C16 6 16 3.23502 15.6645 1.88018ZM6.4 8.57143V3.42857L10.5548 6L6.4 8.57143Z" />
                                            </svg>
                                        </NavLink>
                                    ) : ("")
                                }
                                {
                                    Object(TechKshitizUserData)?.linkedin_Social_Media_Link ? (
                                        <NavLink
                                            to={Object(TechKshitizUserData)?.facebook_Social_Media_Link ? Object(TechKshitizUserData)?.facebook_Social_Media_Link : ""}
                                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                className="fill-current"
                                            >
                                                <path d="M13.0214 0H1.02084C0.453707 0 0 0.451613 0 1.01613V12.9839C0 13.5258 0.453707 14 1.02084 14H12.976C13.5432 14 13.9969 13.5484 13.9969 12.9839V0.993548C14.0422 0.451613 13.5885 0 13.0214 0ZM4.15142 11.9H2.08705V5.23871H4.15142V11.9ZM3.10789 4.3129C2.42733 4.3129 1.90557 3.77097 1.90557 3.11613C1.90557 2.46129 2.45002 1.91935 3.10789 1.91935C3.76577 1.91935 4.31022 2.46129 4.31022 3.11613C4.31022 3.77097 3.81114 4.3129 3.10789 4.3129ZM11.9779 11.9H9.9135V8.67097C9.9135 7.90323 9.89082 6.8871 8.82461 6.8871C7.73571 6.8871 7.57691 7.74516 7.57691 8.60323V11.9H5.51254V5.23871H7.53154V6.16452H7.55423C7.84914 5.62258 8.50701 5.08065 9.52785 5.08065C11.6376 5.08065 12.0232 6.43548 12.0232 8.2871V11.9H11.9779Z" />
                                            </svg>
                                        </NavLink>
                                    ) : ("")
                                }

                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[auto] p-5 '>
                        <h1 className=' text-4xl font-[700] p-5 max-xl:pl-1'>Bio </h1>
                        {Object(TechKshitizUserData)?.participant_About ? (
                            <>
                                <div className='ml-5 max-xl:ml-2 border-2 bg-[#0c1820b9] backdrop-blur-lg border-[#1a364772] p-5 rounded-md  flex justify-center items-center'>
                                    <p className='text-pretty text-[#ffffffc7]'>
                                        {
                                            Object(TechKshitizUserData)?.participant_About ? Object(TechKshitizUserData)?.participant_About : ""
                                        }

                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className='ml-5 max-xl:ml-2 border-2 bg-[#0c1820b9]  h-52 backdrop-blur-lg border-[#1a364772] p-5 rounded-md  flex justify-center items-center'>
                                <h1 className='text-4xl max-sm:text-2xl text-[#ffffffc7]'>
                                    Bio Not Available
                                </h1>
                            </div>
                        )}
                    </div>

                </div>
                <MainFooter />
            </section >

        </>
    );
}

export default TechKshitizUserPublicProfile;
