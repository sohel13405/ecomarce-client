import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DealsOfTheWeek = ({ products = [] }) => {

  // 🔥 Current product index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 Handle next
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  // 🔥 Handle previous
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  // 🔥 Safety check
  if (!products.length) return null;

  const { image, name, price } = products[currentIndex];

  // 🔥 Countdown Target (7 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();

    if (difference <= 0) return {};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto min-h-180 bg-white border-2 border-[#89A8B2] shadow-xl rounded-2xl overflow-hidden ">

      {/* 🔥 Top Navbar */}
      <div className="flex justify-between p-4 items-center mb-4 bg-[#89A8B2] py-3">
        <h2 className=" text-xl lg:text-2xl font-bold text-[#efe22d] animate-pulse drop-shadow-[0_0_20px_cyan] ">
          Deals Of The Week
        </h2>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-full  border hover:bg-gray-100 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 🔥 Product Image */}
      <div className="flex justify-center ">
        <img
          src={image}
          alt={name}
          className="h-72 object-contain transition duration-300"
        />
      </div>

      {/* 🔥 Product Info */}
      <div className="text-center">
        <h3 className="font-bold text-2xl text-gray-800 mb-2">
          {name}
        </h3>

        <div className="flex justify-center items-center gap-3">
          <span className="text-gray-400 line-through">
            ${price}
          </span>

          <span className="text-[#678e9c] font-bold text-lg">
            ${(price * 0.7).toFixed(2)}
          </span>
        </div>
      </div>

      {/* 🔥 Countdown */}
      <div className=" text-center p-4  mt-24  ">
        <h4 className="text-xl font-bold text-red-500 mb-3">
          Hurry Up!
        </h4>

        <div className="grid grid-cols-4 gap-2 text-sm  mt-7 ">
          <div className="bg-gray-100 p-2 rounded-lg">
            <p className="font-bold">{timeLeft.days || 0}</p>
            <span>Days</span>
          </div>

          <div className="bg-gray-100 p-2 rounded-lg">
            <p className="font-bold">{timeLeft.hours || 0}</p>
            <span>Hours</span>
          </div>

          <div className="bg-gray-100 p-2 rounded-lg">
            <p className="font-bold">{timeLeft.minutes || 0}</p>
            <span>Minutes</span>
          </div>

          <div className="bg-gray-100 p-2 rounded-lg">
            <p className="font-bold">{timeLeft.seconds || 0}</p>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsOfTheWeek;
