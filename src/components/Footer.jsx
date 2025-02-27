import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <footer id="contact" className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>About Kanban Board</h3>
        <p>
          Our intuitive Kanban board helps teams stay organized, improve workflow efficiency, and enhance collaboration.
        </p>
      </div>

      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: <a href="crlongsworth0@gmail.com">crlongsworth0@gmail.com</a></p>
        <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
        </p>
      </div>
    </div>

    <p className="footer-bottom">&copy; {new Date().getFullYear()} Kanban Board. All rights reserved.</p>
  </footer>
);

export default Footer;
