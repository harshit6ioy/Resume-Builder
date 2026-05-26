import React from 'react';
import { getResumeTypography } from './resumeTypography';

const TemplateCorporate = ({ data }) => {
  const { rootStyle, textStyle } = getResumeTypography(data);

  return (
    <div className="w-full bg-slate-50 text-slate-900 h-[842px] border border-slate-200 aspect-[1/1.414] font-sans flex flex-col overflow-hidden shadow-sm" style={rootStyle}>
      <div className="bg-slate-800 text-white p-8 text-center border-b-4 border-blue-600">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-3">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center justify-center space-x-6 text-sm text-slate-300" style={textStyle}>
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>|</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col gap-6">
        {data.summary && (
          <div>
            <h3 className="text-lg font-bold uppercase text-blue-800 mb-2 border-b-2 border-slate-200 pb-1">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-slate-700" style={textStyle}>{data.summary}</p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-8 flex-1">
          <div className="col-span-2 space-y-6">
            {data.experience && (
              <div>
                <h3 className="text-lg font-bold uppercase text-blue-800 mb-3 border-b-2 border-slate-200 pb-1">Experience</h3>
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700" style={textStyle}>{data.experience}</div>
              </div>
            )}
            {data.projects && (
              <div>
                <h3 className="text-lg font-bold uppercase text-blue-800 mb-3 border-b-2 border-slate-200 pb-1">Projects</h3>
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700" style={textStyle}>{data.projects}</div>
              </div>
            )}
          </div>
          
          <div className="col-span-1 space-y-6 bg-white p-4 rounded-md shadow-sm border border-slate-100 h-fit">
            {data.skills && data.skills.length > 0 && (
              <div>
                <h3 className="text-md font-bold uppercase text-blue-800 mb-3 border-b border-slate-200 pb-1">Core Competencies</h3>
                <div className="flex flex-col gap-1.5">
                  {(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])).map((skill, index) => (
                    <span key={index} className="text-sm text-slate-600 flex items-center gap-2" style={textStyle}>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.education && (
              <div className="pt-4">
                <h3 className="text-md font-bold uppercase text-blue-800 mb-3 border-b border-slate-200 pb-1">Education</h3>
                <div className="text-sm whitespace-pre-wrap text-slate-600 leading-relaxed" style={textStyle}>{data.education}</div>
              </div>
            )}
            {data.activity_details && (
              <div className="pt-4">
                <h3 className="text-md font-bold uppercase text-blue-800 mb-3 border-b border-slate-200 pb-1">
                  {data.activity_type === 'co_curricular' ? 'Co-curricular' : 'Achievements'}
                </h3>
                <div className="text-sm whitespace-pre-wrap text-slate-600 leading-relaxed" style={textStyle}>{data.activity_details}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCorporate;
