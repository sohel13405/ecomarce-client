export function FeatureCard({ icon, title, text }) {
    return (
      <div
        className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl mb-4 group-hover:scale-110 transition">
          {icon}
        </div>
  
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <p className="text-gray-500 text-sm">{text}</p>
      </div>
    );
  }