// import { ExamLink, Credentials } from './types';

// // --- SIMULATED BACKEND ---
// // This file mimics a real backend API using localStorage and setTimeout.
// // When you build your Netlify Functions, you can replace the logic in these
// // functions with fetch calls to your live endpoints without changing the rest
// // of the application.

// const SIMULATED_DELAY = 500; // ms

// const INITIAL_EXAM_LINKS: ExamLink[] = [
//   { id: '1', name: 'Java Developer Assessment (Sample)', url: 'https://example.com/java-test', center: 'centerB' },
//   { id: '2', name: 'Frontend Skills Challenge (Sample)', url: 'https://example.com/frontend-test', center: 'centerA' },
//   { id: '3', name: 'SQL Database Quiz (Sample)', url: 'https://example.com/sql-test', center: 'centerB' },
//   { id: '4', name: 'HR Aptitude Test (Sample)', url: 'https://example.com/hr-test', center: 'centerA' },
// ];

// const INITIAL_CREDENTIALS: Credentials[] = [
//   { username: 'admin', password: 'password', role: 'admin' },
//   { username: 'centerA', password: 'passwordA', role: 'center' },
//   { username: 'centerB', password: 'passwordB', role: 'center' },
// ];

// // Helper to get data from localStorage or initialize it
// const getStorage = <T,>(key: string, defaultValue: T): T => {
//     try {
//         const storedValue = localStorage.getItem(key);
//         if (storedValue) {
//             return JSON.parse(storedValue);
//         }
//         localStorage.setItem(key, JSON.stringify(defaultValue));
//         return defaultValue;
//     } catch (error) {
//         console.error(`Error with localStorage key "${key}":`, error);
//         return defaultValue;
//     }
// };

// // --- Auth ---
// export const login = (credentials: Omit<Credentials, 'role'>): Promise<Credentials> => {
//     return new Promise((resolve, reject) => {

//         setTimeout(() => {
//             const allCreds = getStorage<Credentials[]>('credentials', INITIAL_CREDENTIALS);
//             const user = allCreds.find(
//                 cred => cred.username === credentials.username && cred.password === credentials.password
//             );
//             if (user) {
//                 resolve(user);
//             } else {
//                 reject(new Error('Invalid username or password.'));
//             }
//         }, SIMULATED_DELAY);
        
//     });
// };

// // --- Links ---
// export const getLinks = (): Promise<ExamLink[]> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(getStorage<ExamLink[]>('examLinks', INITIAL_EXAM_LINKS));
//         }, SIMULATED_DELAY);
//     });
// };

// export const addLink = (linkData: Omit<ExamLink, 'id'>): Promise<ExamLink> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const links = getStorage<ExamLink[]>('examLinks', INITIAL_EXAM_LINKS);
//             const newLink: ExamLink = { ...linkData, id: new Date().getTime().toString() };
//             const updatedLinks = [newLink, ...links];
//             localStorage.setItem('examLinks', JSON.stringify(updatedLinks));
//             resolve(newLink);
//         }, SIMULATED_DELAY);
//     });
// };

// export const updateLink = (id: string, linkData: Omit<ExamLink, 'id'>): Promise<ExamLink> => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const links = getStorage<ExamLink[]>('examLinks', INITIAL_EXAM_LINKS);
//             let updatedLink: ExamLink | null = null;
//             const updatedLinks = links.map(link => {
//                 if (link.id === id) {
//                     updatedLink = { ...link, ...linkData };
//                     return updatedLink;
//                 }
//                 return link;
//             });

//             if (updatedLink) {
//                 localStorage.setItem('examLinks', JSON.stringify(updatedLinks));
//                 resolve(updatedLink);
//             } else {
//                 reject(new Error('Link not found.'));
//             }
//         }, SIMULATED_DELAY);
//     });
// };

// export const deleteLink = (id: string): Promise<{ success: boolean }> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             let links = getStorage<ExamLink[]>('examLinks', INITIAL_EXAM_LINKS);
//             links = links.filter(link => link.id !== id);
//             localStorage.setItem('examLinks', JSON.stringify(links));
//             resolve({ success: true });
//         }, SIMULATED_DELAY);
//     });
// };


// // --- Credentials (Admin Only) ---
// export const getCredentials = (): Promise<Credentials[]> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(getStorage<Credentials[]>('credentials', INITIAL_CREDENTIALS));
//         }, SIMULATED_DELAY);
//     });
// };

// export const updateCredential = (username: string, credData: Omit<Credentials, 'role'>): Promise<Credentials> => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const creds = getStorage<Credentials[]>('credentials', INITIAL_CREDENTIALS);
//             let updatedCredential: Credentials | null = null;
//             const updatedCreds = creds.map(cred => {
//                 if (cred.username === username) {
//                     updatedCredential = { ...cred, ...credData };
//                     return updatedCredential;
//                 }
//                 return cred;
//             });

//             if (updatedCredential) {
//                 localStorage.setItem('credentials', JSON.stringify(updatedCreds));
//                 resolve(updatedCredential);
//             } else {
//                 reject(new Error('Credential not found.'));
//             }
//         }, SIMULATED_DELAY);
//     });
// };