import React from 'react'
import './UhrakhelAnimatedLoader.css'
function UhrakhelAnimatedLoader() {
    return (
        <>
            <div className='w-[100%] h-[100vh] absolute top-0 left-0 z-50 bg-[#0f1526] flex justify-center items-center'>

                <svg viewBox="0 0 240 240" height="240" width="240" className="pl">
                    <circle
                        stroke-linecap="round"
                        stroke-dashoffset="-330"
                        stroke-dasharray="0 660"
                        stroke-width="20"
                        stroke="#000"
                        fill="none"
                        r="105"
                        cy="120"
                        cx="120"
                        className="pl__ring pl__ring--a"
                    ></circle>
                    <circle
                        stroke-linecap="round"
                        stroke-dashoffset="-110"
                        stroke-dasharray="0 220"
                        stroke-width="20"
                        stroke="#000"
                        fill="none"
                        r="35"
                        cy="120"
                        cx="120"
                        className="pl__ring pl__ring--b"
                    ></circle>
                    <circle
                        stroke-linecap="round"
                        stroke-dasharray="0 440"
                        stroke-width="20"
                        stroke="#000"
                        fill="none"
                        r="70"
                        cy="120"
                        cx="85"
                        className="pl__ring pl__ring--c"
                    ></circle>
                    <circle
                        stroke-linecap="round"
                        stroke-dasharray="0 440"
                        stroke-width="20"
                        stroke="#000"
                        fill="none"
                        r="70"
                        cy="120"
                        cx="155"
                        className="pl__ring pl__ring--d"
                    ></circle>
                </svg>
            </div>
        </>
    )
}

export default UhrakhelAnimatedLoader
