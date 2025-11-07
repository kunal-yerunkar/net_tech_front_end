
import React, { useState } from 'react';
// import { ExamLink } from '../types';
import { ClipboardIcon, CheckIcon, ExternalLinkIcon } from './icons';


const ExamCard = ({ exam }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(exam.examUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const handleOpen = () => {
    window.open(exam.examUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 flex flex-col justify-between transition-transform transform hover:scale-105 duration-300">
      <h3 className="text-lg font-semibold text-sky-400 mb-4 h-16">{exam.examName}</h3>
      <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={handleOpen}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
        >
          <ExternalLinkIcon />
          <span className="ml-2">Open Exam</span>
        </button>
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors ${
            isCopied 
              ? 'bg-green-600 border-green-500 text-white focus:ring-green-500' 
              : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 focus:ring-sky-500'
          }`}
        >
          {isCopied ? <CheckIcon /> : <ClipboardIcon />}
          <span className="ml-2">{isCopied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};

export default ExamCard;
