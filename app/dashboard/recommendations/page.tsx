import { RecommendationsPage } from '@/components/recommendations/RecommendationsPage';
import PageContainer from '@/components/layout/page-container';

// Example pregnancy start date - replace with actual data from your backend
const pregnancyStartDate = new Date('2024-02-01'); // Starting in February for week 14 in May

// Example data - replace with your actual data fetching logic
const mockRecommendations = [
  {
    id: '1',
    doctorName: 'Dr. Smith',
    specialization: 'Cardiologist',
    title: 'Heart Health Checkup Results',
    attachment: {
      type: 'upload' as const,
      url: '/documents/heart-checkup.pdf',
      name: 'Heart Checkup Report.pdf',
    },
    notes: 'Blood pressure is normal. Continue with current medication.',
    date: new Date('2024-05-02'), // Updated to May
  },
  {
    id: '2',
    doctorName: 'Dr. Johnson',
    specialization: 'Neurologist',
    title: 'MRI Scan Review',
    attachment: {
      type: 'link' as const,
      url: 'https://hospital.com/mri-results',
      name: 'View MRI Results',
    },
    notes: 'No significant findings. Schedule follow-up in 6 months.',
    date: new Date('2024-05-03'), // Updated to May
  },
  // Add more mock data as needed
];

export default function RecommendationsPageWrapper() {
  return (
    <PageContainer>
      <RecommendationsPage 
        recommendations={mockRecommendations}
        pregnancyStartDate={pregnancyStartDate}
      />
    </PageContainer>
  );
} 