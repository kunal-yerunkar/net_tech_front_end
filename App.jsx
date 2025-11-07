import React, { useState, useEffect } from 'react';
// import { ExamLink, View, Credentials } from './types';
import Header from './components/Header';
import UserView from './components/UserView';
import AdminView from './components/AdminView';
import Login from './components/Login';
import AIAssistant from './components/AIAssistant';
import Preloader from './components/Preloader';
import * as api from './api';
import axios from "axios"
import { jwtDecode } from 'jwt-decode';
// const Credentials = {}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [loginError, setLoginError] = useState('');

  const [view, setView] = useState('user');
  const [examLinks, setExamLinks] = useState([]);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const [links, creds] = await Promise.all([
          // api.getLinks(),
          // api.getCredentials(),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/links/all`), 
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`), 
                   

        ]);
        console.log("links", links); 
        console.log("all users data in app.js", creds.data); 
        setExamLinks(links.data);
        setCredentials(creds.data);

        setError(null);
      } catch (err) {
        setError('Failed to load initial data. Please try refreshing the page.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [isAuthenticated]);

  const handleLogin = async (attemptedCredentials) => {
    setLoginError('');
    try {
      // const user = await api.login(attempteonLogindCredentials);
      console.log("on login triggered ");

      const userToken = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, { username: attemptedCredentials.username, password: attemptedCredentials.password });
      console.log("user details ", userToken);
      const decodedUser = jwtDecode(userToken.data.data.accessToken);
      console.log(decodedUser);

      setIsAuthenticated(true);
      setLoggedInUser(decodedUser);

      if (decodedUser.role !== 'admin') {
        setView('user');
      }
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser(null);
    setView('user');
  };

  // const updateCredentials = async (usernameToUpdate: string, newCredentials: Omit<Credentials, 'role'>) => {
  const updateCredentials = async ({userId, userName, password}) => {
    try {
      // const updatedCred = await api.updateCredential(usernameToUpdate, newCredentials);
      const updatedCred = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}  `, {
        username : userName, 
        password : password 
      })  
      console.log("update credentials in mangecrededntial component ", updateCredentials); 
      // setCredentials(prevCreds =>
      //   prevCreds.map(cred =>
      //     cred.username === usernameToUpdate ? { ...cred, ...updatedCred } : cred
      //   )
      // );
       setCredentials(prevCreds =>
        prevCreds.map(cred =>
          cred.username === userName ? {...updatedCred?.data?.user } : cred
        )
      );
      alert('Credentials updated successfully!');
    } catch (err) {
      alert('Failed to update credentials.');
      console.error(err);
    }
  };

  const addExamLink = async (newLinkData) => {
    try {
      // const newLink = await api.addLink(newLinkData);
      const { name, url, center } = newLinkData;
      console.log("new link data ", newLinkData)
      const newLink = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/links/create`, {
        examName: name,
        examCenter: center,
        examUrl: url
      });
      console.log("new link", newLink.data.link)
      setExamLinks(prevLinks => [newLink.data.link, ...prevLinks]);
    } catch (err) {
      alert('Failed to add link.');
      console.error(err);
    }
  };

  const updateExamLink = async (id, updatedData) => {
    try {

      // const updatedLink = await api.updateLink(id, updatedData);
      const {name, url, center} = updatedData; 
      const updatedLink = await axios.put(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/links/${id}`, {
        examName: name,
        examCenter: center,
        examUrl: url
      });

      console.log("updated link info for id ",id, " ",  updatedLink); 
      console.log("prev links ", examLinks)
      setExamLinks(prevLinks =>
        prevLinks.map(link =>
          link._id === id ? updatedLink.data.link : link
        )
      );
    } catch (err) {
      alert('Failed to update link.');
      console.error(err);
    }
  };

  const removeExamLink = async (id) => {
    if (window.confirm("Are you sure you want to remove this link?")) {
      try {
        await api.deleteLink(id);
        setExamLinks(prevLinks => prevLinks.filter(link => link.id !== id));
      } catch (err) {
        alert('Failed to remove link.');
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400">
        {error}
      </div>
    );
  }

  if (!isAuthenticated || !loggedInUser) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }
  const centerCategory = [];  
  credentials?.map((e) => e.role !== "admin" && centerCategory.push(e._id)); 
  return (
    <div className="min-h-screen bg-slate-900 font-sans ">
      <Header
        currentView={view}
        setView={setView}
        onLogout={handleLogout}
        loggedInUser={loggedInUser}
        onToggleAIAssistant={() => setIsAIAssistantOpen(prev => !prev)}
      />

    
      <main className="container mx-auto px-4 py-8">
        {view === 'user' ? (
          <UserView examLinks={examLinks} loggedInUser={loggedInUser} centerCategory={centerCategory} />
        ) : (
          <AdminView
            examLinks={examLinks}
            addExamLink={addExamLink}
            removeExamLink={removeExamLink}
            updateExamLink={updateExamLink}
            loggedInUser={loggedInUser}

            allCredentials={credentials}
            updateCredentials={updateCredentials}
          />
        )}
      </main>
      {/* <AdminView
            examLinks={examLinks}
            addExamLink={addExamLink}
            removeExamLink={removeExamLink}
            updateExamLink={updateExamLink}
            loggedInUser={loggedInUser}
            allCredentials={credentials}
            updateCredentials={updateCredentials}
            /> */}

      {/* <UserView examLinks={examLinks} loggedInUser={loggedInUser} /> */}
      {loggedInUser.role === 'admin' && <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />}
    </div>
  );
}

export default App;

// const App = () => {
//   return <div>

//     hello world
//   </div>
// }

// export default App; 