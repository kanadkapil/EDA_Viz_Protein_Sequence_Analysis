import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlotContainer from '../components/PlotContainer';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const mockData = {
  overview: {
    n_vars: 12,
    n_obs: 15420,
    missing_cells: 450,
    missing_cells_pct: 0.2,
    duplicate_rows: 0,
    duplicate_rows_pct: 0.0,
    size_memory: '1.4 MiB',
    numeric: 8,
    categorical: 4,
  },
  warnings: [
    { type: 'High Correlation', message: 'structure_1 is highly correlated with structure_2', severity: 'warning' },
    { type: 'Skewed', message: 'energy_score is highly skewed (γ1 = 23.4)', severity: 'info' },
    { type: 'Zeros', message: 'count has 4120 / 26.7% zeros', severity: 'info' },
  ],
  variables: ['id', 'sequence', 'energy_score', 'structure_1', 'structure_2', 'count', 'gc_content', 'length', 'melting_temp', 'molecular_weight', 'is_valid', 'timestamp'],
};

const TabButton = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium text-sm rounded-md transition-all ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {label}
  </button>
);


import MathFormula from '../components/MathFormula';

const OverviewSection = () => (
  <div className="space-y-6">
    {/* Dataset Statistics */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Dataset Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-gray-500">Number of variables</p>
          <p className="text-2xl font-bold text-gray-900">{mockData.overview.n_vars}</p>
        </div>
        <div>
           <p className="text-sm text-gray-500">Number of observations</p>
           <p className="text-2xl font-bold text-gray-900">{mockData.overview.n_obs}</p>
        </div>
        <div>
           <p className="text-sm text-gray-500">Missing cells</p>
           <p className="text-2xl font-bold text-gray-900">{mockData.overview.missing_cells} <span className="text-sm font-normal text-gray-400">({mockData.overview.missing_cells_pct}%)</span></p>
        </div>
        <div>
           <p className="text-sm text-gray-500">Total Size in Memory</p>
           <p className="text-2xl font-bold text-gray-900">{mockData.overview.size_memory}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
           <p className="text-sm text-gray-500 mb-2">Variable Types</p>
           <div className="flex space-x-4">
             <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Numeric: {mockData.overview.numeric}</span>
             <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Categorical: {mockData.overview.categorical}</span>
           </div>
        </div>
      </div>
    </div>
    
    {/* Formula Example */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
       <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistical Concepts</h3>
       <p className="text-gray-600 mb-4">The following formula is used to calculate the skewness of the distribution:</p>
       <MathFormula formula="\\gamma_1 = \\frac{\\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\bar{x})^3}{\\left(\\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\bar{x})^2\\right)^{3/2}}" />
    </div>

    {/* Warnings */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts & Warnings</h3>
      <div className="space-y-3">
        {mockData.warnings.map((warn, idx) => (
          <div key={idx} className="flex items-start p-3 bg-yellow-50 border border-yellow-100 rounded-md">
             <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
             <div>
               <span className="font-semibold text-yellow-800 mr-2">{warn.type}</span>
               <span className="text-yellow-700">{warn.message}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VariablesSection = () => (
  <div className="space-y-6">
     {/* Example Variable: Energy Score */}
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-start mb-6">
           <div>
             <h3 className="text-lg font-bold text-gray-900">energy_score</h3>
             <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">Real number</span>
           </div>
           <div className="text-right">
              <p className="text-sm text-gray-500">Distinct: 14021</p>
              <p className="text-sm text-gray-500">Missing: 0</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <PlotContainer 
              title="Histogram"
              data={[
                {
                  x: Array.from({length: 500}, () => Math.random() * 100 - 50),
                  type: 'histogram',
                  marker: { color: '#3b82f6' },
                }
              ]}
              layout={{ height: 300, margin: { l: 40, r: 20, t: 20, b: 40 } }}
              className="border-none shadow-none p-0"
           />
           <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="p-3 bg-gray-50 rounded">
                    <span className="text-gray-500 block">Mean</span>
                    <span className="font-medium">-12.45</span>
                 </div>
                 <div className="p-3 bg-gray-50 rounded">
                    <span className="text-gray-500 block">Minimum</span>
                    <span className="font-medium">-45.20</span>
                 </div>
                 <div className="p-3 bg-gray-50 rounded">
                    <span className="text-gray-500 block">Maximum</span>
                    <span className="font-medium">10.15</span>
                 </div>
                 <div className="p-3 bg-gray-50 rounded">
                    <span className="text-gray-500 block">Std Dev</span>
                    <span className="font-medium">5.32</span>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>
);

const BaseReport = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Base Report</h1>
        <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200">
           {['overview', 'variables', 'interactions', 'correlations'].map((tab) => (
             <TabButton 
               key={tab} 
               label={tab.charAt(0).toUpperCase() + tab.slice(1)} 
               active={activeTab === tab} 
               onClick={() => setActiveTab(tab)} 
             />
           ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'variables' && <VariablesSection />}
        {activeTab === 'interactions' && <div className="text-center py-20 text-gray-500">Interactions interactions placeholder</div>}
        {activeTab === 'correlations' && <div className="text-center py-20 text-gray-500">Correlations heatmap placeholder</div>}
      </motion.div>
    </div>
  );
};

export default BaseReport;
