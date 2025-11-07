import React from 'react';
// import { ExamLink, Credentials } from '../types';
import AddLinkForm from './AddLinkForm';
import AdminLinkRow from './AdminLinkRow';
import CredentialsManager from './CredentialsManager';

const AdminView= ({ 
  examLinks, 
  addExamLink, 
  removeExamLink, 
  updateExamLink,
  loggedInUser,
  allCredentials,
  updateCredentials, 
  
}) => {

  console.log("loggedInUser in adminview ", loggedInUser);
  let centerCategory = [];  
  allCredentials.map((e) => {
    if(e.role !== "admin"){
      centerCategory.push(e._id); 
    } 
  } 
  ); 
  console.log("getting centers in admin view", centerCategory); 
  return (
    <div className="space-y-10">
      <AddLinkForm addExamLink={addExamLink} centerCategory={centerCategory} />
      
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-slate-700 pb-2">Manage Links</h2>
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="space-y-2 p-2">
            {examLinks.length > 0 ? (
              examLinks.map(exam => (
                
                <AdminLinkRow 
                  key={exam.id} 
                  exam={exam} 
                  removeExamLink={removeExamLink} 
                  updateExamLink={updateExamLink}
                  centerCategory={centerCategory}
                />
              ))
            ) : (
              <p className="text-slate-400 p-6 text-center">No links to manage.</p>
            )}
          </div>
        </div>
      </div>
      {/* {loggedInUser?.username === 'admin' && (

          <CredentialsManager 
          allCredentials={allCredentials}
          updateCredentials={updateCredentials}
        />
      )} */}
      {loggedInUser?.role === 'admin' && (

          <CredentialsManager 
          allCredentials={allCredentials}
          updateCredentials={updateCredentials}
        />
      )}
    </div>
  );
};

export default AdminView;
