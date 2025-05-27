"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Tabs from '../../components/Tabs';
import { useEmployees } from '../../hooks/useEmployees';
import RatingStars from '../../components/RatingStars';

const mockBios = [
  "A dedicated team player with a passion for HR innovation and employee engagement.",
  "Results-driven engineer with a knack for solving complex problems and leading projects.",
  "Creative marketer with a love for data-driven campaigns and brand storytelling.",
  "Finance expert with a focus on process optimization and cost savings.",
  "Sales leader who thrives on building relationships and exceeding targets."
];
const mockAddresses = [
  "123 Main St, Springfield, USA",
  "456 Oak Ave, Metropolis, USA",
  "789 Pine Rd, Gotham, USA",
  "321 Maple Dr, Star City, USA",
  "654 Cedar Ln, Central City, USA"
];
const mockPhones = [
  "(555) 123-4567",
  "(555) 987-6543",
  "(555) 246-8101",
  "(555) 369-1212",
  "(555) 555-0000"
];

function getRandomHistory() {
  return Array.from({ length: 5 }, (_, i) => ({
    year: 2019 + i,
    rating: Math.floor(Math.random() * 5) + 1,
    summary: [
      "Exceeded expectations in quarterly review.",
      "Met all project deadlines and KPIs.",
      "Received positive feedback from team.",
      "Demonstrated leadership in new initiatives.",
      "Consistently improved performance metrics."
    ][Math.floor(Math.random() * 5)]
  }));
}

const badgeColors = [
  "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"
];

const EmployeeDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const { employees, loading } = useEmployees();
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { label: 'Overview', key: 'overview' },
    { label: 'Projects', key: 'projects' },
    { label: 'Feedback', key: 'feedback' },
  ];
  const employee = employees.find(e => e.id === id);
  const idx = employee ? employee.id % 5 : 0;
  const history = getRandomHistory();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!employee) return <div className="text-center py-10 text-red-500">Employee not found.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2">{employee.name}</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate">
          <div className="flex flex-col gap-2 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold w-fit ${badgeColors[idx]}`}>{employee.department}</span>
            <span className="text-gray-500 text-sm">{employee.email}</span>
            <span className="text-gray-500 text-sm">Age: {employee.age}</span>
            <span className="text-gray-500 text-sm">Phone: {mockPhones[idx]}</span>
            <span className="text-gray-500 text-sm">Address: {mockAddresses[idx]}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Bio:</span>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{mockBios[idx]}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={employee.rating} />
            <span className="text-xs text-gray-500">({employee.rating}/5)</span>
          </div>
        </div>
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate">
          <div className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Past Performance History</div>
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-12">{h.year}</span>
                <RatingStars rating={h.rating} />
                <span className="text-xs text-gray-500">{h.summary}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow mt-4 min-h-[180px] box-hover-animate">
        {activeTab === 'overview' && (
          <div>
            <div className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Overview</div>
            <p className="text-gray-600 dark:text-gray-300">{mockBios[idx]}</p>
          </div>
        )}
        {activeTab === 'projects' && (
          <div>
            <div className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Projects</div>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li>Project Alpha - Led migration to new HRIS platform</li>
              <li>Project Beta - Improved onboarding process by 30%</li>
              <li>Project Gamma - Organized annual team-building retreat</li>
            </ul>
          </div>
        )}
        {activeTab === 'feedback' && (
          <div>
            <div className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Feedback</div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">"Great team player and always willing to help!"</p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">"Consistently exceeds expectations in all tasks."</p>
            <p className="text-gray-600 dark:text-gray-300">"Brings positive energy to the workplace."</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailPage; 