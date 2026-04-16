import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Package, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Customization", path: "/customization" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(139,94,60,0.12)] border-b border-brown/10"
          : "bg-beige/80 backdrop-blur-xl border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-brown to-brown-light rounded-xl flex items-center justify-center">
            <Package className="text-white w-5 h-5" />
          </div>
          <span className="font-display text-xl font-bold text-text tracking-tight">
            SVK PACKAGING
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans font-medium text-[15px] pb-1 border-b-2 transition-all duration-200 ${
                  isActive
                    ? "text-brown border-brown"
                    : "text-text border-transparent hover:text-brown hover:border-brown"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <a href="https://wa.me/911234567890?text=Hello SVK PACKAGING, I would like to get a quote for packaging boxes." target="_blank" rel="noreferrer" className="btn-primary py-2.5 px-6 text-sm">
            Get Quote
          </a>
          <Link to="/cart" className="relative text-text hover:text-brown transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brown text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu & Cart */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative text-brown">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brown text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="p-2 text-brown"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-beige-deep px-6 pb-6 overflow-hidden"
          >
            <div className="flex flex-col pt-4">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block w-full py-3 text-base font-medium border-b border-beige font-sans ${
                      isActive ? "text-brown" : "text-text"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a
                href="https://wa.me/911234567890?text=Hello SVK PACKAGING, I would like to get a quote for packaging boxes."
                target="_blank" rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full text-center mt-5 py-3.5"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
