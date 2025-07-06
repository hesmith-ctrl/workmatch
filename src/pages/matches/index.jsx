import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchCard from './components/MatchCard';
import MatchesHeader from './components/MatchesHeader';
import MatchesTabs from './components/MatchesTabs';
import FilterModal from './components/FilterModal';
import SortModal from './components/SortModal';
import EmptyState from './components/EmptyState';

const MatchesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('recent-activity');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    industries: [],
    locations: [],
    connectionDate: [],
    interactionStatus: []
  });

  // Mock data for matches
  const mockMatches = [
    {
      id: 1,
      name: "Sarah Chen",
      jobTitle: "Senior Product Manager",
      company: "TechCorp Inc.",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      matchDate: new Date(Date.now() - 86400000), // 1 day ago
      lastInteraction: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 2,
      lastMessage: {
        sender: "Sarah Chen",
        content: "Thanks for connecting! I\'d love to discuss the product management role at your company."
      },
      industry: "Technology",
      location: "San Francisco, CA",
      connectionStrength: 95,
      status: "active"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      jobTitle: "Marketing Director",
      company: "Growth Solutions",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      matchDate: new Date(Date.now() - 172800000), // 2 days ago
      lastInteraction: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      lastMessage: {
        sender: "You",
        content: "I\'d be happy to share some insights about digital marketing strategies."
      },
      industry: "Marketing",
      location: "New York, NY",
      connectionStrength: 88,
      status: "active"
    },
    {
      id: 3,
      name: "Emily Johnson",
      jobTitle: "UX Designer",
      company: "Design Studio",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      matchDate: new Date(Date.now() - 259200000), // 3 days ago
      lastInteraction: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 1,
      lastMessage: {
        sender: "Emily Johnson",
        content: "Your portfolio is impressive! Would love to collaborate on a project sometime."
      },
      industry: "Technology",
      location: "Los Angeles, CA",
      connectionStrength: 92,
      status: "active"
    },
    {
      id: 4,
      name: "David Kim",
      jobTitle: "Financial Analyst",
      company: "Investment Partners",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      matchDate: new Date(Date.now() - 604800000), // 1 week ago
      lastInteraction: new Date(Date.now() - 604800000), // 1 week ago
      unreadCount: 0,
      lastMessage: null,
      industry: "Finance",
      location: "Chicago, IL",
      connectionStrength: 78,
      status: "no-messages"
    },
    {
      id: 5,
      name: "Lisa Wang",
      jobTitle: "Software Engineer",
      company: "StartupXYZ",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      matchDate: new Date(Date.now() - 1209600000), // 2 weeks ago
      lastInteraction: new Date(Date.now() - 432000000), // 5 days ago
      unreadCount: 3,
      lastMessage: {
        sender: "Lisa Wang",
        content: "Hey! I saw your recent post about React development. Would love to chat about best practices."
      },
      industry: "Technology",
      location: "Seattle, WA",
      connectionStrength: 85,
      status: "active"
    },
    {
      id: 6,
      name: "James Thompson",
      jobTitle: "Sales Manager",
      company: "Enterprise Solutions",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      matchDate: new Date(Date.now() - 1814400000), // 3 weeks ago
      lastInteraction: new Date(Date.now() - 1209600000), // 2 weeks ago
      unreadCount: 0,
      lastMessage: {
        sender: "You",
        content: "Great meeting you at the networking event! Let\'s stay in touch."
      },
      industry: "Sales",
      location: "Boston, MA",
      connectionStrength: 72,
      status: "archived"
    }
  ];

  // Filter and sort matches based on current settings
  const filteredAndSortedMatches = useMemo(() => {
    let filtered = mockMatches;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(match =>
        match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tab filter
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    switch (activeTab) {
      case 'recent':
        filtered = filtered.filter(match => new Date(match.matchDate) > oneWeekAgo);
        break;
      case 'pending':
        filtered = filtered.filter(match => match.status === 'pending');
        break;
      case 'all':
      default:
        // Show all matches
        break;
    }

    // Apply advanced filters
    if (filters.industries.length > 0) {
      filtered = filtered.filter(match => filters.industries.includes(match.industry));
    }

    if (filters.locations.length > 0) {
      filtered = filtered.filter(match => filters.locations.includes(match.location));
    }

    if (filters.interactionStatus.length > 0) {
      filtered = filtered.filter(match => filters.interactionStatus.includes(match.status));
    }

    // Apply sorting
    switch (currentSort) {
      case 'recent-activity':
        filtered.sort((a, b) => new Date(b.lastInteraction) - new Date(a.lastInteraction));
        break;
      case 'match-date':
        filtered.sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'connection-strength':
        filtered.sort((a, b) => b.connectionStrength - a.connectionStrength);
        break;
      case 'unread-messages':
        filtered.sort((a, b) => b.unreadCount - a.unreadCount);
        break;
      default:
        break;
    }

    return filtered;
  }, [mockMatches, searchQuery, activeTab, filters, currentSort]);

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      recent: mockMatches.filter(match => new Date(match.matchDate) > oneWeekAgo).length,
      all: mockMatches.length,
      pending: mockMatches.filter(match => match.status === 'pending').length
    };
  }, [mockMatches]);

  const handleMessage = (match) => {
    console.log('Opening message with:', match.name);
    // Navigate to messages with specific match
    navigate('/messages', { state: { selectedMatch: match } });
  };

  const handleViewProfile = (match) => {
    console.log('Viewing profile:', match.name);
    // In a real app, this would navigate to profile view
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handlePullToRefresh = (e) => {
    if (e.touches && e.touches[0].clientY > 100) {
      handleRefresh();
    }
  };

  const getEmptyStateType = () => {
    if (searchQuery) return 'search';
    if (activeTab === 'pending') return 'pending';
    if (activeTab === 'recent') return 'recent';
    return 'default';
  };

  useEffect(() => {
    // Set page title
    document.title = 'Matches - WorkMatch';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MatchesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterClick={() => setIsFilterModalOpen(true)}
        onSortClick={() => setIsSortModalOpen(true)}
        matchCount={mockMatches.length}
      />

      {/* Tabs */}
      <MatchesTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={tabCounts}
      />

      {/* Main content */}
      <div 
        className="pb-20 md:pb-8"
        onTouchStart={handlePullToRefresh}
      >
        {isRefreshing && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        {filteredAndSortedMatches.length === 0 ? (
          <EmptyState
            type={getEmptyStateType()}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        ) : (
          <div className="p-4">
            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-text-secondary">
                {filteredAndSortedMatches.length} {filteredAndSortedMatches.length === 1 ? 'match' : 'matches'}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Matches grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onMessage={handleMessage}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
      />
    </div>
  );
};

export default MatchesPage;