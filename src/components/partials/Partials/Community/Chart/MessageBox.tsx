import React, {  useEffect, useRef } from 'react';
import useConversation from './Zustand/useConversation.tsx';
import useGetMessage from '../hooks/useGetMessage.tsx';
import MessageBoxTopNavBar from './MessageBoxTopNavBar.tsx';
import MessageBoxBottomNavBar from './MessageBoxBottomNavBar.tsx';
import MessageShow from './MessageShow.tsx';
import UseListenMessages from '../hooks/UseListenMessages.tsx';

interface MessageBoxProps {
  userdata: any;
}

const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  UseListenMessages();
  const { messages, loading } = useGetMessage();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages,loading,selectedConversation]);

  return (
    <>
      <div className="w-[79%] h-[95vh]">
        <MessageBoxTopNavBar userdata={selectedConversation} />
        <div className="w-[100%] h-[78vh] bg-[#102637] flex justify-center items-center">
          <div className="w-[100%] h-[78vh] bg-[#102637] overflow-auto overflow-x-hidden">
            <div className="w-[100%] h-[auto]">
              {!loading && messages.length === 0 && (
                <p className="text-center text-[20px] pt-[50px] text-[#bababa]">
                  Send a message to start the conversation
                </p>
              )}
              {!loading && messages.length > 0 &&
                messages.map((messages) => (
                  <div key={messages._id} ref={lastMessageRef}>
                    <MessageShow message={messages} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <MessageBoxBottomNavBar userdata={props.userdata} />
      </div>
    </>
  );
};

export default MessageBox;