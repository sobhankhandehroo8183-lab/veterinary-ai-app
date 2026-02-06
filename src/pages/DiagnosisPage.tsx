import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  Brain, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  Download,
  Share2,
  Sparkles,
  Target,
  Heart,
  Shield,
  AlertCircle,
  Check
} from 'lucide-react';

// کامپوننت‌های ما
import AnimalTypeSelector from '../features/diagnosis/components/AnimalTypeSelector';
import SymptomSelector from '../features/diagnosis/components/SymptomSelector';
import ImageUploader from '../features/diagnosis/components/ImageUploader';
import DiagnosisResult from '../features/diagnosis/components/DiagnosisResult';
import TreatmentSuggestions from '../features/diagnosis/components/TreatmentSuggestions';

type DiagnosisStep = 'animal' | 'symptoms' | 'image' | 'result' | 'treatment';

const DiagnosisPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<DiagnosisStep>('animal');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showAIChat, setShowAIChat] = useState<boolean>(false);
  const [aiProgress, setAiProgress] = useState<number>(0);

  const steps = [
    { id: 'animal', title: 'انتخاب حیوان', icon: '🐾', description: 'نوع حیوان خود را انتخاب کنید' },
    { id: 'symptoms', title: 'علائم', icon: '📋', description: 'علائم مشاهده شده را مشخص کنید' },
    { id: 'image', title: 'تصویر', icon: '📷', description: 'عکس حیوان را آپلود کنید' },
    { id: 'result', title: 'تشخیص', icon: '🔍', description: 'نتیجه تحلیل هوش مصنوعی' },
    { id: 'treatment', title: 'درمان', icon: '💊', description: 'طرح درمان پیشنهادی' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNextStep = () => {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      if (currentStep === 'image') {
        // شروع آنالیز هوش مصنوعی
        setIsAnalyzing(true);
        setCurrentStep('result');
        
        // شبیه‌سازی پردازش هوش مصنوعی
        const interval = setInterval(() => {
          setAiProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsAnalyzing(false);
              return 100;
            }
            return prev + 10;
          });
        }, 300);
      } else {
        setCurrentStep(nextStep.id as DiagnosisStep);
      }
    }
  };

  const handlePrevStep = () => {
    const prevStep = steps[currentStepIndex - 1];
    if (prevStep) {
      setCurrentStep(prevStep.id as DiagnosisStep);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleStartOver = () => {
    setSelectedAnimal('');
    setSelectedSymptoms([]);
    setUploadedImage(null);
    setIsAnalyzing(false);
    setAiProgress(0);
    setCurrentStep('animal');
  };

  const handleEmergencyCall = () => {
    alert('🆘 در حال اتصال به نزدیک‌ترین کلینیک دامپزشکی...\n\nلطفا منتظر بمانید یا با شماره ۱۲۳۴ تماس بگیرید.');
  };

  // افکت‌های پس‌زمینه
  useEffect(() => {
    const particles = document.createElement('div');
    particles.className = 'fixed inset-0 pointer-events-none z-0';
    particles.innerHTML = Array.from({ length: 20 }, (_, i) => `
      <div class="absolute w-1 h-1 bg-blue-500/20 rounded-full animate-pulse" 
           style="top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; 
                  animation-delay: ${i * 0.2}s;"></div>
    `).join('');
    document.body.appendChild(particles);

    return () => {
      document.body.removeChild(particles);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* هدر ویژه */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-700 shadow-2xl"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 space-x-reverse mb-4 md:mb-0">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
              </motion.div>
              
              <div>
                <h1 className="text-3xl font-bold text-white">تشخیص بیماری حیوانات</h1>
                <p className="text-blue-100">با پیشرفته‌ترین هوش مصنوعی دامپزشکی</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAIChat(!showAIChat)}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all border border-white/30 flex items-center space-x-2 space-x-reverse"
              >
                <Sparkles className="w-5 h-5" />
                <span>پرسش از هوش مصنوعی</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmergencyCall}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg flex items-center space-x-2 space-x-reverse"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">اورژانس</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* چت هوش مصنوعی */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-32 right-6 z-50 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">دستیار هوش مصنوعی</h3>
                    <p className="text-sm text-gray-500">برای پاسخگویی به سوالات شما</p>
                  </div>
                </div>
                <button onClick={() => setShowAIChat(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                <div className="flex justify-end">
                  <div className="bg-blue-100 text-gray-800 p-3 rounded-2xl rounded-tr-none max-w-xs">
                    علائم سگ من چیست؟
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-blue-50 to-white text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-xs border border-blue-100">
                    بر اساس علائم شما، احتمال سرماخوردگی یا عفونت تنفسی وجود دارد. لطفا علائم دقیق‌تر را وارد کنید.
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="text"
                  placeholder="سوال خود را بپرسید..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all">
                  ↵
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نوار مراحل */}
      <div className="container mx-auto px-6 py-8">
        <div className="relative">
          {/* خط پیشرفت */}
          <div className="absolute top-1/2 right-0 left-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            className="absolute top-1/2 right-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full -translate-y-1/2"
          />

          {/* مراحل */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col items-center relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentStep(step.id as DiagnosisStep)}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-110 shadow-blue-500/30'
                        : isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30'
                        : 'bg-white border-2 border-gray-300 shadow-gray-300/30'
                    }`}
                  >
                    <span className={`text-2xl ${
                      isActive || isCompleted ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.icon}
                    </span>
                    
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                  
                  <div className="text-center">
                    <h3 className={`font-bold mb-1 ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 max-w-[120px]">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
        >
          {/* هدر محتوا */}
          <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b p-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {steps[currentStepIndex]?.title}
                </h2>
                <p className="text-gray-600">{steps[currentStepIndex]?.description}</p>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                {currentStep === 'result' && isAnalyzing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </motion.div>
                )}
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    مرحله {currentStepIndex + 1} از {steps.length}
                  </div>
                  <div className="text-sm text-gray-500">پیشرفت کلی</div>
                </div>
              </div>
            </div>
          </div>

          {/* محتوای مرحله */}
          <div className="p-8">
            {currentStep === 'animal' && (
              <AnimalTypeSelector
                selectedType={selectedAnimal}
                onSelect={setSelectedAnimal}
              />
            )}

            {currentStep === 'symptoms' && (
              <SymptomSelector
                selectedSymptoms={selectedSymptoms}
                onSymptomsChange={setSelectedSymptoms}
              />
            )}

            {currentStep === 'image' && (
              <ImageUploader
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
              />
            )}

            {currentStep === 'result' && (
              <DiagnosisResult
                disease="عفونت تنفسی فوقانی (URI)"
                confidence={94}
                description="یک عفونت ویروسی یا باکتریایی که سیستم تنفسی فوقانی را درگیر می‌کند"
                urgency="medium"
                isLoading={isAnalyzing}
              />
            )}

            {currentStep === 'treatment' && (
              <TreatmentSuggestions />
            )}
          </div>

          {/* فوتر با دکمه‌ها */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-t p-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-4 space-x-reverse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartOver}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center space-x-2 space-x-reverse"
                >
                  <Home className="w-5 h-5" />
                  <span>شروع مجدد</span>
                </motion.button>
                
                <button className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-800">
                  <Download className="w-5 h-5" />
                  <span>ذخیره پیشرفت</span>
                </button>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                {currentStepIndex > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevStep}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center space-x-2 space-x-reverse"
                  >
                    <ChevronRight className="w-5 h-5" />
                    <span>مرحله قبل</span>
                  </motion.button>
                )}

                {currentStepIndex < steps.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 'animal' && !selectedAnimal) ||
                      (currentStep === 'symptoms' && selectedSymptoms.length === 0)
                    }
                    className={`px-8 py-3 rounded-xl transition-all flex items-center space-x-2 space-x-reverse ${
                      (currentStep === 'animal' && !selectedAnimal) ||
                      (currentStep === 'symptoms' && selectedSymptoms.length === 0)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <span>مرحله بعد</span>
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 space-x-reverse"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>اشتراک‌گذاری نتیجه</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* کارت‌های اطلاعات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 shadow-xl"
          >
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">دقت بالا</h3>
            </div>
            <p className="text-gray-600 mb-6">
              هوش مصنوعی ما با دقت ۹۴% بیماری‌ها را تشخیص می‌دهد
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border border-purple-100 shadow-xl"
          >
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">پشتیبانی ۲۴/۷</h3>
            </div>
            <p className="text-gray-600 mb-6">
              دستیار هوش مصنوعی همیشه برای پاسخگویی به سوالات شما آماده است
            </p>
            <div className="flex items-center space-x-2 space-x-reverse text-purple-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-medium">آنلاین</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-100 shadow-xl"
          >
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">اطمینان کامل</h3>
            </div>
            <p className="text-gray-600 mb-6">
              تمام اطلاعات شما رمزگذاری شده و محرمانه باقی می‌ماند
            </p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                🔒 SSL امن
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                GDPR
              </div>
            </div>
          </motion.div>
        </div>

        {/* افکت‌های بصری */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="fixed bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none z-0"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="fixed top-1/3 right-8 w-32 h-32 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full blur-3xl pointer-events-none z-0"
        />
      </div>

      {/* فوتر ویژه */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-gradient-to-r from-gray-900 to-black text-white py-12"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <Stethoscope className="w-10 h-10 text-blue-400" />
                <span className="text-2xl font-bold">VetAI</span>
              </div>
              <p className="text-gray-400">پیشرفته‌ترین سیستم تشخیص بیماری حیوانات با هوش مصنوعی</p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="flex items-center space-x-6 space-x-reverse">
                <button className="text-gray-400 hover:text-white transition-colors">قوانین</button>
                <button className="text-gray-400 hover:text-white transition-colors">حریم خصوصی</button>
                <button className="text-gray-400 hover:text-white transition-colors">تماس با ما</button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                  دانلود اپ
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © ۲۰۲۴ VetAI - تمام حقوق محفوظ است. این سیستم جایگزین تشخیص دامپزشک نیست.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DiagnosisPage;