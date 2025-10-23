import React from 'react';
// FIX: Import Variants type from framer-motion to correctly type the animation variants.
import { motion, Variants } from 'framer-motion';

// SVG Icons as React Components for better control
const IconAI = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconBespoke = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.226 1.28-.522 2.73.284 3.222 1.566l.043.123m-4.288 16.578a2.5 2.5 0 11-4.288-1.578l.043.123m4.288-1.578a2.5 2.5 0 01-4.288 1.578m4.288-1.578l-.043-.123m0 0a2.5 2.5 0 01-4.288-1.578m4.288 1.578L12 12m0 0l-4.288-4.288m4.288 4.288l4.288 4.288m-4.288-4.288L16.288 7.712m-4.288 4.288L7.712 16.288" />
  </svg>
);

const IconScalable = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
  </svg>
);

const IconExpert = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const features = [
  {
    icon: <IconAI />,
    title: "AI-Powered Innovation",
    description: "We leverage cutting-edge AI to build intelligent solutions that drive growth, enhance efficiency, and unlock new possibilities for your business.",
  },
  {
    icon: <IconBespoke />,
    title: "Bespoke Solutions",
    description: "Every project is a unique journey. We craft tailor-made software that perfectly aligns with your specific business goals and operational needs.",
  },
  {
    icon: <IconScalable />,
    title: "Scalable Architecture",
    description: "Future-proof your success. Our solutions are built on robust, scalable architectures ready to grow and adapt alongside your business.",
  },
  {
    icon: <IconExpert />,
    title: "Dedicated Expert Team",
    description: "Our team consists of leading AI specialists, developers, and designers committed to transforming your vision into a tangible, high-impact reality.",
  },
];

// FIX: Explicitly type cardVariants with the Variants type to prevent TypeScript from inferring 'ease' as a generic string.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight logo uppercase">
            Why <span className="text-purple-400">Sphere</span>?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            We transform complex challenges into intelligent, elegant software solutions.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-gray-900/40 border border-white/10 p-8 rounded-2xl flex flex-col items-start hover:border-purple-400/50 hover:bg-gray-900/60 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;