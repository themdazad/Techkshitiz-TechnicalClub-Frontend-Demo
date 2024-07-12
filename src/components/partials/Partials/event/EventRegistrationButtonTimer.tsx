import React, { useState, useEffect } from 'react';
let eventIsLive = false;
function EventRegistrationButtonTimer({ EventEndDate, EventStartDate }) {
    console.log(EventEndDate, EventStartDate);

    const eventLastDate = Number(new Date(EventEndDate)) - Number(new Date());
    const calculateTimeLeft = () => {
        const difference = Number(new Date(EventStartDate)) - Number(new Date());

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        if (difference <= 0) {
            eventIsLive = true;
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        if (!eventIsLive) {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    return (
        <>{
            !eventIsLive ? (
                <button type="button" className='w-[250px] cursor-default text-[#1be32c] text-[18px]  p-[5px] h-[55.29px] rounded-[5px] border-[2px] border-[#ffdd00d7] flex gap-1 justify-center items-center max-[750px]:w-[200px] max-[750px]:text-[14px] max-[750px]:h-[40px]'>
                    <span className='font-[700]'>{timeLeft["days"] > 9 ? timeLeft["days"] : "0" + timeLeft["days"]} days </span>
                    <span className='font-[700]'>:</span>
                    <span className='font-[700]'>{timeLeft["hours"] > 9 ? timeLeft["hours"] : "0" + timeLeft["hours"]} : {timeLeft["minutes"] > 9 ? timeLeft["minutes"] : "0" + timeLeft["minutes"]} Minutes</span>
                </button>
            ) : (
                eventLastDate > 0 ? (
                    <button type="button" className='w-[250px] cursor-pointer text-[#1be32c] text-[20px]  p-[5px] h-[55.29px] rounded-[5px] border-[2px] border-[#ffdd00d7] flex gap-1 justify-center items-center max-[550px]:w-[150px] max-[550px]:h-[40px]  max-[750px]:w-[200px] max-[750px]:text-[16px] max-[750px]:h-[45px] max-[550px]:text-[12px]'>
                        <span className=' uppercase font-[700] animate-pulse '>Register Now</span>
                    </button>

                ) : (

                    <button type="button" className='w-[250px] cursor-not-allowed text-[#297629] text-[20px]  p-[5px] h-[55.29px] rounded-[5px] border-[2px] border-[#ffdd0088] flex gap-1 justify-center items-center max-[550px]:w-[150px]  max-[750px]:w-[200px] max-[750px]:text-[16px] max-[750px]:h-[45px] max-[550px]:h-[40px] max-[550px]:text-[12px]'>
                        <span className=' uppercase font-[700]  '>Registration End</span>
                    </button>
                )
            )
        }
        </>

    );
}

export default EventRegistrationButtonTimer


