import React, { useEffect, useState } from 'react'
import './Admin_Panel_Box.css'
import SchawnnajAnimatedLoader from '../../Loader/SchawnnajAnimatedLoader.tsx';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ClubManagerLeftSideNavBar from './ClubManagerLeftSideNavBar.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function ClubManagerPanelHeroSection() {
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const [getdata, setdata] = useState<string[]>([]);
    const navigate = useNavigate();
    const verifydata = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl + '/api/v1/student/profile/data', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                if (Number(data?.data?.participant_Roll) === 3) {
                    if (data.data) {
                        if (data.data.participant_Profile_Avtar) {
                            const uint8Array = new Uint8Array(data.data.participant_Profile_Avtar.data.data);
                            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                            const dataUrl = URL.createObjectURL(blob);
                            data.data.participant_Profile_Avtar = dataUrl;
                        }
                    }
                    setdata(data.data);
                    SetIsLoading(false);
                } else {
                    navigate('/');
                    return;
                }

            } else {
                navigate('/government-engineering-college-siwan/student/login')
                SetIsLoading(false)
                return;
            }
        } catch (error) {
            navigate('/government-engineering-college-siwan/student/login')
            SetIsLoading(false)
            return;
        }
    }

    const LogOutParticipant = async () => {
        const logOutverification = window.confirm("Are you sure to logout ");
        if (logOutverification) {
            try {
                SetIsLoading(true)
                const res = await fetch(baseUrl + '/api/v1/student/profile/logout', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res.status === 200) {
                    setdata([]);
                    SetIsLoading(false)
                } else {
                    SetIsLoading(false)
                }
            } catch (error) {
                SetIsLoading(false)
            }
        }
    }
    useEffect(() => {
        verifydata();
    }, [])
    if (IsLoading) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>
            <header>
                <div className="logosec">
                    <NavLink to='/' className="logo">TECHKSHITIZ</NavLink>
                </div>
                <div className="logo cursor-default select-none uppercase ">{Object(getdata).participant_Club_Roll_name} Club Manager</div>

                <div className="message">
                    <div className="circle"> </div>
                    <div className="dp cursor-default">
                        <img className="w-[40px] h-[40px] rounded-[50%] " src={Object(getdata).participant_Profile_Avtar ? Object(getdata).participant_Profile_Avtar : Object(getdata).participant_Avtar} alt="Avtar" />
                    </div>
                </div>
            </header>

            <div className="main-container">
                <div className="navcontainer">
                    <nav className="nav">
                        <div className="nav-upper-options">
                            <ClubManagerLeftSideNavBar link='/club/manager/profile' text='Dashboard' icon='dashboard' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/event/participant/payment/history' text='Event Participant Payment History' icon='person_add' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/event/data/list' text='Event Data All List' icon='person_add' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/event/add' text='Event  Add' icon='event_upcoming' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/contest/add' text='Contest  Add' icon='event_upcoming' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/gallery/images/add/' text='Gallery Images  Add' icon='gallery_thumbnail' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/club/incharge/add/' text='Club Incharge Add' icon='event_list' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/event/coordinator/add/' text='Event Coordinator Add' icon='event_list' />
                            <ClubManagerLeftSideNavBar link='/club/manager/profile/api/winner-participant-add' text='Winner Participant Add' icon='team_dashboard' />
                            {
                                Number(Object(getdata)?.participant_Roll) === 3 ? (
                                    <>
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/api/answer/numerical-question' text='Numerical Answer' icon='checklist' />
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/api/answer/mcq-question' text='Mcq Answer' icon='checklist' />
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/add/numerical-question' text='Num-question Add' icon='add_task' />
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/add/mcq-question' text='Mcq-question Add' icon='note_add' />
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/api/all-question-list/contest/mcq-question/numerical-question' text='See Questions' icon='all_inbox' />
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/add/coding/user-id/' text='Coding Participant Id Add' icon='group_add' />
                                        <ClubManagerLeftSideNavBar link='/club/manager/profile/add/quiz/user-id/' text='Quiz Participant Id Add' icon='person_add' />
                                    </>
                                ) : (
                                    <>
                                    </>
                                )

                            }
                            <div className="nav-option option6" onClick={LogOutParticipant}>

                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                <div>
                                    <h3>Logout</h3>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="main">
                    <div className="box-container ">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ClubManagerPanelHeroSection
