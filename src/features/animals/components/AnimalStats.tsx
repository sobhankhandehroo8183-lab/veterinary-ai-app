import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Heart, 
  AlertTriangle,
  Dog,
  Cat,
  Rabbit,
  Bird,
  PieChart,
  BarChart3
} from 'lucide-react';

interface AnimalStatsProps {
  stats: {
    total: number;
    dogs: number;
    cats: number;
    rabbits: number;
    birds: number;
    others: number;
    healthy: number;
    sick: number;
    recovering: number;
    critical: number;
  };
}

const AnimalStats: React.FC<AnimalStatsProps> = ({ stats }) => {
  const statsCards = [
    {
      title: 'کل حیوانات',
      value: stats.total,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+۱۲٪',
      trend: 'up'
    },
    {
      title: 'درمان موفق',
      value: stats.healthy,
      icon: Heart,
      color: 'from-green-500 to-emerald-600',
      change: '۹۴٪',
      trend: 'up'
    },
    {
      title: 'در حال درمان',
      value: stats.sick + stats.recovering,
      icon: Activity,
      color: 'from-orange-500 to-amber-500',
      change: `${Math.round(((stats.sick + stats.recovering) / stats.total) * 100)}٪`,
      trend: 'neutral'
    },
    {
      title: 'وضعیت بحرانی',
      value: stats.critical,
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-600',
      change: `${Math.round((stats.critical / stats.total) * 100)}٪`,
      trend: 'down'
    }
  ];

  const animalDistribution = [
    { type: 'سگ', count: stats.dogs, color: 'bg-blue-500', icon: Dog },
    { type: 'گربه', count: stats.cats, color: 'bg-purple-500', icon: Cat },
    { type: 'خرگوش', count: stats.rabbits, color: 'bg-pink-500', icon: Rabbit },
    { type: 'پرنده', count: stats.birds, color: 'bg-green-500', icon: Bird },
    { type: 'سایر', count: stats.others, color: 'bg-gray-500', icon: Users }
  ];

  const healthStatus = [
    { status: 'سالم', count: stats.healthy, color: 'bg-green-500' },
    { status: 'بیمار', count: stats.sick, color: 'bg-yellow-500' },
    { status: 'در حال بهبود', count: stats.recovering, color: 'bg-blue-500' },
    { status: 'بحرانی', count: stats.critical, color: 'bg-red-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* هدر */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">آمار کلی حیوانات</h3>
          <p className="text-gray-600">بررسی وضعیت سلامت و توزیع حیوانات</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <PieChart className="w-5 h-5" />
          </button>
          <button className="p-3 bg-gray-100 text-gray-600 rounded-xl">
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                  </div>
                  
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {stat.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">ماه گذشته</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* توزیع حیوانات و وضعیت سلامت */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* توزیع حیوانات */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h4 className="font-semibold text-gray-800 mb-6 flex items-center">
            <Dog className="w-5 h-5 ml-2" />
            توزیع حیوانات
          </h4>
          
          <div className="space-y-4">
            {animalDistribution.map((animal, index) => {
              const Icon = animal.icon;
              const percentage = Math.round((animal.count / stats.total) * 100);
              
              return (
                <motion.div
                  key={animal.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`p-2 rounded-lg ${animal.color.replace('bg-', 'bg-')}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{animal.type}</p>
                      <p className="text-sm text-gray-500">{animal.count} حیوان</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{percentage}%</p>
                      <p className="text-xs text-gray-500">از کل</p>
                    </div>
                    
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full ${animal.color} rounded-full`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* وضعیت سلامت */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h4 className="font-semibold text-gray-800 mb-6 flex items-center">
            <Activity className="w-5 h-5 ml-2" />
            وضعیت سلامت
          </h4>
          
          <div className="space-y-4">
            {healthStatus.map((status, index) => {
              const percentage = Math.round((status.count / stats.total) * 100);
              
              return (
                <motion.div
                  key={status.status}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className={`w-3 h-3 rounded-full ${status.color}`} />
                      <span className="font-medium text-gray-800">{status.status}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">{status.count}</span>
                      <span className="text-gray-500 text-sm mr-1">حیوان</span>
                      <span className="font-bold text-gray-600">({percentage}%)</span>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-full ${status.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* خلاصه */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">نرخ بهبودی</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(((stats.healthy + stats.recovering) / stats.total) * 100)}%
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">نیاز به توجه</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(((stats.sick + stats.critical) / stats.total) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimalStats;