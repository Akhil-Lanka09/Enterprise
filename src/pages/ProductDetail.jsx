import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { Check, Truck, ShieldCheck, ChevronRight, Minus, Plus } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [packSize, setPackSize] = useState(50);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setQuantity(1);
      if (foundProduct.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0]);
      } else {
        setSelectedVariant(null);
      }
    } else {
      navigate('/products');
    }
  }, [slug, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    const isProtection = product.tag === "Protection";
    let variantProduct;
    if (product.variants && selectedVariant) {
      variantProduct = {
        ...product,
        id: selectedVariant.id,
        title: `${product.title} - ${selectedVariant.title}`,
        price: selectedVariant.price,
        img: selectedVariant.img
      };
    } else {
      variantProduct = {
        ...product,
        id: isProtection ? product.id : `${product.id}-${packSize}`,
        title: isProtection ? product.title : `${product.title} (Pack of ${packSize})`,
        price: isProtection ? product.price : product.price * packSize,
      };
    }
    addToCart(variantProduct, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center text-[13px] text-text-muted font-sans">
          <Link to="/" className="hover:text-brown transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/products" className="hover:text-brown transition-colors">Catalog</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-text font-medium">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="w-full bg-beige rounded-2xl overflow-hidden aspect-square border border-[#E0D5C8] flex items-center justify-center p-8 relative">
              <span className="absolute top-4 left-4 bg-white text-brown px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {product.tag}
              </span>
              <img 
                src={selectedVariant ? selectedVariant.img : product.img} 
                alt={product.title} 
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>
            {/* Thumbnails placeholder (just reusing main image for demonstration) */}
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              <button className="w-20 h-20 bg-beige rounded-xl border-2 border-brown overflow-hidden flex-shrink-0">
                <img src={product.img} className="w-full h-full object-cover" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="font-display font-bold text-[32px] md:text-[40px] text-text leading-tight mb-2">
              {product.title}
            </h1>
            
            <div className="text-2xl font-bold text-brown mb-6">
              ₹{selectedVariant ? selectedVariant.price.toFixed(2) : (product.price * (product.tag === "Protection" ? 1 : packSize)).toFixed(2)} 
              <span className="text-sm text-text-muted font-normal">
                {!product.variants && (product.tag === "Protection" ? " / roll" : ` / pack of ${packSize}`)}
              </span>
            </div>

            <p className="text-[15px] text-text-muted leading-relaxed mb-8">
              {product.desc}
            </p>

            {/* Specification Bullets (Reference site style) */}
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E0D5C8] mb-8">
              <ul className="space-y-2 text-[14px] text-text font-medium">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brown mt-0.5" />
                  <span><strong>Size:</strong> {selectedVariant ? selectedVariant.dimensions : product.dimensions}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brown mt-0.5" />
                  <span><strong>Material:</strong> {product.material}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brown mt-0.5" />
                  <span><strong>Eco-Friendly:</strong> Recyclable and sustainable</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brown mt-0.5" />
                  <span><strong>Uses:</strong> {product.uses}</span>
                </li>
              </ul>
            </div>

            {/* Variant Selector for items with multiple options */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-text mb-3 uppercase tracking-wide">
                  Select Dimension
                </label>
                <div className="flex flex-col gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all flex justify-between items-center ${
                        selectedVariant?.id === variant.id 
                        ? 'border-brown bg-brown text-white shadow-md' 
                        : 'border-[#E0D5C8] bg-white text-text hover:border-brown/50'
                      }`}
                    >
                      <span>{variant.title}</span>
                      <span className={selectedVariant?.id === variant.id ? "text-beige" : "text-brown font-bold"}>
                        ₹{variant.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pack Size Selector */}
            {!product.variants && product.tag !== "Protection" && (
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-text mb-3 uppercase tracking-wide">
                  Pack Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {[50, 100, 200, 500].map(size => (
                    <button
                      key={size}
                      onClick={() => setPackSize(size)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${
                        packSize === size 
                        ? 'border-brown bg-brown text-white' 
                        : 'border-[#E0D5C8] bg-white text-text hover:border-brown/50'
                      }`}
                    >
                      {size} Boxes
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-text mb-2 uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex border border-[#E0D5C8] rounded-lg w-max overflow-hidden bg-white">
                <button 
                  onClick={decrementQty}
                  className="px-4 py-3 text-text hover:bg-beige transition-colors"
                >
                  <Minus size={18} />
                </button>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center text-text font-bold text-lg outline-none"
                />
                <button 
                  onClick={incrementQty}
                  className="px-4 py-3 text-text hover:bg-beige transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-1/2 py-4 rounded-xl border-2 border-brown text-brown font-bold text-[15px] tracking-wide hover:bg-beige transition-all"
                >
                  Add to cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-1/2 py-4 rounded-xl bg-brown text-white font-bold text-[15px] tracking-wide hover:bg-[#6B4423] transition-all shadow-md"
                >
                  Buy it now
                </button>
              </div>

              <a 
                href={`https://wa.me/911234567890?text=${encodeURIComponent(`I am interested in ${product.title}${selectedVariant ? ` - ${selectedVariant.title}` : (product.tag !== "Protection" ? ` (Pack of ${packSize})` : "")}`)}`}
                target="_blank" rel="noreferrer"
                className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-[15px] tracking-wide hover:bg-[#20bd5a] transition-all shadow-md flex items-center justify-center gap-2"
              >
                WhatsApp us
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 py-4 border-y border-[#E0D5C8] mb-8">
              <div className="flex items-center gap-2 text-[13px] text-text font-medium">
                <Truck size={18} className="text-brown" /> Pan India Shipping
              </div>
              <div className="flex items-center gap-2 text-[13px] text-text font-medium">
                <ShieldCheck size={18} className="text-brown" /> Quality Assured
              </div>
            </div>

            {/* Tabs for Details */}
            <div>
              <div className="flex border-b border-[#E0D5C8] mb-6">
                <button 
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 px-4 font-bold text-[14px] uppercase tracking-wide border-b-2 transition-colors ${activeTab === 'description' ? 'border-brown text-text' : 'border-transparent text-text-muted hover:text-text'}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-3 px-4 font-bold text-[14px] uppercase tracking-wide border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-brown text-text' : 'border-transparent text-text-muted hover:text-text'}`}
                >
                  Customer Reviews
                </button>
              </div>

              <div className="text-[15px] text-text-muted leading-relaxed">
                {activeTab === "description" ? (
                  <p>{product.longDesc}</p>
                ) : (
                  <div>
                    <h3 className="font-bold text-text mb-4 text-sm uppercase">Reviews</h3>
                    <div className="bg-[#FAF7F2] p-4 rounded-lg mb-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-text">Rajesh Kumar</div>
                        <div className="text-brown text-sm">★★★★★</div>
                      </div>
                      <p className="text-sm">Excellent quality boxes. The {product.title} arrived on time and the corrugated board is very strong.</p>
                    </div>
                    <div className="bg-[#FAF7F2] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-text">Priya Sharma</div>
                        <div className="text-brown text-sm">★★★★★</div>
                      </div>
                      <p className="text-sm">Good packaging and perfectly as described dimensions ({product.dimensions}). Will order again.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
