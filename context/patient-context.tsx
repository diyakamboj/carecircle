import { createContext, useContext, ReactNode } from 'react';

export interface CareProvider {
  name: string;
  specialty: string;
  id: string;
}

export interface PatientProfile {
  name: string;
  profileImage?: string;
  pregnancyWeek: number;
  totalWeeks: number;
  primaryDoctor: CareProvider;
  primaryHospital: {
    name: string;
    location: string;
  };
  pregnancyCount: number;
  birthType: string[];
  currentMedications: string[];
  medicalConditions: string[];
  careProviders: CareProvider[];
  prescriptions: {
    total: number;
    lastUpdated: string;
  };
  labReports: {
    total: number;
    lastUpdated: string;
  };
}

// Mock data for development
const mockPatientData: PatientProfile = {
  name: "Sarah Johnson",
  profileImage: "https://ui-avatars.com/api/?name=Sarah+Johnson",
  pregnancyWeek: 28,
  totalWeeks: 40,
  primaryDoctor: {
    name: "Dr. Emily Chen",
    specialty: "OB/GYN",
    id: "doc-001"
  },
  primaryHospital: {
    name: "City General Hospital",
    location: "Downtown Medical District"
  },
  pregnancyCount: 1,
  birthType: ["Natural Birth Planned"],
  currentMedications: ["Prenatal Vitamins", "Iron Supplements"],
  medicalConditions: ["Gestational Diabetes (Controlled)"],
  careProviders: [
    {
      name: "Dr. Emily Chen",
      specialty: "OB/GYN",
      id: "doc-001"
    },
    {
      name: "Dr. Michael Ross",
      specialty: "Endocrinologist",
      id: "doc-002"
    },
    {
      name: "Sarah Wilson",
      specialty: "Nutritionist",
      id: "doc-003"
    }
  ],
  prescriptions: {
    total: 3,
    lastUpdated: "2024-03-15"
  },
  labReports: {
    total: 5,
    lastUpdated: "2024-03-10"
  }
};

const PatientContext = createContext<PatientProfile | null>(null);

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}

export function PatientProvider({ children }: { children: ReactNode }) {
  // In a real app, you would fetch this data from your backend
  return (
    <PatientContext.Provider value={mockPatientData}>
      {children}
    </PatientContext.Provider>
  );
} 