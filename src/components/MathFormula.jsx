import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const MathFormula = ({ formula, className }) => {
  return (
    <div className={`p-4 bg-gray-50 rounded-lg border border-gray-100 overflow-x-auto ${className}`}>
      <MathJaxContext>
        <MathJax>{`\\(${formula}\\)`}</MathJax>
      </MathJaxContext>
    </div>
  );
};

export default MathFormula;
