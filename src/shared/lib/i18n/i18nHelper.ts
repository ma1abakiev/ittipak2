import i18n from 'i18next';

export const setLanguage = (lng: string) => {
  if (i18n.language !== lng) { // Проверяем, чтобы избежать лишних вызовов
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }
};

export const getLanguage = (): string => {
  const savedLanguage = localStorage.getItem('language');
  return savedLanguage || 'ru'; // Возвращаем сохраненный язык или язык по умолчанию
};
