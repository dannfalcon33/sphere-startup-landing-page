import React from 'react';
import { motion, Variants } from 'framer-motion';

// SVG Icons for each solution
const IconAvatar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);

const IconInfluencer = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15" />
    </svg>
);

const IconSystem = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

const solutions = [
  {
    icon: <IconAvatar />,
    title: "Custom AI Avatars",
    description: "We design and develop hyper-realistic or stylized AI avatars for virtual assistance, brand representation, and immersive digital experiences. Your brand's unique personality, embodied.",
  },
  {
    icon: <IconInfluencer />,
    title: "Next-Gen AI Influencers",
    description: "Launch virtual influencers that captivate audiences and redefine digital marketing. We create complete AI personas with dynamic personalities, capable of engaging with followers 24/7.",
  },
  {
    icon: <IconSystem />,
    title: "Bespoke AI Systems",
    description: "Beyond avatars, we architect custom AI solutions to solve complex business challenges. From data analysis to process automation, we build the intelligent core for your operations.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight logo uppercase">
            AI-Powered <span className="text-purple-400">Solutions</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
            We engineer intelligent entities and systems that redefine digital interaction. Explore our core services designed for the new era of AI.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-gray-900/40 border border-white/10 p-8 rounded-2xl flex flex-col items-start text-left hover:border-purple-400/50 hover:bg-gray-900/60 transition-all duration-300 transform hover:-translate-y-2"
            >
              {solution.icon}
              <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;