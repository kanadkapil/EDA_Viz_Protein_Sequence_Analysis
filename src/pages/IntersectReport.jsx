import React, { useEffect, useState } from 'react';
import PlotContainer from '../components/PlotContainer';
import { fetchAndParseReport } from '../utils/intersectReportParser';
import { FileText, BarChart2, Hash, Layers, Share2, Info } from 'lucide-react';

const IntersectReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      console.log("Fetching report...");
      const data = await fetchAndParseReport();
      console.log("Parsed Data:", data);
      if (data) {
        setReportData(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading Report Data...</div>
      </div>
    );
  }

  if (!reportData) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl font-semibold text-red-600">Failed to load report data.</div>
        </div>
    );
  }

  const { overview, variables, sample } = reportData;

  // Prepare data for the Chart and Breakdown Table
  // We use 'sst8' (Secondary Structure) as the proxy for the "Intersection" / "Categorical" view
  let mainLabel = "Secondary Structure (sst8)";
  let chartData = [];
  let tableData = [];
  let totalCount = 0;

  if (variables && variables.sst8 && variables.sst8.frequency) {
      // Parse Plotly-ready data
      const frequencies = variables.sst8.frequency;
      
      // Calculate total for percentages
      totalCount = frequencies.reduce((acc, curr) => {
          const val = parseFloat(curr.value.replace(/[^0-9.]/g, '')) || 0;
          return acc + val;
      }, 0);

      tableData = frequencies.map(f => {
          const val = parseFloat(f.value.replace(/[^0-9.]/g, '')) || 0;
          return {
              label: f.label,
              count: val,
              percentage: totalCount ? ((val / totalCount) * 100).toFixed(1) : 0
          };
      });

      // Top 10 for Chart to avoid overcrowding
      const top10 = tableData.slice(0, 10);

      chartData = [{
          x: top10.map(d => d.label),
          y: top10.map(d => d.count),
          type: 'bar',
          marker: { color: '#3b82f6' } // Blue color from screenshot
      }];
  } else {
      mainLabel = "Variables";
  }

  const totalObservations = overview && overview['Number of observations'] ? overview['Number of observations'] : totalCount;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Share2 className="text-purple-600" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
                Intersection Analysis
            </h1>
            <p className="text-sm text-gray-500">Analysis of overlapping sequences and structure properties</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                <FileText size={18} />
                <span>Export Report</span>
            </button>
        </div>
      </div>

      {/* Top Row: Summary & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Summary Card (Left, ~1/3 width) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <h3 className="text-lg font-semibold text-gray-800 mb-6">Summary</h3>
           
           <div className="p-6 bg-purple-50 rounded-xl mb-6">
             <p className="text-sm text-purple-600 font-medium mb-1">Total Observations</p>
             <p className="text-4xl font-bold text-gray-900">{totalObservations}</p>
           </div>
           
           <div className="text-sm text-gray-500 space-y-2">
               <div className="flex justify-between">
                   <span>Variables:</span>
                   <span className="font-medium text-gray-900">{overview && overview['Number of variables']}</span>
               </div>
               <div className="flex justify-between">
                   <span>Missing Cells:</span>
                   <span className="font-medium text-gray-900">{overview && overview['Missing cells']} ({overview && overview['Missing cells (%)']})</span>
               </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="flex items-start gap-2 italic">
                        <Info size={16} className="mt-1 flex-shrink-0" />
                        <span>This report analyzes the distribution of the <strong>{mainLabel}</strong> variable across the dataset.</span>
                    </p>
                </div>
           </div>
        </div>

        {/* Chart (Right, ~2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
           <PlotContainer 
              title={`${mainLabel} Distribution`}
              description={`Quantity of elements in each ${mainLabel} category.`}
              data={chartData}
              layout={{ 
                 height: 400,
                 margin: { t: 50, r: 20, l: 50, b: 50 },
                 xaxis: { title: 'Category' },
                 yaxis: { title: 'Count' },
                 bargap: 0.3
              }}
           />
        </div>
      </div>

      {/* detailed Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Detailed Breakdown</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Size</th>
                  <th scope="col" className="px-6 py-4">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.slice(0, 10).map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.label}</td>
                    <td className="px-6 py-4 text-gray-600">{item.count}</td>
                    <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="w-12 text-right">{item.percentage}%</span>
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
         <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
            Showing top {tableData.length > 10 ? 10 : tableData.length} categories
         </div>
         <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
            Showing top {tableData.length > 10 ? 10 : tableData.length} categories
         </div>
      </div>

      {/* --- User Requested Intersection Analysis Section (Mock Data for now) --- */}
      <div className="border-t-4 border-dashed border-gray-200 pt-8 mt-12">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Share2 className="mr-3 text-purple-600" />
            Intersection Analysis (Mock Mockup)
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
            <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Total Intersections</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <p className="text-sm text-gray-600">
                    <Info className="inline w-4 h-4 mr-1 relative -top-0.5" />
                    This report analyzes the overlap between different data subsets.
                </p>
            </div>
            </div>

            {/* Main Chart */}
            <div className="lg:col-span-2">
            <PlotContainer 
                title="Intersection Sizes"
                description="Quantity of elements in each intersection group."
                data={[
                    {
                    x: ['A only', 'B only', 'C only', 'A & B', 'A & C', 'B & C', 'All 3'],
                    y: [120, 80, 40, 30, 15, 10, 5],
                    type: 'bar',
                    marker: { color: ['#3b82f6', '#8b5cf6', '#10b981', '#6366f1', '#ec4899', '#f59e0b', '#ef4444'] },
                    }
                ]}
                layout={{ 
                    height: 400,
                    xaxis: { title: 'Intersection Group' },
                    yaxis: { title: 'Count' }
                }}
            />
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Breakdown</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-500">Subset Combination</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-500">Size</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-500">Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                    { sets: ['Set A'], size: 120 },
                    { sets: ['Set B'], size: 80 },
                    { sets: ['Set C'], size: 40 },
                    { sets: ['Set A', 'Set B'], size: 30 },
                    { sets: ['Set A', 'Set C'], size: 15 },
                    { sets: ['Set B', 'Set C'], size: 10 },
                    { sets: ['Set A', 'Set B', 'Set C'], size: 5 },
                    ].map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.sets.join(' + ')}</td>
                        <td className="px-6 py-4 text-gray-600">{item.size}</td>
                        <td className="px-6 py-4 text-gray-600">{((item.size / 300) * 100).toFixed(1)}%</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => {}}>
            <div className="flex items-center gap-2">
                <Hash size={18} className="text-gray-400" />
                <h2 className="text-base font-semibold text-gray-700">Raw Sample Data</h2>
            </div>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                First 10 Rows
            </span>
        </div>
        
        <div className="overflow-x-auto opacity-80 hover:opacity-100 transition-opacity">
            <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        {sample && sample.headers && sample.headers.map((header, idx) => (
                            <th key={idx} className="px-4 py-2 whitespace-nowrap font-medium">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {sample && sample.rows && sample.rows.slice(0, 5).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-gray-50">
                            {sample.headers.map((header, cIdx) => (
                                <td key={cIdx} className="px-4 py-2 whitespace-nowrap text-gray-600">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default IntersectReport;
