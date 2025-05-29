import { Conversation, Message, Participant } from '../types';

// Mock participants (medical professionals)
export const mockParticipants: Participant[] = [
  {
    id: 'dr-smith',
    name: 'Dr. Emily Smith',
    role: 'Obstetrician',
    avatarUrl: '/avatars/dr-smith.jpg'
  },
  {
    id: 'dr-jones',
    name: 'Dr. Michael Jones',
    role: 'Pediatrician',
    avatarUrl: '/avatars/dr-jones.jpg'
  },
  {
    id: 'nurse-wilson',
    name: 'Nurse Sarah Wilson',
    role: 'Registered Nurse',
    avatarUrl: '/avatars/nurse-wilson.jpg'
  },
  {
    id: 'dr-patel',
    name: 'Dr. Priya Patel',
    role: 'Gynecologist',
    avatarUrl: '/avatars/dr-patel.jpg'
  },
  {
    id: 'current-user',
    name: 'Jane Doe',
    role: 'Patient',
    avatarUrl: '/avatars/jane-doe.jpg'
  }
];

// Mock messages
const createMessage = (
  id: string,
  content: string,
  senderId: string,
  timestamp: string,
  type: 'text' | 'image' | 'file' = 'text',
  fileUrl?: string,
  fileName?: string
): Message => ({
  id,
  content,
  senderId,
  timestamp,
  type,
  fileUrl,
  fileName
});

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    type: 'individual',
    name: 'Dr. Emily Smith',
    participants: [mockParticipants[0], mockParticipants[4]],
    unreadCount: 2,
    lastMessage: createMessage(
      'msg-1',
      'Your latest test results look good. Would you like to discuss them?',
      'dr-smith',
      new Date(Date.now() - 1000 * 60 * 30).toISOString()
    )
  },
  {
    id: 'conv-2',
    type: 'group',
    name: 'Pregnancy Support Team',
    participants: [
      mockParticipants[0],
      mockParticipants[1],
      mockParticipants[2],
      mockParticipants[4]
    ],
    unreadCount: 0,
    lastMessage: createMessage(
      'msg-2',
      'Next group consultation scheduled for tomorrow at 10 AM',
      'nurse-wilson',
      new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    )
  },
  {
    id: 'conv-3',
    type: 'individual',
    name: 'Dr. Priya Patel',
    participants: [mockParticipants[3], mockParticipants[4]],
    unreadCount: 1,
    lastMessage: createMessage(
      'msg-3',
      'Here are your prescribed supplements for this trimester.',
      'dr-patel',
      new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      'file',
      '/files/prescription.pdf',
      'prescription.pdf'
    )
  }
];

// Mock messages for each conversation
export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    createMessage(
      'msg-1-1',
      'Good morning, Dr. Smith!',
      'current-user',
      new Date(Date.now() - 1000 * 60 * 60).toISOString()
    ),
    createMessage(
      'msg-1-2',
      'Hello Jane! How are you feeling today?',
      'dr-smith',
      new Date(Date.now() - 1000 * 60 * 55).toISOString()
    ),
    createMessage(
      'msg-1-3',
      'I\'ve been experiencing some mild discomfort.',
      'current-user',
      new Date(Date.now() - 1000 * 60 * 50).toISOString()
    ),
    createMessage(
      'msg-1-4',
      'Your latest test results look good. Would you like to discuss them?',
      'dr-smith',
      new Date(Date.now() - 1000 * 60 * 30).toISOString()
    )
  ],
  'conv-2': [
    createMessage(
      'msg-2-1',
      'Welcome to your pregnancy support group!',
      'nurse-wilson',
      new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    ),
    createMessage(
      'msg-2-2',
      'Thank you all for being here.',
      'current-user',
      new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString()
    ),
    createMessage(
      'msg-2-3',
      'Next group consultation scheduled for tomorrow at 10 AM',
      'nurse-wilson',
      new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    )
  ],
  'conv-3': [
    createMessage(
      'msg-3-1',
      'Dr. Patel, could you send me the supplements list?',
      'current-user',
      new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString()
    ),
    createMessage(
      'msg-3-2',
      'Here are your prescribed supplements for this trimester.',
      'dr-patel',
      new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      'file',
      '/files/prescription.pdf',
      'prescription.pdf'
    )
  ]
}; 