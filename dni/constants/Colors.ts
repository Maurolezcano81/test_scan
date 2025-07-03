/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// Paleta principal basada en #B6C69F
export const Colors = {
  primary: '#B6C69F',
  primaryDark: '#8FA06E',
  primaryLight: '#D6E3C3',
  accent: '#F2C572',
  background: '#F8F9F4',
  surface: '#FFFFFF',
  text: '#2E3A1B',
  error: '#D9534F',
  success: '#6FCF97',
  warning: '#F2C572',
  info: '#6EC1E4',
  disabled: '#C1C1C1',
  border: '#E0E0E0',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Clases globales reutilizables
export const GlobalStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: Colors.primary,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 6,
    backgroundColor: Colors.surface,
    color: Colors.text,
    minHeight: 28,
    fontSize: 13,
  },
};

export const baseUrl = "https://api.microtime.com.ar/"

export const paperTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: Colors.accent,
    background: Colors.background,
    surface: Colors.surface,
    error: Colors.error,
    onPrimary: Colors.surface,
    onSurface: Colors.text,
    outline: Colors.border,
    // Puedes agregar más mapeos según lo que uses
  },
};