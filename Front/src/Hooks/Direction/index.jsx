import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useHtmlDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.lang = i18n.language;
    body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
}

export default useHtmlDirection;