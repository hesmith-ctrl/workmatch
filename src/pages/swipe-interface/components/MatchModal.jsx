import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MatchModal = ({ isOpen, onClose, matchedProfile, currentUser, onSendMessage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowConfetti(true);
      
      // Auto-hide confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setShowConfetti(false);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    onSendMessage(matchedProfile);
    onClose();
  };

  const handleKeepSwiping = () => {
    onClose();
  };

  if (!isOpen || !matchedProfile) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center p-4
      transition-all duration-300 ease-out
      ${isVisible ? 'opacity-100 backdrop-blur-sm bg-black/50' : 'opacity-0 pointer-events-none'}
    `}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className={`
        bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden
        transform transition-all duration-500 ease-out
        ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
      `}>
        {/* Header */}
        <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 text-white p-6 text-center">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="text-white hover:bg-white/20 p-2"
              aria-label="Close"
            />
          </div>
          
          <div className="mb-4">
            <Icon name="Heart" size={48} className="mx-auto text-white animate-pulse" fill="currentColor" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
          <p className="text-white/90">
            You and {matchedProfile.name} connected with each other
          </p>
        </div>

        {/* Profile Images */}
        <div className="relative -mt-8 mb-6">
          <div className="flex justify-center items-center space-x-4">
            {/* Current User */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                <Image
                  src={currentUser.profileImage}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            </div>

            {/* Heart Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Icon name="Heart" size={24} className="text-white" fill="currentColor" />
            </div>

            {/* Matched User */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                <Image
                  src={matchedProfile.profileImage}
                  alt={matchedProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="px-6 pb-6 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {matchedProfile.name}
            </h3>
            <p className="text-gray-600">
              {matchedProfile.jobTitle} at {matchedProfile.company}
            </p>
          </div>

          {/* Mutual Connections */}
          {matchedProfile.mutualConnections > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Users" size={18} className="text-blue-600" />
                <span className="text-blue-800 font-medium">
                  {matchedProfile.mutualConnections} mutual connection{matchedProfile.mutualConnections !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}

          {/* Common Interests */}
          {matchedProfile.commonInterests && matchedProfile.commonInterests.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-center">Common Interests</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {matchedProfile.commonInterests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="primary"
              onClick={handleSendMessage}
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Send Message
            </Button>
            
            <Button
              variant="outline"
              onClick={handleKeepSwiping}
              fullWidth
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Keep Swiping
            </Button>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Pro Tip</p>
                <p className="text-xs text-yellow-700">
                  Start with a personalized message about your common interests or connections!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;