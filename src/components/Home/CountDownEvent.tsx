import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
          // eventIsLive
            !eventIsLive ? (
                <button type="button" className='cursor-pointer p-4 py-2 text-yellow-400 bg-yellow-600/15 hover:bg-yellow-600/20 text-md  rounded-3xl border-[2px] border-yellow-400 flex gap-1 justify-center items-center '>
                    <span className='font-[700]'>Upcoming Event |</span>
                    <span className='font-[700]'>{timeLeft["days"] > 9 ? timeLeft["days"] : "0" + timeLeft["days"]} days </span>
                    <span className='font-[700]'>:</span>
                    <span className='font-[700]'>{timeLeft["hours"] > 9 ? timeLeft["hours"] : "0" + timeLeft["hours"]} : {timeLeft["minutes"] > 9 ? timeLeft["minutes"] : "0" + timeLeft["minutes"]} Minutes</span>
                </button>

            ) : (
                eventLastDate > 0 ? (
                    <button type="button" className='cursor-pointer p-4 py-2 text-yellow-400 bg-yellow-400/15 hover:bg-yellow-400/20 text-md   rounded-3xl border-[2px] border-yellow-400 flex gap-1 justify-center items-center '>
                        <NavLink to={"/government-engineering-college-siwan/total/events/list"} className=' uppercase font-[700] animate-pulse '>Register Now</NavLink>
                    </button>

                ) : (

                    <button type="button" className='cursor-pointer p-4 py-2 text-red-600 bg-red-600/15 hover:bg-red-600/20 text-md rounded-3xl border-[2px] border-red-600 flex gap-1 justify-center items-center '>
                        <span className=' uppercase font-[700] animate-pulse'>event has ended</span>
                    </button>
                )
            )
        }
        </>

    );
};

export default CountDownEvent;