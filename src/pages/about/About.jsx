import { FaRocket, FaShieldAlt, FaUsers, FaAward } from "react-icons/fa";
import { FeatureCard } from "../featuredCard/FeatureCard";

export default function About() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">

      {/* Decorative Blur Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            About <span className="text-black">Our Company</span>
          </h2>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            We are a modern digital company focused on building premium,
            user-centric products that deliver exceptional performance,
            beautiful design, and seamless experiences for people worldwide.
          </p>

          <p className="text-gray-600 mb-8">
            Our mission is to combine technology, creativity, and strategy
            to help brands grow faster and smarter in the digital era.
          </p>

          <button className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition shadow-lg">
            Learn More
          </button>
        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-2 gap-6">

          <FeatureCard
            icon={<FaRocket size={28} />}
            title="Fast Performance"
            text="Optimized for speed and scalability."
          />

          <FeatureCard
            icon={<FaShieldAlt size={28} />}
            title="Secure System"
            text="Security is built into every layer."
          />

          <FeatureCard
            icon={<FaUsers size={28} />}
            title="User Focused"
            text="Designed with user experience in mind."
          />

          <FeatureCard
            icon={<FaAward size={28} />}
            title="Premium Quality"
            text="We maintain the highest quality standards."
          />

        </div>

      </div>
    </section>
  );
}