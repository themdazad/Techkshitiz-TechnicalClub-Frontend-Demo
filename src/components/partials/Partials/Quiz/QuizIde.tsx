import React, { useEffect, useState } from 'react'
import McqSolvePage from './McqSolvePage.tsx'
import Header from '../../Header.tsx'
import CatrasoAnimationLoading from '../../../Loader/CatrasoAnimationLoading.tsx';
import { useNavigate } from 'react-router-dom';

function QuizIde() {
    const [Error, SetError] = useState(false)
    const [IsLoading, SetIsLoading] = useState(false)
    const [data, setdata] = useState([]);
    const [Image, setimage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        SetIsLoading(true);
        SetError(false);
        const AuthParticipant = localStorage.getItem('Auth_participant_Data');
        if (AuthParticipant) {
            const AuthParticipantData = JSON.parse(AuthParticipant);
            if (!AuthParticipantData?.StudentData?.techk_Shitiz_Id) {
                navigate("/government-engineering-college-siwan/contest/lists");
                SetIsLoading(false);
                SetError(true);
            } else {
                setdata(AuthParticipantData);
                setimage(AuthParticipantData?.StudentData?.participant_Avtar)
                SetIsLoading(false);
                SetIsLoading(false);

            }
        } else {
            navigate("/government-engineering-college-siwan/contest/lists");
            SetIsLoading(false);
            SetError(true);
        }
    }, [])
    if (IsLoading) {
        return <CatrasoAnimationLoading />
    }
    return (
        <>
            <div className='w-[100%] h-[100vh] bg-[#292424]'>
                <Header datas={data} image={Image} verify={Error} />
                <McqSolvePage datas={data} />
            </div>

        </>
    )
}

export default QuizIde
