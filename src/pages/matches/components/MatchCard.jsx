import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MatchCard = ({ match, onMessage, onViewProfile }) => {
  const navigate = useNavigate();

  const handleMessage = (e) => {
    e.stopPropagation();
    onMessage(match);
    navigate('/messages');
  };

  const handleViewProfile = (e) => {
    e.stopPropagation();
    onViewProfile(match);
  };

  const formatMatchDate = (date) => {
    const now = new Date();
    const matchDate = new Date(date);
    const diffTime = Math.abs(now - matchDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return matchDate.toLocaleDateString();
  };

  const formatLastInteraction = (date) => {
    const now = new Date();
    const interactionDate = new Date(date);
    const diffTime = Math.abs(now - interactionDate);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.ceil(diffHours / 24);
    if (diffDays <= 7) return `${diffDays}d ago`;
    return interactionDate.toLocaleDateString();
  };

  return (
    <div className="bg-surface rounded-xl shadow-professional-md border border-border overflow-hidden hover:shadow-professional-lg transition-all duration-300 cursor-pointer group">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={match.profilePhoto}
            alt={`${match.name}'s profile`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Match indicator */}
        <div className="absolute top-3 right-3 bg-success text-success-foreground rounded-full p-1.5">
          <Icon name="Heart" size={14} className="fill-current" />
        </div>

        {/* Unread message indicator */}
        {match.unreadCount > 0 && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-medium">
            {match.unreadCount > 99 ? '99+' : match.unreadCount}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-text-primary text-lg mb-1 line-clamp-1">
            {match.name}
          </h3>
          <p className="text-text-secondary text-sm mb-1 line-clamp-1">
            {match.jobTitle}
          </p>
          <p className="text-text-muted text-xs line-clamp-1">
            {match.company}
          </p>
        </div>

        {/* Match info */}
        <div className="mb-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Matched</span>
            <span className="text-text-secondary font-medium">
              {formatMatchDate(match.matchDate)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Last interaction</span>
            <span className="text-text-secondary font-medium">
              {formatLastInteraction(match.lastInteraction)}
            </span>
          </div>
        </div>

        {/* Conversation preview */}
        {match.lastMessage && (
          <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
            <p className="text-xs text-text-secondary line-clamp-2">
              {match.lastMessage.sender === 'You' ? 'You: ' : ''}
              {match.lastMessage.content}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={handleMessage}
            iconName="MessageCircle"
            iconPosition="left"
            className="flex-1"
            size="sm"
          >
            Message
          </Button>
          <Button
            variant="outline"
            onClick={handleViewProfile}
            iconName="User"
            className="px-3"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;