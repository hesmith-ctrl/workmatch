import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      ageRange: [22, 65],
      distance: 50,
      industry: '',
      experienceLevel: '',
      connectionType: 'all',
      location: '',
      company: '',
      skills: []
    };
    setLocalFilters(resetFilters);
  };

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Sales',
    'Consulting',
    'Engineering',
    'Design',
    'Legal',
    'Real Estate',
    'Media',
    'Non-profit',
    'Government',
    'Other'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Executive Level (10+ years)'
  ];

  const connectionTypes = [
    { value: 'all', label: 'All Connections' },
    { value: 'networking', label: 'Networking' },
    { value: 'mentorship', label: 'Mentorship' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'job_opportunities', label: 'Job Opportunities' },
    { value: 'business_partners', label: 'Business Partners' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Close filters"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Age Range */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Age Range: {localFilters.ageRange[0]} - {localFilters.ageRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <Input
                type="range"
                min="18"
                max="65"
                value={localFilters.ageRange[0]}
                onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value), localFilters.ageRange[1]])}
                className="flex-1"
              />
              <Input
                type="range"
                min="18"
                max="65"
                value={localFilters.ageRange[1]}
                onChange={(e) => handleFilterChange('ageRange', [localFilters.ageRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Distance */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Distance: {localFilters.distance} miles
            </label>
            <Input
              type="range"
              min="1"
              max="100"
              value={localFilters.distance}
              onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Industry */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">Industry</label>
            <select
              value={localFilters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">Experience Level</label>
            <select
              value={localFilters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Connection Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">Connection Type</label>
            <div className="space-y-2">
              {connectionTypes.map(type => (
                <label key={type.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="connectionType"
                    value={type.value}
                    checked={localFilters.connectionType === type.value}
                    onChange={(e) => handleFilterChange('connectionType', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">Location</label>
            <Input
              type="text"
              placeholder="City, State or ZIP"
              value={localFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          {/* Company */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">Company</label>
            <Input
              type="text"
              placeholder="Company name"
              value={localFilters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <Button
            variant="text"
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-800"
          >
            Reset All
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;