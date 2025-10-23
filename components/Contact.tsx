import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The form's `required` attributes handle basic validation.
    // If this function is called, we assume the submission is successful for this demo.
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] min-w-[500px] min-h-[500px]">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-800/50 via-indigo-800/30 to-blue-900/50 blur-3xl filter animate-bubble-slow"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight logo uppercase">
            Let's build the <span className="text-purple-400">Future</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Have a project in mind or just want to learn more? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="mt-12 max-w-xl mx-auto min-h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, y: -30 }}
                viewport={{ once: true, amount: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6 w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="block w-full px-4 py-3 rounded-md bg-gray-900/50 border border-white/10 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="Your Name"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="block w-full px-4 py-3 rounded-md bg-gray-900/50 border border-white/10 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="you@example.com"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full px-4 py-3 rounded-md bg-gray-900/50 border border-white/10 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="text-center bg-gray-900/50 border border-green-500/50 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-green-400">Message sent successfully!</h3>
                <p className="text-gray-300 mt-2">Thanks for reaching out. We'll be in touch soon.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;