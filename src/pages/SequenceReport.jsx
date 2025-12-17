import React, { useState } from 'react';
import PlotContainer from '../components/PlotContainer';
import { Dna, AlignLeft, BarChart2 } from 'lucide-react';

const SequenceReport = () => {
  // Mock Data
  const compositionData = {
    labels: ['A (Adenine)', 'C (Cytosine)', 'G (Guanine)', 'U (Uracil)'],
    values: [28, 22, 24, 26],
  };

  const lengthDistData = {
    x: Array.from({length: 200}, (_, i) => i + 10),
    y: Array.from({length: 200}, () => Math.floor(Math.random() * 50) + 10),
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Dna className="mr-3 text-red-600" />
          Sequence Analysis
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composition Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
             <AlignLeft className="w-5 h-5 mr-2 text-gray-500" />
             Nucleotide Composition
           </h3>
           <p className="text-sm text-gray-500 mb-4">Overall distribution of nucleotides across the dataset.</p>
           <PlotContainer 
              data={[
                {
                  labels: compositionData.labels,
                  values: compositionData.values,
                  type: 'pie',
                  marker: { colors: ['#faa0a0', '#93c5fd', '#fcd34d', '#86efac'] },
                  textinfo: 'label+percent',
                  hoverinfo: 'label+value+percent'
                }
              ]}
              layout={{ 
                 height: 350,
                 showlegend: true, 
                 legend: { orientation: 'h', y: -0.2 }
              }}
              className="border-none shadow-none p-0"
           />
           <div className="mt-4 text-center">
             <span className="text-sm font-medium text-gray-700">GC Content: 46%</span>
           </div>
        </div>

        {/* Length Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
             <BarChart2 className="w-5 h-5 mr-2 text-gray-500" />
             Sequence Length Distribution
           </h3>
           <p className="text-sm text-gray-500 mb-4">Distribution of sequence lengths in the analyzed set.</p>
           <PlotContainer 
              data={[
                {
                   x: lengthDistData.x,
                   y: lengthDistData.y,
                   type: 'scatter',
                   mode: 'lines',
                   fill: 'tozeroy',
                   line: { color: '#ef4444' }
                }
              ]}
              layout={{ 
                 height: 350,
                 xaxis: { title: 'Sequence Length (nt)' },
                 yaxis: { title: 'Count' }
              }}
              className="border-none shadow-none p-0"
           />
        </div>
      </div>
      
      {/* Sequence Viewer Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Motifs</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['AUGC.GCUA', 'GCAA.UUGC', 'CCGG.GGCC'].map((motif, i) => (
               <div key={i} className="p-4 bg-gray-50 rounded border border-gray-200 font-mono text-center tracking-widest text-lg">
                  {motif}
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SequenceReport;
