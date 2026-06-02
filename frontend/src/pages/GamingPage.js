import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './GamingPage.css';

function GamingPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    // Premium Dummy Data
    setLiveMatches([
      { id: 1, game: "BGMI", teams: "Soul vs GodLike", viewers: "125K", status: "LIVE", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80", league: "Battlegrounds Mobile" },
      { id: 2, game: "Valorant", teams: "Team Liquid vs Fnatic", viewers: "450K", status: "LIVE", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=500&q=80", league: "VCT Masters" },
      { id: 3, game: "FreeFire", teams: "XSpark vs TS", viewers: "80K", status: "UPCOMING", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b79?auto=format&fit=crop&w=500&q=80", league: "FFCS" },
      { id: 4, game: "CS:GO", teams: "Navi vs Astralis", viewers: "300K", status: "LIVE", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=500&q=80", league: "Major" },
      { id: 5, game: "Fortnite", teams: "Solos Finals", viewers: "2.1M", status: "LIVE", img: "https://images.unsplash.com/photo-1589241062272-c0ac0003aaa7?auto=format&fit=crop&w=500&q=80", league: "FNCS" },
    ]);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="gaming-main">
        
        {/* CATEGORY FILTERS */}
        <div className="filter-bar">
          <button className={`filter-chip ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => setActiveFilter('All')}>
            🌍 All
          </button>
          <button className={`filter-chip ${activeFilter === 'FPS' ? 'active' : ''}`} onClick={() => setActiveFilter('FPS')}>
            🔫 FPS
          </button>
          <button className={`filter-chip ${activeFilter === 'MOBA' ? 'active' : ''}`} onClick={() => setActiveFilter('MOBA')}>
            ⚔️ MOBA
          </button>
          <button className={`filter-chip ${activeFilter === 'Sports' ? 'active' : ''}`} onClick={() => setActiveFilter('Sports')}>
            🏀 Sports
          </button>
        </div>

        {/* HERO STREAM SECTION (The "TV" Look) */}
        <div className="hero-stream">
          <div className="stream-overlay">
            <div className="stream-top">
              <span className="live-pulse">🔴 LIVE</span>
              <span className="view-count">👁️ 125K Watching</span>
            </div>
            
            <div className="stream-center">
              <div className="match-title">BGMI PRO LEAGUE SEASON 1</div>
              <div className="match-subtitle">Grand Finals: Soul vs GodLike</div>
              <div className="stream-tags">
                <span className="tag">#Battlegrounds</span>
                <span className="tag">#Esports</span>
              </div>
            </div>

            <div className="stream-actions">
              <button className="btn-watch">Watch Stream</button>
              <button className="btn-chat">Open Chat</button>
            </div>
          </div>
          
          {/* Simulated Video Background Image */}
          <div className="stream-bg" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200)'}}></div>
        </div>

        {/* LIVE MATCHES LIST */}
        <div className="matches-section">
          <div className="section-header">
            <h2>Live & Upcoming Matches</h2>
            <button className="see-all-btn">View Schedule</button>
          </div>
          
          <div className="matches-grid">
            {liveMatches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-img-container">
                  <img src={match.img} alt={match.game} className="match-img" />
                  <div className="match-status-badge">{match.status}</div>
                  <div className="viewer-count">{match.viewers}</div>
                </div>
                <div className="match-body">
                  <div className="league-badge">{match.league}</div>
                  <h3 className="match-title">{match.teams}</h3>
                  <div className="match-meta">{match.game} • 12:00 PM</div>
                  <button className="btn-watch-sm">
                    {match.status === 'LIVE' ? 'Watch Now' : 'Set Reminder'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default GamingPage;