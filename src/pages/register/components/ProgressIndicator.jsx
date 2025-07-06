import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Basic Info', icon: 'User' },
    { id: 2, title: 'Professional', icon: 'Briefcase' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const calculateProgress = () => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  };

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full bg-secondary-100 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <div
              key={step.id}
              className="flex flex-col items-center space-y-2"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                ${status === 'completed' 
                  ? 'bg-success text-success-foreground' 
                  : status === 'current' ?'bg-primary text-primary-foreground' :'bg-secondary-200 text-text-muted'
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
                <p className="text-xs text-text-muted">
                  Step {step.id}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;