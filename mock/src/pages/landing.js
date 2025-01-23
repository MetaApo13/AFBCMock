import React, { useState } from 'react';
import '../SkillMatchLandingPage.css';

const SkillMatchLandingPage = () => {
  const [email, setEmail] = useState('');

  const featuredSkills = [
    'Web Development', 
    'Graphic Design', 
    'Digital Marketing', 
    'Content Writing', 
    'Data Analysis'
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted email:', email);
  };

  return (
    <div className="skill-match-landing">
      <nav className="landing-nav">
        <div className="nav-brand">
          <span className="logo-icon">🌐</span>
          <h1>SkillSync</h1>
        </div>
        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>

      <main className="landing-content">
        <div className="content-text">
          <h2>Connect. Collaborate. 
            <span className="highlight">Elevate Your Skills</span>
          </h2>
          <p>Discover perfect job matches, showcase your talents, and unlock endless professional opportunities.</p>

          <form onSubmit={handleEmailSubmit} className="email-signup">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Get Started →</button>
          </form>

          <div className="featured-skills">
            <p>Featured Skills:</p>
            {featuredSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="content-graphic">
          <div className="feature-card">
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <div>
                <h3>Professional Network</h3>
                <p>Connect with top talent globally</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💼</span>
              <div>
                <h3>Smart Matching</h3>
                <p>AI-powered skill alignment</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h3>Verified Opportunities</h3>
                <p>Trusted and curated job listings</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        © 2024 SkillSync. All rights reserved.
      </footer>
    </div>
  );
};

export default SkillMatchLandingPage;