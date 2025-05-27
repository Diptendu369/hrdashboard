"use client";
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../lib/firebase';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <form className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-6 border border-gray-100 dark:border-gray-800" onSubmit={e => e.preventDefault()}>
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-2">Sign in to HR Dashboard</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm">{error}</div>}
        <button
          type="button"
          className="btn btn-primary w-full py-2 text-lg flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 shadow"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle className="w-6 h-6" />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage; 