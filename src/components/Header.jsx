import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-30">
      <button 
        onClick={toggleSidebar} 
        className="p-2 rounded-md hover:bg-gray-100 lg:hidden mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Menu size={24} className="text-gray-600" />
      </button>
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          EDA Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
