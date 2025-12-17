import React from 'react';
import PlotContainer from '../components/PlotContainer';
import { Share2, Info } from 'lucide-react';

const IntersectReport = () => {
  // Mock data for Intersection Analysis
  const intersectionData = {
    sets: ['Set A', 'Set B', 'Set C'],
    overlaps: [
      { sets: ['Set A'], size: 120 },
      { sets: ['Set B'], size: 80 },
      { sets: ['Set C'], size: 40 },
      { sets: ['Set A', 'Set B'], size: 30 },
      { sets: ['Set A', 'Set C'], size: 15 },
      { sets: ['Set B', 'Set C'], size: 10 },
      { sets: ['Set A', 'Set B', 'Set C'], size: 5 },
    ]
  };

  const chartData = [
    {
      x: ['A only', 'B only', 'C only', 'A & B', 'A & C', 'B & C', 'All 3'],
      y: [120, 80, 40, 30, 15, 10, 5],
      type: 'bar',
      marker: { color: ['#3b82f6', '#8b5cf6', '#10b981', '#6366f1', '#ec4899', '#f59e0b', '#ef4444'] },
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Share2 className="mr-3 text-purple-600" />
          Intersection Analysis
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
              data={chartData}
              layout={{ 
                 height: 400,
                 xaxis: { title: 'Intersection Group' },
                 yaxis: { title: 'Count' }
              }}
           />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                {intersectionData.overlaps.map((item, idx) => (
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
  );
};

export default IntersectReport;
