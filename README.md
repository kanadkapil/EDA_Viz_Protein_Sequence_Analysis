# Protein Sequence Analysis EDA Dashboard 🧬

A modern, high-fidelity Exploratory Data Analysis (EDA) dashboard built with **React 19**, **Vite**, and **Tailwind CSS v4**. This application is specifically tailored for protein structural bioinformatics, providing interactive visualizations of sequence data, structural properties, and deep learning model performances.

## 🚀 Project Overview

**Computational Prediction of Protein Functional Classes and Secondary Structures Using Deep Learning**

This project bridges the "sequence-structure gap" by automating the analysis of protein data. It leverages **Multinomial Naive Bayes (MNB)** for functional classification and **Bidirectional LSTM (BiLSTM)** networks for residue-wise secondary structure prediction.

### Key Results

| Task                    | Model  | Metric                     | Value      |
| :---------------------- | :----- | :------------------------- | :--------- |
| **Secondary Structure** | BiLSTM | **Validation Q3 Accuracy** | **81.53%** |
| **Functional Class**    | MNB    | **Overall Accuracy**       | **77.00%** |

---

## ✨ Enhanced Features

- **Executive Insights**: Dedicated business-level summaries for **Drug Discovery** and **Enzyme Engineering** applications.
- **Structural Ambiguity Analysis**: Visualized discovery of **55,135 conflicting sequences** (~39% of unique data), establishing a critical "noise floor" for prediction metrics.
- **Technical Implementation**: Live code snippets for model architectures (Keras) and preprocessing logic (N-grams).
- **Theoretical Background**:
  - **Sequence Analysis**: Shannon Entropy ($H$) and k-mer theory.
  - **Structure Analysis**: Residue-Residue Contact Map definitions ($8\text{Å}$ threshold) and DSSP 8-to-3 state mapping.
  - **Core Statistics**: Pearson ($r$) and Spearman ($\rho$) correlation mathematical definitions.
- **Realistic Data Relations**: Interactive scatter plots showing the improvement of **Resolution over Publication Year** and **pH vs. Resolution** trends.
- **Quick Insights**: Color-coded executive notes on every report page providing immediate technical context.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Visualization**: [Plotly.js](https://plotly.com/javascript/)
- **Math Rendering**: [MathJax](https://www.mathjax.org/) (via `better-react-mathjax`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation & Run

1. **Clone & Install**

   ```bash
   git clone https://github.com/kanadkapil/eda-protein-analysis.git
   cd eda-protein-analysis
   npm install
   ```

2. **Development Mode**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173`.

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI (PlotContainer, ProjectSummary, MathFormula)
├── data/             # Mock statistics and datasets (mockBaseReportData.js)
├── layouts/          # Responsive layout wrappers
├── pages/            # Feature-specific report pages
│   ├── BaseReport.jsx      # Overview & Data Cleaning
│   ├── IntersectReport.jsx # Secondary structure distributions
│   ├── StructureReport.jsx # Contact Maps & Stability
│   └── SequenceReport.jsx  # AA Composition & Motifs
└── App.jsx           # Main application routing
```

---

## 🤝 Developer

Developed with ❤️ by [Kanad Kapil](https://github.com/kanadkapil).
