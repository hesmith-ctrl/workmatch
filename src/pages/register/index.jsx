import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContainer from '../../components/ui/AuthenticationContainer';
import ProgressIndicator from './components/ProgressIndicator';
import SocialRegistration from './components/SocialRegistration';
import RegistrationSteps from './components/RegistrationSteps';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import SuccessNotification from './components/SuccessNotification';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    // Mock social login - in real app, this would integrate with OAuth providers
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (provider === 'linkedin') {
        // Mock LinkedIn profile data
        setFormData({
          fullName: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          jobTitle: "Senior Marketing Manager",
          company: "TechCorp Inc.",
          industry: "Technology"
        });
        setCurrentStep(2);
      } else if (provider === 'google') {
        // Mock Google profile data
        setFormData({
          fullName: "Michael Chen",
          email: "michael.chen@gmail.com"
        });
        setCurrentStep(1);
      }
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    if (!termsAccepted) {
      alert('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);
    
    // Mock registration API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    // Mock resend email API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification email resent to:', formData.email);
    } catch (error) {
      console.error('Resend email error:', error);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  return (
    <>
      <AuthenticationContainer>
        <div className="space-y-6">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={2} />

          {/* Social Registration */}
          {currentStep === 1 && (
            <SocialRegistration 
              onSocialLogin={handleSocialLogin}
            />
          )}

          {/* Registration Steps */}
          <RegistrationSteps
            currentStep={currentStep}
            onStepChange={handleStepChange}
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onSubmit={handleFormSubmit}
          />

          {/* Terms and Privacy */}
          {currentStep === 2 && (
            <TermsAndPrivacy
              onAcceptanceChange={setTermsAccepted}
              isAccepted={termsAccepted}
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-surface rounded-lg p-6 flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-text-primary">
                  {currentStep === 1 ? 'Connecting...' : 'Creating your account...'}
                </span>
              </div>
            </div>
          )}
        </div>
      </AuthenticationContainer>

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccess}
        userEmail={formData.email}
        onResendEmail={handleResendEmail}
      />
    </>
  );
};

export default Register;