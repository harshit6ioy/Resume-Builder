const FONT_STYLE_MAP = {
  sans: "'Inter', 'Helvetica', 'Arial', sans-serif",
  serif: "'Georgia', 'Times New Roman', serif",
  mono: "'Courier New', monospace",
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

export const getResumeTypography = (data) => {
  const fontFamily = FONT_STYLE_MAP[data?.font_style];
  const fontSize = FONT_SIZE_MAP[data?.font_size];
  const fontWeight = FONT_WEIGHT_MAP[data?.font_weight];

  return {
    rootStyle: compactStyle({
      ...(fontFamily ? { fontFamily } : {}),
    }),
    textStyle: compactStyle({
      ...(fontFamily ? { fontFamily } : {}),
      ...(fontSize ? { fontSize } : {}),
      ...(fontWeight ? { fontWeight } : {}),
    }),
  };
};
