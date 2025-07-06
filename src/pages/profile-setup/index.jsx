import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileSetupWizard from '../../components/ui/ProfileSetupWizard';
import PhotoUploadSection from './components/PhotoUploadSection';
import ProfessionalSummarySection from './components/ProfessionalSummarySection';
import SkillsExpertiseSection from './components/SkillsExpertiseSection';
import WorkExperienceSection from './components/WorkExperienceSection';
import EducationSection from './components/EducationSection';
import CareerObjectivesSection from './components/CareerObjectivesSection';
import ProfileCompletionMeter from './components/ProfileCompletionMeter';
import ProfilePreview from './components/ProfilePreview';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState({
    photos: [],
    summary: '',
    skills: [],
    experiences: [],
    education: [],
    objectives: {}
  });

  // Completion tracking
  const [completionStatus, setCompletionStatus] = useState({
    photos: false,
    summary: false,
    skills: false,
    experience: false,
    education: false,
    objectives: false
  });

  // Initialize step from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const step = parseInt(urlParams.get('step')) || 1;
    setCurrentStep(step);
  }, [location.search]);

  // Auto-save profile data
  useEffect(() => {
    const saveProfile = () => {
      localStorage.setItem('workMatchProfile', JSON.stringify(profileData));
    };

    const timeoutId = setTimeout(saveProfile, 1000);
    return () => clearTimeout(timeoutId);
  }, [profileData]);

  // Load saved profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('workMatchProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
  }, []);

  const handlePhotosChange = (photos) => {
    setProfileData(prev => ({ ...prev, photos }));
  };

  const handleSummaryChange = (summary) => {
    setProfileData(prev => ({ ...prev, summary }));
  };

  const handleSkillsChange = (skills) => {
    setProfileData(prev => ({ ...prev, skills }));
  };

  const handleExperiencesChange = (experiences) => {
    setProfileData(prev => ({ ...prev, experiences }));
  };

  const handleEducationChange = (education) => {
    setProfileData(prev => ({ ...prev, education }));
  };

  const handleObjectivesChange = (objectives) => {
    setProfileData(prev => ({ ...prev, objectives }));
  };

  const handleSectionComplete = (section, completed) => {
    setCompletionStatus(prev => ({ ...prev, [section]: completed }));
  };

  const getCompletionData = () => {
    return {
      photos: {
        completed: completionStatus.photos,
        count: profileData.photos.length
      },
      summary: {
        completed: completionStatus.summary,
        length: profileData.summary.length
      },
      skills: {
        completed: completionStatus.skills,
        count: profileData.skills.length
      },
      experience: {
        completed: completionStatus.experience,
        count: profileData.experiences.length
      },
      education: {
        completed: completionStatus.education,
        count: profileData.education.length
      },
      objectives: {
        completed: completionStatus.objectives,
        count: Object.keys(profileData.objectives).length
      }
    };
  };

  const handleCompleteProfile = () => {
    // Save final profile
    localStorage.setItem('workMatchProfileComplete', JSON.stringify({
      ...profileData,
      completedAt: new Date().toISOString()
    }));

    // Navigate to main app
    navigate('/swipe-interface');
  };

  const handleLinkedInImport = () => {
    // Mock LinkedIn import
    const mockLinkedInData = {
      photos: [{
        id: Date.now(),
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        isPrimary: true
      }],
      summary: "Experienced Software Engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and leading development teams. Currently seeking new opportunities in fintech or healthcare technology.",
      skills: [
        { id: 1, name: "JavaScript", level: "Expert", endorsed: true, endorsements: 15 },
        { id: 2, name: "React", level: "Advanced", endorsed: true, endorsements: 12 },
        { id: 3, name: "Node.js", level: "Advanced", endorsed: false, endorsements: 8 },
        { id: 4, name: "Python", level: "Intermediate", endorsed: true, endorsements: 6 },
        { id: 5, name: "Leadership", level: "Advanced", endorsed: true, endorsements: 10 }
      ],
      experiences: [{
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "2021-03",
        endDate: "",
        current: true,
        description: "Lead development of customer-facing web applications serving 100K+ users. Manage team of 5 engineers and collaborate with product and design teams.",
        achievements: [
          "Increased application performance by 40% through optimization",
          "Led migration to microservices architecture",
          "Mentored 3 junior developers"
        ]
      }],
      education: [{
        id: 1,
        degree: "Bachelor\'s Degree",
        field: "Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        startDate: "2015-09",
        endDate: "2019-06",
        current: false,
        gpa: "3.8",
        activities: "Computer Science Club, Hackathon Winner"
      }],
      objectives: {
        goals: ["Find a new job opportunity", "Expand professional network"],
        industries: ["Technology", "Healthcare", "Finance"],
        roles: ["Senior Manager", "Director"],
        connectionTypes: ["Potential employers", "Industry peers"],
        workPreferences: {
          workArrangement: "Hybrid",
          companySize: "Medium (201-1000)",
          immediatelyAvailable: false,
          openToOpportunities: true
        }
      }
    };

    setProfileData(mockLinkedInData);
    
    // Mark all sections as completed
    setCompletionStatus({
      photos: true,
      summary: true,
      skills: true,
      experience: true,
      education: true,
      objectives: true
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhotoUploadSection
            photos={profileData.photos}
            onPhotosChange={handlePhotosChange}
            isCompleted={completionStatus.photos}
            onComplete={(completed) => handleSectionComplete('photos', completed)}
          />
        );
      case 2:
        return (
          <ProfessionalSummarySection
            summary={profileData.summary}
            onSummaryChange={handleSummaryChange}
            isCompleted={completionStatus.summary}
            onComplete={(completed) => handleSectionComplete('summary', completed)}
          />
        );
      case 3:
        return (
          <SkillsExpertiseSection
            skills={profileData.skills}
            onSkillsChange={handleSkillsChange}
            isCompleted={completionStatus.skills}
            onComplete={(completed) => handleSectionComplete('skills', completed)}
          />
        );
      case 4:
        return (
          <WorkExperienceSection
            experiences={profileData.experiences}
            onExperiencesChange={handleExperiencesChange}
            isCompleted={completionStatus.experience}
            onComplete={(completed) => handleSectionComplete('experience', completed)}
          />
        );
      case 5:
        return (
          <EducationSection
            education={profileData.education}
            onEducationChange={handleEducationChange}
            isCompleted={completionStatus.education}
            onComplete={(completed) => handleSectionComplete('education', completed)}
          />
        );
      case 6:
        return (
          <CareerObjectivesSection
            objectives={profileData.objectives}
            onObjectivesChange={handleObjectivesChange}
            isCompleted={completionStatus.objectives}
            onComplete={(completed) => handleSectionComplete('objectives', completed)}
          />
        );
      default:
        return null;
    }
  };

  const isProfileComplete = () => {
    return Object.values(completionStatus).every(status => status === true);
  };

  return (
    <ProfileSetupWizard>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* LinkedIn Import Banner */}
              {currentStep === 1 && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon name="Linkedin" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Import from LinkedIn</h3>
                        <p className="text-blue-100">
                          Save time by importing your professional information
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="secondary"
                      onClick={handleLinkedInImport}
                      iconName="Download"
                      iconPosition="left"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Import Profile
                    </Button>
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="bg-surface rounded-xl shadow-professional-lg p-6 md:p-8">
                {renderCurrentStep()}
              </div>

              {/* Complete Profile Section */}
              {currentStep === 6 && isProfileComplete() && (
                <div className="bg-gradient-to-r from-success to-success-600 rounded-xl p-6 text-white text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="CheckCircle" size={32} />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">
                        Congratulations! 🎉
                      </h3>
                      <p className="text-success-100 mb-6">
                        Your profile is complete and ready to start making professional connections.
                      </p>
                      
                      <Button
                        variant="secondary"
                        onClick={handleCompleteProfile}
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="bg-white text-success hover:bg-success-50"
                      >
                        Start Networking
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion Meter */}
              <ProfileCompletionMeter completionData={getCompletionData()} />

              {/* Preview Toggle */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <Button
                  variant={showPreview ? "primary" : "outline"}
                  onClick={() => setShowPreview(!showPreview)}
                  iconName={showPreview ? "EyeOff" : "Eye"}
                  iconPosition="left"
                  fullWidth
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>

              {/* Profile Preview */}
              {showPreview && (
                <div className="sticky top-24">
                  <ProfilePreview profileData={profileData} />
                </div>
              )}

              {/* Help & Tips */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="HelpCircle" size={16} className="text-primary mr-2" />
                  Need Help?
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <Icon name="MessageCircle" size={16} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">Live Chat Support</p>
                      <p className="text-text-secondary">Get instant help from our team</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="BookOpen" size={16} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">Profile Guide</p>
                      <p className="text-text-secondary">Tips for creating an effective profile</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Video" size={16} className="text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary">Video Tutorials</p>
                      <p className="text-text-secondary">Watch step-by-step guides</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileSetupWizard>
  );
};

export default ProfileSetup;