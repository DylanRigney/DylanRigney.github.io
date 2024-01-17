import React from 'react';

interface MessageProps {
    text: string;
    isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div style={{ textAlign: isUser ? 'right' : 'left', margin: '8px'}}>
      <div style={{ backgroundColor: isUser ? '#DCF8C6' : '#b8e3fc', padding: '8px', borderRadius: '8px' }}>
        {text}
      </div>
    </div>
  );
};

export default Message;