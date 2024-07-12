import React from 'react'
import MainHeader from '../../MainHeader.tsx';
import MainFooter from '../../MainFooter.tsx';
import ClubMemberBox from './ClubMemberBox.tsx';

function ClubMembers() {

    return (
        <>
            <MainHeader />
            <div className=' w-[100%] h-[83.2vh]   bg-[#0a1921]'>
                <div className='w-[100%]  h-[120px] pt-[40px] space-y-4 '>
                    <h1 className=' text-[35px]  text-center font-[600] text-[#ffffffe4] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[15px]'>Check our <span className='text-[#fd0]'>Club Members</span></h1>
                </div>
                <div className=' w-[100%] h-[80%] max-[480px]:p-[20px]  flex  justify-center overflow-auto'>
                    <div className='w-[80%] h-[auto]  pl-[30px]    overflow-auto overflow-x-hidden max-[480px]:w-[100%] max-[480px]:pl-[0px] pt-[10px] pb-[40px] '>
                        <ClubMemberBox  />
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    )
}

export default ClubMembers
