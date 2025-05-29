import { type User } from './data';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  fileName?: string;
}

export interface Conversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  messages: Message[];
}

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    type: "individual",
    name: "Dr. Emily Johnson",
    avatar: "https://avatars.githubusercontent.com/u/12345678",
    participants: [
      {
        id: 1,
        name: 'Dr. Emily Johnson',
        company: 'Maternity Care Center',
        role: 'Obstetrician',
        verified: true,
        status: 'Active'
      }
    ],
    unreadCount: 2,
    messages: [
      {
        id: "msg-1",
        content: "Your latest test results look good! Blood pressure is within normal range.",
        senderId: "1",
        timestamp: "2024-03-20T14:30:00Z",
        type: "text"
      },
      {
        id: "msg-2",
        content: "test-results-march.pdf",
        senderId: "1",
        timestamp: "2024-03-20T14:31:00Z",
        type: "file",
        fileUrl: "/files/test-results-march.pdf",
        fileName: "test-results-march.pdf"
      }
    ],
    lastMessage: {
      id: "msg-2",
      content: "test-results-march.pdf",
      senderId: "1",
      timestamp: "2024-03-20T14:31:00Z",
      type: "file",
      fileUrl: "/files/test-results-march.pdf",
      fileName: "test-results-march.pdf"
    }
  },
  {
    id: "conv-2",
    type: "group",
    name: "Maternity Care Team",
    participants: [
      {
        id: 1,
        name: 'Dr. Emily Johnson',
        company: 'Maternity Care Center',
        role: 'Obstetrician',
        verified: true,
        status: 'Active'
      },
      {
        id: 2,
        name: 'Nurse Sarah Brown',
        company: 'Maternity Care Center',
        role: 'Registered Nurse',
        verified: true,
        status: 'Active'
      },
      {
        id: 3,
        name: 'Dr. Michael Smith',
        company: 'Maternity Care Center',
        role: 'Pediatrician',
        verified: true,
        status: 'Active'
      }
    ],
    unreadCount: 0,
    messages: [
      {
        id: "msg-3",
        content: "Hi everyone, I've reviewed Sarah's latest scans.",
        senderId: "1",
        timestamp: "2024-03-19T10:00:00Z",
        type: "text"
      },
      {
        id: "msg-4",
        content: "Everything is progressing normally.",
        senderId: "1",
        timestamp: "2024-03-19T10:01:00Z",
        type: "text"
      }
    ],
    lastMessage: {
      id: "msg-4",
      content: "Everything is progressing normally.",
      senderId: "1",
      timestamp: "2024-03-19T10:01:00Z",
      type: "text"
    }
  }
]; 