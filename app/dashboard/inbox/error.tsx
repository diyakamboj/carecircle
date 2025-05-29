'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function InboxError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        {error.message || 'An error occurred while loading the inbox.'}
      </p>
      <Button
        variant="outline"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
} 