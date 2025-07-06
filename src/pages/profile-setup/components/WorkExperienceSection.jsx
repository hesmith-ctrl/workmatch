import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WorkExperienceSection = ({ experiences, onExperiencesChange, isCompleted, onComplete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    if (formData.achievements.length > 1) {
      const newAchievements = formData.achievements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        achievements: newAchievements
      }));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.company) return;

    const experienceData = {
      id: editingId || Date.now() + Math.random(),
      ...formData,
      achievements: formData.achievements.filter(achievement => achievement.trim())
    };

    if (editingId) {
      onExperiencesChange(experiences.map(exp => 
        exp.id === editingId ? experienceData : exp
      ));
    } else {
      onExperiencesChange([...experiences, experienceData]);
    }

    resetForm();
  };

  const handleEdit = (experience) => {
    setFormData(experience);
    setEditingId(experience.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    onExperiencesChange(experiences.filter(exp => exp.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate, endDate, current) => {
    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Work Experience
        </h3>
        <p className="text-text-secondary">
          Add your professional experience to showcase your career journey.
        </p>
      </div>

      {/* Add Experience Button */}
      {!showAddForm && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Work Experience
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">
              {editingId ? 'Edit Experience' : 'Add Work Experience'}
            </h4>
            <Button
              variant="ghost"
              onClick={resetForm}
              iconName="X"
              className="p-2"
              aria-label="Close form"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
            
            <Input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              required
            />
            
            <Input
              type="text"
              placeholder="Location (City, State)"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => handleInputChange('current', e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="current" className="text-sm text-text-primary">
                I currently work here
              </label>
            </div>
            
            <Input
              type="month"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              required
            />
            
            {!formData.current && (
              <Input
                type="month"
                placeholder="End Date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Job Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your role, responsibilities, and key contributions..."
              className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Key Achievements
            </label>
            <div className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="• Describe a specific achievement or accomplishment"
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.achievements.length > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => removeAchievement(index)}
                      iconName="Trash2"
                      className="p-2"
                      aria-label="Remove achievement"
                    />
                  )}
                </div>
              ))}
              
              <Button
                variant="text"
                onClick={addAchievement}
                iconName="Plus"
                iconPosition="left"
                className="text-sm"
              >
                Add Achievement
              </Button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={resetForm}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!formData.title || !formData.company}
              className="flex-1"
            >
              {editingId ? 'Update' : 'Save'} Experience
            </Button>
          </div>
        </div>
      )}

      {/* Experience List */}
      {experiences.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary flex items-center">
            <Icon name="Briefcase" size={16} className="text-primary mr-2" />
            Your Experience ({experiences.length})
          </h4>
          
          <div className="space-y-4">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-surface border border-border rounded-lg p-6 hover:shadow-professional-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="font-semibold text-text-primary text-lg">
                      {experience.title}
                    </h5>
                    <p className="text-primary font-medium">
                      {experience.company}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                      {experience.location && (
                        <span className="flex items-center">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {experience.location}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {calculateDuration(experience.startDate, experience.endDate, experience.current)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleEdit(experience)}
                      iconName="Edit"
                      className="p-2"
                      aria-label="Edit experience"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(experience.id)}
                      iconName="Trash2"
                      className="p-2 text-error hover:text-error"
                      aria-label="Delete experience"
                    />
                  </div>
                </div>

                {experience.description && (
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {experience.description}
                  </p>
                )}

                {experience.achievements && experience.achievements.length > 0 && (
                  <div>
                    <h6 className="font-medium text-text-primary mb-2">Key Achievements:</h6>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start text-text-secondary">
                          <Icon name="ChevronRight" size={14} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-accent-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="text-accent mr-2" />
          Experience Tips
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Include quantifiable achievements (increased sales by 30%)</li>
          <li>• Use action verbs to describe your responsibilities</li>
          <li>• Focus on results and impact, not just duties</li>
          <li>• Keep descriptions concise but informative</li>
          <li>• List experiences in reverse chronological order</li>
        </ul>
      </div>

      {/* Completion Status */}
      {experiences.length > 0 && !isCompleted && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => onComplete(true)}
            iconName="Check"
            iconPosition="left"
          >
            Experience Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceSection;