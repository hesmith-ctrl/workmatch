import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewMessageModal = ({ isOpen, onClose, onStartConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [messageText, setMessageText] = useState('');

  const mockContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Product Manager at TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      mutualConnections: 12
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior Developer at StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      mutualConnections: 8
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Designer at DesignStudio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      mutualConnections: 15
    },
    {
      id: 4,
      name: "David Kim",
      title: "Marketing Director at GrowthCo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      mutualConnections: 6
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Data Scientist at Analytics Inc",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      mutualConnections: 20
    }
  ];

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedContacts([]);
      setMessageText('');
    }
  }, [isOpen]);

  const handleContactSelect = (contact) => {
    setSelectedContacts(prev => {
      const isSelected = prev.find(c => c.id === contact.id);
      if (isSelected) {
        return prev.filter(c => c.id !== contact.id);
      } else {
        return [...prev, contact];
      }
    });
  };

  const handleRemoveContact = (contactId) => {
    setSelectedContacts(prev => prev.filter(c => c.id !== contactId));
  };

  const handleStartConversation = () => {
    if (selectedContacts.length > 0) {
      onStartConversation(selectedContacts, messageText);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl shadow-professional-xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">New Message</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Close modal"
          />
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <Input
              type="search"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Selected contacts */}
        {selectedContacts.length > 0 && (
          <div className="p-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {selectedContacts.map(contact => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1.5 rounded-full"
                >
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{contact.name}</span>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-primary hover:text-primary-700"
                    aria-label={`Remove ${contact.name}`}
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts list */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="Users" size={24} className="text-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                {searchQuery ? 'No contacts found' : 'No contacts available'}
              </h3>
              <p className="text-text-secondary">
                {searchQuery 
                  ? 'Try adjusting your search terms' :'Connect with professionals to start messaging'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredContacts.map(contact => {
                const isSelected = selectedContacts.find(c => c.id === contact.id);
                return (
                  <button
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`
                      w-full p-4 text-left hover:bg-secondary-50 transition-colors duration-200
                      ${isSelected ? 'bg-primary-50' : ''}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-surface rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-text-primary truncate">
                            {contact.name}
                          </h3>
                          {isSelected && (
                            <Icon name="Check" size={20} className="text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-text-secondary truncate">
                          {contact.title}
                        </p>
                        <p className="text-xs text-text-muted">
                          {contact.mutualConnections} mutual connections
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Message input */}
        {selectedContacts.length > 0 && (
          <div className="p-4 border-t border-border">
            <Input
              type="text"
              placeholder="Write a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="mb-3"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleStartConversation}
            disabled={selectedContacts.length === 0}
            iconName="Send"
            iconPosition="right"
          >
            Start Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewMessageModal;