import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, Thermometer, Heart, Activity } from 'lucide-react';

interface DiagnosisResultProps {
  disease: string;
  confidence: number;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  isLoading?: boolean;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  disease,
  confidence,
  description,
  urgency,
  isLoading = false
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress >= 95) return 95;
          return oldProgress + 5;
        });
      }, 100);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  const urgencyConfig = {
    low: { color: 'bg-green-500', text: 'کم', icon: CheckCircle },
    medium: { color: 'bg-yellow-500', text: 'متوسط', icon: Clock },
    high: { color: 'bg-orange-500', text: 'بالا', icon: Thermometer },
    emergency: { color: 'bg-red-500', text: 'اضطراری', icon: AlertTriangle },
  };

  const UrgencyIcon = urgencyConfig[urgency].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* هدر */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">نتیجه تشخیص</h3>
          <p className="text-gray-600">تحلیل علائم با هوش مصنوعی</p>
        </div>
        
        <div className={`px-4 py-2 rounded-full text-white font-medium flex items-center space-x-2 space-x-reverse ${urgencyConfig[urgency].color}`}>
          <UrgencyIcon className="w-5 h-5" />
          <span>وضعیت: {urgencyConfig[urgency].text}</span>
        </div>
      </div>

      {/* نوار پیشرفت */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700">در حال تحلیل علائم...</span>
            <span className="font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-center space-x-6 space-x-reverse text-sm text-gray-500">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Activity className="w-4 h-4 animate-pulse text-blue-500" />
              <span>در حال پردازش تصویر</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Heart className="w-4 h-4 animate-pulse text-purple-500" />
              <span>مقایسه با پایگاه داده</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* نتیجه */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* بیماری تشخیص داده شده */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{disease}</h4>
                <p className="text-gray-600">{description}</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">{confidence}%</div>
                <div className="text-sm text-gray-500">دقت تشخیص</div>
              </div>
            </div>
            
            {/* نوار دقت */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">سطح اطمینان تشخیص</span>
                <span className="font-medium">{confidence}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${
                    confidence > 80 ? 'bg-green-500' :
                    confidence > 60 ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* علائم شناسایی شده */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">علائم شناسایی شده</h4>
              <div className="space-y-3">
                {['تب بالا', 'بی‌اشتهایی', 'خستگی', 'عطسه مکرر'].map((symptom, index) => (
                  <motion.div
                    key={symptom}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{symptom}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                      تایید شده
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">آمار تشخیص</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تشخیص‌های مشابه</span>
                  <span className="font-bold">۴۲ مورد</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">میانگین بهبود</span>
                  <span className="font-bold text-green-600">۹۲٪</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">مدت درمان</span>
                  <span className="font-bold">۷-۱۰ روز</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">نیاز به دامپزشک</span>
                  <span className="font-bold text-orange-600">ضروری</span>
                </div>
              </div>
            </div>
          </div>

          {/* هشدار مهم */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-4 space-x-reverse">
              <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-orange-800 mb-2">توجه مهم</h4>
                <p className="text-orange-700">
                  این تشخیص توسط هوش مصنوعی انجام شده و جایگزین نظر دامپزشک نمی‌باشد.
                  برای درمان قطعی حتما به دامپزشک مراجعه کنید. در صورت مشاهده علائم اضطراری
                  مانند تشنج، خونریزی یا تنفس مشکل سریعا به کلینیک دامپزشکی مراجعه نمایید.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiagnosisResult;