import { useState, useEffect } from 'react';

export interface Employee {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  bookmarked: boolean;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        // Mock department, rating, and bookmark
        const depts = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'];
        const mapped = data.users.map((u: any, i: number) => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          age: u.age,
          department: depts[i % depts.length],
          rating: Math.floor(Math.random() * 5) + 1,
          bookmarked: false,
        }));
        setEmployees(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch employees');
        setLoading(false);
      });
  }, []);

  return { employees, setEmployees, loading, error };
}; 