import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileCompletionMeter = ({ completionData }) => {
  const {
    photos = { completed: false, count: 0 },
    summary = { completed: false, length: 0 },
    skills = { completed: false, count: 0 },
    experience = { completed: false, count: 0 },
    education = { completed: false, count: 0 },
    objectives = { completed: false, count: 0 }
  } = completionData;

  const sections = [
    {
      key: 'photos',
      title: 'Photos',
      icon: 'Camera',
      completed: photos.completed,
      progress: Math.min((photos.count / 1) * 100, 100),
      requirement: 'At least 1 photo',
      status: photos.count > 0 ? `${photos.count} photo${photos.count !== 1 ? 's' : ''} added` : 'No photos added'
    },
    {
      key: 'summary',
      title: 'Professional Summary',
      icon: 'FileText',
      completed: summary.completed,
      progress: Math.min((summary.length / 50) * 100, 100),
      requirement: 'At least 50 characters',
      status: summary.length > 0 ? `${summary.length} characters` : 'No summary written'
    },
    {
      key: 'skills',
      title: 'Skills & Expertise',
      icon: 'Award',
      completed: skills.completed,
      progress: Math.min((skills.count / 3) * 100, 100),
      requirement: 'At least 3 skills',
      status: skills.count > 0 ? `${skills.count} skill${skills.count !== 1 ? 's' : ''} added` : 'No skills added'
    },
    {
      key: 'experience',
      title: 'Work Experience',
      icon: 'Briefcase',
      completed: experience.completed,
      progress: experience.count > 0 ? 100 : 0,
      requirement: 'At least 1 experience',
      status: experience.count > 0 ? `${experience.count} experience${experience.count !== 1 ? 's' : ''} added` : 'No experience added'
    },
    {
      key: 'education',
      title: 'Education',
      icon: 'GraduationCap',
      completed: education.completed,
      progress: education.count > 0 ? 100 : 0,
      requirement: 'At least 1 education entry',
      status: education.count > 0 ? `${education.count} education entr${education.count !== 1 ? 'ies' : 'y'} added` : 'No education added'
    },
    {
      key: 'objectives',
      title: 'Career Objectives',
      icon: 'Target',
      completed: objectives.completed,
      progress: objectives.count > 0 ? 100 : 0,
      requirement: 'Complete preferences',
      status: objectives.completed ? 'Objectives completed' : 'Objectives incomplete'
    }
  ];

  const completedSections = sections.filter(section => section.completed).length;
  const totalSections = sections.length;
  const overallProgress = (completedSections / totalSections) * 100;

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 50) return 'bg-accent';
    return 'bg-primary';
  };

  const getStatusColor = (completed) => {
    return completed ? 'text-success' : 'text-text-secondary';
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
      {/* Overall Progress */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-secondary-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${overallProgress * 1.76} 176`}
                className="text-primary transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-text-primary">
                {Math.round(overallProgress)}%
              </span>
            </div>
          </div>
          
          <div className="text-left">
            <h3 className="text-xl font-semibold text-text-primary">
              Profile Completion
            </h3>
            <p className="text-text-secondary">
              {completedSections} of {totalSections} sections complete
            </p>
          </div>
        </div>

        {overallProgress === 100 ? (
          <div className="bg-success-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-success">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Profile Complete!</span>
            </div>
            <p className="text-sm text-success mt-1">
              Your profile is ready to start making connections
            </p>
          </div>
        ) : (
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Icon name="Clock" size={20} />
              <span className="font-medium">
                {totalSections - completedSections} section{totalSections - completedSections !== 1 ? 's' : ''} remaining
              </span>
            </div>
            <p className="text-sm text-primary mt-1">
              Complete your profile to improve match quality
            </p>
          </div>
        )}
      </div>

      {/* Section Details */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Section Progress</h4>
        
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${section.completed ? 'bg-success text-success-foreground' : 'bg-secondary-100 text-text-secondary'}
                  `}>
                    {section.completed ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={section.icon} size={16} />
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-text-primary text-sm">
                      {section.title}
                    </h5>
                    <p className={`text-xs ${getStatusColor(section.completed)}`}>
                      {section.status}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-xs font-medium ${getStatusColor(section.completed)}`}>
                    {section.completed ? 'Complete' : section.requirement}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-secondary-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(section.progress)}`}
                  style={{ width: `${section.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips for Completion */}
      {overallProgress < 100 && (
        <div className="bg-accent-50 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2 flex items-center">
            <Icon name="Lightbulb" size={16} className="text-accent mr-2" />
            Tips for Better Matches
          </h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Complete all sections for 3x more profile views</li>
            <li>• Add multiple photos to increase connection rates</li>
            <li>• Detailed work experience helps with better matches</li>
            <li>• Clear career objectives improve recommendation quality</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionMeter;