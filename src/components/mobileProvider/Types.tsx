import {ThemeOptions} from '@components/theme/Types';
import {i18n} from 'i18next';
import {ReactNode} from 'react';

export interface ProviderProps {
  children: ReactNode;
  i18next: i18n;
  theme: ThemeOptions;
  backgroundColor?: string;
}
