'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for lab reports
const initialReports = [
  {
    id: "lab-001",
    fileName: "Blood Work Results.pdf",
    uploadedBy: "Dr. Emily Chen",
    date: "2024-03-10",
    notes: "Routine pregnancy blood work"
  },
  {
    id: "lab-002",
    fileName: "Glucose Test.pdf",
    uploadedBy: "Dr. Michael Ross",
    date: "2024-03-05",
    notes: "Gestational diabetes screening"
  },
  {
    id: "lab-003",
    fileName: "Ultrasound Report.pdf",
    uploadedBy: "Dr. Emily Chen",
    date: "2024-02-28",
    notes: "20-week anatomy scan"
  }
];

export default function LabReportsPage() {
  const [reports, setReports] = useState(initialReports);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to your storage service here
    const newReport = {
      id: `lab-${Date.now()}`,
      fileName: file.name,
      uploadedBy: "Patient Upload",
      date: new Date().toISOString().split('T')[0],
      notes: "Patient uploaded report"
    };

    setReports([newReport, ...reports]);
    toast.success("File uploaded successfully!");
  };

  const handleDownload = (fileName: string) => {
    // In a real app, this would trigger the actual file download
    toast.success(`Downloading ${fileName}...`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Lab Reports</h1>
        <div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Report
            </Button>
          </label>
        </div>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  {report.fileName}
                </TableCell>
                <TableCell>{report.uploadedBy}</TableCell>
                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                <TableCell>{report.notes}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-2"
                    onClick={() => handleDownload(report.fileName)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 