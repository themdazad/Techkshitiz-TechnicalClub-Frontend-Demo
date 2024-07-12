import React from 'react'
import './otpVerify.css'
function OtpVerify() {
    return (
        <>
            <form className="form"> <div className="title">OTP</div> <div className="title">Verification Code</div> <p className="message">We have sent a verification code to your mobile number</p> <div className="inputs"> <input id="input1" type="text" maxLength={1} /> <input id="input2" type="text" maxLength={1} /> <input id="input3" type="text" maxLength={1} /> <input id="input4" type="text" maxLength={1} /> </div> <button className="action">verify me</button> </form>
        </>
    )
}

export default OtpVerify
