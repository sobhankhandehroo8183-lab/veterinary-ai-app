export const animalsData = [
  {
    id: '1',
    name: 'کیکا',
    type: 'dog',
    breed: 'پامرانین',
    age: 3,
    weight: 2.5,
    gender: 'female',
    status: 'healthy',
    lastCheckup: '۱۴۰۲/۱۰/۱۵',
    nextCheckup: '۱۴۰۲/۱۱/۱۵',
    ownerName: 'سارا محمدی',
    ownerPhone: '۰۹۱۲۱۲۳۴۵۶۷',
    color: 'قهوه‌ای و سفید',
    microchip: '123456789012345',
    images: ['/dog1.jpg', '/dog2.jpg'],
    medicalHistory: [
      {
        id: 'm1',
        date: '۱۴۰۲/۰۹/۲۰',
        diagnosis: 'عفونت گوش',
        treatment: 'قطرۀ گوش آنتی‌بیوتیک',
        veterinarian: 'دکتر رضایی',
        notes: 'پس از ۵ روز بهبود کامل یافت'
      }
    ],
    medications: [
      {
        id: 'med1',
        name: 'قرص ضد انگل',
        dosage: '۱ قرص',
        frequency: 'ماهانه',
        startDate: '۱۴۰۲/۱۰/۰۱',
        endDate: '۱۴۰۳/۰۹/۳۰',
        status: 'active'
      }
    ]
  },
  {
    id: '2',
    name: 'میسی',
    type: 'cat',
    breed: 'پرشین',
    age: 2,
    weight: 3.8,
    gender: 'male',
    status: 'recovering',
    lastCheckup: '۱۴۰۲/۱۰/۲۰',
    nextCheckup: '۱۴۰۲/۱۱/۱۰',
    ownerName: 'علی کریمی',
    ownerPhone: '۰۹۳۵۵۵۶۶۷۷',
    color: 'سفید',
    insuranceNumber: 'INS-789456',
    images: ['/cat1.jpg'],
    medicalHistory: [
      {
        id: 'm2',
        date: '۱۴۰۲/۱۰/۱۸',
        diagnosis: 'عفونت ادراری',
        treatment: 'آنتی‌بیوتیک و مایع‌درمانی',
        veterinarian: 'دکتر احمدی',
        notes: 'نیاز به پیگیری هفتگی'
      }
    ],
    medications: [
      {
        id: 'med2',
        name: 'آموکسی‌سیلین',
        dosage: '۵۰ میلی‌گرم',
        frequency: 'هر ۱۲ ساعت',
        startDate: '۱۴۰۲/۱۰/۲۰',
        endDate: '۱۴۰۲/۱۰/۲۷',
        status: 'active'
      }
    ]
  },
  {
    id: '3',
    name: 'هپی',
    type: 'rabbit',
    breed: 'هلندی',
    age: 1,
    weight: 1.2,
    gender: 'female',
    status: 'healthy',
    lastCheckup: '۱۴۰۲/۱۰/۱۰',
    nextCheckup: '۱۴۰۳/۰۱/۱۰',
    ownerName: 'نازنین جعفری',
    ownerPhone: '۰۹۱۸۷۶۵۴۳۲',
    color: 'سفید و سیاه',
    images: ['/rabbit1.jpg', '/rabbit2.jpg'],
    medicalHistory: [],
    medications: []
  },
  {
    id: '4',
    name: 'جیجی',
    type: 'bird',
    breed: 'مرغ عشق',
    age: 2,
    weight: 0.05,
    gender: 'male',
    status: 'sick',
    lastCheckup: '۱۴۰۲/۱۰/۲۵',
    ownerName: 'رضا محمودی',
    ownerPhone: '۰۹۰۲۲۲۳۳۴۴',
    color: 'آبی و سبز',
    images: ['/bird1.jpg'],
    medicalHistory: [
      {
        id: 'm3',
        date: '۱۴۰۲/۱۰/۲۲',
        diagnosis: 'سرماخوردگی',
        treatment: 'قطره بینی و ویتامین',
        veterinarian: 'دکتر نوروزی',
        notes: 'حالت ضعف عمومی دارد'
      }
    ],
    medications: [
      {
        id: 'med3',
        name: 'ویتامین AD3E',
        dosage: '۲ قطره',
        frequency: 'روزانه',
        startDate: '۱۴۰۲/۱۰/۲۳',
        endDate: '۱۴۰۲/۱۱/۰۷',
        status: 'active'
      }
    ]
  },
  {
    id: '5',
    name: 'رکس',
    type: 'dog',
    breed: 'ژرمن شپرد',
    age: 4,
    weight: 35,
    gender: 'male',
    status: 'critical',
    lastCheckup: '۱۴۰۲/۱۰/۲۲',
    nextCheckup: '۱۴۰۲/۱۰/۲۹',
    ownerName: 'محسن علیزاده',
    ownerPhone: '۰۹۳۷۷۷۸۸۹۹',
    color: 'مشکی و قهوه‌ای',
    microchip: '987654321098765',
    insuranceNumber: 'INS-123987',
    images: ['/dog3.jpg'],
    medicalHistory: [
      {
        id: 'm4',
        date: '۱۴۰۲/۱۰/۲۰',
        diagnosis: 'شکستگی پای عقب',
        treatment: 'جراحی و گچ‌گیری',
        veterinarian: 'دکتر امینی',
        notes: 'نیاز به استراحت مطلق'
      }
    ],
    medications: [
      {
        id: 'med4',
        name: 'مسکن قوی',
        dosage: '۱ قرص',
        frequency: 'هر ۸ ساعت',
        startDate: '۱۴۰۲/۱۰/۲۱',
        endDate: '۱۴۰۲/۱۰/۲۸',
        status: 'active'
      },
      {
        id: 'med5',
        name: 'آنتی‌بیوتیک',
        dosage: '۱۰۰ میلی‌گرم',
        frequency: 'هر ۱۲ ساعت',
        startDate: '۱۴۰۲/۱۰/۲۱',
        endDate: '۱۴۰۲/۱۱/۰۴',
        status: 'active'
      }
    ]
  }
];

export const animalStats = {
  total: 42,
  dogs: 18,
  cats: 12,
  rabbits: 6,
  birds: 4,
  others: 2,
  healthy: 28,
  sick: 8,
  recovering: 4,
  critical: 2
};