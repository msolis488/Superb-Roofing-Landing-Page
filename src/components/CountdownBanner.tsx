import React, { useEffect, useState } from "react";

const calculateTimeLeft = () => {
  const difference = new Date("2025-03-31").getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="text-center mb-4">
        <span className="text-2xl md:text-4xl font-bold text-yellow-400 tracking-wider">
          LIMITED TIME OFFER ENDS IN
        </span>
      </div>
      <div className="flex justify-center items-center gap-6 md:gap-10 bg-black/30 backdrop-blur-sm rounded-lg p-6">
        <div className="text-center">
          <span className="text-4xl md:text-7xl font-bold text-white block mb-1">
            {timeLeft.days}
          </span>
          <span className="text-sm md:text-lg text-gray-300 uppercase tracking-wider">
            days
          </span>
        </div>
        <div className="text-center">
          <span className="text-4xl md:text-7xl font-bold text-white block mb-1">
            {timeLeft.hours}
          </span>
          <span className="text-sm md:text-lg text-gray-300 uppercase tracking-wider">
            hours
          </span>
        </div>
        <div className="text-center">
          <span className="text-4xl md:text-7xl font-bold text-white block mb-1">
            {timeLeft.minutes}
          </span>
          <span className="text-sm md:text-lg text-gray-300 uppercase tracking-wider">
            minutes
          </span>
        </div>
        <div className="text-center">
          <span className="text-4xl md:text-7xl font-bold text-white block mb-1">
            {timeLeft.seconds}
          </span>
          <span className="text-sm md:text-lg text-gray-300 uppercase tracking-wider">
            seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
