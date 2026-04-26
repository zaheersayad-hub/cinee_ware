import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShoppingCart, Heart } from 'lucide-react';
import { movieData } from '../data/movieData';

export default function StyleVault({ movieId, characterType, onBack, onOpenProfile }) {
  const localMovie = Array.isArray(movieData) ? movieData.find(m => String(m.id) === String(movieId)) : movieData[movieId];

  const defaultTheme = {
    text: "text-[#D4AF37]", textLight: "text-[#FDE047]", bg: "bg-[#D4AF37]", bgLight: "bg-[#D4AF37]/20",
    border: "border-[#D4AF37]", borderLight: "border-[#D4AF37]/30", borderHover: "hover:border-[#D4AF37]/60",
    groupHoverText: "group-hover:text-[#FDE047]", blurBg: "bg-[#D4AF37]/20", gradient: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
    glowBox: "shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]"
  };

  const character = localMovie && localMovie.characters && localMovie.characters[characterType] ? localMovie.characters[characterType] : {
    name: "Unknown Character",
    scene: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80",
    products: []
  };
  
  const movieTheme = localMovie && localMovie.theme ? localMovie.theme : defaultTheme;
  const [dynamicTitle] = useState(localMovie ? localMovie.title : "Vault Theme");

  const safeParse = (key) => {
    try { return JSON.parse(localStorage.getItem(key) || "[]") || []; } catch(e) { return []; }
  };

  const [cart, setCart] = useState(() => safeParse("cart"));
  const [liked, setLiked] = useState(() => safeParse("liked"));

  useEffect(() => {
    const updateData = () => {
      setCart(safeParse("cart"));
      setLiked(safeParse("liked"));
    };
    window.addEventListener('storage_update', updateData);
    return () => window.removeEventListener('storage_update', updateData);
  }, []);

  const toggleCart = (product) => {
    let current = safeParse("cart") || [];
    if (current.find(p => p.id === product.id)) {
      current = current.filter(p => p.id !== product.id);
    } else {
      current.push({
        id: product.id,
        title: product.name,
        price: product.price,
        poster: product.image,
        character: character.name
      });
    }
    localStorage.setItem('cart', JSON.stringify(current));
    setCart(current);
    window.dispatchEvent(new Event('storage_update'));
  };

  const toggleLike = (product) => {
    let current = safeParse("liked") || [];
    if (current.find(p => p.id === product.id)) {
      current = current.filter(p => p.id !== product.id);
    } else {
      current.push({
        id: product.id,
        title: product.name,
        price: product.price,
        poster: product.image,
        character: character.name
      });
    }
    localStorage.setItem('liked', JSON.stringify(current));
    setLiked(current);
    window.dispatchEvent(new Event('storage_update'));
  };

  const isInCart = (id) => cart.some(p => p.id === id);
  const isLiked = (id) => liked.some(p => p.id === id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen flex flex-col md:flex-row overflow-hidden transition-colors duration-1000 ${movieTheme.gradient}`}
    >
      {/* LEFT: Full Screen Movie Scene */}
      <motion.div 
        className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-r from-dark-900/90 via-dark-900/40 md:via-dark-900/20 to-transparent pointer-events-none" />
        
        {/* Subtle ken-burns scale effect */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src={character.scene} 
          alt={character.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/70 hover:text-white glass-card px-5 py-2.5 rounded-full transition-all group hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-xs font-bold font-sans">Return</span>
        </button>

        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20">
           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
           >
             <h4 className={`${movieTheme.text} uppercase tracking-[0.3em] text-sm mb-2 font-bold font-sans`}>{dynamicTitle}</h4>
             <h1 className="text-5xl md:text-7xl font-bold text-white text-glow capitalize font-outfit tracking-tight">{character.name}</h1>
           </motion.div>
        </div>
      </motion.div>

      {/* RIGHT: Product Card List */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen overflow-y-auto hide-scrollbar relative bg-dark-900/40 backdrop-blur-3xl border-l border-white/5 shadow-2xl">
        <div className={`absolute top-0 right-0 w-[60%] h-[60%] ${movieTheme.blurBg} rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-60`} />
        
        <div className="p-8 md:p-12 lg:p-16 relative z-10">
          <div className="flex items-center justify-between mb-12">
             <h2 className={`text-3xl font-light text-white font-outfit`}>
                The Vault <span className="font-bold">Collection</span>
             </h2>
             <button onClick={() => onOpenProfile('cart')} className="glassmorphism p-3.5 rounded-full relative shadow-lg hover:bg-white/10 transition-colors cursor-pointer">
                <ShoppingCart className="w-5 h-5 text-gray-300" />
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 ${movieTheme.bg} text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg`}
                  >
                    {cart.length}
                  </motion.span>
                )}
             </button>
          </div>

          <div className="space-y-6">
            {character.products.length === 0 ? (
              <p className="text-gray-500 italic font-sans">No exclusive items currently available in this vault.</p>
            ) : (
              character.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className={`glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row group border border-white/5 ${movieTheme?.borderHover || "default"} ${movieTheme?.glowBox || ""} transition-all duration-300 bg-dark-800/50`}
                >
                  <div className="w-full sm:w-56 h-56 sm:h-auto relative overflow-hidden shrink-0 bg-dark-800 p-2">
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 ${movieTheme?.groupHoverText || ""} transition-colors font-outfit`}>{product.name}</h3>
                      <p className="text-2xl font-light text-gray-300 mb-6 font-sans">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-auto">
                      <button 
                        onClick={() => toggleCart(product)}
                        className={`flex-1 py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 font-semibold uppercase text-sm tracking-wider shadow-lg hover:-translate-y-0.5 transition-all ${
                          isInCart(product.id) ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-white text-black hover:bg-gray-200'
                        }`}
                      >
                        <span>{isInCart(product.id) ? 'In Cart' : 'Add to Cart'}</span>
                        <ShoppingCart className="w-4 h-4 ml-1" />
                      </button>
                      <button 
                        onClick={() => toggleLike(product)}
                        className={`p-3.5 rounded-xl border transition-all shadow-lg hover:-translate-y-0.5 ${
                          isLiked(product.id) 
                            ? `${movieTheme?.border || "border-[#D4AF37]"} ${movieTheme?.bgLight || "bg-[#D4AF37]/20"} ${movieTheme?.text || "text-[#D4AF37]"}` 
                            : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                        }`}
                        title={isLiked(product.id) ? "Unlike" : "Like"}
                      >
                        <Heart className="w-5 h-5 drop-shadow-md" fill={isLiked(product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
