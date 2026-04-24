import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, KeyRound } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('Zaheer Sayyad');
  const [password, setPassword] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/20 rounded-full blur-[120px] mix-blend-screen" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 rounded-full blur-[150px] mix-blend-screen" />
          </div>

          <motion.div 
            className="z-10 relative glass-card p-10 rounded-2xl w-[90%] max-w-md border border-white/10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          >
            <div className="flex justify-center mb-8">
               <motion.div 
                 initial={{ rotate: -90 }}
                 animate={{ rotate: 0 }}
                 transition={{ duration: 1, type: "spring" }}
                 className="p-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-black/20 glassmorphism"
               >
                 <Lock className="w-8 h-8 text-[#D4AF37]" />
               </motion.div>
            </div>
            
            <h1 className="text-4xl font-light text-center mb-2 tracking-wide text-white font-cinzel">CINE<span className="font-bold text-[#D4AF37] text-glow">WEAR</span></h1>
            <p className="text-center text-xs text-gray-400 mb-8 uppercase tracking-[0.3em] font-sans">Premium Access Gateway</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm transition-all"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm transition-all"
                  placeholder="Secret Access Key"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-black bg-gradient-to-r from-[#D4AF37] to-[#B4952F] hover:from-[#E3C25D] hover:to-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all uppercase tracking-widest mt-4"
              >
                Authorize
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
