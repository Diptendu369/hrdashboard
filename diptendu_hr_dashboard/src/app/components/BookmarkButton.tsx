import React from 'react';

const BookmarkButton = ({ bookmarked, onClick }: { bookmarked: boolean; onClick: () => void }) => (
  <button
    aria-label={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    onClick={onClick}
    className={`p-2 rounded-full ${bookmarked ? 'bg-yellow-200' : 'bg-gray-200'}`}
  >
    {bookmarked ? (
      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
      </svg>
    )}
  </button>
);

export default BookmarkButton; 