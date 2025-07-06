import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const FilterModal = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
    'Sales', 'Consulting', 'Manufacturing', 'Retail', 'Real Estate'
  ];

  const locations = [
    'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL',
    'Boston, MA', 'Seattle, WA', 'Austin, TX', 'Denver, CO', 'Miami, FL'
  ];

  const connectionDates = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const interactionStatus = [
    { value: 'active', label: 'Active Conversations' },
    { value: 'unread', label: 'Unread Messages' },
    { value: 'no-messages', label: 'No Messages Yet' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleFilterChange = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      industries: [],
      locations: [],
      connectionDate: [],
      interactionStatus: []
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).reduce((count, arr) => count + arr.length, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-end md:items-center justify-center">
      <div className="bg-surface w-full md:w-96 md:rounded-xl shadow-professional-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary font-heading">
            Filter Matches
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Close filter"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-6">
            {/* Industry */}
            <div>
              <h3 className="font-medium text-text-primary mb-3">Industry</h3>
              <div className="space-y-2">
                {industries.map((industry) => (
                  <label key={industry} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.industries.includes(industry)}
                      onChange={() => handleFilterChange('industries', industry)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-medium text-text-primary mb-3">Location</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <label key={location} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.locations.includes(location)}
                      onChange={() => handleFilterChange('locations', location)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Connection Date */}
            <div>
              <h3 className="font-medium text-text-primary mb-3">Connection Date</h3>
              <div className="space-y-2">
                {connectionDates.map((date) => (
                  <label key={date.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.connectionDate.includes(date.value)}
                      onChange={() => handleFilterChange('connectionDate', date.value)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{date.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interaction Status */}
            <div>
              <h3 className="font-medium text-text-primary mb-3">Interaction Status</h3>
              <div className="space-y-2">
                {interactionStatus.map((status) => (
                  <label key={status.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.interactionStatus.includes(status.value)}
                      onChange={() => handleFilterChange('interactionStatus', status.value)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-secondary-50">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Reset All
            </Button>
            <Button
              variant="primary"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;