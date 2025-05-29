'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Users } from "lucide-react";
import { type Conversation } from "../types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-2 p-4">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent",
              selectedId === conversation.id && "bg-accent"
            )}
          >
            {conversation.type === 'group' ? (
              <div className="relative">
                <Avatar>
                  <AvatarFallback>
                    <Users className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {conversation.participants.length}
                </span>
              </div>
            ) : (
              <Avatar>
                <AvatarImage src={conversation.avatarUrl} />
                <AvatarFallback>
                  {conversation.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-medium">
                  {conversation.name}
                </p>
                {conversation.lastMessage && (
                  <p className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
                  </p>
                )}
              </div>
              {conversation.lastMessage && (
                <p className="truncate text-sm text-muted-foreground">
                  {conversation.lastMessage.content}
                </p>
              )}
              {conversation.unreadCount > 0 && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {conversation.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
} 