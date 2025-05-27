"use client";
import React, { useState } from 'react';
import Tabs from '../../components/Tabs';

const EmployeeDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { label: 'Overview', key: 'overview' },
    { label: 'Projects', key: 'projects' },
    { label: 'Feedback', key: 'feedback' },
  ];
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="bg-white p-4 rounded shadow mt-4">
        {activeTab === 'overview' && <div>Overview content here</div>}
        {activeTab === 'projects' && <div>Projects content here</div>}
        {activeTab === 'feedback' && <div>Feedback form here</div>}
      </div>
    </div>
  );
};

export default EmployeeDetailPage; 