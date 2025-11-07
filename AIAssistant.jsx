import React, { useState } from 'react';
import { XIcon, SparklesIcon, MicrophoneIcon } from './icons';
import Chatbot from './Chatbot';
import LiveConversation from './LiveConversation';
import ThinkingMode from './ThinkingMode';


// type AITab = 'chat' | 'live' | 'thinking';

const AIAssistant = ({ isOpen, onClose }) => {
  // const [activeTab, setActiveTab] = useState<AITab>('chat');

  // const getTabButtonClass = (tabName) => {
  //   const base = "flex-1 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  //   if (activeTab === tabName) {
  //     return `${base} bg-sky-600 text-white rounded-md`;
  //   }
  //   return `${base} text-slate-300 hover:bg-slate-700 rounded-md`;
  // };

  // if (!isOpen) return null;

  // return (
  //   <div 
  //     className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity"
  //     aria-modal="true"
  //     role="dialog"
  //     onClick={onClose}
  //   >
  //     <div 
  //       className={`fixed top-0 right-0 h-full bg-slate-800 shadow-2xl w-full max-w-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
  //         <h2 className="text-xl font-bold text-sky-400">AI Assistant</h2>
  //         <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500">
  //           <XIcon />
  //           <span className="sr-only">Close AI Assistant</span>
  //         </button>
  //       </header>

  //       <nav className="p-2 border-b border-slate-700 flex-shrink-0">
  //         <div className="flex space-x-2 bg-slate-900 p-1 rounded-lg">
  //           <button className={getTabButtonClass('chat')} onClick={() => setActiveTab('chat')}>Chat</button>
  //           <button className={getTabButtonClass('live')} onClick={() => setActiveTab('live')}>
  //               <span className="flex items-center justify-center"><MicrophoneIcon/> <span className="ml-2">Live Talk</span></span>
  //           </button>
  //           <button className={getTabButtonClass('thinking')} onClick={() => setActiveTab('thinking')}>
  //               <span className="flex items-center justify-center"><SparklesIcon/> <span className="ml-2">Deep Thought</span></span>
  //           </button>
  //         </div>
  //       </nav>

  //       <div className="flex-grow overflow-y-auto">
  //         {activeTab === 'chat' && <Chatbot />}
  //         {activeTab === 'live' && <LiveConversation />}
  //         {activeTab === 'thinking' && <ThinkingMode />}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AIAssistant;
