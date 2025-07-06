import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      text: 'Secure Login',
      description: 'Industry-standard authentication protocols'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-center sm:text-left">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-success-50 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={16} className="text-success-600" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-text-primary">{feature.text}</p>
              <p className="text-xs text-text-muted hidden sm:block">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-text-muted">
          Protected by industry-leading security measures
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;