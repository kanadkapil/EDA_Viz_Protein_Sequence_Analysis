import React from 'react';
import PlotContainer from '../components/PlotContainer';
import { Activity } from 'lucide-react';

const StructureReport = () => {
  // Mock Contact Map Data
  const size = 50;
  const zData = Array.from({ length: size }, (_, y) => 
    Array.from({ length: size }, (_, x) => {
      // Simulate diagonal and some interactions
      if (x === y) return 1;
      if (Math.abs(x - y) < 2) return 0.8;
      if (Math.abs(x - y) === 10) return 0.5; // Distant interaction
      return Math.random() * 0.1;
    })
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 text-green-600" />
          Structure Analysis
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Map</h3>
        <p className="text-gray-600 mb-6">
          This heatmap represents the probability of interaction between different residues in the sequence. 
          The diagonal represents local interactions, while off-diagonal high-intensity spots indicate long-range interactions typical of secondary structures.
        </p>

        <PlotContainer 
           title="Predicted Contact Map"
           data={[
             {
               z: zData,
               type: 'heatmap',
               colorscale: 'Viridis',
             }
           ]}
           layout={{ 
              height: 500,
              width: 600,
              autosize: false,
              xaxis: { title: 'Residue Index' },
              yaxis: { title: 'Residue Index', autorange: 'reversed' }
           }}
           className="flex justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Free Energy Distribution</h3>
            <PlotContainer 
               data={[
                 {
                   x: Array.from({length: 200}, () => -20 + Math.random() * 10),
                   type: 'histogram',
                   marker: { color: '#10b981' }
                 }
               ]}
               layout={{ 
                  height: 300,
                  xaxis: { title: 'Free Energy (kcal/mol)' },
                  title: 'MFE Distribution'
               }}
            />
         </div>
         
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Structure Class Frequencies</h3>
            <div className="space-y-4">
              {[
                { label: 'Hairpin Loop', val: 45 },
                { label: 'Internal Loop', val: 30 },
                { label: 'Multi-branch Loop', val: 15 },
                { label: 'Stem', val: 10 },
              ].map((item) => (
                <div key={item.label}>
                   <div className="flex justify-between text-sm font-medium mb-1">
                      <span>{item.label}</span>
                      <span>{item.val}%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${item.val}%` }}
                      ></div>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default StructureReport;
