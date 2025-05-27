import React from 'react';
import RatingStars from './RatingStars';
import BookmarkButton from './BookmarkButton';
import Link from 'next/link';

export interface EmployeeCardProps {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  bookmarked: boolean;
  onBookmark: () => void;
  onPromote: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id, name, email, age, department, rating, bookmarked, onBookmark, onPromote
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300 group box-hover-animate">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{email}</p>
        <p className="text-xs text-gray-400 dark:text-gray-400">Age: {age} | Dept: <span className="font-semibold text-blue-500">{department}</span></p>
      </div>
      <BookmarkButton bookmarked={bookmarked} onClick={onBookmark} />
    </div>
    <div className="flex items-center gap-2">
      <RatingStars rating={rating} />
      <span className="text-xs text-gray-500">({rating}/5)</span>
    </div>
    <div className="flex gap-2 mt-2">
      <Link href={`/employee/${id}`} className="btn btn-primary px-3 py-1.5">View</Link>
      <button className="btn btn-secondary px-3 py-1.5" onClick={onPromote}>Promote</button>
    </div>
  </div>
);

export default EmployeeCard; 