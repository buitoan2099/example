import {DimensionType} from '@commons';
import {ReactNode} from 'react';
import {ColorTheme} from 'src/commons/types';

export interface Theme {
  id: string;
  color: ColorTheme;
  dimension: DimensionType;
}

export interface ThemeValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  changeTheme: (id: string) => void;
}

export interface ThemeOptions {
  debug?: boolean;
  resources: Record<string, Theme>;
  themeDefault: Theme;
}

export interface ThemeValueContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  changeTheme: (id: string) => void;
}

export interface ThemeProps {
  initial: ThemeOptions;
  children?: ReactNode;
}
