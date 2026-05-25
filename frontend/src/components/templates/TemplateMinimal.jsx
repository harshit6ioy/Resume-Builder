import React from 'react';

const TemplateMinimal = ({ data }) => {
  return (
    <div className="w-full bg-white text-slate-900 h-[842px] border border-slate-200 aspect-[1/1.414] font-serif flex flex-col overflow-hidden shadow-sm">
      <div className="p-10 pb-4 text-left border-b border-slate-300">
        <h1 className="text-3xl font-light mb-1 text-slate-800">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center justify-start space-x-4 text-sm text-slate-600">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>
      
      <div className="p-10 flex-1 grid grid-cols-3 gap-10">
        <div className="col-span-1 space-y-8">
          {data.skills && data.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider pb-2 mb-4 border-b border-slate-300 text-slate-800">Skills</h3>
              <div className="flex flex-col gap-2">
                {(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])).map((skill, index) => (
                  <span key={index} className="text-sm text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.education && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider pb-2 mb-4 border-b border-slate-300 text-slate-800">Education</h3>
              <div className="text-sm whitespace-pre-wrap text-slate-600 leading-relaxed">{data.education}</div>
            </div>
          )}
          {data.activity_details && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider pb-2 mb-4 border-b border-slate-300 text-slate-800">
                {data.activity_type === 'co_curricular' ? 'Co-curricular' : 'Achievements'}
              </h3>
              <div className="text-sm whitespace-pre-wrap text-slate-600 leading-relaxed">{data.activity_details}</div>
            </div>
          )}
        </div>
        
        <div className="col-span-2 space-y-8 pl-8 border-l border-slate-200">
          {data.summary && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider pb-2 mb-4 border-b border-slate-300 text-slate-800">Professional Summary</h3>
              <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
            </div>
          )}
          {data.experience && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider pb-2 mb-4 border-b border-slate-300 text-slate-800">Experience</h3>
              <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700">{data.experience}</div>
            </div>
          )}
          {data.projects && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider pb-2 mb-4 border-b border-slate-300 text-slate-800">Projects</h3>
              <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700">{data.projects}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateMinimal;
