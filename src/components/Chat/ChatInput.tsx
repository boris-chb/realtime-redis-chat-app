'use client';

import { FC, KeyboardEventHandler, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../UI/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getSession } from 'next-auth/react';

interface ChatInputProps {
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      // await new Promise((reject) => setTimeout(reject, 1000));
      await axios.post('/api/message/send', { text: input, chatId });
      setInput('');
      textareaRef.current?.focus();
    } catch (e) {
      console.log(e);
      toast.error('Failed sending message. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='px-4 py-4 mb-2 border-t border-gray-200 sm:mb-0'>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-indigo-600'>
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          value={input}
          placeholder={'Send message'}
          className='block w-full text-gray-900 bg-transparent border-0 resize-none placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className='py-2'
          aria-hidden='true'
        >
          <div className='py-px'>
            <div className='h-6'></div>
          </div>
        </div>

        <div className='absolute bottom-0 right-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrink-0'>
            <Button isLoading={isLoading} type='submit' onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
