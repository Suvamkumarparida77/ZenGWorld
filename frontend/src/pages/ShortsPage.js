import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. ADDED IMPORT
import Sidebar from '../components/Sidebar';
import './ShortsPage.css';

function ShortsPage() {
  const navigate = useNavigate();
  const [shorts, setShorts] = useState([]);
  const [filter, setFilter] = useState('none');

  useEffect(() => {
    setShorts([
      { id: 1, username: "zen_creator", desc: "Cyber vibes 🌃 #cyberpunk", music: "Original Audio - Zen", likes: "12K", url: "https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-on-a-laptop-in-a-cyberpunk-environment-4034-large.mp4" },
      { id: 2, username: "travel_guy", desc: "Sunset in the mountains 🏔️ #travel", music: "Pop Hits - DJ Mix", likes: "45K", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4" },
      { id: 3, username: "dance_queen", desc: "New trend! Try it 💃 #dance", music: "Trending Beat - 2024", likes: "1.2M", url: "https://assets.mixkit.co/videos/preview/mixkit-woman-singing-a-song-in-a-studio-4014-large.mp4" },
    ]);
  }, []);

  const toggleFilter = () => {
    if (filter === 'none') setFilter('sepia(0.8) contrast(1.2)');
    else if (filter.includes('sepia')) setFilter('grayscale(100%)');
    else setFilter('none');
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="reels-main">
        {/* Mobile Container */}
        <div className="phone-frame">
          
          {/* Top Bar */}
          <div className="reels-top-bar">
            {/* <h2>Reels</h2> */}
            <div className="camera-icon" onClick={() => navigate('/upload')}>📷</div>
          </div>

          {/* SCROLL CONTAINER */}
          <div className="reels-scroll-container">
            {shorts.map((reel) => (
              <div key={reel.id} className="reel-item">
                
                {/* VIDEO */}
                <video 
                  className="reel-video"
                  src={reel.url}
                  loop
                  autoPlay
                  muted
                  playsInline
                  style={{ filter: filter }} 
                />

                {/* RIGHT SIDEBAR (Actions) */}
                <div className="reel-sidebar">
                  <div className="action-btn">
                    <div className="icon">❤️</div>
                    <span className="count">{reel.likes}</span>
                  </div>
                  <div className="action-btn">
                    <div className="icon">💬</div>
                    <span className="count">340</span>
                  </div>
                  <div className="action-btn">
                    <div className="icon">✈️</div>
                    <span className="count">Share</span>
                  </div>
                  
                  {/* MUSIC DISC */}
                  <div className="music-disc">
                    <div className="disc-inner">🎵</div>
                  </div>
                </div>

                {/* BOTTOM INFO */}
                <div className="reel-info">
                  <h3>@{reel.username}</h3>
                  <p>{reel.desc}</p>
                  
                  {/* MUSIC SLIDER */}
                  <div className="music-strip">
                    <span className="music-icon">🎵</span>
                    <div className="marquee">
                      <span>{reel.music}</span>
                    </div>
                  </div>
                </div>

                {/* FLOATING FILTER BUTTON */}
                <div className="filter-btn" onClick={toggleFilter}>
                  ✨ Filters
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default ShortsPage;