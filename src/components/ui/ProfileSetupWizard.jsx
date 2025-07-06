import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ProfileSetupWizard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  const isSetupPage = location.pathname === '/profile-setup';

  const steps = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Tell us about yourself',
      icon: 'User',
    },
    {
      id: 2,
      title: 'Professional Details',
      description: 'Your career background',
      icon: 'Briefcase',
    },
    {
      id: 3,
      title: 'Skills & Interests',
      description: 'What you bring to the table',
      icon: 'Star',
    },
    {
      id: 4,
      title: 'Photos & Profile',
      description: 'Make a great first impression',
      icon: 'Camera',
    },
    {
      id: 5,
      title: 'Preferences',
      description: 'Who you want to connect with',
      icon: 'Settings',
    },
  ];

  useEffect(() => {
    if (isSetupPage) {
      setIsVisible(true);
      // Simulate step progress based on URL params or state
      const urlParams = new URLSearchParams(location.search);
      const step = parseInt(urlParams.get('step')) || 1;
      setCurrentStep(step);
    } else {
      setIsVisible(false);
    }
  }, [isSetupPage, location.search]);

  const handleStepClick = (stepId) => {
    if (completedSteps.has(stepId) || stepId <= currentStep) {
      setCurrentStep(stepId);
      navigate(`/profile-setup?step=${stepId}`);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      navigate(`/profile-setup?step=${nextStep}`);
    } else {
      // Setup complete
      navigate('/swipe-interface');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      navigate(`/profile-setup?step=${prevStep}`);
    }
  };

  const handleSkip = () => {
    navigate('/swipe-interface');
  };

  const getStepStatus = (stepId) => {
    if (completedSteps.has(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'available';
    return 'upcoming';
  };

  const calculateProgress = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  if (!isSetupPage) {
    return null;
  }

  return (
    <div className={`
      fixed inset-0 z-modal bg-background
      transition-opacity duration-300
      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-surface border-b border-border px-4 py-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-text-primary font-heading">
                    Profile Setup
                  </h1>
                  <p className="text-sm text-text-secondary">
                    Step {currentStep} of {steps.length}
                  </p>
                </div>
              </div>
              
              <Button
                variant="text"
                onClick={handleSkip}
                className="text-text-secondary hover:text-text-primary"
              >
                Skip for now
              </Button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-secondary-100 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>

            {/* Step indicators - Desktop */}
            <div className="hidden md:flex justify-between">
              {steps.map((step) => {
                const status = getStepStatus(step.id);
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`
                      flex flex-col items-center space-y-2 p-2 rounded-lg transition-all duration-200
                      ${status === 'current' ? 'bg-primary-50' : ''}
                      ${status === 'completed' || status === 'available' ? 'hover:bg-secondary-50 cursor-pointer' : 'cursor-not-allowed'}
                    `}
                    disabled={status === 'upcoming'}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                      ${status === 'completed' 
                        ? 'bg-success text-success-foreground' 
                        : status === 'current' ?'bg-primary text-primary-foreground'
                        : status === 'available' ?'bg-secondary-200 text-text-secondary' :'bg-secondary-100 text-text-muted'
                      }
                    `}>
                      {status === 'completed' ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step.icon} size={16} />
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`text-xs font-medium ${
                        status === 'current' ? 'text-primary' : 'text-text-secondary'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current step info - Mobile */}
            <div className="md:hidden">
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <Icon name={steps[currentStep - 1].icon} size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </div>

        {/* Footer navigation */}
        <div className="bg-surface border-t border-border px-4 py-4 md:px-6 safe-area-bottom">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index < currentStep ? 'bg-primary' : 'bg-secondary-200'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="primary"
              onClick={handleNext}
              iconName={currentStep === steps.length ? "Check" : "ArrowRight"}
              iconPosition="right"
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupWizard;