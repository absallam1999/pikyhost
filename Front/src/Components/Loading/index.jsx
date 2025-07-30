import { useTranslation } from 'react-i18next';
import "./index.scss";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="loading-screen" id="loadingScreen">
      <div className="loading-content">
        <div className="loading-logo">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <text
              x="60"
              y="35"
              fontFamily="Arial"
              fontSize="20"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              PikyHost
            </text>
          </svg>
        </div>
        <div className="loading-spinner"></div>
        <p className="loading-text">{t('loading')}</p>
      </div>
    </div>
  );
}