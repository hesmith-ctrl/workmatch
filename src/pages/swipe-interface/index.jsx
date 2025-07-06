import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SwipeStack from './components/SwipeStack';
import MatchModal from './components/MatchModal';
import EmptyState from './components/EmptyState';
import FilterPanel from './components/FilterPanel';
import UndoButton from './components/UndoButton';

const SwipeInterface = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ageRange: [22, 65],
    distance: 50,
    industry: '',
    experienceLevel: '',
    connectionType: 'all',
    location: '',
    company: '',
    skills: []
  });
  const [lastAction, setLastAction] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for profiles
  const mockProfiles = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      jobTitle: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      distance: "2 miles",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      isVerified: true,
      isOnline: true,
      rating: 4.8,
      mutualConnections: 12,
      skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Leadership", "B2B SaaS"],
      bio: `Passionate product manager with 5+ years of experience building user-centric solutions. Currently leading the growth team at TechCorp, focusing on enterprise SaaS products.\n\nLooking to connect with fellow product professionals and potential mentees. Always excited to discuss product strategy, user experience, and the latest industry trends.`,
      interests: ["Product Management", "Startups", "Design Thinking", "Mentoring"],
      commonInterests: ["Product Strategy", "Mentoring", "Startups"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 32,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      distance: "5 miles",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isVerified: true,
      isOnline: false,
      rating: 4.9,
      mutualConnections: 8,
      skills: ["React", "Node.js", "Python", "AWS", "Docker", "GraphQL"],
      bio: `Full-stack developer with a passion for building scalable web applications. Currently working on fintech solutions at StartupXYZ.\n\nOpen to discussing new technologies, best practices, and potential collaboration opportunities. Always learning and sharing knowledge with the dev community.`,
      interests: ["Web Development", "Open Source", "Fintech", "Blockchain"],
      commonInterests: ["Web Development", "Open Source"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 26,
      jobTitle: "UX Designer",
      company: "Design Studio Pro",
      location: "New York, NY",
      distance: "1 mile",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      isVerified: false,
      isOnline: true,
      rating: 4.7,
      mutualConnections: 15,
      skills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
      bio: `Creative UX designer focused on creating inclusive and accessible digital experiences. Working with diverse clients to solve complex design challenges.\n\nLooking to connect with other designers, developers, and product managers to share insights and collaborate on meaningful projects.`,
      interests: ["Design", "Accessibility", "Art", "Photography"],
      commonInterests: ["Design", "Accessibility", "Art"]
    },
    {
      id: 4,
      name: "David Kim",
      age: 35,
      jobTitle: "Data Scientist",
      company: "Analytics Corp",
      location: "Seattle, WA",
      distance: "3 miles",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      isVerified: true,
      isOnline: true,
      rating: 4.6,
      mutualConnections: 6,
      skills: ["Machine Learning", "Python", "R", "SQL", "TensorFlow", "Statistics"],
      bio: `Data scientist with expertise in machine learning and predictive analytics. Currently working on AI-powered solutions for healthcare applications.\n\nInterested in connecting with fellow data professionals, researchers, and anyone curious about the intersection of data and real-world impact.`,
      interests: ["Machine Learning", "Healthcare", "Research", "Teaching"],
      commonInterests: ["Machine Learning", "Research"]
    },
    {
      id: 5,
      name: "Jessica Taylor",
      age: 29,
      jobTitle: "Marketing Director",
      company: "Growth Agency",
      location: "Los Angeles, CA",
      distance: "4 miles",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      isVerified: true,
      isOnline: false,
      rating: 4.8,
      mutualConnections: 20,
      skills: ["Digital Marketing", "Brand Strategy", "Content Marketing", "SEO", "Analytics", "Team Leadership"],
      bio: `Marketing director with a track record of driving growth for B2B and B2C brands. Passionate about data-driven marketing strategies and building high-performing teams.\n\nLooking to connect with other marketing professionals, entrepreneurs, and potential collaborators for exciting projects.`,
      interests: ["Marketing", "Entrepreneurship", "Public Speaking", "Travel"],
      commonInterests: ["Marketing", "Entrepreneurship", "Public Speaking"]
    }
  ];

  // Mock current user
  const mockCurrentUser = {
    id: 'current-user',
    name: "Alex Thompson",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
  };

  useEffect(() => {
    // Simulate loading profiles
    const loadProfiles = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfiles(mockProfiles);
      setCurrentUser(mockCurrentUser);
      setIsLoading(false);
    };

    loadProfiles();
  }, []);

  const handleSwipe = (profile, direction) => {
    // Add to swipe history
    const action = { type: direction, profile, timestamp: Date.now() };
    setSwipeHistory(prev => [...prev, action]);
    setLastAction(action);
    setCanUndo(true);

    // Simulate match logic (30% chance for right swipes)
    if (direction === 'right' && Math.random() > 0.7) {
      setMatchedProfile(profile);
      setShowMatchModal(true);
    }

    // Auto-disable undo after 5 seconds
    setTimeout(() => {
      setCanUndo(false);
      setLastAction(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (swipeHistory.length > 0) {
      const newHistory = [...swipeHistory];
      const undoneAction = newHistory.pop();
      setSwipeHistory(newHistory);
      
      // Add the profile back to the stack
      if (undoneAction && undoneAction.profile) {
        setProfiles(prev => [undoneAction.profile, ...prev]);
      }
      
      setCanUndo(false);
      setLastAction(null);
    }
  };

  const handleSendMessage = (profile) => {
    navigate('/messages', { state: { newMatch: profile } });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger a new API call with filters
    console.log('Applying filters:', newFilters);
  };

  const handleRefresh = () => {
    setProfiles(mockProfiles);
  };

  const handleUpdatePreferences = () => {
    setShowFilters(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Icon name="Heart" size={32} className="text-white" />
          </div>
          <p className="text-gray-600 font-medium">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Discover</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(true)}
              iconName="Filter"
              className="p-2"
              aria-label="Filters"
            />
            <Button
              variant="ghost"
              onClick={() => navigate('/matches')}
              iconName="Users"
              className="p-2"
              aria-label="View matches"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative h-[calc(100vh-80px)] p-4">
        {profiles.length > 0 ? (
          <>
            <SwipeStack
              profiles={profiles}
              onSwipe={handleSwipe}
              onUndo={handleUndo}
              canUndo={canUndo}
            />
            
            <UndoButton
              onUndo={handleUndo}
              canUndo={canUndo}
              lastAction={lastAction}
            />
          </>
        ) : (
          <EmptyState
            onRefresh={handleRefresh}
            onUpdatePreferences={handleUpdatePreferences}
          />
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="hidden md:block fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Keyboard Shortcuts</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd>
            <span>Pass</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd>
            <span>Connect</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+Z</kbd>
            <span>Undo</span>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      <MatchModal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        matchedProfile={matchedProfile}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
      />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default SwipeInterface;