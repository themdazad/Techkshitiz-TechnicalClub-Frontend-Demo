import React from "react";
import PrincipalImages from "../images/PrincipalSir.jpg";
import SundramMishra from "../images/SundramMishra.jpeg";
import YamikaPatel from "../images/yamikapatel.jpg";
import MohitPrakash from "../images/mohitprakash.jpg";
const ProfessorAndPrincipalPortfolio = () => {
  return (
    <>
      <section className="bg-[#0d1526]  w-full h-auto p-10 pt-2 pb-20 flex flex-col ">
        <div className=" h-[auto] bg-[#0d1526] flex gap-[200px]  justify-center p-10 pt-0 pb-0  max-xl:flex-col  max-md:p-0 max-xl:gap-8 max-lg:gap-4">
          <div className="w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none">
            <img
              className="w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]"
              src={PrincipalImages}
              alt="PrincipalImages"
            />
            <h1 className="text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0">
              Prof.(Dr.) Suryakant Singh
            </h1>
          </div>
          <div className=" w-[736px]  max-mll:w-[650px] max-xl:w-full">
            <h1 className="font-[700] text-[40px] p-1 text-[#ffffff] max-sm-m:text-[30px]">
              Principal's Message
            </h1>
            <hr className="border-[3px] w-[380px]  mb-8 rounded-[10px] border-[#44fd06] max-sm-m:w-full" />
            <p className="text-[#ffffffa1] text-[20px]  break-all max-sm-m:text-[16px]">
              Our mission is to foster a vibrant community of tech enthusiasts
              passionate about innovation and collaboration. Whether you're a
              beginner eager to learn or an expert ready to share your
              knowledge, our club offers a dynamic environment to grow your
              skills. Join us for workshops, hackathons, guest lectures, and
              collaborative projects. Together, we'll explore the latest in
              software development, data science, cybersecurity, and more. Be
              part of a network that not only enhances your technical expertise
              but also builds lifelong friendships and professional connections.
              Let's innovate, create, and lead the future of technology
              together!
            </p>
          </div>
        </div>
        {/* <div className=' h-[auto] bg-[#0d1526] flex gap-[200px]  justify-center p-10 pt-0 pb-0  max-xl:flex-col  max-md:p-0 max-xl:gap-8 max-lg:gap-4'>
                    <div className=' xl:hidden w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none'>
                        <img className='w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]' src={PrincipalImages} alt="PrincipalImages" />
                        <h1 className='text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0'>Prof.(Dr.) Suryakant Singh</h1>
                    </div>
                    <div className=' w-[736px]  max-mll:w-[650px] max-xl:w-full'>
                        <h1 className='font-[700] text-[40px] p-1 text-[#ffffff] max-sm-m:text-[30px]'>Dean Student Welfare's Message</h1>
                        <hr className='border-[3px]   mb-8 rounded-[10px] border-[#44fd06] md:w-[650px]  max-md:w-full' />
                        <p className='text-[#ffffffa1] text-[20px]  break-all max-sm-m:text-[16px]'>As the Dean of Student Welfare, I'm thrilled to witness the boundless creativity and passion for technology within our community. In this ever-evolving digital landscape, our tech club serves as your playground for exploration, collaboration, and growth. From coding marathons to futuristic workshops, there's something here for every curious mind and inventive spirit. But beyond the ones and zeros, our club is a vibrant tapestry of personalities, united by a shared love for all things tech. Together, we'll break barriers, forge friendships, and pave the way for a brighter, more connected future.</p>
                    </div>
                    <div className='max-xl:hidden w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none'>
                        <img className='w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]' src={PrincipalImages} alt="PrincipalImages" />
                        <h1 className='text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0'>Prof.(Dr.) Suryakant Singh</h1>
                    </div>
                </div> */}
        <div className=" flex justify-center items-center w-full pb-5 pt-10">
          <h1 className="font-[700] text-[40px] p-1 text-[#ffffff] text-center max-sm-m:text-[30px]">
            Faculty Coordinator's
          </h1>
        </div>
        <div className=" h-[auto] bg-[#0d1526] flex gap-[200px]  max-w-[1440px] max-sm:w-full m-auto justify-between p-10 pt-0 pb-0  max-xl:flex-col  max-md:p-0 max-xl:gap-8 max-lg:gap-4">
          <div className="w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none">
            <img
              className="w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]"
              src={SundramMishra}
              alt="Faculty"
            />
            <h1 className="text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0">
              Prof. Sundram Mishra
            </h1>
          </div>
          <div className="w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none">
            <img
              className="w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]"
              src={YamikaPatel}
              alt="YamikaPatel"
            />
            <h1 className="text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0">
              Prof. Yamika Patel
            </h1>
          </div>
          <div className="w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none">
            <img
              className="w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]"
              src={MohitPrakash}
              alt="Faculty"
            />
            <h1 className="text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0">
              Prof. Mohit Prakash
            </h1>
          </div>
          {/* <div className=' w-[736px]  max-mll:w-[650px] max-xl:w-full'>
                        <h1 className='font-[700] text-[40px] p-1 text-[#ffffff] max-sm-m:text-[30px]'>Faculty Coordinator's Message</h1>
                        <hr className='border-[3px]  mb-8 rounded-[10px] border-[#44fd06] md:w-[600px]  max-md:w-full' />
                        <p className='text-[#ffffffa1] text-[20px]  break-all max-sm-m:text-[16px]'>It is my privilege to foster an environment where curiosity thrives, knowledge is shared, and connections are made. We're all about exploring cool tech stuff together. Whether you're a pro or just starting out, there's something here for you. We've got workshops, talks, and events that cover everything from coding to gadgets. From hands-on workshops to engaging discussions, we offer a diverse array of events tailored to suit every interest and skill level. My goal is to ensure that every member feels supported, valued, and inspired to explore the endless possibilities that technology has to offer. Together, let's harness the power of collaboration and innovation to push the boundaries of what's possible and shape the future of technology. I invite you to dive in, get involved, and embark on this exciting journey with us.</p>
                    </div> */}
        </div>
        {/* <div className=' h-[auto] bg-[#0d1526] flex gap-[200px]  justify-center p-10 pt-0 pb-0  max-xl:flex-col  max-md:p-0 max-xl:gap-8 max-lg:gap-4'>
                    <div className=' xl:hidden w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none'>
                        <img className='w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]' src={YamikaPatel} alt="YamikaPatel" />
                        <h1 className='text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0'>Prof. Yamika Patel</h1>
                    </div>
                    <div className=' w-[736px]  max-mll:w-[650px] max-xl:w-full'>
                        <h1 className='font-[700] text-[40px] p-1 text-[#ffffff] max-sm-m:text-[30px]'>Faculty Coordinator's Message</h1>
                        <hr className='border-[3px]   mb-8 rounded-[10px] border-[#44fd06] md:w-[650px]  max-md:w-full' />
                        <p className='text-[#ffffffa1] text-[20px]  break-all max-sm-m:text-[16px]'>It is my privilege to foster an environment where curiosity thrives, knowledge is shared, and connections are made. We're all about exploring cool tech stuff together. Whether you're a pro or just starting out, there's something here for you. We've got workshops, talks, and events that cover everything from coding to gadgets. From hands-on workshops to engaging discussions, we offer a diverse array of events tailored to suit every interest and skill level. My goal is to ensure that every member feels supported, valued, and inspired to explore the endless possibilities that technology has to offer. Together, let's harness the power of collaboration and innovation to push the boundaries of what's possible and shape the future of technology. I invite you to dive in, get involved, and embark on this exciting journey with us.</p>
                    </div>
                    <div className='max-xl:hidden w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none'>
                        <img className='w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]' src={YamikaPatel} alt="YamikaPatel" />
                        <h1 className='text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0'>Prof. Yamika Patel</h1>
                    </div>
                </div> */}
        {/* <div className=' h-[auto] bg-[#0d1526] flex gap-[200px]  justify-center p-10 pt-0 pb-0  max-xl:flex-col  max-md:p-0 max-xl:gap-8 max-lg:gap-4'>
                    <div className='w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 select-none'>
                        <img className='w-[330px] h-[350px] rounded-[20px] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]' src={MohitPrakash} alt="Faculty" />
                        <h1 className='text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0'>Prof. Mohit Prakash</h1>
                    </div>
                    <div className=' w-[736px]  max-mll:w-[650px] max-xl:w-full'>
                        <h1 className='font-[700] text-[40px] p-1 text-[#ffffff] max-sm-m:text-[30px]'>Faculty Coordinator's Message</h1>
                        <hr className='border-[3px]  mb-8 rounded-[10px] border-[#44fd06] md:w-[600px]  max-md:w-full' />
                        <p className='text-[#ffffffa1] text-[20px]  break-all max-sm-m:text-[16px]'>It is my privilege to foster an environment where curiosity thrives, knowledge is shared, and connections are made. We're all about exploring cool tech stuff together. Whether you're a pro or just starting out, there's something here for you. We've got workshops, talks, and events that cover everything from coding to gadgets. From hands-on workshops to engaging discussions, we offer a diverse array of events tailored to suit every interest and skill level. My goal is to ensure that every member feels supported, valued, and inspired to explore the endless possibilities that technology has to offer. Together, let's harness the power of collaboration and innovation to push the boundaries of what's possible and shape the future of technology. I invite you to dive in, get involved, and embark on this exciting journey with us.</p>
                    </div>
                </div> */}
      </section>
    </>
  );
};

export default ProfessorAndPrincipalPortfolio;
