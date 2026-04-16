import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Award, Truck, Leaf, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What is your minimum order quantity (MOQ)?", a: "Our standard MOQ is 50 boxes for custom printing. We keep it intentionally low to support small and medium businesses." },
    { q: "Do you offer physical samples before bulk production?", a: "Yes, we provide digital proofs for free and physical mockup samples for a nominal fee, which is adjusted against your bulk order." },
    { q: "How long does manufacturing take?", a: "Standard production time is 3–5 working days after design approval. Shipping takes an additional 2–5 days depending on your location." },
    { q: "Can you help with packaging design?", a: "Absolutely! Our in-house structural and graphic design team can help you create the perfect box from scratch." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.phone && form.message) {
      setSent(true);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-text/80 z-10" />
          <img src="/images/about_company_1776242719809.png" className="w-full h-full object-cover" alt="Background" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto relative z-20">
          <span className="tag bg-white/20 text-white backdrop-blur-md border border-white/10 mb-4">Get in Touch</span>
          <h1 className="font-display text-[clamp(32px,5vw,58px)] font-bold text-white tracking-tight mt-2 leading-tight">
            Contact Us
          </h1>
          <p className="text-white/80 text-[17px] mt-4 max-w-lg mx-auto leading-relaxed">
            Ready to start your packaging project? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-6">
          {/* Contact Info Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {[
              { icon: Phone, title: "Call Us", info: "+91 98765 43210", sub: "Mon–Sat, 9am–7pm" },
              { icon: Mail, title: "Email Us", info: "hello@svkpackaging.in", sub: "Reply within 4 hours" },
              { icon: MapPin, title: "Visit Us", info: "Viravalli, Andhra Pradesh", sub: "Manufacturer" },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="card-hover bg-white rounded-2xl p-8 text-center border-[1.5px] border-[#E0D5C8]"
              >
                <div className="w-16 h-16 mx-auto bg-beige rounded-2xl flex items-center justify-center text-brown mb-5">
                  <item.icon size={32} />
                </div>
                <h3 className="text-[16px] font-bold text-text mb-2.5">{item.title}</h3>
                <div className="text-[15px] font-semibold text-brown mb-1">{item.info}</div>
                <div className="text-[13px] text-text-muted">{item.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form & Side Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
            >
              <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold text-text mb-3">Send Us a Message</h2>
              <p className="text-text-muted text-[15px] leading-[1.75] mb-8">
                Fill the form and our team will get back to you with a tailored packaging solution.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#F0FFF4] border-[1.5px] border-[#86EFAC] rounded-[20px] p-10 text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-bold text-xl text-[#166534] mb-2">Message Sent!</h3>
                  <p className="text-[14px] text-[#15803D]">We'll respond within 4 business hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[13px] font-semibold text-text block mb-2">Name *</label>
                      <input
                        required
                        className="form-input"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-text block mb-2">Phone *</label>
                      <input
                        required
                        className="form-input"
                        placeholder="+91 ..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-text block mb-2">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-text block mb-2">Message *</label>
                    <textarea
                      required
                      className="form-input min-h-[140px] resize-y"
                      placeholder="Tell us about your packaging requirement..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 mt-2">
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Quick Connect side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="bg-gradient-to-br from-[#FAF7F2] to-[#EDE5D8] rounded-[24px] p-8 md:p-10"
            >
              <h3 className="font-display text-[22px] font-bold text-text mb-8">Quick Connect</h3>
              
              <div className="flex flex-col gap-4">
                {[
                  { label: "WhatsApp", val: "+91 98765 43210", icon: FaWhatsapp },
                  { label: "Call Direct", val: "+91 98765 43210", icon: Phone },
                  { label: "Email", val: "hello@svkpackaging.in", icon: Mail },
                  { label: "Working Hours", val: "Mon–Sat, 9am–7pm", icon: Clock }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E0D5C8]">
                    <div className="w-10 h-10 bg-beige rounded-lg flex items-center justify-center text-brown">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-[12px] text-text-muted font-medium mb-0.5">{item.label}</div>
                      <div className="text-[14px] text-text font-semibold">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-brown rounded-2xl text-center">
                <div className="text-white/90 text-[14px] mb-3">Chat with us instantly</div>
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-none px-6 py-3 rounded-full font-sans font-semibold text-[14px] inline-flex items-center gap-2"
                >
                  <FaWhatsapp size={18} /> WhatsApp Now
                </a>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-20 pt-16 border-t border-[#E0D5C8] grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
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

      {/* FAQ Section */}
      <section className="section-pad bg-beige">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="tag mb-3">FAQs</span>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold text-text">Frequently Asked Questions</h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-[1.5px] border-[#E0D5C8] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center bg-white hover:bg-[#FAF7F2] transition-colors gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-[15px] text-text">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brown transition-transform duration-300 shrink-0 ${activeFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-[14px] text-text-muted leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
