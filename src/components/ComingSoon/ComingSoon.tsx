import React from 'react'

export const ComingSoon = ({text}) => {
  return (
   <center className='bg-[#0F1526] py-12'>
    <img className='h-16 animate-pulse' src="/images/Techkshitiz_Logo.png" alt="techkshitiz event coming soon" />
    <h3 className='text-white text-3xl animate-pulse delay-100'>{text}</h3>
   </center>
  )
}
