// import React, { useState } from 'react';
// import { GoogleGenAI } from '@google/genai';
// import { SparklesIcon } from './icons';

const ThinkingMode = () => {
  // const [prompt, setPrompt] = useState('');
  // const [response, setResponse] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // const handleSubmit = async () => {
  //   if (!prompt.trim()) return;
  //   setIsLoading(true);
  //   setError('');
  //   setResponse('');
    
  //   try {
  //     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY  });
  //     const result = await ai.models.generateContent({
  //       model: 'gemini-2.5-pro',
  //       contents: prompt,
  //       config: {
  //         thinkingConfig: { thinkingBudget: 32768 }
  //       }
  //     });
  //     setResponse(result.text);
  //   } catch (err) {
  //     console.error('Thinking Mode Error:', err);
  //     setError('An error occurred while processing your request. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // return (
  //   <div className="p-6 space-y-6 h-full flex flex-col">
  //     <div className="text-center">
  //       <h3 className="text-xl font-semibold text-slate-100">Deep Thought Mode</h3>
  //       <p className="text-slate-400 text-sm mt-1">For complex problems requiring advanced reasoning.</p>
  //     </div>
      
  //     <div className="flex-grow flex flex-col">
  //         <label htmlFor="thinking-prompt" className="block text-sm font-medium text-slate-300 mb-2">
  //           Your complex query:
  //         </label>
  //         <textarea
  //           id="thinking-prompt"
  //           value={prompt}
  //           onChange={(e) => setPrompt(e.target.value)}
  //           placeholder="e.g., Explain the theory of relativity as if I were a medieval blacksmith..."
  //           className="flex-grow w-full bg-slate-900 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm resize-none"
  //           rows={8}
  //           disabled={isLoading}
  //         />
  //     </div>

  //     <div className="flex-shrink-0">
  //       <button
  //         onClick={handleSubmit}
  //         className="w-full flex items-center justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 transition-colors"
  //         disabled={isLoading || !prompt.trim()}
  //       >
  //         {isLoading ? (
  //           <span className="animate-pulse">Analyzing...</span>
  //         ) : (
  //           <><SparklesIcon /> <span className="ml-2">Engage Deep Thought</span></>
  //         )}
  //       </button>
  //     </div>

  //     {(isLoading || response || error) && (
  //       <div className="flex-grow bg-slate-900 rounded-lg p-4 mt-4 overflow-y-auto border border-slate-700">
  //           {isLoading && (
  //                <div className="flex flex-col items-center justify-center h-full text-slate-400">
  //                   <SparklesIcon />
  //                   <p className="mt-2 animate-pulse">Engaging deep thought protocols...</p>
  //                </div>
  //           )}
  //           {error && <p className="text-red-400">{error}</p>}
  //           {response && (
  //             <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }}>
  //             </div>
  //           )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default ThinkingMode;
