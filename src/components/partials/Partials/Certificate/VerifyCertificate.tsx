import React, { useState } from 'react'
import MainHeader from '../../MainHeader.tsx'
import './Form.css'
import './CertificateHome.css'
import { useLocation } from 'react-router-dom';
import FirstPriceCertificate from './FirstPriceCertificate.tsx'

function VerifyCertificate() {
    const [GetCertificateId, SetCertificateId] = useState("");
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    document.title = "TechKshitiz verified certificate download";
    // console.log(params.get('certificate_number'));



    return (
        <>
            <MainHeader />
            <div className=' w-[100%] h-[90vh] bg-[#080c17] flex justify-center items-center  p-[20px]   '>
                <FirstPriceCertificate />
            </div>
        </>
    )
}

export default VerifyCertificate
