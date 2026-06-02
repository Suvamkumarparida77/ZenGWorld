import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {

  const navigate = useNavigate();

  // STATES
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ================= LOGIN / SIGNUP =================
  const handleAuth = async (e) => {

    e.preventDefault();

    setError('');
    setLoading(true);

    try {

      const payload = isLogin
        ? { username, password }
        : { fullName, username, password };

      const response = await fetch('http://localhost:8080/api/auth/login', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)

      });

      const data = await response.json();

      // SUCCESS
      if (response.ok) {

        localStorage.setItem('zeng_token', data.token);

        console.log('Login Success:', data);

        navigate('/dashboard');

      } else {

        setError(data.message || 'Authentication failed');

      }

    } catch (err) {

      console.error(err);

      setError('Server connection failed.');

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      {/* ================= LEFT SIDE ================= */}

      <div className="auth-left">

        <div className="brand-overlay">

          <h1 className="brand-title">
            ZEN G WORLD
          </h1>

          <p className="brand-subtitle">
            Entertainment • Streaming • Gaming • Creator Economy
          </p>

        </div>

        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4"
            type="video/mp4"
          />
        </video>

      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="auth-right">

        <div className="auth-box">

          <h2>
            {isLogin ? 'Welcome Back 👋' : 'Create Account 🚀'}
          </h2>

          <p className="auth-subtitle">

            {isLogin
              ? 'Login to continue your creator journey.'
              : 'Join the next generation entertainment platform.'}

          </p>

          {/* ERROR MESSAGE */}

          {error && (

            <div className="error-box">
              {error}
            </div>

          )}

          {/* FORM */}

          <form onSubmit={handleAuth}>

            {/* FULL NAME */}

            {!isLogin && (

              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

              </div>

            )}

            {/* USERNAME */}

            <div className="input-group">

              <label>Username</label>

              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading
                ? 'Please Wait...'
                : isLogin
                  ? 'Login'
                  : 'Create Account'}

            </button>

          </form>

          {/* TOGGLE */}

          <div className="toggle-text">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              className="toggle-link"
              onClick={() => {

                setIsLogin(!isLogin);
                setError('');

              }}
            >

              {isLogin ? ' Sign Up' : ' Login'}

            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default LoginPage;