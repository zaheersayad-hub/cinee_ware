import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import DiscoveryHub from './components/DiscoveryHub';
import CharacterSelection from './components/CharacterSelection';
import OutfitDetail from './components/OutfitDetail';
import UserProfile from './components/UserProfile';

function App() {
  React.useEffect(() => {
    try {
      if (!localStorage.getItem("liked")) {
        localStorage.setItem("liked", JSON.stringify([]));
      }

      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }

      if (!localStorage.getItem("history")) {
        localStorage.setItem("history", JSON.stringify([]));
      }
    } catch (e) {
      console.log("localStorage not available");
    }
  }, []);
  const [currentPhase, setCurrentPhase] = useState('LOGIN');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedCharacterType, setSelectedCharacterType] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileTab, setProfileTab] = useState('liked');

  const openProfile = (tab = 'liked') => {
    setProfileTab(tab);
    setIsProfileOpen(true);
  };

  const handleLogin = () => {
    setCurrentPhase('DISCOVERY');
  };

  const handleSelectMovie = (id, movie) => {
    setSelectedMovieId(id);
    setCurrentPhase('CHARACTERS');
    
    // Save to history using full object format
    if (movie) {
      let history = [];
      try {
        history = JSON.parse(localStorage.getItem("history") || "[]");
      } catch (e) {
        history = [];
      }
      history = (history || []).filter(item => String(item.id) !== String(id));
      history.unshift({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        character: null
      });
      if (history.length > 10) history = history.slice(0, 10);
      localStorage.setItem('history', JSON.stringify(history));
      window.dispatchEvent(new Event('storage_update'));
    }
  };

  const handleSelectCharacter = (type) => {
    setSelectedCharacterType(type);
    setCurrentPhase('VAULT');
  };

  const handleBackToDiscovery = () => {
    setCurrentPhase('DISCOVERY');
    setSelectedMovieId(null);
  };

  const handleBackToCharacters = () => {
    setCurrentPhase('CHARACTERS');
    setSelectedCharacterType(null);
  };

  const handleExit = () => {
    setCurrentPhase('LOGIN');
    setSelectedMovieId(null);
    setSelectedCharacterType(null);
    // clear local storage as well for full reset if needed, but not strictly asked
  };

  return (
    <div className="bg-dark-900 min-h-screen font-sans text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPhase === 'LOGIN' && (
          <Login key="login" onLogin={handleLogin} />
        )}
        
        {currentPhase === 'DISCOVERY' && (
          <DiscoveryHub 
            key="discovery" 
            onSelectMovie={handleSelectMovie} 
            onExit={handleExit} 
            onOpenProfile={openProfile}
          />
        )}

        {currentPhase === 'CHARACTERS' && selectedMovieId && (
          <CharacterSelection 
            key="characters" 
            movieId={selectedMovieId} 
            onSelectCharacter={handleSelectCharacter} 
            onBack={handleBackToDiscovery}
            onOpenProfile={openProfile}
          />
        )}

        {currentPhase === 'VAULT' && selectedMovieId && selectedCharacterType && (
          <OutfitDetail 
            key="vault" 
            movieId={selectedMovieId} 
            characterType={selectedCharacterType} 
            onBack={handleBackToCharacters}
            onOpenProfile={openProfile}
          />
        )}
      </AnimatePresence>

      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        initialTab={profileTab} 
      />
    </div>
  );
}

export default App;
