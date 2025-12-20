import React from 'react';
import PlotContainer from '../components/PlotContainer';
import MathFormula from '../components/MathFormula';
import { baseReportData } from '../data/mockBaseReportData';
import { Dna, AlignLeft, BarChart2, Info } from 'lucide-react';

const SequenceReport = () => {
  const { sequenceComposition } = baseReportData;

  const lengthDistData = {
    x: Array.from({length: 200}, (_, i) => i * 10),
    y: Array.from({length: 200}, () => Math.floor(Math.random() * 50) + 10),
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Dna className="mr-3 text-red-600" />
          Protein Sequence Analysis
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composition Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
             <AlignLeft className="w-5 h-5 mr-2 text-gray-500" />
             Amino Acid Composition
           </h3>
           <p className="text-sm text-gray-500 mb-4">Relative frequency of top amino acids across the dataset.</p>
           <PlotContainer 
              data={[
                {
                  labels: sequenceComposition.labels,
                  values: sequenceComposition.values,
                  type: 'pie',
                  marker: { colors: ['#faa0a0', '#93c5fd', '#fcd34d', '#86efac', '#c084fc', '#cbd5e1'] },
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
           <div className="mt-6 p-4 bg-red-50 rounded-lg text-xs text-red-700">
             <Info className="inline w-3 h-3 mr-1" />
             Leucine (L) and Alanine (A) are the most prevalent residues in these globular proteins.
           </div>

           <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Sequence Complexity (Shannon Entropy)</h4>
              <p className="text-xs text-gray-500 mb-3">
                 Entropy $H$ quantifies the diversity of amino acids at each position. Higher entropy indicates lower conservation.
              </p>
              <MathFormula 
                 formula="H = -\sum_{i=1}^{20} p_i \log_2(p_i)"
                 className="bg-white border-gray-200"
              />
           </div>
        </div>

        {/* Length Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
             <BarChart2 className="w-5 h-5 mr-2 text-gray-500" />
             Residue Length Distribution
           </h3>
           <p className="text-sm text-gray-500 mb-4">Distribution of protein sequence lengths (in amino acids).</p>
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
                 xaxis: { title: 'Sequence Length (aa)' },
                 yaxis: { title: 'Count' }
              }}
              className="border-none shadow-none p-0"
           />
        </div>
      </div>
      
      {/* Motifs & N-gram Theory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Identified Sequence Motifs</h3>
            <p className="text-sm text-gray-500 mb-4">Highly conserved $n$-grams used for functional classification (MNB Model).</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {['L-A-G-V', 'V-V-I-L', 'G-G-S-G', 'L-L-L-L', 'A-A-G-V'].map((motif, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded border border-gray-200 font-mono text-center tracking-widest text-lg font-bold text-red-800">
                     {motif}
                  </div>
               ))}
            </div>
         </div>
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">N-gram (k-mer) Theory</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
               Proteins are represented as overlapping sub-sequences of length $k$. For $k=4$, the sequence <code>LAGVVI</code> is broken into:
            </p>
            <div className="mt-3 p-3 bg-gray-50 rounded font-mono text-xs text-blue-700 border border-blue-100">
               ['LAGV', 'AGVV', 'GVVI']
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
               This captures local structural patterns (motifs) that are often conserved across evolution, allowing the <strong>Multinomial Naive Bayes</strong> classifier to identify protein families.
            </p>
         </div>
      </div>
    </div>
  );
};

export default SequenceReport;
