'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { type Conversation } from "@/constants/mock-chat";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { ConversationList } from "./_components/conversation-list";
import { MessageInput } from "./_components/message-input";
import { MessageList } from "./_components/message-list";
import { useChat } from "./_hooks/use-chat";
import { toast } from "sonner";

export default function InboxPage() {
  const { conversations, addMessage, markConversationAsRead } = useChat();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation.id);
    }
  }, [selectedConversation, markConversationAsRead]);

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Find the updated conversation from our state
    const updatedConversation = conversations.find(c => c.id === conversation.id);
    if (updatedConversation) {
      setSelectedConversation(updatedConversation);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;

    try {
      addMessage(selectedConversation.id, content);
      // Update the selected conversation with the latest messages
      const updatedConversation = conversations.find(c => c.id === selectedConversation.id);
      if (updatedConversation) {
        setSelectedConversation(updatedConversation);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!selectedConversation) return;

    try {
      // In a real app, you would:
      // 1. Upload the file to your storage service
      // 2. Get back the file URL
      // 3. Then send the message with the file URL
      const mockFileUrl = URL.createObjectURL(file);
      
      addMessage(selectedConversation.id, file.name, 'file', {
        fileUrl: mockFileUrl,
        fileName: file.name
      });

      // Update the selected conversation with the latest messages
      const updatedConversation = conversations.find(c => c.id === selectedConversation.id);
      if (updatedConversation) {
        setSelectedConversation(updatedConversation);
      }

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
            selectedId={selectedConversation?.id}
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
              <div className="text-center">
                <h3 className="font-medium">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
} 