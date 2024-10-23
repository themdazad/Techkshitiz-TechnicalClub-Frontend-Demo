import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './components/views/ResetPassword.tsx';
import Home from './components/views/Home.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from './Error.tsx';
// import EventListPage from './components/views/EventListPage.tsx';
import ClubListPage from './components/partials/Partials/Club/ClubListPage.tsx';
import ContactsPage from './components/views/ContactsPage.tsx';
import ParticipantProfile from './components/partials/ParticipantProfile.tsx';
import TestPageHome from './components/partials/Partials/Coding/TestPageHome.tsx';
import CodingEventTermsAndConditions from './components/partials/Partials/Coding/CodingEventTermsAndConditions.tsx';
import CodingIde from './components/partials/Partials/Coding/CodingIde.tsx';
import GalleryEvent from './components/views/GalleryEvent.tsx';
import ClubMembers from './components/partials/Partials/Club/ClubMembers.tsx';
import ContestList from './components/partials/Partials/Contest/ContestList.tsx';
import CodingEventParticipantRegistration from './components/partials/Partials/Coding/CodingEventParticipantRegistration.tsx';
import HackathonEventRegistration from './components/views/HackathonEventRegistration.tsx';
import LogoEventRegistration from './components/views/LogoEventRegistration.tsx';
import BgmiEventRegistration from './components/views/BgmiEventRegistration.tsx';
import QuizEventParticipantRegistration from './components/partials/Partials/Quiz/QuizEventParticipantRegistration.tsx';
import Clubfacke from './components/partials/Partials/Club/Clubfacke.tsx';
import QuizIde from './components/partials/Partials/Quiz/QuizIde.tsx';
import TestPageQuizHome from './components/partials/Partials/Quiz/TestPageQuizHome.tsx';
import QuizEventTermsAndConditions from './components/partials/Partials/Quiz/QuizEventTermsAndConditions.tsx';
import CodingLogin from './components/partials/Partials/Coding/CodingLogin.tsx';
import CodingContestEndPage from './components/partials/Partials/Coding/CodingContestEndPage.tsx';
import QuizContestEndPage from './components/partials/Partials/Quiz/QuizContestEndPage.tsx';
import BgmiLiveStream from './BgmiLiveStream.tsx';
import { useEffect, useState } from 'react';
import ClubDescriptionAndAllDetails from './components/partials/Partials/Club/ClubDescriptionAndAllDetails.tsx';
import CatrasoAnimationLoading from './components/Loader/CatrasoAnimationLoading.tsx';
import HallOfFameHomePage from './components/partials/Partials/HallOfFame/HallOfFameHomePage.tsx';
import CommunityFirstPage from './components/partials/Partials/Community/Home/CommunityFirstPage.tsx';
import ChartPanel from './components/partials/Partials/Community/Chart/ChartPanel.tsx';
import UserSignup from './components/partials/Partials/Community/Chart/UserSignup.tsx';
import UserLogin from './components/partials/Partials/Community/Chart/UserLogin.tsx';
import CertifcateHome from './components/partials/Partials/Certificate/CertifcateHome.tsx';
import VerifyCertificate from './components/partials/Partials/Certificate/VerifyCertificate.tsx';
import CollegeStudent from './components/pages/CollegeStudent/CollegeStudentLogin.tsx';
import ProfessorLogin from './components/pages/Professor/ProfessorLogin.tsx';
import CollegeStudentSignupRequest from './components/pages/CollegeStudent/CollegeStudentSignupRequest.tsx';
import CollegeStudentOtpVerification from './components/pages/CollegeStudent/CollegeStudentOtpVerification.tsx';
import CampusAmbassadorLandingPage from './components/partials/Partials/CampusAmbassador/CampusAmbassadorLandingPage.tsx';
import StudentPaneHome from './components/Panel/StudentPanel/StudentPaneHome.tsx';
import EventListPage from './components/partials/Partials/event/EventListPage.tsx';
import EventListDescription from './components/partials/Partials/event/EventListDescription.tsx';
import RegistrationsApplicationsDetails from './components/Panel/StudentPanel/RegistrationsApplicationsDetails.tsx';
import Referrals from './components/Panel/StudentPanel/Referrals.tsx';
import AddMembers from './components/Panel/StudentPanel/AddMembers.tsx';
import TechkshitizAwards from './components/Panel/StudentPanel/TechkshitizAwards.tsx';
import Watchlist from './components/Panel/StudentPanel/Watchlist.tsx';
import RecentlyViewed from './components/Panel/StudentPanel/RecentlyViewed.tsx';
import MentorSessions from './components/Panel/StudentPanel/MentorSessions.tsx';
import StudentCertificates from './components/Panel/StudentPanel/StudentCertificates.tsx';
import CouponsRewards from './components/Panel/StudentPanel/CouponsRewards.tsx';
import StudentProfileSetting from './components/Panel/StudentPanel/StudentProfileSetting.tsx';
import Data_Fetch_Api from './components/contexts/Data_Fetch_Api.tsx';
import ProfessorProfileHeroSection from './components/Panel/ProfessorPanel/ProfessorProfileHeroSection.tsx';
import ClubManagerPanelHeroSection from './components/Panel/ClubManagerPanel/ClubManagerPanelHeroSection.tsx';
import CampusAmbassadorPanelHeroSection from './components/Panel/CampusAmbassador/CampusAmbassadorPanelHeroSection.tsx';
import DashboardPage from './components/Panel/ClubManagerPanel/DashboardPage.tsx';
import ClubManagerEventParticipantPaymentHistory from './components/Panel/ClubManagerPanel/event/ClubManagerEventParticipantPaymentHistory.tsx';
import ClubManagerEventParticipantPaymentVerify from './components/Panel/ClubManagerPanel/event/ClubManagerEventParticipantPaymentVerify.tsx';
import ClubManagerEventRegisterDataShow from './components/Panel/ClubManagerPanel/event/ClubManagerEventRegisterDataShow.tsx';
import ClubManagerEventAdd from './components/Panel/ClubManagerPanel/event/ClubManagerEventAdd.tsx';
import ClubManagerGallery from './components/Panel/ClubManagerPanel/ClubManagerGallery.tsx';
import ClubManagerClubInchargeAdd from './components/Panel/ClubManagerPanel/ClubManagerClubInchargeAdd.tsx';
import ClubManagerEventCoordinatorAdd from './components/Panel/ClubManagerPanel/event/ClubManagerEventCoordinatorAdd.tsx';
import ClubManagerEventWinnerAdd from './components/Panel/ClubManagerPanel/event/ClubManagerEventWinnerAdd.tsx';
import ClubManagerAllQuestionShow from './components/Panel/ClubManagerPanel/ClubManagerAllQuestionShow.tsx';
import ClubManagerCodingParticipantUserIdCreate from './components/Panel/ClubManagerPanel/ClubManagerCodingParticipantUserIdCreate.tsx';
import ClubManagerQuizParticipantUserIdCreate from './components/Panel/ClubManagerPanel/ClubManagerQuizParticipantUserIdCreate.tsx';
import ClubManagerMcqQuestionAdd from './components/Panel/ClubManagerPanel/ClubManagerMcqQuestionAdd.tsx';
import ClubManagerNumericalQuestionAdd from './components/Panel/ClubManagerPanel/ClubManagerNumericalQuestionAdd.tsx';
import ClubManagerNumericalAnswerSubmitShow from './components/Panel/ClubManagerPanel/ClubManagerNumericalAnswerSubmitShow.tsx';
import ClubManagerMcqAnswerSubmitShow from './components/Panel/ClubManagerPanel/ClubManagerMcqAnswerSubmitShow.tsx';
import ClubManagerEventAllDataList from './components/Panel/ClubManagerPanel/event/ClubManagerEventAllDataList.tsx';
import Developer from './components/contexts/Developer/Developer.tsx';
import CollegeStudentIdForgot from './components/pages/CollegeStudent/CollegeStudentIdForgot.tsx';
import CollegeStudentIdPasswordForgot from './components/pages/CollegeStudent/CollegeStudentIdPasswordForgot.tsx';
import StudentPasswordForgetVerifyciation from './components/pages/CollegeStudent/StudentPasswordForgetVerifyciation.tsx';
import CommunityWaiting from './components/partials/Partials/Community/CommunityWaiting.tsx';
import AdminPanelClubManagerContestAdd from './components/Panel/ClubManagerPanel/Contest/AdminPanelContestAdd.tsx';
import ContestDescription from './components/partials/Partials/Contest/ContestDescription.tsx';
import TechKshitizUserPublicProfile from './components/public/StudentProfile/TechKshitizUserPublicProfile.tsx';
import ClubManagerLeaderBoard from './components/Panel/ClubManagerPanel/Quiz/ClubManagerLeaderBoard.tsx';
import ProfileUpdate from './components/Panel/StudentPanel/ProfileUpdate.tsx';

function App() {
  const [getYear, SetYear] = useState([2024, 2023, 2022, 2021])
  const [GetClubUrl, SetClubUrl] = useState<string[]>([]);
  const [GetEventUrl, SetEventUrl] = useState<string[]>([]);
  const [IsLoader, SetLoader] = useState<boolean>(false);
  const [IsEventUserLoader, IsUserError, UserData] = Data_Fetch_Api('/api/v1/student/profile/data')
  const [IsClubManagerEventListLoader, IsClubManagerEventListError, ClubManagerEventDataList] = Data_Fetch_Api('/api/v1/club/manager/auth/event/data/list/')
  const [IsContestDataListLoader, IsContestDataListError, ContestDataList] = Data_Fetch_Api('/api/contest/data/list/routing')
  const [TechKshitizDataListLoader, TechKshitizDataListError, TechKshitizDataList] = Data_Fetch_Api('/api/techkshitiz/user/profile/route/data')
  const baseUrl = process.env.REACT_APP_BACKEND_URL
  const Datafetchurl = async () => {
    try {
      SetLoader(true);
      const res = await fetch(baseUrl + '/api/club/data/url', {
        method: 'GET',
      })
      const resRoute = await fetch(baseUrl + '/api/event/route/data/fetch', {
        method: 'GET',
      })
      const data = await res.json();
      const resData = await resRoute.json();
      SetClubUrl(data);
      SetEventUrl(resData.data);
      SetLoader(false);
    } catch (error) {
      SetLoader(false);
    }
  }

  useEffect(() => {
    Datafetchurl();
  }, [])
  if (IsLoader || IsClubManagerEventListLoader) {
    return <CatrasoAnimationLoading />
  }
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/government-engineering-college-siwan/developer/vikash-kumar/cse(IOT)/2k22' element={<Developer />} />
        <Route path='/coding/participant/login' element={<CodingLogin />} />
        <Route path='/coding/contest/end/thanks/message' element={<CodingContestEndPage />} />
        <Route path='/quiz/contest/end/thanks/message' element={<QuizContestEndPage />} />
        {/* <Route path='/quiz/participant/login' element={<QuizLogin />} /> */}
        <Route path='/participant/password/forget/' element={<ResetPassword />} />
        {
          Object(ContestDataList)?.data ? (
            Object(ContestDataList)?.data.length > 0 ? (
              Object(ContestDataList)?.data?.map((contestData, index) => (
                <Route key={index} path={`/techkshitiz/event/${Object(contestData)?.contest_Name}/contest/${Object(contestData)?.contestUrl_Id}`} element={<ContestDescription />} />

              ))
            ) : ("")
          ) : ("")
        }{

          Object(TechKshitizDataList)?.data ? (
            Object(TechKshitizDataList)?.data.length > 0 ? (
              Object(TechKshitizDataList)?.data?.map((data, index) => (
                <Route key={index} path={`/student/v1/${data?.participant_Name}/${data?.profile_Id}`} element={<TechKshitizUserPublicProfile />} />
              ))
            ) : ("")
          ) : ("")
        }
        <Route path='/technical/events/coding/contest/' element={<TestPageHome />} />
        <Route path='/technical/events/coding/contest/terms/conditions' element={<CodingEventTermsAndConditions />} />
        <Route path='/technical/events/coding/contest/test/start-page' element={<CodingIde />} />
        <Route path='/technical/events/quiz/contest/' element={<TestPageQuizHome />} />
        <Route path='/technical/events/quiz/contest/terms/conditions' element={<QuizEventTermsAndConditions />} />
        <Route path='/technical/events/quiz/contest/test/start-page' element={<QuizIde />} />
        <Route path='/government-engineering-college-siwan/total/events/list' element={<EventListPage />} />
        <Route path='/government-engineering-college-siwan/total/clubs/list' element={<ClubListPage />} />
        <Route path='/government-engineering-college-siwan/contest/lists' element={<ContestList />} />
        <Route path='/government-engineering-college-siwan/technical-club/hall-of-fame' element={<ClubMembers />} />
        <Route path='/government-engineering-college-siwan/campus/ambassador/internship/' element={<CampusAmbassadorLandingPage />} />
        <Route path='/government-engineering-college-siwan/certificate/' element={<CertifcateHome />} />
        <Route path='/government-engineering-college-siwan/certificate/verify' element={<VerifyCertificate />} />


        {/* Community Routes */}
        {/* <Route path='/government-engineering-college-siwan/community/signin' element={<SignInPage />} /> */}
        {/* <Route path='/government-engineering-college-siwan/community/signup' element={<SignUpPage />} /> */}
        <Route path='/government-engineering-college-siwan/community' element={<CommunityWaiting />} />
        {/* <Route path='/government-engineering-college-siwan/community' element={<CommunityFirstPage />} >
          <Route path='/government-engineering-college-siwan/community' element={<DiscussionHome />} />
          <Route path='/government-engineering-college-siwan/community/ask-me-anything' element={<AskMeAnything />} />
          <Route path='/government-engineering-college-siwan/community/introduce-yourself' element={<IntroduceYourself />} />
          <Route path='/government-engineering-college-siwan/community/design' element={<Design />} />
          <Route path='/government-engineering-college-siwan/community/artificial-intelligence' element={<ArtificialIntelligence />} />
          <Route path='/government-engineering-college-siwan/community/development' element={<Development />} />
          <Route path='/government-engineering-college-siwan/community/marketing' element={<Marketing />} />
          <Route path='/government-engineering-college-siwan/community/launch-tips' element={<LaunchTips />} />
          <Route path='/government-engineering-college-siwan/community/ask-for-feedback' element={<AskForFeedback />} />
        </Route> */}

        {/*{Pages Community For Our Site} */}
        <Route path='/government-engineering-college-siwan/community/about-us' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/academics' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/admissions' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/events' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/contact-us' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/frequently-asked-question' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/resources' element={<CommunityFirstPage />} ></Route>
        <Route path='/government-engineering-college-siwan/community/join-us' element={<CommunityFirstPage />} />
        <Route path='/government-engineering-college-siwan/community/feedback' element={<CommunityFirstPage />} ></Route>

        <Route path='/government-engineering-college-siwan/community/chat' element={<ChartPanel />} />
        <Route path='/government-engineering-college-siwan/community/chat/login' element={<UserLogin />} />
        <Route path='/government-engineering-college-siwan/community/chat/register' element={<UserSignup />} />
        <Route path='/government-engineering-college-siwan/event/gallery/' element={<GalleryEvent />} />
        <Route path='/government-engineering-college-siwan/technical-club/contacts' element={<ContactsPage />} />
        <Route path='/government-engineering-college-siwan/events/team-list/2024-25' element={<EventListPage />} />
        <Route path='/coding/event/registration/form' element={<CodingEventParticipantRegistration />} />
        <Route path='/hackathon/event/registration/form' element={<HackathonEventRegistration />} />
        <Route path='/logo-design/event/registration/form' element={<LogoEventRegistration />} />
        <Route path='/bgmi/event/registration/form' element={<BgmiEventRegistration />} />
        <Route path='/quiz/event/registration/form' element={<QuizEventParticipantRegistration />} />
        <Route path='/read/details/club' element={<Clubfacke />} />
        <Route path='/government-engineering-college-siwan/events/bgmi/live-stream' element={<BgmiLiveStream />} />


        {GetClubUrl.map((element, index) => (
          <Route key={index} path={`details/${Object(element).clubname}/club/${Object(element)._id}`} element={<ClubDescriptionAndAllDetails />} />
        ))}

        {GetEventUrl.map((element, index) => (
          <Route key={index} path={`event/${Object(element).event_Name}/details/${Object(element)._id}`} element={<EventListDescription />} />
        ))}
        {getYear.map((_, index) => (
          <Route key={index} path={`/government-engineering-college-siwan/hall-of-fame`} Component={HallOfFameHomePage} />
        ))}




        {/*Student Profile*/}
        <Route path='/government-engineering-college-siwan/student/login' element={<CollegeStudent />} />
        <Route path='/government-engineering-college-siwan/student/techkshitiz/id/forget/' element={<CollegeStudentIdForgot />} />
        <Route path='/government-engineering-college-siwan/student/password/forget/' element={<CollegeStudentIdPasswordForgot />} />
        <Route path='/government-engineering-college-siwan/student/password/forget/verification' element={<CollegeStudentIdPasswordForgot />} />
        <Route path='/government-engineering-college-siwan/student/otp/verification' element={<CollegeStudentOtpVerification />} />
        <Route path='/government-engineering-college-siwan/student/verification' element={<StudentPasswordForgetVerifyciation />} />
        <Route path='/government-engineering-college-siwan/student/signup/request' element={<CollegeStudentSignupRequest />} />
        <Route path='/government-engineering-college-siwan/professor/login' element={<ProfessorLogin />} />
        <Route path='/government-engineering-college-siwan/professor/signup/request' element={<ProfessorLogin />} />
        <Route path='/participant/dashboard/profile/' element={<ParticipantProfile />} ></Route>

        {/*College Student Dashboard Profile*/}
        <Route path='/student/profile/' element={<StudentPaneHome />} >
          {/* <Route path='' element={<RegistrationsApplicationsDetails />} /> */}
          <Route path='' element={<ProfileUpdate />} />
          <Route path='/student/profile/update' element={<ProfileUpdate />} />
          <Route path='/student/profile/add-members' element={<AddMembers/>} />
          <Route path='/student/profile/registrations/applications' element={<RegistrationsApplicationsDetails />} />
          <Route path='/student/profile/referrals' element={<Referrals />} />
          <Route path='/student/profile/techKshitiz/awards' element={<TechkshitizAwards />} />
          <Route path='/student/profile/watchlist' element={<Watchlist />} />
          <Route path='/student/profile/recently/viewed' element={<RecentlyViewed />} />
          <Route path='/student/profile/mentor/sessions' element={<MentorSessions />} />
          <Route path='/student/profile/certificates/' element={<StudentCertificates />} />
          <Route path='/student/profile/coupons/rewards' element={<CouponsRewards />} />
          <Route path='/student/profile/settings/' element={<StudentProfileSetting />} />
        </Route>

        {/*Professor Profile*/}
        <Route path='/professor/profile/' element={<ProfessorProfileHeroSection />} >
        </Route>

        {/*Intra College Student Dashboard Profile*/}
        <Route path='/intra/college/student/profile/' element={<StudentPaneHome />} >
          <Route path='' element={<RegistrationsApplicationsDetails />} />
          <Route path='/intra/college/student/profile/registrations/applications' element={<RegistrationsApplicationsDetails />} />
          <Route path='/intra/college/student/profile/referrals' element={<Referrals />} />
          <Route path='/intra/college/student/profile/my-rounds' element={<AddMembers />} />
          <Route path='/intra/college/student/profile/techKshitiz/awards' element={<TechkshitizAwards />} />
          <Route path='/intra/college/student/profile/watchlist' element={<Watchlist />} />
          <Route path='/intra/college/student/profile/recently/viewed' element={<RecentlyViewed />} />
          <Route path='/intra/college/student/profile/mentor/sessions' element={<MentorSessions />} />
          <Route path='/intra/college/student/profile/certificates/' element={<StudentCertificates />} />
          <Route path='/intra/college/student/profile/coupons/rewards' element={<CouponsRewards />} />
          <Route path='/intra/college/student/profile/settings/' element={<StudentProfileSetting />} />
        </Route>

        {/* Event Manager Student Profile
        <Route path='/event/manager/profile/' element={<EventManagerPanelHeroSection />} >
        </Route> */}

        {/*Club Manager Student Profile*/}
        <Route path='/club/manager/profile/' element={<ClubManagerPanelHeroSection />} >
          <Route path='' element={<DashboardPage />} />
          <Route path='/club/manager/profile/api/event/participant/payment/history' element={<ClubManagerEventParticipantPaymentHistory />} />
          <Route path='/club/manager/profile/api/event/data/list' element={<ClubManagerEventAllDataList />} />
          <Route path='/club/manager/profile/api/event/registration/payment/pending/data/verify' element={<ClubManagerEventParticipantPaymentVerify />} />
          {
            Object(ClubManagerEventDataList)?.data?.map((EventData, index) => (
              <Route key={index} path={`/club/manager/profile/api/event/data/list/${EventData._id}`} element={<ClubManagerEventRegisterDataShow />} />
            ))
          }
          <Route path='/club/manager/profile/api/event/add' element={<ClubManagerEventAdd />} />
          <Route path='/club/manager/profile/api/gallery/images/add/' element={<ClubManagerGallery />} />
          <Route path='/club/manager/profile/api/club/incharge/add/' element={<ClubManagerClubInchargeAdd />} />
          <Route path='/club/manager/profile/api/event/coordinator/add/' element={<ClubManagerEventCoordinatorAdd />} />
          <Route path='/club/manager/profile/api/winner-participant-add' element={<ClubManagerEventWinnerAdd />} />
          <Route path='/club/manager/profile/contest/add/' element={<AdminPanelClubManagerContestAdd />} />
          <Route path='/club/manager/profile/api/answer/mcq-question' element={<ClubManagerMcqAnswerSubmitShow />} />
          <Route path='/club/manager/profile/api/answer/leaderboard' element={<ClubManagerLeaderBoard />} />
          {/* {
            Number(Object(UserData)?.data?.participant_Roll) === 3 ? (
              <> */}
          <Route path='/club/manager/profile/api/answer/numerical-question' element={<ClubManagerNumericalAnswerSubmitShow />} />
          <Route path='/club/manager/profile/add/numerical-question' element={<ClubManagerNumericalQuestionAdd />} />
          <Route path='/club/manager/profile/add/mcq-question' element={<ClubManagerMcqQuestionAdd />} />
          <Route path='/club/manager/profile/api/all-question-list/contest/mcq-question/numerical-question' element={<ClubManagerAllQuestionShow />} />
          <Route path='/club/manager/profile/add/coding/user-id/' element={<ClubManagerCodingParticipantUserIdCreate />} />
          <Route path='/club/manager/profile/add/quiz/user-id/' element={<ClubManagerQuizParticipantUserIdCreate />} />
          {/* </>
            ) : (
              <>
              </>
            )
          } */}
        </Route>

        {/*Campus Ambassador Profile*/}
        <Route path='/campus/ambassador/profile/' element={<CampusAmbassadorPanelHeroSection />} >
        </Route>


        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
