import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EducationSection = ({ education, onEducationChange, isCompleted, onComplete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    field: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    activities: '',
    description: ''
  });

  const degreeTypes = [
    "High School Diploma",
    "Associate\'s Degree",
    "Bachelor\'s Degree",
    "Master\'s Degree",
    "Doctoral Degree (PhD)",
    "Professional Degree (JD, MD, etc.)",
    "Certificate Program",
    "Bootcamp",
    "Online Course",
    "Other"
  ];

  const popularFields = [
    "Computer Science", "Business Administration", "Engineering", "Marketing", "Finance",
    "Psychology", "Communications", "Biology", "Mathematics", "Economics",
    "Graphic Design", "Data Science", "Information Technology", "Nursing", "Education",
    "Political Science", "Chemistry", "Physics", "History", "English Literature"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.degree || !formData.institution) return;

    const educationData = {
      id: editingId || Date.now() + Math.random(),
      ...formData
    };

    if (editingId) {
      onEducationChange(education.map(edu => 
        edu.id === editingId ? educationData : edu
      ));
    } else {
      onEducationChange([...education, educationData]);
    }

    resetForm();
  };

  const handleEdit = (educationItem) => {
    setFormData(educationItem);
    setEditingId(educationItem.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    onEducationChange(education.filter(edu => edu.id !== id));
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      activities: '',
      description: ''
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Education History
        </h3>
        <p className="text-text-secondary">
          Add your educational background to showcase your academic achievements.
        </p>
      </div>

      {/* Add Education Button */}
      {!showAddForm && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Education
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">
              {editingId ? 'Edit Education' : 'Add Education'}
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
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Degree Type
              </label>
              <select
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                required
              >
                <option value="">Select degree type</option>
                {degreeTypes.map((degree) => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Field of Study
              </label>
              <Input
                type="text"
                placeholder="e.g., Computer Science, Business"
                value={formData.field}
                onChange={(e) => handleInputChange('field', e.target.value)}
                list="fields"
              />
              <datalist id="fields">
                {popularFields.map((field) => (
                  <option key={field} value={field} />
                ))}
              </datalist>
            </div>
            
            <Input
              type="text"
              placeholder="Institution Name"
              value={formData.institution}
              onChange={(e) => handleInputChange('institution', e.target.value)}
              required
            />
            
            <Input
              type="text"
              placeholder="Location (City, State)"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            
            <Input
              type="month"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="current-education"
                  checked={formData.current}
                  onChange={(e) => handleInputChange('current', e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="current-education" className="text-sm text-text-primary">
                  Currently studying here
                </label>
              </div>
              
              {!formData.current && (
                <Input
                  type="month"
                  placeholder="End Date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              )}
            </div>
            
            <Input
              type="text"
              placeholder="GPA (optional)"
              value={formData.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Activities & Societies
            </label>
            <Input
              type="text"
              placeholder="e.g., Student Government, Honor Society, Sports Teams"
              value={formData.activities}
              onChange={(e) => handleInputChange('activities', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe relevant coursework, projects, achievements, or honors..."
              className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
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
              disabled={!formData.degree || !formData.institution}
              className="flex-1"
            >
              {editingId ? 'Update' : 'Save'} Education
            </Button>
          </div>
        </div>
      )}

      {/* Education List */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary flex items-center">
            <Icon name="GraduationCap" size={16} className="text-primary mr-2" />
            Your Education ({education.length})
          </h4>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="bg-surface border border-border rounded-lg p-6 hover:shadow-professional-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="font-semibold text-text-primary text-lg">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h5>
                    <p className="text-primary font-medium">
                      {edu.institution}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                      {edu.location && (
                        <span className="flex items-center">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {edu.location}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </span>
                      {edu.gpa && (
                        <span className="flex items-center">
                          <Icon name="Award" size={14} className="mr-1" />
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleEdit(edu)}
                      iconName="Edit"
                      className="p-2"
                      aria-label="Edit education"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(edu.id)}
                      iconName="Trash2"
                      className="p-2 text-error hover:text-error"
                      aria-label="Delete education"
                    />
                  </div>
                </div>

                {edu.activities && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-text-primary">Activities: </span>
                    <span className="text-sm text-text-secondary">{edu.activities}</span>
                  </div>
                )}

                {edu.description && (
                  <p className="text-text-secondary leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-success-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center">
          <Icon name="BookOpen" size={16} className="text-success mr-2" />
          Education Tips
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Include relevant coursework for your career goals</li>
          <li>• Mention academic honors, scholarships, or awards</li>
          <li>• Add extracurricular activities that show leadership</li>
          <li>• Include online courses and certifications</li>
          <li>• List education in reverse chronological order</li>
        </ul>
      </div>

      {/* Completion Status */}
      {education.length > 0 && !isCompleted && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => onComplete(true)}
            iconName="Check"
            iconPosition="left"
          >
            Education Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationSection;