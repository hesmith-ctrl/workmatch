import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatView = ({ conversation, messages, onSendMessage, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '👏', '🔥', '💯', '🚀', '💪', '🙌', '✨'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Handle file upload logic here
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDateHeader = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const shouldShowDateHeader = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp).toDateString();
    const previousDate = new Date(previousMessage.timestamp).toDateString();
    
    return currentDate !== previousDate;
  };

  const shouldShowTimestamp = (currentMessage, nextMessage) => {
    if (!nextMessage) return true;
    if (currentMessage.sender !== nextMessage.sender) return true;
    
    const timeDiff = new Date(nextMessage.timestamp) - new Date(currentMessage.timestamp);
    return timeDiff > 300000; // 5 minutes
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={onBack}
            iconName="ArrowLeft"
            className="p-2 md:hidden"
            aria-label="Back to conversations"
          />
          
          <div className="relative">
            <Image
              src={conversation.avatar}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-surface rounded-full" />
            )}
          </div>
          
          <div>
            <h2 className="font-medium text-text-primary">{conversation.name}</h2>
            <p className="text-sm text-text-secondary">
              {conversation.isOnline ? 'Online' : `Last seen ${formatMessageTime(conversation.lastSeen)}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Phone"
            className="p-2"
            aria-label="Voice call"
          />
          <Button
            variant="ghost"
            iconName="Video"
            className="p-2"
            aria-label="Video call"
          />
          <Button
            variant="ghost"
            iconName="MoreVertical"
            className="p-2"
            aria-label="More options"
          />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1];
          const nextMessage = messages[index + 1];
          const showDateHeader = shouldShowDateHeader(message, previousMessage);
          const showTimestamp = shouldShowTimestamp(message, nextMessage);
          const isOwnMessage = message.sender === 'You';

          return (
            <div key={message.id}>
              {showDateHeader && (
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-secondary-100 text-text-secondary text-xs rounded-full">
                    {formatDateHeader(message.timestamp)}
                  </span>
                </div>
              )}

              <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  {message.type === 'text' && (
                    <div
                      className={`
                        px-4 py-2 rounded-2xl
                        ${isOwnMessage
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-secondary-100 text-text-primary rounded-bl-md'
                        }
                      `}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  )}

                  {message.type === 'file' && (
                    <div
                      className={`
                        p-3 rounded-2xl border
                        ${isOwnMessage
                          ? 'bg-primary text-primary-foreground border-primary-600 rounded-br-md'
                          : 'bg-surface text-text-primary border-border rounded-bl-md'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          ${isOwnMessage ? 'bg-primary-600' : 'bg-secondary-100'}
                        `}>
                          <Icon name="FileText" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{message.fileName}</p>
                          <p className={`text-xs ${isOwnMessage ? 'text-primary-100' : 'text-text-muted'}`}>
                            {message.fileSize}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          iconName="Download"
                          className="p-1"
                          aria-label="Download file"
                        />
                      </div>
                    </div>
                  )}

                  {showTimestamp && (
                    <div className={`flex items-center mt-1 space-x-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-text-muted">
                        {formatMessageTime(message.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <div>
                          {message.status === 'sent' && (
                            <Icon name="Check" size={12} className="text-text-muted" />
                          )}
                          {message.status === 'delivered' && (
                            <div className="flex">
                              <Icon name="Check" size={12} className="text-text-muted -mr-1" />
                              <Icon name="Check" size={12} className="text-text-muted" />
                            </div>
                          )}
                          {message.status === 'read' && (
                            <div className="flex">
                              <Icon name="Check" size={12} className="text-primary -mr-1" />
                              <Icon name="Check" size={12} className="text-primary" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary-100 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-border bg-surface">
        {showEmojiPicker && (
          <div className="mb-3 p-3 bg-secondary-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-secondary-100 rounded transition-colors duration-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              iconName="Smile"
              className="p-2"
              aria-label="Add emoji"
            />
            <Button
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              iconName="Paperclip"
              className="p-2"
              aria-label="Attach file"
            />
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
          </div>

          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            iconName="Send"
            className="p-2"
            aria-label="Send message"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatView;