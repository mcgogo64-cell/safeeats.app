import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './MedicalDisclaimer.css';

function MedicalDisclaimer({ onAccept }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const { t } = useTranslation();

  const handleAccept = () => {
    setIsAccepted(true);
    onAccept();
  };

  if (isAccepted) {
    return null;
  }

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-modal">
        <h2 className="disclaimer-title">{t('disclaimer.title')}</h2>
        <div className="disclaimer-content">
          <p className="disclaimer-text">{t('disclaimer.text')}</p>
          <p className="disclaimer-medical">{t('disclaimer.medicalDisclaimer')}</p>
        </div>
        <button 
          className="disclaimer-accept-btn"
          onClick={handleAccept}
        >
          {t('disclaimer.accept')}
        </button>
      </div>
    </div>
  );
}

export default MedicalDisclaimer;









