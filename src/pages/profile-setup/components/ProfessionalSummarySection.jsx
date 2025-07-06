import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfessionalSummarySection = ({ summary, onSummaryChange, isCompleted, onComplete }) => {
  const [showTips, setShowTips] = useState(false);
  const maxLength = 500;
  const minLength = 50;

  const handleSummaryChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onSummaryChange(value);
    }
  };

  const getCharacterCountColor = () => {
    const remaining = maxLength - summary.length;
    if (remaining < 50) return 'text-warning';
    if (remaining < 20) return 'text-error';
    return 'text-text-secondary';
  };

  const isValidLength = summary.length >= minLength && summary.length <= maxLength;

  const writingTips = [
    "Start with your current role and key expertise",
    "Highlight your unique value proposition",
    "Mention specific achievements with numbers when possible",
    "Include relevant skills and technologies",
    "End with your career goals or what you\'re seeking",
    "Use active voice and professional tone",
    "Avoid jargon that might not be universally understood"
  ];

  const exampleSummaries = [
    `Senior Software Engineer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Led development teams of 8+ engineers and delivered projects that increased user engagement by 40%. Passionate about mentoring junior developers and exploring emerging technologies. Currently seeking opportunities in fintech or healthcare technology.`,
    
    `Marketing Director with 8 years of experience driving growth for B2B SaaS companies. Expert in digital marketing, content strategy, and data analytics. Increased lead generation by 300% and reduced customer acquisition cost by 45% at previous role. Strong background in marketing automation and team leadership. Looking to connect with other marketing professionals and potential collaboration opportunities.`,
    
    `Product Manager with expertise in mobile app development and user experience design. 6+ years of experience launching consumer products that reached 1M+ users. Skilled in agile methodologies, user research, and cross-functional team collaboration. Previously worked at startups and Fortune 500 companies. Interested in connecting with fellow product professionals and exploring new ventures.`
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Professional Summary
        </h3>
        <p className="text-text-secondary">
          Write a compelling summary that showcases your professional background and goals.
        </p>
      </div>

      {/* Writing Area */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={summary}
            onChange={handleSummaryChange}
            placeholder="Tell your professional story... Start with your current role, highlight key achievements, and mention what you're looking for in your career."
            className="w-full h-40 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            style={{ minHeight: '160px' }}
          />
          
          {/* Character count */}
          <div className={`absolute bottom-3 right-3 text-sm ${getCharacterCountColor()}`}>
            {summary.length}/{maxLength}
          </div>
        </div>

        {/* Length indicator */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {summary.length < minLength ? (
              <>
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span className="text-warning">
                  {minLength - summary.length} more characters needed
                </span>
              </>
            ) : (
              <>
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-success">Good length!</span>
              </>
            )}
          </div>
          
          <Button
            variant="text"
            onClick={() => setShowTips(!showTips)}
            iconName={showTips ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-sm"
          >
            Writing Tips
          </Button>
        </div>
      </div>

      {/* Writing Tips */}
      {showTips && (
        <div className="bg-primary-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-text-primary flex items-center">
            <Icon name="PenTool" size={16} className="text-primary mr-2" />
            Writing Tips
          </h4>
          
          <ul className="text-sm text-text-secondary space-y-2">
            {writingTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <Icon name="Check" size={14} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Example Summaries */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary flex items-center">
          <Icon name="BookOpen" size={16} className="text-accent mr-2" />
          Example Summaries
        </h4>
        
        <div className="space-y-3">
          {exampleSummaries.map((example, index) => (
            <div
              key={index}
              className="bg-secondary-50 rounded-lg p-4 cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSummaryChange(example)}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {example.substring(0, 120)}...
                </p>
                <Button
                  variant="ghost"
                  iconName="Copy"
                  className="p-1 ml-2"
                  aria-label="Use this example"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Writing Assistant */}
      <div className="bg-accent-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={16} className="text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-2">
              Need help writing?
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Our AI assistant can help you craft a compelling professional summary based on your experience.
            </p>
            <Button
              variant="outline"
              iconName="Wand2"
              iconPosition="left"
              className="text-sm"
            >
              Get AI Suggestions
            </Button>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {isValidLength && !isCompleted && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => onComplete(true)}
            iconName="Check"
            iconPosition="left"
          >
            Summary Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalSummarySection;