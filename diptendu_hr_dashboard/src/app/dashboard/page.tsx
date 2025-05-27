"use client";
import React, { useState, useMemo } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const departmentOptions = [
  { value: 'HR', label: 'HR' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
];
const ratingOptions = [1, 2, 3, 4, 5].map(r => ({ value: r, label: `${r} Stars` }));

export default function DashboardPage() {
  const { employees, setEmployees, loading, error } = useEmployees();
  const [search, setSearch] = useState('');
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Filter employees by search and selected filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        selectedDepts.length === 0 ||
        selectedDepts.some((d: any) => d.value === emp.department);
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((r: any) => r.value === emp.rating);
      return matchesSearch && matchesDept && matchesRating;
    });
  }, [employees, search, selectedDepts, selectedRatings]);

  // Handlers for card actions
  const handleBookmark = (id: number) => {
    setEmployees(emps =>
      emps.map(emp =>
        emp.id === id ? { ...emp, bookmarked: !emp.bookmarked } : emp
      )
    );
  };
  const handlePromote = (id: number) => {
    alert('Promote action for employee #' + id);
  };
  const handleView = (id: number) => {
    window.location.href = `/employee/${id}`;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Employee Performance Dashboard</h1>
        <button className="btn btn-primary px-4 py-2 rounded shadow" onClick={() => alert('Show create user modal')}>+ Create User</button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or department..." />
        </div>
        <FilterDropdown
          options={departmentOptions}
          value={selectedDepts}
          onChange={setSelectedDepts}
          placeholder="Filter by Department"
        />
        <FilterDropdown
          options={ratingOptions}
          value={selectedRatings}
          onChange={setSelectedRatings}
          placeholder="Filter by Rating"
        />
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No employees found.</div>
          ) : (
            filteredEmployees.map(emp => (
              <EmployeeCard
                key={emp.id}
                id={emp.id}
                name={emp.name}
                email={emp.email}
                age={emp.age}
                department={emp.department}
                rating={emp.rating}
                bookmarked={emp.bookmarked}
                onView={() => handleView(emp.id)}
                onBookmark={() => handleBookmark(emp.id)}
                onPromote={() => handlePromote(emp.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
} 