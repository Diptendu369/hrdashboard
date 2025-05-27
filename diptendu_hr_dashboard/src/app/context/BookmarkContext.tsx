import React, { createContext, useContext, useState } from 'react';
import { Employee } from '../hooks/useEmployees';

interface BookmarkContextProps {
  bookmarks: Employee[];
  addBookmark: (employee: Employee) => void;
  removeBookmark: (id: number) => void;
}

const BookmarkContext = createContext<BookmarkContextProps | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Employee[]>([]);
  const addBookmark = (employee: Employee) => setBookmarks(prev => [...prev, employee]);
  const removeBookmark = (id: number) => setBookmarks(prev => prev.filter(emp => emp.id !== id));
  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarkContext must be used within BookmarkProvider');
  return context;
}; 