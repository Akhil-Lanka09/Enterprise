import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Paintbrush, Factory, Truck, CheckCircle2, Package } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Customization() {
  const [activeSizeTab, setActiveSizeTab] = useState("Shipping Boxes");

  const handleWhatsApp = () => {
    window.open('https://wa.me/911234567890?text=Hello SVK PACKAGING, I would like to get a custom packaging quote.', '_blank');
  };

  const standardBoxes = {
    "Shipping Boxes": [
      "3.5 x 3.5 x 3.5", "4 x 4 x 3", "4 x 4 x 4", "4.5 x 4.5 x 2", "5 x 4 x 2.5", 
      "5 x 4 x 3.5", "5 x 5 x 5", "6 x 3 x 3", "6 x 5 x 2", "6 x 6 x 6", 
      "7 x 7 x 7", "7 x 4 x 2", "7 x 4 x 3.5", "7 x 5.25 x 4.25", "7.5 x 4.5 x 3.5", 
      "8 x 8 x 3", "8 x 5 x 3.5", "8 x 5 x 2", "8 x 4 x 4", "8 x 4 x 8", 
      "9 x 7.5 x 4.5", "9 x 6 x 3", "9 x 6 x 4", "9 x 6 x 6", "10 x 4.5 x 3.5", 
      "11 x 6 x 5", "12 x 4 x 4", "12 x 10 x 8", "12 x 8 x 4", "12 x 8 x 8", 
      "12 x 11 x 6", "12 x 11 x 9", "15 x 11 x 9"
    ],
    "Brown / White Flap Box Sizes": [
      "4 x 4 x 1.5", "4.5 x 3 x 1", "5 x 2 x 2", "6 x 5 x 2", "6 x 5 x 1.5", 
      "7 x 4 x 2.5", "8 x 5 x 2", "8 x 5 x 3", "10 x 7 x 3.5", "11 x 6 x 5", 
      "12 x 4 x 3", "12 x 10 x 8", "12 x 8 x 4", "12 x 11 x 6", "13 x 9 x 2", "14 x 13 x 2.5"
    ],
    "White Shipping Box Sizes": [
      "5 x 3.5 x 4", "5 x 4 x 2.5", "7 x 4 x 2.5", "7 x 4 x 3.5", "8 x 5 x 2", "9.5 x 6 x 3.5"
    ]
  };

  const steps = [
    { num: "01", icon: ClipboardList, title: "Share Your Brief", desc: "Tell us your box dimensions, material preference, quantity, and design requirements." },
    { num: "02", icon: Paintbrush, title: "Design & Proof", desc: "Our design team creates a digital proof with your branding — approved before production." },
    { num: "03", icon: Factory, title: "Manufacturing", desc: "Your boxes are manufactured using high-quality material with precision die-cutting and printing." },
    { num: "04", icon: Truck, title: "Delivery", desc: "Quality-checked boxes packed and dispatched to your doorstep within the committed timeline." },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-text/80 z-10" />
          <img src="/images/hero_boxes_1776242635107.png" className="w-full h-full object-cover" alt="Background" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto relative z-20">
          <span className="tag bg-white/20 text-white backdrop-blur-md border border-white/10 mb-4">How It Works</span>
          <h1 className="font-display text-[clamp(32px,5vw,58px)] font-bold text-white tracking-tight mt-2 leading-tight">
            Custom Packaging
          </h1>
          <p className="text-white/80 text-[17px] mt-4 max-w-lg mx-auto leading-relaxed">
            From concept to carton — your custom packaging journey in 4 simple steps.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 text-center border-[1.5px] border-[#E0D5C8] relative card-hover"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brown text-white w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shadow-md">
                  {step.num}
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-brown text-xl z-10">
                    →
                  </div>
                )}
                <div className="w-16 h-16 mx-auto bg-beige rounded-2xl flex items-center justify-center text-brown mb-5">
                  <step.icon size={32} />
                </div>
                <h3 className="text-[15px] font-bold text-text mb-2.5">{step.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MOQ Box */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-gradient-to-br from-[#6B4423] to-[#8B5E3C] rounded-3xl p-10 md:p-12 text-center shadow-xl"
          >
            <Package size={56} className="text-white/90 mx-auto mb-4" />
            <h2 className="font-display text-[32px] md:text-[40px] font-bold text-white mb-4 tracking-tight">
              Minimum Order: 50 Boxes
            </h2>
            <p className="text-white/80 text-[16px] leading-[1.7] mb-8 max-w-xl mx-auto">
              We keep our MOQ low so startups and small businesses can access premium custom packaging without breaking the bank.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { val: "50+", label: "Min. Boxes" },
                { val: "7 Days", label: "Avg Delivery" },
                { val: "Free", label: "Design Proof" }
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-[26px] font-bold text-white font-display leading-tight">{item.val}</div>
                  <div className="text-[13px] text-white/70 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Standard Sizes Chart */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-3xl p-8 md:p-12 border border-[#E0D5C8] shadow-soft flex flex-col items-center"
          >
            <div className="text-center mb-10">
              <span className="bg-[#F0E8DC] text-brown px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">Standard Sizes</span>
              <h2 className="font-display text-[32px] md:text-[40px] font-bold text-text mb-4">
                Ready-to-Order Dimensions
              </h2>
              <p className="text-text-muted text-[16px] leading-[1.7] max-w-xl mx-auto">
                Need something right away? We manufacture these standard sizes with a <strong className="text-brown">Minimum Order Quantity of just 50 boxes</strong>.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {Object.keys(standardBoxes).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveSizeTab(category)}
                  className={`px-6 py-3 rounded-full text-[15px] font-bold transition-all border-2 ${
                    activeSizeTab === category
                      ? "border-brown bg-brown text-white shadow-md"
                      : "border-[#E0D5C8] bg-white text-text hover:border-brown/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sizes Grid */}
            <motion.div 
              key={activeSizeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full"
            >
              {standardBoxes[activeSizeTab].map((size, index) => (
                <div 
                  key={index} 
                  className="bg-[#FAF7F2] border border-[#E0D5C8]/70 rounded-xl p-3.5 text-center font-bold text-text text-[15px] hover:border-brown hover:shadow-sm transition-all cursor-default"
                >
                  {size}
                </div>
              ))}
            </motion.div>

            <div className="mt-12 text-center w-full max-w-md">
              <button 
                onClick={() => window.open(`https://wa.me/911234567890?text=Hello SVK PACKAGING, I am interested in ordering standard sizes (${activeSizeTab}) with MOQ 50.`, '_blank')} 
                className="btn-outline w-full py-3.5 border-brown text-brown font-bold text-[15px] hover:bg-brown hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                Order {activeSizeTab} on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section-pad bg-beige">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <span className="tag mb-3">Get Started</span>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-text">Request Custom Quote</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-soft"
          >
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-text-muted leading-[1.7] max-w-sm mx-auto mb-8">
                Skip the web forms! Send us your exact dimensions, material preferences, and quantity directly on WhatsApp for an instant custom quote.
              </p>
              <button onClick={handleWhatsApp} className="btn-primary w-full py-4 text-[16px] flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] border-none shadow-md">
                Chat on WhatsApp Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
