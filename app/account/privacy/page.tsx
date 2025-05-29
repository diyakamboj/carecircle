'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacySettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Privacy Settings</h1>

      {/* Data Sharing Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sharing Preferences</CardTitle>
          <CardDescription>
            Control how your medical information is shared with healthcare providers and third parties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings coming soon...</p>
        </CardContent>
      </Card>

      {/* Account Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Account Visibility</CardTitle>
          <CardDescription>
            Manage who can see your profile and medical history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings coming soon...</p>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose what types of notifications you receive and how you receive them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
} 