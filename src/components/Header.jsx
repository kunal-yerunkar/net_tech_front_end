import React from 'react';
// import { View, Credentials } from '../types';
import { RobotIcon } from './icons';

const Header = ({ currentView, setView, onLogout, loggedInUser, onToggleAIAssistant }) => {
  const baseButtonClass = "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  const activeClass = "bg-sky-600 text-white focus:ring-sky-500";
  const inactiveClass = "bg-slate-700 text-slate-300 hover:bg-slate-600 focus:ring-sky-500";
  const logoutButtonClass = "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
  const aiButtonClass = "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 flex items-center space-x-2";

  return (
    <header className="bg-slate-800 shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-sky-400">
          NetTech India Exam Hub
        </h1>
        <div className="flex items-center space-x-2">
          <nav className="flex space-x-2">
            {loggedInUser?.role === 'admin' && (
              <>
                <button 
                  onClick={() => setView('user')} 
                  className={`${baseButtonClass} ${currentView === 'user' ? activeClass : inactiveClass}`}
                  aria-current={currentView === 'user' ? 'page' : undefined}
                >
                  Exams
                </button>
                <button 
                  onClick={() => setView('admin')} 
                  className={`${baseButtonClass} ${currentView === 'admin' ? activeClass : inactiveClass}`}
                  aria-current={currentView === 'admin' ? 'page' : undefined}
                >
                  Admin
                </button>
              </>
            )}
          </nav>
          
          {loggedInUser?.role === 'admin' && currentView === 'admin' && (
            <button
                onClick={onToggleAIAssistant}
                className={`${baseButtonClass} ${aiButtonClass}`}
              >
                <RobotIcon />
                <span>AI Assistant</span>
            </button>
          )}

          <div className="border-l border-slate-600 h-6 mx-2"></div>
          <button
            onClick={onLogout}
            className={`${baseButtonClass} ${logoutButtonClass}`}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;