import React from 'react';
import { motion } from 'framer-motion';
import TransitioningText from './TransitioningText';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center p-4">
      {/* Animated Bubble Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] min-w-[300px] min-h-[300px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 animate-bubble blur-3xl filter" />
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase animate-pulse-shadow logo"
        >
          SPHERE
        </motion.h1>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
          }}
          className="mt-6 flex items-center justify-center gap-3 md:gap-4 text-xl md:text-2xl text-gray-300"
        >
          <span>Just Idea</span>
          <span className="text-purple-400 text-2xl">◆</span>
          <TransitioningText />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.5 } },
          }}
          className="mt-12"
        >
          <a href="#pricing">
            <button 
              className="
                px-10 py-4 
                text-lg font-bold text-white
                bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500
                bg-[length:200%_auto]
                rounded-full 
                shadow-lg shadow-indigo-500/30
                hover:shadow-xl hover:shadow-indigo-500/50
                hover:animate-gradient-x
                transition-all duration-500 ease-in-out
                transform hover:scale-105
              "
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Get Started
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;