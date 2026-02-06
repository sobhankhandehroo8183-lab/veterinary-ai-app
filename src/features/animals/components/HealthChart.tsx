import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface HealthChartProps {
  data: {
    month: string;
    healthy: number;
    sick: number;
    recovering: number;
  }[];
}

const HealthChart: React.FC<HealthChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="font-semibold text-gray-800">روند سلامت حیوانات</h4>
          <p className="text-gray-600 text-sm">بررسی ۶ ماه گذشته</p>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">سالم</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">بیمار</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">در حال بهبود</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSick" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRecovering" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
              dataKey="healthy" 
              stroke="#10B981" 
              strokeWidth={3}
              fill="url(#colorHealthy)"
              dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            
            <Area 
              type="monotone" 
              dataKey="recovering" 
              stroke="#3B82F6" 
              strokeWidth={3}
              fill="url(#colorRecovering)"
              dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            
            <Area 
              type="monotone" 
              dataKey="sick" 
              stroke="#F59E0B" 
              strokeWidth={3}
              fill="url(#colorSick)"
              dot={{ stroke: '#F59E0B', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <p className="text-2xl font-bold text-green-600">
            {data[data.length - 1]?.healthy || 0}
          </p>
          <p className="text-sm text-gray-600">سالم</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <p className="text-2xl font-bold text-blue-600">
            {data[data.length - 1]?.recovering || 0}
          </p>
          <p className="text-sm text-gray-600">در حال بهبود</p>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-xl">
          <p className="text-2xl font-bold text-yellow-600">
            {data[data.length - 1]?.sick || 0}
          </p>
          <p className="text-sm text-gray-600">بیمار</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthChart;