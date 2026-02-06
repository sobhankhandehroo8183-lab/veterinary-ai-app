import React from 'react';
import { 
  Home, 
  Activity, 
  Users, 
  FileText, 
  Pill, 
  MessageSquare,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'داشبورد', active: true },
    { icon: Activity, label: 'تشخیص بیماری' },
    { icon: Users, label: 'حیوانات' },
    { icon: FileText, label: 'پرونده‌ها' },
    { icon: Pill, label: 'داروها' },
    { icon: MessageSquare, label: 'گفتگو با متخصص' },
  ];

  const secondaryItems = [
    { icon: Settings, label: 'تنظیمات' },
    { icon: HelpCircle, label: 'راهنما' },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] hidden md:block">
      <div className="p-6">
        {/* بخش کاربر */}
        <div className="mb-8 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">د</span>
            </div>
            <div>
              <h3 className="font-semibold">دامپزشک مهمان</h3>
              <p className="text-sm text-gray-500">حساب آزمایشی</p>
            </div>
          </div>
        </div>

        {/* منوی اصلی */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-500 text-sm mb-3 px-3">منو اصلی</h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* منوی ثانویه */}
        <div>
          <h3 className="font-semibold text-gray-500 text-sm mb-3 px-3">سایر</h3>
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <li key={item.label}>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;