import React from 'react';
import PlotContainer from '../components/PlotContainer';
import { baseReportData } from '../data/mockBaseReportData';
import { Activity, Info } from 'lucide-react';

const StructureReport = () => {
  const { structureClasses } = baseReportData;

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
          Secondary Structure Analysis
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Residue-Residue Contact Map</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          This heatmap represents the interaction probabilities between different residues in the protein sequence. 
          The <strong>diagonal</strong> represents local backbone contacts, while off-diagonal high-intensity spots indicate 
          <strong> long-range tertiary interactions</strong> or hydrogen bonding in beta-sheets.
        </p>

        <PlotContainer 
           title="Predicted Contact Matrix"
           data={[
             {
               z: zData,
               type: 'heatmap',
               colorscale: 'Viridis',
             }
           ]}
           layout={{ 
              height: 500,
              width: 500,
              autosize: false,
              xaxis: { title: 'Residue Index' },
              yaxis: { title: 'Residue Index', autorange: 'reversed' }
           }}
           className="flex justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Thermodynamic Stability</h3>
            <p className="text-sm text-gray-500 mb-4">Distribution of Minimum Free Energy (MFE) for the predicted structures.</p>
            <PlotContainer 
               data={[
                 {
                   x: Array.from({length: 200}, () => -40 + Math.random() * 20),
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3-State Structure Frequencies</h3>
            <p className="text-sm text-gray-500 mb-6">Aggregate distribution of secondary structure types across the validation set.</p>
            <div className="space-y-6">
              {structureClasses.map((item) => (
                <div key={item.label}>
                   <div className="flex justify-between text-sm font-medium mb-1">
                      <span className="text-gray-700 font-bold">{item.label}</span>
                      <span className="text-green-600">{item.val}%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full shadow-sm" 
                        style={{ width: `${item.val}%` }}
                      ></div>
                   </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100 text-xs text-green-800">
                <Info className="inline w-3 h-3 mr-1" />
                The model achieves <strong>81.53% Q3 accuracy</strong> on these three states.
            </div>
         </div>
      </div>
    </div>
  );
};

export default StructureReport;
