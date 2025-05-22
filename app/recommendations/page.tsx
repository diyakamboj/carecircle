import { RecommendationsPage } from '@/components/recommendations/RecommendationsPage';

// Example data - replace with your actual data fetching logic
const mockRecommendations = [
  {
    id: '1',
    doctorName: 'Dr. Brody',
    specialization: 'Cardiologist',
    title: 'Heart Health Checkup Results',
    attachment: {
      type: 'upload' as const,
      url: '/documents/heart-checkup.pdf',
      name: 'Heart Checkup Report.pdf',
    },
    notes: 'Blood pressure is normal. Continue with current medication.',
    date: new Date('2024-04-02'),
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
    date: new Date('2024-04-03'),
  },
  // Add more mock data as needed
];

export default function RecommendationsPageWrapper() {
  return (
    <div className="h-full min-h-screen p-4 bg-background">
      <RecommendationsPage recommendations={mockRecommendations} />
    </div>
  );
} 