import React from 'react';

const ResumePreview = ({ data }) => {
  // Determine layout styles based on template name
  const templateStr = (data.template || '').toLowerCase();
  
  let headerClass = "p-8 pb-4 border-b border-slate-200 text-center";
  let nameClass = "text-3xl font-bold uppercase tracking-wider mb-2 text-slate-900";
  let borderClass = "border-slate-800";
  let skillClass = "text-sm bg-slate-100 px-2 py-1 rounded text-slate-700";
  let bodyFont = "font-sans";

  if (templateStr.includes('creative')) {
    headerClass = "p-8 pb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-left";
    nameClass = "text-4xl font-extrabold mb-2 text-white tracking-tight";
    borderClass = "border-pink-500";
    skillClass = "text-sm bg-pink-100 px-3 py-1 rounded-full text-pink-700 font-medium";
  } else if (templateStr.includes('minimal')) {
    headerClass = "p-10 pb-4 text-left";
    nameClass = "text-2xl font-light mb-1 text-slate-800";
    borderClass = "border-slate-300 border-t-0 border-l-0 border-r-0 border-b";
    skillClass = "text-sm text-slate-600 border border-slate-200 px-2 py-1";
    bodyFont = "font-serif";
  } else if (templateStr.includes('startup') || templateStr.includes('tech')) {
    headerClass = "p-8 pb-6 bg-slate-900 text-white text-center";
    nameClass = "text-3xl font-bold mb-2 text-blue-400";
    borderClass = "border-blue-400";
    skillClass = "text-sm bg-blue-900/50 border border-blue-400/30 px-2 py-1 rounded text-blue-300";
  } else if (templateStr.includes('executive') || templateStr.includes('corporate')) {
    headerClass = "p-8 pb-4 border-b-4 border-slate-800 text-left flex flex-col items-center";
    nameClass = "text-4xl font-serif text-slate-900";
    borderClass = "border-slate-800 border-b-2";
    skillClass = "text-sm bg-transparent border-b border-slate-300 px-1 py-1 text-slate-800";
    bodyFont = "font-serif";
  }

  return (
    <div className={`w-full bg-white text-slate-900 rounded-lg shadow-lg overflow-hidden flex flex-col h-[842px] border border-slate-200 aspect-[1/1.414] ${bodyFont}`}>
      {/* Header */}
      <div className={headerClass}>
        <h1 className={nameClass}>{data.full_name || 'Your Name'}</h1>
        <div className={`flex items-center ${templateStr.includes('creative') || templateStr.includes('minimal') ? 'justify-start' : 'justify-center'} space-x-4 text-sm ${templateStr.includes('creative') || templateStr.includes('startup') || templateStr.includes('tech') ? 'text-slate-200' : 'text-slate-600'}`}>
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>

      <div className="p-8 flex-1 grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 border-r border-slate-200 pr-8 space-y-6">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h3 className={`text-lg font-bold uppercase tracking-wider pb-1 mb-3 border-b-2 ${borderClass}`}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className={skillClass}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && (
            <div>
              <h3 className={`text-lg font-bold uppercase tracking-wider pb-1 mb-3 border-b-2 ${borderClass}`}>Education</h3>
              <div className="text-sm whitespace-pre-wrap">{data.education}</div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {data.summary && (
            <div>
              <h3 className={`text-lg font-bold uppercase tracking-wider pb-1 mb-3 border-b-2 ${borderClass}`}>Professional Summary</h3>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && (
            <div>
              <h3 className={`text-lg font-bold uppercase tracking-wider pb-1 mb-3 border-b-2 ${borderClass}`}>Experience</h3>
              <div className="text-sm whitespace-pre-wrap leading-relaxed">{data.experience}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
