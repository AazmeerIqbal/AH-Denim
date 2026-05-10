import { useState } from "react";
import { Phone, MapPin, Mail, Send, Facebook } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const { ref: mapRef, visible: mapVisible } = useScrollReveal(0.1);
  const { ref: formRef, visible: formVisible } = useScrollReveal(0.1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !cellNumber || !message) {
      setStatus("error");
      return;
    }

    setStatus("loading");

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
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setCellNumber("");
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030b13] text-[#ffffff] font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-4">
              Get In Touch
            </p>
            <h1 className="font-['Arial_Black',Impact,sans-serif] font-black text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.0] tracking-[-0.02em] mb-6">
              Contact Us
            </h1>
            <p className="text-[0.8rem] text-white/50 font-light leading-[1.8] tracking-[0.03em] max-w-xl mx-auto">
              Any questions? We would be happy to help you. Reach out to our team for inquiries, quotes, and collaborations.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Map Section */}
            <div 
              ref={mapRef}
              className="w-full lg:w-[45%]"
              style={{
                opacity: mapVisible ? 1 : 0,
                transform: mapVisible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              }}
            >
              <div className="rounded-sm overflow-hidden border border-white/10 relative group bg-black/50 aspect-square sm:aspect-video lg:aspect-auto lg:h-full min-h-[400px]">
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen pointer-events-none z-10" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d904.1050144316846!2d67.08705906963222!3d24.985838714209358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU5JzA5LjAiTiA2N8KwMDUnMTUuNyJF!5e0!3m2!1sen!2s!4v1739060046969!5m2!1sen!2s"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full absolute inset-0 filter grayscale invert-[0.9] contrast-[1.2]"
                ></iframe>
              </div>
            </div>

            {/* Form Section */}
            <div 
              ref={formRef}
              className="w-full lg:w-[55%] flex flex-col gap-10"
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border border-white/5 bg-white/[0.02] rounded-sm flex items-start gap-4 hover:bg-white/[0.04] transition-colors">
                  <div className="w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-300 flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h3 className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50 mb-1">Phone</h3>
                    <p className="text-[0.85rem] font-light text-white/90">+92 324 8270610</p>
                  </div>
                </div>
                
                <div className="p-5 border border-white/5 bg-white/[0.02] rounded-sm flex items-start gap-4 hover:bg-white/[0.04] transition-colors">
                  <div className="w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-300 flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h3 className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50 mb-1">Email</h3>
                    <p className="text-[0.85rem] font-light text-white/90">Natalia@ahdenim.net</p>
                  </div>
                </div>

                <div className="p-5 border border-white/5 bg-white/[0.02] rounded-sm flex items-start gap-4 sm:col-span-2 hover:bg-white/[0.04] transition-colors">
                  <div className="w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-300 flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50 mb-1">Address</h3>
                    <p className="text-[0.85rem] font-light text-white/90 leading-relaxed">
                      Plot No. 19/5, Sector No. 12-C North Karachi,<br />
                      Industrial Area, Karachi Pakistan. 75850
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="p-3 bg-black/40 border border-white/10 text-white rounded-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-[0.85rem] font-light placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="p-3 bg-black/40 border border-white/10 text-white rounded-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-[0.85rem] font-light placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="p-3 bg-black/40 border border-white/10 text-white rounded-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-[0.85rem] font-light placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Phone Number</label>
                    <input
                      type="text"
                      value={cellNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 4) value = value.slice(0, 4) + "-" + value.slice(4);
                        if (value.length > 12) value = value.slice(0, 12);
                        setCellNumber(value);
                      }}
                      placeholder="0333-1234567"
                      className="p-3 bg-black/40 border border-white/10 text-white rounded-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-[0.85rem] font-light placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="p-3 bg-black/40 border border-white/10 text-white rounded-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-[0.85rem] font-light placeholder:text-white/20 h-[120px] resize-none"
                  ></textarea>
                </div>

                {status === "success" && (
                  <p className="text-[0.75rem] text-blue-400 font-light tracking-wide bg-blue-500/10 p-3 rounded-sm border border-blue-500/20 text-center">
                    Message sent successfully! We will get back to you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[0.75rem] text-red-400 font-light tracking-wide bg-red-500/10 p-3 rounded-sm border border-red-500/20 text-center">
                    Please fill out all fields correctly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-sm font-bold tracking-[0.15em] uppercase text-[0.7rem] hover:bg-blue-50 hover:text-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? "Sending..." : "Send Message"} 
                  {!status && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
                  {status === "idle" && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
                  {status === "error" && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
