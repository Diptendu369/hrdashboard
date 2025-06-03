# HR Performance Dashboard

## Introduction

The **HR Performance Dashboard** is a modern, professional web application designed to help HR teams manage, analyze, and empower their workforce. Built with Next.js, Tailwind CSS, Zustand, Firebase Auth, Chart.js, Framer Motion, and DiceBear avatars, it offers a beautiful, responsive, and feature-rich experience for HR professionals.

## Demo Video

[![Watch the demo](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE)

> Replace the above link with your actual demo video URL.

---

## Screenshots

### 1. Home & Hero Section
![Home & Hero Section](screenshots/screenshot-hero.png)

### 2. Features & Why Choose HR Dashboard
![Features Section](screenshots/screenshot-features.png)

### 3. Testimonials & Footer
![Testimonials & Footer](screenshots/screenshot-testimonials.png)

### 4. Employee Performance Dashboard
![Employee Performance Dashboard](screenshots/screenshot-dashboard.png)

### 5. Employee Details Page
![Employee Details Page](screenshots/screenshot-employee-details.png)

### 6. Analytics & Charts
![Analytics & Charts](screenshots/screenshot-analytics.png)

> Place your screenshot images in a `screenshots/` folder in the root of your repo and update the filenames if needed.

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Diptendu369/hrdashboard.git
   cd hrdashboard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Google Authentication.
   - Copy your Firebase config to `src/app/lib/firebase.ts`.
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## Features Implemented

- **Modern, Responsive UI**: Built with Next.js App Router and Tailwind CSS for a beautiful, mobile-friendly experience.
- **Authentication**: Secure Google Sign-In via Firebase Auth.
- **Employee Directory**: Fetches and displays employee data from DummyJSON with search, filter, and pagination/infinite scroll.
- **Dynamic Employee Details**: View detailed employee profiles with tabs for overview, projects, and feedback.
- **Bookmark Manager**: Bookmark and manage favorite employees.
- **Analytics & Charts**: Department-wise ratings and bookmark trends using Chart.js.
- **Create User Modal**: Add new employees with a professional modal form.
- **Particles & Animated Background**: Subtle, animated SVG background for a modern look.
- **DiceBear Avatars**: Unique, auto-generated avatars for users without profile photos.
- **Framer Motion Animations**: Smooth transitions and hover effects throughout the UI.
- **Professional Navbar & Footer**: Includes navigation, user info, and project credits.
- **Demo/Testimonial Section**: Showcases user feedback and platform advantages.

---

> **Project by Diptendu**
