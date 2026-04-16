import { Link } from "react-router-dom";
import { Package, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text text-white pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-brown to-brown-light rounded-xl flex items-center justify-center">
                <Package className="text-white w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                SVK PACKAGING
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Premium custom carton boxes for food, gifting, e-commerce, and industrial needs. Crafted with care. Delivered on time.
            </p>
            <div className="flex gap-3 mt-6">
              {["FB", "IG", "TW", "LI"].map((label, i) => (
                <div
                  key={i}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-brown text-white/80 hover:text-white transition-colors duration-200 text-xs font-bold"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-5 text-[#C4935A] tracking-wider uppercase">
              Pages
            </h4>
            <div className="flex flex-col gap-3">
              {[{name: "Home", path: "/"}, {name: "Products", path: "/products"}, {name: "Customization", path: "/customization"}, {name: "About", path: "/about"}, {name: "Contact", path: "/contact"}].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white/65 text-sm hover:text-white transition-colors duration-200 font-sans w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-5 text-[#C4935A] tracking-wider uppercase">
              Products
            </h4>
            <div className="flex flex-col gap-3">
              {["Shipping Boxes", "Food Boxes", "Gift Boxes", "Mailer Boxes", "Bottle Boxes"].map((p) => (
                <Link key={p} to="/products" className="text-white/65 text-sm hover:text-white w-fit transition-colors duration-200">{p}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-5 text-[#C4935A] tracking-wider uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: "+91 98765 43210" },
                { icon: Mail, text: "hello@svkpackaging.in" },
                { icon: MapPin, text: "Manufacturer in Viravalli, Andhra Pradesh" },
                { icon: Clock, text: "Mon–Sat, 9am–7pm" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center text-white/65 text-sm">
                  <item.icon size={16} className="text-[#C4935A]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} SVK PACKAGING. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
