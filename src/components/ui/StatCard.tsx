import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

// تعریف نوع برای آیکون‌ها
interface IconProps {
  className?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<IconProps>; // تغییر اینجا
  color: string;
  trend: number;
  description: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  description,
  delay = 0
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const num = typeof value === 'number' ? value : parseInt(value.toString().replace(/,/g, ''));
    if (!isNaN(num)) {
      const duration = 2000;
      const steps = 60;
      const increment = num / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        setCount(Math.min(current, num));
        if (current >= num) {
          clearInterval(timer);
          setCount(num);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value]);

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, delay }
    });
  }, [controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {typeof value === 'number' ? Math.floor(count).toLocaleString() : value}
            </h3>
          </div>
          
          <motion.div
            animate={controls}
            className={`p-3 rounded-xl ${color} bg-opacity-10`}
          >
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </motion.div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 space-x-reverse">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
          <span className="text-gray-500 text-sm">{description}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;