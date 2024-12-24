'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ChatSession } from '@/constants/data';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

type ColumnsProps = {
  handleOpenChat: (customerName: string, sessionId: string) => void;
};

export const columns = ({
  handleOpenChat
}: ColumnsProps): ColumnDef<ChatSession>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'session_id',
    header: 'Session ID',
    cell: ({ row }) => row.original.session_id.toString()
  },
  {
    accessorKey: 'agent_name',
    header: 'Agent Name'
  },
  {
    accessorKey: 'customer_name',
    header: 'Customer Name'
  },
  {
    accessorKey: 'date_started',
    header: 'Date Started',
    cell: ({ row }) => new Date(row.original.date_started).toLocaleString()
  },
  {
    accessorKey: 'date_ended',
    header: 'Date Ended',
    cell: ({ row }) =>
      row.original.date_ended
        ? new Date(row.original.date_ended).toLocaleString()
        : 'N/A'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={cn(
          'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
          row.original.status === 'Awaiting'
            ? 'bg-yellow-100 text-yellow-800'
            : row.original.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        )}
      >
        {row.original.status}
      </span>
    )
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.status === 'Completed' ? (
          <button className="bg-theme rounded px-2 py-1 text-white">
            Download Transcript
          </button>
        ) : row.original.status === 'Awaiting' ? (
          <button
            className="bg-theme rounded px-2 py-1 text-white"
            onClick={() =>
              handleOpenChat(
                row.original.customer_name,
                row.original.session_id.toString()
              )
            }
          >
            Open Chat
          </button>
        ) : (
          'N/A'
        )}
      </div>
    )
  }
];
