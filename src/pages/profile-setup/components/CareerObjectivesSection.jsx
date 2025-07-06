import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerObjectivesSection = ({ objectives, onObjectivesChange, isCompleted, onComplete }) => {
  const [selectedGoals, setSelectedGoals] = useState(objectives.goals || []);
  const [selectedIndustries, setSelectedIndustries] = useState(objectives.industries || []);
  const [selectedRoles, setSelectedRoles] = useState(objectives.roles || []);
  const [workPreferences, setWorkPreferences] = useState(objectives.workPreferences || {});
  const [connectionTypes, setConnectionTypes] = useState(objectives.connectionTypes || []);

  const careerGoals = [
    "Find a new job opportunity",
    "Advance in current career",
    "Change career paths",
    "Start my own business",
    "Find business partners",
    "Expand professional network",
    "Find mentorship opportunities",
    "Become a mentor to others",
    "Freelance opportunities",
    "Consulting projects",
    "Speaking engagements",
    "Board positions"
  ];

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Retail", "Consulting", "Media & Entertainment", "Real Estate", "Legal",
    "Non-profit", "Government", "Automotive", "Energy", "Telecommunications",
    "Food & Beverage", "Fashion", "Sports", "Travel & Hospitality", "Agriculture"
  ];

  const roleTypes = [
    "Individual Contributor", "Team Lead", "Manager", "Senior Manager",
    "Director", "VP/SVP", "C-Level Executive", "Founder/Co-founder",
    "Consultant", "Freelancer", "Board Member", "Advisor"
  ];

  const connectionTypeOptions = [
    "Potential employers", "Industry peers", "Mentors", "Mentees",
    "Business partners", "Clients", "Investors", "Advisors",
    "Collaborators", "Speakers", "Recruiters", "Vendors"
  ];

  const handleGoalToggle = (goal) => {
    const updated = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal];
    setSelectedGoals(updated);
    updateObjectives('goals', updated);
  };

  const handleIndustryToggle = (industry) => {
    const updated = selectedIndustries.includes(industry)
      ? selectedIndustries.filter(i => i !== industry)
      : [...selectedIndustries, industry];
    setSelectedIndustries(updated);
    updateObjectives('industries', updated);
  };

  const handleRoleToggle = (role) => {
    const updated = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(updated);
    updateObjectives('roles', updated);
  };

  const handleConnectionTypeToggle = (type) => {
    const updated = connectionTypes.includes(type)
      ? connectionTypes.filter(t => t !== type)
      : [...connectionTypes, type];
    setConnectionTypes(updated);
    updateObjectives('connectionTypes', updated);
  };

  const handleWorkPreferenceChange = (key, value) => {
    const updated = { ...workPreferences, [key]: value };
    setWorkPreferences(updated);
    updateObjectives('workPreferences', updated);
  };

  const updateObjectives = (key, value) => {
    const updated = { ...objectives, [key]: value };
    onObjectivesChange(updated);
  };

  const isMinimumCompleted = () => {
    return selectedGoals.length > 0 && selectedIndustries.length > 0 && connectionTypes.length > 0;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Career Objectives & Preferences
        </h3>
        <p className="text-text-secondary">
          Help us understand your career goals and preferences to find better matches.
        </p>
      </div>

      {/* Career Goals */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary flex items-center">
          <Icon name="Target" size={18} className="text-primary mr-2" />
          What are your career goals?
          <span className="text-sm font-normal text-text-secondary ml-2">(Select all that apply)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {careerGoals.map((goal) => (
            <button
              key={goal}
              onClick={() => handleGoalToggle(goal)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${selectedGoals.includes(goal)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-primary hover:bg-primary-50/50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{goal}</span>
                {selectedGoals.includes(goal) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Industries of Interest */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary flex items-center">
          <Icon name="Building" size={18} className="text-primary mr-2" />
          Which industries interest you?
          <span className="text-sm font-normal text-text-secondary ml-2">(Select up to 5)</span>
        </h4>
        
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleIndustryToggle(industry)}
              disabled={!selectedIndustries.includes(industry) && selectedIndustries.length >= 5}
              className={`
                px-4 py-2 rounded-full border transition-all duration-200
                ${selectedIndustries.includes(industry)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface hover:border-primary hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }
              `}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Role Preferences */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary flex items-center">
          <Icon name="Users" size={18} className="text-primary mr-2" />
          What types of roles are you interested in?
          <span className="text-sm font-normal text-text-secondary ml-2">(Select all that apply)</span>
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {roleTypes.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleToggle(role)}
              className={`
                p-3 rounded-lg border text-center transition-all duration-200
                ${selectedRoles.includes(role)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-primary hover:bg-primary-50/50'
                }
              `}
            >
              <span className="text-sm font-medium">{role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Work Preferences */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary flex items-center">
          <Icon name="Settings" size={18} className="text-primary mr-2" />
          Work Preferences
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              Work Arrangement
            </label>
            <div className="space-y-2">
              {['Remote', 'Hybrid', 'On-site', 'Flexible'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="workArrangement"
                    value={option}
                    checked={workPreferences.workArrangement === option}
                    onChange={(e) => handleWorkPreferenceChange('workArrangement', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              Company Size Preference
            </label>
            <div className="space-y-2">
              {['Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)', 'No preference'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="companySize"
                    value={option}
                    checked={workPreferences.companySize === option}
                    onChange={(e) => handleWorkPreferenceChange('companySize', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connection Types */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary flex items-center">
          <Icon name="Network" size={18} className="text-primary mr-2" />
          Who would you like to connect with?
          <span className="text-sm font-normal text-text-secondary ml-2">(Select all that apply)</span>
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {connectionTypeOptions.map((type) => (
            <button
              key={type}
              onClick={() => handleConnectionTypeToggle(type)}
              className={`
                p-3 rounded-lg border text-center transition-all duration-200
                ${connectionTypes.includes(type)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-primary hover:bg-primary-50/50'
                }
              `}
            >
              <span className="text-sm font-medium">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary flex items-center">
          <Icon name="Calendar" size={18} className="text-primary mr-2" />
          Availability
        </h4>
        
        <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={workPreferences.immediatelyAvailable || false}
                onChange={(e) => handleWorkPreferenceChange('immediatelyAvailable', e.target.checked)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-text-primary">Immediately available</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={workPreferences.openToOpportunities || false}
                onChange={(e) => handleWorkPreferenceChange('openToOpportunities', e.target.checked)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-text-primary">Open to opportunities</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              value={workPreferences.notes || ''}
              onChange={(e) => handleWorkPreferenceChange('notes', e.target.value)}
              placeholder="Any additional information about your career objectives or preferences..."
              className="w-full h-20 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {isMinimumCompleted() && (
        <div className="bg-success-50 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} className="text-success mr-2" />
            Your Career Objectives Summary
          </h4>
          
          <div className="space-y-2 text-sm text-text-secondary">
            <p><strong>Goals:</strong> {selectedGoals.join(', ')}</p>
            <p><strong>Industries:</strong> {selectedIndustries.join(', ')}</p>
            <p><strong>Connection Types:</strong> {connectionTypes.join(', ')}</p>
            {selectedRoles.length > 0 && (
              <p><strong>Role Types:</strong> {selectedRoles.join(', ')}</p>
            )}
          </div>
        </div>
      )}

      {/* Completion Status */}
      {isMinimumCompleted() && !isCompleted && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => onComplete(true)}
            iconName="Check"
            iconPosition="left"
          >
            Objectives Complete
          </Button>
        </div>
      )}

      {!isMinimumCompleted() && (
        <div className="text-center text-text-secondary">
          <Icon name="Info" size={16} className="inline mr-1" />
          Please select at least one goal, industry, and connection type to complete this section
        </div>
      )}
    </div>
  );
};

export default CareerObjectivesSection;