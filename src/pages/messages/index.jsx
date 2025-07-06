import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ConversationList from './components/ConversationList';
import ChatView from './components/ChatView';
import MessageSearch from './components/MessageSearch';
import NewMessageModal from './components/NewMessageModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const mockConversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Product Manager at TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for sharing the project details. I\'ll review them and get back to you by tomorrow.",
      lastMessageSender: "Sarah Johnson",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
      isPinned: true,
      messageStatus: "delivered",
      lastSeen: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior Developer at StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The code review looks good. Ready to merge when you are.",
      lastMessageSender: "You",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      isPinned: false,
      messageStatus: "read",
      lastSeen: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Designer at DesignStudio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "I love the new design direction! The user flow is much cleaner now.",
      lastMessageSender: "Emily Rodriguez",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 1,
      isOnline: true,
      isTyping: true,
      isPinned: false,
      messageStatus: "sent",
      lastSeen: new Date()
    },
    {
      id: 4,
      name: "David Kim",
      title: "Marketing Director at GrowthCo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Let\'s schedule a call to discuss the marketing strategy for Q2.",
      lastMessageSender: "David Kim",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      isPinned: false,
      messageStatus: "delivered",
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Data Scientist at Analytics Inc",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The data analysis report is ready. I\'ve attached it to this message.",
      lastMessageSender: "Lisa Thompson",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      isPinned: false,
      messageStatus: "read",
      lastSeen: new Date(Date.now() - 900000)
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! I saw your profile and I\'m really impressed with your background in product management.",
      timestamp: new Date(Date.now() - 86400000),
      type: "text",
      status: "read"
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you! I\'d love to learn more about your work at TechCorp. Are you currently working on any interesting projects?",
      timestamp: new Date(Date.now() - 82800000),
      type: "text",
      status: "read"
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "Absolutely! We\'re launching a new AI-powered analytics platform next quarter. It\'s been quite the journey getting all the stakeholders aligned.",
      timestamp: new Date(Date.now() - 79200000),
      type: "text",
      status: "read"
    },
    {
      id: 4,
      sender: "You",
      content: "That sounds fascinating! I\'ve been working on similar challenges in my current role. Would you be open to a brief call to discuss best practices?",
      timestamp: new Date(Date.now() - 75600000),
      type: "text",
      status: "read"
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "I\'d be happy to chat! Here\'s my availability for next week.",
      timestamp: new Date(Date.now() - 72000000),
      type: "text",
      status: "read"
    },
    {
      id: 6,
      sender: "Sarah Johnson",
      content: "Project_Requirements_v2.pdf",
      timestamp: new Date(Date.now() - 3600000),
      type: "file",
      fileName: "Project_Requirements_v2.pdf",
      fileSize: "2.4 MB",
      status: "delivered"
    },
    {
      id: 7,
      sender: "Sarah Johnson",
      content: "Thanks for sharing the project details. I\'ll review them and get back to you by tomorrow.",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
      status: "delivered"
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    setMessages(mockMessages);
  }, []);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content: messageText,
      timestamp: new Date(),
      type: "text",
      status: "sent"
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation with new message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: messageText,
              lastMessageSender: "You",
              timestamp: new Date(),
              messageStatus: "sent"
            }
          : conv
      )
    );

    // Simulate message delivery after 1 second
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, status: "delivered" }
            : msg
        )
      );
    }, 1000);
  };

  const handleStartConversation = (contacts, messageText) => {
    // Create new conversation with selected contacts
    contacts.forEach(contact => {
      const newConversation = {
        id: conversations.length + contact.id,
        name: contact.name,
        title: contact.title,
        avatar: contact.avatar,
        lastMessage: messageText || "New conversation started",
        lastMessageSender: "You",
        timestamp: new Date(),
        unreadCount: 0,
        isOnline: contact.isOnline,
        isTyping: false,
        isPinned: false,
        messageStatus: "sent",
        lastSeen: new Date()
      };

      setConversations(prev => [newConversation, ...prev]);
    });
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearch(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)]">
        {/* Desktop: Split view, Mobile: Single view */}
        <div className={`
          ${selectedConversation ? 'hidden md:flex' : 'flex'} 
          flex-col w-full md:w-80 lg:w-96 border-r border-border bg-surface
        `}>
          {/* Messages header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-xl font-semibold text-text-primary">Messages</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setShowSearch(true)}
                iconName="Search"
                className="p-2"
                aria-label="Search messages"
              />
              <Button
                variant="ghost"
                onClick={() => setShowNewMessage(true)}
                iconName="Plus"
                className="p-2"
                aria-label="New message"
              />
            </div>
          </div>

          {/* Conversation list */}
          <ConversationList
            conversations={conversations}
            onConversationSelect={handleConversationSelect}
            selectedConversationId={selectedConversation?.id}
            searchQuery={searchQuery}
          />
        </div>

        {/* Chat view */}
        <div className={`
          ${selectedConversation ? 'flex' : 'hidden md:flex'} 
          flex-col flex-1 bg-surface
        `}>
          {selectedConversation ? (
            <ChatView
              conversation={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              onBack={handleBackToList}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="MessageCircle" size={32} className="text-text-muted" />
                </div>
                <h2 className="text-2xl font-semibold text-text-primary mb-2">
                  Select a conversation
                </h2>
                <p className="text-text-secondary mb-6 max-w-md">
                  Choose a conversation from the list to start messaging with your professional connections.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowNewMessage(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Start New Conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search overlay */}
      <MessageSearch
        onSearch={handleSearch}
        onClose={() => setShowSearch(false)}
        isVisible={showSearch}
      />

      {/* New message modal */}
      <NewMessageModal
        isOpen={showNewMessage}
        onClose={() => setShowNewMessage(false)}
        onStartConversation={handleStartConversation}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default Messages;