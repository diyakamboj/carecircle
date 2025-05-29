import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import PageContainer from "@/components/layout/page-container";

export default function InboxLoading() {
  return (
    <PageContainer>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
        </div>
        <Separator />
        <div className="flex h-[calc(100vh-10rem)]">
          {/* Conversation list loading */}
          <div className="w-80 flex-shrink-0 border-r p-4">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message area loading */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-3 border-b p-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex-1 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mb-4 flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-16 w-72 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 