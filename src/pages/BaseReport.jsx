import React, { useState } from 'react';
import PlotContainer from '../components/PlotContainer';
import MathFormula from '../components/MathFormula';
import { baseReportData } from '../data/mockBaseReportData';
import { 
  BarChart2, 
  Info, 
  Activity, 
  Grid, 
  AlertTriangle, 
  Database,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const BaseReport = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedVar, setExpandedVar] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'variables', label: 'Variables', icon: BarChart2 },
    { id: 'interactions', label: 'Interactions', icon: Activity },
    { id: 'correlations', label: 'Correlations', icon: Grid },
    { id: 'missing', label: 'Missing Values', icon: AlertTriangle },
    { id: 'sample', label: 'Sample', icon: Database },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Dataset Statistics</h3>
          <div className="space-y-3">
            {Object.entries(baseReportData.overview.datasetStatistics).map(([key, val]) => (
              <div key={key} className="flex justify-between border-b border-gray-50 pb-2 last:border-0">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium text-gray-900">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Variable Types</h3>
          <div className="space-y-3">
             {Object.entries(baseReportData.overview.variableTypes).map(([key, val]) => (
              <div key={key} className="flex justify-between border-b border-gray-50 pb-2 last:border-0">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium text-gray-900">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Cleaning & Quality</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(baseReportData.overview.dataCleaning).map(([key, val]) => (
                <div key={key} className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <span className="block text-xs font-bold text-orange-600 uppercase mb-1">{key}</span>
                    <span className="text-lg font-bold text-gray-900">
                        {Array.isArray(val) ? val.join(", ") : val}
                    </span>
                </div>
            ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
           <Info className="inline w-4 h-4 mr-1 relative -top-0.5" />
           The cleaning phase corrected <strong>outliers</strong> in pH and publication year, and identified <strong>55,135 conflicting sequences</strong>.
        </div>
      </div>
    </div>
  );

  const renderVariables = () => (
    <div className="space-y-4">
      {baseReportData.variables.map((variable, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div 
             className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
             onClick={() => setExpandedVar(expandedVar === idx ? null : idx)}
           >
              <div className="flex items-center space-x-4">
                 <span className={`px-2 py-1 rounded text-xs font-semibold ${variable.type === 'Categorical' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {variable.type}
                 </span>
                 <h4 className="text-md font-bold text-gray-900">{variable.name}</h4>
              </div>
              <div className="flex items-center text-gray-500 space-x-4">
                 <span className="text-sm">{variable.distinct} distinct</span>
                 <span className="text-sm">{variable.missing} missing</span>
                 {expandedVar === idx ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
           </div>
           
           {expandedVar === idx && (
             <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div>
                      <h5 className="font-semibold text-gray-700 mb-3">Statistics</h5>
                      <div className="bg-white rounded p-4 border border-gray-200">
                         {variable.counts ? (
                           <ul className="space-y-2 text-sm">
                             {Object.entries(variable.counts).slice(0, 5).map(([k, v]) => (
                               <li key={k} className="flex justify-between">
                                 <span className="text-gray-600 truncate max-w-[200px]" title={k}>{k}</span>
                                 <span className="font-medium">{v}</span>
                               </li>
                             ))}
                           </ul>
                         ) : (
                           <ul className="space-y-2 text-sm">
                              {Object.entries(variable.stats).map(([k, v]) => (
                                 <li key={k} className="flex justify-between">
                                    <span className="text-gray-600">{k}</span>
                                    <span className="font-medium">{v}</span>
                                 </li>
                              ))}
                           </ul>
                         )}
                      </div>
                   </div>
                   <div>
                      <h5 className="font-semibold text-gray-700 mb-3">visualization</h5>
                      <div className="bg-white rounded border border-gray-200 p-2">
                        {variable.chartType === 'bar' && variable.counts && (
                           <PlotContainer 
                             data={[{
                               x: Object.values(variable.counts),
                               y: Object.keys(variable.counts),
                               type: 'bar',
                               orientation: 'h',
                               marker: { color: '#8b5cf6' }
                             }]}
                             layout={{ height: 250, margin: { l: 120, r: 20, t: 20, b: 30 } }}
                             hideControls
                           />
                        )}
                        {variable.chartType === 'histogram' && variable.histogram && (
                           <PlotContainer 
                             data={[{
                               x: variable.histogram.x,
                               y: variable.histogram.y,
                               type: 'bar', 
                               marker: { color: '#3b82f6' }
                             }]}
                             layout={{ height: 250, margin: { l: 40, r: 20, t: 20, b: 30 } }}
                             hideControls
                           />
                        )}
                        {variable.chartType === 'histogram' && !variable.histogram && (
                             <div className="h-[250px] flex items-center justify-center text-gray-400">
                                Histogram unavailable for this mock
                             </div>
                        )}
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      ))}
    </div>
  );

  const renderInteractions = () => (
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pairwise Interactions</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium italic">Visualization of specific relations identified in the PDF analysis.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {baseReportData.interactions.map((interaction, idx) => (
              <div key={idx}>
                 <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide border-l-4 border-blue-500 pl-2">
                    {interaction.xVar} vs {interaction.yVar}
                 </h4>
                 <PlotContainer 
                    data={[{
                       x: interaction.data.x,
                       y: interaction.data.y,
                       mode: interaction.mode,
                       type: interaction.type,
                       marker: { color: idx === 0 ? '#3b82f6' : '#ef4444', size: 6, opacity: 0.5 }
                    }]}
                    layout={{ 
                        height: 350, 
                        margin: { l: 40, r: 20, t: 20, b: 40 },
                        xaxis: { title: interaction.xVar },
                        yaxis: { title: interaction.yVar }
                    }}
                 />
              </div>
           ))}
        </div>
     </div>
  );

  const renderCorrelations = () => (
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             <h3 className="text-lg font-semibold text-gray-800 mb-4">Correlation Matrix</h3>
             <div className="flex justify-center">
                <PlotContainer 
                   data={[{
                      z: baseReportData.correlations.z,
                      x: baseReportData.correlations.cols,
                      y: baseReportData.correlations.cols,
                      type: 'heatmap',
                      colorscale: 'RdBu',
                      zmin: -1, zmax: 1
                   }]}
                   layout={{ height: 500, width: 600 }}
                />
             </div>
          </div>
          <div className="space-y-6">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Grid className="w-5 h-5 mr-2 text-blue-500" />
                Correlation Theory
             </h3>
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-bold text-blue-800 mb-2">Pearson Correlation ($r$)</h4>
                <p className="text-xs text-blue-700 leading-relaxed mb-3">
                   Measures <strong>linear</strong> relationships between continuous variables (e.g., Resolution vs Weight).
                </p>
                <MathFormula 
                   formula="r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}"
                   className="bg-white border-blue-200"
                />
             </div>
             <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Spearman Rank ($\rho$)</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                   Measures <strong>monotonic</strong> relationships (non-linear). More robust to outliers like our pH values.
                </p>
                <MathFormula 
                   formula="\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}"
                   className="bg-white border-gray-200"
                />
             </div>
          </div>
       </div>
     </div>
  );

  const renderMissing = () => (
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
       <h3 className="text-lg font-semibold text-gray-800 mb-4">Missing Values Analysis</h3>
       <PlotContainer 
          data={[{
             x: baseReportData.missingValues.labels,
             y: baseReportData.missingValues.values,
             type: 'bar',
             marker: { color: '#f59e0b' }
          }]}
          layout={{ 
             title: 'Count of Missing Values per Variable', 
             height: 400,
             margin: { b: 100 }
          }}
       />
     </div>
  );

  const renderSample = () => (
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">First & Last Rows</h3>
        <div className="overflow-x-auto">
           <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                 <tr>
                    <th className="px-6 py-3 font-medium text-gray-500">ID</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Technique</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Macromolecule</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Resolution</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {baseReportData.sample.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                       <td className="px-6 py-3 text-gray-900">{row.id}</td>
                       <td className="px-6 py-3 text-gray-600">{row.technique}</td>
                       <td className="px-6 py-3 text-gray-600">{row.type}</td>
                       <td className="px-6 py-3 text-gray-600">{row.res ?? 'NULL'}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
         <h1 className="text-2xl font-bold text-gray-900">Base Report</h1>
         <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex space-x-1 mt-4 md:mt-0 overflow-x-auto max-w-full">
            {tabs.map(tab => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                     activeTab === tab.id 
                     ? 'bg-blue-50 text-blue-700 shadow-sm' 
                     : 'text-gray-600 hover:bg-gray-50'
                  }`}
               >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      <div className="min-h-[500px]">
         {activeTab === 'overview' && renderOverview()}
         {activeTab === 'variables' && renderVariables()}
         {activeTab === 'interactions' && renderInteractions()}
         {activeTab === 'correlations' && renderCorrelations()}
         {activeTab === 'missing' && renderMissing()}
         {activeTab === 'sample' && renderSample()}
      </div>
      {/* Quick Insight */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mt-6">
         <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Executive Insight: Data Integrity
         </h3>
         <p className="text-sm text-orange-800 leading-relaxed">
            The identification of <strong>55,135 conflicting sequences</strong> serves as a critical "noise floor" for any predictive model. This discovery highlights the inherent challenge in biological datasets where the same sequence can adopt multiple conformations. Cleaning outliers like the <strong>pH 724</strong> entry was essential to avoid skewing thermodynamic stability estimates.
         </p>
      </div>
    </div>
  );
};

export default BaseReport;
