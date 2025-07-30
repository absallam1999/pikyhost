import { useSectionWithItems } from './../../Hooks/SectionItems';
import { useTranslation } from 'react-i18next';
import './index.scss';

export default function Footer() {
  const { i18n } = useTranslation();
  const { data, isLoading } = useSectionWithItems('footer-section');

  if (isLoading) return <div>Loading...</div>;
  if (!data || !data.section) return null;

  return (
    <footer className="footer-modern" data-aos="fade-up">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="assets/logo.svg" alt="Logo" width="130" height="50" />
            <p>{i18n.language === 'ar' ? data.section.subtitle_ar : data.section.subtitle_en}</p>
          </div>
        </div>

        {data.items.length > 0 && (
          <div className="footer-bottom">
            {data.items.map((item) => (
              <p key={item.id}>
                {i18n.language === 'ar' ? item.subtitle_ar : item.subtitle_en}
              </p>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
