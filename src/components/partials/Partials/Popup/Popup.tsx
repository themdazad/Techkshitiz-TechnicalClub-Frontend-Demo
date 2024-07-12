import React from 'react'
import { VerifyChange } from './Popupchange.tsx';
import { toast } from 'react-toastify';
const baseUrl = process.env.REACT_APP_BACKEND_URL
export default function Popup(props) {
    const onClickHandelbtn1 = async () => {
        props.SetSubmit(true);
        VerifyChange();
        const userData = sessionStorage.getItem('Coding_Participant_Auth_Data');
        const Participant_Question_coding_Contest = sessionStorage.getItem('Participant_Question_coding_Contest');
        if (((userData !== null) && (Participant_Question_coding_Contest !== null))) {
            try {
                const AuthParticipantData = JSON.parse(userData);
                const Participant_Question_coding_Contest_Data = JSON.parse(Participant_Question_coding_Contest);
                props.setIsLoadingRequest(true)
                const time = [
                    props.time[0],
                    props.time[1]
                ]
                const res = await fetch(baseUrl + '/api/coding-contest/api/answer/participant', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: AuthParticipantData.name, year: AuthParticipantData.AdmissionYear, branch: AuthParticipantData.branch, emailid: AuthParticipantData.emailid, userid: AuthParticipantData.userid, answer: Participant_Question_coding_Contest_Data, submittime: time }),
                    credentials: 'include',
                })
                if (res.status === 200) {
                    toast.success("Done");
                    props.setIsLoadingRequest(false)
                } else if (res.status === 400) {
                    toast.error('Please Select your question !!')
                    props.setIsLoadingRequest(false)
                } else if (res.status === 500) {
                    toast.error('This time some technical issue !!')
                    props.setIsLoadingRequest(false)
                } else if (res.status === 402) {
                    toast.error(`Contest You  submit!!`)
                    props.setIsLoadingRequest(false)
                } else if (res.status === 403) {
                    toast.error('Internal server error please reload the page!!')
                    props.setIsLoadingRequest(false)

                }

            } catch (error) {
                props.setIsLoadingRequest(false)
            }

        }
    }
    const onClickHandelbtn2 = () => {
        VerifyChange();
        props.SetSubmit(false);
    }
    return (
        <>
            <div id='Verify_Submit' className={`relative z-10 hidden`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{props.title}</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">{props.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" style={{ backgroundColor: props.bgcolor }} onClick={onClickHandelbtn1} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">{props.btn2}</button>
                                <button type="button" onClick={onClickHandelbtn2} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">{props.btn1}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
