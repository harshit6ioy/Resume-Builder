import React from 'react';
import TemplateMinimal from './templates/TemplateMinimal';
import TemplateCorporate from './templates/TemplateCorporate';
import TemplateExecutive from './templates/TemplateExecutive';
import TemplateStartup from './templates/TemplateStartup';
import TemplateCreative from './templates/TemplateCreative';
import TemplateModernIT from './templates/TemplateModernIT';

const ResumePreview = ({ data }) => {
  const templateStr = (data.template || '').toLowerCase();

  // Dynamically select the template component based on the name
  if (templateStr.includes('minimal')) {
    return <TemplateMinimal data={data} />;
  } else if (templateStr.includes('corporate') || templateStr.includes('standard')) {
    return <TemplateCorporate data={data} />;
  } else if (templateStr.includes('executive')) {
    return <TemplateExecutive data={data} />;
  } else if (templateStr.includes('modern it')) {
    return <TemplateModernIT data={data} />;
  } else if (templateStr.includes('startup') || templateStr.includes('tech')) {
    return <TemplateStartup data={data} />;
  } else if (templateStr.includes('creative')) {
    return <TemplateCreative data={data} />;
  }

  // Fallback to Minimal
  return <TemplateMinimal data={data} />;
};

export default ResumePreview;
