import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContainer from '../../components/ui/AuthenticationContainer';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityIndicators from './components/SecurityIndicators';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/swipe-interface');
    }
  }, [navigate]);

  return (
    <AuthenticationContainer>
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <LoginHeader />
        
        {/* Login Form */}
        <div className="bg-surface rounded-xl shadow-lg p-6 border border-border">
          <LoginForm />
        </div>
        
        {/* Security Indicators */}
        <SecurityIndicators />
        
        {/* Footer Navigation */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Sign up for free
            </button>
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-xs text-text-muted">
            <button className="hover:text-text-secondary transition-colors duration-200">
              Terms of Service
            </button>
            <span>•</span>
            <button className="hover:text-text-secondary transition-colors duration-200">
              Privacy Policy
            </button>
            <span>•</span>
            <button className="hover:text-text-secondary transition-colors duration-200">
              Help Center
            </button>
          </div>
          
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} WorkMatch. All rights reserved.
          </p>
        </div>
      </div>
    </AuthenticationContainer>
  );
};

export default LoginPage;