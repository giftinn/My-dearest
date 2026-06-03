import React from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNext }) => {
  return (
    <div className="text-center space-y-8 sm:space-y-12 px-4">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8, delay: 0.2, bounce: 0.4 }}
        className="space-y-6"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 leading-tight"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% auto',
            textShadow: '0 4px 20px rgba(37, 99, 235, 0.3)'
          }}
        >
          Helloo
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-700 font-medium">
            Happy Birthday, Febri!
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-8"
      >
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-blue-600 font-medium px-4"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          I made this special for you. Play a little game to unlock your surprises
        </motion.p>

        {/* Enhanced button with modern styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
        >
          <motion.button
            onClick={onNext}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-2xl overflow-hidden text-base sm:text-lg md:text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundSize: '200% auto'
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'linear'
              }}
            />
            
            {/* Button text */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Game
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 30px rgba(37, 99, 235, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;




