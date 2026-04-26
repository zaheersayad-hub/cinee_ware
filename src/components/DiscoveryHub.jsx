import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Search, User, Heart } from 'lucide-react';
import { movieData } from '../data/movieData';

const defaultTheme = {
  text: "text-[#D4AF37]", textLight: "text-[#FDE047]", bg: "bg-[#D4AF37]", bgLight: "bg-[#D4AF37]/20",
  border: "border-[#D4AF37]", borderLight: "border-[#D4AF37]/30", borderHover: "hover:border-[#D4AF37]/60",
  groupHoverText: "group-hover:text-[#FDE047]", blurBg: "bg-[#D4AF37]/20", gradient: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
  glowBox: "shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]"
};

const allMovies = (Array.isArray(movieData) ? movieData : Object.values(movieData))
  .filter(m => m.type === "movie")
  .map(m => ({ ...m, theme: m.theme || defaultTheme }));

export default function DiscoveryHub({ onSelectMovie, onExit, onOpenProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(allMovies);
  const [historyMovies, setHistoryMovies] = useState([]);
  const safeParse = (key) => {
    try { return JSON.parse(localStorage.getItem(key) || "[]") || []; } catch(e) { return []; }
  };

  const [liked, setLiked] = useState(() => safeParse("liked"));

  useEffect(() => {
    const updateData = () => {
      setHistoryMovies(safeParse("history"));
      setLiked(safeParse("liked"));
    };
    updateData(); // initial load
    window.addEventListener('storage_update', updateData);
    return () => window.removeEventListener('storage_update', updateData);
  }, []);

  const toggleLike = (e, movie) => {
    e.stopPropagation();
    let current = safeParse("liked") || [];
    if (current.find(m => m.id === movie.id)) {
      current = current.filter(m => m.id !== movie.id);
    } else {
      current.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        character: null
      });
    }
    localStorage.setItem('liked', JSON.stringify(current));
    setLiked(current);
    window.dispatchEvent(new Event('storage_update'));
  };

  const isLiked = (id) => liked.some(m => m.id === id);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length === 0) {
      setMovies(allMovies);
    } else {
      const filtered = allMovies.filter(m => m.title.toLowerCase().includes(query));
      setMovies(filtered);
    }
  }, [searchQuery]);

  const renderMovieCard = (movie, index, isHorizontal = false) => {
    if (!movie) return null;
    const safeTheme = movie.theme || {
      text: "text-[#D4AF37]",
      textLight: "text-[#FDE047]",
      bg: "bg-[#D4AF37]",
      bgLight: "bg-[#D4AF37]/20",
      border: "border-[#D4AF37]",
      borderLight: "border-[#D4AF37]/30",
      borderHover: "hover:border-[#D4AF37]/60",
      groupHoverText: "group-hover:text-[#FDE047]",
      blurBg: "bg-[#D4AF37]/20",
      gradient: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
      glowBox: "shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]"
    };

    return (
      <motion.div
        key={`${movie.id}-${index}`}
        className={`relative ${isHorizontal ? 'w-44 md:w-56 shrink-0' : 'w-full'} aspect-[2/3] cursor-pointer rounded-2xl overflow-hidden glass-card group transition-colors duration-500`}
        style={{ border: "none" }}
        whileHover={{ scale: 1.04, y: -8 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          localStorage.setItem("selectedMovie", JSON.stringify(movie));
          onSelectMovie(movie.id, movie);
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
      <img 
        src={movie.poster} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
        onError={(e) => { e.target.src = "https://placehold.co/500x750/1a1a1a/D4AF37?text=Image+Unavailable" }}
      />
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => toggleLike(e, movie)}
          className={`p-2 rounded-full backdrop-blur-md transition-all ${isLiked(movie.id) ? 'bg-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'bg-black/50 text-white/70 hover:bg-black/80 hover:text-white'}`}
        >
          <Heart className="w-5 h-5" fill={isLiked(movie.id) ? "currentColor" : "none"} />
        </button>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />
      
      <div className={`absolute inset-0 bg-gradient-to-t ${safeTheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

      <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-10 transition-transform duration-500">
         <h3 className="text-base md:text-xl font-bold text-white group-hover:text-glow transition-all mb-1 font-cinzel leading-tight">{movie.title}</h3>
         {movie.year && (
           <p className="text-[10px] md:text-xs text-gray-300 font-sans mb-2 truncate group-hover:text-white transition-colors">
             {movie.year}
           </p>
         )}
         <div className={`w-8 h-1 flex ${safeTheme.bg} rounded-full scale-x-50 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
      </div>
    </motion.div>
  );
};

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen flex flex-col relative transition-all duration-1000 ${movies.length > 0 && movies[0]?.theme?.gradient ? movies[0].theme.gradient : 'bg-dark-900'}`}
    >
      <div 
        className={`absolute inset-0 z-0 bg-dark-900/80 backdrop-blur-3xl pointer-events-none`} 
      />
      
      <div 
        className={`absolute top-0 right-[-10%] w-[50%] h-[50%] rounded-full blur-[180px] mix-blend-screen pointer-events-none transition-colors duration-1000 ${movies.length > 0 && movies[0]?.theme?.blurBg ? movies[0].theme.blurBg : 'bg-[#D4AF37]/10'}`} 
      />

      <div 
        className={`absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[150px] mix-blend-screen pointer-events-none transition-colors duration-1000 ${movies.length > 0 && movies[0]?.theme?.blurBg ? movies[0].theme.blurBg : 'bg-[#D4AF37]/10'}`} 
      />

      <nav className="flex items-center justify-between px-4 py-3 md:px-8 md:py-6 z-10 glass-card mx-4 mt-3 md:mx-8 md:mt-6 rounded-3xl border-t border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(212,175,55,0.1)]">
         <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">
           CINE<span className={`transition-colors duration-500 text-glow ${movies.length > 0 && movies[0]?.theme?.text ? movies[0].theme.text : 'text-[#D4AF37]'}`}>WEAR</span>
         </h1>
         
         <div className={`hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2.5 w-1/3 focus-within:border-white/40 transition-colors shadow-inner`}>
            <Search className={`w-4 h-4 mr-3 transition-colors duration-500 text-[#FDE047]`} />
            <input 
              type="text"
              placeholder="Search cinematic vaults or characters..."
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-400 font-sans tracking-wide"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>

         <div className="flex items-center space-x-3">
           <button 
             onClick={() => onOpenProfile('liked')}
             className="hidden md:flex items-center justify-center p-2.5 text-gray-300 hover:text-white transition-colors group bg-white/5 rounded-full hover:bg-white/10 border border-white/5"
           >
             <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
           </button>
           <button 
             onClick={onExit}
             className="flex items-center space-x-1 md:space-x-2 text-gray-300 hover:text-white transition-colors uppercase text-xs md:text-sm tracking-wider font-semibold group bg-white/5 px-3 md:px-4 py-2 rounded-full hover:bg-white/10 border border-white/5 whitespace-nowrap"
           >
             <span>Sign Out</span>
             <LogOut className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
           </button>
         </div>
      </nav>

      <div className="md:hidden px-4 mt-3 z-10">
         <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 w-full focus-within:border-white/30 transition-colors shadow-inner">
            <Search className="w-4 h-4 text-[#FDE047] mr-2" />
            <input 
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-500 font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
      </div>

      <div className="flex-grow flex flex-col px-8 pb-12 pt-8 relative overflow-hidden z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-2 text-white">Discover Vaults</h2>
          <p className="text-gray-400 mb-8 max-w-md font-sans">Explore premium wardrobe collections from iconic cinematic universes.</p>
        </motion.div>

        <div className="relative w-full h-full overflow-y-auto hide-scrollbar pr-2 pb-24 flex flex-col">
          {movies.length === 0 ? (
            <div className="text-gray-500 text-lg py-12">No movies found.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10 place-items-center w-full mx-auto max-w-[1800px]">
              {movies?.map((movie, index) => {
                if (!movie) return null;
                return renderMovieCard(movie, index, false);
              })}
            </div>
          )}

          {/* History Section below movies */}
          {historyMovies.length > 0 && !searchQuery.trim() && (
             <div className="w-full mt-12 mb-8 border-t border-white/10 pt-8">
               <h3 className="text-2xl font-light text-white mb-6 font-outfit">Recently Viewed</h3>
               <div className="flex space-x-6 overflow-x-auto hide-scrollbar pb-4 pr-4">
                  {historyMovies?.map((movie, index) => {
                    if (!movie) return null;
                    return renderMovieCard(movie, index, true);
                  })}
               </div>
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
