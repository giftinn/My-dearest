import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from './utils/soundEffects';
import WelcomePage from './pages/WelcomePage';
import MiniGamePage from './pages/MiniGamePage';
import PasswordPage from './pages/PasswordPage';
import ReasonsPage from './pages/ReasonsPage';
import SecretLetterPage from './pages/SecretLetterPage';

type Page = 'welcome' | 'game' | 'password' | 'reasons' | 'letter';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const startMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio('');
      audio.loop = true;
      audio.volume = 0.6;
      audio.preload = 'auto';
      audio.muted = false;
      audioRef.current = audio;
    }

    if (!musicStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setMusicStarted(true))
        .catch((err) => console.log('Audio error:', err));
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 0.95, y: -20 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    duration: 0.5
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return (
          <WelcomePage
            onNext={() => {
              soundEffects.pop();
              startMusic();
              setCurrentPage('game');
            }}
          />
        );

      case 'game':
        return (
          <MiniGamePage
            onNext={() => {
              soundEffects.pop();
              setCurrentPage('password');
            }}
          />
        );

      case 'password':
        return (
          <PasswordPage
            onNext={() => {
              soundEffects.pop();
              setCurrentPage('reasons');
            }}
          />
        );

      case 'reasons':
        return (
          <ReasonsPage
            onNext={() => {
              soundEffects.pop();
              setCurrentPage('letter');
            }}
          />
        );

      case 'letter':
        return (
          <SecretLetterPage
            onBackToStart={() => {
              soundEffects.pop();
              setCurrentPage('welcome');
            }}
          />
        );

      default:
        return <WelcomePage onNext={() => setCurrentPage('game')} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* MAIN BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100"></div>

      {/* IMAGE OVERLAY */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/custom-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* SOFT GLASS LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/40 to-white/30"></div>

      {/* FLOATING BLOBS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full max-w-2xl"
          >
            <div className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">
              {renderPage()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
