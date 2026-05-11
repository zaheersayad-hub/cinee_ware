import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, User, ShoppingCart, Star, PlayCircle } from 'lucide-react';
import { movieData } from '../data/movieData';

const DUMMY_PRODUCTS = [
  {
    id: "dp1",
    name: "Printed Shirt",
    subtitle: "Signature floral pattern",
    price: 1299,
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80",
    available: true
  },
  {
    id: "dp2",
    name: "White Pant",
    subtitle: "Classic cotton blend",
    price: 0,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80",
    available: false
  },
  {
    id: "dp3",
    name: "Leather Sandal",
    subtitle: "Handcrafted authentic",
    price: 899,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80",
    available: true
  },
  {
    id: "dp4",
    name: "Gold Accessories",
    subtitle: "Premium plated chain",
    price: 2499,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80",
    available: true
  }
];

const SCENE_THUMBNAILS = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=400&q=80"
];

export default function OutfitDetail({ movieId, characterType, onBack, onOpenProfile }) {
  const [localMovie, setLocalMovie] = useState(null);

  useEffect(() => {
    let sm = null;
    try { sm = JSON.parse(localStorage.getItem("selectedMovie") || "null"); } catch(e) {}
    const mv = sm || (Array.isArray(movieData) ? movieData.find(m => String(m.id) === String(movieId)) : movieData[movieId]);
    setLocalMovie(mv);
  }, [movieId]);

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
        character: characterType || "Character"
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
        character: characterType || "Character"
      });
    }
    localStorage.setItem('liked', JSON.stringify(current));
    setLiked(current);
    window.dispatchEvent(new Event('storage_update'));
  };

  const isInCart = (id) => cart.some(p => p.id === id);
  const isLiked = (id) => liked.some(p => p.id === id);

  const movieTitle = localMovie?.title || "Movie Title";
  const posterImg = localMovie?.poster || "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80";
  const charName = characterType ? `${characterType.charAt(0).toUpperCase()}${characterType.slice(1)}` : "Character Name";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen md:h-screen bg-[#0a0a0d] text-white flex flex-col font-sans overflow-x-hidden md:overflow-hidden relative selection:bg-[#D4AF37]/30 selection:text-white"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-[#D4AF37]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-50 z-0"></div>
      
      {/* Top Navbar */}
      <nav className="w-full px-6 md:px-12 py-5 flex items-center justify-between z-50 bg-[#0a0a0d]/80 backdrop-blur-xl border-b border-white/5 relative shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={onBack} 
          className="text-[#D4AF37] hover:text-white transition-all flex items-center space-x-2 group hover:-translate-x-1"
        >
          <div className="p-2 rounded-full border border-[#D4AF37]/30 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
             <ArrowLeft className="w-5 h-5" />
          </div>
        </button>
        
        <div className="text-2xl md:text-3xl font-cinzel font-bold text-[#D4AF37] tracking-[0.2em] uppercase text-glow">
          CineWear
        </div>
        
        <div className="flex items-center space-x-4">
          <button onClick={() => onOpenProfile('liked')} className="p-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:text-[#FDE047] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Heart className="w-5 h-5" />
          </button>
          <button onClick={() => onOpenProfile('cart')} className="p-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:text-[#FDE047] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] relative">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content Split Pane */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-[45%_55%] w-full h-auto md:h-full md:min-h-0 z-10 relative">
        
        {/* Left Panel: Cinematic Image */}
        <div className="w-full md:sticky md:top-0 h-auto md:h-[100vh] md:overflow-hidden p-0 md:p-6 flex flex-col relative z-10">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full h-auto md:h-full relative md:rounded-3xl md:overflow-hidden md:glass-card md:p-2 md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b md:border border-[#D4AF37]/20 group"
          >
            <div className="w-full h-[50vh] md:h-full md:rounded-2xl overflow-hidden relative">
              {/* Image */}
              <img 
                src={posterImg} 
                alt={movieTitle} 
                className="absolute inset-0 w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/40 md:via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0d]/30 to-transparent"></div>
              
              {/* Top Badge */}
              <div className="absolute top-6 left-6 bg-[#E5B109]/90 text-black px-3 py-1 rounded text-xs font-bold font-sans tracking-widest shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-black" /> 8.5
              </div>
            </div>
              
            {/* Bottom Content inside Image */}
            <div className="p-5 md:p-0 relative md:absolute md:bottom-4 md:left-4 md:right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-[#0a0a0d] md:bg-transparent -mt-6 md:mt-0 rounded-t-3xl md:rounded-none z-20">
              <h4 className="text-[#D4AF37] text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-1 drop-shadow-md">
                {movieTitle}
              </h4>
              <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {charName}
              </h1>
              <p className="text-gray-300 italic font-sans text-xs md:text-sm mb-4 border-l-2 border-[#D4AF37] pl-3 max-w-[80%]">
                "The iconic look that defined attitude and power."
              </p>
              
              {/* LOOK DETAILS block */}
              <div className="glassmorphism rounded-xl p-3 md:p-4 border border-white/10 backdrop-blur-md flex flex-wrap gap-y-2 md:gap-y-3 shadow-2xl bg-white/5 md:bg-transparent">
                <div className="w-1/2">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Movie</p>
                  <p className="text-[#D4AF37] font-semibold text-xs md:text-sm truncate">{movieTitle}</p>
                </div>
                <div className="w-1/2 pl-3 md:pl-4 border-l border-white/10">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Character</p>
                  <p className="text-white font-semibold text-xs md:text-sm capitalize">{charName}</p>
                </div>
                <div className="w-1/2">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Scene</p>
                  <p className="text-white font-semibold text-xs md:text-sm">Action Sequence</p>
                </div>
                <div className="w-1/2 pl-3 md:pl-4 border-l border-white/10">
                  <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Style</p>
                  <p className="text-[#D4AF37] font-semibold text-xs md:text-sm">Mass / Rustic</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Products & Details */}
        <div className="w-full h-auto md:h-[100vh] lg:h-full md:overflow-y-auto hide-scrollbar bg-[#121217]/50 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/5 relative">
          <div className="p-4 md:p-6 max-w-4xl mx-auto flex flex-col gap-4">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-xs md:text-sm font-sans tracking-[0.2em] font-bold text-[#D4AF37] uppercase">
                Outfit Items
              </h2>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-5">
              {DUMMY_PRODUCTS.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1), duration: 0.6 }}
                  className="bg-[#0a0a0d]/60 rounded-xl md:rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 overflow-hidden group hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col"
                >
                  <div className="w-full h-28 md:h-40 relative overflow-hidden bg-[#121217] p-2 md:p-3">
                    <div className="w-full h-full rounded-lg md:rounded-xl overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    {/* Heart Icon Top Right */}
                    <button 
                      onClick={() => toggleLike(product)}
                      className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors z-10"
                    >
                      <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isLiked(product.id) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white"}`} />
                    </button>
                  </div>
                  
                  <div className="p-3 md:p-5 flex flex-col flex-grow">
                    <div className="mb-2 md:mb-3 flex-grow">
                      <h3 className="text-xs md:text-lg font-outfit font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight truncate">{product.name}</h3>
                      <p className="text-[9px] md:text-xs text-gray-500 font-sans mt-0.5 md:mt-1 truncate">{product.subtitle}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs md:text-xl font-light text-gray-200">
                        {product.available ? `₹${product.price.toLocaleString()}` : <span className="text-[9px] md:text-xs text-red-400">Unavailable</span>}
                      </span>
                      {product.available && (
                        <button 
                          onClick={() => toggleCart(product)}
                          className={`text-[8px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg transition-all border ${
                            isInCart(product.id) 
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]' 
                              : 'bg-black border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                          }`}
                        >
                          {isInCart(product.id) ? 'Added' : 'Buy Now'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Seen in Scene Gallery (Moved to Right Panel) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="shrink-0 mt-2"
            >
              <h3 className="text-xs md:text-sm text-gray-400 font-sans tracking-[0.2em] uppercase mb-3 flex items-center">
                <span className="w-6 md:w-8 h-[1px] bg-gray-600 mr-3 md:mr-4"></span>
                Seen in Scene
              </h3>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x">
                {SCENE_THUMBNAILS.map((thumb, idx) => (
                  <div key={idx} className="min-w-[100px] md:min-w-[140px] h-16 md:h-20 rounded-xl overflow-hidden relative snap-center group border border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer">
                    <img src={thumb} alt={`Scene ${idx}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
