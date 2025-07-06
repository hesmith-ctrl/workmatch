import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './Button';

const GlobalHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/swipe-interface':
        return 'Discover';
      case '/matches':
        return 'Matches';
      case '/messages':
        return 'Messages';
      case '/profile-setup':
        return 'Profile Setup';
      default:
        return 'WorkMatch';
    }
  };

  const getPageActions = () => {
    switch (location.pathname) {
      case '/swipe-interface':
        return [
          {
            icon: 'Filter',
            onClick: () => console.log('Filter clicked'),
            'aria-label': 'Filter profiles'
          },
          {
            icon: 'Settings',
            onClick: () => console.log('Settings clicked'),
            'aria-label': 'Settings'
          }
        ];
      case '/matches':
        return [
          {
            icon: 'Search',
            onClick: () => console.log('Search matches'),
            'aria-label': 'Search matches'
          }
        ];
      case '/messages':
        return [
          {
            icon: 'Search',
            onClick: () => console.log('Search messages'),
            'aria-label': 'Search messages'
          }
        ];
      default:
        return [];
    }
  };

  const shouldShowBackButton = () => {
    return location.pathname === '/profile-setup';
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
          <path
            d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
            fill="currentColor"
          />
          <path
            d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="text-xl font-semibold text-text-primary font-heading">
        WorkMatch
      </span>
    </div>
  );

  const actions = getPageActions();

  return (
    <header className="sticky top-0 z-header bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          {shouldShowBackButton() ? (
            <Button
              variant="ghost"
              onClick={handleBackClick}
              iconName="ArrowLeft"
              className="p-2"
              aria-label="Go back"
            />
          ) : null}
          
          <div className="flex items-center space-x-4">
            <Logo />
            <div className="hidden sm:block">
              <h1 className="text-lg font-medium text-text-primary font-heading">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={action.onClick}
              iconName={action.icon}
              className="p-2"
              aria-label={action['aria-label']}
            />
          ))}
          
          <div className="hidden md:flex items-center space-x-2 ml-4 pl-4 border-l border-border">
            <Button
              variant="ghost"
              iconName="Bell"
              className="p-2"
              aria-label="Notifications"
            />
            <Button
              variant="ghost"
              iconName="User"
              className="p-2"
              aria-label="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;