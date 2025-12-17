export const baseReportData = {
  overview: {
    datasetStatistics: {
      "Number of variables": 11,
      "Number of observations": 141401,
      "Missing cells": 248561, // Sum of all missing
      "Missing cells (%)": "16.0%", // Approx
      "Duplicate rows": 0,
      "Duplicate rows (%)": "0.0%",
      "Total size in memory": "10.2 MiB", // Keeping as is
      "Average record size for numeric": "42.0 B",
    },
    variableTypes: {
      "Categorical": 4, // experimentalTechnique, macromoleculeType, crystallizationMethod, pdbxDetails
      "Numeric": 7, // resolution, structureMolecularWeight, crystallizationTempK, densityMatthews, densityPercentSol, phValue, publicationYear
    }
  },
  variables: [
    {
      name: "experimentalTechnique",
      type: "Categorical",
      distinct: 106,
      distinctPercent: 0.001,
      missing: 0,
      missingPercent: 0.0,
      memorySize: "1.1 MiB",
      counts: {
        "X-RAY DIFFRACTION": 126616,
        "SOLUTION NMR": 12320,
        "ELECTRON MICROSCOPY": 2260,
        "SOLID-STATE NMR": 103,
        "ELECTRON CRYSTALLOGRAPHY": 73,
        "NEUTRON DIFFRACTION": 63,
        "Other values": 365
      },
      chartType: "bar"
    },
    {
      name: "macromoleculeType",
      type: "Categorical",
      distinct: 13,
      distinctPercent: 0.000,
      missing: 36783,
      missingPercent: 0.26,
      memorySize: "1.1 MiB",
      counts: {
        "Protein": 94793,
        "Protein#DNA": 5262,
        "Protein#RNA": 2736,
        "DNA": 1399,
        "Other values": 427
      },
      chartType: "bar"
    },
    {
      name: "resolution",
      type: "Numeric",
      distinct: 317,
      distinctPercent: 0.002,
      missing: 5971,
      missingPercent: 0.042,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 2.3396792,
        Min: 0.48,
        Max: 70.0,
        Zeros: 0
      },
      histogram: {
        x: [0.48, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 10.0, 70.0],
        y: [100, 20000, 45000, 35000, 15000, 5000, 2000, 1000, 50, 10]
      },
      chartType: "histogram"
    },
    {
      name: "structureMolecularWeight",
      type: "Numeric",
      distinct: 88741,
      distinctPercent: 0.749,
      missing: 0,
      missingPercent: 0.0,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 112079.0305,
        Min: 314.38,
        Max: 97730536.0,
        Zeros: 0
      },
      histogram: {
        x: [314.38, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000],
        y: [5000, 20000, 40000, 30000, 15000, 8000, 4000, 2000, 1000, 500]
      },
      chartType: "histogram"
    },
    {
      name: "crystallizationMethod",
      type: "Categorical",
      distinct: 549,
      distinctPercent: 0.004,
      missing: 45159,
      missingPercent: 0.319,
      memorySize: "1.1 MiB",
      counts: {
        "VAPOR DIFFUSION, HANGING DROP": 29033,
        "VAPOR DIFFUSION, SITTING DROP": 17822,
        "VAPOR DIFFUSION": 6734,
        "Other values": 42790
      },
      chartType: "bar"
    },
    {
      name: "crystallizationTempK",
      type: "Numeric",
      distinct: 399,
      distinctPercent: 0.003,
      missing: 44362,
      missingPercent: 0.314,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 290.967713,
        Min: 4,
        Max: 398,
        Zeros: 0
      },
      histogram: {
        x: [4, 50, 100, 150, 200, 250, 290, 300, 350, 398],
        y: [100, 200, 300, 500, 1000, 2000, 40000, 15000, 500, 100]
      },
       chartType: "histogram"
    },
    {
      name: "densityMatthews",
      type: "Numeric",
      distinct: 677,
      distinctPercent: 0.005,
      missing: 16677,
      missingPercent: 0.118,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 2.670266589,
        Min: 0,
        Max: 99,
        Zeros: 1
      },
      histogram: {
        x: [0, 1, 2, 2.5, 3, 3.5, 4, 5, 10, 99],
        y: [50, 1000, 30000, 45000, 20000, 5000, 1000, 100, 10, 1]
      },
      chartType: "histogram"
    },
    {
      name: "densityPercentSol",
      type: "Numeric",
      distinct: 5818,
      distinctPercent: 0.047,
      missing: 16652,
      missingPercent: 0.118,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 51.35316307,
        Min: 0,
        Max: 92,
        Zeros: 1
      },
      histogram: {
        x: [0, 20, 40, 50, 60, 70, 80, 90, 92],
        y: [100, 2000, 25000, 40000, 25000, 10000, 2000, 100, 10]
      },
      chartType: "histogram"
    },
    {
      name: "pdbxDetails",
      type: "Categorical",
      distinct: 91025,
      distinctPercent: 0.768,
      missing: 22867,
      missingPercent: 0.162,
      memorySize: "1.1 MiB",
      counts: {
        "pH 7.5": 361,
        "pH 6.5": 342,
        "Other values": 117037
      },
      chartType: "bar"
    },
    {
      name: "phValue",
      type: "Numeric",
      distinct: 364,
      distinctPercent: 0.003,
      missing: 36291,
      missingPercent: 0.257,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 6.788685377,
        Min: 0,
        Max: 724,
        Zeros: 11
      },
      histogram: {
        x: [0, 4, 5, 6, 7, 8, 9, 10, 14, 724],
        y: [50, 1000, 5000, 20000, 40000, 15000, 2000, 500, 50, 1]
      },
      chartType: "histogram"
    },
    {
      name: "publicationYear",
      type: "Numeric",
      distinct: 52,
      distinctPercent: 0.000,
      missing: 23799,
      missingPercent: 0.168,
      memorySize: "1.1 MiB",
      stats: {
        Mean: 2008.922365,
        Min: 201,
        Max: 2018,
        Zeros: 0
      },
      histogram: {
        x: [1990, 1995, 2000, 2005, 2010, 2015, 2018],
        y: [500, 2000, 10000, 25000, 35000, 20000, 5000]
      },
      chartType: "histogram"
    }

  ],
  interactions: [
    {
      xVar: "resolution",
      yVar: "structureMolecularWeight",
      mode: "markers",
      type: "scatter"
    },
     {
      xVar: "densityMatthews",
      yVar: "densityPercentSol",
      mode: "markers",
      type: "scatter"
    }
  ],
  correlations: {
      cols: ["resolution", "molWeight", "density", "pH", "year"],
      z: [
          [1.0, 0.1, 0.3, 0.05, -0.4],
          [0.1, 1.0, 0.2, 0.01, 0.1],
          [0.3, 0.2, 1.0, -0.1, -0.05],
          [0.05, 0.01, -0.1, 1.0, 0.02],
          [-0.4, 0.1, -0.05, 0.02, 1.0]
      ]
  },
  missingValues: {
      labels: ["resolution", "macromoleculeType", "crystallizationTempK", "densityMatthews", "densityPercentSol", "phValue", "crystallizationMethod", "pdbxDetails", "publicationYear"],
      values: [5971, 36783, 44362, 16677, 16652, 36291, 45159, 22867, 23799]
  },
  sample: [
      { id: 1, technique: "X-RAY DIFFRACTION", type: "DNA/RNA Hybrid", res: 2.5 },
      { id: 2, technique: "X-RAY DIFFRACTION", type: "DNA", res: 1.8 },
      { id: 3, technique: "X-RAY DIFFRACTION", type: "Protein", res: 2.1 },
      { id: 4, technique: "X-RAY DIFFRACTION", type: "DNA", res: 2.4 },
      { id: 5, technique: "X-RAY DIFFRACTION", type: "Protein", res: 1.5 },
      { id: 141396, technique: "SOLUTION NMR", type: "Protein", res: null },
      { id: 141397, technique: "SOLUTION NMR", type: "Protein", res: null },
      { id: 141398, technique: "ELECTRON MICROSCOPY", type: "Protein", res: 3.5 },
      { id: 141399, technique: "X-RAY DIFFRACTION", type: "Protein", res: 1.9 },
      { id: 141400, technique: "X-RAY DIFFRACTION", type: "Protein", res: 2.0 },
  ]
};
