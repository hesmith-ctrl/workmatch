import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messageCount, setMessageCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  const tabs = [
    {
      label: 'Discover',
      path: '/swipe-interface',
      icon: 'Heart',
      activeIcon: 'Heart',
    },
    {
      label: 'Matches',
      path: '/matches',
      icon: 'Users',
      activeIcon: 'Users',
      badgeCount: matchCount,
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: 'MessageCircle',
      activeIcon: 'MessageCircle',
      badgeCount: messageCount,
    },
  ];

  useEffect(() => {
    // Simulate badge counts - in real app, these would come from API/state management
    const updateBadgeCounts = () => {
      setMessageCount(3);
      setMatchCount(2);
    };

    updateBadgeCounts();
  }, []);

  const handleTabClick = (path) => {
    navigate(path);
    
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const isTabActive = (path) => {
    return location.pathname === path;
  };

  const shouldShowNavigation = () => {
    const hiddenPaths = ['/login', '/register', '/profile-setup'];
    return !hiddenPaths.includes(location.pathname);
  };

  if (!shouldShowNavigation()) {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation - Top horizontal */}
      <nav className="hidden md:block sticky top-16 z-header bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const isActive = isTabActive(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => handleTabClick(tab.path)}
                  className={`
                    relative flex items-center space-x-2 py-4 px-2 text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                    }
                  `}
                  aria-label={tab.label}
                >
                  <div className="relative">
                    <Icon
                      name={isActive ? tab.activeIcon : tab.icon}
                      size={20}
                      className={isActive ? 'text-primary' : 'text-current'}
                    />
                    {tab.badgeCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-pulse-gentle">
                        {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
                      </span>
                    )}
                  </div>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-bottom-nav bg-surface border-t border-border safe-area-bottom">
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = isTabActive(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className={`
                  flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[56px] transition-all duration-200
                  ${isActive 
                    ? 'text-primary' :'text-text-secondary active:text-primary'
                  }
                `}
                aria-label={tab.label}
              >
                <div className="relative mb-1">
                  <Icon
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={24}
                    className={`transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {tab.badgeCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-pulse-gentle">
                      {tab.badgeCount > 99 ? '99+' : tab.badgeCount}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content spacer for mobile */}
      <div className="md:hidden h-14 safe-area-bottom" />
    </>
  );
};

export default BottomTabNavigation;