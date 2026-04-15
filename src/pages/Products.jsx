import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Products() {
  const products = [
    { title: "Corrugated Shipping Box", desc: "Heavy-duty double-wall corrugated boxes for safe long-distance shipping. Available in B, C, E flute variants.", tag: "Shipping", img: "/images/cat_shipping_1776242687272.png" },
    { title: "Food Packaging Box", desc: "Food-safe, grease-resistant carton boxes for bakeries, restaurants, and packaged food brands.", tag: "Food", img: "/images/cat_food_1776242671878.png" },
    { title: "Bottle Carrier Box", desc: "Secure multi-cell bottle carriers for beverages, oils, and sauces. Fits 2 to 12 units.", tag: "Bottle", img: "/images/cat_bottle_1776243453767.png" },
    { title: "Luxury Gift Box", desc: "Premium rigid and folding gift boxes with custom foil stamping, embossing, and ribbon closures.", tag: "Gift", img: "/images/cat_gift_1776242702728.png" },
    { title: "E-Commerce Mailer Box", desc: "Self-sealing, print-ready mailer boxes ideal for D2C brands with unboxing experience in mind.", tag: "eCommerce", img: "/images/cat_ecommerce_1776243551646.png" },
    { title: "Retail Counter Box", desc: "Compact display-ready boxes for retail shelves with vibrant CMYK printing and die-cut windows.", tag: "Retail", img: "/images/hero_boxes_1776242635107.png" },
    { title: "Pharma & Medicine Box", desc: "Compliant pharmaceutical folding cartons with accurate printing for dosage and safety labeling.", tag: "Pharma", img: "/images/cat_pharma_1776243439191.png" },
    { title: "Industrial Bulk Box", desc: "High-strength bulk cartons for warehousing and industrial product storage and transport.", tag: "Industrial", img: "/images/cat_shipping_1776242687272.png" },
  ];

  const [filter, setFilter] = useState("All");
  const tags = ["All", "Shipping", "Food", "Bottle", "Gift", "eCommerce", "Retail", "Pharma", "Industrial"];
  const filtered = filter === "All" ? products : products.filter(p => p.tag === filter);

  return (
    <div className="pt-20 bg-beige min-h-screen">
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-text/80 z-10" />
          <img src="/images/bg_minimal_1776243183461.png" className="w-full h-full object-cover" alt="Background" />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mx-auto relative z-20"
        >
          <span className="tag bg-white/20 text-white backdrop-blur-md border border-white/10 mb-4">Our Catalogue</span>
          <h1 className="font-display text-[clamp(32px,5vw,58px)] font-bold text-white tracking-tight mt-2 leading-tight">
            Our Products
          </h1>
          <p className="text-white/80 text-[17px] mt-4 max-w-lg mx-auto leading-relaxed">
            Explore our full range of carton box solutions — crafted to fit every industry and brand.
          </p>
        </motion.div>
      </section>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2.5 flex-wrap justify-center mb-12"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-5 py-2 rounded-full border-[1.5px] font-sans font-semibold text-[14px] cursor-pointer transition-all duration-200 ${
                  filter === tag
                    ? "border-brown bg-brown text-white shadow-md"
                    : "border-[#E0D5C8] bg-white text-text-muted hover:border-brown/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="card-hover bg-white rounded-2xl border border-[#E0D5C8] overflow-hidden flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-beige">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className="bg-[#F0E8DC] text-brown px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase">
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-text mb-2 leading-[1.35]">
                      {p.title}
                    </h3>
                    <p className="text-[13px] text-text-muted leading-relaxed mb-5 flex-1">
                      {p.desc}
                    </p>
                    <Link
                      to="/contact"
                      className="btn-primary py-2.5 px-4 text-[13px] w-full text-center"
                    >
                      Request Quote
                    </Link>
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
