import React from 'react';
// import { Credentials } from '../types';
import CredentialEditRow from './CredentialEditRow';



const CredentialsManager = ({ allCredentials, updateCredentials }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-slate-700 pb-2">Manage Credentials</h2>
            <div className="space-y-2">
                {allCredentials.map(cred => (
                    
                    <CredentialEditRow 
                        key={cred.username} 
                        credential={cred} 
                        onUpdate={updateCredentials} 
                    />
                ))}
            </div>
        </div>
    );
};

export default CredentialsManager;
