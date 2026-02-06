export interface Animal {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed?: string;
  age: number;
  weight?: number;
  gender: 'male' | 'female';
}

export interface Symptom {
  id: string;
  name: string;
  category: 'general' | 'digestive' | 'respiratory' | 'skin' | 'neurological';
  severity: 'mild' | 'moderate' | 'severe';
}

export interface DiagnosisResult {
  disease: string;
  confidence: number;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  recommendedActions: string[];
}

export interface Treatment {
  id: string;
  name: string;
  type: 'medication' | 'therapy' | 'surgery' | 'diet';
  dosage?: string;
  duration?: string;
  instructions: string[];
}