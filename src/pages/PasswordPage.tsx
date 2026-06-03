import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

interface PasswordPageProps {
  onNext: () => void;
}

const PasswordPage: React.FC<PasswordPageProps> = ({ onNext }) => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const correctPassword = '100126';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      soundEffects.ding();
      setShowError(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      soundEffects.boop();
      setShowError(true);
      setShowSuccess(false);
      
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (showError) setShowError(false);
  };

  return (
    <div className="text-center space-y-6 sm:space-y-8 px-4">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text leading-relaxed">
          You know what the password is???
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-blue-600 font-medium">
          Hint; Tanggal dimana aku pertama kali chat kamu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            value={password}
            onChange={handleInputChange}
            placeholder="DDMMYY"
            maxLength={8}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-center text-lg sm:text-xl font-semibold border-2 border-blue-300 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-blue-50/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-300/50 transition-all duration-300 overflow-hidden relative group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ backgroundSize: '200% auto' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative z-10">Submit</span>
        </motion.button>
      </form>

      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-blue-600 font-semibold text-lg"
          >
            You don't know what the password is!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-sky-400 rounded-full" />
            </motion.div>
            <div className="text-blue-700 font-semibold">Perfect! You know!!</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <motion.button
          onClick={onNext}
          className="text-sm text-blue-500 hover:text-blue-700 underline transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip →
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <div className="flex justify-center space-x-3 mt-6">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="opacity-60"
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
          >
            {index === 0 && <div className="w-4 h-4 bg-blue-400 rounded-full" />}
            {index === 1 && <div className="w-3 h-3 bg-sky-400 rounded-sm rotate-45" />}
            {index === 2 && <div className="w-4 h-4 border-2 border-blue-400 rounded-full" />}
            {index === 3 && <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-sky-400 rounded-lg" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PasswordPage;





