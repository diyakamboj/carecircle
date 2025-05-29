export interface CareProvider {
  id: string;
  name: string;
  specialty: string;
  profileImage?: string;
}

export interface Prescription {
  id: string;
  medicationName: string;
  prescribedBy: string;
  date: string;
  dosage: string;
  notes?: string;
}

export interface LabReport {
  id: string;
  fileName: string;
  uploadedBy: string;
  date: string;
  notes?: string;
  fileUrl: string;
}

export interface PatientProfile {
  name: string;
  profileImage?: string;
  currentWeek: number;
  totalWeeks: number;
  primaryDoctor: CareProvider;
  primaryHospital: {
    name: string;
    address: string;
  };
  pregnancyCount: number;
  birthType: string;
  currentMedications: string[];
  medicalConditions: string[];
  careProviders: CareProvider[];
  prescriptions: Prescription[];
  labReports: LabReport[];
} 