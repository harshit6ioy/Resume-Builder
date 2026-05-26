import React from 'react';
import { getResumeTypography, getFieldFontSize } from './resumeTypography';

const TemplateStartup = ({ data }) => {
  const { rootStyle, textStyle } = getResumeTypography(data);

  const getStyle = (field) => {
    const size = getFieldFontSize(field, data);
    return { ...textStyle, ...(size ? { fontSize: size } : {}) };
  };

  return (
    <div className="w-full bg-slate-900 text-slate-300 h-[842px] border border-slate-700 aspect-[1/1.414] font-sans flex flex-col overflow-hidden shadow-sm" style={rootStyle}>
      <div className="p-8 pb-6 border-b border-slate-800 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold mb-1 text-emerald-400 tracking-tight" style={getStyle('full_name')}>{data.full_name || 'Your Name'}</h1>
        </div>
        <div className="flex flex-col items-end text-sm text-slate-400">
          {data.email && <span style={getStyle('email')}>{data.email}</span>}
          {data.phone && <span style={getStyle('phone')}>{data.phone}</span>}
        </div>
      </div>
      
      <div className="p-8 flex-1 grid grid-cols-1 gap-6">
        {data.summary && (
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
             <p className="text-sm leading-relaxed text-slate-300" style={getStyle('summary')}>{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
           <div className="col-span-1 space-y-6">
             {data.skills && data.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase text-emerald-400 mb-4 tracking-widest flex items-center gap-2">
                    <div className="w-4 h-px bg-emerald-400"></div> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])).map((skill, index) => (
                      <span key={index} className="text-xs font-medium bg-emerald-900/30 text-emerald-300 px-3 py-1.5 rounded-md border border-emerald-800/50" style={getStyle('skills')}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.education && (
                <div>
                  <h3 className="text-sm font-bold uppercase text-emerald-400 mb-4 tracking-widest flex items-center gap-2 pt-4">
                    <div className="w-4 h-px bg-emerald-400"></div> Edu
                  </h3>
                  <div className="text-sm whitespace-pre-wrap text-slate-400 leading-relaxed" style={getStyle('education')}>{data.education}</div>
                </div>
              )}
              {data.activity_details && (
                <div>
                  <h3 className="text-sm font-bold uppercase text-emerald-400 mb-4 tracking-widest flex items-center gap-2 pt-4">
                    <div className="w-4 h-px bg-emerald-400"></div> {data.activity_type === 'co_curricular' ? 'Activities' : 'Wins'}
                  </h3>
                  <div className="text-sm whitespace-pre-wrap text-slate-400 leading-relaxed" style={getStyle('activity_details')}>{data.activity_details}</div>
                </div>
              )}
           </div>

           <div className="col-span-2 space-y-6 border-l border-slate-800 pl-8">
             {data.experience && (
                <div>
                  <h3 className="text-sm font-bold uppercase text-emerald-400 mb-4 tracking-widest flex items-center gap-2">
                    <div className="w-8 h-px bg-emerald-400"></div> Experience
                  </h3>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-300" style={getStyle('experience')}>{data.experience}</div>
                </div>
              )}
              {data.projects && (
                <div>
                  <h3 className="text-sm font-bold uppercase text-emerald-400 mb-4 tracking-widest flex items-center gap-2">
                    <div className="w-8 h-px bg-emerald-400"></div> Projects
                  </h3>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-300" style={getStyle('projects')}>{data.projects}</div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateStartup;
