'use client';

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for prescriptions
const prescriptions = [
  {
    id: "rx-001",
    medicationName: "Prenatal Vitamins",
    prescribedBy: "Dr. Emily Chen",
    date: "2024-03-15",
    dosage: "1 tablet daily",
    notes: "Take with food"
  },
  {
    id: "rx-002",
    medicationName: "Iron Supplements",
    prescribedBy: "Dr. Emily Chen",
    date: "2024-03-15",
    dosage: "1 tablet twice daily",
    notes: "Take on empty stomach"
  },
  {
    id: "rx-003",
    medicationName: "Folic Acid",
    prescribedBy: "Dr. Emily Chen",
    date: "2024-03-10",
    dosage: "400mcg daily",
    notes: "Essential for fetal development"
  }
];

export default function PrescriptionsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Prescriptions</h1>
      
      <Card>
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
                <TableCell>{new Date(prescription.date).toLocaleDateString()}</TableCell>
                <TableCell>{prescription.dosage}</TableCell>
                <TableCell>{prescription.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 