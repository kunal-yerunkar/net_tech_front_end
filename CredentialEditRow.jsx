import React, { useState } from 'react';
// import { Credentials } from '../types';
import { EditIcon, CheckIcon, XIcon } from './icons';


const CredentialEditRow = ({ credential, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(credential.username);
  const [editedPassword, setEditedPassword] = useState('');

  const handleSave = () => {
    if (editedUsername.trim()) {
      const updatedData = {
        username: editedUsername,
        password: editedPassword.trim() ? editedPassword.trim() : credential.password,
      };
      console.log("changes made on manage cred handle save ", updatedData); 

      // onUpdate(credential.username, updatedData);

      onUpdate({userId : credential?._id, userName : editedUsername, password : editedPassword.trim() ? editedPassword.trim() : null})
      setIsEditing(false);
      setEditedPassword('');
    }
  };

  const handleCancel = () => {
    setEditedUsername(credential.username);
    setEditedPassword('');
    setIsEditing(false);
  };
  
  const baseButtonClass = "flex-shrink-0 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors";

  if (isEditing) {
    return (
      <div className="bg-slate-700 p-3 rounded-md flex items-center justify-between">
        <div className="flex-1 min-w-0 space-y-2">
          <input
            type="text"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            className="block w-full bg-slate-600 border border-slate-500 rounded-md shadow-sm py-1 px-2 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-sm disabled:opacity-50"
            aria-label="Edit Username"
            disabled={credential.username === 'admin'}
          />
          <input
            type="password"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
            className="block w-full bg-slate-600 border border-slate-500 rounded-md shadow-sm py-1 px-2 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-sm"
            placeholder="Enter new password to change"
            aria-label="Edit Password"
          />
        </div>
        <div className="ml-4 flex items-center space-x-1">
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
        <p className="text-md font-semibold text-slate-100 truncate">{credential.username}</p>
        <p className="text-xs text-slate-500 uppercase">{credential.role}</p>
      </div>
      <div className="ml-4 flex items-center space-x-1">
        <button 
          onClick={() => setIsEditing(true)} 
          className={`${baseButtonClass} text-slate-400 hover:bg-sky-500/20 hover:text-sky-400 focus:ring-sky-500`} 
          aria-label={`Edit ${credential.username} credentials`}
        >
            <EditIcon />
        </button>
      </div>
    </div>
  );
};

export default CredentialEditRow;
