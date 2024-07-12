import React, { useEffect, useState } from 'react'
import TopNav from './TopNav.tsx'
import SideNavBar from './SideNavBar.tsx'
import { useNavigate } from 'react-router-dom'
import CatrasoAnimationLoading from '../../../../Loader/CatrasoAnimationLoading.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function ChartPanel() {
    const [IsLoader, SetIsLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleAuthData = async () => {
        try {
            SetIsLoader(true);
            const res = await fetch(baseUrl + '/api/v1/government-engineering-college-siwan/community/chart/auth/data/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const { sucess } = await res.json();
            if (res.status === 200) {
                const dataElement = {
                    id: sucess.id,
                    name: sucess.name,
                    username: sucess.username,
                    email: sucess.email,
                    phone: sucess.phone,
                    belongs_to_referral_country: sucess.belongs_to_referral_country,
                    branch: sucess.branch,
                    city: sucess.city,
                    college: sucess.college,
                    gender: sucess.gender,
                    graduated: sucess.graduated,
                    graduation_year: sucess.graduation_year,
                    image: sucess.image,
                    international_phone_number: sucess.international_phone_number,
                    linkedin: sucess.linkedin,
                    node_access_token: sucess.node_access_token,
                    phone_country_code: sucess.phone_country_code,
                    screen_name: sucess.screen_name,
                    total_exp_in_months: sucess.total_exp_in_months,
                    DateTime: sucess.DateTime,
                    AuthData: true
                }
                localStorage.setItem('UserData', JSON.stringify(dataElement))
                SetIsLoader(false);
            } else if (res.status === 401) {
                navigate('/government-engineering-college-siwan/community/chat/login')
                SetIsLoader(false);

            } else {

                SetIsLoader(false);
            }

        } catch (error) {
            navigate('/government-engineering-college-siwan/community/chat/login')
            SetIsLoader(false);
        }

    }
    useEffect(() => {

        handleAuthData();
    }, [])
    if (IsLoader) {
        return <CatrasoAnimationLoading />
    }
    return (
        <>
            <TopNav />
            <div className=' w-full h-[95vh] flex'>
                <SideNavBar />
            </div>
        </>
    )
}

export default ChartPanel
