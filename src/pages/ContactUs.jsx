import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="bg-[#89A8B2] text-white p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold">Get In Touch</h2>
          <p className="text-indigo-100">
            Have questions about products, delivery, or orders?
            We're here to help you 24/7.
          </p>

          <div className="space-y-3 text-sm">
            <p>📍 Mohammadpur, Bangladesh</p>
            <p>📧 support@shopecove.com</p>
            <p>📞 +880 17998-72839</p>
          </div>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg"
            alt="Bangladesh Flag"
            className="w-16 rounded shadow-lg mt-4"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#89A8B2] text-white py-3 rounded-xl hover:bg-[#a9c0c7] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
