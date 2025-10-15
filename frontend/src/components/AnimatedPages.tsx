import React from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

// page variants for animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

// transition type and duration
const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// AnimatedPage component to wrap around pages for transitions
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
