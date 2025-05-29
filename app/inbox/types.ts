export type MessageType = 'text' | 'image' | 'file';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  senderId: string;
  timestamp: string;
  fileUrl?: string;
  fileName?: string;
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Conversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  participants: Participant[];
  lastMessage?: Message;
  unreadCount: number;
  avatarUrl?: string;
}

export interface InboxState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  messages: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
} 