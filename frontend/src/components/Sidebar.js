import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- NAVIGATION DATA (Like the paid version) ---
  const navItems = [
    { icon: '🏠', label: 'Home', path: '/dashboard' },
    { icon: '🎬', label: 'Shorts', path: '/shorts' },
    { icon: '📺', label: 'OTT', path: '/ott' },
    { icon: '🎮', label: 'Gaming', path: '/gaming' },
    { icon: '🌐', label: 'Community', path: '/community' },
    { icon: '📤', label: 'Upload', path: '/upload' },
    { icon: '👤', label: 'Profile', path: '/profile' },
  ];

  // --- SUGGESTED USERS DATA ---
  const suggestedUsers = [
    { id: 1, name: 'Sarah Vlogs', handle: '@sarah_life', color: '#ec4899', initial: 'S' },
    { id: 2, name: 'Alex Gamer', handle: '@alex_pro', color: '#3b82f6', initial: 'A' },
    { id: 3, name: 'Mira Arts', handle: '@mira_creates', color: '#f59e0b', initial: 'M' },
  ];

  const [followedIds, setFollowedIds] = useState([]);

  const toggleFollow = (id) => {
    if (followedIds.includes(id)) {
      setFollowedIds(followedIds.filter(fid => fid !== id));
    } else {
      setFollowedIds([...followedIds, id]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zeng_token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* LOGO (Premium Style) */}
      <div 
        onClick={() => navigate('/dashboard')} 
        className="sidebar-header"
      >
        <div className="logo-icon">✨</div>
        <div className="logo-text">
          <span>ZEN G</span>
          <span className="highlight">WORLD</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="nav-menu">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className={`icon-box ${isActive ? 'active' : ''}`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
              {isActive && <div className="active-dot"></div>}
            </div>
          );
        })}
      </nav>

      {/* SUGGESTED USERS (Premium Card Style) */}
      <div className="suggested-section">
        <div className="suggested-header">
          <span>Who to follow</span>
          <span className="see-all" onClick={() => navigate('/community')}>See All</span>
        </div>
        
        <div className="suggested-card">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="user-row">
              <div className="user-avatar" style={{ background: user.color }}>
                {user.initial}
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-handle">{user.handle}</div>
              </div>
              <button
                onClick={() => toggleFollow(user.id)}
                className={`btn-follow-mini ${followedIds.includes(user.id) ? 'following' : ''}`}
              >
                {followedIds.includes(user.id) ? '✓' : '+'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LOGOUT */}
      <div className="nav-item logout-btn" onClick={handleLogout}>
        <div className="icon-box">🚪</div>
        <span>Logout</span>
      </div>

    </aside>
  );
}

export default Sidebar;