import React from 'react';
import '../styles/Features.css';

const Features = () => (
  <section id="features" className="features">
    <h2>Powerful Features to Boost Productivity</h2>
    <p>Our Kanban board is designed to help you streamline your workflow and improve collaboration effortlessly.</p>
    
    <div className="features-grid">
      <div className="feature-card">
        <h3>🚀 Drag-and-Drop Task Management</h3>
        <p>Effortlessly move tasks across different stages with a smooth drag-and-drop interface.</p>
      </div>

      <div className="feature-card">
        <h3>👥 Real-Time Collaboration</h3>
        <p>Work together with your team in real-time, ensuring everyone stays on the same page.</p>
      </div>

      <div className="feature-card">
        <h3>⚙️ Customizable Workflows</h3>
        <p>Adapt the board to fit your process by creating custom columns and categories.</p>
      </div>

      <div className="feature-card">
        <h3>🔔 Smart Notifications</h3>
        <p>Get notified when tasks are updated, assigned, or completed to stay informed at all times.</p>
      </div>

      <div className="feature-card">
        <h3>📊 Progress Tracking & Insights</h3>
        <p>View analytics on task completion, team efficiency, and project deadlines in a user-friendly dashboard.</p>
      </div>

      <div className="feature-card">
        <h3>🔄 Seamless Integrations</h3>
        <p>Connect with your favorite tools like Slack, Google Drive, and Trello for a unified workflow.</p>
      </div>
    </div>
  </section>
);

export default Features;
