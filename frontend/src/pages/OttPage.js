import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './OttPage.css';

function OttPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Dummy OTT Data
    setCategories([
      {
        id: 1,
        title: "Trending Now",
        movies: [
          { id: 101, title: "Cyber City", img: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
          { id: 102, title: "Space Walker", img: "https://image.tmdb.org/t/p/w500/xJHokMbljvjADYdit5fK5VQsXEG.jpg" },
          { id: 103, title: "The Matrix", img: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
          { id: 104, title: "Inception", img: "https://image.tmdb.org/t/p/w500/9gk7admal4zl67YrxIo2AO08qX8.jpg" },
        ]
      },
      {
        id: 2,
        title: "ZEN G Exclusives",
        movies: [
          { id: 201, title: "Dark Future", img: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwSm56HNkt2908gN3.jpg" },
          { id: 202, title: "Neon Nights", img: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ber9.jpg" },
        ]
      }
    ]);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="ott-main">
        
        {/* HERO BANNER */}
        <div className="hero-banner">
          <div className="hero-overlay"></div>
          <img 
            src="https://image.tmdb.org/t/p/original/9gk7admal4zl67YrxIo2AO08qX8.jpg" 
            alt="Hero Movie" 
            className="hero-img"
          />
          <div className="hero-content">
            <h1 className="hero-title">INCEPTION</h1>
            <p className="hero-desc">
              A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
            </p>
            <div className="hero-buttons">
              <button className="btn-play">▶ Play</button>
              <button className="btn-info">ℹ More Info</button>
            </div>
          </div>
        </div>

        {/* MOVIE ROWS */}
        <div className="ott-content">
          {categories.map((cat) => (
            <div key={cat.id} className="category-row">
              <h2 className="category-title">{cat.title}</h2>
              <div className="movie-scroll">
                {cat.movies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <img src={movie.img} alt={movie.title} className="movie-img" />
                    <div className="movie-title-overlay">{movie.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default OttPage;