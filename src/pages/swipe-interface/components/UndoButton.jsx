import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UndoButton = ({ onUndo, canUndo, lastAction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (canUndo && lastAction) {
      setIsVisible(true);
      setTimeLeft(5);
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsVisible(false);
    }
  }, [canUndo, lastAction]);

  const handleUndo = () => {
    onUndo();
    setIsVisible(false);
  };

  if (!isVisible || !canUndo) return null;

  const getActionText = () => {
    if (!lastAction) return 'last action';
    
    switch (lastAction.type) {
      case 'left':
        return `passing on ${lastAction.profile?.name}`;
      case 'right':
        return `connecting with ${lastAction.profile?.name}`;
      default:
        return 'last action';
    }
  };

  const getActionIcon = () => {
    if (!lastAction) return 'RotateCcw';
    
    switch (lastAction.type) {
      case 'left':
        return 'X';
      case 'right':
        return 'Heart';
      default:
        return 'RotateCcw';
    }
  };

  const getActionColor = () => {
    if (!lastAction) return 'bg-gray-500';
    
    switch (lastAction.type) {
      case 'left':
        return 'bg-red-500';
      case 'right':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`
      fixed bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30
      transition-all duration-300 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
    `}>
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center space-x-3 max-w-sm">
        {/* Action Icon */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActionColor()}`}>
          <Icon name={getActionIcon()} size={16} className="text-white" />
        </div>
        
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 truncate">
            Undo {getActionText()}
          </p>
        </div>
        
        {/* Timer */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 relative">
            <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 10}`}
                strokeDashoffset={`${2 * Math.PI * 10 * (1 - timeLeft / 5)}`}
                className="text-blue-500 transition-all duration-1000 ease-linear"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600">
              {timeLeft}
            </span>
          </div>
          
          {/* Undo Button */}
          <Button
            variant="primary"
            onClick={handleUndo}
            iconName="RotateCcw"
            className="px-3 py-1.5 text-sm"
            aria-label="Undo last action"
          >
            Undo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UndoButton;