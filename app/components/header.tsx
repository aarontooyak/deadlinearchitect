 import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div>
          <a href="/" className="text-white font-bold text-xl">
            Deadline Architect
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;