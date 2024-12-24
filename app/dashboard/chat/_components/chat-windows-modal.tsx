'use client';

import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Info,
  Clock,
  CheckCircle,
  UserCheck,
  LogOut,
  User,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/context/auth-context';

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
};

type Message = {
  id: number;
  sender: 'agent' | 'customer';
  text: string;
  timestamp: string;
};

function getCurrentTime() {
  return new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

export default function ChatModal({
  isOpen,
  onClose,
  customerName
}: ChatModalProps) {
  // Mock UserContext
  const { user } = useAuthContext();
  const agentName = user?.displayName || 'Agent';
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [customerMessageText, setCustomerMessageText] = useState('');

  const handleSendMessage = (sender: 'agent' | 'customer', text: string) => {
    if (text.trim() === '') return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender,
      text,
      timestamp: getCurrentTime()
    };
    setMessages([...messages, newMessage]);
    if (sender === 'agent') setMessageText('');
    else setCustomerMessageText('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-4/5 w-1/2">
        <DialogHeader className="flex-shrink-0 border-b p-4">
          <DialogTitle className="text-lg font-semibold">
            Chat with {customerName}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-1 overflow-y-auto border border-gray-200 bg-white p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'mb-4 flex items-start',
                  message.sender === 'agent' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3',
                    message.sender === 'agent'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  )}
                >
                  <div className="mb-1 text-xs font-semibold">
                    {message.sender === 'agent' ? agentName : customerName}
                  </div>
                  <div>{message.text}</div>
                  <div className="mt-1 text-right text-xs">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="mb-4 flex items-center space-x-2">
              <input
                type="text"
                value={customerMessageText}
                onChange={(e) => setCustomerMessageText(e.target.value)}
                className="flex-1 rounded border p-2"
                placeholder="Customer: Type a message..."
              />
              <button
                onClick={() =>
                  handleSendMessage('customer', customerMessageText)
                }
                className="rounded bg-gray-500 p-2 text-white"
              >
                Send
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 rounded border p-2"
                placeholder="Agent: Type a message..."
              />
              <button
                onClick={() => handleSendMessage('agent', messageText)}
                className="rounded bg-blue-500 p-2 text-white"
              >
                Send
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleSendMessage(
                    'agent',
                    'Hello! How can I assist you today?'
                  )
                }
                className="flex items-center rounded bg-yellow-500 p-1 text-xs text-white"
              >
                <Info className="mr-1 h-4 w-4" /> Greet Customer
              </button>
              <button
                onClick={() =>
                  handleSendMessage(
                    'agent',
                    'Please hold on while I check that for you.'
                  )
                }
                className="flex items-center rounded bg-yellow-500 p-1 text-xs text-white"
              >
                <Clock className="mr-1 h-4 w-4" /> Hold Message
              </button>
              <button
                onClick={() =>
                  handleSendMessage('agent', 'Goodbye! Have a great day!')
                }
                className="flex items-center rounded bg-yellow-500 p-1 text-xs text-white"
              >
                <LogOut className="mr-1 h-4 w-4" /> Bye Message
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
