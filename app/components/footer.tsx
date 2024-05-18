import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-white">
          &copy; {new Date().getFullYear()} Deadline Architect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;