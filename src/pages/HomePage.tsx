import React from 'react';
import { Brain, Shield, Clock, ArrowLeft } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* هیرو بخش */}
      <div className="bg-gradient-to-l from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-right">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          به دستیار دامپزشکی هوشمند خوش آمدید
        </h1>
        <p className="text-lg mb-6 opacity-90">
          تشخیص و درمان بیماری‌های حیوانات با استفاده از هوش مصنوعی پیشرفته
        </p>
        <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
          <span>شروع تشخیص بیماری</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* ویژگی‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Brain, title: 'تشخیص هوشمند', desc: 'آنالیز علائم با الگوریتم‌های پیشرفته AI', color: 'blue' },
          { icon: Shield, title: 'توصیه دارویی', desc: 'تجویز دقیق بر اساس تشخیص بیماری', color: 'green' },
          { icon: Clock, title: 'پیگیری مداوم', desc: 'مدیریت پرونده و سوابق درمانی', color: 'orange' },
        ].map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm border text-right">
            <div className={`p-3 bg-${item.color}-100 rounded-lg w-fit mb-4 ml-auto`}>
              <item.icon className={`w-8 h-8 text-${item.color}-600`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl shadow-sm border p-6 text-right">
        <h2 className="text-2xl font-bold mb-4">آماده شروع هستید؟</h2>
        <p className="text-gray-600 mb-6">
          اولین تشخیص بیماری حیوان خود را با کمک هوش مصنوعی انجام دهید
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="btn-primary flex-1 py-3">
            شروع تشخیص جدید
          </button>
          <button className="border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
            مشاهده آموزش‌ها
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;