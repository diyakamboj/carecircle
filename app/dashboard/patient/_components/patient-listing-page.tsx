import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { fakePatients } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import PatientTable from './patient-tables';

type TPatientListingPage = {};

export default async function PatientListingPage({}: TPatientListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const country = searchParamsCache.get('country');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(country && { country })
  };

  // mock api call
  const data = await fakePatients.getPatients(filters);
  const totalPatients = data.total_patients;
  const patients = data.patients;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Patients (${totalPatients})`}
            description="Manage pregnant ladies and their queries."
          />

          <Link
            href={'/dashboard/patients/new'}
            className="bg-theme flex items-center space-x-2 rounded-md p-2 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <PatientTable data={patients} totalData={totalPatients} />
      </div>
    </PageContainer>
  );
}
