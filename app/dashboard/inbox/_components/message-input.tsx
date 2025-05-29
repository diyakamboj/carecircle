'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, ImageIcon, SendIcon } from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
  onSend: (content: string, type: 'text' | 'image' | 'file', file?: File) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim(), 'text');
      setMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = e.target.files?.[0];
    if (file) {
      onSend(file.name, type, file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t p-4">
      <div className="flex gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="shrink-0"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <ImageIcon className="h-5 w-5" />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'image')}
          />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="shrink-0"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <FileIcon className="h-5 w-5" />
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'file')}
          />
        </Button>
      </div>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="min-h-[2.5rem] max-h-32 flex-1 resize-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button type="submit" size="icon" className="shrink-0" disabled={!message.trim()}>
        <SendIcon className="h-5 w-5" />
      </Button>
    </form>
  );
} 