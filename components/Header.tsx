
import React, { useState } from 'react';
// FIX: Import Variants type from framer-motion to correctly type the animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';

// This NavLink is now only for the desktop view
const NavLink: React.FC<{ text: string; href: string }> = ({ text, href }) => (
  <li>
    <a
      href={href}
      className="text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 text-sm font-medium"
    >
      {text}
    </a>
  </li>
);

// FIX: Explicitly type menuVariants with the Variants type to prevent TypeScript from inferring 'type' and 'ease' as generic strings.
const menuVariants: Variants = {
  hidden: {
    x: '100%',
    transition: { type: 'tween', duration: 0.4, ease: 'easeIn' }
  },
  visible: {
    x: 0,
    transition: { type: 'tween', duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', duration: 0.4, ease: 'easeIn', delay: 0.5 }
  }
};

// FIX: Explicitly type navContainerVariants with the Variants type for consistency and type safety.
const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

// FIX: Explicitly type navItemVariants with the Variants type to prevent TypeScript from inferring 'type' and 'ease' as generic strings.
const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { text: "Features", href: "#features" },
    { text: "About Us", href: "#about" },
    { text: "Solutions", href: "#solutions" },
    { text: "Pricing", href: "#pricing" },
    { text: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <a href="#" className="text-3xl font-bold tracking-wider logo">
                SPHERE
              </a>
            </motion.div>
            
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <NavLink key={item.text} text={item.text} href={item.href} />
                ))}
              </ul>
            </nav>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <a
                href="#pricing"
                className="px-5 py-2 border border-gray-500 rounded-full text-sm font-semibold text-gray-200 hover:bg-white hover:text-black transition-all duration-300"
              >
                Get Started
              </a>
            </motion.div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 flex flex-col items-center justify-center z-[100] md:hidden"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-7 right-4 sm:right-6 lg:right-8 text-white focus:outline-none">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <motion.ul
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-8"
            >
              {navItems.map((item) => (
                <motion.li key={item.text} variants={navItemVariants}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={navItemVariants} className="mt-8">
                <a
                  href="#pricing"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 border border-gray-500 rounded-full text-lg font-semibold text-gray-200 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Get Started
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
