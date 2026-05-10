import { useState } from "react";
import { GrFacebookOption } from "react-icons/gr";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const [emailHover, setEmailHover] = useState(false);

  return (
    <footer
      style={{
        backgroundColor: "#030b13",
        background:
          "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(13,33,71,0.45) 0%, #030b13 65%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        color: "#ffffff",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(147,197,253,0.25) 30%, rgba(147,197,253,0.25) 70%, transparent)",
        }}
      />

      <div style={{ padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)" }}>
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(2rem, 4vw, 3.5rem)",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <p
              style={{
                color: "rgba(147,197,253,0.65)",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              AH Denim
            </p>
            <h3
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                textTransform: "uppercase",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              The Denim<br />Renaissance
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: "0.75rem",
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: "0.03em",
                maxWidth: "260px",
              }}
            >
              Premium denim crafted with excellence. Discover our collection of
              high-quality denim wear for all ages.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              {[
                { icon: <GrFacebookOption size={16} />, label: "Facebook", hoverColor: "rgba(59,130,246,0.9)" },
                { icon: <FaXTwitter size={16} />, label: "Twitter", hoverColor: "rgba(255,255,255,0.9)" },
                { icon: <BsInstagram size={16} />, label: "Instagram", hoverColor: "rgba(236,72,153,0.9)" },
                { icon: <FaYoutube size={16} />, label: "YouTube", hoverColor: "rgba(239,68,68,0.9)" },
              ].map(({ icon, label, hoverColor }) => (
                <SocialBtn key={label} icon={icon} label={label} hoverColor={hoverColor} />
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Contact Support
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ color: "rgba(147,197,253,0.55)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.2rem" }}>Email</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", fontWeight: 300 }}>Natalia@ahdenim.net</p>
              </div>
              <div>
                <p style={{ color: "rgba(147,197,253,0.55)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.2rem" }}>Phone</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", fontWeight: 300 }}>+92 324 8270610</p>
              </div>
            </div>
            <Link to="/ContactUS">
              <button
                onMouseEnter={() => setEmailHover(true)}
                onMouseLeave={() => setEmailHover(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  border: `1px solid ${emailHover ? "rgba(147,197,253,0.6)" : "rgba(255,255,255,0.18)"}`,
                  color: emailHover ? "rgba(147,197,253,0.95)" : "rgba(255,255,255,0.65)",
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  boxShadow: emailHover ? "0 0 16px rgba(59,130,246,0.2)" : "none",
                }}
              >
                Send Message <FiSend size={13} />
              </button>
            </Link>
          </div>

          {/* About */}
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              About AH Denim
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "About Us", to: "/AboutUs#about-us" },
                { label: "Our Story", to: "/AboutUs#our-video" },
                { label: "Our Expo", to: "/AboutUs#our-expo" },
                { label: "Overview", to: "/AboutUs#overview" },
                { label: "FAQs", to: "/Faqs" },
              ].map(({ label, to }) => (
                <FooterLink key={label} label={label} to={to} />
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Collections
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Men's Collection", to: "/Items?category=Man" },
                { label: "Women's Collection", to: "/Items?category=Woman" },
                { label: "Kids' Collection", to: "/Items?category=Kids" },
              ].map(({ label, to }) => (
                <FooterLink key={label} label={label} to={to} />
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.65rem",
              fontWeight: 300,
              letterSpacing: "0.08em",
            }}
          >
            © 2024 AH Denim. All rights reserved.
          </p>
          <p
            style={{
              color: "rgba(147,197,253,0.35)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Crafted to Inspire
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ── Sub-components ── */
const FooterLink = ({ label, to }: { label: string; to: string }) => {
  const [h, setH] = useState(false);
  return (
    <li>
      <Link
        to={to}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          color: h ? "rgba(147,197,253,0.85)" : "rgba(255,255,255,0.38)",
          fontSize: "0.75rem",
          fontWeight: 300,
          letterSpacing: "0.04em",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          transition: "color 0.25s ease",
        }}
      >
        <span style={{ color: h ? "rgba(147,197,253,0.6)" : "rgba(255,255,255,0.15)", fontSize: "0.6rem", transition: "color 0.25s ease" }}>→</span>
        {label}
      </Link>
    </li>
  );
};

const SocialBtn = ({ icon, label, hoverColor }: { icon: React.ReactNode; label: string; hoverColor: string }) => {
  const [h, setH] = useState(false);
  return (
    <Link
      to="#"
      aria-label={label}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        border: `1px solid ${h ? "rgba(147,197,253,0.4)" : "rgba(255,255,255,0.1)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: h ? hoverColor : "rgba(255,255,255,0.35)",
        transition: "all 0.3s ease",
        boxShadow: h ? "0 0 12px rgba(59,130,246,0.2)" : "none",
        textDecoration: "none",
      }}
    >
      {icon}
    </Link>
  );
};

export default Footer;
