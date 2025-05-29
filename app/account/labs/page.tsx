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
import { ArrowLeft, Download, Upload } from 'lucide-react';
import Link from 'next/link';

export default function LabReportsPage() {
  const { labReports } = mockPatientProfile;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // This is a mock implementation. In a real application, you would:
    // 1. Get the file from event.target.files[0]
    // 2. Upload it to your server/storage
    // 3. Update the lab reports list
    console.log('File upload triggered', event.target.files);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/account">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="gap-2" asChild>
              <span>
                <Upload className="h-4 w-4" />
                Upload New Report
              </span>
            </Button>
          </label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Lab Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    {report.fileName}
                  </TableCell>
                  <TableCell>{report.uploadedBy}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.notes}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 