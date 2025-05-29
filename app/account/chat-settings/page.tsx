'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatSettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Chat Settings</h1>

      {/* Chat Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Chat Availability</CardTitle>
          <CardDescription>
            Control when you're available for chat and manage your online status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings coming soon...</p>
        </CardContent>
      </Card>

      {/* Response Time Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Preferences</CardTitle>
          <CardDescription>
            Set your preferred response time and auto-reply messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings coming soon...</p>
        </CardContent>
      </Card>

      {/* Chat Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Chat Notifications</CardTitle>
          <CardDescription>
            Customize your chat notification preferences and alert sounds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
} 