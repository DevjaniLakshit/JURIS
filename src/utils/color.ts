/**
 * JURIS – Colors
 * Single source of truth for every colour in the app.
 * Import from here (or from globalStyle, which re-exports these).
 */

/* -------------------------------------------------------------------------- */
/*  1. RAW BRAND PALETTE                                                      */
/* -------------------------------------------------------------------------- */

export const palette = {
  // Light mode core
  inkNavy: '#14213D',
  warmPaper: '#FAF7F2',
  white: '#FFFFFF',
  parchmentGrey: '#E4DED3',
  charcoal: '#1B1F2A',
  slate: '#5B6270',
  brass: '#B8862B',
  darkBrass: '#8A6212',

  // Dark mode core
  deepNavy: '#0F1522',
  surfaceNavy: '#172036', // board prints #176036 (typo) – its dark gradient uses #172036
  lightText: '#E8EAF0',
  mutedLight: '#AEB9CB',
  brassDark: '#D9A94A',
  terracottaLight: '#E08A78',
  tealLight: '#4FB3B3',

  // Functional
  oldLaw: '#9C3D2E',
  newLaw: '#0F6B6B',
  verified: '#2E7D4F',
  draft: '#6B7280',
  warning: '#B45309',
  error: '#B3261E',
  explanation: '#EEF3FB',
  editorialNote: '#FBF3E0',
} as const;

/* -------------------------------------------------------------------------- */
/*  2. SEMANTIC THEME TOKENS                                                  */
/* -------------------------------------------------------------------------- */

export interface ThemeColors {
  // Base
  primary: string; // headers, buttons, links
  background: string; // app / page background
  surface: string; // cards, sheets
  statutorySurface: string; // statutory text surface
  border: string; // borders, dividers
  text: string; // body text
  textSecondary: string; // muted text
  accent: string; // logo, highlights, active
  accentText: string; // accent text (readable on bg)
  onPrimary: string; // text on primary button

  // Law mapping
  oldLaw: string;
  oldLawText: string;
  newLaw: string;
  newLawText: string;

  // Functional
  verified: string;
  draft: string;
  warning: string;
  error: string;
  explanation: string; // bg
  explanationText: string;
  editorialNote: string; // bg
  editorialNoteText: string;

  // Soft backgrounds (chips / badges)
  oldLawSoft: string;
  newLawSoft: string;
  verifiedSoft: string;
  draftSoft: string;
  warningSoft: string;
  errorSoft: string;

  // Misc
  overlay: string;
  shadow: string;
  white: string;
}

export const lightColors: ThemeColors = {
  primary: palette.inkNavy,
  background: palette.warmPaper,
  surface: palette.white,
  statutorySurface: palette.white,
  border: palette.parchmentGrey,
  text: palette.charcoal,
  textSecondary: palette.slate,
  accent: palette.brass,
  accentText: palette.darkBrass,
  onPrimary: palette.white,

  oldLaw: palette.oldLaw,
  oldLawText: palette.oldLaw,
  newLaw: palette.newLaw,
  newLawText: palette.newLaw,

  verified: palette.verified,
  draft: palette.draft,
  warning: palette.warning,
  error: palette.error,
  explanation: palette.explanation,
  explanationText: palette.inkNavy,
  editorialNote: palette.editorialNote,
  editorialNoteText: palette.darkBrass,

  oldLawSoft: '#F6E3DF',
  newLawSoft: '#DDF1F1',
  verifiedSoft: '#DFF1E6',
  draftSoft: '#ECEDF0',
  warningSoft: '#FBE9D6',
  errorSoft: '#F9DEDC',

  overlay: 'rgba(20, 33, 61, 0.45)',
  shadow: palette.inkNavy,
  white: palette.white,
};

export const darkColors: ThemeColors = {
  primary: palette.brassDark, // navy is the bg in dark mode, so buttons use brass
  background: palette.deepNavy,
  surface: palette.surfaceNavy,
  statutorySurface: palette.surfaceNavy,
  border: '#26324A',
  text: palette.lightText,
  textSecondary: palette.mutedLight,
  accent: palette.brassDark,
  accentText: palette.brassDark,
  onPrimary: palette.deepNavy,

  oldLaw: palette.terracottaLight,
  oldLawText: palette.terracottaLight,
  newLaw: palette.tealLight,
  newLawText: palette.tealLight,

  verified: '#5FBF84',
  draft: '#9AA3B2',
  warning: '#E59A4D',
  error: '#F2877F',
  explanation: '#1B2A44',
  explanationText: palette.lightText,
  editorialNote: '#2B2514',
  editorialNoteText: palette.brassDark,

  oldLawSoft: '#3A2422',
  newLawSoft: '#12332F',
  verifiedSoft: '#143325',
  draftSoft: '#262D3B',
  warningSoft: '#3A2A14',
  errorSoft: '#3A1D1B',

  overlay: 'rgba(0, 0, 0, 0.6)',
  shadow: '#000000',
  white: palette.white,
};

/* -------------------------------------------------------------------------- */
/*  3. GRADIENTS (expo-linear-gradient / react-native-linear-gradient)        */
/* -------------------------------------------------------------------------- */

export const gradients = {
  primary: [palette.inkNavy, palette.newLaw],
  brass: [palette.brass, palette.darkBrass],
  law: [palette.oldLaw, palette.newLaw], // Old law -> New law
  dark: [palette.deepNavy, palette.surfaceNavy],
} as const;

/* -------------------------------------------------------------------------- */
/*  4. MAPPING-TYPE COLOURS (One-to-One, One-to-Many, …)                      */
/* -------------------------------------------------------------------------- */

export type MappingType =
  | 'oneToOne'
  | 'oneToMany'
  | 'manyToOne'
  | 'partial'
  | 'noEquivalent';

export const mappingColors: Record<
  'light' | 'dark',
  Record<MappingType, { color: string; background: string }>
> = {
  light: {
    oneToOne: { color: '#2E7D4F', background: '#DFF1E6' },
    oneToMany: { color: '#2F6FC0', background: '#DDE9FA' },
    manyToOne: { color: '#6B4FBB', background: '#E8E1F8' },
    partial: { color: '#B45309', background: '#FBE9D6' },
    noEquivalent: { color: '#5B6270', background: '#ECEDF0' },
  },
  dark: {
    oneToOne: { color: '#5FBF84', background: '#143325' },
    oneToMany: { color: '#7FB0F0', background: '#16294A' },
    manyToOne: { color: '#B39BEA', background: '#2A2145' },
    partial: { color: '#E59A4D', background: '#3A2A14' },
    noEquivalent: { color: '#9AA3B2', background: '#262D3B' },
  },
};