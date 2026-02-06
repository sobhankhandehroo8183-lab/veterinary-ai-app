import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, title: 'تشخیص موفق', message: 'تشخیص بیماری سگ "رکس" با دقت ۹۴% تکمیل شد', time: '۵ دقیقه پیش', type: 'success', read: false },
  { id: 2, title: 'داروی جدید', message: 'داروی "پن‌اموکس" برای گربه "میسی" تجویز شد', time: '۲ ساعت پیش', type: 'info', read: true },
  { id: 3, title: 'یادآوری ویزیت', message: 'ویزیت بعدی خرگوش "هپی" فردا ساعت ۱۰ صبح', time: '۱ روز پیش', type: 'warning', read: true },
  { id: 4, title: 'آزمایشگاه', message: 'جواب آزمایش خون سگ "کیکا" آماده است', time: '۲ روز پیش', type: 'alert', read: false },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'warning': return <Bell className="w-5 h-5 text-yellow-500" />;
    case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
    default: return <Info className="w-5 h-5 text-blue-500" />;
  }
};

const NotificationCard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">اعلان‌ها</h3>
        <button className="text-blue-600 text-sm font-medium">مشاهده همه</button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${
              notification.read 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="mt-1">
                  {getIcon(notification.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <h4 className="font-medium text-gray-800">{notification.title}</h4>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <span className="text-gray-400 text-xs mt-2 block">{notification.time}</span>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded-lg">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;