import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const COLORS = {
  brown: "#8B5E3C",
  brownDark: "#6B4423",
  brownLight: "#A87850",
  beige: "#F7F3EE",
  beigeDeep: "#EDE5D8",
  white: "#FFFFFF",
  text: "#2C1810",
  textMuted: "#7A6355",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FFFFFF; color: #2C1810; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #F7F3EE; }
  ::-webkit-scrollbar-thumb { background: #8B5E3C; border-radius: 3px; }
  .font-display { font-family: 'Playfair Display', serif; }
  .gradient-hero { background: linear-gradient(135deg, #FAF7F2 0%, #F0E8DC 50%, #FAF7F2 100%); }
  .card-hover { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
  .card-hover:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(139,94,60,0.15); }
  .card-hover:hover img { transform: scale(1.06); }
  img { transition: transform 0.4s ease; }
  .btn-primary { background: #8B5E3C; color: white; border: none; padding: 14px 32px; border-radius: 50px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.25s ease; letter-spacing: 0.3px; }
  .btn-primary:hover { background: #6B4423; transform: scale(1.04); box-shadow: 0 8px 24px rgba(139,94,60,0.35); }
  .btn-outline { background: transparent; color: #8B5E3C; border: 2px solid #8B5E3C; padding: 13px 32px; border-radius: 50px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.25s ease; }
  .btn-outline:hover { background: #8B5E3C; color: white; transform: scale(1.04); }
  .btn-white { background: white; color: #8B5E3C; border: none; padding: 14px 32px; border-radius: 50px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.25s ease; }
  .btn-white:hover { background: #F7F3EE; transform: scale(1.04); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
  .tag { display: inline-block; background: #F0E8DC; color: #8B5E3C; padding: 6px 16px; border-radius: 50px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
  .whatsapp-float { position: fixed; bottom: 28px; right: 28px; z-index: 1000; width: 58px; height: 58px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(37,211,102,0.4); cursor: pointer; transition: all 0.25s ease; }
  .whatsapp-float:hover { transform: scale(1.12) translateY(-3px); box-shadow: 0 12px 32px rgba(37,211,102,0.5); }
  .call-float { position: fixed; bottom: 28px; left: 28px; z-index: 1000; width: 58px; height: 58px; background: #8B5E3C; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(139,94,60,0.4); cursor: pointer; transition: all 0.25s ease; }
  .call-float:hover { transform: scale(1.12) translateY(-3px); }
  .nav-link { color: #2C1810; text-decoration: none; font-weight: 500; font-size: 15px; padding: 6px 4px; border-bottom: 2px solid transparent; transition: all 0.2s ease; cursor: pointer; }
  .nav-link:hover, .nav-link.active { color: #8B5E3C; border-bottom-color: #8B5E3C; }
  .form-input { width: 100%; padding: 14px 18px; border: 1.5px solid #E0D5C8; border-radius: 12px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; color: #2C1810; background: white; transition: border-color 0.2s; outline: none; }
  .form-input:focus { border-color: #8B5E3C; box-shadow: 0 0 0 3px rgba(139,94,60,0.1); }
  .section-pad { padding: 96px 0; }
  @media (max-width: 768px) { .section-pad { padding: 64px 0; } }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
};

function FadeInWhenVisible({ children, variants = fadeUp, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerWhenVisible({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

// SVG Icons
const BoxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="11" width="24" height="17" rx="2" stroke="#8B5E3C" strokeWidth="2" fill="none"/>
    <path d="M4 11L16 4L28 11" stroke="#8B5E3C" strokeWidth="2"/>
    <path d="M16 4V28M10 11L10 28M22 11L22 28" stroke="#8B5E3C" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
    <path d="M14 2.5C7.65 2.5 2.5 7.65 2.5 14c0 2.1.57 4.07 1.56 5.76L2.5 25.5l5.88-1.54A11.46 11.46 0 0014 25.5c6.35 0 11.5-5.15 11.5-11.5S20.35 2.5 14 2.5zm0 21.17c-1.89 0-3.65-.52-5.15-1.43l-.37-.22-3.49.91.93-3.41-.24-.38A9.57 9.57 0 014.33 14C4.33 8.65 8.65 4.33 14 4.33S23.67 8.65 23.67 14 19.35 23.67 14 23.67zm5.22-7.14c-.28-.14-1.68-.83-1.94-.92-.26-.1-.44-.14-.63.14-.19.28-.72.92-.88 1.1-.16.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.12.28-.32.42-.48.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.54-.46-.47-.63-.48h-.54c-.18 0-.49.07-.74.35-.26.28-.98.96-.98 2.33s1 2.7 1.14 2.89c.14.18 1.97 3.01 4.77 4.22.67.29 1.19.46 1.59.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
  </svg>
);

const FloatingBoxes = () => (
  <div style={{ position: "relative", width: "100%", height: "420px" }}>
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "10%", left: "15%", width: "200px", height: "200px", background: "linear-gradient(135deg, #8B5E3C, #C4935A)", borderRadius: "16px", boxShadow: "0 20px 60px rgba(139,94,60,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="10" y="28" width="60" height="42" rx="4" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
        <path d="M10 28L40 10L70 28" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
        <path d="M40 10V70" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        <path d="M25 28V70M55 28V70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3"/>
      </svg>
    </motion.div>
    <motion.div
      animate={{ y: [6, -6, 6] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      style={{ position: "absolute", top: "30%", right: "10%", width: "150px", height: "150px", background: "linear-gradient(135deg, #EDE5D8, #D4C4B0)", borderRadius: "14px", boxShadow: "0 16px 40px rgba(139,94,60,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <rect x="8" y="22" width="44" height="30" rx="3" fill="rgba(139,94,60,0.2)" stroke="#8B5E3C" strokeWidth="2"/>
        <path d="M8 22L30 8L52 22" stroke="#8B5E3C" strokeWidth="2"/>
        <path d="M30 8V52" stroke="#8B5E3C" strokeWidth="1" strokeDasharray="3 2"/>
      </svg>
    </motion.div>
    <motion.div
      animate={{ y: [-5, 10, -5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      style={{ position: "absolute", bottom: "5%", left: "35%", width: "110px", height: "110px", background: "#F7F3EE", borderRadius: "12px", boxShadow: "0 12px 30px rgba(139,94,60,0.15)", border: "2px solid #E0D5C8", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="6" y="16" width="32" height="22" rx="3" fill="none" stroke="#8B5E3C" strokeWidth="1.5"/>
        <path d="M6 16L22 6L38 16" stroke="#8B5E3C" strokeWidth="1.5"/>
        <path d="M22 6V38" stroke="#8B5E3C" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    </motion.div>
    <motion.div
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: "5%", right: "30%", width: "70px", height: "70px", background: "linear-gradient(135deg, #8B5E3C, #A87850)", borderRadius: "50%", opacity: 0.15 }}
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      style={{ position: "absolute", bottom: "25%", right: "25%", width: "40px", height: "40px", background: "#8B5E3C", borderRadius: "50%", opacity: 0.1 }}
    />
  </div>
);

// ======================== NAVBAR ========================
function Navbar({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "Products", "Customization", "About", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(247,243,238,0.8)",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 2px 24px rgba(139,94,60,0.12)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(139,94,60,0.1)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", background: "linear-gradient(135deg, #8B5E3C, #C4935A)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="7" width="16" height="11" rx="1.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.2"/>
              <path d="M2 7L10 2L18 7" stroke="white" strokeWidth="1.2"/>
              <path d="M10 2V18" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700", color: "#2C1810", letterSpacing: "-0.3px" }}>The Box Hub</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
          {links.map(link => (
            <button key={link} onClick={() => { setPage(link); setMenuOpen(false); }}
              className={`nav-link ${currentPage === link ? "active" : ""}`}
              style={{ background: "none", border: "none", borderBottom: currentPage === link ? "2px solid #8B5E3C" : "2px solid transparent" }}>
              {link}
            </button>
          ))}
          <button className="btn-primary" onClick={() => setPage("Contact")} style={{ padding: "10px 24px", fontSize: "14px" }}>Get Quote</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px" }} className="mobile-menu-btn">
          <div style={{ width: "22px", height: "2px", background: "#8B5E3C", marginBottom: "5px", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}/>
          <div style={{ width: "22px", height: "2px", background: "#8B5E3C", marginBottom: "5px", opacity: menuOpen ? 0 : 1 }}/>
          <div style={{ width: "22px", height: "2px", background: "#8B5E3C", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}/>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ background: "white", borderTop: "1px solid #F0E8DC", padding: "16px 24px 24px", overflow: "hidden" }}>
            {links.map(link => (
              <button key={link} onClick={() => { setPage(link); setMenuOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: "16px", fontWeight: "500", color: currentPage === link ? "#8B5E3C" : "#2C1810", cursor: "pointer", borderBottom: "1px solid #F7F3EE", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {link}
              </button>
            ))}
            <button className="btn-primary" onClick={() => { setPage("Contact"); setMenuOpen(false); }} style={{ marginTop: "16px", width: "100%" }}>Get Quote</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }`}</style>
    </motion.nav>
  );
}

// ======================== HOME PAGE ========================
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "72px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="tag">Premium Packaging Solutions</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="font-display" style={{ fontSize: "clamp(36px, 5vw, 62px)", fontWeight: "700", color: "#2C1810", lineHeight: "1.12", marginTop: "20px", marginBottom: "22px", letterSpacing: "-1px" }}>
              Premium Carton Boxes<br />
              <span style={{ color: "#8B5E3C" }}>for Every Business</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ fontSize: "17px", color: "#7A6355", lineHeight: "1.75", marginBottom: "36px", maxWidth: "440px" }}>
              Crafting strong, beautiful, and custom-designed carton boxes for food brands, e-commerce, gifting, and more. Built to protect. Designed to impress.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => setPage("Contact")}>Get a Free Quote</button>
              <button className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "8px" }}
                onClick={() => window.open("https://wa.me/911234567890", "_blank")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#8B5E3C">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                WhatsApp Us
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
              style={{ display: "flex", gap: "40px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E0D5C8" }}>
              {[["500+", "Happy Clients"], ["10M+", "Boxes Delivered"], ["5+", "Years Experience"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display" style={{ fontSize: "28px", fontWeight: "700", color: "#8B5E3C" }}>{num}</div>
                  <div style={{ fontSize: "13px", color: "#7A6355", marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <FloatingBoxes />
          </motion.div>
        </div>
        <style>{`@media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Categories */}
      <section className="section-pad" style={{ background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="tag">Our Categories</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "700", color: "#2C1810", marginTop: "16px", letterSpacing: "-0.5px" }}>Boxes for Every Need</h2>
              <p style={{ color: "#7A6355", fontSize: "16px", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0", lineHeight: "1.7" }}>From food-grade packaging to luxury gift boxes, we craft it all with precision.</p>
            </div>
          </FadeInWhenVisible>
          <StaggerWhenVisible style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { title: "Food Boxes", desc: "Hygienic, food-grade carton boxes for bakeries, restaurants, and FMCG brands.", emoji: "🍕", bg: "#FFF8F0" },
              { title: "Bottle Boxes", desc: "Sturdy carriers for beverages, oils, and premium liquid products.", emoji: "🍶", bg: "#F0F8FF" },
              { title: "Shipping Boxes", desc: "Corrugated, double-wall boxes built for safe e-commerce logistics.", emoji: "📦", bg: "#F0FFF4" },
              { title: "Gift Boxes", desc: "Elegant, customizable gift packaging for retail and premium brands.", emoji: "🎁", bg: "#FFF0F8" },
            ].map((cat, i) => (
              <motion.div key={cat.title} variants={fadeUp} className="card-hover"
                style={{ background: cat.bg, borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(139,94,60,0.1)" }}>
                <div style={{ height: "160px", background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>
                  {cat.emoji}
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#2C1810", marginBottom: "8px" }}>{cat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#7A6355", lineHeight: "1.65" }}>{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerWhenVisible>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad" style={{ background: "#F7F3EE" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="tag">Why Us</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "700", color: "#2C1810", marginTop: "16px" }}>The Box Hub Advantage</h2>
            </div>
          </FadeInWhenVisible>
          <StaggerWhenVisible style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }}>
            {[
              { icon: "⚡", title: "Fast Turnaround", desc: "3–5 day production with bulk order priority handling." },
              { icon: "🎨", title: "Custom Printing", desc: "Full-color CMYK printing with brand logo and design." },
              { icon: "♻️", title: "Eco Friendly", desc: "FSC-certified, recyclable materials for sustainable brands." },
              { icon: "💎", title: "Premium Quality", desc: "GSM-optimized cartons tested for strength and durability." },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="card-hover"
                style={{ background: "white", borderRadius: "16px", padding: "32px 24px", textAlign: "center", boxShadow: "0 4px 16px rgba(139,94,60,0.07)" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2C1810", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#7A6355", lineHeight: "1.65" }}>{item.desc}</p>
              </motion.div>
            ))}
          </StaggerWhenVisible>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section-pad" style={{ background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span className="tag">Clientele</span>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "700", color: "#2C1810", marginTop: "16px" }}>Who We Serve</h2>
            </div>
          </FadeInWhenVisible>
          <StaggerWhenVisible style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {[
              { title: "Small Businesses", icon: "🏪", desc: "Affordable MOQ starting at 50 boxes" },
              { title: "Food Brands", icon: "🍱", desc: "Food-safe certified packaging" },
              { title: "eCommerce Sellers", icon: "🛒", desc: "Bulk corrugated shipping solutions" },
              { title: "Startups", icon: "🚀", desc: "Branding-ready custom print boxes" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="card-hover"
                style={{ border: "1.5px solid #E0D5C8", borderRadius: "14px", padding: "28px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#2C1810", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6355" }}>{item.desc}</p>
              </motion.div>
            ))}
          </StaggerWhenVisible>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "linear-gradient(135deg, #6B4423, #8B5E3C, #A87850)", padding: "80px 24px", textAlign: "center" }}>
        <FadeInWhenVisible>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "700", color: "white", marginBottom: "16px" }}>Need Custom Packaging?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "17px", marginBottom: "36px", maxWidth: "460px", margin: "0 auto 36px", lineHeight: "1.7" }}>
            Tell us your box dimensions, print requirements, and quantity — we'll craft it perfectly.
          </p>
          <button className="btn-white" onClick={() => setPage("Contact")}>Get Free Quote Today</button>
        </FadeInWhenVisible>
      </section>
    </div>
  );
}

// ======================== ABOUT PAGE ========================
function AboutPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      {/* Header */}
      <section style={{ background: "linear-gradient(135deg, #FAF7F2, #EDE5D8)", padding: "80px 24px 64px", textAlign: "center" }}>
        <FadeInWhenVisible>
          <span className="tag">Our Story</span>
          <h1 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: "700", color: "#2C1810", marginTop: "16px", letterSpacing: "-0.5px" }}>About The Box Hub</h1>
          <p style={{ color: "#7A6355", fontSize: "17px", maxWidth: "560px", margin: "16px auto 0", lineHeight: "1.75" }}>Crafting packaging that goes beyond containment — we build brand experiences from the first unbox.</p>
        </FadeInWhenVisible>
      </section>

      {/* Company Intro */}
      <section className="section-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <FadeInWhenVisible variants={slideLeft}>
            <span className="tag">Who We Are</span>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: "700", color: "#2C1810", margin: "16px 0 20px", lineHeight: "1.2" }}>
              Built on Craft,<br />Driven by Quality
            </h2>
            <p style={{ color: "#7A6355", lineHeight: "1.8", marginBottom: "20px", fontSize: "15px" }}>
              The Box Hub was founded with a singular vision: to deliver packaging solutions that protect your products and amplify your brand. We specialize in custom-designed carton boxes across food, gifting, e-commerce, and industrial segments.
            </p>
            <p style={{ color: "#7A6355", lineHeight: "1.8", fontSize: "15px", marginBottom: "32px" }}>
              Our state-of-the-art manufacturing facility uses FSC-certified materials and advanced printing technology to bring your brand vision to life — with accuracy, speed, and care.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[["ISO Certified", "Quality assured"], ["Eco Materials", "Sustainable sourcing"], ["Pan India", "Delivery network"], ["Custom MOQ", "From 50 boxes"]].map(([t, s]) => (
                <div key={t} style={{ padding: "16px", background: "#F7F3EE", borderRadius: "12px" }}>
                  <div style={{ fontWeight: "700", fontSize: "14px", color: "#2C1810" }}>{t}</div>
                  <div style={{ fontSize: "12px", color: "#7A6355", marginTop: "2px" }}>{s}</div>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible variants={slideRight}>
            <div style={{ background: "linear-gradient(135deg, #EDE5D8, #D4C4B0)", borderRadius: "20px", height: "420px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "80px", marginBottom: "16px" }}>🏭</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#6B4423", fontWeight: "600" }}>Manufacturing Excellence</div>
                <div style={{ color: "#8B5E3C", fontSize: "14px", marginTop: "6px" }}>Since 2019</div>
              </div>
              <div style={{ position: "absolute", top: "20px", right: "20px", width: "80px", height: "80px", background: "rgba(139,94,60,0.1)", borderRadius: "50%" }}/>
              <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "50px", height: "50px", background: "rgba(139,94,60,0.15)", borderRadius: "50%" }}/>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad" style={{ background: "#F7F3EE", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <FadeInWhenVisible>
            <span className="tag">Our Mission</span>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: "700", color: "#2C1810", margin: "16px 0 24px" }}>
              "Packaging That Protects,<br />Presents, and Performs"
            </h2>
            <p style={{ color: "#7A6355", fontSize: "16px", lineHeight: "1.85" }}>
              We believe packaging is the first handshake between a brand and its customer. Our mission is to make that handshake strong, memorable, and sustainable — combining industrial-grade durability with design that sells.
            </p>
          </FadeInWhenVisible>
          <StaggerWhenVisible style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "48px" }}>
            {[{ icon: "🌱", title: "Sustainability", desc: "Recyclable materials, minimal waste, eco-conscious processes" }, { icon: "🔬", title: "Innovation", desc: "Constant R&D to bring new printing and material techniques" }, { icon: "🤝", title: "Partnership", desc: "Long-term client relationships built on trust and delivery" }].map(v => (
              <motion.div key={v.title} variants={fadeUp} style={{ background: "white", borderRadius: "14px", padding: "28px 20px", boxShadow: "0 4px 16px rgba(139,94,60,0.07)" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{v.icon}</div>
                <h3 style={{ fontWeight: "700", fontSize: "15px", color: "#2C1810", marginBottom: "8px" }}>{v.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6355", lineHeight: "1.65" }}>{v.desc}</p>
              </motion.div>
            ))}
          </StaggerWhenVisible>
        </div>
      </section>

      {/* Founder */}
      <section className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", alignItems: "center" }}>
          <FadeInWhenVisible variants={slideLeft}>
            <div style={{ background: "linear-gradient(160deg, #8B5E3C, #C4935A)", borderRadius: "20px", height: "460px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "52px" }}>👤</div>
                <div style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "600" }}>Founder & CEO</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginTop: "4px" }}>The Box Hub</div>
              </div>
              <div style={{ position: "absolute", top: "24px", left: "24px", width: "50px", height: "50px", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "50%" }}/>
              <div style={{ position: "absolute", bottom: "24px", right: "24px", width: "30px", height: "30px", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "50%" }}/>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible variants={slideRight}>
            <span className="tag">Meet the Founder</span>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: "700", color: "#2C1810", margin: "16px 0 6px" }}>Rajesh Kumar</h2>
            <div style={{ color: "#8B5E3C", fontWeight: "600", marginBottom: "20px" }}>Founder & Managing Director</div>
            <p style={{ color: "#7A6355", lineHeight: "1.82", marginBottom: "18px", fontSize: "15px" }}>
              With over 15 years of experience in the packaging industry, Rajesh founded The Box Hub in 2019 with a mission to democratize premium packaging for businesses of every size.
            </p>
            <p style={{ color: "#7A6355", lineHeight: "1.82", marginBottom: "28px", fontSize: "15px" }}>
              Having worked with Fortune 500 companies and local startups alike, he brings a unique blend of industrial expertise and entrepreneurial thinking — making The Box Hub the go-to packaging partner across industries.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Customer-first always — no compromise on delivery or quality", "Packaging is branding; every box tells a story", "Accessible premium: great packaging for every budget"].map(v => (
                <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8B5E3C", marginTop: "6px", flexShrink: 0 }}/>
                  <span style={{ fontSize: "14px", color: "#7A6355", lineHeight: "1.6" }}>{v}</span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}

// ======================== PRODUCTS PAGE ========================
function ProductsPage({ setPage }) {
  const products = [
    { title: "Corrugated Shipping Box", desc: "Heavy-duty double-wall corrugated boxes for safe long-distance shipping. Available in B, C, E flute variants.", tag: "Shipping", emoji: "📦" },
    { title: "Food Packaging Box", desc: "Food-safe, grease-resistant carton boxes for bakeries, restaurants, and packaged food brands.", tag: "Food", emoji: "🍕" },
    { title: "Bottle Carrier Box", desc: "Secure multi-cell bottle carriers for beverages, oils, and sauces. Fits 2 to 12 units.", tag: "Bottle", emoji: "🍶" },
    { title: "Luxury Gift Box", desc: "Premium rigid and folding gift boxes with custom foil stamping, embossing, and ribbon closures.", tag: "Gift", emoji: "🎁" },
    { title: "E-Commerce Mailer Box", desc: "Self-sealing, print-ready mailer boxes ideal for D2C brands with unboxing experience in mind.", tag: "eCommerce", emoji: "🛒" },
    { title: "Retail Counter Box", desc: "Compact display-ready boxes for retail shelves with vibrant CMYK printing and die-cut windows.", tag: "Retail", emoji: "🏪" },
    { title: "Pharma & Medicine Box", desc: "Compliant pharmaceutical folding cartons with accurate printing for dosage and safety labeling.", tag: "Pharma", emoji: "💊" },
    { title: "Industrial Bulk Box", desc: "High-strength bulk cartons for warehousing and industrial product storage and transport.", tag: "Industrial", emoji: "🏭" },
  ];

  const [filter, setFilter] = useState("All");
  const tags = ["All", "Shipping", "Food", "Bottle", "Gift", "eCommerce"];
  const filtered = filter === "All" ? products : products.filter(p => p.tag === filter);

  return (
    <div style={{ paddingTop: "72px" }}>
      <section style={{ background: "linear-gradient(135deg, #FAF7F2, #EDE5D8)", padding: "80px 24px 64px", textAlign: "center" }}>
        <FadeInWhenVisible>
          <span className="tag">Our Catalogue</span>
          <h1 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: "700", color: "#2C1810", marginTop: "16px" }}>Our Products</h1>
          <p style={{ color: "#7A6355", fontSize: "17px", maxWidth: "520px", margin: "14px auto 0", lineHeight: "1.75" }}>Explore our full range of carton box solutions — crafted to fit every industry and brand.</p>
        </FadeInWhenVisible>
      </section>

      <section className="section-pad">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <FadeInWhenVisible>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "48px" }}>
              {tags.map(tag => (
                <button key={tag} onClick={() => setFilter(tag)} style={{ padding: "8px 22px", borderRadius: "50px", border: "1.5px solid", borderColor: filter === tag ? "#8B5E3C" : "#E0D5C8", background: filter === tag ? "#8B5E3C" : "white", color: filter === tag ? "white" : "#7A6355", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}>{tag}</button>
              ))}
            </div>
          </FadeInWhenVisible>

          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div key={p.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }} className="card-hover"
                  style={{ background: "white", borderRadius: "16px", border: "1px solid #E0D5C8", overflow: "hidden", boxShadow: "0 4px 16px rgba(139,94,60,0.06)" }}>
                  <div style={{ height: "160px", background: "#F7F3EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>{p.emoji}</div>
                  <div style={{ padding: "20px" }}>
                    <span style={{ background: "#F0E8DC", color: "#8B5E3C", padding: "3px 10px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px", textTransform: "uppercase" }}>{p.tag}</span>
                    <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#2C1810", margin: "10px 0 8px", lineHeight: "1.35" }}>{p.title}</h3>
                    <p style={{ fontSize: "13px", color: "#7A6355", lineHeight: "1.65", marginBottom: "16px" }}>{p.desc}</p>
                    <button className="btn-primary" onClick={() => setPage("Contact")} style={{ padding: "9px 18px", fontSize: "13px", width: "100%" }}>Request Quote</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ======================== CUSTOMIZATION PAGE ========================
function CustomizationPage({ setPage }) {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone && form.requirement) setSubmitted(true);
  };

  const steps = [
    { num: "01", icon: "📋", title: "Share Your Brief", desc: "Tell us your box dimensions, material preference, quantity, and design requirements." },
    { num: "02", icon: "🎨", title: "Design & Proof", desc: "Our design team creates a digital proof with your branding — approved before production." },
    { num: "03", icon: "🏭", title: "Manufacturing", desc: "Your boxes are manufactured using high-quality material with precision die-cutting and printing." },
    { num: "04", icon: "🚀", title: "Delivery", desc: "Quality-checked boxes packed and dispatched to your doorstep within the committed timeline." },
  ];

  return (
    <div style={{ paddingTop: "72px" }}>
      <section style={{ background: "linear-gradient(135deg, #FAF7F2, #EDE5D8)", padding: "80px 24px 64px", textAlign: "center" }}>
        <FadeInWhenVisible>
          <span className="tag">How It Works</span>
          <h1 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: "700", color: "#2C1810", marginTop: "16px" }}>Custom Packaging</h1>
          <p style={{ color: "#7A6355", fontSize: "17px", maxWidth: "540px", margin: "14px auto 0", lineHeight: "1.75" }}>From concept to carton — your custom packaging journey in 4 simple steps.</p>
        </FadeInWhenVisible>
      </section>

      {/* Steps */}
      <section className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <StaggerWhenVisible style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", position: "relative" }}>
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp}
                style={{ background: "white", borderRadius: "16px", padding: "32px 20px", textAlign: "center", border: "1.5px solid #E0D5C8", position: "relative" }}>
                <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", background: "#8B5E3C", color: "white", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>{step.num}</div>
                {i < 3 && <div style={{ position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)", color: "#8B5E3C", fontSize: "18px", zIndex: 2 }}>→</div>}
                <div style={{ fontSize: "40px", margin: "12px 0 16px" }}>{step.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#2C1810", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6355", lineHeight: "1.65" }}>{step.desc}</p>
              </motion.div>
            ))}
          </StaggerWhenVisible>
        </div>
      </section>

      {/* MOQ Box */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <FadeInWhenVisible>
            <div style={{ background: "linear-gradient(135deg, #6B4423, #8B5E3C)", borderRadius: "20px", padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
              <h2 className="font-display" style={{ fontSize: "32px", fontWeight: "700", color: "white", marginBottom: "12px" }}>Minimum Order: 50 Boxes</h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: "1.7", marginBottom: "24px" }}>We keep our MOQ low so startups and small businesses can access premium custom packaging without breaking the bank.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[["50+", "Min. Boxes"], ["7 Days", "Avg Delivery"], ["Free", "Design Proof"]].map(([val, label]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "16px 8px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "white", fontFamily: "'Playfair Display', serif" }}>{val}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Form */}
      <section className="section-pad" style={{ background: "#F7F3EE" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span className="tag">Get Started</span>
              <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: "700", color: "#2C1810", marginTop: "14px" }}>Request Custom Quote</h2>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <div style={{ background: "white", borderRadius: "20px", padding: "40px", boxShadow: "0 8px 32px rgba(139,94,60,0.1)" }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
                  <h3 className="font-display" style={{ fontSize: "26px", fontWeight: "700", color: "#2C1810", marginBottom: "10px" }}>Request Received!</h3>
                  <p style={{ color: "#7A6355", lineHeight: "1.7" }}>Our team will contact you within 24 hours with a personalized quote.</p>
                </motion.div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "8px" }}>Your Name *</label>
                    <input className="form-input" placeholder="e.g. Priya Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                  </div>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "8px" }}>Phone Number *</label>
                    <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}/>
                  </div>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "8px" }}>Your Requirement *</label>
                    <textarea className="form-input" rows="4" placeholder="Describe box size, quantity, material, print design..." value={form.requirement} onChange={e => setForm({...form, requirement: e.target.value})} style={{ resize: "vertical" }}/>
                  </div>
                  <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", padding: "16px" }}>Submit Request</button>
                </div>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}

// ======================== CONTACT PAGE ========================
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ paddingTop: "72px" }}>
      <section style={{ background: "linear-gradient(135deg, #FAF7F2, #EDE5D8)", padding: "80px 24px 64px", textAlign: "center" }}>
        <FadeInWhenVisible>
          <span className="tag">Get in Touch</span>
          <h1 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: "700", color: "#2C1810", marginTop: "16px" }}>Contact Us</h1>
          <p style={{ color: "#7A6355", fontSize: "17px", maxWidth: "500px", margin: "14px auto 0", lineHeight: "1.75" }}>Ready to start your packaging project? We'd love to hear from you.</p>
        </FadeInWhenVisible>
      </section>

      {/* Contact Info Cards */}
      <section className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <StaggerWhenVisible style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "64px" }}>
            {[
              { icon: "📞", title: "Call Us", info: "+91 98765 43210", sub: "Mon–Sat, 9am–7pm" },
              { icon: "✉️", title: "Email Us", info: "hello@theboxhub.in", sub: "Reply within 4 hours" },
              { icon: "📍", title: "Visit Us", info: "Hyderabad, Telangana", sub: "GIDC Industrial Area" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="card-hover"
                style={{ background: "white", borderRadius: "16px", padding: "32px 24px", textAlign: "center", border: "1.5px solid #E0D5C8", boxShadow: "0 4px 16px rgba(139,94,60,0.06)" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2C1810", marginBottom: "8px" }}>{item.title}</h3>
                <div style={{ fontSize: "15px", color: "#8B5E3C", fontWeight: "600", marginBottom: "4px" }}>{item.info}</div>
                <div style={{ fontSize: "13px", color: "#7A6355" }}>{item.sub}</div>
              </motion.div>
            ))}
          </StaggerWhenVisible>

          {/* Form */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <FadeInWhenVisible variants={slideLeft}>
              <h2 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "700", color: "#2C1810", marginBottom: "10px" }}>Send Us a Message</h2>
              <p style={{ color: "#7A6355", fontSize: "15px", lineHeight: "1.75", marginBottom: "32px" }}>Fill the form and our team will get back to you with a tailored packaging solution.</p>
              {sent ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: "#F0FFF4", border: "1.5px solid #86EFAC", borderRadius: "14px", padding: "32px", textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                  <h3 style={{ fontWeight: "700", color: "#166534", marginBottom: "8px" }}>Message Sent!</h3>
                  <p style={{ color: "#15803D", fontSize: "14px" }}>We'll respond within 4 business hours.</p>
                </motion.div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "7px" }}>Name *</label>
                      <input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "7px" }}>Phone *</label>
                      <input className="form-input" placeholder="+91 ..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "7px" }}>Email</label>
                    <input className="form-input" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "#2C1810", display: "block", marginBottom: "7px" }}>Message *</label>
                    <textarea className="form-input" rows="5" placeholder="Tell us about your packaging requirement..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: "vertical" }}/>
                  </div>
                  <button className="btn-primary" onClick={() => { if (form.name && form.phone && form.message) setSent(true); }} style={{ padding: "16px" }}>Send Message</button>
                </div>
              )}
            </FadeInWhenVisible>

            <FadeInWhenVisible variants={slideRight}>
              <div style={{ background: "linear-gradient(160deg, #FAF7F2, #EDE5D8)", borderRadius: "20px", padding: "40px" }}>
                <h3 className="font-display" style={{ fontSize: "22px", fontWeight: "700", color: "#2C1810", marginBottom: "24px" }}>Quick Connect</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[{ label: "WhatsApp", val: "+91 98765 43210", icon: "💬" }, { label: "Call Direct", val: "+91 98765 43210", icon: "📞" }, { label: "Email", val: "hello@theboxhub.in", icon: "✉️" }, { label: "Working Hours", val: "Mon–Sat, 9am–7pm", icon: "🕐" }].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", background: "white", borderRadius: "12px", border: "1px solid #E0D5C8" }}>
                      <span style={{ fontSize: "20px" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "12px", color: "#7A6355", fontWeight: "500" }}>{item.label}</div>
                        <div style={{ fontSize: "14px", color: "#2C1810", fontWeight: "600" }}>{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "28px", padding: "20px", background: "#8B5E3C", borderRadius: "14px", textAlign: "center" }}>
                  <div style={{ color: "white", fontSize: "14px", marginBottom: "10px" }}>Chat with us instantly</div>
                  <button style={{ background: "#25D366", color: "white", border: "none", padding: "10px 24px", borderRadius: "50px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "600", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", margin: "0 auto" }}
                    onClick={() => window.open("https://wa.me/911234567890", "_blank")}>
                    <WhatsAppIcon /> WhatsApp Now
                  </button>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  );
}

// ======================== FOOTER ========================
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#2C1810", color: "white", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "38px", height: "38px", background: "linear-gradient(135deg, #8B5E3C, #C4935A)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="7" width="16" height="11" rx="1.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.2"/>
                  <path d="M2 7L10 2L18 7" stroke="white" strokeWidth="1.2"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700" }}>The Box Hub</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.8", maxWidth: "280px" }}>Premium custom carton boxes for food, gifting, e-commerce, and industrial needs. Crafted with care. Delivered on time.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["📘", "📸", "💼", "🐦"].map((icon, i) => (
                <div key={i} style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", transition: "background 0.2s" }}>{icon}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "#C4935A", letterSpacing: "1px", textTransform: "uppercase" }}>Pages</h4>
            {["Home", "Products", "Customization", "About", "Contact"].map(p => (
              <button key={p} onClick={() => setPage(p)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: "14px", padding: "5px 0", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color 0.2s" }}>{p}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "#C4935A", letterSpacing: "1px", textTransform: "uppercase" }}>Products</h4>
            {["Shipping Boxes", "Food Boxes", "Gift Boxes", "Mailer Boxes", "Bottle Boxes"].map(p => (
              <div key={p} style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", padding: "5px 0" }}>{p}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "#C4935A", letterSpacing: "1px", textTransform: "uppercase" }}>Contact</h4>
            {[{ icon: "📞", text: "+91 98765 43210" }, { icon: "✉️", text: "hello@theboxhub.in" }, { icon: "📍", text: "Hyderabad, Telangana" }, { icon: "🕐", text: "Mon–Sat, 9am–7pm" }].map(item => (
              <div key={item.text} style={{ display: "flex", gap: "10px", marginBottom: "10px", color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>
                <span>{item.icon}</span><span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>© 2025 The Box Hub. All rights reserved.</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>Made with ❤️ in India</div>
        </div>
      </div>
    </footer>
  );
}

// ======================== MAIN APP ========================
export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const setPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <style>{style}</style>
      <Navbar currentPage={currentPage} setPage={setPage} />

      <AnimatePresence mode="wait">
        <motion.main key={currentPage} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          {currentPage === "Home" && <HomePage setPage={setPage} />}
          {currentPage === "About" && <AboutPage />}
          {currentPage === "Products" && <ProductsPage setPage={setPage} />}
          {currentPage === "Customization" && <CustomizationPage setPage={setPage} />}
          {currentPage === "Contact" && <ContactPage />}
        </motion.main>
      </AnimatePresence>

      <Footer setPage={setPage} />

      {/* Floating Buttons */}
      <div className="whatsapp-float" onClick={() => window.open("https://wa.me/911234567890", "_blank")} title="Chat on WhatsApp">
        <WhatsAppIcon />
      </div>
      <div className="call-float" onClick={() => window.open("tel:+919876543210")} title="Call Us">
        <PhoneIcon />
      </div>
    </div>
  );
}
