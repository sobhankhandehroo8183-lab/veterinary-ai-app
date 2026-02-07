import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dog, Cat, Rabbit, Bird, MoreVertical, Activity, 
  Heart, AlertTriangle, CheckCircle, Calendar, Phone, 
  Edit, Trash2, Camera, Share2, Star, Weight, User 
} from 'lucide-react';

// استفاده از تایپ اصلی Animal
import { Animal } from '../types/animal';

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
  onViewDetails: (animal: Animal) => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onEdit, onDelete, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getAnimalIcon = () => {
    switch (animal.type) {
      case 'dog': return <Dog className="w-6 h-6" />;
      case 'cat': return <Cat className="w-6 h-6" />;
      case 'rabbit': return <Rabbit className="w-6 h-6" />;
      case 'bird': return <Bird className="w-6 h-6" />;
      default: return <Dog className="w-6 h-6" />;
    }
  };

  const getStatusConfig = () => {
    switch (animal.status) {
      case 'healthy':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'سالم' };
      case 'sick':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Activity, label: 'بیمار' };
      case 'recovering':
        return { color: 'bg-blue-100 text-blue-800', icon: Heart, label: 'در حال بهبود' };
      case 'critical':
        return { color: 'bg-red-100 text-red-800', icon: AlertTriangle, label: 'وضعیت بحرانی' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Activity, label: 'نامشخص' };
    }
  };

  const getGenderIcon = () => {
    // اگر gender در تایپ Animal وجود ندارد، یک مقدار پیش‌فرض برگردانید
    return (animal as any).gender === 'male' ? '♂' : '♀';
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* افکت‌های ویژه */}
      {isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-md"
          />
        </>
      )}

      {/* کارت اصلی */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* هدر کارت */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`p-3 rounded-xl ${
                animal.type === 'dog' ? 'bg-blue-100 text-blue-600' :
                animal.type === 'cat' ? 'bg-purple-100 text-purple-600' :
                animal.type === 'rabbit' ? 'bg-pink-100 text-pink-600' :
                'bg-green-100 text-green-600'
              }`}>
                {getAnimalIcon()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  {animal.name}
                  <span className="mr-2 text-lg">{getGenderIcon()}</span>
                </h3>
                <p className="text-gray-600">{animal.breed}</p>
              </div>
            </div>

            {/* منو اقدامات */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>

              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                >
                  <button
                    onClick={() => onViewDetails(animal)}
                    className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>مشاهده جزئیات</span>
                    <Activity className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(animal)}
                    className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>ویرایش</span>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(animal.id)}
                    className="w-full text-right px-4 py-3 hover:bg-red-50 text-red-600 flex items-center justify-between"
                  >
                    <span>حذف</span>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* وضعیت */}
          <div className="mb-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${statusConfig.color}`}>
              <StatusIcon className="w-4 h-4 ml-2" />
              <span className="font-medium">{statusConfig.label}</span>
            </div>
          </div>

          {/* اطلاعات حیوان */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{animal.age} سال</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
              <Weight className="w-4 h-4" />
              <span className="text-sm">{animal.weight} کیلوگرم</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm truncate">{animal.ownerName}</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{animal.ownerPhone}</span>
            </div>
          </div>

          {/* تاریخ ویزیت */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">آخرین ویزیت</p>
                <p className="font-medium">{animal.lastCheckup}</p>
              </div>
              {animal.nextCheckup && (
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-1">ویزیت بعدی</p>
                  <p className="font-medium text-blue-600">{animal.nextCheckup}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* فوتر کارت */}
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Star className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewDetails(animal)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium"
            >
              مشاهده کامل
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimalCard;