import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileCard = ({ 
  profile, 
  onSwipe, 
  isTopCard = false, 
  style = {}, 
  isDragging = false,
  dragOffset = { x: 0, y: 0 }
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);

  const getSwipeDirection = () => {
    if (Math.abs(dragOffset.x) < 50) return null;
    return dragOffset.x > 0 ? 'right' : 'left';
  };

  const getCardTransform = () => {
    if (!isDragging) return '';
    const rotation = dragOffset.x * 0.1;
    return `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`;
  };

  const getOverlayOpacity = () => {
    if (!isDragging) return 0;
    return Math.min(Math.abs(dragOffset.x) / 150, 0.8);
  };

  const swipeDirection = getSwipeDirection();

  return (
    <div
      ref={cardRef}
      className={`
        absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden
        transition-all duration-300 ease-out cursor-grab active:cursor-grabbing
        ${isTopCard ? 'z-20' : 'z-10'}
        ${isDragging ? 'transition-none' : ''}
      `}
      style={{
        ...style,
        transform: getCardTransform(),
      }}
    >
      {/* Swipe Overlays */}
      {isDragging && swipeDirection && (
        <div
          className={`
            absolute inset-0 z-30 flex items-center justify-center
            ${swipeDirection === 'right' ?'bg-green-500/20 text-green-600' :'bg-red-500/20 text-red-600'
            }
          `}
          style={{ opacity: getOverlayOpacity() }}
        >
          <div className="text-6xl font-bold transform rotate-12">
            {swipeDirection === 'right' ? 'CONNECT' : 'PASS'}
          </div>
        </div>
      )}

      {/* Profile Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={profile.profileImage}
          alt={`${profile.name}'s profile`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Icon name="User" size={48} className="text-gray-400" />
          </div>
        )}

        {/* Verification badge */}
        {profile.isVerified && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
            <Icon name="CheckCircle" size={20} />
          </div>
        )}

        {/* Online status */}
        {profile.isOnline && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Online
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-6 space-y-4">
        {/* Name and Age */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-lg text-gray-600">{profile.age} years old</p>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Icon name="Star" size={20} fill="currentColor" />
            <span className="font-medium">{profile.rating}</span>
          </div>
        </div>

        {/* Job Title and Company */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={18} className="text-gray-500" />
            <span className="font-medium text-gray-900">{profile.jobTitle}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={18} className="text-gray-500" />
            <span className="text-gray-700">{profile.company}</span>
          </div>
        </div>

        {/* Location and Distance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={18} className="text-gray-500" />
            <span className="text-gray-700">{profile.location}</span>
          </div>
          <span className="text-sm text-gray-500">{profile.distance} away</span>
        </div>

        {/* Mutual Connections */}
        {profile.mutualConnections > 0 && (
          <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
            <Icon name="Users" size={18} className="text-blue-600" />
            <span className="text-blue-800 font-medium">
              {profile.mutualConnections} mutual connection{profile.mutualConnections !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Skills */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 6).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 6 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                +{profile.skills.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Bio Preview */}
        {profile.bio && (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">About</h3>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Interests */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.slice(0, 4).map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => onSwipe('left')}
          className="w-14 h-14 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50"
          iconName="X"
          iconSize={24}
          aria-label="Pass"
        />
        
        <Button
          variant="ghost"
          onClick={() => console.log('View more info')}
          className="w-12 h-12 rounded-full hover:bg-blue-50"
          iconName="Info"
          iconSize={20}
          aria-label="More info"
        />
        
        <Button
          variant="primary"
          onClick={() => onSwipe('right')}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 border-0"
          iconName="Heart"
          iconSize={24}
          aria-label="Connect"
        />
      </div>
    </div>
  );
};

export default ProfileCard;