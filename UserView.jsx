import React from 'react';
// import { ExamLink, Credentials } from '../types';
import ExamCard from './ExamCard';

const UserView= ({ examLinks, loggedInUser, centerCategory }) => {
  console.log("loggedInUser in userview", loggedInUser)
  // Admin View: Separate links by center
  if (loggedInUser.role === 'admin'){
    const jobFairLinks = examLinks.filter(link => link.examCenter._id === centerCategory[0]);
    const technicalLinks = examLinks.filter(link => link.examCenter._id === centerCategory[1]);
    console.log("filtered lnks ",jobFairLinks, technicalLinks)
    return (
      <div>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-2 border-slate-700 pb-2">All Available Exams (Admin View)</h2>
        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-semibold text-sky-400 mb-4">Job Fair Exams</h3>
            {jobFairLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobFairLinks.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
              </div>
            ) : (
              <p className="text-slate-400">No Job Fair exam links found.</p>
            )}
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Technical Exams</h3>
            {technicalLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicalLinks.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
              </div>
            ) : (
              <p className="text-slate-400">No Technical exam links found.</p>
            )}
          </section>
        </div>
      </div>
    );
  }

  // Regular User View
  const linksToShow = examLinks.filter(link => link.examCenter._id === loggedInUser.id);
  // const linksToShow = examLinks; 
  const getTitle = () => {
    // if (loggedInUser.username === 'centerA') {
    //   return 'Job Fair Technical Exams';
    // }
    // if (loggedInUser.username === 'centerB') {
    //     return 'Technical Exams';
    // }
    return `Available Exams for ${loggedInUser.username}`;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-2 border-slate-700 pb-2">{getTitle()}</h2>
      {linksToShow.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linksToShow.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
          <p className="text-slate-400 text-lg">No exam links have been assigned to this view.</p>
        </div>
      )}
    </div>
  );
};

export default UserView;