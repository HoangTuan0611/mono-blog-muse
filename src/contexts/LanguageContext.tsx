
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { en } from '@/locales/en';
import { fr } from '@/locales/fr';
import { es } from '@/locales/es';

type Language = 'en' | 'fr' | 'es';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: Record<Language, Translations>;
}

const translations = {
  en,
  fr,
  es
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
