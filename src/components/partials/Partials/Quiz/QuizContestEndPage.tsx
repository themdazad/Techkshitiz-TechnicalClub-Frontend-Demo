import React, { useEffect } from 'react'
import MainHeader from '../../MainHeader.tsx';
import MainFooter from '../../MainFooter.tsx';
const baseUrl = process.env.REACT_APP_BACKEND_URL
function QuizContestEndPage() {
    const logout = async () => {
        try {
            await fetch(baseUrl + '/api/logout/', { method: 'GET', credentials: 'include' })
        } catch (error) {
        }
    }
    useEffect(() => {
        logout();
    }, [])
    return (
        <>
            <MainHeader />
            <div className='w-[100%] h-[100vh] bg-[#0a1722] flex justify-center items-center '>
                <div className=' space-y-10'>
                    <h1 className=' uppercase text-[40px] font-[700] w-[1400px] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px]'>We appreciate your participation in the QuiZ competition hosted by the TechKshitiz  Gec Siwan</h1>
                    <h1 className=' uppercase text-[30px] font-[700] text-center animate-pulse text-[#ffdd00] max-[480px]:text-[20px] max-[300px]:text-[12px] max-[700px]:text-[30px] '>Thank You 🌻🌻</h1>
                </div>
            </div>
            <MainFooter />
        </>
    )
}

export default QuizContestEndPage
