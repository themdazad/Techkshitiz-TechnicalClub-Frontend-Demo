import React, { useEffect, useState } from 'react'
import MainHeader from '../../MainHeader.tsx'
import MainFooter from '../../MainFooter.tsx'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import SchawnnajAnimatedLoader from '../../../Loader/SchawnnajAnimatedLoader.tsx'
import { toast } from 'react-toastify'
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function CampusAmbassadorLandingPage() {
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const [IsLogin, SetIsLogin] = useState<boolean>(false);
    const [getdata, setdata] = useState<string[]>([]);
    const [CampusAmbassadorStatus, SetCampusAmbassadorStatus] = useState(true);
    const [CampusAmbassadorApplicationStatus, SetCampusAmbassadorApplicationStatus] = useState(false);
    const [IsLoadingRequest, setIsLoadingRequest] = useState(false);
    const [IsEligibleCampusAmbassdor, SetIsEligibleCampusAmbassdor] = useState(false);
    const navigate = useNavigate();
    const verifydata = async () => {
        try {
            SetIsLoading(true)
            const res = await fetch(baseUrl + '/api/v1/student/profile/data', {
                method: 'GET',
                credentials: 'include'
            })
            if (res.status === 200) {
                const data = await res.json();
                if (Number(data?.data?.participant_Roll) === 1 || Number(data?.data?.participant_Roll) === 0) {
                    if (data.data) {
                        if (data.data.participant_Profile_Avtar) {
                            const uint8Array = new Uint8Array(data.data.participant_Profile_Avtar.data.data);
                            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                            const dataUrl = URL.createObjectURL(blob);
                            data.data.participant_Profile_Avtar = dataUrl;
                        }
                        setdata(data.data);
                        SetIsLogin(true);
                    }
                    SetIsLoading(false)
                } else {
                    SetIsLogin(false);
                    SetIsEligibleCampusAmbassdor(true);
                    SetIsLoading(false)
                    if (Number(data?.data?.participant_Roll) !== 4) {
                        toast.warning("You're not eligible for the campus ambassador program as it is only open to students");
                    }
                }
                const CampusAmbassadorApplicationStatus = await fetch(`${baseUrl}/api/v1/student/profile/campus/ambassdor/application/status/${data?.data?.techk_Shitiz_Id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (CampusAmbassadorApplicationStatus.status === 200) {
                    const CampusAmbassdorApplicationData = await CampusAmbassadorApplicationStatus.json();
                    SetCampusAmbassadorApplicationStatus(CampusAmbassdorApplicationData?.data?.participant_Campus_Ambassdor_Application_Verified);
                    SetCampusAmbassadorStatus(false);
                }
                SetIsLoading(false)
            } else {
                SetIsLogin(false);
                SetIsLoading(false)
            }
        } catch (error) {

            SetIsLogin(false);
            SetIsLoading(false)
        }
    }

    const datasubmit = async () => {
        setIsLoadingRequest(true)
        try {
            const res = await fetch(`${baseUrl}/api/v1/student/profile/campus/ambassdor/registration/${Object(getdata)?.techk_Shitiz_Id}`, {
                method: "POST",
                credentials: 'include',
            });

            if (res.status === 200) {
                toast.success("Your campus ambassador application request was successfully sent your application is under process please wait ");
                SetCampusAmbassadorStatus(false);
                setIsLoadingRequest(false)
            } else if (res.status === 400) {
                toast.error("All field require");
                setIsLoadingRequest(false)

            } else if (res.status === 401) {
                toast.error("You're not eligible to apply for techkshitiz campus ambassdor");
                setIsLoadingRequest(false)
            } else if (res.status === 402) {
                toast.error("You're already  apply for techkshitiz campus ambassdor");
                setIsLoadingRequest(false)

            } else {
                toast.error("Some technical issue");
                setIsLoadingRequest(false)
            }
        } catch (error) {
            toast.error("Some technical issue");
            setIsLoadingRequest(false)

        }

    };

    const CampusAmbassadorApply = () => {
        if (IsLogin) {
            const verifyciation = window.confirm("Are you sure you want to apply for the campus ambassador position? ");
            if (verifyciation) {
                datasubmit();
            }
        } else {
            toast.warning("You're not login please login");
            navigate('/government-engineering-college-siwan/student/login')
        }
    }

    useEffect(() => {
        verifydata();
    }, [])
    if (IsLoadingRequest) {
        return <SchawnnajAnimatedLoader />
    }
    if (IsLoading) {
        return <SchawnnajAnimatedLoader />
    }
    const NavigateCampusAmbassdorProfile = () => {
        navigate('/campus/ambassador/profile')
    }
    return (
        <>
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name='title' content="TechKshitiz Campus Ambassador" />
                <meta name="description" content="" />
                <title>TechKshitiz campus ambassador</title>
            </Helmet>
            <MainHeader />
            <div className='w-full h-full flex justify-center items-start p-[20px]  max-md:p-[18px] bg-[#0f1526] pl-10'>
                <div className='w-[96%] text-[#ffffffcd] '>
                    <h1 className='p-[10px] pl-0 text-[40px] font-[700] text-[#ffdd04] max-sm:text-[30px]'>Campus Ambassador Program</h1>
                    <p className='pl-6 text-[20px]  leading-8  tracking-wider font-[400]  pb-6 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Welcome to the TechKshitiz Campus Ambassador Program! We are excited to offer you the chance to represent our dynamic technical club, TechKshitiz, at Government Engineering College Siwan. As a campus ambassador, you will have a crucial role in promoting awareness about our club's events, initiatives, and a range of benefits within your college community.</p>

                    <h1 className='p-[10px] pl-0 text-[40px] font-[700] text-[#ffdd04]  max-sm:text-[30px]'>TechKshitiz Community ID Access</h1>

                    <p className='pl-6 text-[20px]  leading-8  tracking-wider font-[400] text-[#e3f5ffa3]  pb-6 max-sm:text-[15px] max-sm:leading-6'>After successfully completing your task, you will receive a unique TechKshitiz Community ID Access. With this ID, you will be able to access exclusive resources, take part in discussions, and collaborate with other members of our TechKshitiz community. Join a world of innovation and collaboration as you connect with other enthusiasts, industry experts, and thought leaders.</p>

                    <h1 className='p-[10px] pl-0 text-[40px] font-[700] text-[#ffdd04]  max-sm:text-[30px]'>Are you interested in becoming a TechKshitiz Campus Ambassador? Here's why you should</h1>
                    <ol className=' list-decimal pl-10 text-[20px]  leading-8 text-[#e3f5ffa3]  tracking-wider font-[400] max-sm:text-[15px] max-sm:leading-6  pb-6'>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Access to Technical Events and Competitions: Take part in a diverse range of events and competitions and immerse yourself in the latest technologies. You can showcase your skills and expand your knowledge base while staying ahead of the curve.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Recognition and Awards: Your hard work won't go unnoticed. The club rewards and celebrates ambassadors who show dedication and make significant contributions. You can shine bright and earn recognition for your achievements, setting yourself apart as a leader in the tech community.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Hands-on Project Opportunities: Explore and work on exciting projects that offer real-world learning experiences. This can empower you to improve your technical skills. From software development to hardware prototyping, you can unleash your creativity and make an impact through tangible solutions.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6' >Exclusive Goodies: As a sign of gratitude for your commitment, we offer exclusive TechKshitiz merchandise and goodies. You can flaunt your TechKshitiz swag with pride and represent our club wherever you go.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6' >Networking Galore: Forge connections with peers, industry professionals, and experts. You can expand your network and open doors to new opportunities. Building lasting relationships can unlock future collaborations that can propel your career forward.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Certification: Earn official certificates that recognize your role as a TechKshitiz Campus Ambassador. This can bolster your resume and professional profile. You can validate your expertise and stand out from the crowd in the competitive job market.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Personal and Professional Growth: Develop invaluable leadership, communication, and organizational skills essential for your personal and professional advancement. You can step into leadership roles, hone your public speaking abilities, and cultivate a growth mindset that drives continuous improvement.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Exclusive Workshops and Training: Access specialized workshops and training sessions tailored to hone your technical expertise and soft skills. From coding boot camp to leadership seminars, you can equip yourself with the tools needed to thrive in today's dynamic tech landscape.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Abundant Resources: Gain access to a wealth of technical resources, including articles, tutorials, and study materials, to support your learning journey. Stay informed and stay inspired as you explore new technologies and expand your horizons.</li>
                        <li className='pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>Community Representation: Serve as the face of TechKshitiz, championing our values, mission, and activities to your peers and faculty members. You can be a catalyst for change within your college community and inspire others to join our quest for innovation and progress.
                            Task Completion Benefits</li>

                    </ol>
                    <h1 className='  p-[10px] pl-0 text-[40px] font-[700] text-[#ffdd04]  max-sm:text-[30px]'>
                        Task Completion Benefits
                    </h1>
                    <h1 className='  p-[10px] pl-0 text-[20px] font-[00] pb-3   '>
                        <span className=' text-[#e10753] font-[700] mr-2'>
                            Note
                            <span className='text-[#ff305d] font-[700]'>*</span>
                            <span className='text-[#ffffff] font-[700] ml-2'>:-</span>
                        </span>
                        <span>If you manage to bring at least 10 students to our TechKshitiz event, you will be entitled to even more exclusive perks.</span>
                    </h1>
                    <ul className=' list-disc pl-10 text-[20px]  leading-8 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6  tracking-wider font-[400]  pb-6'>
                        <li className=' list-disc pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6' >You will have access to all the benefits mentioned earlier.</li>
                        <li className=' list-disc  pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>You will receive exclusive recognition and awards for your exceptional contribution.</li>
                        <li className=' list-disc  pb-3 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6'>You will have enhanced opportunities for personal and professional growth through specialized mentorship programs.</li>
                        <li className=' list-disc  pb-3 max-sm:text-[15px] max-sm:leading-6'>You will be given priority consideration for leadership roles within the club.</li>
                        <li className=' list-disc  pb-3 max-sm:text-[15px] max-sm:leading-6'>You will also receive additional goodies and perks as a token of our appreciation for your outstanding performance.</li>
                    </ul>
                    <h1 className=' p-[10px] pl-0 text-[40px] font-[700] text-[#ffdd04]  max-sm:text-[30px]'>Benefits of Incomplete Tasks</h1>
                    <h1 className='  p-[10px] pl-0 text-[20px] font-[00] pb-3 '>
                        <span className=' text-[#e10753] font-[700] mr-2'>
                            Note
                            <span className='text-[#ff305d] font-[700]'>*</span>
                            <span className='text-[#ffffff] font-[700] ml-2'>:-</span>
                        </span>
                        <span>Even if you are unable to complete your task, your dedication will not go unnoticed. You will still receive the following benefits.</span>
                    </h1>
                    <ul className='list-disc pl-10 text-[20px] text-[#e3f5ffa3]  leading-8 max-sm:text-[15px] max-sm:leading-6  tracking-wider font-[400]  pb-6'>
                        <li className='list-disc pb-3 max-sm:text-[15px] max-sm:leading-6'>Certificates acknowledging your participation as a TechKshitiz Campus Ambassador.</li>
                        <li className='list-disc pb-3 max-sm:text-[15px] max-sm:leading-6'>Opportunities for personal and professional growth through club activities and workshops.</li>
                        <li className='list-disc pb-3 max-sm:text-[15px] max-sm:leading-6'>Leadership opportunities within the club, enabling you to make meaningful contributions.</li>
                        <li className='list-disc pb-3 max-sm:text-[15px] max-sm:leading-6'>Continued access to technical resources and networking opportunities.</li>
                    </ul>
                    <h1 className='p-[10px] pl-0 text-[40px] font-[700] text-[#ffdd04]  max-sm:text-[30px]'>Join the TechKshitiz Family</h1>
                    <p className='pl-6 text-[20px]  leading-8 text-[#e3f5ffa3] max-sm:text-[15px] max-sm:leading-6  tracking-wider font-[400]  pb-6 '>When you become a TechKshitiz Campus Ambassador, you're not just joining a club - you're becoming part of a supportive community dedicated to innovation, learning, and growth. Join us at Government Engineering College Siwan to help shape the future of technology. Become a TechKshitiz Campus Ambassador today and start an exciting journey of learning, growth, and impact!</p>

                    <div className='mb-8 mt-6 w-full h-[60px] flex justify-start items-center max-md:justify-end'>
                        {


                            CampusAmbassadorApplicationStatus ? (
                                <button onClick={NavigateCampusAmbassdorProfile} style={{ transition: 'all 0.8s' }} className='w-[200px] h-[45px] rounded-[5px] flex justify-center items-center outline-none border-[2px]  hover:shadow-[inset_0px_0px_8px_2px_#18223c] shadow-[0px_0px_8px_2px_#1b2541] border-[#1b2541] text-[18px] text-[#0f1526] hover:text-[#fff] font-[700] bg-[#35a735]  hover:bg-[#273354] max-md:w-[150px] cursor-pointer select-none'>View CA Profile</button>
                            ) : (
                                CampusAmbassadorStatus ? (
                                    IsEligibleCampusAmbassdor ? (
                                        <button disabled={CampusAmbassadorStatus} style={{ transition: 'all 0.8s' }} className='w-[250px]  h-[45px] rounded-[5px] flex justify-center items-center outline-none border-[2px] shadow-[0px_0px_1px_1px_#0f1526] border-[#1b2541] text-[18px]  cursor-not-allowed text-[#0f1526] font-[700] bg-[#173b179f]    max-md:w-[200px] max-md:text-[15px] select-none'>You're Not Eligible</button>
                                    ) : (
                                        <button onClick={CampusAmbassadorApply} disabled={!CampusAmbassadorStatus} style={{ transition: 'all 0.8s' }} className='w-[200px] h-[45px] rounded-[5px] flex justify-center items-center outline-none border-[2px]  shadow-[inset_0px_0px_8px_2px_#18223c] hover:shadow-[0px_0px_8px_2px_#1b2541] border-[#1b2541] text-[18px] hover:text-[#0f1526] font-[700] hover:bg-[#35a735]  bg-[#273354] max-md:w-[150px] cursor-pointer select-none'>Apply Now</button>

                                    )
                                ) : (
                                    <button disabled={CampusAmbassadorStatus} style={{ transition: 'all 0.8s' }} className='w-[250px]  h-[45px] rounded-[5px] flex justify-center items-center outline-none border-[2px] shadow-[0px_0px_1px_1px_#0f1526] border-[#1b2541] text-[18px]  cursor-not-allowed text-[#0f1526] font-[700] bg-[#173b179f]    max-md:w-[200px] max-md:text-[15px] select-none'>You're Already Applyed</button>
                                )
                            )

                        }
                    </div>
                </div>
            </div >
            <MainFooter />

        </>
    )
}

export default CampusAmbassadorLandingPage 