import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, onConversationSelect, selectedConversationId, searchQuery }) => {
  const [swipedItemId, setSwipedItemId] = useState(null);

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSwipeStart = (e, conversationId) => {
    const startX = e.touches ? e.touches[0].clientX : e.clientX;
    const element = e.currentTarget;
    
    const handleSwipeMove = (moveEvent) => {
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const deltaX = startX - currentX;
      
      if (deltaX > 50) {
        setSwipedItemId(conversationId);
      } else if (deltaX < -50) {
        setSwipedItemId(null);
      }
    };

    const handleSwipeEnd = () => {
      document.removeEventListener('touchmove', handleSwipeMove);
      document.removeEventListener('touchend', handleSwipeEnd);
      document.removeEventListener('mousemove', handleSwipeMove);
      document.removeEventListener('mouseup', handleSwipeEnd);
    };

    document.addEventListener('touchmove', handleSwipeMove);
    document.addEventListener('touchend', handleSwipeEnd);
    document.addEventListener('mousemove', handleSwipeMove);
    document.addEventListener('mouseup', handleSwipeEnd);
  };

  const handleArchive = (conversationId) => {
    console.log('Archive conversation:', conversationId);
    setSwipedItemId(null);
  };

  const handleDelete = (conversationId) => {
    console.log('Delete conversation:', conversationId);
    setSwipedItemId(null);
  };

  const handleMarkRead = (conversationId) => {
    console.log('Mark as read:', conversationId);
    setSwipedItemId(null);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="MessageCircle" size={24} className="text-text-muted" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </h3>
            <p className="text-text-secondary">
              {searchQuery 
                ? 'Try adjusting your search terms' :'Start connecting with professionals to begin conversations'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="relative overflow-hidden"
                onTouchStart={(e) => handleSwipeStart(e, conversation.id)}
                onMouseDown={(e) => handleSwipeStart(e, conversation.id)}
              >
                {/* Swipe actions background */}
                <div className={`
                  absolute inset-y-0 right-0 flex items-center space-x-2 px-4 bg-secondary-100
                  transition-transform duration-200 ease-out
                  ${swipedItemId === conversation.id ? 'translate-x-0' : 'translate-x-full'}
                `}>
                  <button
                    onClick={() => handleMarkRead(conversation.id)}
                    className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
                    aria-label="Mark as read"
                  >
                    <Icon name="Check" size={16} />
                  </button>
                  <button
                    onClick={() => handleArchive(conversation.id)}
                    className="w-10 h-10 bg-warning text-warning-foreground rounded-full flex items-center justify-center"
                    aria-label="Archive conversation"
                  >
                    <Icon name="Archive" size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(conversation.id)}
                    className="w-10 h-10 bg-error text-error-foreground rounded-full flex items-center justify-center"
                    aria-label="Delete conversation"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>

                {/* Conversation item */}
                <div
                  className={`
                    relative bg-surface p-4 cursor-pointer transition-all duration-200
                    ${selectedConversationId === conversation.id 
                      ? 'bg-primary-50 border-r-2 border-primary' :'hover:bg-secondary-50'
                    }
                    ${swipedItemId === conversation.id ? '-translate-x-32' : 'translate-x-0'}
                  `}
                  onClick={() => onConversationSelect(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-surface rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-text-primary truncate">
                          {conversation.name}
                        </h3>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <span className="text-xs text-text-muted">
                            {formatTimestamp(conversation.timestamp)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                              {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-text-secondary truncate flex-1">
                          {conversation.isTyping ? (
                            <span className="text-primary font-medium">typing...</span>
                          ) : (
                            <>
                              {conversation.lastMessageSender === 'You' && (
                                <span className="text-text-muted">You: </span>
                              )}
                              {conversation.lastMessage}
                            </>
                          )}
                        </p>
                        {conversation.lastMessageSender === 'You' && (
                          <div className="flex-shrink-0">
                            {conversation.messageStatus === 'sent' && (
                              <Icon name="Check" size={14} className="text-text-muted" />
                            )}
                            {conversation.messageStatus === 'delivered' && (
                              <div className="flex">
                                <Icon name="Check" size={14} className="text-text-muted -mr-1" />
                                <Icon name="Check" size={14} className="text-text-muted" />
                              </div>
                            )}
                            {conversation.messageStatus === 'read' && (
                              <div className="flex">
                                <Icon name="Check" size={14} className="text-primary -mr-1" />
                                <Icon name="Check" size={14} className="text-primary" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {conversation.isPinned && (
                        <div className="mt-1">
                          <Icon name="Pin" size={12} className="text-warning" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;