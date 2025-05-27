import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserCircleIcon, ChartBarIcon, BookmarkIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import Navbar from "./components/Navbar";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR Performance Dashboard",
  description: "Track and manage employee performance beautifully.",
};

function Footer() {
  return (
    <footer className="bg-gray-950/90 border-t border-gray-800 pt-12 pb-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-300">
        {/* Branding & Social */}
        <div>
          <div className="text-2xl font-bold text-blue-400 mb-2">HR Dashboard</div>
          <div className="text-sm mb-4">AI-powered HR tools to help you manage and empower your team.</div>
          <div className="flex gap-3 text-xl">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-400"><FaGithub /></a>
          </div>
        </div>
        {/* Product */}
        <div>
          <div className="font-semibold text-white mb-2">Product</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#features" className="hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
            <li><a href="#testimonials" className="hover:text-blue-400">Testimonials</a></li>
            <li><a href="#faq" className="hover:text-blue-400">FAQ</a></li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <div className="font-semibold text-white mb-2">Resources</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">HR Tips</a></li>
            <li><a href="#" className="hover:text-blue-400">Career Advice</a></li>
            <li><a href="#" className="hover:text-blue-400">Templates</a></li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <div className="font-semibold text-white mb-2">Company</div>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-800 pt-6">© {new Date().getFullYear()} HR Dashboard. All rights reserved.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-[#0a0a0a] min-h-screen flex flex-col relative`}>
        <div className="moving-bg" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 container mx-auto px-2 md:px-6 py-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
