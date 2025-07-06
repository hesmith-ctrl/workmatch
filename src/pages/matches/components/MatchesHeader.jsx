import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MatchesHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterClick, 
  onSortClick,
  matchCount 
}) => {
  return (
    <div className="bg-surface border-b border-border sticky top-0 z-10">
      <div className="px-4 py-4 space-y-4">
        {/* Title and count */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text-primary font-heading">
              Your Matches
            </h1>
            <p className="text-sm text-text-secondary">
              {matchCount} professional connections
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={onSortClick}
              iconName="ArrowUpDown"
              className="p-2"
              aria-label="Sort matches"
            />
            <Button
              variant="ghost"
              onClick={onFilterClick}
              iconName="Filter"
              className="p-2"
              aria-label="Filter matches"
            />
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={18} className="text-text-muted" />
          </div>
          <Input
            type="search"
            placeholder="Search by name, company, or skills..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={18} className="text-text-muted hover:text-text-secondary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchesHeader;