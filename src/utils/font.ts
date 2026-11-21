/**
 * JURIS – Fonts & Typography
 *
 * FONT CHOICE
 *  • Inter           → all UI: buttons, labels, headings, inputs (very legible on mobile)
 *  • Source Serif 4  → statutory / legal text only (long reading, feels like law books)
 *
 * SETUP (React Native CLI)
 *  1. Download from Google Fonts: Inter + Source Serif 4 (static TTFs).
 *  2. Copy these files into  <project>/assets/fonts/ :
 *       Inter-Regular.ttf, Inter-Medium.ttf, Inter-SemiBold.ttf, Inter-Bold.ttf
 *       SourceSerif4-Regular.ttf, SourceSerif4-SemiBold.ttf
 *  3. Create react-native.config.js in project root:
 *       module.exports = { assets: ['./assets/fonts'] };
 *  4. Run:  npx react-native-asset    then rebuild the app.
 *
 * (Expo: load the same files with useFonts from expo-font.)
 *
 * NOTE: fontWeight is intentionally NOT set on custom fonts. Each weight is its own
 * font file, and setting fontWeight on top makes Android fall back to a system font.
 */

import type { TextStyle } from 'react-native';

export const fontFamily = {
  // UI – Inter
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',

  // Statutory text – Source Serif 4
  serif: 'SourceSerif4-Regular',
  serifSemibold: 'SourceSerif4-SemiBold',
} as const;

export const fontSize = {
  caption: 12,
  secondary: 14,
  body: 16,
  h3: 18,
  h2: 22,
  h1: 28,
} as const;

export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: fontSize.h1, lineHeight: 32 },
  h2: { fontFamily: fontFamily.semibold, fontSize: fontSize.h2, lineHeight: 28 },
  h3: { fontFamily: fontFamily.semibold, fontSize: fontSize.h3, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: fontSize.body, lineHeight: 24 },
  secondary: { fontFamily: fontFamily.regular, fontSize: fontSize.secondary, lineHeight: 20 },
  caption: { fontFamily: fontFamily.medium, fontSize: fontSize.caption, lineHeight: 16 },

  // Legal text
  statuteTitle: { fontFamily: fontFamily.serifSemibold, fontSize: 18, lineHeight: 26 },
  statute: { fontFamily: fontFamily.serif, fontSize: 16, lineHeight: 26 },
} as const satisfies Record<string, TextStyle>;