import React from 'react';

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex border-b mb-4">
    {tabs.map(tab => (
      <button
        key={tab.key}
        className={`px-4 py-2 -mb-px border-b-2 font-medium transition-colors duration-200 focus:outline-none ${
          activeTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'
        }`}
        onClick={() => onTabChange(tab.key)}
        aria-selected={activeTab === tab.key}
        role="tab"
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs; 