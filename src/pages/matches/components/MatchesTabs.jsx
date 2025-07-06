import React from 'react';

const MatchesTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'recent', label: 'Recent', count: counts.recent },
    { id: 'all', label: 'All Connections', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending }
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-4">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200
                ${activeTab === tab.id
                  ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
                }
              `}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-medium
                  ${activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary-100 text-text-secondary'
                  }
                `}>
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesTabs;