'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CalendarDays, Activity, TrendingUp, Clock } from 'lucide-react';
import { useAuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock data - in a real app, this would come from your backend
const mockData = {
  pregnancy: {
    currentWeek: 28,
    totalWeeks: 40,
    dueDate: '2024-08-15',
    daysUntilDue: 120
  },
  appointments: [
    {
      type: 'OB/GYN Visit',
      date: '2024-04-15',
      time: '10:00 AM',
      doctor: 'Dr. Emily Johnson'
    },
    {
      type: 'Ultrasound',
      date: '2024-04-22',
      time: '2:30 PM',
      doctor: 'Dr. Sarah Wilson'
    },
    {
      type: 'Lab Work',
      date: '2024-04-29',
      time: '9:15 AM',
      location: 'Medical Lab'
    }
  ],
  vitals: {
    weight: {
      current: 145,
      previous: 142,
      unit: 'lbs'
    },
    bloodPressure: {
      current: '118/75',
      previous: '120/80',
      status: 'normal'
    },
    glucose: {
      current: 85,
      previous: 90,
      unit: 'mg/dL',
      status: 'normal'
    }
  }
};

export default function Dashboard() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Pregnancy Progress Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Pregnancy Journey</h2>
            <span className="text-muted-foreground">Due {mockData.pregnancy.dueDate}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Week {mockData.pregnancy.currentWeek}</span>
              <span>{mockData.pregnancy.totalWeeks} Weeks</span>
            </div>
            <Progress value={(mockData.pregnancy.currentWeek / mockData.pregnancy.totalWeeks) * 100} />
            <p className="text-sm text-muted-foreground text-center">
              {mockData.pregnancy.daysUntilDue} days until your due date
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upcoming Appointments Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            </div>
            <div className="space-y-4">
              {mockData.appointments.map((appointment, index) => (
                <div key={index} className="flex justify-between items-start border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{appointment.type}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.date} at {appointment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor || appointment.location}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Reschedule</Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Vitals Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Recent Vitals</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{mockData.vitals.weight.current} {mockData.vitals.weight.unit}</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Pressure</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{mockData.vitals.bloodPressure.current}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      {mockData.vitals.bloodPressure.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Glucose</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{mockData.vitals.glucose.current} {mockData.vitals.glucose.unit}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      {mockData.vitals.glucose.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
