import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ onAcceptanceChange, isAccepted }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleAcceptanceChange = (e) => {
    onAcceptanceChange(e.target.checked);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="terms-acceptance"
          checked={isAccepted}
          onChange={handleAcceptanceChange}
          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
        />
        <label htmlFor="terms-acceptance" className="text-sm text-text-secondary leading-relaxed">
          I agree to WorkMatch's{' '}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-primary hover:text-primary-700 underline font-medium"
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="text-primary hover:text-primary-700 underline font-medium"
          >
            Privacy Policy
          </button>
        </label>
      </div>

      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon name="Shield" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">
              Your Privacy Matters
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              We use industry-standard encryption to protect your data. Your professional information is only shared with mutual matches, and you control your visibility settings.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">
                Terms of Service
              </h3>
              <button
                onClick={() => setShowTerms(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm max-w-none text-text-secondary">
                <h4 className="text-text-primary font-medium mb-2">1. Acceptance of Terms</h4>
                <p className="mb-4">
                  By accessing and using WorkMatch, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                
                <h4 className="text-text-primary font-medium mb-2">2. Professional Use</h4>
                <p className="mb-4">
                  WorkMatch is designed for professional networking and career development. Users must maintain professional conduct and provide accurate information.
                </p>
                
                <h4 className="text-text-primary font-medium mb-2">3. Account Responsibility</h4>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
                </p>
                
                <h4 className="text-text-primary font-medium mb-2">4. Content Guidelines</h4>
                <p className="mb-4">
                  All content shared on WorkMatch must be professional, accurate, and respectful. Inappropriate content will result in account suspension.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">
                Privacy Policy
              </h3>
              <button
                onClick={() => setShowPrivacy(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm max-w-none text-text-secondary">
                <h4 className="text-text-primary font-medium mb-2">Information We Collect</h4>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with other users.
                </p>
                
                <h4 className="text-text-primary font-medium mb-2">How We Use Your Information</h4>
                <p className="mb-4">
                  We use the information we collect to provide, maintain, and improve our services, including matching you with relevant professional connections.
                </p>
                
                <h4 className="text-text-primary font-medium mb-2">Information Sharing</h4>
                <p className="mb-4">
                  We only share your information with mutual matches and as necessary to provide our services. We never sell your personal information.
                </p>
                
                <h4 className="text-text-primary font-medium mb-2">Data Security</h4>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndPrivacy;