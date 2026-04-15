import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContact() {
  return (
    <>
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-7 right-7 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] transition-all duration-300"
      >
        <FaWhatsapp size={28} />
      </a>
      
      <a
        href="tel:+919876543210"
        className="fixed md:hidden bottom-7 left-7 z-50 w-14 h-14 bg-brown rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(139,94,60,0.4)] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      >
        <Phone size={24} />
      </a>
    </>
  );
}
