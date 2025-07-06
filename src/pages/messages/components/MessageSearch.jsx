import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MessageSearch = ({ onSearch, onClose, isVisible }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const mockSuggestions = [
    'project update',
    'meeting schedule',
    'collaboration',
    'networking event',
    'job opportunity',
    'portfolio review',
    'business proposal',
    'partnership'
  ];

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('messageSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Add to search history
      const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('messageSearchHistory', JSON.stringify(newHistory));
      
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleHistoryClick = (historyItem) => {
    setSearchQuery(historyItem);
    handleSearch(historyItem);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('messageSearchHistory');
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-surface z-50 flex flex-col">
      {/* Search header */}
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <Button
          variant="ghost"
          onClick={onClose}
          iconName="ArrowLeft"
          className="p-2"
          aria-label="Close search"
        />
        
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search messages and conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-10"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
              aria-label="Clear search"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => handleSearch()}
          disabled={!searchQuery.trim()}
          iconName="Search"
          className="p-2"
          aria-label="Search"
        />
      </div>

      {/* Search content */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery.length === 0 ? (
          <div className="p-4 space-y-6">
            {/* Search suggestions */}
            {mockSuggestions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Popular searches</h3>
                <div className="flex flex-wrap gap-2">
                  {mockSuggestions.slice(0, 6).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-secondary-100 text-text-secondary text-sm rounded-full hover:bg-secondary-200 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search history */}
            {searchHistory.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-text-primary">Recent searches</h3>
                  <Button
                    variant="text"
                    onClick={clearSearchHistory}
                    className="text-xs text-text-muted hover:text-text-primary"
                  >
                    Clear all
                  </Button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="flex items-center space-x-3 w-full p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                    >
                      <Icon name="Clock" size={16} className="text-text-muted" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search tips */}
            <div className="bg-primary-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-text-primary mb-2">Search tips</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Search by contact name or message content</li>
                <li>• Use quotes for exact phrases</li>
                <li>• Search file names and attachments</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Search suggestions while typing */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-text-primary mb-2">Suggestions</h3>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center space-x-3 w-full p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                    >
                      <Icon name="Search" size={16} className="text-text-muted" />
                      <span className="text-sm text-text-primary">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search results placeholder */}
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={24} className="text-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Searching for "{searchQuery}"
              </h3>
              <p className="text-text-secondary">
                Press Enter or tap search to find messages
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSearch;