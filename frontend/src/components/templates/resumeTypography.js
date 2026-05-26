const FONT_STYLE_MAP = {
  sans: "'Inter', 'Helvetica', 'Arial', sans-serif",
  serif: "'Georgia', 'Times New Roman', serif",
  mono: "'Courier New', monospace",
  calibri: "'Calibri', 'Candara', 'Segoe', 'Segoe UI', 'Optima', 'Arial', sans-serif",
  'times-new-roman': "'Times New Roman', 'Times', serif",
  arial: "'Arial', 'Helvetica Neue', 'Helvetica', sans-serif",
  georgia: "'Georgia', 'Times New Roman', 'Times', serif",
};

const FONT_SIZE_MAP = {
  small: '12px',
  medium: '14px',
  large: '16px',
};

const FONT_WEIGHT_MAP = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const compactStyle = (style) => (Object.keys(style).length > 0 ? style : undefined);

export const getFieldFontSize = (fieldName, data) => {
  if (data?.font_sizes?.[fieldName] && !isNaN(data.font_sizes[fieldName])) {
    return `${data.font_sizes[fieldName]}px`;
  }
  
  let fallbackSize = FONT_SIZE_MAP[data?.font_size];
  if (!fallbackSize && data?.font_size) {
    if (data.font_size === 'default') {
      return '14px';
    } else if (!isNaN(data.font_size)) {
      return `${data.font_size}px`;
    }
  }
  return fallbackSize || undefined;
};

export const getResumeTypography = (data) => {
  const fontFamily = FONT_STYLE_MAP[data?.font_style];
  const fontWeight = FONT_WEIGHT_MAP[data?.font_weight];

  return {
    rootStyle: compactStyle({
      ...(fontFamily ? { fontFamily } : {}),
    }),
    textStyle: compactStyle({
      ...(fontFamily ? { fontFamily } : {}),
      ...(fontWeight ? { fontWeight } : {}),
    }),
  };
};
