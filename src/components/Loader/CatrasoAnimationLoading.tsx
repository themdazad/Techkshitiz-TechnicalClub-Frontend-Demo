import React from 'react'
import './CatrasoAnimationLoading.css'
function CatrasoAnimationLoading() {
    return (
        <>
            <div className='w-[100%] h-[100vh] absolute top-0 left-0 z-50 bg-[#0f1526] flex justify-center items-center'>
                <div className="spinner"></div>
            </div>
        </>
    )
}

export default CatrasoAnimationLoading
