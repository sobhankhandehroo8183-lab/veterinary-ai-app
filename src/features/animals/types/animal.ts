export interface Animal {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'; // نوع حیوان
  breed: string;
  age: number;
  weight: number;
  gender: 'male' | 'female'; // جنسیت
  status: 'healthy' | 'sick' | 'recovering' | 'critical'; // وضعیت سلامت
  lastCheckup: string;
  nextCheckup?: string;
  ownerName: string;
  ownerPhone: string;
  medicalHistory: MedicalRecord[]; // اجباری، حتی اگر خالی باشد []
  medications: Medication[];       // اجباری، حتی اگر خالی باشد []
  images: string[];                // اجباری، حتی اگر خالی باشد []
  color?: string;
  microchip?: string;
  insuranceNumber?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  notes?: string;
  attachments?: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'missed';
}
