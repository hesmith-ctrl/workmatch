import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
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
        <div className="text-left">
          <h1 className="text-2xl font-bold text-text-primary font-heading">
            WorkMatch
          </h1>
          <p className="text-sm text-text-secondary">
            Professional Networking
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-text-primary font-heading">
          Welcome Back
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Sign in to continue your professional networking journey and discover new career opportunities.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 py-4 px-6 bg-primary-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Users" size={16} className="text-primary-600" />
          </div>
          <p className="text-lg font-semibold text-primary-700">50K+</p>
          <p className="text-xs text-primary-600">Professionals</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Briefcase" size={16} className="text-primary-600" />
          </div>
          <p className="text-lg font-semibold text-primary-700">10K+</p>
          <p className="text-xs text-primary-600">Companies</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="TrendingUp" size={16} className="text-primary-600" />
          </div>
          <p className="text-lg font-semibold text-primary-700">95%</p>
          <p className="text-xs text-primary-600">Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;