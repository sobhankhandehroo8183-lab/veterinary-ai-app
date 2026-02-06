import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'فروردین', تشخیص: 42, بهبود: 38 },
  { month: 'اردیبهشت', تشخیص: 38, بهبود: 34 },
  { month: 'خرداد', تشخیص: 56, بهبود: 48 },
  { month: 'تیر', تشخیص: 47, بهبود: 42 },
  { month: 'مرداد', تشخیص: 63, بهبود: 55 },
  { month: 'شهریور', تشخیص: 52, بهبود: 47 },
];

const DiseaseChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDiagnosis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="تشخیص" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fill="url(#colorDiagnosis)"
            dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          
          <Area 
            type="monotone" 
            dataKey="بهبود" 
            stroke="#10B981" 
            strokeWidth={3}
            fill="url(#colorRecovery)"
            dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default DiseaseChart;