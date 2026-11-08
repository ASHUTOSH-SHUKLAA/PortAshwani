import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 250);
          return 100;
        }
        return p + Math.random() * 25;
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-[#0d0b0b] flex flex-col items-center justify-center"
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Brand Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display font-bold text-3xl md:text-4xl text-[#f1eee6] mb-12 tracking-tight"
          >
            ASHWANI<span className="text-[#c9a45c]">®</span>
          </motion.div>

          {/* Minimal 1px Progress Bar */}
          <div className="w-48 h-px bg-[#2c2927] relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#c8ff4d]"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] font-mono text-[#8a8a84] mt-5 tracking-widest"
            aria-hidden="true"
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
