import React from 'react'
import MainHeader from '../partials/MainHeader.tsx'
import MainFooter from '../partials/MainFooter.tsx'
import { NavLink } from 'react-router-dom';
import avatar_url from "../images/vikashdeveloper.jpg";
import messageFly from "../images/messageFly.svg";
import destinationFly from "../images/DestinationFly.svg";
import {TechkshitizMember} from '../Home/TechkshitizMember.tsx';

function ContactsPage() {
    return (
        <>
            <MainHeader />
            <TechkshitizMember />
            
            <div className='w-[100%] h-[100%] overflow-auto overflow-x-hidden bg-[#0f1526]'>
                <div className='w-[100%] h-[auto] pb-[20px] p-[10px]'>
                    <h1 className=' text-center pt-[10px] pb-[10px] max-[800px]:pb-[2px] mt-4 font-[600] text-sky-600 text-[36px] max-[1024px]:text-[30px] max-[800px]:text-[25px] max-[480px]:text-[15px]'>Contact Us</h1>
                    <div className='w-[100%] h-[auto] flex justify-center items-center'>
                        <p className=' max-[1024px]:w-[510px] max-[800px]:w-[100%]  max-[800px]:text-[12px] max-[800px]:p-[20px] max-[480px]:text-[10px] text-center p-[10px] text-[#ffffffd6] font-[500] w-[700px]'>Explore our location on the map below and drop by to say hello! We're conveniently situated and ready to assist you with any inquiries or guidance you may need.</p>
                    </div>
                    <div className='py-12 w-[100%] h-[auto] gap-4 max-[1400px]:gap-8 max-[1250px]:space-y-8 max-[480px]:space-y-0 flex max-[1250px]:block justify-center items-center '>

                        <div className=' w-[50%] max-[1250px]:w-[100%] max-[1400px]:w-[40%] max-[800px]:w-[100%] h-[auto] max-[800px]:p-[20px] flex justify-center items-center'>
                            <iframe title='Google || Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.1190703924985!2d84.32693107512615!3d26.225320377063557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992ff716c7b37ad%3A0x5737371d64c4aed1!2sGovernment%20Engineering%20College%20(GEC)%2CSiwan!5e0!3m2!1sen!2sin!4v1704661340943!5m2!1sen!2sin" className='w-[700px] h-[350px] max-[1400px]:w-[80%] max-[800px]:w-[100%]  max-[1400px]:h-[350px]  border-[2px] border-[#171f39]' style={{ border: "0", borderRadius: '20px' }} >
                                Loading...
                            </iframe>
                        </div>
                        <div className='w-[45%] scroll-py-6 max-[1250px]:w-[100%] h-[350px]  max-[600px]:h-[auto] max-[800px]:p-[20px] flex justify-center items-center '>
                            <div className='w-[100%] max-[1250px]:w-[80%] max-[800px]:w-[100%] h-[100%] max-[1250px]:p-[20px]  border-[1px] border-[#101a27] rounded-3xl bg-[#0a121e] text-[#fffffff3]'>
                                <div className='w-[100%]  flex justify-center items-center '>
                                    <div className='w-[25%] h-[100%] rounded-tl-[20px] max-[480px]:hidden'>
                                        <img src={messageFly} alt="messageFly" />

                                    </div>
                                    <div className='w-[75%]  max-[480px]:w-[100%] h-[100%] space-y-2  max-[600px]:space-y-2 rounded-tr-[20px] pt-[20px] pl-[20px]'>
                                        <h1 className='text-[24px] font-[600] max-[1500px]:text-[20px]  max-[600px]:text-[15px] max-[480px]:text-[14px]'>Contact Us via <span className='text-sky-600'>Whats'app</span> or <span className='text-sky-600'>Email Us</span></h1>
                                        <h4 className='font-[500] text-[13px] max-[1500px]:text-[12px]   max-[600px]:text-[10px] max-[480px]:text-[9px]'>Text Us at <NavLink target='_' to='https://wa.me/+917352514546' className=' ml-1 mr-1 font-[600] text-[#00bbff]'>+917352514546</NavLink> on Whats'app.</h4>
                                        <h4>

                                            <NavLink to='mailto:techkshitiz.org@gmail.com' className='text-[13px]  max-[600px]:text-[10px]  max-[480px]:text-[9px] max-[1500px]:text-[12px] font-[600] text-[#00bbff]'>Email Us at techkshitiz.org@gmail.com</NavLink>
                                        </h4>
                                        <h4>

                                            <NavLink target='_' to='https://whatsapp.com/channel/0029VaJOMRBCnA7uvuG1z03d' className=' max-[480px]:text-[9px] max-[600px]:text-[10px] max-[1500px]:text-[12px]  text-[13px] font-[600] text-[#00bbff]'>Click Here to Join Our Whats'app Channel for More Updates.</NavLink>
                                        </h4>

                                    </div>
                                </div>
                                <div className='w-[100%] flex justify-center items-center'>
                                    <div className='w-[25%] h-[100%]  rounded-tl-[20px] flex justify-center items-center p-[10px] max-[480px]:hidden '>
                                        <img src={destinationFly} alt='destinationFly' />

                                    </div>
                                    <div className='w-[75%] h-[100%] max-[480px]:w-[100%] space-y-2 max-[600px]:space-y-2 rounded-tr-[20px] max-[480px]:text-[14px] pt-[20px] pl-[20px]'>
                                        <h1 className='text-[24px] font-[600] max-[1500px]:text-[20px]  max-[600px]:text-[15px]'>Find Us Here <span className='text-sky-600'>Your Event Destination </span></h1>
                                        <h4>

                                            <NavLink to='https://maps.app.goo.gl/1cUvNN4j2CRn7Q3u9' target='_' className='text-[13px]  max-[480px]:text-[9px] max-[600px]:text-[10px]  max-[1500px]:text-[12px] font-[600] text-[#00bbff]'>Government Engineering College , Siwan</NavLink>
                                        </h4>
                                        <h4 className='font-[500] text-[13px]  max-[1500px]:text-[12px]  max-[600px]:text-[10px] max-[480px]:text-[9px]'>Old Suta Mill Factory, Bhada Khurd, Siwan</h4>
                                        <h4 className='font-[500] text-[13px]  max-[1500px]:text-[12px]  max-[600px]:text-[10px] max-[480px]:text-[9px]'>Siwan, Pin -841226. </h4>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                {/* <div className='w-[100%]  h-[300px] flex justify-center  items-center p-[20px] '>

                    <div className=' bg-[#0a121e] rounded-[10px] w-[550px] max-[480px]:w-[100%] h-[auto] p-[10px] flex justify-center items-center'>
                        <div className='p-[10px] w-[30%] h-[100%] space-y-6'>
                            <h1 className=' text-[#ffc934f0] font-[600] text-center  max-[480px]:text-[13px]'>Developed By</h1>
                            <div className='shadow-[0px_0px_16px_0px_#718096] p-[10px]  w-[150px] max-[480px]:w-[100px] max-[480px]:h-[100px]  h-[150px] flex justify-center items-center bg-slate-50 rounded-[50%] overflow-hidden'>
                                <img className=' w-[96%] h-[96%] max-[480px]:w-[100%] max-[480px]:h-[100%] scale-125 ' src={avatar_url} alt='Loading..' />
                            </div>
                        </div>
                        <div className='w-[64%] h-[100%]  pl-[10px] space-y-4'>
                            <div className='w-[100%] h-[50%] space-y-2   pl-[20px]'>
                                <h1 className=' text-[20px] text-center  font-[600] uppercase text-[#e7f33cec] max-[480px]:text-[15px]'>{"vikash kumar"}</h1>
                                <h3 className=' text-[15px] text-center  font-[600]  text-[#fff] max-[480px]:text-[10px]'>Developer</h3>
                                <h3 className=' text-[12px] text-center  font-[500]  text-[#fff] max-[480px]:text-[10px]'>Full Stack Web App & Android App Developer</h3>
                                <h3 className=' text-[12px] text-center  font-[500]  text-[#fff] max-[480px]:text-[10px]'>CSE With IOT ( 2k22 )</h3>
                            </div>
                            <div className=' w-[100%] h-[30%] gap-2  flex justify-center items-center'>
                                <NavLink to='https://github.com/vikashkrdeveloper' target=' _ ' className='max-[600px]:w-[36px] max-[600px]:h-[36px] max-[480px]:w-[30px] max-[480px]:h-[30px] w-[46px] h-[46px] border-[1px] border-[#1d3641] hover:bg-[#1d3b5d] transition ease-in-out delay-200  bg-[#111f27] rounded-[50%] flex justify-center items-center'>
                                    <i className="fa-brands  fa-github text-[#fff] text-[24px] max-[600px]:text-[20px] max-[480px]:text-[15px]"></i>
                                </NavLink>
                                <NavLink to='https://www.linkedin.com/in/vikash-kumar-8467b0253/' target=' _ ' className='max-[480px]:w-[30px] max-[480px]:h-[30px] max-[600px]:w-[36px] max-[600px]:h-[36px]  w-[46px] border-[1px] border-[#1d3641] hover:bg-[#1d3b5d] transition ease-in-out delay-200 h-[46px] bg-[#172730] rounded-[50%] flex justify-center items-center'>
                                    <i className="fa-brands fa-linkedin-in text-[#fff] text-[20px] max-[600px]:text-[20px] max-[480px]:text-[15px]"></i>
                                </NavLink>
                                <NavLink to='https://www.instagram.com/vikashkrdeveloper/' target=' _ ' className='max-[480px]:w-[30px] max-[480px]:h-[30px] max-[480px]:hidden max-[600px]:w-[36px] max-[600px]:h-[36px]  w-[46px] h-[46px] border-[1px] border-[#1d3641] hover:bg-[#1d3b5d] transition ease-in-out delay-200  bg-[#111f27] rounded-[50%] flex justify-center items-center'>
                                    <i className="fa-brands fa-instagram text-[#fff] text-[20px] max-[600px]:text-[20px] max-[480px]:text-[15px]"></i>
                                </NavLink>
                                <NavLink to={'https://easylearnvikash.tech'} target=' _ ' className='max-[480px]:w-[30px] max-[480px]:h-[30px] max-[600px]:w-[36px] max-[600px]:h-[36px]  w-[46px] h-[46px] border-[1px]  border-[#1d3641] hover:bg-[#1d3b5d] transition ease-in-out delay-200  bg-[#111f27] rounded-[50%] flex justify-center items-center'>
                                    <i className="fa-solid fa-user   text-[#fff] text-[18px] max-[600px]:text-[20px] max-[480px]:text-[15px]"></i>
                                </NavLink>
                                <NavLink to='mailto:vikashjjp728@gmail.com' className='max-[480px]:w-[30px] max-[480px]:h-[30px] max-[600px]:w-[36px] max-[600px]:h-[36px]  w-[46px] h-[46px]  border-[1px] border-[#1d3641] hover:bg-[#1d3b5d] transition ease-in-out delay-200  bg-[#111f27] rounded-[50%] flex justify-center items-center'>
                                    <i className="fa-solid fa-envelope  text-[#fff] text-[20px] max-[600px]:text-[20px] max-[480px]:text-[15px]"></i>
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </div> */}
            </div>
            <MainFooter />
        </>
    )
}

export default ContactsPage
