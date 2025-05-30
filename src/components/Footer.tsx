import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 text-white text-center p-4 mt-auto">
      <p>&copy; {year} Fortesoft</p>
    </footer>
  );
};

export default Footer;
