import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Pages
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import ShortsPage from './pages/ShortsPage';
import OttPage from './pages/OttPage';
import GamingPage from './pages/GamingPage';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';

// Import Reusable Components
import Sidebar from './components/Sidebar';

// Dashboard Component (Premium Style)
const Dashboard = () => {
  const stats = [
    { label: 'Total Views', value: '24.5K', icon: '▶️', color: '#8b5cf6' },
    { label: 'Followers', value: '1,280', icon: '👥', color: '#ec4899' },
    { label: 'Trending', value: '#12', icon: '📈', color: '#10b981' },
    { label: 'Uploads', value: '47', icon: '✨', color: '#f59e0b' },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="premium-dashboard">
        {/* WELCOME HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back</h1>
          <p className="dashboard-subtitle">Here's what's happening on your channel</p>
        </div>

        {/* STATS GRID */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-icon" style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* RECENT ACTIVITY CARD */}
        <div className="activity-card">
          <h2 className="activity-title">Recent Activity</h2>
          <p className="activity-text">Your latest uploads and interactions will appear here.</p>
        </div>
      </main>
    </div>
  );
};

function App() {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('zeng_token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* OTHER PAGES */}
        <Route
          path="/shorts"
          element={isAuthenticated ? <ShortsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/gaming"
          element={isAuthenticated ? <GamingPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/upload"
          element={isAuthenticated ? <UploadPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ott"
          element={isAuthenticated ? <OttPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/community"
          element={isAuthenticated ? <CommunityPage /> : <Navigate to="/login" replace />}
        />

        {/* FALLBACK */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;