'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { FileIcon } from "lucide-react";
import { type Message, type Participant } from "../types";

interface MessageListProps {
  messages: Message[];
  participants: Participant[];
  currentUserId: string;
}

export function MessageList({ messages, participants, currentUserId }: MessageListProps) {
  const getParticipant = (id: string) => participants.find(p => p.id === id);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="flex flex-col gap-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId;
          const sender = getParticipant(message.senderId);

          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                isCurrentUser && "flex-row-reverse"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={sender?.avatarUrl} />
                <AvatarFallback>
                  {sender?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-lg p-3",
                  isCurrentUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{sender?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.timestamp), {
                      addSuffix: true
                    })}
                  </p>
                </div>
                {message.type === 'text' && (
                  <p className="text-sm">{message.content}</p>
                )}
                {message.type === 'image' && (
                  <img
                    src={message.fileUrl}
                    alt={message.content}
                    className="max-h-48 rounded-md object-cover"
                  />
                )}
                {message.type === 'file' && (
                  <a
                    href={message.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-background/10 p-2 text-sm hover:bg-background/20"
                  >
                    <FileIcon className="h-4 w-4" />
                    <span className="flex-1 truncate">{message.fileName}</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
} 