import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { fakeEmails } from '@/constants/mock-api';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import Link from 'next/link';

type TMailListingPage = {};

export default async function MailListingPage({}: TMailListingPage) {
  // mock api call
  const data = await fakeEmails.getEmails();
  const totalEmails = data.total_emails;
  const emails = data.emails;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Inbox (${totalEmails})`}
            description="Manage emails from pregnant ladies regarding maternity issues."
          />
        </div>
        <Separator />
        <div className="space-y-4">
          {emails.map((email) => (
            <div key={email.id} className="rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{email.subject}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(email.received_at).toLocaleString()}
                </span>
              </div>
              <p className="text-theme text-sm">From: {email.sender}</p>
              <p className="mt-2 text-gray-800">{email.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
