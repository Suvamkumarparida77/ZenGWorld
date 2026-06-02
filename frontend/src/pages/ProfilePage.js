import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Dummy User Data
  const [user, setUser] = useState({
    name: "Suvam",
    username: "@suvam_dev",
    email: "suvam@zeng.com",
    bio: "Creator • Gamer • Coder",
    balance: 2450
  });

  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
    alert("Profile Updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem('zeng_token');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="profile-main">
        
        {/* PROFILE HEADER */}
        <div className="profile-header">
          <div className="cover-photo"></div>
          <div className="profile-info-section">
            <div className="avatar-container">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Suvam" 
                alt="Avatar" 
                className="profile-avatar"
              />
              <div className="edit-avatar-icon">📷</div>
            </div>
            
            <div className="user-details">
              <div className="user-name-row">
                <h1>{user.name}</h1>
                {!isEditing ? (
                  <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
                ) : (
                  <button className="btn-save" onClick={handleSave}>Save</button>
                )}
              </div>
              <p className="username">{user.username}</p>
              <p className="bio">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-number">{user.balance}</span>
            <span className="stat-label">Coins</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">12</span>
            <span className="stat-label">Videos</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">5.4K</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">128</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        {/* SETTINGS FORM */}
        <div className="settings-card">
          <h2>Account Settings</h2>
          
          <div className="form-group">
            <label>Display Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea 
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              disabled={!isEditing}
            ></textarea>
          </div>

          <div className="danger-zone">
            <button className="btn-logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ProfilePage;