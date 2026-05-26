import React from 'react';
import { getResumeTypography } from './resumeTypography';

const TemplateModernIT = ({ data }) => {
  const { rootStyle, textStyle } = getResumeTypography(data);

  return (
    <div className="w-full bg-white text-slate-800 h-[842px] border border-slate-200 aspect-[1/1.414] font-sans flex flex-col overflow-hidden shadow-sm" style={rootStyle}>
      <div className="grid grid-cols-3 h-full">
        
        {/* Left Sidebar */}
        <div className="col-span-1 bg-slate-900 text-slate-300 p-8 flex flex-col">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2 leading-tight">{data.full_name || 'Your Name'}</h1>
            <div className="w-12 h-1 bg-cyan-500 mb-6"></div>
            <div className="space-y-2 text-xs text-slate-400 font-medium" style={textStyle}>
              {data.email && <div className="flex items-center gap-2"><svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{data.email}</div>}
              {data.phone && <div className="flex items-center gap-2"><svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{data.phone}</div>}
            </div>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase text-white mb-4 tracking-widest">Tech Stack</h3>
              <div className="flex flex-col gap-2">
                {(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])).map((skill, index) => (
                  <span key={index} className="text-xs bg-slate-800 text-cyan-100 px-3 py-1.5 rounded border border-slate-700/50" style={textStyle}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education && (
            <div>
              <h3 className="text-sm font-bold uppercase text-white mb-4 tracking-widest">Education</h3>
              <div className="text-xs whitespace-pre-wrap leading-relaxed text-slate-400" style={textStyle}>{data.education}</div>
            </div>
          )}
          {data.activity_details && (
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase text-white mb-4 tracking-widest">
                {data.activity_type === 'co_curricular' ? 'Activities' : 'Achievements'}
              </h3>
              <div className="text-xs whitespace-pre-wrap leading-relaxed text-slate-400" style={textStyle}>{data.activity_details}</div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-10 bg-slate-50 flex flex-col gap-10">
          
          {data.summary && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-3">
                <span className="p-1.5 bg-cyan-100 rounded-lg"><svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
                Profile
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 border-l-2 border-cyan-200 pl-4" style={textStyle}>{data.summary}</p>
            </div>
          )}

          {data.experience && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-3">
                <span className="p-1.5 bg-cyan-100 rounded-lg"><svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                Work Experience
              </h3>
              <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent pl-6 border-l border-slate-200" style={textStyle}>
                {data.experience}
              </div>
            </div>
          )}

          {data.projects && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-3">
                <span className="p-1.5 bg-cyan-100 rounded-lg"><svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                Projects
              </h3>
              <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700 pl-6 border-l border-slate-200" style={textStyle}>
                {data.projects}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TemplateModernIT;
