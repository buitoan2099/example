import vn from './vn.json';
import en from './en.json';
export {vn, en};
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  vn: {
    translation: vn,
  },
  en: {
    translation: en,
  },
};

const list_lang = Object.keys(resources);
const default_lang = list_lang[0];
export const languageInit = {
  // debug: true,
  resources,
  fallbackLng: default_lang,
  compatibilityJSON: 'v3',
  react: {useSuspense: false},
};

i18next.use(initReactI18next).init({
  // debug: true,
  resources,
  fallbackLng: default_lang,
  compatibilityJSON: 'v3',
  react: {useSuspense: false},
});
export {i18next, resources, list_lang, default_lang};

export type TypeLanguage = {
  id: number;
  title: string;
  value: string;
  icon?: string;
};

export const dataLanguage: TypeLanguage[] = [
  {
    id: 1,
    title: 'VN',
    value: 'vn',
    // icon: IconsSvg.flagVN,
  },
  {
    id: 2,
    title: 'ENG',
    value: 'en',
  },
];
