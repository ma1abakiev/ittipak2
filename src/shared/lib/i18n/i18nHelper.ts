import i18n from 'i18next';
import { setCookie, getCookie } from 'typescript-cookie';

export const setLanguage = (lng: string) => {
  if (i18n.language !== lng) { // Проверяем, чтобы избежать лишних вызовов
    i18n.changeLanguage(lng);
    setCookie('language', lng, { expires: 365 }); // Сохраняем язык в cookie на 365 дней
  }
};

export const getLanguage = (): string => {
  const savedLanguage = getCookie('language');
  return savedLanguage || 'ru'; // Возвращаем сохраненный язык или язык по умолчанию
};
