'use client';

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { mockConversations, mockMessages, mockParticipants } from "./mock-data";
import { ConversationList } from "./conversation-list";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { type Message } from "../types";
import { Users } from "lucide-react";

export function InboxContent() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  const selectedConversation = selectedConversationId
    ? mockConversations.find(c => c.id === selectedConversationId)
    : null;

  const handleSend = (content: string, type: 'text' | 'image' | 'file', file?: File) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      type,
      senderId: 'current-user',
      timestamp: new Date().toISOString(),
      ...(file && {
        fileUrl: URL.createObjectURL(file),
        fileName: file.name
      })
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage]
    }));
  };

  return (
    <div className="flex h-[calc(100vh-10rem)]">
      <div className="w-80 flex-shrink-0 border-r">
        <ConversationList
          conversations={mockConversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />
      </div>
      {selectedConversation ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b p-4">
            <div className="flex items-center gap-3">
              {selectedConversation.type === 'group' ? (
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {selectedConversation.participants.length}
                  </span>
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/10" />
              )}
              <div>
                <p className="font-medium">{selectedConversation.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.type === 'group'
                    ? `${selectedConversation.participants.length} participants`
                    : selectedConversation.participants.find(p => p.id !== 'current-user')?.role}
                </p>
              </div>
            </div>
          </div>
          <MessageList
            messages={selectedConversationId ? messages[selectedConversationId] || [] : []}
            participants={selectedConversation?.participants || []}
            currentUserId="current-user"
          />
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">Welcome to your inbox</p>
            <p className="text-sm text-muted-foreground">
              Select a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 