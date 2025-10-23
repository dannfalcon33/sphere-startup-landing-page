import React from 'react';
// FIX: Import Variants type from framer-motion to correctly type the animation variants.
import { motion, Variants } from 'framer-motion';

const CheckIcon = () => (
    <svg className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const About: React.FC = () => {
  // FIX: Explicitly type containerVariants with the Variants type.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  // FIX: Explicitly type itemVariants with the Variants type to prevent TypeScript from inferring 'ease' as a generic string.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
  // FIX: Explicitly type imageVariants with the Variants type to prevent TypeScript from inferring the cubic-bezier 'ease' array as a generic number[].
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67] } },
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Image Column */}
          <motion.div variants={imageVariants} className="relative w-full h-80 md:h-full flex items-center justify-center">
             <div className="absolute w-full h-full max-w-md rounded-full bg-purple-600/30 blur-3xl animate-pulse-slow"></div>
             <div className="absolute w-2/3 h-2/3 max-w-xs rounded-full bg-indigo-500/40 blur-2xl animate-bubble"></div>
             <h3 className="relative text-5xl font-black text-white/80 logo tracking-widest">AI CORE</h3>
          </motion.div>

          {/* Content Column */}
          <motion.div variants={containerVariants}>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black tracking-tight logo uppercase"
            >
              Forging the Future of <span className="text-purple-400">Software</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-gray-300 leading-relaxed"
            >
              We are a collective of pioneers—engineers, visionaries, and creators—united by a singular mission: to harness the transformative power of Artificial Intelligence and build the next generation of intelligent software.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-gray-400"
            >
              At Sphere, we don't just write code; we architect intelligent systems that learn, adapt, and solve complex problems. We believe in creating technology that is not only powerful but also intuitive and accessible.
            </motion.p>

            <motion.ul variants={itemVariants} className="mt-8 space-y-4">
              <li className="flex items-center text-gray-300">
                <CheckIcon />
                <span className="font-semibold">Pioneering Innovation:</span>&nbsp;Pushing the boundaries of what's possible with AI.
              </li>
              <li className="flex items-center text-gray-300">
                <CheckIcon />
                <span className="font-semibold">Collaborative Partnership:</span>&nbsp;Working closely with clients to turn vision into reality.
              </li>
              <li className="flex items-center text-gray-300">
                <CheckIcon />
                <span className="font-semibold">Uncompromising Quality:</span>&nbsp;Delivering robust, scalable, and elegant solutions.
              </li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;