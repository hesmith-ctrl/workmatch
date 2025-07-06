import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onRefresh, onUpdatePreferences }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <Icon name="Users" size={48} className="text-blue-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        No More Profiles
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">
        You've seen all available profiles in your area. Try expanding your search criteria or check back later for new connections.
      </p>
      
      <div className="space-y-3 w-full max-w-xs">
        <Button
          variant="primary"
          onClick={onUpdatePreferences}
          fullWidth
          iconName="Settings"
          iconPosition="left"
        >
          Update Preferences
        </Button>
        
        <Button
          variant="outline"
          onClick={onRefresh}
          fullWidth
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-sm">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-left">
            <h3 className="font-medium text-blue-900 mb-1">Get More Matches</h3>
            <p className="text-sm text-blue-700">
              Complete your profile and add more photos to increase your visibility and get better matches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;