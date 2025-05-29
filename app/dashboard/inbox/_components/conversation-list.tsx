'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Conversation } from "@/constants/mock-chat";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Users } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  function getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  }

  function formatTimestamp(timestamp: string) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }

  const sortedConversations = [...conversations].sort((a, b) => {
    if (!a.lastMessage || !b.lastMessage) return 0;
    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "p-4 hover:bg-accent cursor-pointer flex items-center gap-3",
              selectedId === conversation.id && "bg-accent"
            )}
            onClick={() => onSelect(conversation)}
          >
            {conversation.type === 'individual' ? (
              <Avatar>
                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-medium truncate">{conversation.name}</p>
                {conversation.lastMessage && (
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(conversation.lastMessage.timestamp)}
                  </span>
                )}
              </div>
              {conversation.lastMessage && (
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage.type === 'file' 
                    ? `📎 ${conversation.lastMessage.fileName}`
                    : conversation.lastMessage.content}
                </p>
              )}
            </div>
            {conversation.unreadCount > 0 && (
              <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 