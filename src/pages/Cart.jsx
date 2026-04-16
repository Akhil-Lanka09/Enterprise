import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus, ArrowRight, Package } from "lucide-react";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "911234567890"; // Target WhatsApp number
    let message = "Hello SVK PACKAGING, I would like to place an order:%0A%0A";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title}%0A`;
      message += `   Qty: ${item.quantity} | Unit Price: ₹${item.price}%0A`;
      message += `   Total: ₹${(item.quantity * item.price).toFixed(2)}%0A%0A`;
    });
    
    message += `*Grand Total: ₹${getCartTotal().toFixed(2)}*%0A%0A`;
    message += "Please let me know the payment details and shipping timeline. Thank you!";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-beige flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-soft text-center max-w-md w-full mx-6 border border-[#E0D5C8]">
          <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={32} className="text-brown" />
          </div>
          <h2 className="font-display font-bold text-2xl text-text mb-4">Your Cart is Empty</h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Looks like you haven't added any packaging boxes to your cart yet.
          </p>
          <Link to="/products" className="btn-primary w-full">
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text mb-10">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-[#E0D5C8] text-xs font-bold text-text-muted uppercase tracking-wider px-2">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <motion.div layout className="space-y-4">
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4 rounded-xl border border-[#E0D5C8] flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 relative shadow-sm"
                >
                  {/* Delete Button Mobile */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-text-muted hover:text-red-500 transition-colors md:hidden"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Product Details */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-beige rounded-lg border border-[#E0D5C8] flex-shrink-0 p-2">
                      <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text text-[15px] max-w-[200px] leading-tight mb-1">
                        <Link to={`/products/${item.slug}`} className="hover:text-brown transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <div className="text-[13px] text-text-muted mb-2">₹{item.price.toFixed(2)}</div>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-beige px-2 py-1 flex w-max rounded-full text-brown">
                        {item.dimensions}
                      </span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 flex md:justify-center mt-2 md:mt-0">
                    <div className="flex border border-[#E0D5C8] rounded-md overflow-hidden bg-white max-w-[120px]">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-text hover:bg-beige transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-10 text-center text-text font-bold text-sm outline-none"
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-text hover:bg-beige transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Total & Delete Desktop */}
                  <div className="col-span-3 flex items-center justify-between md:justify-end gap-6 mt-2 md:mt-0">
                    <div className="font-bold text-text">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-muted hover:text-red-500 transition-colors hidden md:block"
                      title="Remove Item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-[#E0D5C8] shadow-sm sticky top-28">
              <h2 className="font-bold text-lg text-text mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-text-muted mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-text">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-brown font-medium">Calculated on WhatsApp</span>
                </div>
              </div>
              
              <div className="border-t border-[#E0D5C8] pt-4 mb-6 flex justify-between items-end">
                <span className="font-bold text-text text-base">Total</span>
                <div className="text-right">
                  <span className="font-display font-bold text-2xl text-brown">₹{getCartTotal().toFixed(2)}</span>
                  <div className="text-[11px] text-text-muted mt-0.5">INR (Excl. Shipping)</div>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
              >
                Checkout via WhatsApp <ArrowRight size={16} />
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted text-center">
                <Package size={14} /> Orders process within 3-5 business days.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
