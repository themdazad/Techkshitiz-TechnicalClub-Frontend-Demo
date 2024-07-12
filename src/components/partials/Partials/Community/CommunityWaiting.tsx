import React from 'react';
import MainFooter from '../../MainFooter.tsx';
import MainHeader from '../../MainHeader.tsx';

const CommunityWaiting = () => {
    return (
        <>

            <div className='w-full h-[100vh]  bg-[#0f1526] overflow-auto'>
                <MainHeader />
                <div className=' w-full h-[100%] flex justify-center items-center  bg-[#0f1526]'>
                    <h1 className=' text-center text-[30px] text-[#fff93f] max-md:text-[30px] select-none'>
                        <span className=' text-center text-[35px] font-[700] max-md:text-[30px] max-sm:text-[20px] '>Techkshitiz Community!</span>
                        <br />
                        <span className=' text-center text-[#fff93f83] max-md:text-[25px]  max-sm:text-[15px] font-[500]'>Exciting updates on the community coming soon.</span>
                        <br />
                        <span className='text-center text-[#fff93f83] max-md:text-[25px] max-sm:text-[15px] font-[500]'> Stay tuned for details🌟</span>
                    </h1>
                </div>
                <MainFooter />
            </div>

        </>
    );
}

export default CommunityWaiting;
