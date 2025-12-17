import React from 'react';
import Plot from 'react-plotly.js';

const PlotContainer = ({ data, layout, title, description, className }) => {
  const defaultLayout = {
    autosize: true,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    showlegend: true,
    font: { family: 'Inter, sans-serif' },
    ...layout,
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      <div className="w-full h-[400px]">
        <Plot
          data={data}
          layout={defaultLayout}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default PlotContainer;
