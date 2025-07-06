import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationSteps = ({ currentStep, onStepChange, formData, onFormDataChange, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Consulting",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Legal",
    "Media",
    "Non-profit",
    "Government",
    "Other"
  ];

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.jobTitle?.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    
    if (!formData.company?.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      onStepChange(2);
    } else if (currentStep === 2 && validateStep2()) {
      onSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      onStepChange(1);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={errors.fullName ? 'border-error' : ''}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-error' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Password *
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'border-error' : ''}
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                  <span>Password strength</span>
                  <span className={`font-medium ${
                    passwordStrength < 25 ? 'text-error' :
                    passwordStrength < 50 ? 'text-warning' :
                    passwordStrength < 75 ? 'text-accent' : 'text-success'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
              Confirm Password *
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'border-error' : ''}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-text-primary mb-2">
              Current Job Title *
            </label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="e.g., Software Engineer, Marketing Manager"
              value={formData.jobTitle || ''}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className={errors.jobTitle ? 'border-error' : ''}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.jobTitle}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
              Company *
            </label>
            <Input
              id="company"
              type="text"
              placeholder="Enter your current company"
              value={formData.company || ''}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={errors.company ? 'border-error' : ''}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.company}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-text-primary mb-2">
              Industry *
            </label>
            <select
              id="industry"
              value={formData.industry || ''}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                errors.industry ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select your industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-1" />
                {errors.industry}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        {currentStep === 2 ? (
          <Button
            variant="outline"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant="primary"
          onClick={handleNext}
          iconName={currentStep === 2 ? "Check" : "ArrowRight"}
          iconPosition="right"
          className="min-w-[120px]"
        >
          {currentStep === 2 ? 'Create Account' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSteps;