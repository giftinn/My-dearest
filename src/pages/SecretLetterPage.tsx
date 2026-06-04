import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretLetterPageProps {
  onBackToStart?: () => void;
}

interface PolaroidItem {
  id: number;
  image: string;
  song: string;
  artist: string;
  audio: string;
}

const polaroids: PolaroidItem[] = [
  {
    id: 2,
    image: 'https://giftinn.github.io/music-host/qr.jpg',
    song: 'Tangguh',
    artist: 'Petra Sihombing',
    audio: 'https://giftinn.github.io/music-host/tangguh-petra.mp3'
  },
];

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const fullText = `happy birthday, abraham.
semoga panjang umurnya, sehat selalu, lancar jalan rejekinya, dan selalu dijauhkan dari hal hal buruk. singkat saja, sisanya scan qr code yak.

ily the most`;

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowFinalMessage(true);
        }, 2000);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-center space-y-6 max-w-5xl mx-auto px-4">

      {/* LETTER BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-6 sm:p-10 bg-[#F1E4D1]/95 rounded-3xl border-2 border-[#D0E6FD] backdrop-blur-lg shadow-2xl relative overflow-hidden">

          {/* corners */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-[#D0E6FD] rounded-full"/>
          <div className="absolute top-2 right-2 w-3 h-3 bg-[#D0E6FD] rotate-45"/>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-[#D0E6FD] rounded-full"/>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#D0E6FD] rounded-lg"/>

          {/* TEXT */}
          <div className="text-left">
            <div className="text-sm sm:text-base text-[#162660] whitespace-pre-wrap leading-relaxed font-medium">
              {displayedText}

              {displayedText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-[#162660] ml-1"
                />
              )}
            </div>
          </div>

        </div>
      </motion.div>

      {/* POLAROIDS */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <h3 className="text-xl sm:text-2xl font-bold text-[#162660]">
              SCAN INI!
            </h3>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {polaroids.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, rotate: -8, y: 40 }}
                  animate={{ opacity: 1, rotate: i % 2 ? 6 : -6, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-[#F1E4D1] p-3 rounded-xl shadow-xl w-60 border border-[#D0E6FD]"
                >
                  <img
                    src={item.image}
                    alt="memory"
                    className="rounded-lg mb-3 object-cover w-full h-48"
                  />

                  <div className="text-left mb-2">
                    <p className="font-semibold text-[#162660] text-sm">
                      {item.song}
                    </p>

                    <p className="text-xs text-[#5A6A9A]">
                      {item.artist}
                    </p>
                  </div>

                  <audio
                    controls
                    className="w-full"
                  >
                    <source src={item.audio} type="audio/mpeg" />
                  </audio>

                </motion.div>
              ))}
            </div>

            {onBackToStart && (
              <button
                onClick={onBackToStart}
                className="px-5 py-2 bg-[#162660] text-white rounded-xl shadow-md hover:opacity-90 transition"
              >
                Back to Start
              </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SecretLetterPage;
