import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { movieData } from '../data/movieData';

export default function CharacterSelection({ movieId, onSelectCharacter, onBack, onOpenProfile }) {
  let selectedMovie = null;
  try {
    selectedMovie = JSON.parse(localStorage.getItem("selectedMovie") || "null");
  } catch (e) {
    selectedMovie = null;
  }

  const localMovie = selectedMovie || (Array.isArray(movieData) ? movieData.find(m => String(m.id) === String(movieId)) : movieData[movieId]);

  if (!localMovie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white p-4">
        <p className="text-xl mb-4 text-gray-300 font-sans tracking-wide">Movie data not found.</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors border border-white/20"
        >
          Go Back
        </button>
      </div>
    );
  }

  const defaultTheme = {
    text: "text-[#D4AF37]", textLight: "text-[#FDE047]", bg: "bg-[#D4AF37]", bgLight: "bg-[#D4AF37]/20",
    border: "border-[#D4AF37]", borderLight: "border-[#D4AF37]/30", borderHover: "hover:border-[#D4AF37]/60",
    groupHoverText: "group-hover:text-[#FDE047]", blurBg: "bg-[#D4AF37]/20", gradient: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
    glowBox: "hover:shadow-[0_0_30px_rgba(212,175,55,0.8)]"
  };

  const characters = [
    { type: "hero", name: "Leading Role" },
    { type: "heroine", name: "Leading Lady" },
    { type: "villain", name: "Antagonist" },
    { type: "others", name: "Supporting Cast" }
  ];

  const movieTheme = localMovie?.theme ? localMovie.theme : defaultTheme;

  const [dynamicPoster] = useState(localMovie?.poster || "");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const getIcon = (type) => {
    const iconClass = "w-16 h-16 text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,1)] filter group-hover:brightness-125 mx-auto";
    const strokeWidth = "1.25";

    switch(type) {
      case 'hero':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
            {/* Crown + Male face outline */}
            <path d="M6 10l1.5-6 4.5 4 4.5-4 1.5 6z" />
            <circle cx="12" cy="13" r="3" />
            <path d="M7 22v-2a5 5 0 0 1 10 0v2" />
          </svg>
        );
      case 'heroine':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
            {/* Female face/silhouette outline */}
            <circle cx="12" cy="9" r="4" />
            <path d="M6 22v-2a6 6 0 0 1 12 0v2" />
            <path d="M8 9a4 4 0 0 0-4 4v4" />
            <path d="M16 9a4 4 0 0 1 4 4v4" />
          </svg>
        );
      case 'villain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
            {/* Mask / Devil face */}
            <path d="M12 21c-5 0-8-3-8-8v-3c0-3 3-5 5-5 1.5 0 3 1 3 2 0-1 1.5-2 3-2 2 0 5 2 5 5v3c0 5-3 8-8 8z" />
            <circle cx="9" cy="11" r="1.5" />
            <circle cx="15" cy="11" r="1.5" />
            <path d="M12 16v3" />
          </svg>
        );
      case 'others':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
            {/* Group of people icon */}
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden transition-colors duration-1000 ${movieTheme.gradient}`}
    >
      {/* Full screen background using backgroundImage as requested */}
      {localMovie?.poster && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${localMovie.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* rgba(0,0,0,0.7) dark overlay exactly as requested */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
        </div>
      )}
      
      {/* Background glow effects */}
      <div className={`absolute top-0 right-0 w-[60%] h-[70%] ${movieTheme.blurBg} rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0 opacity-20`} />
      <div className={`absolute bottom-0 left-0 w-[50%] h-[50%] ${movieTheme.blurBg} rounded-full blur-[200px] mix-blend-screen pointer-events-none z-0 opacity-10`} />

      <div className="z-10 relative flex-grow flex flex-col max-w-7xl mx-auto w-full">
        <button 
          onClick={onBack}
          className="self-start flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6 md:mb-8 group bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg relative z-20"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-sm font-semibold font-sans">Back</span>
        </button>

        <div className="text-center mb-8 md:mb-12 mt-2 z-10 relative">
          <p className={`uppercase tracking-[0.4em] text-xs md:text-sm font-semibold text-[#D4AF37] mb-3 font-sans`}>Select Subject</p>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-4xl md:text-6xl font-bold mb-4 font-outfit text-white uppercase tracking-wide drop-shadow-2xl`}
          >
            Choose a Character
          </motion.h2>
          <p className="text-gray-400 text-sm md:text-base font-sans tracking-[0.1em] md:tracking-[0.2em] uppercase">Pick a character to explore costumes</p>
        </div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mx-auto w-full max-w-6xl mt-auto mb-auto relative z-10"
          style={{ display: 'grid' }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {characters.map((char) => {
            const charImage = localMovie?.characters?.[char.type]?.scene;
            
            return (
              <motion.div
                key={char.type}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  localStorage.setItem('cinewear_selected_character', JSON.stringify({ movieId, character: char.type }));
                  onSelectCharacter(char.type);
                }}
                className={`w-full relative aspect-[2/3] cursor-pointer group flex flex-col justify-end overflow-hidden border border-white/10 transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] shadow-2xl`}
                style={{ borderRadius: '16px', backgroundColor: charImage ? 'transparent' : '#1a1a1a' }}
              >
                {/* Full Card Background Image — falls back to dark background (no icon) */}
                {charImage && (
                  <img 
                    src={charImage} 
                    alt={char.name}
                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                )}
                
                {/* Center Image Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-transform duration-700">
                  {getIcon(char.type)}
                </div>
                
                {/* Bottom dark gradient overlay explicitly for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-10 p-5 md:p-6 flex flex-col items-start translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 capitalize font-outfit drop-shadow-lg">{char.name}</h3>
                  <span className="text-xs md:text-sm font-semibold text-[#D4AF37] uppercase tracking-[0.15em] font-sans drop-shadow-md">{char.type}</span>
                  
                  {/* Subtle access indicator */}
                  <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 relative z-20">
                    <span className="text-[10px] md:text-xs text-white/90 uppercase tracking-widest font-semibold">Access Vault</span>
                    <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 text-[#D4AF37] -rotate-180" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

