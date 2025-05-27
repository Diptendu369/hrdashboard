import React from 'react';

const BookmarksPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
      {/* List of bookmarked employees with remove, promote, assign to project buttons */}
      <div className="bg-white p-4 rounded shadow text-gray-500">No bookmarks yet.</div>
    </div>
  );
};

export default BookmarksPage; 