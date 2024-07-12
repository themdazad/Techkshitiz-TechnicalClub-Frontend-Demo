import React from 'react'
import image from '../../../../images/vikashdeveloper.jpg';
import { NavLink } from 'react-router-dom';

function DiscussionPostBoxShow() {
  return (
    <>
      <div className='p-[5px] h-[auto] gap-[40px] cursor-default border-[#213947] flex justify-start items-start  rounded-[6px] border-[1px]'>
        <div className=' w-[120px]  flex gap-[30px] justify-center items-center'>
          <div className='w-[70px] h-[70px] flex justify-center items-center'>
            <NavLink to="" className='bg-[#fff] overflow-hidden w-[50px] h-[50px] rounded-[50%]'>
              <img src={image} alt="" className='w-[100%] h-[100%]' />
            </NavLink>
          </div>
          <div className='w-[30px] h-[70px] flex justify-center items-center'>
            <div className='w-[100%] h-[60px]'>
              <span className="material-symbols-outlined flex justify-center cursor-pointer items-center text-[35px]">
                arrow_drop_up
              </span>
              <h1 className=' text-center text-[13px]'>{0}</h1>
            </div>
          </div>
        </div>

        <div className='w-[auto] h-[100%]  '>
          <h1 className=' w-[650px]  p-[8px] pl-0 font-[600] text-[15px]'> <NavLink to=''>Discord or Facebook for SaaS communities?</NavLink></h1>
          <div className=' w-[500px] flex justify-start items-center'>
            <p className='text-[14px] font-[300]'><NavLink to='#'>Anil Yarimca in</NavLink> <NavLink to="" className='text-[#ff0090fc] ml-[4px] cursor-pointer mr-[15px]'>Ask for feedback </NavLink></p><p className='text-[14px] font-[300]'> <span className='mr-[1px]' >{0}</span> <span className=' cursor-pointer mr-[10px]'>replies</span> <span className='mr-[8px]'>1h</span>ago</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscussionPostBoxShow
