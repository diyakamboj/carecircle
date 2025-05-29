import { type PatientProfile } from '@/types/account';

export const mockPatientProfile: PatientProfile = {
  name: "Sarah Johnson",
  profileImage: "https://avatars.githubusercontent.com/u/12345678",
  currentWeek: 28,
  totalWeeks: 40,
  primaryDoctor: {
    id: "dr-1",
    name: "Dr. Emily Parker",
    specialty: "OB/GYN",
    profileImage: "https://avatars.githubusercontent.com/u/23456789"
  },
  primaryHospital: {
    name: "City Maternity Hospital",
    address: "123 Medical Center Dr, City, State 12345"
  },
  pregnancyCount: 1,
  birthType: "Natural (Planned)",
  currentMedications: [
    "Prenatal Vitamins",
    "Folic Acid Supplement",
    "Iron Supplement"
  ],
  medicalConditions: [
    "Gestational Diabetes (Controlled)",
    "Mild Anemia"
  ],
  careProviders: [
    {
      id: "dr-2",
      name: "Dr. James Wilson",
      specialty: "Endocrinologist",
      profileImage: "https://avatars.githubusercontent.com/u/34567890"
    },
    {
      id: "dr-3",
      name: "Dr. Maria Rodriguez",
      specialty: "Nutritionist",
      profileImage: "https://avatars.githubusercontent.com/u/45678901"
    }
  ],
  prescriptions: [
    {
      id: "rx-1",
      medicationName: "Prenatal Complete",
      prescribedBy: "Dr. Emily Parker",
      date: "2024-03-15",
      dosage: "1 tablet daily",
      notes: "Take with food in the morning"
    },
    {
      id: "rx-2",
      medicationName: "Iron Supplement",
      prescribedBy: "Dr. Emily Parker",
      date: "2024-03-15",
      dosage: "325mg daily",
      notes: "Take on empty stomach"
    }
  ],
  labReports: [
    {
      id: "lab-1",
      fileName: "Glucose Tolerance Test",
      uploadedBy: "Dr. James Wilson",
      date: "2024-03-20",
      notes: "24-week screening",
      fileUrl: "/reports/glucose-test.pdf"
    },
    {
      id: "lab-2",
      fileName: "Complete Blood Count",
      uploadedBy: "Dr. Emily Parker",
      date: "2024-03-10",
      notes: "Regular checkup",
      fileUrl: "/reports/cbc.pdf"
    }
  ]
}; 