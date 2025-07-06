import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './Button';

const AuthenticationContainer = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  useEffect(() => {
    if (isAuthPage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isAuthPage]);

  const handleClose = () => {
    navigate('/swipe-interface');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/login':
        return 'Welcome Back';
      case '/register':
        return 'Join WorkMatch';
      default:
        return 'WorkMatch';
    }
  };

  const getPageSubtitle = () => {
    switch (location.pathname) {
      case '/login':
        return 'Sign in to continue your professional networking journey';
      case '/register':
        return 'Create your account to start building meaningful professional connections';
      default:
        return '';
    }
  };

  const Logo = () => (
    <div className="flex items-center justify-center space-x-3 mb-8">
      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-professional-md">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
          <path
            d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
            fill="currentColor"
          />
          <path
            d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-text-primary font-heading">
          WorkMatch
        </h1>
        <p className="text-sm text-text-secondary font-caption">
          Professional Networking
        </p>
      </div>
    </div>
  );

  if (!isAuthPage) {
    return null;
  }

  return (
    <div className={`
      fixed inset-0 z-modal bg-background
      transition-opacity duration-300
      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className="min-h-screen flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-end p-4 md:p-6">
          <Button
            variant="ghost"
            onClick={handleClose}
            iconName="X"
            className="p-2"
            aria-label="Close authentication"
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-md">
            {/* Logo and branding */}
            <Logo />

            {/* Page title and subtitle */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-text-primary font-heading mb-2">
                {getPageTitle()}
              </h2>
              <p className="text-text-secondary font-body leading-relaxed">
                {getPageSubtitle()}
              </p>
            </div>

            {/* Form content */}
            <div className="bg-surface rounded-xl shadow-professional-lg p-6 md:p-8 border border-border">
              {children}
            </div>

            {/* Footer links */}
            <div className="mt-6 text-center space-y-4">
              {location.pathname === '/login' ? (
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <button
                      onClick={() => navigate('/register')}
                      className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      Sign up
                    </button>
                  </p>
                  <button
                    onClick={() => console.log('Forgot password')}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    Forgot your password?
                  </button>
                </div>
              ) : (
                <p className="text-sm text-text-secondary">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

            {/* Terms and privacy */}
            <div className="mt-8 text-center">
              <p className="text-xs text-text-muted leading-relaxed">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary-700 transition-colors duration-200">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary-700 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContainer;