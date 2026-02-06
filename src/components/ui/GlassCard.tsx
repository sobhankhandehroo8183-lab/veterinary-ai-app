import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl shadow-blue-500/10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;