import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Stethoscope, 
  TrendingUp,
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Menu
} from 'lucide-react';
import { FaDog, FaCat, FaHeartbeat } from 'react-icons/fa';
import { GiRabbit, GiBirdTwitter } from 'react-icons/gi';

// کامپوننت‌های ما
import StatCard from '../components/ui/StatCard';
import DiseaseChart from '../components/charts/DiseaseChart';
import AnimalTable from '../components/ui/AnimalTable';
import NotificationCard from '../components/ui/NotificationCard';
import GlassCard from '../components/ui/GlassCard';

const DashboardPage: React.FC = () => {
  const stats = [
    { title: 'حیوانات تحت درمان', value: 127, icon: FaHeartbeat, color: 'bg-red-500', trend: 12, description: 'ماه گذشته' },
    { title: 'تشخیص‌های موفق', value: '۸۹٪', icon: Stethoscope, color: 'bg-green-500', trend: 5, description: 'نرخ دقت' },
    { title: 'ویزیت‌های امروز', value: 24, icon: Users, color: 'bg-blue-500', trend: -2, description: 'دیروز' },
    { title: 'میانگین بهبود', value: '۴.۲', icon: TrendingUp, color: 'bg-purple-500', trend: 8, description: 'روزها' },
  ];

  const animalStats = [
    { type: 'سگ', count: 68, icon: FaDog, color: 'bg-blue-100 text-blue-600' },
    { type: 'گربه', count: 42, icon: FaCat, color: 'bg-purple-100 text-purple-600' },
    { type: 'خرگوش', count: 12, icon: GiRabbit, color: 'bg-pink-100 text-pink-600' },
    { type: 'پرنده', count: 5, icon: GiBirdTwitter, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* هدر داشبورد */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
          <p className="text-gray-600 mt-2">بررسی عملکرد کلی سیستم و آمار حیوانات</p>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>فیلتر</span>
          </button>
          
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            <span>گزارش</span>
          </button>
        </div>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
            description={stat.description}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* ردیف دوم: نمودار و آمار حیوانات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* نمودار بیماری‌ها */}
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">آمار تشخیص و بهبود</h3>
              <p className="text-gray-600 text-sm">بررسی روند ۶ ماه گذشته</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">تشخیص</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">بهبود</span>
              </div>
            </div>
          </div>
          <DiseaseChart />
        </GlassCard>

        {/* آمار انواع حیوانات */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">توزیع حیوانات</h3>
          <div className="space-y-4">
            {animalStats.map((animal, index) => (
              <motion.div
                key={animal.type}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-3 rounded-lg ${animal.color}`}>
                    <animal.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{animal.type}</p>
                    <p className="text-sm text-gray-500">{animal.count} حیوان</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{animal.count}</div>
                  <div className="text-xs text-gray-500">موجود در سیستم</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">درصد بهبودی</div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  />
                </div>
                <span className="font-bold text-green-600">۸۵٪</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* ردیف سوم: جدول حیوانات و اعلان‌ها */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* جدول حیوانات */}
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">آخرین حیوانات</h3>
            <button className="text-blue-600 text-sm font-medium flex items-center space-x-1 space-x-reverse">
              <span>مشاهده همه</span>
              <Menu className="w-4 h-4" />
            </button>
          </div>
          <AnimalTable />
        </GlassCard>

        {/* اعلان‌ها و تقویم */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <NotificationCard />
          </GlassCard>

          {/* تقویم */}
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">تقویم امروز</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {[
                { time: '۹:۰۰ صبح', title: 'ویزیت سگ "رکس"', type: 'معاینه' },
                { time: '۱۱:۳۰ صبح', title: 'آزمایش خون گربه', type: 'آزمایش' },
                { time: '۱۴:۰۰ بعدازظهر', title: 'واکسن خرگوش', type: 'واکسیناسیون' },
                { time: '۱۶:۳۰ بعدازظهر', title: 'کنترل دوری بیماری', type: 'پیگیری' },
              ].map((event, index) => (
                <motion.div
                  key={event.time}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg ml-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-500">{event.time}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* فوتر داشبورد */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">آماده ارتقاء حساب کاربری هستید؟</h3>
            <p className="opacity-90">به ویژگی‌های پیشرفته دسترسی کامل داشته باشید</p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
            ارتقاء به حساب حرفه‌ای
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;