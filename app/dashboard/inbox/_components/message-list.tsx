'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Message, type Conversation } from "@/constants/mock-chat";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Download } from "lucide-react";

interface MessageListProps {
  conversation: Conversation;
  currentUserId?: string;
}

export function MessageList({ conversation, currentUserId = "current-user" }: MessageListProps) {
  function getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  }

  function formatMessageTimestamp(timestamp: string) {
    return format(new Date(timestamp), 'h:mm a');
  }

  // Group messages by date
  const messagesByDate = conversation.messages.reduce((groups, message) => {
    const date = format(new Date(message.timestamp), 'MMM d, yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-8">
      {Object.entries(messagesByDate).map(([date, messages]) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center">
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {date}
            </span>
          </div>
          {messages.map((message) => {
            const sender = conversation.participants.find(p => p.id.toString() === message.senderId);
            const isSentByMe = message.senderId === currentUserId;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  isSentByMe ? "flex-row-reverse" : "flex-row"
                )}
              >
                {!isSentByMe && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>
                      {sender ? getInitials(sender.name) : '??'}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={cn(
                  "flex flex-col gap-1",
                  isSentByMe && "items-end"
                )}>
                  {message.type === 'text' ? (
                    <div className={cn(
                      "rounded-lg px-3 py-2 max-w-md",
                      isSentByMe ? "bg-primary text-primary-foreground" : "bg-accent"
                    )}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ) : message.type === 'file' && (
                    <Card className="p-3 flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{message.fileName}</p>
                        <p className="text-xs text-muted-foreground">File attachment</p>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </Card>
                  )}
                  
                  <span className="text-xs text-muted-foreground">
                    {!isSentByMe && `${sender?.name} • `}
                    {formatMessageTimestamp(message.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
} 