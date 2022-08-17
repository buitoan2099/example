import {changeLanguage} from 'i18next';
import {useTranslation as useTranslationI18next} from 'react-i18next';
import {useMemo} from 'react';
import {Theme} from '@components/theme/Types';
import {useTheme as useThemeApp} from '@components/theme/ThemeProvider';

export const useTranslation = () => {
  const {t} = useTranslationI18next();
  return t;
};
export const onChangeLanguage = (lang?: string) => {
  changeLanguage(lang);
};

export const useTheme = () => {
  const theme = useThemeApp();
  return theme;
};

export const useColor = () => {
  const {theme} = useThemeApp();
  return theme?.color;
};

export const useDimension = () => {
  const {theme} = useThemeApp();
  return theme?.dimension;
};

export const useStyleSheet = <T extends {}>(fn: (theme: Theme) => T) => {
  const {theme} = useTheme();
  const ThemeAwareObject = useMemo(() => fn(theme), [fn, theme]);
  return ThemeAwareObject;
};
