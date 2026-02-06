import React from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, Rabbit, Bird, MoreVertical, Activity, CheckCircle, Clock } from 'lucide-react';

const animals = [
  { id: 1, name: 'کیکا', type: 'سگ', breed: 'پامرانین', age: 3, status: 'سالم', lastVisit: '۱۴۰۲/۱۰/۱۵', icon: Dog, color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'میسی', type: 'گربه', breed: 'پرشین', age: 2, status: 'درمان', lastVisit: '۱۴۰۲/۱۰/۲۰', icon: Cat, color: 'bg-purple-100 text-purple-600' },
  { id: 3, name: 'هپی', type: 'خرگوش', breed: 'هلندی', age: 1, status: 'سالم', lastVisit: '۱۴۰۲/۱۰/۱۰', icon: Rabbit, color: 'bg-pink-100 text-pink-600' },
  { id: 4, name: 'جیجی', type: 'پرنده', breed: 'مرغ عشق', age: 2, status: 'درمان', lastVisit: '۱۴۰۲/۱۰/۱۸', icon: Bird, color: 'bg-green-100 text-green-600' },
  { id: 5, name: 'رکس', type: 'سگ', breed: 'ژرمن شپرد', age: 4, status: 'سالم', lastVisit: '۱۴۰۲/۱۰/۲۲', icon: Dog, color: 'bg-blue-100 text-blue-600' },
];

const AnimalTable: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'سالم': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'درمان': return <Activity className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-4 px-6 text-gray-500 font-semibold">حیوان</th>
              <th className="text-right py-4 px-6 text-gray-500 font-semibold">نژاد</th>
              <th className="text-right py-4 px-6 text-gray-500 font-semibold">سن</th>
              <th className="text-right py-4 px-6 text-gray-500 font-semibold">وضعیت</th>
              <th className="text-right py-4 px-6 text-gray-500 font-semibold">آخرین ویزیت</th>
              <th className="text-right py-4 px-6 text-gray-500 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
              <motion.tr
                key={animal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`p-2 rounded-lg ${animal.color}`}>
                      <animal.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{animal.name}</p>
                      <p className="text-sm text-gray-500">{animal.type}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-700">{animal.breed}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-700">{animal.age} سال</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusIcon(animal.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      animal.status === 'سالم' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {animal.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-700">{animal.lastVisit}</span>
                </td>
                <td className="py-4 px-6">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimalTable;