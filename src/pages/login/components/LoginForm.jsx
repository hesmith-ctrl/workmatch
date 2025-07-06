import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demo
  const mockCredentials = {
    email: 'john.doe@workmatch.com',
    password: 'WorkMatch123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Store auth token (mock)
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userEmail', formData.email);
        
        // Navigate to swipe interface
        navigate('/swipe-interface');
      } else {
        setErrors({
          general: `Invalid credentials. Use: ${mockCredentials.email} / ${mockCredentials.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // Mock social login success
    setTimeout(() => {
      localStorage.setItem('authToken', `mock-${provider}-token`);
      navigate('/swipe-interface');
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // In real app, would navigate to forgot password page
    alert('Password reset link would be sent to your email');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-error-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-error-700 font-medium">Login Failed</p>
            <p className="text-sm text-error-600 mt-1">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          className={`w-full ${errors.email ? 'border-error-500 focus:border-error-500' : ''}`}
          disabled={isLoading}
          required
        />
        {errors.email && (
          <p className="text-sm text-error-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className={`w-full ${errors.password ? 'border-error-500 focus:border-error-500' : ''}`}
          disabled={isLoading}
          required
        />
        {errors.password && (
          <p className="text-sm text-error-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {/* Sign In Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin('linkedin')}
          disabled={isLoading}
          className="h-12 border-2"
          iconName="Linkedin"
          iconPosition="left"
        >
          Continue with LinkedIn
        </Button>
        
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
          className="h-12 border-2"
          iconName="Chrome"
          iconPosition="left"
        >
          Continue with Google
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;