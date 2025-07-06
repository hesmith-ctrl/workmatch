import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePreview = ({ profileData }) => {
  const {
    photos = [],
    summary = '',
    skills = [],
    experiences = [],
    education = [],
    objectives = {}
  } = profileData;

  const primaryPhoto = photos.find(photo => photo.isPrimary) || photos[0];
  const topSkills = skills.slice(0, 6);
  const latestExperience = experiences[0];
  const latestEducation = education[0];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-secondary-100 text-secondary-600';
      case 'Intermediate': return 'bg-primary-100 text-primary-600';
      case 'Advanced': return 'bg-accent-100 text-accent-600';
      case 'Expert': return 'bg-success-100 text-success-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-professional-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Profile Preview</h3>
          <div className="bg-white/20 rounded-full px-3 py-1">
            <span className="text-sm font-medium">Live Preview</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
            {primaryPhoto ? (
              <Image
                src={primaryPhoto.url}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} className="text-white/60" />
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-1">
              {latestExperience?.title || 'Your Name'}
            </h4>
            <p className="text-white/80">
              {latestExperience?.company || 'Your Company'}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-white/70">
              <span className="flex items-center">
                <Icon name="MapPin" size={14} className="mr-1" />
                {latestExperience?.location || 'Your Location'}
              </span>
              <span className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                500+ connections
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Summary */}
        <div>
          <h5 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="FileText" size={16} className="text-primary mr-2" />
            About
          </h5>
          {summary ? (
            <p className="text-text-secondary leading-relaxed text-sm">
              {summary.length > 200 ? `${summary.substring(0, 200)}...` : summary}
            </p>
          ) : (
            <p className="text-text-muted italic text-sm">
              Your professional summary will appear here
            </p>
          )}
        </div>

        {/* Skills */}
        <div>
          <h5 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Award" size={16} className="text-primary mr-2" />
            Top Skills
          </h5>
          {topSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <span
                  key={skill.id}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-text-muted italic text-sm">
              Your skills will appear here
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <h5 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Briefcase" size={16} className="text-primary mr-2" />
            Experience
          </h5>
          {latestExperience ? (
            <div className="space-y-2">
              <div>
                <h6 className="font-medium text-text-primary">
                  {latestExperience.title}
                </h6>
                <p className="text-primary text-sm font-medium">
                  {latestExperience.company}
                </p>
                <p className="text-text-secondary text-xs">
                  {formatDate(latestExperience.startDate)} - {latestExperience.current ? 'Present' : formatDate(latestExperience.endDate)}
                </p>
              </div>
              {latestExperience.description && (
                <p className="text-text-secondary text-sm leading-relaxed">
                  {latestExperience.description.length > 100 
                    ? `${latestExperience.description.substring(0, 100)}...`
                    : latestExperience.description
                  }
                </p>
              )}
            </div>
          ) : (
            <p className="text-text-muted italic text-sm">
              Your work experience will appear here
            </p>
          )}
        </div>

        {/* Education */}
        <div>
          <h5 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="GraduationCap" size={16} className="text-primary mr-2" />
            Education
          </h5>
          {latestEducation ? (
            <div>
              <h6 className="font-medium text-text-primary">
                {latestEducation.degree}
                {latestEducation.field && ` in ${latestEducation.field}`}
              </h6>
              <p className="text-primary text-sm font-medium">
                {latestEducation.institution}
              </p>
              <p className="text-text-secondary text-xs">
                {formatDate(latestEducation.startDate)} - {latestEducation.current ? 'Present' : formatDate(latestEducation.endDate)}
              </p>
            </div>
          ) : (
            <p className="text-text-muted italic text-sm">
              Your education will appear here
            </p>
          )}
        </div>

        {/* Career Objectives */}
        {objectives.goals && objectives.goals.length > 0 && (
          <div>
            <h5 className="font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Target" size={16} className="text-primary mr-2" />
              Career Goals
            </h5>
            <div className="flex flex-wrap gap-2">
              {objectives.goals.slice(0, 3).map((goal, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-50 text-accent border border-accent-200 rounded-full text-xs font-medium"
                >
                  {goal}
                </span>
              ))}
              {objectives.goals.length > 3 && (
                <span className="px-3 py-1 bg-secondary-100 text-text-secondary rounded-full text-xs font-medium">
                  +{objectives.goals.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        {photos.length > 1 && (
          <div>
            <h5 className="font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Camera" size={16} className="text-primary mr-2" />
              Photos ({photos.length})
            </h5>
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(0, 6).map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden bg-secondary-100"
                >
                  <Image
                    src={photo.url}
                    alt="Profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-secondary-50 px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-text-secondary">
            <span className="flex items-center">
              <Icon name="Eye" size={14} className="mr-1" />
              Profile views: 0
            </span>
            <span className="flex items-center">
              <Icon name="Heart" size={14} className="mr-1" />
              Matches: 0
            </span>
          </div>
          
          <div className="text-text-muted">
            Last updated: Just now
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;