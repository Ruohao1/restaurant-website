export const fallbackLng = 'fr'; // Fallback language if the user's language is not supported
export const languages = [fallbackLng, 'en', 'zh']; // Supported languages
export const defaultNS = 'common'; // Default namespace for translations
export const cookieName = 'i18next'; // Cookie name to store the language

// Function to detect the user's browser language
export function getLocaleLanguage() {
  // Get the user's preferred language from the browser or use fallbackLng if not supported
  const browserLng = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : fallbackLng;
  return languages.includes(browserLng) ? browserLng : fallbackLng;
}

export function getOptions(lng = getLocaleLanguage(), ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng, // Set to the detected language or fallback
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
