import React from 'react';
import { SpinnerIcon } from './icons';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
      <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-4">
        NetTech India Exam Hub
      </h1>
      <SpinnerIcon />
      <p className="text-slate-400 mt-4 text-sm">Loading Application...</p>
    </div>
  );
};

export default Preloader;