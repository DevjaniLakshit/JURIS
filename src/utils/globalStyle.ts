/**
 * JURIS – Global Style & Theme
 * Judicial Understanding, Research & Information System
 *
 * Files:
 *   color.ts       → all colours
 *   font.ts        → font families + typography scale
 *   globalStyle.ts → spacing, shadows, theme, reusable styles, ThemeProvider (this file)
 *
 * Usage:
 *   1. Wrap your app:   <ThemeProvider><NavigationContainer>…</NavigationContainer></ThemeProvider>
 *   2. In components:   const { styles, colors, isDark, toggleTheme } = useTheme();
 */

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

import {
  darkColors,
  gradients,
  lightColors,
  mappingColors,
  palette,
} from './color';
import type { MappingType, ThemeColors } from './color';
import { fontFamily, typography } from './font';

// Re-exports so existing imports from './globalStyle' keep working
export { palette, lightColors, darkColors, gradients, mappingColors } from './color';
export type { ThemeColors, MappingType } from './color';
export { fontFamily, fontSize, typography } from './font';

/* -------------------------------------------------------------------------- */
/*  1. SPACING, RADIUS, SIZES                                                 */
/* -------------------------------------------------------------------------- */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const sizes = {
  buttonHeight: 48,
  inputHeight: 48,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  appLogo: 64,
} as const;

/* -------------------------------------------------------------------------- */
/*  2. SHADOWS (theme aware)                                                  */
/* -------------------------------------------------------------------------- */

export const getShadows = (c: ThemeColors, isDark: boolean) => ({
  none: {} as ViewStyle,
  sm: {
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.4 : 0.06,
    shadowRadius: 3,
    elevation: 2,
  } as ViewStyle,
  md: {
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDark ? 0.5 : 0.1,
    shadowRadius: 8,
    elevation: 5,
  } as ViewStyle,
  lg: {
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: isDark ? 0.55 : 0.14,
    shadowRadius: 16,
    elevation: 10,
  } as ViewStyle,
});

/* -------------------------------------------------------------------------- */
/*  3. THEME OBJECT                                                           */
/* -------------------------------------------------------------------------- */

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  typography: typeof typography;
  fontFamily: typeof fontFamily;
  spacing: typeof spacing;
  radius: typeof radius;
  sizes: typeof sizes;
  shadows: ReturnType<typeof getShadows>;
  gradients: typeof gradients;
}

export const buildTheme = (mode: ThemeMode): Theme => {
  const isDark = mode === 'dark';
  const colors = isDark ? darkColors : lightColors;
  return {
    mode,
    isDark,
    colors,
    typography,
    fontFamily,
    spacing,
    radius,
    sizes,
    shadows: getShadows(colors, isDark),
    gradients,
  };
};

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');

/* -------------------------------------------------------------------------- */
/*  4. LAW MAPPING TYPES (icon + label + colour)                              */
/* -------------------------------------------------------------------------- */

export interface MappingMeta {
  label: string;
  description: string;
  icon: string; // MaterialCommunityIcons name – adjust to your icon set
  color: string;
  background: string;
}

const mappingInfo: Record<MappingType, Omit<MappingMeta, 'color' | 'background'>> = {
  oneToOne: {
    label: 'One-to-One',
    description: 'One section in old law = One section in new law',
    icon: 'link-variant',
  },
  oneToMany: {
    label: 'One-to-Many',
    description: 'One old section = Multiple new sections',
    icon: 'source-fork',
  },
  manyToOne: {
    label: 'Many-to-One',
    description: 'Multiple old sections = One new section',
    icon: 'call-merge',
  },
  partial: {
    label: 'Partial',
    description: 'Similar scope, but not fully equivalent',
    icon: 'link-variant-minus',
  },
  noEquivalent: {
    label: 'No Direct Equivalent',
    description: 'No corresponding section in the other law',
    icon: 'link-variant-off',
  },
};

export const getMappingTypes = (isDark: boolean): Record<MappingType, MappingMeta> => {
  const colors = mappingColors[isDark ? 'dark' : 'light'];
  return Object.fromEntries(
    (Object.keys(mappingInfo) as MappingType[]).map((key) => [
      key,
      { ...mappingInfo[key], ...colors[key] },
    ]),
  ) as Record<MappingType, MappingMeta>;
};

/* -------------------------------------------------------------------------- */
/*  5. STATUS BADGES                                                          */
/* -------------------------------------------------------------------------- */

export type BadgeKind = 'oldLaw' | 'newLaw' | 'verified' | 'draft' | 'caution' | 'error';

export const getBadgeStyle = (theme: Theme, kind: BadgeKind) => {
  const c = theme.colors;
  const onSolid = theme.isDark ? palette.deepNavy : c.white;
  const map = {
    oldLaw: { bg: c.oldLaw, fg: onSolid },
    newLaw: { bg: c.newLaw, fg: onSolid },
    verified: { bg: c.verifiedSoft, fg: c.verified },
    draft: { bg: c.draftSoft, fg: c.draft },
    caution: { bg: c.warningSoft, fg: c.warning },
    error: { bg: c.errorSoft, fg: c.error },
  } as const;
  return map[kind];
};

/* -------------------------------------------------------------------------- */
/*  6. GLOBAL STYLESHEET FACTORY                                              */
/* -------------------------------------------------------------------------- */

export const createGlobalStyles = (theme: Theme) => {
  const { colors: c, spacing: s, radius: r, typography: t, shadows } = theme;
  const headingColor = theme.isDark ? c.text : c.primary;

  return StyleSheet.create({
    /* ---------- Layout ---------- */
    screen: { flex: 1, backgroundColor: c.background },
    container: { flex: 1, backgroundColor: c.background, paddingHorizontal: s.lg },
    safeContent: { paddingHorizontal: s.lg, paddingVertical: s.md },
    row: { flexDirection: 'row', alignItems: 'center' },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    center: { alignItems: 'center', justifyContent: 'center' },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: c.border,
      width: '100%',
    },

    /* ---------- Text ---------- */
    h1: { ...t.h1, color: headingColor } as TextStyle,
    h2: { ...t.h2, color: headingColor } as TextStyle,
    h3: { ...t.h3, color: headingColor } as TextStyle,
    body: { ...t.body, color: c.text } as TextStyle,
    secondary: { ...t.secondary, color: c.textSecondary } as TextStyle,
    caption: { ...t.caption, color: c.textSecondary } as TextStyle,
    link: {
      ...t.body,
      color: theme.isDark ? c.accent : c.primary,
      textDecorationLine: 'underline',
    } as TextStyle,
    accentText: { ...t.body, color: c.accentText } as TextStyle,
    // Legal text (serif)
    statuteTitle: { ...t.statuteTitle, color: headingColor } as TextStyle,
    statuteText: { ...t.statute, color: c.text } as TextStyle,

    /* ---------- Cards ---------- */
    card: {
      backgroundColor: c.surface,
      borderRadius: r.lg,
      borderWidth: 1,
      borderColor: c.border,
      padding: s.lg,
      ...shadows.sm,
    } as ViewStyle,
    statuteCard: {
      backgroundColor: c.statutorySurface,
      borderRadius: r.lg,
      borderWidth: 1,
      borderColor: c.border,
      borderLeftWidth: 4,
      borderLeftColor: c.primary,
      padding: s.lg,
      ...shadows.sm,
    } as ViewStyle,
    oldLawCard: {
      backgroundColor: c.surface,
      borderRadius: r.lg,
      borderWidth: 1,
      borderColor: c.border,
      borderLeftWidth: 4,
      borderLeftColor: c.oldLaw,
      padding: s.lg,
    } as ViewStyle,
    newLawCard: {
      backgroundColor: c.surface,
      borderRadius: r.lg,
      borderWidth: 1,
      borderColor: c.border,
      borderLeftWidth: 4,
      borderLeftColor: c.newLaw,
      padding: s.lg,
    } as ViewStyle,

    /* ---------- Buttons ---------- */
    buttonPrimary: {
      height: theme.sizes.buttonHeight,
      backgroundColor: c.primary,
      borderRadius: r.md,
      paddingHorizontal: s.xl,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    } as ViewStyle,
    buttonPrimaryText: {
      ...t.body,
      fontFamily: fontFamily.semibold,
      color: c.onPrimary,
    } as TextStyle,

    buttonSecondary: {
      height: theme.sizes.buttonHeight,
      backgroundColor: 'transparent',
      borderRadius: r.md,
      borderWidth: 1.5,
      borderColor: theme.isDark ? c.accent : c.primary,
      paddingHorizontal: s.xl,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    } as ViewStyle,
    buttonSecondaryText: {
      ...t.body,
      fontFamily: fontFamily.semibold,
      color: theme.isDark ? c.accent : c.primary,
    } as TextStyle,

    buttonNewLaw: {
      height: theme.sizes.buttonHeight,
      backgroundColor: c.newLaw,
      borderRadius: r.md,
      paddingHorizontal: s.xl,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    buttonOldLaw: {
      height: theme.sizes.buttonHeight,
      backgroundColor: c.oldLaw,
      borderRadius: r.md,
      paddingHorizontal: s.xl,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    buttonLawText: {
      ...t.body,
      fontFamily: fontFamily.semibold,
      color: theme.isDark ? palette.deepNavy : c.white,
    } as TextStyle,
    buttonDisabled: { opacity: 0.5 } as ViewStyle,

    /* ---------- Inputs ---------- */
    input: {
      height: theme.sizes.inputHeight,
      backgroundColor: c.surface,
      borderRadius: r.md,
      borderWidth: 1,
      borderColor: c.border,
      paddingHorizontal: s.lg,
      color: c.text,
      fontFamily: fontFamily.regular,
      fontSize: 16,
    } as TextStyle,
    inputFocused: { borderColor: c.accent, borderWidth: 1.5 } as ViewStyle,
    inputError: { borderColor: c.error } as ViewStyle,

    /* ---------- Badges / Chips ---------- */
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal: s.md,
      paddingVertical: s.xs + 2,
      borderRadius: r.pill,
    } as ViewStyle,
    badgeText: { ...t.caption, fontFamily: fontFamily.semibold } as TextStyle,

    /* ---------- Alerts / Notes ---------- */
    alertWarning: {
      backgroundColor: c.warningSoft,
      borderLeftWidth: 4,
      borderLeftColor: c.warning,
      borderRadius: r.md,
      padding: s.md,
    } as ViewStyle,
    alertError: {
      backgroundColor: c.errorSoft,
      borderLeftWidth: 4,
      borderLeftColor: c.error,
      borderRadius: r.md,
      padding: s.md,
    } as ViewStyle,
    explanationBox: {
      backgroundColor: c.explanation,
      borderRadius: r.md,
      padding: s.md,
    } as ViewStyle,
    explanationText: { ...t.secondary, color: c.explanationText } as TextStyle,
    editorialNote: {
      backgroundColor: c.editorialNote,
      borderRadius: r.md,
      padding: s.md,
    } as ViewStyle,
    editorialNoteText: { ...t.secondary, color: c.editorialNoteText } as TextStyle,
  });
};

/* -------------------------------------------------------------------------- */
/*  7. THEME PROVIDER + HOOK                                                  */
/* -------------------------------------------------------------------------- */

export type ThemePreference = ThemeMode | 'system';

interface ThemeContextValue {
  theme: Theme;
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  toggleTheme: () => void;
  styles: ReturnType<typeof createGlobalStyles>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  /** Default preference. 'system' follows the phone's setting. */
  initialPreference?: ThemePreference;
}

export const ThemeProvider = ({
  children,
  initialPreference = 'system',
}: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);

  const mode: ThemeMode =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  const theme = useMemo(() => buildTheme(mode), [mode]);
  const styles = useMemo(() => createGlobalStyles(theme), [theme]);

  const toggleTheme = useCallback(() => {
    setPreference(mode === 'dark' ? 'light' : 'dark');
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colors: theme.colors,
      isDark: theme.isDark,
      mode,
      preference,
      setPreference,
      toggleTheme,
      styles,
    }),
    [theme, mode, preference, toggleTheme, styles],
  );

  return createElement(ThemeContext.Provider, { value }, children);
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
};

/* -------------------------------------------------------------------------- */
/*  8. BRAND CONSTANTS                                                        */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: 'JURIS',
  fullName: 'Judicial Understanding, Research & Information System',
  tagline: 'Every Law. Every Section. One Platform.',
  subtitle: 'Indian Legal Knowledge Platform',
} as const;