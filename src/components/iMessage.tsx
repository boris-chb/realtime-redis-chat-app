'use client';

import React, { useState } from 'react';
import classNames from 'classnames';

const ChatUI = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hey!', isMine: false },
    { text: "What's up?", isMine: true },
    { text: 'Not much, how about you?', isMine: false },
  ]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event: any) => {
    event.preventDefault();
    if (!inputValue) return;

    setMessages([...messages, { text: inputValue, isMine: true }]);
    setInputValue('');
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='flex flex-col w-1/4 border-r border-gray-200'>
        <div className='flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200'>
          <h1 className='text-lg font-medium'>Contacts</h1>
          <button className='p-1 text-gray-400 hover:text-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M16.707,4.293 C17.098,4.684 17.098,5.316 16.707,5.707 L14.414,8 L16.707,10.293 C17.098,10.684 17.098,11.316 16.707,11.707 L16.293,12.121 C15.902,12.512 15.269,12.512 14.878,12.121 L12.585,9.828 L10.293,12.121 C9.902,12.512 9.269,12.512 8.878,12.121 L8.464,11.707 C8.073,11.316 8.073,10.684 8.464,10.293 L10.757,8 L8.464,5.707 C8.073,5.316 8.073,4.684 8.464,4.293 L8.878,3.879 C9.269,3.488 9.902,3.488 10.293,3.879 L12.585,6.172 L14.878,3.879 C15.269,3.488 15.902,3.488 16.293,3.879 L16.707,4.293 Z'
              />
            </svg>
          </button>
        </div>
        <ul className='flex-1 p-4 overflow-y-auto'>
          <li className='flex items-center p-2 hover:bg-gray-100'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
            <div className='flex flex-col ml-3'>
              <span className='font-medium text-md'>Jane Doe</span>
              <span className='text-sm text-gray-500'>Hey, what's up?</span>
            </div>
          </li>
          <li className='flex items-center p-2 hover:bg-gray-100'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
            <div className='flex flex-col ml-3'>
              <span className='font-medium text-md'>John Doe</span>
              <span className='text-sm text-gray-500'>Not much, you?</span>
            </div>
          </li>
          <li className='flex items-center p-2 hover:bg-gray-100'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
            <div className='flex flex-col ml-3'>
              <span className='font-medium text-md'>Sarah Smith</span>
              <span className='text-sm text-gray-500'>
                Can we meet tomorrow?
              </span>
            </div>
          </li>
          <li className='flex items-center p-2 hover:bg-gray-100'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
            <div className='flex flex-col ml-3'>
              <span className='font-medium text-md'>Dave Johnson</span>
              <span className='text-sm text-gray-500'>Sure, let's do it.</span>
            </div>
          </li>
        </ul>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200'>
          <h1 className='text-lg font-medium'>Jane Doe</h1>
          <button className='p-1 text-gray-400 hover:text-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M10,3 C10.553,3 11,3.448 11,4 C11,4.552 10.553,5 10,5 C9.447,5 9,4.552 9,4 C9,3.448 9.447,3 10,3 Z M10,7 C10.553,7 11,7.448 11,8 C11,8.552 10.553,9 10,9 C9.447,9 9,8.552 9,8 C9,7.448 9.447,7 10,7 Z M10,11 C10.553,11 11,11.448 11,12 C11,12.552 10.553,13 10,13 C9.447,13 9,12.552 9,12 C9,11.448 9.447,11 10,11 Z'
              />
            </svg>
          </button>
        </div>
        <ul className='flex-1 px-4 pt-4 pb-2 overflow-y-auto'>
          {messages.map((message, index) => (
            <li
              key={index}
              className={classNames('flex mt-2', {
                'justify-start': !message.isMine,
                'justify-end': message.isMine,
              })}
            >
              <div
                className={classNames(
                  'bg-blue-500 rounded-lg p-3 max-w-xs break-all text-white',
                  { 'ml-2': !message.isMine, 'mr-2': message.isMine }
                )}
              >
                {message.text}
              </div>
            </li>
          ))}
        </ul>
        <form
          className='p-4 border-t border-gray-200'
          onSubmit={handleInputSubmit}
        >
          <div className='flex items-center'>
            <input
              type='text'
              className='flex-1 px-4 py-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Type your message...'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type='submit'
              className='p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M17.414,2.586 C16.024,1.195 14.025,1.195 12.636,2.586 L2.586,12.636 C1.195,14.026 1.195,16.025 2.586,17.414 L3.172,18 L5,18 L18,5 L18,3.172 L17.414,2.586 Z M6,13 L7.414,11.586 L8.828,13 L6,13 Z M13,6 L11.586,7.414 L13,8.828 L13,6 Z'
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
