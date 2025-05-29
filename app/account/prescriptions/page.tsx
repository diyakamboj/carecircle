import { mockPatientProfile } from '@/constants/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrescriptionsPage() {
  const { prescriptions } = mockPatientProfile;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/account">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication Name</TableHead>
                <TableHead>Prescribed By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">
                    {prescription.medicationName}
                  </TableCell>
                  <TableCell>{prescription.prescribedBy}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{prescription.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 