import React from "react";

const EventNotices = () => {
  return (
    <div className="w-full h-[100px] max-sm:h-auto pt-3 bg-[#0d1526]  flex justify-center items-center">
      <h1 className="text-black   w-full bg-[#FFF]  text-center  font-bold p-5 text-[20px] max-xl:text-[12px]">
        <span className="text-red-500 text-center   mr-2">Important Note:</span>{" "}
        Please note that the event registrartion is Now <span className="text-[#ff5404]">Free</span> and is scheduled to take place in the month of August 2024. The exact date will be announced soon. Stay tuned for more updates.
      </h1>
    </div>
  );
};

export default EventNotices;
