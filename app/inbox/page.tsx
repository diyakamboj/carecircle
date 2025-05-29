import { Separator } from "@/components/ui/separator";
import { InboxContent } from "./_components/inbox-content";
import PageContainer from "@/components/layout/page-container";

export default function InboxPage() {
  return (
    <PageContainer>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold">Inbox</h1>
            <p className="text-sm text-muted-foreground">
              Message your healthcare team
            </p>
          </div>
        </div>
        <Separator />
        <InboxContent />
      </div>
    </PageContainer>
  );
} 