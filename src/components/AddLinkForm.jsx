import React, { useState } from 'react';

const AddLinkForm= ({ addExamLink }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [center, setCenter] = useState('centerA');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      setError('Both name and URL are required.');
      return;
    }
    
    try {
      new URL(url);
    } catch (_) {
      setError('Please enter a valid URL.');
      return;
    }

    addExamLink({ name, url, center });
    setName('');
    setUrl('');
    setCenter('centerA');
    setError('');
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">Add New Exam Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="examName" className="block text-sm font-medium text-slate-300">
              Exam Name
            </label>
            <input
              type="text"
              id="examName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="e.g., .NET & C# Developer 2"
            />
          </div>
          <div>
            <label htmlFor="examCenter" className="block text-sm font-medium text-slate-300">
              Center
            </label>
            <select
              id="examCenter"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            >
              <option value="centerA">Job Fair</option>
              <option value="centerB">Technical</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="examUrl" className="block text-sm font-medium text-slate-300">
            Exam URL
          </label>
          <input
            type="url"
            id="examUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="https://www.example.com/..."
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
          >
            Add Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinkForm;