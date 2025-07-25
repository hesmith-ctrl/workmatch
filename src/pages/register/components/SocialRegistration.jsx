import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialLogin }) => {
  const handleLinkedInLogin = () => {
    onSocialLogin('linkedin');
  };

  const handleGoogleLogin = () => {
    onSocialLogin('google');
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-4">
          Quick registration with your professional profile
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={handleLinkedInLogin}
          className="w-full justify-center border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="flex-shrink-0"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="font-medium">Continue with LinkedIn</span>
            <div className="bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
              Recommended
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full justify-center border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="flex-shrink-0"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-medium">Continue with Google</span>
          </div>
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">
            Or register manually
          </span>
        </div>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon name="Info" size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">
              Why use LinkedIn?
            </h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Auto-import your professional profile</li>
              <li>• Verify your work experience</li>
              <li>• Connect with existing network</li>
              <li>• Faster profile setup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;