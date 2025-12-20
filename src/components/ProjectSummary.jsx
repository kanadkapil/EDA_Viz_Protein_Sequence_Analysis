import React from 'react';

const ProjectSummary = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center my-10">Computational Prediction of Protein Functional Classes and Secondary Structures Using Deep Learning</h1>
      {/* Abstract */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">1. Abstract</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Modern computational biology relies heavily on data-driven approaches to bridge the "sequence-structure gap." 
          As experimental determination of protein structures via X-ray crystallography remains costly and time-intensive, 
          this project implements machine learning (ML) and deep learning (DL) frameworks to automate protein analysis.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Specifically, we utilize <strong>Multinomial Naive Bayes (MNB)</strong> for functional classification and 
          <strong> Bidirectional Long Short-Term Memory (BiLSTM)</strong> networks for 3-state secondary structure prediction. 
          The study incorporates rigorous Exploratory Data Analysis (EDA), feature engineering via <em>n</em>-grams, 
          and addresses data ambiguity, achieving a peak validation Q3 accuracy of <strong>81.53%</strong>.
        </p>

        <div className="mt-6 pt-4 border-t border-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
                {['Structural Bioinformatics', 'BiLSTM', 'Sequence Mining', 'Q3 Accuracy', 'Protein Classification', 'TensorFlow', 'KNN Imputation', 'Label Ambiguity'].map(kw => (
                    <span key={kw} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                        {kw}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* Project Video */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">2. Project Walkthrough</h2>
        <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <iframe 
                src="https://drive.google.com/file/d/12bnaV6HgCUVmPDS-LXcb5NdQX-lmzxjO/preview" 
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay"
                title="Project Walkthrough Video"
            ></iframe>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">3. Introduction</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Background</h3>
                <p className="text-gray-600 leading-relaxed">
                    Proteins are fundamental biomolecules whose functions are dictated by their hierarchical organization. 
                    The linear primary sequence folds into local secondary structures (helices, strands, coils), 
                    which eventually form the 3D tertiary structure. While genomics has generated millions of known sequences, 
                    structural databases (PDB) house only approximately 200,000 experimentally determined structures.
                </p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Problem Statement</h3>
                <p className="text-gray-600 leading-relaxed">
                    Experimental structure determination is a bottleneck. Predicting secondary structure from primary sequences 
                    is an essential intermediate problem that provides insights into protein engineering and drug discovery. 
                    The core challenge lies in modeling long-range dependencies and handling label ambiguity in biological datasets.
                </p>
            </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">4. Methodology</h2>
        
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">4.1 Technical Environment</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-xs font-bold text-gray-500 uppercase">Language</span>
                        <span className="font-medium text-gray-900">Python</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-xs font-bold text-gray-500 uppercase">Frameworks</span>
                        <span className="font-medium text-gray-900">TensorFlow 2.3, Keras</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-xs font-bold text-gray-500 uppercase">Hardware</span>
                        <span className="font-medium text-gray-900">Nvidia GTX 1650ti GPU</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-xs font-bold text-gray-500 uppercase">Libraries</span>
                        <span className="font-medium text-gray-900 text-sm">Scikit-learn, NumPy, Pandas, Dask, Seaborn</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Data Preprocessing & EDA</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Cleaning:</strong> Corrected erroneous entries in <code>phValue</code> and <code>publicationYear</code>.</li>
                        <li><strong>Missing Data:</strong> Implemented <strong>KNN Imputation</strong> (k=5) using Label Encoding.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-orange-700 mb-2">4.3 The "Ambiguity" Discovery</h3>
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-3">
                            A critical finding during EDA revealed a significant "noise floor" for prediction accuracy:
                        </p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-orange-800 uppercase">Conflicting Sequences</span>
                            <span className="text-xl font-bold text-orange-900">55,135</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '39%' }}></div>
                        </div>
                        <p className="text-[10px] text-gray-500 italic">
                            ~39% of unique sequences in the dataset are associated with multiple, conflicting secondary structure assignments in the PDB.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Model Architectures */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">5. Model Architectures</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-xl font-bold text-purple-700 mb-2">5.1 Multinomial Naive Bayes</h3>
                <p className="text-gray-700 mb-4">Used for protein family classification based on sequence motifs. Selected for efficiency with high-dimensional sparse count data.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-700 mb-2">5.2 Bidirectional LSTM</h3>
                <p className="text-gray-700 mb-2">Designed for residue-by-residue Q3 prediction:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li><strong>Layers:</strong> Two BiLSTM layers (128 & 64 units)</li>
                    <li><strong>Context:</strong> <code>return_sequences=True</code> for N-term & C-term context</li>
                    <li><strong>Dropout:</strong> 0.3 rate to prevent overfitting</li>
                    <li><strong>Output:</strong> Time-Distributed Dense with Softmax</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">6. Results and Analysis</h2>
        
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">6.1 Performance Summary</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-700">Task</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Model</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Metric</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="px-6 py-4 font-medium">Secondary Structure</td>
                                <td className="px-6 py-4">BiLSTM</td>
                                <td className="px-6 py-4">Validation Q3 Accuracy</td>
                                <td className="px-6 py-4 font-bold text-green-600">81.53%</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium">Functional Class</td>
                                <td className="px-6 py-4">MNB</td>
                                <td className="px-6 py-4">Overall Accuracy</td>
                                <td className="px-6 py-4 font-bold text-blue-600">77.00%</td>
                            </tr>
                            <tr className="bg-gray-50/50 text-gray-500">
                                <td className="px-6 py-4">Baseline</td>
                                <td className="px-6 py-4">AdaBoost</td>
                                <td className="px-6 py-4">Overall Accuracy</td>
                                <td className="px-6 py-4">19.00%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">6.2 Top Functional Class Results (MNB)</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-700">Protein Class</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Precision</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Recall</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">F1-Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { class: 'LYASE', p: 0.90, r: 0.79, f1: 0.84 },
                                { class: 'VIRUS', p: 0.87, r: 0.97, f1: 0.92 },
                                { class: 'METAL BINDING', p: 0.94, r: 0.79, f1: 0.86 },
                                { class: 'STRUCTURAL GENOMICS', p: 0.95, r: 0.88, f1: 0.91 },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{row.class}</td>
                                    <td className="px-6 py-4">{row.p}</td>
                                    <td className="px-6 py-4">{row.r}</td>
                                    <td className="px-6 py-4 font-bold text-indigo-600">{row.f1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </section>

      {/* Discussion & Conclusion */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Discussion & Conclusion</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
            The project demonstrates that <strong>sequence-only prediction</strong> using BiLSTMs can reach ~82% accuracy without relying on expensive evolutionary profiles. 
            The gap between BiLSTM and the AdaBoost baseline (19%) confirms the necessity of preserving temporal dependencies in protein data.
        </p>
        <p className="text-gray-700 leading-relaxed">
            Despite label ambiguity in &gt;55k instances, the pipeline is reliable and scalable. Future work will investigate <strong>Transformer models</strong> (e.g., ProtTrans) to further enhance accuracy.
        </p>
      </section>

    </div>
  );
};

export default ProjectSummary;
