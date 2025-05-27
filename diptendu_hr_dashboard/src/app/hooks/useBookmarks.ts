import { useState } from 'react';
import { Employee } from './useEmployees';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Employee[]>([]);

  const addBookmark = (employee: Employee) => {
    setBookmarks(prev => [...prev, employee]);
  };

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(emp => emp.id !== id));
  };

  return { bookmarks, addBookmark, removeBookmark };
}; 