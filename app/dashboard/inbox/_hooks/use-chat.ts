import { useState } from 'react';
import { type Message, type Conversation, mockConversations } from '@/constants/mock-chat';

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

  const addMessage = (conversationId: string, content: string, type: 'text' | 'file' = 'text', fileDetails?: { fileUrl: string; fileName: string }) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: 'current-user',
      timestamp: new Date().toISOString(),
      type,
      ...(fileDetails && { fileUrl: fileDetails.fileUrl, fileName: fileDetails.fileName })
    };

    setConversations(prevConversations => {
      return prevConversations.map(conversation => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: newMessage,
            unreadCount: 0 // Reset unread count when sending a message
          };
        }
        return conversation;
      });
    });

    // In a real app, you would:
    // 1. Send the message to your backend
    // 2. Update the UI only after successful send
    // 3. Handle errors and show appropriate feedback
    return newMessage;
  };

  const markConversationAsRead = (conversationId: string) => {
    setConversations(prevConversations => {
      return prevConversations.map(conversation => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            unreadCount: 0
          };
        }
        return conversation;
      });
    });
  };

  return {
    conversations,
    addMessage,
    markConversationAsRead
  };
} 