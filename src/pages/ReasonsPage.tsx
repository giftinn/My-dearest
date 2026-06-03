import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

interface ReasonsPageProps {
  onNext: () => void;
}

interface Reason {
  id: number;
  title: string;
  text: string;
  isRevealed: boolean;
}

const ReasonsPage: React.FC<ReasonsPageProps> = ({ onNext }) => {
  const [reasons, setReasons] = useState<Reason[]>([
    {
      id: 1,
      title: 'I wish.. ',
      text: 'I wish, semua hal yang akan atau sedang kamu lakuin dipermudah',
      isRevealed: false
    },
    {
      id: 2,
      title: 'I wish..',
      text: 'I wish, kamu selalu dikeliling hal-hal baik dan dijauhkan dari segala yang buruk',
      isRevealed: false
    },
    {
      id: 3,
      title: 'I wish..',
      text: ' I wish, kamu makin sayang sama aku. Makin sabar sama sikap dan tingkah aku dan makin dewasa',
      isRevealed: false
    },
    {
      id: 4,
      title: 'I wish..',
      text: 'Aku harap kamu selalu bahagia, entah dengan cara apapun baik sama aku atau pun gak sama aku',
      isRevealed: false
    },
    {
      id: 5,
      title: 'I wish..',
      text: 'Dan aku sangat berharap kamu selalu dikasih kekuatan buat ngehadapin segala ujian yang akan datang atau sedang kamu hadapi',
      isRevealed: false
    }
  ]);

  const handleHeartClick = (id: number) => {
    if (reasons.find(r => r.id === id)?.isRevealed) return;

    soundEffects.ding();
    setReasons(prev => 
      prev.map(reason => 
        reason.id === id ? { ...reason, isRevealed: true } : reason
      )
    );
  };

  const allRevealed = reasons.every(r => r.isRevealed);

  return (
    <div className="text-center space-y-4 sm:space-y-6 px-4">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text leading-relaxed">
          My wish for You
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-blue-600 font-medium">
          Tap each heart to reveal my wishes.
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                reason.isRevealed
                  ? 'bg-gradient-to-r from-blue-100 to-sky-100 border-blue-300 shadow-lg card-depth-2'
                  : 'bg-white/80 border-blue-200 hover:border-blue-400 backdrop-blur-sm shadow-md hover:shadow-xl hover:bg-white/90'
              }`}
              whileHover={!reason.isRevealed ? { scale: 1.03, y: -2 } : {}}
              onClick={() => !reason.isRevealed && handleHeartClick(reason.id)}
            >
              <div className="flex items-center space-x-3">

                <motion.div
                  className="text-xl sm:text-2xl cursor-pointer"
                  whileHover={!reason.isRevealed ? { scale: 1.2 } : {}}
                  whileTap={!reason.isRevealed ? { scale: 0.9 } : {}}
                  animate={reason.isRevealed ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    viewBox="0 0 24 24"
                    fill={reason.isRevealed ? "#3b82f6" : "none"}
                    stroke="#3b82f6"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </motion.div>
                
                <div className="flex-1 text-left">
                  <motion.h3
                    className="text-sm sm:text-base font-semibold text-blue-800"
                    animate={reason.isRevealed ? { opacity: [0, 1] } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    {reason.title}
                  </motion.h3>
                  
                  <AnimatePresence>
                    {reason.isRevealed && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-blue-700 text-xs sm:text-sm mt-1"
                      >
                        {reason.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {!allRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
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
      )}

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="pt-4"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(59,130,246,0.3)',
                  '0 0 40px rgba(59,130,246,0.5)',
                  '0 0 20px rgba(59,130,246,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.button
                onClick={onNext}
                className="px-8 py-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Your Letter
              </motion.button>
            </motion.div>
            
            <motion.div
              className="mt-4 text-blue-500 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              One final surprise awaits...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReasonsPage;







