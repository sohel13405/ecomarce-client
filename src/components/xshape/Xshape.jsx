import { Link } from "react-router";

export default function Xshape() {
  return (
    <div className="relative h-screen w-full bg-white overflow-hidden">

      {/* CENTER CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center gap-36">
        <h1 className="text-4xl md:text-6xl text-[#6e97a5] font-bold mb-6">
          BIG SALE
        </h1>

        <Link to="/allproducts">
          <button className="px-8 py-3 bg-[#89A8B2] text-white rounded-lg hover:bg-gray-800 transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>

      {/* GRAY STRIP */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[140%] -ml-[20%] py-2 rotate-6 bg-gray-300 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_60s_linear_infinite]">
          <span className="mx-6 text-[#8b8a8a] font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
          <span className="mx-6 text-[#8b8a8a] font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
          <span className="mx-6 text-[#8b8a8a] font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
          <span className="mx-6 text-[#8b8a8a] font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
        </div>
      </div>


      {/* BLACK STRIP */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[140%] -ml-[20%] py-2 -rotate-6 bg-black overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marqueeReverse_60s_linear_infinite]">
          <span className="mx-6 text-white font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
          <span className="mx-6 text-white font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
          <span className="mx-6 text-white font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
          <span className="mx-6 text-white font-semibold text-xl">
            Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

    </div>
  );
}
