import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Package, ShieldCheck, Award, Truck, Leaf, Droplet, Settings, Sparkles, Wind, Layers } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function FloatingBoxes() {
  return (
    <div className="relative w-full h-[420px]">
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[15%] w-[200px] h-[200px] bg-gradient-to-br from-brown to-brown-light rounded-2xl shadow-[0_20px_60px_rgba(139,94,60,0.3)] flex items-center justify-center"
      >
        <Package size={80} className="text-white/80" strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-[30%] right-[10%] w-[150px] h-[150px] bg-gradient-to-br from-[#EDE5D8] to-[#D4C4B0] rounded-2xl shadow-[0_16px_40px_rgba(139,94,60,0.2)] flex items-center justify-center"
      >
        <Package size={60} className="text-brown" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        animate={{ y: [-5, 10, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[5%] left-[35%] w-[110px] h-[110px] bg-beige rounded-xl shadow-[0_12px_30px_rgba(139,94,60,0.15)] border-2 border-[#E0D5C8] flex items-center justify-center"
      >
        <Package size={44} className="text-brown" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[30%] w-[70px] h-[70px] bg-gradient-to-br from-brown to-brown-light rounded-full opacity-15"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] right-[25%] w-[40px] h-[40px] bg-brown rounded-full opacity-10"
      />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="tag mb-5">Premium Packaging Solutions</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-display text-[clamp(36px,5vw,62px)] font-bold text-text leading-[1.12] mb-6 tracking-tight"
            >
              Premium Carton Boxes<br />
              <span className="text-brown">for Every Business</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[17px] text-text-muted leading-relaxed mb-9 max-w-md"
            >
              Crafting strong, beautiful, and custom-designed carton boxes for food brands, e-commerce, gifting, and more. Built to protect. Designed to impress.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex flex-wrap gap-4">
              <a href="https://wa.me/911234567890?text=Hello SVK PACKAGING, I would like to get a custom packaging quote." target="_blank" rel="noreferrer" className="btn-primary">
                Get a Free Quote
              </a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2">
                <FaWhatsapp size={18} /> WhatsApp Us
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-10 mt-12 pt-8 border-t border-[#E0D5C8]"
            >
              {[["500+", "Happy Clients"], ["10M+", "Boxes Delivered"], ["7+", "Years Experience"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-[28px] font-bold text-brown">{num}</div>
                  <div className="text-[13px] text-text-muted mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
            <img src="/images/hero_boxes_1776242635107.png" alt="Premium Carton Boxes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="tag mb-4">Our Categories</span>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-text tracking-tight">Boxes for Every Need</h2>
            <p className="text-text-muted text-base mt-4 max-w-lg mx-auto leading-relaxed">
              From food-grade packaging to luxury gift boxes, we craft it all with precision.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Food Boxes", desc: "Hygienic, food-grade carton boxes for bakeries, restaurants, and brands.", img: "/images/food_grade_boxes.png" },
              { title: "Bottle Boxes", desc: "Sturdy carriers for beverages, oils, and premium liquid products.", img: "/images/bottle_boxes_tall.png" },
              { title: "Shipping Boxes", desc: "Corrugated, double-wall boxes built for safe e-commerce logistics.", img: "/images/cat_shipping_1776242687272.png" },
              // { title: "Gift Boxes", desc: "Elegant, customizable gift packaging for retail and premium brands.", img: "/images/cat_gift_1776242702728.png" },
            ].map((cat) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                className="card-hover rounded-2xl overflow-hidden border border-brown/10 bg-white"
              >
                <div className="h-48 overflow-hidden bg-beige">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="p-6 bg-white/40 backdrop-blur-sm">
                  <h3 className="text-[17px] font-bold text-text mb-2">{cat.title}</h3>
                  <p className="text-[14px] text-text-muted leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-beige">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="tag mb-4">Why Us</span>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-text">SVK PACKAGING Advantage</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7"
          >
            {[
              { icon: "⚡", title: "Fast Turnaround", desc: "3–5 day production with bulk order priority handling." },
              { icon: "🎨", title: "Custom Printing", desc: "Full-color CMYK printing with brand logo and design." },
              { icon: "♻️", title: "Eco Friendly", desc: "FSC-certified, recyclable materials for sustainable brands." },
              { icon: "💎", title: "Premium Quality", desc: "GSM-optimized cartons tested for strength and durability." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="card-hover bg-white rounded-2xl p-8 text-center shadow-soft"
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-[16px] font-bold text-text mb-2.5">{item.title}</h3>
                <p className="text-[14px] text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clientele & Who We Serve */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <span className="tag mb-4">Our Clientele</span>
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-text">Trusted by Top Companies</h2>
          </motion.div>

          {/* Enterprise Clients Text Cloud */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-12 mb-24 px-4 max-w-5xl mx-auto"
          >
            {[
              { name: "PMK", color: "text-[#2A2A2A]", className: "font-sans font-black tracking-tighter text-4xl" },
              { name: "NSL", color: "text-[#1E3A8A]", className: "font-serif italic font-bold text-4xl" },
              { name: "Vijaya Dairy", icon: Droplet, color: "text-[#0284C7]", className: "font-display font-bold text-[28px] tracking-tight flex items-center gap-2" },
              { name: "Kumar Pumps", icon: Settings, color: "text-[#334155]", className: "font-sans font-extrabold text-[24px] uppercase tracking-tighter flex items-center gap-1.5" },
              { name: "Anu Sweets", icon: Sparkles, color: "text-[#EA580C]", className: "font-serif font-semibold text-[28px] flex items-center gap-2" },
              { name: "Premium Fans", icon: Wind, color: "text-[#0F172A]", className: "font-display font-medium text-[22px] tracking-widest uppercase flex items-center gap-2" },
              { name: "Priya Pickles", icon: Leaf, color: "text-[#BE123C]", className: "font-serif font-bold text-[28px] flex items-center gap-1.5" },
              { name: "Mohan Spintex", icon: Layers, color: "text-[#4338CA]", className: "font-sans font-bold text-[22px] tracking-tight uppercase flex items-center gap-2" }
            ].map((client, i) => {
              const Icon = client.icon;
              return (
                <div key={i} className="group relative flex items-center justify-center cursor-default grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className={`${client.className} ${client.color}`}>
                    {Icon && <Icon size={32} strokeWidth={2.5} className="mb-1 text-current flex-shrink-0" />}
                    <span>{client.name}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h3 className="font-display text-2xl font-bold text-text">Empowering Start-ups</h3>
            <p className="text-text-muted mt-3 max-w-2xl mx-auto text-[15px]">
              We also design highly specialized, premium customized packaging for start-ups looking to scale globally.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Leather Box Export", icon: "👜", desc: "Luxury, robust packaging built for premium leather goods." },
              { title: "Clothing Export", icon: "👗", desc: "Durable corrugated boxes for international apparel shipping." },
              { title: "Food Grade", icon: "🍱", desc: "Hygienic, certified safe packaging for food start-ups." },
              { title: "Premium Gifting", icon: "🎁", desc: "Luxurious custom finishes for boutique gifting brands." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="card-hover border-[1.5px] border-[#E0D5C8] bg-[#FAF7F2] rounded-xl p-8 text-center"
              >
                <div className="text-[40px] mb-4">{item.icon}</div>
                <h3 className="text-[16px] font-bold text-text mb-2.5">{item.title}</h3>
                <p className="text-[14px] text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-[#6B4423] via-[#8B5E3C] to-[#A87850] py-20 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mb-4">Need Custom Packaging?</h2>
          <p className="text-white/80 text-[17px] mb-9 leading-relaxed">
            Tell us your box dimensions, print requirements, and quantity — we'll craft it perfectly.
          </p>
          <a href="https://wa.me/911234567890?text=Hello SVK PACKAGING, I would like to get a custom packaging quote for bulk orders." target="_blank" rel="noreferrer" className="btn-white flex items-center gap-2">
            Get Free Quote Today <ArrowRight size={18} />
          </a>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 px-6 border-b border-[#E0D5C8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { icon: ShieldCheck, title: "100% Secure" },
              { icon: Award, title: "Premium Quality" },
              { icon: Truck, title: "Pan India Delivery" },
              { icon: Leaf, title: "Eco-Friendly" }
            ].map((badge) => (
              <motion.div key={badge.title} variants={fadeUp} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-brown/5 rounded-full flex items-center justify-center text-brown">
                  <badge.icon size={26} strokeWidth={1.5} />
                </div>
                <div className="text-[14px] font-bold text-text">{badge.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
