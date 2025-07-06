import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessNotification = ({ isVisible, userEmail, onResendEmail }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [isVisible, countdown]);

  const handleResendEmail = () => {
    onResendEmail();
    setCountdown(60);
    setCanResend(false);
  };

  const handleContinueToProfile = () => {
    navigate('/profile-setup');
  };

  const handleCheckEmail = () => {
    // Open default email client
    window.location.href = 'mailto:';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl max-w-md w-full p-6 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Check Your Email
          </h3>
          <p className="text-text-secondary leading-relaxed">
            We've sent a verification email to{' '}
            <span className="font-medium text-text-primary">{userEmail}</span>
          </p>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon name="Info" size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-medium text-primary mb-1">
                Next Steps
              </h4>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>1. Check your email inbox</li>
                <li>2. Click the verification link</li>
                <li>3. Complete your profile setup</li>
                <li>4. Start networking!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={handleCheckEmail}
            iconName="ExternalLink"
            iconPosition="right"
            className="w-full"
          >
            Open Email App
          </Button>

          <Button
            variant="outline"
            onClick={handleContinueToProfile}
            className="w-full"
          >
            Continue to Profile Setup
          </Button>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-text-secondary mb-3">
              Didn't receive the email?
            </p>
            {canResend ? (
              <Button
                variant="text"
                onClick={handleResendEmail}
                iconName="RefreshCw"
                iconPosition="left"
                className="text-primary"
              >
                Resend Verification Email
              </Button>
            ) : (
              <p className="text-xs text-text-muted">
                Resend available in {countdown} seconds
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-text-muted">
            Check your spam folder if you don't see the email in your inbox
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;