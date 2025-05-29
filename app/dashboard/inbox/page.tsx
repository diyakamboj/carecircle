'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { type Conversation } from "@/constants/mock-chat";
import { Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ConversationList } from "./_components/conversation-list";
import { MessageInput } from "./_components/message-input";
import { MessageList } from "./_components/message-list";
import { useChat } from "./_hooks/use-chat";
import { toast } from "sonner";

export default function InboxPage() {
  const { conversations, addMessage, markConversationAsRead } = useChat();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const selectedConversation = selectedConversationId
    ? conversations.find(c => c.id === selectedConversationId)
    : null;

  useEffect(() => {
    if (selectedConversationId) {
      markConversationAsRead(selectedConversationId);
    }
  }, [selectedConversationId, markConversationAsRead]);

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) return;

    try {
      addMessage(selectedConversationId, content);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!selectedConversationId) return;

    try {
      // In a real app, you would:
      // 1. Upload the file to your storage service
      // 2. Get back the file URL
      // 3. Then send the message with the file URL
      const mockFileUrl = URL.createObjectURL(file);
      
      addMessage(selectedConversationId, file.name, 'file', {
        fileUrl: mockFileUrl,
        fileName: file.name
      });

      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="container mx-auto h-[calc(100vh-6rem)] p-4">
      <div className="grid h-full gap-4 lg:grid-cols-[320px_1fr]">
        {/* Conversation List */}
        <Card className="h-full">
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversationId || undefined}
            onSelect={handleSelectConversation}
          />
        </Card>

        {/* Chat Window */}
        <Card className="flex h-full flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b p-4">
                {selectedConversation.type === 'individual' ? (
                  <Avatar>
                    <AvatarImage
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>
                      {getInitials(selectedConversation.name)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Users className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold">{selectedConversation.name}</h2>
                  {selectedConversation.type === 'group' && (
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.participants.length} participants
                    </p>
                  )}
                </div>
              </div>

              {/* Message List */}
              <MessageList conversation={selectedConversation} />

              {/* Message Input */}
              <MessageInput
                onSendMessage={handleSendMessage}
                onFileSelect={handleFileSelect}
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
} 