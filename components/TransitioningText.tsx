
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = ["One Thinking", "One Vision", "One Plan"];

const TransitioningText: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 w-40 font-semibold overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-start text-white"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TransitioningText;
