import React from 'react'
import './AnimatedLoader.css'
function AnimatedLoader() {
    return (
        <>
            <div className='w-[100%] h-[100vh] absolute top-0 left-0 z-50 bg-[#0f1526] flex justify-center items-center'>
                <div className="loader">
                    <div className="cell d-0"></div>
                    <div className="cell d-1"></div>
                    <div className="cell d-2"></div>

                    <div className="cell d-1"></div>
                    <div className="cell d-2"></div>


                    <div className="cell d-2"></div>
                    <div className="cell d-3"></div>

                    <div className="cell d-3"></div>
                    <div className="cell d-4"></div>
                </div>

            </div>

        </>
    )
}

export default AnimatedLoader
