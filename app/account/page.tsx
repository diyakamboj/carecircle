import { mockPatientProfile } from '@/constants/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function AccountPage() {
  const {
    name,
    profileImage,
    currentWeek,
    totalWeeks,
    primaryDoctor,
    primaryHospital,
    pregnancyCount,
    birthType,
    currentMedications,
    medicalConditions,
    careProviders,
    prescriptions,
    labReports
  } = mockPatientProfile;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-muted-foreground mt-1">
                  Week {currentWeek} of {totalWeeks}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Care Information */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Care</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Primary Doctor</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={primaryDoctor.profileImage} alt={primaryDoctor.name} />
                    <AvatarFallback>{primaryDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{primaryDoctor.name}</p>
                    <p className="text-sm text-muted-foreground">{primaryDoctor.specialty}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Primary Hospital</h3>
                <p className="mt-2">{primaryHospital.name}</p>
                <p className="text-sm text-muted-foreground">{primaryHospital.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Pregnancy Details</h3>
                <div className="mt-2 space-y-2">
                  <p>Pregnancy Count: {pregnancyCount}</p>
                  <p>Birth Type: {birthType}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Current Medications</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentMedications.map((med, index) => (
                    <Badge key={index} variant="secondary">{med}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Medical Conditions</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="outline">{condition}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Care Providers */}
        <Card>
          <CardHeader>
            <CardTitle>Care Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careProviders.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={provider.profileImage} alt={provider.name} />
                      <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{provider.name}</p>
                      <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Chat</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {/* Prescriptions Summary */}
              <Link href="/account/prescriptions" className="block">
                <Card>
                  <CardHeader>
                    <CardTitle>My Prescriptions</CardTitle>
                    <CardDescription>
                      {prescriptions.length} active prescriptions
                      {prescriptions.length > 0 && ` • Last updated ${prescriptions[0].date}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">View All Prescriptions</Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Lab Reports Summary */}
              <Link href="/account/labs" className="block">
                <Card>
                  <CardHeader>
                    <CardTitle>My Lab Reports</CardTitle>
                    <CardDescription>
                      {labReports.length} reports uploaded
                      {labReports.length > 0 && ` • Latest from ${labReports[0].date}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">View Lab Reports</Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 