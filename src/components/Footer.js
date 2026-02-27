import React from 'react';
import '../styles/components.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Sanctum Infinitum. All rights reserved.</p>
    </footer>
  );
};

export default Footer;