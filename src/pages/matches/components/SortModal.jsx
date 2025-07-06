import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortModal = ({ isOpen, onClose, currentSort, onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState(currentSort);

  const sortOptions = [
    {
      value: 'recent-activity',
      label: 'Recent Activity',
      description: 'Most recent interactions first',
      icon: 'Clock'
    },
    {
      value: 'match-date',
      label: 'Match Date',
      description: 'Newest matches first',
      icon: 'Calendar'
    },
    {
      value: 'alphabetical',
      label: 'Alphabetical',
      description: 'A to Z by name',
      icon: 'ArrowUpDown'
    },
    {
      value: 'connection-strength',
      label: 'Connection Strength',
      description: 'Most compatible matches first',
      icon: 'Zap'
    },
    {
      value: 'unread-messages',
      label: 'Unread Messages',
      description: 'Conversations needing attention',
      icon: 'MessageCircle'
    }
  ];

  const handleApply = () => {
    onSortChange(selectedSort);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-end md:items-center justify-center">
      <div className="bg-surface w-full md:w-80 md:rounded-xl shadow-professional-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary font-heading">
            Sort Matches
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Close sort options"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedSort(option.value)}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200
                  ${selectedSort === option.value
                    ? 'bg-primary-50 border border-primary text-primary' :'hover:bg-secondary-50 border border-transparent'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${selectedSort === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary-100 text-text-secondary'
                  }
                `}>
                  <Icon name={option.icon} size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">
                    {option.label}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {option.description}
                  </p>
                </div>
                {selectedSort === option.value && (
                  <Icon name="Check" size={18} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="primary"
            onClick={handleApply}
            className="w-full"
          >
            Apply Sort
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;