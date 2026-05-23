import React from 'react';

const TemplateCreative = ({ data }) => {
  return (
    <div className="w-full bg-orange-50 text-slate-900 h-[842px] border border-orange-100 aspect-[1/1.414] font-sans flex flex-col overflow-hidden shadow-sm relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-bl-full -z-10 opacity-50"></div>
      
      <div className="p-10 pb-6">
        <h1 className="text-5xl font-black mb-3 text-orange-600 tracking-tighter">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center space-x-6 text-sm text-orange-900/60 font-medium">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>
      
      <div className="p-10 pt-0 flex-1 space-y-8 z-10">
        {data.summary && (
          <div className="border-l-4 border-orange-400 pl-6 py-2">
            <p className="text-sm leading-relaxed text-slate-700 font-medium">{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            {data.experience && (
              <div>
                 <h3 className="text-2xl font-bold text-orange-900 mb-4 inline-block relative">
                   Experience
                   <div className="absolute bottom-1 left-0 w-full h-3 bg-orange-200 -z-10 transform -rotate-1"></div>
                 </h3>
                 <div className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700">{data.experience}</div>
              </div>
            )}
            {data.education && (
              <div>
                 <h3 className="text-2xl font-bold text-orange-900 mb-4 inline-block relative">
                   Education
                   <div className="absolute bottom-1 left-0 w-full h-3 bg-orange-200 -z-10 transform -rotate-1"></div>
                 </h3>
                 <div className="text-sm whitespace-pre-wrap text-slate-700 leading-relaxed">{data.education}</div>
              </div>
            )}
          </div>
          
          <div className="col-span-1 space-y-8">
             {data.skills && data.skills.length > 0 && (
                <div>
                   <h3 className="text-2xl font-bold text-orange-900 mb-4 inline-block relative">
                     Skills
                     <div className="absolute bottom-1 left-0 w-full h-3 bg-orange-200 -z-10 transform -rotate-1"></div>
                   </h3>
                  <div className="flex flex-col gap-3">
                    {(Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : [])).map((skill, index) => (
                      <span key={index} className="text-sm font-bold text-orange-700 bg-orange-100/50 px-4 py-2 rounded-xl">
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

export default TemplateCreative;
