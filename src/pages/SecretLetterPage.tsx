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
    id: 1,
    image: 'https://files.catbox.moe/2uezlu.jpg',
    song: 'Senja Sudut Kota',
    artist: 'Samuel Cipta',
    audio: 'https://files.catbox.moe/hde6rr.mp3'
  },
  {
    id: 2,
    image: 'https://files.catbox.moe/6ud3ln.jpg',
    song: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    audio: 'https://files.catbox.moe/m1asq3.mp3'
  },
  {
    id: 3,
    image: 'https://files.catbox.moe/ly0lku.jpg',
    song: 'Intro (End of the World',
    artist: 'Ariana Grande',
    audio: 'https://files.catbox.moe/b1waeh.mp3'
  }
];

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const fullText = `Happy Mensiversary for Us! 
  
First, thank you for your time buat buka gift sederhana dari aku ini (and i hope u like it hehe). I just wanna say, happy mensive for my lovely, coolest man.

Jujur aku khawatir banget kamu udah berhari-hari hilang dan gada kabar sama sekali, aku harap dihari mensive kita kamu udah bisa ngabarin aku dan buka minigift dari aku ini. aku harap kamu juga gak akan hilang kabar lama lagi kaya gini:c dan semoga mensive kedua ini aku gak merayakan sendiri.

Then, i wanna say thank you for everything u did to me, it means a lot to me fr. makasihh udah mau nge-treat aku sebaik ituu, makasih udah mau dengerin semua keluh kesah aku, cerita random aku. aku jugaa makasih banget selama ini kamu selalu sabar sama aku, jarang marah intinya u treated me like a princess. thank you, sayang. i'm sorry if i act like a kid sometimes, bikin kamu kesel, suka ngambek sometimes.. maafin aku yaa sayangg? aku beneran berharap kita bisa lastlong sayang.

And bcs it's our special day, aku harap hubungan kita makin kuat, perasaan kamu ke aku masih tetap sama (kalau bisa sih makin sayang dan cinta hehehe), dan semua mimpi kita berdua terwujud satu persatu. aku juga berharap semoga kita selalu dikelilingi sama hal-hal baik dan dijauhin dari yang jahat-jahat. aku berharap setelah ini, kamu ga hilang tanpa kabar lagii.. thenn, i just wanna say that u aren't alone. kamu harus percaya kalau kamu selalu dikelilingi orang-orang yang sayang sama kamu, utamanya aku yang selalu disini buat tempat kamu pulang. bahagia terus yaa sayang, jangan sedih-sedihh, jangan capek-capek jugaa.. semoga setiap masalah yang kamu hadapi selalu diberi jalan keluar dan dipermudah. 
.
.
.
i want to unravel you slowly, like a buried ache, longing to be seen. something in you felt so familiar—like the echo of a home i’ve spent my whole life trying to find.

I don’t say much about how I feel,
But loving you just feels so real.
In quiet moments, day or night,
You’re the reason everything feels right.

If you could see my heart so clear,
You’d know you’re what I hold most dear.
No doubt, no fear, no trace of strife,
You’re my favorite part of life.

With all my heart, 
Your Girlfriend.`;

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
        <div className="p-6 sm:p-10 bg-gradient-to-br from-white/90 to-blue-50/90 rounded-3xl border-2 border-blue-200 backdrop-blur-lg shadow-2xl relative overflow-hidden">

          {/* corners */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-blue-300 rounded-full"/>
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-300 rotate-45"/>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-blue-300 rounded-full"/>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-lg"/>

          {/* TEXT */}
          <div className="text-left">
            <div className="text-sm sm:text-base text-blue-900 whitespace-pre-wrap leading-relaxed font-medium">
              {displayedText}
              {displayedText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-blue-400 ml-1"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>


      {/* POLAROID */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <h3 className="text-xl sm:text-2xl font-bold text-blue-900">
              Our Songs & Memories 🎧
            </h3>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {polaroids.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, rotate: -8, y: 40 }}
                  animate={{ opacity: 1, rotate: i % 2 ? 6 : -6, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white p-3 rounded-xl shadow-xl w-60"
                >
                  <img
                    src={item.image}
                    alt="memory"
                    className="rounded-lg mb-3 object-cover w-full h-48"
                  />

                  <div className="text-left mb-2">
                    <p className="font-semibold text-blue-900 text-sm">
                      {item.song}
                    </p>
                    <p className="text-xs text-blue-600">
                      {item.artist}
                    </p>
                  </div>

                  {/* AUDIO */}
                  <audio controls className="w-full accent-blue-500">
                    <source src={item.audio} type="audio/mpeg" />
                  </audio>

                </motion.div>
              ))}
            </div>

            {onBackToStart && (
              <button
                onClick={onBackToStart}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
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




















