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
  const [form, setForm] = useState({ name: "", phone: "", requirement: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.phone && form.requirement) {
      setSubmitted(true);
    }
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
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle2 size={72} className="text-green-500 mx-auto mb-6" />
                <h3 className="font-display text-[26px] font-bold text-text mb-3">Request Received!</h3>
                <p className="text-text-muted leading-[1.7] max-w-sm mx-auto">
                  Our team will contact you within 24 hours with a personalized quote for your custom packaging.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-[14px] font-semibold text-text block mb-2">Your Name *</label>
                  <input
                    required
                    className="form-input"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[14px] font-semibold text-text block mb-2">Phone Number *</label>
                  <input
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[14px] font-semibold text-text block mb-2">Your Requirement *</label>
                  <textarea
                    required
                    className="form-input min-h-[120px] resize-y"
                    placeholder="Describe box size, quantity, material, print design..."
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 mt-2 text-[16px]">
                  Submit Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
