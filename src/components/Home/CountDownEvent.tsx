import React, { useState, useEffect } from 'react';
let eventIsLive = false;
const CountDownEvent = ({ EventEndDate, EventStartDate }) => {
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
                <button type="button" className='cursor-default text-green-600 bg-green-600/20text-[18px]  p-[5px] h-[55.29px] rounded-[30px] border-[2px] border-green-600 flex gap-1 justify-center items-center max-[750px]:w-[200px] max-[750px]:text-[14px] max-[750px]:h-[40px]'>
                    <span className='font-[700]'>{timeLeft["days"] > 9 ? timeLeft["days"] : "0" + timeLeft["days"]} days </span>
                    <span className='font-[700]'>:</span>
                    <span className='font-[700]'>{timeLeft["hours"] > 9 ? timeLeft["hours"] : "0" + timeLeft["hours"]} : {timeLeft["minutes"] > 9 ? timeLeft["minutes"] : "0" + timeLeft["minutes"]} Minutes</span>
                </button>

            ) : (
                eventLastDate > 0 ? (
                    <button type="button" className=' cursor-default text-sky-600 py-2 px-4 bg-sky-600/20  rounded-[30px] border-[2px] border-sky-600 flex gap-1 justify-center items-center'>
                        <span className=' uppercase font-[700] animate-pulse '>event is going on</span>
                    </button>

                ) : (

                    <button type="button" className=' cursor-default text-red-600 py-2 px-4 bg-red-600/20  rounded-[30px] border-[2px] border-red-600 flex gap-1 justify-center items-center'>
                        <span className=' uppercase font-[700] animate-pulse'>event has ended</span>
                    </button>
                )
            )
        }
        </>

    );
};

export default CountDownEvent;
