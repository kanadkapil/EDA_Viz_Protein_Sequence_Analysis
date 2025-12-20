import React from 'react';
import PlotContainer from '../components/PlotContainer';
import MathFormula from '../components/MathFormula';
import { baseReportData } from '../data/mockBaseReportData';
import { Activity, Info, Map as MapIcon, Grid } from 'lucide-react';

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapIcon className="w-5 h-5 mr-2 text-gray-500" />
            Residue-Residue Contact Map
          </h3>
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-500" />
            Contact Definition
          </h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            In structural biology, two residues $i$ and $j$ are considered "in contact" if the distance between their $C_\alpha$ atoms is below a fixed threshold:
          </p>
          <MathFormula 
            formula="C_{ij} = \begin{cases} 1 & \text{if } d(C_{\alpha i}, C_{\alpha j}) \le 8\text{Å} \\ 0 & \text{otherwise} \end{cases}"
            className="mb-6 bg-gray-50 border-gray-200"
          />
          <p className="text-sm text-gray-600 leading-relaxed">
            Predicting these contacts is an essential proxy for solving the full 3D protein folding problem.
          </p>
        </div>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Grid className="w-5 h-5 mr-2 text-gray-500" />
              3-State Structure Frequencies
            </h3>
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
            
            <div className="mt-8">
               <h4 className="text-sm font-semibold text-gray-700 mb-3">DSSP 8-to-3 State Mapping</h4>
               <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  The original 8 structural states (defined by DSSP) are condensed into 3 classes for modeling:
               </p>
               <div className="bg-gray-50 border border-gray-200 rounded p-3 text-[10px] font-mono grid grid-cols-3 gap-2">
                  <div className="flex flex-col"><span className="font-bold text-green-700 border-b border-green-200 mb-1">Helix (H)</span><span>H, G, I</span></div>
                  <div className="flex flex-col"><span className="font-bold text-blue-700 border-b border-blue-200 mb-1">Sheet (E)</span><span>E, B</span></div>
                  <div className="flex flex-col"><span className="font-bold text-gray-700 border-b border-gray-200 mb-1">Coil (C)</span><span>S, T, L</span></div>
               </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100 text-xs text-green-800">
                <Info className="inline w-3 h-3 mr-1" />
                The model achieves <strong>81.53% Q3 accuracy</strong> on these three states.
            </div>
         </div>
      </div>
      {/* Quick Insight */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 mt-6">
         <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Executive Insight: Structural Proxies
         </h3>
         <p className="text-sm text-green-800 leading-relaxed">
            The <strong>8Å threshold</strong> for contacts is a standard in structural biology, effectively capturing the physical proximity required for hydrogen bonding and van der Waals interactions. Achieving 81.53% Q3 accuracy on secondary structure is a significant milestone, as it provides a reliable "skeleton" for full 3D fold reconstruction.
         </p>
      </div>
    </div>
  );
};

export default StructureReport;
