import { motion } from "framer-motion";
import { CheckCircle2, Factory, Leaf, Lightbulb, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-text/80 z-10" />
          <img src="/images/bg_production_1776243163594.png" className="w-full h-full object-cover" alt="Background" />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mx-auto relative z-20"
        >
          <span className="tag bg-white/20 text-white backdrop-blur-md border border-white/10 mb-4">Our Story</span>
          <h1 className="font-display text-[clamp(32px,5vw,58px)] font-bold text-white tracking-tight leading-tight">
            About SVK PACKAGING
          </h1>
          <p className="text-white/80 text-[17px] mt-4 leading-relaxed">
            Crafting packaging that goes beyond containment — we build brand experiences from the first unbox.
          </p>
        </motion.div>
      </section>

      {/* Company Intro */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideLeft}
          >
            <span className="tag mb-4">Who We Are</span>
            <h2 className="font-display text-[clamp(24px,3.5vw,40px)] font-bold text-text leading-tight mb-5">
              Built on Craft,<br />Driven by Quality
            </h2>
            <p className="text-text-muted leading-relaxed mb-5 text-[15px]">
              SVK PACKAGING was founded with a singular vision: to deliver packaging solutions that protect your products and amplify your brand. We specialize in custom-designed carton boxes across food, gifting, e-commerce, and industrial segments.
            </p>
            <p className="text-text-muted leading-relaxed mb-8 text-[15px]">
              Our state-of-the-art manufacturing facility uses FSC-certified materials and advanced printing technology to bring your brand vision to life — with accuracy, speed, and care.
            </p>
            
            <div className="grid grid-cols-2 gap-5">
              {[
                { title: "ISO Certified", sub: "Quality assured" },
                { title: "Eco Materials", sub: "Sustainable sourcing" },
                { title: "Pan India", sub: "Delivery network" },
                { title: "Custom MOQ", sub: "From 50 boxes" }
              ].map((item) => (
                <div key={item.title} className="bg-beige p-4 rounded-xl">
                  <div className="font-bold text-[14px] text-text flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brown" /> {item.title}
                  </div>
                  <div className="text-[12px] text-text-muted mt-1 ml-6">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideRight}
            className="rounded-3xl h-[420px] relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <img src="/images/about_company_1776242719809.png" alt="Manufacturing Facility" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="font-display text-[26px] text-white font-semibold">Manufacturing Excellence</div>
              <div className="text-white/80 text-sm mt-2 font-medium tracking-wide flex items-center gap-3">
                <span className="w-8 h-[2px] bg-brown" />
                Since 2019
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-beige">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="tag mb-4">Our Mission</span>
            <h2 className="font-display text-[clamp(24px,4vw,42px)] font-bold text-text leading-tight mb-6">
              "Packaging That Protects,<br />Presents, and Performs"
            </h2>
            <p className="text-text-muted text-[16px] leading-[1.85]">
              We believe packaging is the first handshake between a brand and its customer. Our mission is to make that handshake strong, memorable, and sustainable — combining industrial-grade durability with design that sells.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { icon: Leaf, title: "Sustainability", desc: "Recyclable materials, minimal waste, eco-conscious processes" },
              { icon: Lightbulb, title: "Innovation", desc: "Constant R&D to bring new printing and material techniques" },
              { icon: Users, title: "Partnership", desc: "Long-term client relationships built on trust and delivery" }
            ].map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 shadow-soft flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-beige rounded-full flex items-center justify-center text-brown mb-4">
                  <v.icon size={28} />
                </div>
                <h3 className="font-bold text-[15px] text-text mb-2">{v.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideLeft}
            className="order-2 md:order-1 rounded-3xl h-[460px] relative shadow-lg overflow-hidden"
          >
            <img src="/images/founder.jpg" alt="Pradeep Maganti - Founder" className="w-full h-[115%] object-cover object-top -translate-y-[5%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white z-10">
              <div className="font-display text-[28px] font-semibold text-white">Pradeep Maganti</div>
              <div className="text-white/80 text-[15px] mt-1 font-medium tracking-wide">Founder & CEO, SVK PACKAGING</div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideRight}
            className="order-1 md:order-2"
          >
            <span className="tag mb-4">Meet the Founder</span>
            <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-bold text-text mt-1 mb-1.5">
              Pradeep Maganti
            </h2>
            <div className="text-brown font-semibold mb-5 text-[15px]">Founder & Managing Director</div>
            <p className="text-text-muted leading-relaxed mb-4 text-[15px]">
              With over 7 years steeped in industrial print and structural design, Pradeep founded SVK PACKAGING in 2019. He saw a massive gap where premium, structurally flawless packaging was only accessible to enterprise corporations, leaving ambitious startups behind.
            </p>
            <p className="text-text-muted leading-relaxed mb-4 text-[15px]">
              Starting in a modest workshop with a single die-cutting machine, his philosophy that "packaging is the ultimate silent salesman" struck a chord. Today, SVK PACKAGING operates an advanced manufacturing facility driven by Pradeep's original vision: uncompromising aesthetic precision combined with unbreakable strength.
            </p>
            <p className="text-text-muted leading-relaxed mb-7 text-[15px] italic">
              "Every box we crease and fold carries the soul of a brand inside it. Our responsibility isn't just protecting a product; it's delivering an unforgettable unboxing experience."
            </p>
            
            <div className="flex flex-col gap-3">
              {[
                "Customer-first always — no compromise on delivery or quality",
                "Packaging is branding; every box tells a story",
                "Accessible premium: great packaging for every budget"
              ].map((v) => (
                <div key={v} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brown mt-2 shrink-0" />
                  <span className="text-[14px] text-text-muted leading-relaxed">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
