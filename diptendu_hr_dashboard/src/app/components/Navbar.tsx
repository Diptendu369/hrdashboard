"use client";
import { UserCircleIcon, ChartBarIcon, BookmarkIcon, HomeIcon, ChartBarSquareIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../lib/firebase';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Close menu on route change
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 relative">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <ChartBarIcon className="w-7 h-7 text-blue-500" />
          HR Dashboard
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 dark:text-gray-200">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-500 transition"><HomeIcon className="w-5 h-5" /> Home</Link>
          <Link href="/bookmarks" className="flex items-center gap-1 hover:text-blue-500 transition"><BookmarkIcon className="w-5 h-5" /> Bookmarks</Link>
          <Link href="/analytics" className="flex items-center gap-1 hover:text-blue-500 transition"><ChartBarSquareIcon className="w-5 h-5" /> Analytics</Link>
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full border-2 border-blue-400 shadow" />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-blue-400" />
              )}
              <span className="font-semibold text-sm max-w-[120px] truncate" title={user.displayName || user.email}>{user.displayName || user.email}</span>
              <button
                className="btn btn-secondary px-3 py-1.5 text-xs"
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary flex items-center gap-1 px-3 py-1.5 text-sm"
              onClick={() => window.location.href = '/login'}
            >
              <UserCircleIcon className="w-5 h-5" /> Login
            </button>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          {menuOpen ? <XMarkIcon className="w-7 h-7 text-blue-500" /> : <Bars3Icon className="w-7 h-7 text-blue-500" />}
        </button>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-4 top-16 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col gap-2 py-4 px-6 w-56 animate-fade-in z-50">
            <Link href="/" className="flex items-center gap-2 py-2 hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}><HomeIcon className="w-5 h-5" /> Home</Link>
            <Link href="/bookmarks" className="flex items-center gap-2 py-2 hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}><BookmarkIcon className="w-5 h-5" /> Bookmarks</Link>
            <Link href="/analytics" className="flex items-center gap-2 py-2 hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}><ChartBarSquareIcon className="w-5 h-5" /> Analytics</Link>
            {user ? (
              <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full border-2 border-blue-400 shadow" />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-blue-400" />
                  )}
                  <span className="font-semibold text-sm max-w-[120px] truncate" title={user.displayName || user.email}>{user.displayName || user.email}</span>
                </div>
                <button
                  className="btn btn-secondary px-3 py-1.5 text-xs mt-2"
                  onClick={() => { signOut(auth); setMenuOpen(false); }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary flex items-center gap-1 px-3 py-1.5 text-sm mt-2"
                onClick={() => { window.location.href = '/login'; setMenuOpen(false); }}
              >
                <UserCircleIcon className="w-5 h-5" /> Login
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar; 