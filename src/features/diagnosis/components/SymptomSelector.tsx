import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { symptomsData } from '../utils/symptomsData';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onSymptomsChange: (symptoms: string[]) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ selectedSymptoms, onSymptomsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'همه علائم' },
    { id: 'general', name: 'علائم عمومی' },
    { id: 'digestive', name: 'گوارشی' },
    { id: 'respiratory', name: 'تنفسی' },
    { id: 'skin', name: 'پوستی' },
    { id: 'neurological', name: 'عصبی' },
  ];

  const filteredSymptoms = symptomsData.filter(symptom => {
    const matchesSearch = symptom.name.includes(searchTerm) || symptom.id.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      onSymptomsChange(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      onSymptomsChange([...selectedSymptoms, symptomId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">علائم مشاهده شده</h3>
        <p className="text-gray-600">علائم حیوان خود را انتخاب کنید</p>
      </div>

      {/* جستجو و فیلتر */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در علائم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* نمایش علائم انتخاب شده */}
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-blue-50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-blue-800">
                {selectedSymptoms.length} علامت انتخاب شده
              </span>
              <button
                onClick={() => onSymptomsChange([])}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                پاک کردن همه
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptomId => {
                const symptom = symptomsData.find(s => s.id === symptomId);
                return symptom ? (
                  <motion.span
                    key={symptomId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-blue-200 rounded-full text-blue-700"
                  >
                    <span className="ml-2">{symptom.icon}</span>
                    {symptom.name}
                    <button
                      onClick={() => toggleSymptom(symptomId)}
                      className="mr-2 text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </motion.span>
                ) : null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* لیست علائم */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSymptoms.map((symptom, index) => (
          <motion.button
            key={symptom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            onClick={() => toggleSymptom(symptom.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-right ${
              selectedSymptoms.includes(symptom.id)
                ? 'border-blue-500 bg-blue-50 shadow-lg transform -translate-y-1'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{symptom.icon}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedSymptoms.includes(symptom.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedSymptoms.includes(symptom.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="font-medium text-gray-800">{symptom.name}</div>
            <div className="text-sm text-gray-500 mt-1">
              {symptom.category === 'general' && 'عمومی'}
              {symptom.category === 'digestive' && 'گوارشی'}
              {symptom.category === 'respiratory' && 'تنفسی'}
              {symptom.category === 'skin' && 'پوستی'}
              {symptom.category === 'neurological' && 'عصبی'}
            </div>
          </motion.button>
        ))}
      </div>

      {filteredSymptoms.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          هیچ علامتی با جستجوی شما یافت نشد
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;