import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => (
  <section id="hero" className="hero-section">
    <div className="hero-content">
      <h1>Take Control of Your Productivity</h1>
      <p>Our powerful Kanban board helps teams and individuals manage tasks effortlessly, improve workflow, and enhance collaboration.</p>
      
      <div className="hero-buttons">
        <button className="primary-btn" onClick={() => alert('Get Started!')}>Get Started</button>
        <button className="secondary-btn" onClick={() => alert('Learn More!')}>Learn More</button>
      </div>
    </div>

    <div className="hero-image">
      <img src="https://via.placeholder.com/600x400" alt="Kanban Board Example" />
    </div>
  </section>
);

export default HeroSection;
