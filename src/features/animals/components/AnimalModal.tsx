import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  Upload, 
  Dog, 
  Cat, 
  Rabbit, 
  Bird, 
  Plus,
  Save,
  Calendar,
  Scale,
  User,
  Phone,
  AlertCircle
} from 'lucide-react';
import { Animal } from '../types/animal';

interface AnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animal: Partial<Animal>) => void;
  animal?: Animal | null;
  mode: 'add' | 'edit';
}

const AnimalModal: React.FC<AnimalModalProps> = ({ isOpen, onClose, onSave, animal, mode }) => {
  const [formData, setFormData] = useState<Partial<Animal>>(
    animal || {
      name: '',
      type: 'dog',
      breed: '',
      age: 1,
      weight: 1,
      gender: 'male',
      status: 'healthy',
      ownerName: '',
      ownerPhone: '',
      color: '',
      microchip: '',
      insuranceNumber: ''
    }
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const animalTypes = [
    { value: 'dog', label: 'سگ', icon: Dog },
    { value: 'cat', label: 'گربه', icon: Cat },
    { value: 'rabbit', label: 'خرگوش', icon: Rabbit },
    { value: 'bird', label: 'پرنده', icon: Bird },
    { value: 'other', label: 'سایر', icon: Dog }
  ];

  const breedsByType = {
    dog: ['پامرانین', 'ژرمن شپرد', 'گلدن رتریور', 'پودل', 'تریر', 'هاسکی', 'بولداگ'],
    cat: ['پرشین', 'سیامی', 'مین کون', 'اسکاتیش فولد', 'بریتیش', 'حیاطی'],
    rabbit: ['هلندی', 'لپ آیر', 'مینی لوپ', 'رکس', 'آنگورا'],
    bird: ['مرغ عشق', 'قناری', 'طوطی', 'کاسکو', 'ماکائو'],
    other: ['همستر', 'خوکچه هندی', 'ایگوانا', 'مار']
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-white/50 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* هدر مدال */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {mode === 'add' ? 'افزودن حیوان جدید' : 'ویرایش اطلاعات حیوان'}
                    </h2>
                    <p className="opacity-90">
                      {mode === 'add' ? 'اطلاعات حیوان جدید را وارد کنید' : 'اطلاعات حیوان را ویرایش کنید'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* محتوای مدال */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* ستون چپ */}
                    <div className="space-y-6">
                      {/* آپلود تصویر */}
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                          <Camera className="w-5 h-5 ml-2" />
                          تصویر حیوان
                        </h3>
                        <div className="flex flex-col items-center">
                          <div 
                            onClick={() => document.getElementById('imageUpload')?.click()}
                            className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors mb-4 bg-gray-50"
                          >
                            {selectedImage ? (
                              <img 
                                src={selectedImage} 
                                alt="Preview" 
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            ) : (
                              <div className="text-center">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500">برای آپلود کلیک کنید</p>
                              </div>
                            )}
                          </div>
                          <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById('imageUpload')?.click()}
                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            انتخاب تصویر
                          </button>
                        </div>
                      </div>

                      {/* اطلاعات پایه */}
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border">
                        <h3 className="font-semibold text-gray-800 mb-4">اطلاعات پایه</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              نام حیوان *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              نوع حیوان *
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                              {animalTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                  <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                                    className={`p-3 rounded-xl border-2 flex flex-col items-center ${
                                      formData.type === type.value
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <Icon className={`w-5 h-5 mb-2 ${
                                      formData.type === type.value ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                    <span className="text-xs">{type.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              نژاد *
                            </label>
                            <select
                              name="breed"
                              value={formData.breed}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            >
                              <option value="">انتخاب نژاد</option>
                              {breedsByType[formData.type as keyof typeof breedsByType]?.map(breed => (
                                <option key={breed} value={breed}>{breed}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ستون راست */}
                    <div className="space-y-6">
                      {/* اطلاعات سلامت */}
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border">
                        <h3 className="font-semibold text-gray-800 mb-4">اطلاعات سلامت</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 ml-1" />
                                سن (سال) *
                              </span>
                            </label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleInputChange}
                              min="0"
                              max="50"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <span className="flex items-center">
                                <Scale className="w-4 h-4 ml-1" />
                                وزن (کیلوگرم) *
                              </span>
                            </label>
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleInputChange}
                              min="0"
                              step="0.1"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              جنسیت *
                            </label>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            >
                              <option value="male">نر</option>
                              <option value="female">ماده</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              وضعیت سلامت *
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            >
                              <option value="healthy">سالم</option>
                              <option value="sick">بیمار</option>
                              <option value="recovering">در حال بهبود</option>
                              <option value="critical">وضعیت بحرانی</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* اطلاعات مالک */}
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border">
                        <h3 className="font-semibold text-gray-800 mb-4">اطلاعات مالک</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <span className="flex items-center">
                                <User className="w-4 h-4 ml-1" />
                                نام مالک *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="ownerName"
                              value={formData.ownerName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 ml-1" />
                                شماره تماس *
                              </span>
                            </label>
                            <input
                              type="tel"
                              name="ownerPhone"
                              value={formData.ownerPhone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              رنگ حیوان
                            </label>
                            <input
                              type="text"
                              name="color"
                              value={formData.color}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* اطلاعات اضافی */}
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border">
                        <h3 className="font-semibold text-gray-800 mb-4">اطلاعات اضافی</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              شماره میکروچیپ
                            </label>
                            <input
                              type="text"
                              name="microchip"
                              value={formData.microchip}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              شماره بیمه
                            </label>
                            <input
                              type="text"
                              name="insuranceNumber"
                              value={formData.insuranceNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* نکات مهم */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-800 mb-1">توجه مهم</h4>
                        <p className="text-orange-700 text-sm">
                          تمامی اطلاعات وارد شده صحیح بوده و مسئولیت درستی آن‌ها بر عهده شماست.
                          در صورت نیاز به کمک با پشتیبانی تماس بگیرید.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* دکمه‌های اقدام */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      انصراف
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 space-x-reverse"
                    >
                      {mode === 'add' ? (
                        <>
                          <Plus className="w-5 h-5" />
                          <span>افزودن حیوان</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>ذخیره تغییرات</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimalModal;