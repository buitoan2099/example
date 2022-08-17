import DarkMode from './DarkMode';
import LightMode from './LightMode';
import {ThemeOptions} from './Types';

const themeMode = {
  light: LightMode,
  dark: DarkMode,
  normal: LightMode,
};

export const themeInit = {
  debug: true,
  resources: themeMode,
  themeDefault: themeMode.normal,
} as ThemeOptions;
