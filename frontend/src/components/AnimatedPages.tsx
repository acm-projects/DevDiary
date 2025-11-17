import React from 'react';
import { motion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';
// Page transition variants and transitions
// You can choose different variants and transitions for different effects

// --- Choose one of the following variant sets and transition types ---


// --- Animation Set 1: Slide & Fade (What you had before) ---
const slideFadeVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

// --- Animation Set 2: Zoom ---
const zoomVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.9 },
};

// --- Animation Set 3: Simple Fade ---
const fadeVariants: Variants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
};


// --- Transition Type 1: Tween (Duration-based) ---
const tweenTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

// --- Transition Type 2: Spring (Physics-based) ---
const springTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
};

// --- Page Variants & Transition (You can switch between these) ---
const pageVariants: Variants = zoomVariants; // Change to zoomVariants or fadeVariants for different effects
const pageTransition: Transition = tweenTransition; // Change to springTransition for different feel

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
