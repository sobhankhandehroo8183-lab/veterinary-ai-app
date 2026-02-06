import React from 'react';
import { Stethoscope, Bell, User, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* لوگو */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">VetAI</h1>
            <p className="text-xs text-gray-500">دستیار دامپزشکی هوشمند</p>
          </div>
        </div>

        {/* منوی ناوبری */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            خانه
          </a>
          <a href="/diagnosis" className="text-gray-700 hover:text-blue-600 font-medium">
            تشخیص بیماری
          </a>
          <a href="/animals" className="text-gray-700 hover:text-blue-600 font-medium">
            حیوانات
          </a>
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
            داشبورد
          </a>
        </div>

        {/* آیکون‌های سمت چپ */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium">ورود / ثبت‌نام</span>
          </div>
          
          <select className="border rounded-lg px-3 py-1 text-sm bg-white">
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;