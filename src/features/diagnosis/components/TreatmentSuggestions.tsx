import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Syringe, Scissors, Droplets, Calendar, Clock, Check, AlertCircle, Download, Share2, Star } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  type: 'قرص' | 'شربت' | 'آمپول' | 'پماد';
  dosage: string;
  frequency: string;
  duration: string;
  sideEffects: string[];
  price: number;
}

interface TreatmentStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  important: boolean;
}

const TreatmentSuggestions: React.FC = () => {
  const [selectedMedication, setSelectedMedication] = useState<string>('med1');
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const medications: Medication[] = [
    {
      id: 'med1',
      name: 'آموکسی‌سیلین',
      type: 'قرص',
      dosage: '۲۵۰ میلی‌گرم',
      frequency: 'هر ۱۲ ساعت',
      duration: '۷ روز',
      sideEffects: ['حالت تهوع خفیف', 'اسهال احتمالی'],
      price: 85000
    },
    {
      id: 'med2',
      name: 'دگزامتازون',
      type: 'آمپول',
      dosage: '۰.۵ میلی‌لیتر',
      frequency: 'یک بار',
      duration: '۱ روز',
      sideEffects: ['افزایش تشنگی', 'بی‌قراری'],
      price: 120000
    },
    {
      id: 'med3',
      name: 'پماد تتراسایکلین',
      type: 'پماد',
      dosage: 'لایه نازک',
      frequency: 'هر ۸ ساعت',
      duration: '۵ روز',
      sideEffects: ['خارش موضعی'],
      price: 45000
    }
  ];

  const treatmentSteps: TreatmentStep[] = [
    {
      id: 'step1',
      title: 'استراحت کامل',
      description: 'حیوان باید در محیط آرام و گرم استراحت کند',
      icon: '😴',
      duration: '۲۴-۴۸ ساعت',
      important: true
    },
    {
      id: 'step2',
      title: 'آبرسانی مداوم',
      description: 'دسترسی همیشگی به آب تازه و تمیز',
      icon: '💧',
      duration: 'مستمر',
      important: true
    },
    {
      id: 'step3',
      title: 'رژیم غذایی نرم',
      description: 'غذاهای هضم‌پذیر مانند مرغ پخته و برنج',
      icon: '🍲',
      duration: '۳-۵ روز',
      important: true
    },
    {
      id: 'step4',
      title: 'کنترل دمای بدن',
      description: 'اندازه‌گیری دمای بدن هر ۶ ساعت',
      icon: '🌡️',
      duration: '۲ روز',
      important: false
    },
    {
      id: 'step5',
      title: 'ایزوله کردن',
      description: 'جدا کردن از سایر حیوانات برای جلوگیری از انتقال',
      icon: '🚫',
      duration: '۷ روز',
      important: true
    }
  ];

  const selectedMed = medications.find(m => m.id === selectedMedication);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* هدر با افکت ویژه */}
      <div className="relative">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">طرح درمان پیشنهادی</h3>
              <p className="opacity-90">برنامه کامل درمان با هوش مصنوعی</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Star className="w-8 h-8" />
            </motion.div>
          </div>
        </div>
        
        {/* افکت‌های پشت */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl"
        />
      </div>

      {/* کارت‌های دارو */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800">داروهای پیشنهادی</h4>
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span>حتما با دامپزشک مشورت کنید</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedMedication(med.id)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedMedication === med.id
                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-white shadow-xl scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <Pill className={`w-5 h-5 ${
                      med.type === 'قرص' ? 'text-blue-500' :
                      med.type === 'شربت' ? 'text-green-500' :
                      med.type === 'آمپول' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <span className="font-bold text-lg text-gray-800">{med.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">{med.type}</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 ml-1" />
                      {med.duration}
                    </span>
                  </div>
                </div>
                
                {selectedMedication === med.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">دوز مصرف</span>
                  <span className="font-medium">{med.dosage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تکرار</span>
                  <span className="font-medium">{med.frequency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">هزینه</span>
                  <span className="font-bold text-green-600">{med.price.toLocaleString()} تومان</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* جزئیات داروی انتخاب شده */}
      <AnimatePresence>
        {selectedMed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-gray-800">جزئیات {selectedMed.name}</h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showDetails ? 'نمایش کمتر' : 'نمایش بیشتر'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-700 mb-3">نحوه مصرف</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-gray-600">با غذا مصرف شود</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-gray-600">تا پایان دوره کامل شود</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-gray-600">از قطع خودسرانه بپرهیزید</span>
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-700 mb-3">عوارض جانبی</h5>
                <div className="space-y-2">
                  {selectedMed.sideEffects.map((effect, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-2 space-x-reverse text-gray-600"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{effect}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 pt-6 border-t border-blue-200"
              >
                <h5 className="font-semibold text-gray-700 mb-3">اطلاعات تکمیلی</h5>
                <div className="bg-white p-4 rounded-xl border">
                  <p className="text-gray-600">
                    این دارو از خانواده پنی‌سیلین‌ها است و برای عفونت‌های باکتریایی تجویز می‌شود.
                    در صورت مشاهده علائم حساسیت مانند تورم صورت یا مشکل تنفسی، مصرف را قطع کرده
                    و فورا به دامپزشک مراجعه کنید.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* مراحل درمان */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-6">مراحل درمان</h4>
        <div className="relative">
          {/* خط زمان */}
          <div className="absolute right-1/2 transform translate-x-1/2 md:right-0 md:translate-x-0 md:left-1/2 md:transform-none top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
          
          <div className="space-y-8 relative">
            {treatmentSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* دایره زمان */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${
                      step.important ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-500 to-green-500'
                    }`}
                  >
                    <span className="text-xl">{step.icon}</span>
                  </motion.div>
                </div>

                {/* کارت محتوا */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} mx-4`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-2xl border-2 shadow-lg ${
                      step.important
                        ? 'bg-gradient-to-r from-orange-50 to-white border-orange-200'
                        : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-lg font-semibold text-gray-800">{step.title}</h5>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {step.important && (
                      <div className="flex items-center space-x-2 space-x-reverse text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">اهمیت بالا</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* دکمه‌های اقدام */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h4 className="text-2xl font-bold mb-2">طرح درمان آماده است!</h4>
            <p className="text-gray-300">می‌توانید گزارش کامل را دریافت کنید</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 space-x-reverse">
              <Download className="w-5 h-5" />
              <span className="font-semibold">دانلود گزارش PDF</span>
            </button>
            
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 space-x-reverse">
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">اشتراک‌گذاری</span>
            </button>
          </div>
        </div>
        
        {/* افکت نور */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-xl"
        />
      </motion.div>
    </motion.div>
  );
};

export default TreatmentSuggestions;