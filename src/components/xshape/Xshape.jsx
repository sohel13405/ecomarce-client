export default function Xshape() {
    return (
      <div className="relative max-w-full h-80 overflow-hidden bg-white group">
  
        {/* Center Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-bold mb-44">
            BIG SALE
          </h1>
          
          <button className="pointer-events-auto px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>


  
        {/* Left → Right (Gray Gradient) */}
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[150%] rotate-2 bg-gray-300 overflow-hidden">
            <div className="marquee-right whitespace-nowrap text-[#8b8a8a] font-semibold text-xl py-1">
              Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
              Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
              Upto 10% Off • Upto 10% Off •Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
              Upto 10% Off • Upto 10% Off •
            </div>
          </div>
        </div>


        {/*  <div className="w-[150%] -rotate-5 bg-gradient-to-r from-gray-200 to-gray-300  overflow-hidden"> */}
  
        {/* Right → Left (Black Gradient) */}
        <div className="absolute inset-0 flex items-center justify-center">
        <div className=" w-screen -rotate-5 bg-black  overflow-hidden">
            <div className="marquee-left whitespace-nowrap text-white font-semibold text-xl py-1">
              Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
              Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
              Upto 10% Off • Upto 10% Off •Upto 10% Off • Upto 10% Off • Upto 10% Off • Upto 10% Off •
              Upto 10% Off • Upto 10% Off •
            </div>
          </div>
        </div>
  
      </div>
    );
  }
  