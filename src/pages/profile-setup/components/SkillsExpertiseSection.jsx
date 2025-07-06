import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SkillsExpertiseSection = ({ skills, onSkillsChange, isCompleted, onComplete }) => {
  const [skillInput, setSkillInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const skillSuggestions = [
    // Technical Skills
    "JavaScript", "React", "Node.js", "Python", "Java", "TypeScript", "HTML/CSS", "SQL", "MongoDB", "PostgreSQL",
    "AWS", "Docker", "Kubernetes", "Git", "GraphQL", "REST APIs", "Machine Learning", "Data Analysis", "Cybersecurity",
    
    // Business Skills
    "Project Management", "Agile/Scrum", "Strategic Planning", "Business Analysis", "Financial Analysis", "Marketing Strategy",
    "Sales Management", "Customer Success", "Product Management", "UX/UI Design", "Digital Marketing", "Content Strategy",
    
    // Soft Skills
    "Leadership", "Team Management", "Communication", "Problem Solving", "Critical Thinking", "Negotiation",
    "Public Speaking", "Mentoring", "Cross-functional Collaboration", "Change Management", "Time Management",
    
    // Industry Specific
    "Healthcare", "Fintech", "E-commerce", "SaaS", "Manufacturing", "Consulting", "Education", "Non-profit",
    "Real Estate", "Legal", "Media", "Gaming", "Blockchain", "IoT", "Mobile Development"
  ];

  const trendingSkills = [
    "Artificial Intelligence", "Machine Learning", "Cloud Computing", "DevOps", "Cybersecurity",
    "Data Science", "Product Management", "Digital Transformation", "Remote Work", "Sustainability"
  ];

  const filteredSuggestions = skillSuggestions.filter(skill =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !skills.some(existingSkill => existingSkill.name.toLowerCase() === skill.toLowerCase())
  );

  const handleAddSkill = (skillName, level = 'Intermediate') => {
    if (skillName.trim() && !skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const newSkill = {
        id: Date.now() + Math.random(),
        name: skillName.trim(),
        level: level,
        endorsed: false,
        endorsements: Math.floor(Math.random() * 20)
      };
      onSkillsChange([...skills, newSkill]);
      setSkillInput('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillId) => {
    onSkillsChange(skills.filter(skill => skill.id !== skillId));
  };

  const handleSkillLevelChange = (skillId, newLevel) => {
    onSkillsChange(skills.map(skill =>
      skill.id === skillId ? { ...skill, level: newLevel } : skill
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      handleAddSkill(skillInput);
    }
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-secondary-100 text-secondary-600';
      case 'Intermediate': return 'bg-primary-100 text-primary-600';
      case 'Advanced': return 'bg-accent-100 text-accent-600';
      case 'Expert': return 'bg-success-100 text-success-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Skills & Expertise
        </h3>
        <p className="text-text-secondary">
          Add your professional skills and set proficiency levels to showcase your expertise.
        </p>
      </div>

      {/* Skill Input */}
      <div className="relative">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type a skill (e.g., JavaScript, Project Management, Leadership)"
              value={skillInput}
              onChange={(e) => {
                setSkillInput(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Icon
              name="Search"
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
          </div>
          
          <Button
            variant="primary"
            onClick={() => handleAddSkill(skillInput)}
            disabled={!skillInput.trim()}
            iconName="Plus"
            iconPosition="left"
          >
            Add
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 bg-surface border border-border rounded-lg shadow-professional-lg mt-1 max-h-60 overflow-y-auto">
            {filteredSuggestions.slice(0, 10).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleAddSkill(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="text-text-primary">{suggestion}</span>
                <Icon name="Plus" size={14} className="text-text-muted" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Trending Skills */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary flex items-center">
          <Icon name="TrendingUp" size={16} className="text-accent mr-2" />
          Trending Skills
        </h4>
        
        <div className="flex flex-wrap gap-2">
          {trendingSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleAddSkill(skill)}
              disabled={skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
              className="px-3 py-1 bg-accent-50 text-accent border border-accent-200 rounded-full text-sm hover:bg-accent-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary flex items-center">
            <Icon name="Award" size={16} className="text-primary mr-2" />
            Your Skills ({skills.length})
          </h4>
          
          <div className="space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-professional-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h5 className="font-medium text-text-primary">{skill.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveSkill(skill.id)}
                    iconName="X"
                    className="p-1"
                    aria-label="Remove skill"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {skillLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => handleSkillLevelChange(skill.id, level)}
                        className={`px-2 py-1 text-xs rounded transition-colors duration-200 ${
                          skill.level === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-text-muted">
                    <Icon name="Users" size={14} />
                    <span>{skill.endorsements} endorsements</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Categories */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Grid3x3" size={16} className="text-primary mr-2" />
          Skill Categories
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <h5 className="font-medium text-text-primary mb-2">Technical</h5>
            <ul className="text-text-secondary space-y-1">
              <li>Programming</li>
              <li>Databases</li>
              <li>Cloud Platforms</li>
              <li>DevOps</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-text-primary mb-2">Business</h5>
            <ul className="text-text-secondary space-y-1">
              <li>Strategy</li>
              <li>Analysis</li>
              <li>Marketing</li>
              <li>Sales</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-text-primary mb-2">Leadership</h5>
            <ul className="text-text-secondary space-y-1">
              <li>Team Management</li>
              <li>Mentoring</li>
              <li>Communication</li>
              <li>Decision Making</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-text-primary mb-2">Creative</h5>
            <ul className="text-text-secondary space-y-1">
              <li>Design</li>
              <li>Content Creation</li>
              <li>Branding</li>
              <li>Innovation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {skills.length >= 3 && !isCompleted && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => onComplete(true)}
            iconName="Check"
            iconPosition="left"
          >
            Skills Complete
          </Button>
        </div>
      )}

      {skills.length < 3 && (
        <div className="text-center text-text-secondary">
          <Icon name="Info" size={16} className="inline mr-1" />
          Add at least 3 skills to complete this section
        </div>
      )}
    </div>
  );
};

export default SkillsExpertiseSection;