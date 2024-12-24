'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Animation library for smooth transitions
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/context/auth-context';
import { Clock, Info, LogOut, UserCircleIcon, UserIcon } from 'lucide-react';

type ChatModalProps = {
  customerName: string;
  sessionId: string;
  onClose: () => void;
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

export default function CollapsiblePanel({
  customerName,
  sessionId,
  onClose
}: ChatModalProps) {
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
    <AnimatePresence>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>{' '}
      {/* Background overlay */}
      <motion.div
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 z-50 flex h-full w-2/5 flex-col border-l border-gray-300 bg-white shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Chat with {customerName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
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
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                )}
              >
                <div className="mb-2 flex items-center">
                  {message.sender === 'agent' ? (
                    <>
                      <div className="mr-2 text-right text-sm font-semibold">
                        {agentName}
                      </div>
                      <UserIcon className="h-8 w-8 text-blue-500" />
                    </>
                  ) : (
                    <>
                      <UserCircleIcon className="h-8 w-8 text-gray-500" />
                      <div className="ml-2 text-sm font-semibold">
                        {customerName}
                      </div>
                    </>
                  )}
                </div>
                <div className="mb-1 rounded-lg bg-white p-2">
                  {message.text}
                </div>
                <div className="mt-1 text-right text-xs text-gray-600">
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center border-t border-gray-200 p-4">
          <input
            type="text"
            className="mr-2 flex-1 rounded border p-2"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="rounded bg-blue-500 p-2 text-white"
            onClick={() => handleSendMessage('agent', messageText)}
          >
            Send
          </button>
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
              onClick={() => handleSendMessage('customer', customerMessageText)}
              className="rounded bg-gray-500 p-2 text-white"
            >
              Send
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() =>
                handleSendMessage('agent', 'Hello! How can I assist you today?')
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
      </motion.div>
    </AnimatePresence>
  );
}
