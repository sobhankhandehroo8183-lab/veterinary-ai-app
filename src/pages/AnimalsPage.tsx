import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  RefreshCw,
  Calendar,
  Bell,
  Grid,
  List,
  MoreVertical,
  Dog,
  Cat,
  Rabbit,
  Bird,
  TrendingUp,
  AlertTriangle,
  Heart,
  Activity,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

// کامپوننت‌های ما
import AnimalCard from '../features/animals/components/AnimalCard';
import AnimalModal from '../features/animals/components/AnimalModal';
import AnimalStats from '../features/animals/components/AnimalStats';
import HealthChart from '../features/animals/components/HealthChart';

// داده‌های تست
import { animalsData, animalStats } from '../features/animals/utils/animalsData';
import { Animal } from '../features/animals/types/animal';

const AnimalsPage: React.FC = () => {
  // Stateها
  const [animals, setAnimals] = useState<Animal[]>(animalsData as Animal[]);
const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(animalsData as Animal[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // فیلترها
  const animalTypes = ['all', 'dog', 'cat', 'rabbit', 'bird', 'other'];
  const statusTypes = ['all', 'healthy', 'sick', 'recovering', 'critical'];

  // داده‌های نمودار
  const chartData = [
    { month: 'فروردین', healthy: 24, sick: 8, recovering: 4 },
    { month: 'اردیبهشت', healthy: 26, sick: 6, recovering: 3 },
    { month: 'خرداد', healthy: 28, sick: 4, recovering: 2 },
    { month: 'تیر', healthy: 25, sick: 7, recovering: 3 },
    { month: 'مرداد', healthy: 30, sick: 5, recovering: 1 },
    { month: 'شهریور', healthy: 32, sick: 3, recovering: 2 },
  ];

  // اعمال فیلترها
  useEffect(() => {
    let result = animals;

    // فیلتر جستجو
    if (searchTerm) {
      result = result.filter(animal =>
        animal.name.includes(searchTerm) ||
        animal.breed.includes(searchTerm) ||
        animal.ownerName.includes(searchTerm)
      );
    }

    // فیلتر نوع حیوان
    if (selectedType !== 'all') {
      result = result.filter(animal => animal.type === selectedType);
    }

    // فیلتر وضعیت
    if (selectedStatus !== 'all') {
      result = result.filter(animal => animal.status === selectedStatus);
    }

    // مرتب‌سازی
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastCheckup).getTime() - new Date(a.lastCheckup).getTime();
        case 'oldest':
          return new Date(a.lastCheckup).getTime() - new Date(b.lastCheckup).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredAnimals(result);
    setCurrentPage(1);
  }, [animals, searchTerm, selectedType, selectedStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimals = filteredAnimals.slice(startIndex, endIndex);

  // Handlers
  const handleAddAnimal = () => {
    setModalMode('add');
    setSelectedAnimal(null);
    setIsModalOpen(true);
  };

  const handleEditAnimal = (animal: Animal) => {
    setModalMode('edit');
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const handleDeleteAnimal = (id: string) => {
    if (window.confirm('آیا از حذف این حیوان مطمئن هستید؟')) {
      setAnimals(prev => prev.filter(animal => animal.id !== id));
    }
  };

  const handleViewDetails = (animal: Animal) => {
    alert(`جزئیات ${animal.name}:\n\nنوع: ${animal.type}\nنژاد: ${animal.breed}\nسن: ${animal.age} سال\nوضعیت: ${animal.status}`);
  };

  const handleSaveAnimal = (animalData: Partial<Animal>) => {
    if (modalMode === 'add') {
      const newAnimal: Animal = {
        ...animalData as Animal,
        id: Date.now().toString(),
        medicalHistory: [],
        medications: [],
        images: [],
        lastCheckup: new Date().toLocaleDateString('fa-IR')
      };
      setAnimals(prev => [...prev, newAnimal]);
    } else if (selectedAnimal) {
      setAnimals(prev => prev.map(animal => 
        animal.id === selectedAnimal.id 
          ? { ...animal, ...animalData }
          : animal
      ));
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedStatus('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* هدر ویژه */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gradient-to-r from-green-600 to-emerald-700 shadow-2xl"
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Users className="w-10 h-10 text-green-600" />
                  </div>
                </motion.div>
                
                <div>
                  <h1 className="text-4xl font-bold text-white">مدیریت حیوانات</h1>
                  <p className="text-green-100">مدیریت کامل اطلاعات حیوانات خانگی شما</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white">
                  <span className="font-bold">{animals.length}</span> حیوان ثبت شده
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white">
                  <span className="font-bold">{animalStats.healthy}</span> حیوان سالم
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white">
                  <span className="font-bold">{animalStats.sick + animalStats.critical}</span> نیاز به توجه
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddAnimal}
                className="px-8 py-3 bg-gradient-to-r from-white to-gray-100 text-green-700 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all shadow-lg flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">افزودن حیوان جدید</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">گزارش کامل</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* نوار فیلتر و جستجو */}
      <div className="container mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* جستجو */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام، نژاد یا صاحب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* فیلترها */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="all">همه انواع</option>
                  <option value="dog">سگ</option>
                  <option value="cat">گربه</option>
                  <option value="rabbit">خرگوش</option>
                  <option value="bird">پرنده</option>
                  <option value="other">سایر</option>
                </select>
              </div>

              <div className="relative">
                <Activity className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="healthy">سالم</option>
                  <option value="sick">بیمار</option>
                  <option value="recovering">در حال بهبود</option>
                  <option value="critical">بحرانی</option>
                </select>
              </div>

              <div className="relative">
                <TrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                  <option value="name">بر اساس نام</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={handleClearFilters}
                  className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* خلاصه فیلترها */}
          <AnimatePresence>
            {(searchTerm || selectedType !== 'all' || selectedStatus !== 'all') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="font-medium text-green-800">فیلترهای فعال:</span>
                    
                    {searchTerm && (
                      <span className="px-3 py-1 bg-white border border-green-300 text-green-700 rounded-full text-sm">
                        جستجو: {searchTerm}
                      </span>
                    )}
                    
                    {selectedType !== 'all' && (
                      <span className="px-3 py-1 bg-white border border-green-300 text-green-700 rounded-full text-sm">
                        نوع: {selectedType === 'dog' ? 'سگ' : 
                               selectedType === 'cat' ? 'گربه' : 
                               selectedType === 'rabbit' ? 'خرگوش' : 
                               selectedType === 'bird' ? 'پرنده' : 'سایر'}
                      </span>
                    )}
                    
                    {selectedStatus !== 'all' && (
                      <span className="px-3 py-1 bg-white border border-green-300 text-green-700 rounded-full text-sm">
                        وضعیت: {selectedStatus === 'healthy' ? 'سالم' : 
                                selectedStatus === 'sick' ? 'بیمار' : 
                                selectedStatus === 'recovering' ? 'در حال بهبود' : 'بحرانی'}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={handleClearFilters}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    حذف همه فیلترها
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* آمار و نمودار */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* آمار */}
          <div className="lg:col-span-2">
            <AnimalStats stats={animalStats} />
          </div>

          {/* نمودار سلامت */}
          <div>
            <HealthChart data={chartData} />
          </div>
        </div>
      </div>

      {/* لیست حیوانات */}
      <div className="container mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">حیوانات ثبت شده</h2>
              <p className="text-gray-600">
                نمایش {currentAnimals.length} از {filteredAnimals.length} حیوان
              </p>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* کارت‌های حیوانات */}
          {filteredAnimals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">حیوانی یافت نشد</h3>
              <p className="text-gray-600 mb-6">با تغییر فیلترها دوباره تلاش کنید</p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'} gap-6`}>
                {currentAnimals.map((animal) => (
                  <AnimalCard
                    key={animal.id}
                    animal={animal}
                    onEdit={handleEditAnimal}
                    onDelete={handleDeleteAnimal}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 space-x-reverse mt-12 pt-8 border-t">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-xl ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-xl font-medium ${
                            currentPage === pageNum
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && (
                      <span className="px-3 text-gray-500">...</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-xl ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* فوتر */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">آیا نیاز به کمک دارید؟</h3>
              <p className="text-gray-300">تیم پشتیبانی ما ۲۴/۷ آماده پاسخگویی است</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center space-x-2 space-x-reverse">
                <span className="font-semibold">درخواست مشاوره</span>
                <Calendar className="w-5 h-5" />
              </button>
              
              <button className="px-8 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 space-x-reverse">
                <span className="font-semibold">تماس با پشتیبانی</span>
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAnimal}
        animal={selectedAnimal}
        mode={modalMode}
      />

      {/* افکت‌های بصری */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="fixed bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none z-0"
      />
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="fixed top-1/3 right-8 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none z-0"
      />
    </div>
  );
};

export default AnimalsPage;