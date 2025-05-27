"use client";
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

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
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="backdrop-blur-md bg-white/70 dark:bg-white/10 rounded-xl shadow-xl flex flex-col w-full max-w-md p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">Sign in to HR Dashboard</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm mb-4">{error}</div>}
        <button
          type="button"
          className="w-full flex items-center gap-3 justify-center bg-[#ea4335] hover:bg-[#c5221f] text-white font-semibold py-3 rounded transition text-lg shadow"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle className="w-6 h-6 bg-white rounded-full" />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 