import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { PiMapPinBold } from "react-icons/pi";
import { LuMail } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [status, setStatus] = useState(""); // Success/Error message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !cellNumber || !message) {
      setStatus("error");
      return;
    }

    const serviceId = "service_rmw1h2s";
    const templateId = "template_f6exg3r";
    const publicKey = "1T9xbZKxb37vbLUVd";

    const templateParams = {
      from_firstName: firstName,
      from_lastName: lastName,
      from_email: email,
      from_phone: cellNumber,
      to_name: "Saim",
      message: message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("Email sent successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setCellNumber("");
      console.log("Email send successfully");
    } catch (error) {
      setStatus(`Error sending email. Please try again ${error}.`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mb-[5rem] mt-[10rem] flex flex-col gap-8 2xl:flex-row 2xl:justify-between px-3 2xl:mx-[2%] lg:mx-[5%]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d904.1050144316846!2d67.08705906963222!3d24.985838714209358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU5JzA5LjAiTiA2N8KwMDUnMTUuNyJF!5e0!3m2!1sen!2s!4v1739060046969!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full 2xl:w-[45%] h-[570px]  2xl:h-[60vh]"
        ></iframe>

        <div className="flex flex-col rounded-lg py-8 bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white shadow-lg items-center gap-[6px] px-2 md:px-8 md:justify-center md:gap-[120px] text-[15px] md:flex-row md:items-start">
          <div className="flex flex-col gap-5 justify-center">
            <h1 className="text-[26px] sm:text-3xl 2xl:text-[40px] font-bold font-serif mb-3">
              Contact Us
            </h1>
            <span className="text-gray-400 text-[15px] font-normal">
              Any question? We would be happy to help you!
            </span>

            <div className="flex gap-2 items-center bg-[#ffffff] font-normal text-[#222222] border border-gray-200 p-3 rounded-lg">
              <FaPhoneAlt size={20} />
              +92 324 8270610
            </div>
            <div className="flex gap-2 items-center text-[#ffffff] font-normal bg-[rgb(20,20,20)] border border-gray-200 p-3 rounded-lg">
              <LuMail size={20} />
              Natalia@ahdenim.net
            </div>

            <div className="flex gap-2 items-center border bg-[#ffffff] font-normal text-[#222222] text-sm border-gray-200 p-3 rounded-lg">
              <PiMapPinBold size={20} />
              Plot No. 19/5, Sector No. 12-C North Karachi,
              <br />
              Industrial Area,Karachi Pakistan.75850
            </div>

            <div>
              <div className="flex items-center gap-3">
                <div>
                  <FaFacebookF
                    size={35}
                    style={{ color: "black" }}
                    className="bg-[#ffffff] rounded-[50%] p-2 cursor-pointer hover:text-blue-700"
                  />
                </div>

                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="bg-[#ffffff] rounded-[50%] p-2 w-[35px] h-[35px] cursor-pointer hover:text-green-600"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="my-5 flex flex-col gap-3 w-[90%] sm:w-[350px] lg:w-[450px]">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="md:flex gap-2">
                  <div>
                    <label className="block font-normal my-1">
                      First Name:
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      className="p-3 border border-gray-200 text-[#222222] rounded-lg w-full focus:outline-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block font-normal my-1">Last Name:</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Your last name"
                      className="p-3 border border-gray-200 text-[#222222] rounded-lg w-full focus:outline-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-normal my-1">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@gmail.com"
                    className="p-3 border border-gray-200 text-[#222222] rounded-lg w-full focus:outline-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-normal my-1">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={cellNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      if (value.length > 4)
                        value = value.slice(0, 4) + "-" + value.slice(4);
                      if (value.length > 12) value = value.slice(0, 12);
                      setCellNumber(value);
                    }}
                    placeholder="0333-2979540"
                    className="p-3 border border-gray-200 text-[#222222] rounded-lg w-full focus:outline-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-normal my-1">Message:</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="p-3 border border-gray-200 text-[#222222] rounded-lg w-full h-[100px] focus:outline-gray-600"
                  ></textarea>
                </div>

                {status === "success" && (
                  <p className="text-green-600 font-normal">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-600 font-normal">
                    Please fill out all fields.
                  </p>
                )}

                <button
                  type="submit"
                  className="flex gap-[10px] items-center p-3 rounded-lg bg-white text-[#222] w-full justify-center border border-gray-300 hover:bg-gray-100 transition"
                >
                  Send Message <FiSend size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
