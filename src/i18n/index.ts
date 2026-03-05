import es from './es.json';
import en from './en.json';
import de from './de.json';

const translations = { es, en, de };

export type Lang = 'es' | 'en' | 'de';

export function getLang(url: URL): Lang {
  const path = url.pathname.split('/')[1];
  if (path === 'en' || path === 'de') return path;
  return 'es';
}

export function useTranslations(lang: Lang) {
  return translations[lang];
}