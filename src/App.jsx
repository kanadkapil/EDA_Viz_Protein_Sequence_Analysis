import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { FileText, Activity, Dna, Share2 } from 'lucide-react';

// Placeholder Pages
const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Project Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {[
         { title: 'Base Analysis', path: '/base', icon: FileText, color: 'bg-blue-500' },
         { title: 'Intersection', path: '/intersect', icon: Share2, color: 'bg-purple-500' },
         { title: 'Secondary Structure', path: '/structure', icon: Activity, color: 'bg-green-500' },
         { title: 'Sequence Analysis', path: '/sequence', icon: Dna, color: 'bg-red-500' },
       ].map((item) => (
         <div key={item.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
           <div className={`p-3 rounded-lg ${item.color} text-white`}>
             <item.icon size={24} />
           </div>
           <div>
             <h3 className="font-semibold text-gray-900">{item.title}</h3>
             <p className="text-sm text-gray-500">View Report</p>
           </div>
         </div>
       ))}
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About this Dashboard</h2>
      <p className="text-gray-600">
        This interactive dashboard visualizes the Exploratory Data Analysis (EDA) reports for the project. 
        Navigate through the sidebar to explore detailed analysis of Base, Intersection, Structure, and Sequence data.
      </p>
    </div>
  </div>
);

import BaseReport from './pages/BaseReport';
import IntersectReport from './pages/IntersectReport';
import StructureReport from './pages/StructureReport';
import SequenceReport from './pages/SequenceReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="base" element={<BaseReport />} />
          <Route path="intersect" element={<IntersectReport />} />
          <Route path="structure" element={<StructureReport />} />
          <Route path="sequence" element={<SequenceReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
