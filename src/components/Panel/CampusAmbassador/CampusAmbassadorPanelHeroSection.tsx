import React, { useEffect, useState } from 'react'
import SchawnnajAnimatedLoader from '../../Loader/SchawnnajAnimatedLoader.tsx';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function CampusAmbassadorPanelHeroSection() {
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const [getdata, setdata] = useState<string[]>([]);
    const navigate = useNavigate();
    const verifydata = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl+'/api/v1/student/profile/data', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                if (Number(data?.data?.participant_Roll) === 4) {
                    if (data.data) {
                        if (data.data.participant_Profile_Avtar) {
                            const uint8Array = new Uint8Array(data.data.participant_Profile_Avtar.data.data);
                            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                            const dataUrl = URL.createObjectURL(blob);
                            data.data.participant_Profile_Avtar = dataUrl;
                        }
                        setdata(data.data);
                    }
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
    useEffect(() => {
        verifydata();
    }, [])
    if (IsLoading) {
        return <SchawnnajAnimatedLoader />
    }
    return (
        <>

        </>
    )
}

export default CampusAmbassadorPanelHeroSection
