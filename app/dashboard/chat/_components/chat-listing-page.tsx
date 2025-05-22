'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { fakeChats } from '@/constants/mock-api';
import { DataTable } from '@/components/ui/table/data-table';
import { columns } from './chat-columns';
import { ChatSession } from '@/constants/data';
import CollapsiblePanel from './chat-panel';

type TChatListingPage = {};

export default function ChatListingPage({}: TChatListingPage) {
  const [currentCustomerName, setCurrentCustomerName] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);

  const [chats, setChats] = useState<ChatSession[]>([]);
  const [totalChats, setTotalChats] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      const data = await fakeChats.getChats();
      setChats(
        data.chats.map((chat: any) => ({
          ...chat,
          session_id: Number(chat.session_id)
        }))
      );
      setTotalChats(data.total_chats);
    };

    fetchChats();
  }, []);

  const handleOpenChat = (customerName: string, sessionId: string) => {
    setCurrentCustomerName(customerName);
    setCurrentSessionId(sessionId);
    setIsChatPanelOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatPanelOpen(false);
    setCurrentCustomerName('');
    setCurrentSessionId('');
  };

  return (
    <PageContainer scrollable>
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Chat Sessions (${totalChats})`}
            description="Manage chat sessions with customers."
          />
        </div>
        <Separator />
        <DataTable
          columns={columns({ handleOpenChat })}
          data={chats}
          totalItems={totalChats}
        />

        {isChatPanelOpen && (
          <CollapsiblePanel
            customerName={currentCustomerName}
            sessionId={currentSessionId}
            onClose={handleCloseChat}
          />
        )}
      </div>
    </PageContainer>
  );
}
