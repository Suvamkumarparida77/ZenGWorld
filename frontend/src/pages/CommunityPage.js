import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './CommunityPage.css';

function CommunityPage() {
  // Dummy Data for Other Users
  const [creators] = useState([
    { id: 1, name: "Alex Gamer", handle: "@alex_pro", followers: "12K", role: "Pro Gamer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    { id: 2, name: "Sarah Vlogs", handle: "@sarah_life", followers: "45K", role: "Vlogger", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 3, name: "Tech Master", handle: "@tech_guru", followers: "8K", role: "Reviewer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech" },
    { id: 4, name: "Music Soul", handle: "@melody", followers: "120K", role: "Artist", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Music" },
  ]);

  const [following, setFollowing] = useState([]);

  const toggleFollow = (id) => {
    if (following.includes(id)) {
      setFollowing(following.filter(fid => fid !== id));
    } else {
      setFollowing([...following, id]);
    }
  };

  const viewProfile = (id) => {
    alert(`Navigating to Profile of User ID: ${id} (In real app, this goes to /profile/${id})`);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="community-main">
        
        {/* HEADER */}
        <header className="community-header">
          <h1>Community Creators</h1>
          <p>Discover and follow top talent on ZEN G WORLD</p>
        </header>

        {/* CREATORS GRID */}
        <div className="creators-grid">
          {creators.map((creator) => (
            <div key={creator.id} className="creator-card glass-effect">
              
              {/* Banner & Avatar */}
              <div className="card-top">
                <div className="card-banner"></div>
                <img src={creator.img} alt={creator.name} className="creator-avatar" />
              </div>

              {/* Info */}
              <div className="card-body">
                <h3>{creator.name}</h3>
                <p className="handle">{creator.handle}</p>
                <p className="role-badge">{creator.role}</p>
                
                <div className="stats-row">
                  <span>👥 {creator.followers}</span>
                </div>

                {/* Actions */}
                <div className="card-actions">
                  <button 
                    className={`btn-follow ${following.includes(creator.id) ? 'following' : ''}`}
                    onClick={() => toggleFollow(creator.id)}
                  >
                    {following.includes(creator.id) ? '✓ Following' : '+ Follow'}
                  </button>
                  
                  <button className="btn-view" onClick={() => viewProfile(creator.id)}>
                    View Profile
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default CommunityPage;