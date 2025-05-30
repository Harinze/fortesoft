import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-600 text-lg font-semibold">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
