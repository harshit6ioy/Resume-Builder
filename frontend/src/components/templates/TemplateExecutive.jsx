import React from 'react';

const TemplateExecutive = ({ data }) => {
  return (
    <div className="w-full bg-white text-slate-900 h-[842px] border border-slate-200 aspect-[1/1.414] font-serif flex flex-col overflow-hidden shadow-sm">
      <div className="p-10 pb-6 border-b-4 border-slate-900 text-center">
        <h1 className="text-5xl font-bold mb-3 text-slate-900">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 font-sans tracking-wide">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>
      
      <div className="p-10 flex-1 space-y-8">
        {data.summary && (
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm leading-relaxed text-slate-700 italic">"{data.summary}"</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-10 pt-4">
          <div className="col-span-1 space-y-8">
            {data.experience && (
              <div>
                <h3 className="text-xl font-bold uppercase text-slate-900 mb-4 border-b border-slate-300 pb-2 tracking-widest">Experience</h3>
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700">{data.experience}</div>
              </div>
            )}
          </div>
          
          <div className="col-span-1 space-y-8 pl-6 border-l border-slate-200">
             {data.education && (
              <div>
                <h3 className="text-xl font-bold uppercase text-slate-900 mb-4 border-b border-slate-300 pb-2 tracking-widest">Education</h3>
                <div className="text-sm whitespace-pre-wrap text-slate-700 leading-relaxed">{data.education}</div>
              </div>
            )}
            
            {data.skills && data.skills.length > 0 && (
              <div>
                <h3 className="text-xl font-bold uppercase text-slate-900 mb-4 border-b border-slate-300 pb-2 tracking-widest">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])).map((skill, index) => (
                    <span key={index} className="text-sm bg-slate-100 text-slate-800 px-3 py-1 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateExecutive;
