import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Sphere's AI avatar technology has revolutionized our customer engagement. The level of realism and customization is unlike anything we've seen before. A true game-changer for our brand.",
    name: 'Sarah Jenkins',
    title: 'Chief Marketing Officer',
    company: 'InnovateCorp',
    avatar: 'SJ',
    rating: 5,
  },
  {
    quote: "The bespoke AI system Sphere developed for us streamlined our entire data analysis pipeline. Their team didn't just deliver a product; they delivered a transformative business solution. Highly recommended.",
    name: 'Michael Chen',
    title: 'Head of Operations',
    company: 'Quantum Analytics',
    avatar: 'MC',
    rating: 5,
  },
  {
    quote: "Working with Sphere felt like a true partnership. They took our vision for a next-gen AI influencer and brought it to life with incredible creativity and technical expertise. The results have exceeded all expectations.",
    name: 'Elena Rodriguez',
    title: 'Founder & CEO',
    company: 'Digital Vogue',
    avatar: 'ER',
    rating: 4,
  },
  {
    quote: "The scalability and robustness of the architecture Sphere built for us is top-notch. As we've grown, the system has performed flawlessly. Their dedication to quality and future-proofing is evident in every line of code.",
    name: 'David Lee',
    title: 'Lead Systems Architect',
    company: 'Synergy Platforms',
    avatar: 'DL',
    rating: 5,
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex justify-center items-center gap-1">
    {[...Array(5)].map((_, index) => (
      <Star key={index} filled={index < rating} />
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  
  const testimonialIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight logo uppercase">
            Trusted by <span className="text-purple-400">Innovators</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            See how leading companies are leveraging Sphere to redefine their digital landscape.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative max-w-3xl mx-auto h-[450px] md:h-[380px] flex items-center justify-center"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full p-8 bg-gray-900/40 border border-white/10 rounded-2xl flex flex-col justify-center items-center text-center"
            >
              <div className="absolute top-0 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-bold logo ring-8 ring-[#050505]">
                {currentTestimonial.avatar}
              </div>
              
              <div className="mt-12 mb-4">
                 <StarRating rating={currentTestimonial.rating} />
              </div>

              <blockquote className="text-lg md:text-xl text-gray-300 italic leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>
              
              <footer className="mt-6">
                <p className="font-bold text-white text-lg">{currentTestimonial.name}</p>
                <p className="text-sm text-gray-400">{currentTestimonial.title}, {currentTestimonial.company}</p>
              </footer>
            </motion.div>
          </AnimatePresence>
          
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-16 z-10 bg-gray-800/50 p-2 rounded-full hover:bg-purple-600/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-16 z-10 bg-gray-800/50 p-2 rounded-full hover:bg-purple-600/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="absolute -bottom-12 w-full flex justify-center items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const newDirection = i > testimonialIndex ? 1 : -1;
                  setPage([i, newDirection]);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'bg-purple-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === testimonialIndex}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};
export default Testimonials;