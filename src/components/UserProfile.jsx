import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Clock, Trash2 } from 'lucide-react';

export default function UserProfile({ isOpen, onClose, initialTab = 'liked' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  const safeParse = (key) => {
    try { return JSON.parse(localStorage.getItem(key) || "[]") || []; } catch(e) { return []; }
  };

  useEffect(() => {
    const loadData = () => {
      setLiked(safeParse("liked"));
      setCart(safeParse("cart"));
      setHistory(safeParse("history"));
    };
    
    if (isOpen) {
      loadData();
      setActiveTab(initialTab);
    }
    
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, [isOpen, initialTab]);

  const removeFromList = (listName, id, setter) => {
    let current = safeParse(listName) || [];
    current = current.filter(item => item.id !== id);
    localStorage.setItem(listName, JSON.stringify(current));
    setter(current);
    window.dispatchEvent(new Event('storage_update'));
  };

  const renderItem = (item, listName, setter, allowRemove = true) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      key={item.id} 
      className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-xl p-3 mb-3 group hover:bg-white/10 transition-colors shadow-lg"
    >
      <img src={item.poster} alt={item.title} className="w-16 h-24 object-cover rounded-md shadow-md bg-dark-800" />
      <div className="flex-1">
        <h4 className="text-white font-bold font-outfit line-clamp-2 text-sm">{item.title}</h4>
        {item.character && <p className="text-[#D4AF37] text-[10px] font-sans tracking-widest uppercase mt-1">{item.character}</p>}
        {item.price && <p className="text-gray-300 text-xs font-sans mt-1">₹{item.price.toLocaleString('en-IN')}</p>}
      </div>
      {allowRemove && (
        <button 
          onClick={() => removeFromList(listName, item.id, setter)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white/5 rounded-full hover:bg-white/10"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full glass-card border-none z-50 flex flex-col shadow-2xl border-l border-[#D4AF37]/20"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-dark-900/60">
              <h2 className="text-2xl font-bold font-outfit text-white">Guest <span className="text-[#D4AF37]">Profile</span></h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-white/10 bg-dark-900/40">
              <button onClick={() => setActiveTab('liked')} className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 border-b-2 transition-colors ${activeTab === 'liked' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-400 hover:text-white'}`}>
                <Heart className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Liked</span>
              </button>
              <button onClick={() => setActiveTab('cart')} className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 border-b-2 transition-colors ${activeTab === 'cart' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-400 hover:text-white'}`}>
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Cart</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex-1 py-4 flex flex-col items-center justify-center space-y-1 border-b-2 transition-colors ${activeTab === 'history' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-400 hover:text-white'}`}>
                <Clock className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-bold mt-1">History</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 hide-scrollbar bg-dark-900/50">
              {activeTab === 'liked' && (
                <div className="space-y-3">
                  {liked.length === 0 ? <p className="text-gray-500 text-sm font-sans italic">No liked items yet.</p> : liked.map(item => renderItem(item, 'liked', setLiked))}
                </div>
              )}
              {activeTab === 'cart' && (
                <div className="space-y-3">
                  {cart.length === 0 ? <p className="text-gray-500 text-sm font-sans italic">Your cart is empty.</p> : cart.map(item => renderItem(item, 'cart', setCart))}
                </div>
              )}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {history.length === 0 ? <p className="text-gray-500 text-sm font-sans italic">No history yet.</p> : history.map(item => renderItem(item, 'history', setHistory, false))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
