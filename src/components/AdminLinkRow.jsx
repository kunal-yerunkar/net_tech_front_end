import React, { useState } from 'react';
// import { ExamLink } from '../types';
import { TrashIcon, EditIcon, CheckIcon, XIcon } from './icons';


const AdminLinkRow = ({ exam, removeExamLink, updateExamLink, centerCategory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(exam?.examName);
  const [editedUrl, setEditedUrl] = useState( exam?.examUrl);
  const [editedCenter, setEditedCenter] = useState(exam?.examCenter);

  const handleSave = () => {
    if (editedName.trim() && editedUrl.trim()) {
      updateExamLink( exam?._id, { name: editedName, url: editedUrl, center: editedCenter });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName( exam?.examName);
    setEditedUrl( exam?.examUrl);
    setEditedCenter( exam?.examCenter);
    setIsEditing(false);
  };
  
  const baseButtonClass = "flex-shrink-0 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors";

  if (isEditing) {
    return (
      <div className="bg-slate-700 p-3 rounded-md flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="block w-full bg-slate-600 border border-slate-500 rounded-md shadow-sm py-1 px-2 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-sm"
            aria-label="Edit Exam Name"
          />
          <input
            type="url"
            value={editedUrl}
            onChange={(e) => setEditedUrl(e.target.value)}
            className="block w-full bg-slate-600 border border-slate-500 rounded-md shadow-sm py-1 px-2 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-sm"
            aria-label="Edit Exam URL"
          />
        </div>
        <div className="flex-[0.5]">
          <select
            value={editedCenter}
            onChange={(e) => setEditedCenter(e.target.value)}
            className="block w-full bg-slate-600 border border-slate-500 rounded-md shadow-sm py-1 px-2 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-sm"
          >
            <option value={centerCategory[0]}>Job Fair</option>
            <option value={centerCategory[1]}>Technical</option>
          </select>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={handleSave} className={`${baseButtonClass} text-green-400 hover:bg-green-500/20 focus:ring-green-500`} aria-label="Save changes">
            <CheckIcon />
          </button>
          <button onClick={handleCancel} className={`${baseButtonClass} text-slate-400 hover:bg-slate-500/20 focus:ring-slate-500`} aria-label="Cancel editing">
            <XIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    

    <div className="bg-slate-700/50 p-3 rounded-md flex items-center justify-between hover:bg-slate-700 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-md font-semibold text-sky-400 truncate">{ exam?.examName}</p>
        <p className="text-xs text-slate-400 truncate">{ exam?.examUrl}</p>
      </div>
      <div className="flex-[0.5] text-center">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${ exam?.examCenter._id === centerCategory[0] ? 'bg-blue-900 text-blue-300' : exam?.examCenter._id === centerCategory[1] ?  'bg-purple-900 text-purple-300' : "bg-gray-500 bg-gray-100" }`}>
          { exam?.examCenter._id === centerCategory[0] ? 'Job Fair' : exam?.examCenter._id == centerCategory[1] ? "Technical": "N/A"}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <button onClick={() => setIsEditing(true)} className={`${baseButtonClass} text-slate-400 hover:bg-sky-500/20 hover:text-sky-400 focus:ring-sky-500`} aria-label="Edit link">
            <EditIcon />
        </button>
        <button onClick={() => removeExamLink( exam?.id)} className={`${baseButtonClass} text-slate-400 hover:bg-red-500/20 hover:text-red-400 focus:ring-red-500`} aria-label="Remove link">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default AdminLinkRow;