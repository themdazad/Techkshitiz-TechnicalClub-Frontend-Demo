/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

// icons
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CgScrollH } from "react-icons/cg";

// faculty images
const PrincipalImages = "/images/faculty/PrincipalSir.jpg";
const SundramMishra = "/images/faculty/SundramMishra.jpeg";
const YamikaPatel = "/images/faculty/yamikapatel.jpg";
const MohitPrakash = "/images/faculty/mohitprakash.jpg";

export const TechkshitizMember = () => {
  return (
    <div className="bg-[#0d1526] px-[5%]  w-full h-auto  flex flex-col ">
      {/* Principal's Message: */}
      <section className="principal-message my-12 bg-[#0d1526] flex gap-[200px]  justify-center items-center max-xl:flex-col  max-md:p-0 max-xl:gap-8 max-lg:gap-4">
        <div className="w-[350px] h-[400px] mt-10 max-sm:mt-1 flex  xl:flex-col max-xl:w-full max-xl:gap-10 max-lg:p-0 max-sm:flex-col justify-center items-center p-3 ">
          <img
            className="w-[330px] h-[350px] rounded-3xl hover:bg-[#1f314b] max-lg:w-[250px] max-lg:h-[280px] max-sm:w-[280px] max-sm:h-[300px]"
            src={PrincipalImages}
            alt="PrincipalImages"
          />
          <h1 className="text-[#FFFFFF] text-[22px] leading-[30px] font-[700] mt-5 max-md:mt-0">
            Prof.(Dr.) Suryakant Singh
          </h1>
        </div>
        <div className=" w-[736px] p-4 max-mll:w-[650px] max-xl:w-full">
          <h1 className="font-[700] text-[40px] p-1 text-sky-600 max-sm-m:text-[30px]">
            Principal's Message
          </h1>
          <hr
            className="h-[2px] w-[300px] mg:w-[350px] border-none rounded-[10px] bg-gradient-to-r from-transparent via-sky-600 to-transparent"
            style={{
              borderImage:
                "linear-gradient(to right, transparent, sky-600, transparent)",
              borderImageSlice: 1,
            }}
          />
          <p className="text-[#ffffffa1] text-[20px] text-justify break-all max-sm-m:text-[16px]">
            Our mission is to foster a vibrant community of tech enthusiasts
            passionate about innovation and collaboration. Whether you're a
            beginner eager to learn or an expert ready to share your knowledge,
            our club offers a dynamic environment to grow your skills. Join us
            for workshops, hackathons, guest lectures, and collaborative
            projects. Together, we'll explore the latest in software
            development, data science, cybersecurity, and more. Be part of a
            network that not only enhances your technical expertise but also
            builds lifelong friendships and professional connections. Let's
            innovate, create, and lead the future of technology together.
          </p>
        </div>
      </section>
      {/* Principal's Message:End */}

      <ClubIncharge />
      <CoreTeam />
      
    </div>
  );
};

// Club Incharge Details
const ClubIncharge = () => {
  return (
    <section className="club_incharge">
      <div className="club_incharge_heading max-w-max">
        <h1 className="font-[700] text-[40px] p-1 text-sky-600 max-sm-m:text-[30px]">
          Club Incharge
        </h1>
        <hr
          className="h-[2px] w-full  border-none rounded-[10px] bg-gradient-to-r from-transparent via-sky-600 to-transparent"
          style={{
            borderImage:
              "linear-gradient(to right, transparent, sky-600, transparent)",
            borderImageSlice: 1,
          }}
        />
      </div>

      <div className="gap-4 grid justify-stretch lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-6">
        <MemberCard
          src={SundramMishra}
          name="Prof. Sundram Mishra"
          role="Electrical Engineering"
        />
        <MemberCard
          src={YamikaPatel}
          name="Prof. Yamika Patel"
          role="Mechanical Engineering"
        />
        <MemberCard
          src={MohitPrakash}
          name="Prof. Mohit Prakash"
          role="Electrical Engineering"
        />
      
      </div>
    
    </section>
  );
};

// Developer Members Details
const CoreTeam = () => {
  return (
    <section className="club_member py-12 text-white">
      {/* Heading  */}
      <div className="club_member_heading max-w-max">
        <h1 className="text-3xl p-1 text-sky-600 max-sm-m:text-[30px]">
          Technical Team
        </h1>
        <hr
          className="h-[2px] w-full border-none rounded-[10px] bg-gradient-to-r from-transparent via-sky-600 to-transparent"
          style={{
            borderImage:
              "linear-gradient(to right, transparent, sky-600, transparent)",
            borderImageSlice: 1,
          }}
        />
      </div>
      {/* card  */}
      <div className="cards overflow-scroll snap-x snap-mandatory py-6 space-x-4 flex" >

        {/* 1st person  */}
        <div className="snap-center p-4 min-w-[300px] max-sm:w-full bg-sky-600/10 rounded-3xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img
            className="block aspect-square mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
            src="https://avatars.githubusercontent.com/u/128849038?v=4"
            alt="vikash github profile "
          />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-sky-600 font-semibold">Vikash Kumar</p>
              <p className="text-slate-400 font-medium">
               Full Stack Developer
              </p>
            </div>
            <div className="social_links flex max-sm:justify-center space-x-2">
              <a href="https://www.instagram.com/vikashkrdeveloper/">
                <FaInstagram />
              </a>
              <a href="https://github.com/vikashkrdeveloper">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/vikash-kumar-8467b0253/">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* 2nd person  */}
        <div className="snap-center p-4 min-w-[300px] max-sm:w-full bg-sky-600/10 rounded-3xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img
            className="block aspect-square mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
            src="https://avatars.githubusercontent.com/u/81636077?v=4"
            alt="the_mdazad github profile "
          />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-sky-600 font-semibold">Md Azad</p>
              <p className="text-slate-400 font-medium">
                UI/UX | Frontend Developer
              </p>
            </div>
            <div className="social_links flex max-sm:justify-center space-x-2">
              <a href="https://www.instagram.com/the_mdazad/">
                <FaInstagram />
              </a>
              <a href="https://github.com/modest-azad">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/modest-azad/">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* 3rd person  */}
        <div className="snap-center p-4 min-w-[300px] max-sm:w-full bg-sky-600/10 rounded-3xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img
            className="block aspect-square mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
            src="/images/Team/shaan.jpeg"
            alt="shahnoor github profile "
          />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-sky-600 font-semibold">Shahnoor Ishtiyaque
              </p>
              <p className="text-slate-400 font-medium">
                Photographer
              </p>
            </div>
            <div className="social_links flex max-sm:justify-center space-x-2">
              <a href="https://www.instagram.com/shahnoorishtiyaque/">
                <FaInstagram />
              </a>
              
            </div>
          </div>
        </div>

        {/* 4th person  */}
        <div className="snap-center p-4 min-w-[300px] max-sm:w-full bg-sky-600/10 rounded-3xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img
            className="block aspect-square mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
            src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
            alt="shahnoor github profile "
          />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-sky-600 font-semibold">Bittu Kumar
              </p>
              <p className="text-slate-400 font-medium">
                Graphic Designer
              </p>
            </div>
            <div className="social_links flex max-sm:justify-center space-x-2">
              {/* <a href="https://www.instagram.com//">
                <FaInstagram />
              </a> */}
              
            </div>
          </div>
        </div>

      </div>
      <center className="text-3xl"><CgScrollH /></center>
    </section>
  );
};

const MemberCard = ({ src, name, role }) => {
  return (
    <>
      {/* members details card  */}
      <div className="py-8 px-8 w-full space-y-2 mx-auto bg-sky-600/10 rounded-3xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
       
        <img
          className="aspect-square mx-auto rounded-full overflow-hidden sm:mx-0 sm:shrink-0"
          src={src} height={80} width={80}
          alt="club faculty coordinator"
          />
        

        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-sky-600 font-semibold">{name}</p>
            <p className="text-slate-400 font-medium">{role}</p>
          </div>
        </div>
      </div>
    </>
  );
};
