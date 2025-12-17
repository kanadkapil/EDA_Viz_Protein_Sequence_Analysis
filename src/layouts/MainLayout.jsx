import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <footer className="mt-8 pt-6 border-t border-gray-100 text-center text-gray-400 text-sm">
            <p>Developed by <span className="font-medium text-gray-600">Kanad Kapil</span></p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
