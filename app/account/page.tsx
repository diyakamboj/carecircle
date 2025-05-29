'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePatient } from "@/context/patient-context";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const patient = usePatient();
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Profile Section */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={patient.profileImage} alt={patient.name} />
            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <p className="text-muted-foreground">
              Currently in Week {patient.pregnancyWeek} of {patient.totalWeeks}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Primary Care Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Primary Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{patient.primaryDoctor.name}</p>
                <p className="text-sm text-muted-foreground">{patient.primaryDoctor.specialty}</p>
              </div>
              <Button size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Primary Hospital</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{patient.primaryHospital.name}</p>
            <p className="text-sm text-muted-foreground">{patient.primaryHospital.location}</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">Pregnancy Details</h3>
            <div className="space-y-1">
              <p>Pregnancy Count: {patient.pregnancyCount}st Pregnancy</p>
              <p>Birth Type: {patient.birthType.join(', ')}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Medical Information</h3>
            <div className="space-y-1">
              <p>Current Medications: {patient.currentMedications.join(', ')}</p>
              <p>Medical Conditions: {patient.medicalConditions.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Care Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Other Care Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient.careProviders.map((provider) => (
              <div key={provider.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                </div>
                <Button size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Prescriptions</CardTitle>
            <CardDescription>
              {patient.prescriptions.total} active prescriptions
              <br />
              Last updated: {new Date(patient.prescriptions.lastUpdated).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/account/prescriptions')} className="w-full">
              View All Prescriptions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Lab Reports</CardTitle>
            <CardDescription>
              {patient.labReports.total} reports uploaded
              <br />
              Last updated: {new Date(patient.labReports.lastUpdated).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/account/labs')} className="w-full">
              View Lab Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 