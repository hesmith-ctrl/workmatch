import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, searchQuery, onClearSearch }) => {
  const navigate = useNavigate();

  const getEmptyStateContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: 'Search',
          title: 'No matches found',
          description: `No matches found for "${searchQuery}". Try adjusting your search terms or filters.`,
          action: {
            label: 'Clear Search',
            onClick: onClearSearch
          }
        };
      case 'pending':
        return {
          icon: 'Clock',
          title: 'No pending matches',
          description: 'All your matches have been confirmed. Keep swiping to find new connections!',
          action: {
            label: 'Start Swiping',
            onClick: () => navigate('/swipe-interface')
          }
        };
      case 'recent':
        return {
          icon: 'Calendar',
          title: 'No recent matches',
          description: 'You haven\'t made any new connections recently. Get back out there and start networking!',
          action: {
            label: 'Find New Matches',
            onClick: () => navigate('/swipe-interface')
          }
        };
      default:
        return {
          icon: 'Users',
          title: 'No matches yet',
          description: 'Start swiping to discover professionals who share your interests and career goals. Your network is waiting to be built!',
          action: {
            label: 'Start Discovering',
            onClick: () => navigate('/swipe-interface')
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
        <Icon name={content.icon} size={32} className="text-text-muted" />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary font-heading mb-3">
        {content.title}
      </h3>
      
      <p className="text-text-secondary max-w-md mb-8 leading-relaxed">
        {content.description}
      </p>

      <Button
        variant="primary"
        onClick={content.action.onClick}
        iconName="ArrowRight"
        iconPosition="right"
      >
        {content.action.label}
      </Button>

      {type === 'default' && (
        <div className="mt-8 p-4 bg-primary-50 rounded-lg max-w-md">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-primary mb-1">
                Pro Tip
              </p>
              <p className="text-sm text-text-secondary">
                Complete your profile to get better matches. A complete profile gets 3x more connections!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;