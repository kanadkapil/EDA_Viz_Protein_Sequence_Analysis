# Protein Sequence Analysis EDA Dashboard

A modern, interactive Exploratory Data Analysis (EDA) dashboard built with React 19 and Vite. This application visualizes protein sequence data, structural properties, and functional classifications to bridge the specific "sequence-structure gap" in computational biology.

## 🧬 Project Overview

**Computational Prediction of Protein Functional Classes and Secondary Structures Using Deep Learning**

Modern computational biology relies heavily on data-driven approaches. This project implements machine learning (ML) and deep learning (DL) frameworks to automate protein analysis. Specifically, it utilizes **Multinomial Naive Bayes (MNB)** for functional classification and **Bidirectional LSTM (BiLSTM)** networks for secondary structure prediction, achieving a validation Q3 accuracy of **81.53%**.

### Key Results

| Task                    | Model  | Metric                     | Value      |
| :---------------------- | :----- | :------------------------- | :--------- |
| **Secondary Structure** | BiLSTM | **Validation Q3 Accuracy** | **81.53%** |
| **Functional Class**    | MNB    | **Overall Accuracy**       | **77.00%** |

## ✨ Features

- **Interactive Dashboard**: Central hub with navigation to all analysis reports and a comprehensive project summary.
- **Intersection Analysis**:
  - Dynamically parses Pandas Profiling HTML reports.
  - Visualizes "Secondary Structure (sst8)" distributions using interactive charts.
  - Displays detailed breakdown tables with percentages.
  - Includes a "Raw Sample Data" viewer.
- **Categorical & Numerical Reports**: Dedicated views for Base Analysis, Secondary Structure, and Sequence Analysis (amenable for future expansion).
- **Responsive Design**: Built with Tailwind CSS v4 for a seamless experience across devices.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Visualization**: [Plotly.js](https://plotly.com/javascript/) (via `react-plotly.js`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/eda-protein-analysis.git
    cd eda-protein-analysis
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173` to view the dashboard.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (PlotContainer, ProjectSummary)
├── layouts/          # Layout wrappers (MainLayout)
├── pages/            # Individual Report Pages
│   ├── BaseReport.jsx
│   ├── IntersectReport.jsx  <-- Key analysis page
│   ├── StructureReport.jsx
│   ├── SequenceReport.jsx
│   └── ...
├── utils/            # Helper scripts (intersectReportParser.js)
└── App.jsx           # Main application routing
public/
└── intersectr.html   # Source data file (Pandas Profiling Report)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
