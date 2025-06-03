// "use client";
// import React, { useState, useMemo } from 'react';
// import { useEmployees } from '../hooks/useEmployees';
// import EmployeeCard from '../components/EmployeeCard';
// import SearchBar from '../components/SearchBar';
// import FilterDropdown from '../components/FilterDropdown';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
// import { useBookmarkContext } from '../context/BookmarkContext';
// import UserFormModal from '../components/UserFormModal';

// const departmentOptions = [
//   { value: 'HR', label: 'HR' },
//   { value: 'Engineering', label: 'Engineering' },
//   { value: 'Sales', label: 'Sales' },
//   { value: 'Marketing', label: 'Marketing' },
//   { value: 'Finance', label: 'Finance' },
// ];
// const ratingOptions = [1, 2, 3, 4, 5].map(r => ({ value: r, label: `${r} Stars` }));

// const DepartmentRatingsChart = dynamic(() => import('../charts/DepartmentRatingsChart'), { ssr: false });
// const BookmarkTrendsChart = dynamic(() => import('../charts/BookmarkTrendsChart'), { ssr: false });

// export default function DashboardPage() {
//   const { employees, setEmployees, loading, error } = useEmployees();
//   const { bookmarks, addBookmark, removeBookmark } = useBookmarkContext();
//   const [search, setSearch] = useState('');
//   const [selectedDepts, setSelectedDepts] = useState([]);
//   const [selectedRatings, setSelectedRatings] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(9);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filter employees by search and selected filters
//   const filteredEmployees = useMemo(() => {
//     return employees.filter(emp => {
//       const matchesSearch =
//         emp.name.toLowerCase().includes(search.toLowerCase()) ||
//         emp.email.toLowerCase().includes(search.toLowerCase()) ||
//         emp.department.toLowerCase().includes(search.toLowerCase());
//       const matchesDept =
//         selectedDepts.length === 0 ||
//         selectedDepts.some((d: any) => d.value === emp.department);
//       const matchesRating =
//         selectedRatings.length === 0 ||
//         selectedRatings.some((r: any) => r.value === emp.rating);
//       return matchesSearch && matchesDept && matchesRating;
//     });
//   }, [employees, search, selectedDepts, selectedRatings]);

//   // Calculate department-wise average ratings
//   const deptMap: Record<string, { total: number; count: number }> = {};
//   employees.forEach(emp => {
//     if (!deptMap[emp.department]) deptMap[emp.department] = { total: 0, count: 0 };
//     deptMap[emp.department].total += emp.rating;
//     deptMap[emp.department].count += 1;
//   });
//   const deptRatings = Object.entries(deptMap).map(([department, { total, count }]) => ({
//     department,
//     avgRating: (total / count).toFixed(2),
//   }));
//   // Mock bookmark trends data
//   const bookmarkTrends = Array.from({ length: 7 }, (_, i) => ({
//     date: `Day ${i + 1}`,
//     count: Math.floor(Math.random() * 10) + 5,
//   }));

//   // Handlers for card actions
//   const handlePromote = (id: number) => {
//     alert('Promote action for employee #' + id);
//   };
//   const handleView = (id: number) => {
//     window.location.href = `/employee/${id}`;
//   };

//   const loadMore = () => setVisibleCount((c) => c + 6);
//   const lastElementRef = useInfiniteScroll(() => {
//     if (visibleCount < filteredEmployees.length) loadMore();
//   });

//   const handleCreateUser = (data: { name: string; email: string; age: number; department: string }) => {
//     setEmployees(prev => [
//       ...prev,
//       {
//         id: Math.max(0, ...prev.map(e => e.id)) + 1,
//         name: data.name,
//         email: data.email,
//         age: data.age,
//         department: data.department,
//         rating: Math.floor(Math.random() * 5) + 1,
//         bookmarked: false,
//       },
//     ]);
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Employee Performance Dashboard</h1>
//         <button className="btn btn-primary px-4 py-2 rounded shadow text-white" onClick={() => setIsModalOpen(true)}>+ Create User</button>
//       </div>
//       <UserFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateUser} />
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="flex-1">
//           <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or department..." />
//         </div>
//         <FilterDropdown
//           options={departmentOptions}
//           value={selectedDepts}
//           onChange={setSelectedDepts}
//           placeholder="Filter by Department"
//           className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
//         />
//         <FilterDropdown
//           options={ratingOptions}
//           value={selectedRatings}
//           onChange={setSelectedRatings}
//           placeholder="Filter by Rating"
//           className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
//         />
//       </div>
//       {loading && <LoadingSpinner />}
//       {error && <ErrorMessage message={error} />}
//       {!loading && !error && (
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left: Bookmark Manager and Globe */}
//           <div className="md:w-1/3 flex flex-col gap-8">
//             {/* Bookmark Manager */}
//             <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate mb-8">
//               <h2 className="text-lg font-bold mb-4 text-blue-600">Bookmark Manager</h2>
//               {bookmarks.length === 0 ? (
//                 <div className="text-gray-400 text-center">No bookmarked employees.</div>
//               ) : (
//                 <ul className="space-y-4">
//                   {bookmarks.map(emp => (
//                     <li key={emp.id} className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                       <div className="flex items-center justify-between">
//                         <span className="font-semibold text-gray-900 dark:text-white">{emp.name}</span>
//                         <button className="text-red-500 hover:underline text-xs" onClick={() => removeBookmark(emp.id)}>Remove</button>
//                       </div>
//                       <div className="flex gap-2">
//                         <button className="btn btn-secondary px-2 py-1 text-xs" onClick={() => alert('Promote ' + emp.name)}>Promote</button>
//                         <button className="btn btn-primary px-2 py-1 text-xs" onClick={() => alert('Assign ' + emp.name + ' to project')}>Assign to Project</button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             {/* Sticky Globe beside cards */}
//             <div className="relative h-full">
//               <div className="sticky top-24 flex items-center justify-center" style={{ minHeight: '320px', maxHeight: '600px' }}>
//                 <Image src="/globe.svg" alt="Animated Globe" width={220} height={220} className="animate-spin-slow" style={{ height: '100%', objectFit: 'contain' }} />
//               </div>
//             </div>
//           </div>
//           {/* Right: User Cards */}
//           <div className="md:w-2/3 flex flex-col">
//             <div className="relative">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredEmployees.slice(0, visibleCount).map((emp, idx) => (
//                   <EmployeeCard
//                     key={emp.id}
//                     id={emp.id}
//                     name={emp.name}
//                     email={emp.email}
//                     age={emp.age}
//                     department={emp.department}
//                     rating={emp.rating}
//                     bookmarked={bookmarks.some(b => b.id === emp.id)}
//                     onBookmark={() =>
//                       bookmarks.some(b => b.id === emp.id)
//                         ? removeBookmark(emp.id)
//                         : addBookmark(emp)
//                     }
//                     onPromote={() => handlePromote(emp.id)}
//                   />
//                 ))}
//               </div>
//               {/* Infinite scroll trigger */}
//               {visibleCount < filteredEmployees.length && (
//                 <div ref={lastElementRef} className="h-8"></div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Charts Section - full width below cards */}
//       {!loading && !error && (
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
//           <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate">
//             <h2 className="text-xl font-bold mb-4 text-blue-600">Department-wise Average Ratings</h2>
//             <DepartmentRatingsChart data={deptRatings} />
//           </div>
//           <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate">
//             <h2 className="text-xl font-bold mb-4 text-yellow-500">Bookmark Trends</h2>
//             <BookmarkTrendsChart data={bookmarkTrends} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useMemo } from "react";
import { useEmployees } from "../hooks/useEmployees";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useBookmarkContext } from "../context/BookmarkContext";
import UserFormModal from "../components/UserFormModal";

interface Option {
  value: string | number;
  label: string;
}

const departmentOptions: Option[] = [
  { value: "HR", label: "HR" },
  { value: "Engineering", label: "Engineering" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
];

const ratingOptions: Option[] = [1, 2, 3, 4, 5].map((r) => ({
  value: r,
  label: `${r} Stars`,
}));

const DepartmentRatingsChart = dynamic(
  () => import("../charts/DepartmentRatingsChart"),
  { ssr: false }
);
const BookmarkTrendsChart = dynamic(
  () => import("../charts/BookmarkTrendsChart"),
  { ssr: false }
);

export default function DashboardPage() {
  const { employees, setEmployees, loading, error } = useEmployees();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkContext();
  const [search, setSearch] = useState("");
  const [selectedDepts, setSelectedDepts] = useState<Option[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<Option[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        selectedDepts.length === 0 ||
        selectedDepts.some((d: Option) => d.value === emp.department);
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((r: Option) => r.value === emp.rating);
      return matchesSearch && matchesDept && matchesRating;
    });
  }, [employees, search, selectedDepts, selectedRatings]);

  const deptMap: Record<string, { total: number; count: number }> = {};
  employees.forEach((emp) => {
    if (!deptMap[emp.department])
      deptMap[emp.department] = { total: 0, count: 0 };
    deptMap[emp.department].total += emp.rating;
    deptMap[emp.department].count += 1;
  });

  const deptRatings = Object.entries(deptMap).map(
    ([department, { total, count }]) => ({
      department,
      avgRating: parseFloat((total / count).toFixed(2)),
    })
  );

  const bookmarkTrends = Array.from({ length: 7 }, (_, i) => ({
    date: `Day ${i + 1}`,
    count: Math.floor(Math.random() * 10) + 5,
  }));

  const handlePromote = (id: number) => {
    alert("Promote action for employee #" + id);
  };
  const handleView = (id: number) => {
    window.location.href = `/employee/${id}`;
  };

  const loadMore = () => setVisibleCount((c) => c + 6);
  const lastElementRef = useInfiniteScroll(() => {
    if (visibleCount < filteredEmployees.length) loadMore();
  });

  const handleCreateUser = (data: {
    name: string;
    email: string;
    age: number;
    department: string;
  }) => {
    setEmployees((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((e) => e.id)) + 1,
        name: data.name,
        email: data.email,
        age: data.age,
        department: data.department,
        rating: Math.floor(Math.random() * 5) + 1,
        bookmarked: false,
      },
    ]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Employee Performance Dashboard
        </h1>
        <button
          className="btn btn-primary px-4 py-2 rounded shadow text-white"
          onClick={() => setIsModalOpen(true)}
        >
          + Create User
        </button>
      </div>
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, email, or department..."
          />
        </div>
        <FilterDropdown
          options={departmentOptions}
          value={selectedDepts}
          onChange={(selected: Option[]) => setSelectedDepts(selected)}
          placeholder="Filter by Department"
          className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
        />
        <FilterDropdown
          options={ratingOptions}
          value={selectedRatings}
          onChange={(selected: Option[]) => setSelectedRatings(selected)}
          placeholder="Filter by Rating"
          className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
        />
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col gap-8">
            <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate mb-8">
              <h2 className="text-lg font-bold mb-4 text-blue-600">
                Bookmark Manager
              </h2>
              {bookmarks.length === 0 ? (
                <div className="text-gray-400 text-center">
                  No bookmarked employees.
                </div>
              ) : (
                <ul className="space-y-4">
                  {bookmarks.map((emp) => (
                    <li
                      key={emp.id}
                      className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {emp.name}
                        </span>
                        <button
                          className="text-red-500 hover:underline text-xs"
                          onClick={() => removeBookmark(emp.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-secondary px-2 py-1 text-xs"
                          onClick={() => alert("Promote " + emp.name)}
                        >
                          Promote
                        </button>
                        <button
                          className="btn btn-primary px-2 py-1 text-xs"
                          onClick={() =>
                            alert("Assign " + emp.name + " to project")
                          }
                        >
                          Assign to Project
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative h-full">
              <div
                className="sticky top-24 flex items-center justify-center"
                style={{ minHeight: "320px", maxHeight: "600px" }}
              >
                <Image
                  src="/globe.svg"
                  alt="Animated Globe"
                  width={220}
                  height={220}
                  className="animate-spin-slow"
                  style={{ height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col">
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.slice(0, visibleCount).map((emp, idx) => (
                  <EmployeeCard
                    key={emp.id}
                    id={emp.id}
                    name={emp.name}
                    email={emp.email}
                    age={emp.age}
                    department={emp.department}
                    rating={emp.rating}
                    bookmarked={bookmarks.some((b) => b.id === emp.id)}
                    onBookmark={() =>
                      bookmarks.some((b) => b.id === emp.id)
                        ? removeBookmark(emp.id)
                        : addBookmark(emp)
                    }
                    onPromote={() => handlePromote(emp.id)}
                  />
                ))}
              </div>
              {visibleCount < filteredEmployees.length && (
                <div ref={lastElementRef} className="h-8"></div>
              )}
            </div>
          </div>
        </div>
      )}
      {!loading && !error && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Department-wise Average Ratings
            </h2>
            <DepartmentRatingsChart data={deptRatings} />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 box-hover-animate">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">
              Bookmark Trends
            </h2>
            <BookmarkTrendsChart data={bookmarkTrends} />
          </div>
        </div>
      )}
    </div>
  );
}
