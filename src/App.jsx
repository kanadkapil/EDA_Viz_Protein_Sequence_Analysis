import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { FileText, Activity, Dna, Share2 } from 'lucide-react';

import ProjectSummary from './components/ProjectSummary';

// Placeholder Pages
const Dashboard = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Project Overview</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Winter 2025</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {[
         { title: 'Base Analysis', path: '/base', icon: FileText, color: 'bg-blue-500' },
         { title: 'Intersection', path: '/intersect', icon: Share2, color: 'bg-purple-500' },
         { title: 'Secondary Structure', path: '/structure', icon: Activity, color: 'bg-green-500' },
         { title: 'Sequence Analysis', path: '/sequence', icon: Dna, color: 'bg-red-500' },
       ].map((item) => (
         <Link key={item.title} to={item.path} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer block group">
           <div className={`p-3 rounded-lg ${item.color} text-white group-hover:scale-110 transition-transform`}>
             <item.icon size={24} />
           </div>
           <div>
             <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
             <p className="text-sm text-gray-500">View Report</p>
           </div>
         </Link>
       ))}
    </div>
    
    {/* Render the full project summary */}
    <ProjectSummary />
    
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
