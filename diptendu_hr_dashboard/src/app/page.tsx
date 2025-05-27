"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChartBarIcon, UserCircleIcon, ArrowRightIcon, CheckCircleIcon, ChartBarSquareIcon } from '@heroicons/react/24/solid';
import { FcGoogle } from 'react-icons/fc';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './lib/firebase';

const features = [
  {
    icon: <ChartBarIcon className="w-8 h-8 text-blue-500" />, title: "Performance Tracking", desc: "Track employee performance with real-time analytics and visual dashboards."
  },
  {
    icon: <UserCircleIcon className="w-8 h-8 text-green-500" />, title: "Bookmark Employees", desc: "Bookmark, promote, and manage employees with a single click."
  },
  {
    icon: <ArrowRightIcon className="w-8 h-8 text-purple-500" />, title: "Detailed Insights", desc: "Get department-wise ratings, feedback, and actionable insights."
  }
];

const whyUs = [
  "Modern, intuitive UI for HR teams",
  "Secure Google authentication",
  "Fully responsive and accessible",
  "Built with Next.js, Tailwind, and Firebase"
];

const advantages = [
  {
    icon: <ChartBarIcon className="w-7 h-7 text-cyan-400" />,
    title: "Personalized AI-driven feedback",
    desc: "Receive tailored feedback based on industry standards and best practices for your specific role."
  },
  {
    icon: <ArrowRightIcon className="w-7 h-7 text-purple-400" />,
    title: "Resume-based tailored questions",
    desc: "Our AI analyzes your resume to create relevant questions that match your experience and the job you're applying for."
  },
  {
    icon: <ChartBarSquareIcon className="w-7 h-7 text-blue-400" />,
    title: "Progress tracking dashboard",
    desc: "Monitor your improvement over time with detailed metrics and performance indicators."
  },
  {
    icon: <UserCircleIcon className="w-7 h-7 text-pink-400" />,
    title: "Adaptive & interactive learning",
    desc: "Adaptive questions and interactive learning modules to help you prepare for any scenario."
  }
];

const testimonials = [
  {
    quote: "HR Dashboard helped me prepare for my performance review and track my goals. The analytics are spot-on!",
    name: "Sarah Johnson",
    role: "HR Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The personalized feedback and easy-to-use interface made managing my team a breeze.",
    name: "Michael Chen",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    quote: "I love the modern design and how simple it is to bookmark and promote employees!",
    name: "Jessica Williams",
    role: "HR Specialist",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];

const AnimatedNetwork = () => (
  <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto animate-pulse">
    <circle cx="170" cy="170" r="160" stroke="#2563eb" strokeWidth="2" opacity="0.2" />
    <circle cx="170" cy="170" r="120" stroke="#818cf8" strokeWidth="2" opacity="0.2" />
    <circle cx="170" cy="170" r="80" stroke="#38bdf8" strokeWidth="2" opacity="0.2" />
    <circle cx="170" cy="170" r="40" stroke="#f472b6" strokeWidth="2" opacity="0.2" />
    <circle cx="170" cy="170" r="6" fill="#2563eb" />
    <circle cx="70" cy="70" r="8" fill="#818cf8" />
    <circle cx="270" cy="90" r="8" fill="#38bdf8" />
    <circle cx="90" cy="270" r="8" fill="#f472b6" />
    <circle cx="250" cy="250" r="8" fill="#fbbf24" />
    <line x1="170" y1="170" x2="70" y2="70" stroke="#818cf8" strokeWidth="2" />
    <line x1="170" y1="170" x2="270" y2="90" stroke="#38bdf8" strokeWidth="2" />
    <line x1="170" y1="170" x2="90" y2="270" stroke="#f472b6" strokeWidth="2" />
    <line x1="170" y1="170" x2="250" y2="250" stroke="#fbbf24" strokeWidth="2" />
  </svg>
);

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-16 max-w-7xl mx-auto w-full">
        {/* Left: Intro */}
        <div className="flex-1 flex flex-col gap-6 items-start">
          <div className="flex items-center gap-2 text-2xl font-bold text-blue-400">
            <ChartBarIcon className="w-8 h-8 text-blue-500" /> HR Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            Empower Your <span className="text-blue-400">HR Team</span><br /> with Modern Performance Tools
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Track, analyze, and manage employee performance with ease. Secure, fast, and beautifully designed for HR professionals.
          </p>
          {!user ? (
            <div className="flex gap-4 mt-2">
              <Link href="/login">
                <button className="btn btn-primary px-6 py-2 text-lg flex items-center gap-2"><FcGoogle className="w-6 h-6" /> Sign in with Google</button>
              </Link>
              <a href="#features" className="btn btn-secondary px-6 py-2 text-lg">Learn More</a>
            </div>
          ) : (
            <div className="flex items-center gap-4 mt-2 bg-gray-800/80 px-4 py-3 rounded-xl shadow">
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full border-2 border-blue-400 shadow" />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-blue-400" />
              )}
              <div>
                <div className="font-semibold text-lg">Welcome, {user.displayName || user.email}!</div>
                <Link href="/employee-details">
                  <span className="text-blue-400 hover:underline text-sm cursor-pointer">View your profile</span>
                </Link>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mt-6">
            <div className="flex -space-x-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-blue-400" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full border-2 border-pink-400" />
              <img src="https://randomuser.me/api/portraits/men/65.jpg" className="w-8 h-8 rounded-full border-2 border-green-400" />
              <img src="https://randomuser.me/api/portraits/women/12.jpg" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
            </div>
            <span className="text-gray-400 text-sm ml-2">1,000+ HRs trust us</span>
          </div>
        </div>
        {/* Right: Animation */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatedNetwork />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-900/80 rounded-xl p-8 flex flex-col items-center text-center shadow hover:shadow-xl transition">
              {f.icon}
              <h3 className="mt-4 text-xl font-semibold text-blue-300">{f.title}</h3>
              <p className="mt-2 text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">Why Choose HR Dashboard?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {whyUs.map((reason, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-900/70 rounded-lg p-5">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
              <span className="text-gray-200 text-lg">{reason}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Advantages Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center mb-10">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white text-xs font-semibold mb-2 shadow">Why HR Dashboard</span>
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Unique Advantages</h2>
          <p className="text-gray-300 text-center max-w-2xl">Our platform offers unique advantages to help you succeed in HR management and employee engagement.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {advantages.map((adv, i) => (
            <div key={i} className="flex items-start gap-4 bg-gray-900/80 rounded-xl p-6 shadow hover:shadow-xl transition border border-gray-800">
              <div>{adv.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-200 mb-1">{adv.title}</h3>
                <p className="text-gray-400 text-sm">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center mb-10">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-700 to-blue-700 text-white text-xs font-semibold mb-2 shadow">Testimonials</span>
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">What Our Users Say</h2>
          <p className="text-gray-300 text-center max-w-2xl">Hear from professionals who improved their HR management skills with HR Dashboard.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-900/80 rounded-xl p-8 flex flex-col shadow hover:shadow-xl transition border border-gray-800">
              <span className="text-4xl text-purple-400 mb-4">“</span>
              <p className="text-gray-200 flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 mt-6">
                <img src={t.avatar} className="w-10 h-10 rounded-full border-2 border-blue-400" />
                <div>
                  <div className="font-semibold text-blue-200">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
