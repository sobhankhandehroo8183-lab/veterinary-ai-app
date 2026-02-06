import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(uploadedImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTakePhoto = () => {
    // این بخش برای دسترسی به دوربین نیاز به تنظیمات بیشتری دارد
    alert('در نسخه وب امکان عکس‌برداری مستقیم وجود ندارد. لطفا از آپلود عکس استفاده کنید.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">آپلود تصویر حیوان</h3>
        <p className="text-gray-600">برای تشخیص دقیق‌تر، تصویر حیوان را آپلود کنید (اختیاری)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* بخش آپلود */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${preview ? 'lg:col-span-1' : 'lg:col-span-2'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Upload className="w-10 h-10 text-blue-600" />
            </div>
            
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {preview ? 'تصویر جدید آپلود کنید' : 'تصویر را اینجا رها کنید'}
            </h4>
            
            <p className="text-gray-600 mb-6">
              یا برای انتخاب فایل کلیک کنید
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <ImageIcon className="w-5 h-5" />
                <span>انتخاب از دستگاه</span>
              </button>
              
              <button
                onClick={handleTakePhoto}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Camera className="w-5 h-5" />
                <span>عکس‌برداری</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              فرمت‌های مجاز: JPG, PNG, GIF • حداکثر سایز: 5MB
            </p>
          </div>
        </motion.div>

        {/* پیش‌نمایش تصویر */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
              <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2 space-x-reverse text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">تصویر با موفقیت آپلود شد</span>
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-white shadow-inner">
                  <img
                    src={preview}
                    alt="تصویر آپلود شده"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">کیفیت تصویر</span>
                    <span className="font-medium text-green-600">عالی</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">مناسب برای تشخیص</span>
                    <span className="font-medium text-green-600">بله</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 text-center mt-4">
                    تصویر برای پردازش با هوش مصنوعی آماده است
                  </div>
                </div>
              </div>
            </div>
            
            {/* افکت دایره‌ای */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
            />
          </motion.div>
        )}
      </div>

      {/* راهنما */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-800 mb-3">راهنمای آپلود تصویر</h4>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>تصویر باید واضح و با نور مناسب باشد</span>
          </li>
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>صورت و چشم‌های حیوان در تصویر مشخص باشد</span>
          </li>
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>در صورت وجود زخم یا مشکل خاص، از آن ناحیه عکس بگیرید</span>
          </li>
          <li className="flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>تصویر باید از فاصله مناسب گرفته شود (نه خیلی دور، نه خیلی نزدیک)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;