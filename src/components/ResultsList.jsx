import { useTranslation } from 'react-i18next';
import './ResultsList.css';

const STATUS_ICONS = {
  1: '✅',
  2: '⚠️',
  3: '❌',
};

const STATUS_LABELS = {
  1: 'safe',
  2: 'caution',
  3: 'avoid',
};

function ResultsList({ results }) {
  const { t } = useTranslation();

  if (!results || results.length === 0) {
    return (
      <div className="results-empty">
        <p>{t('noResults')}</p>
      </div>
    );
  }

  // Group results by status
  const groupedResults = {
    safe: results.filter(r => r.overallStatus === 1),
    caution: results.filter(r => r.overallStatus === 2),
    avoid: results.filter(r => r.overallStatus === 3),
  };

  return (
    <div className="results-list">
      {groupedResults.safe.length > 0 && (
        <div className="result-group safe-group">
          <h3 className="result-group-title">
            <span className="status-icon">✅</span> {t('safe')}
          </h3>
          <div className="result-items">
            {groupedResults.safe.map((food) => (
              <div key={food.foodName} className="result-item">
                <div className="food-name">{food.foodName}</div>
                <div className="food-category">{food.category}</div>
                {food.restrictionNotes.length > 0 && (
                  <div className="food-notes">
                    {food.restrictionNotes.map((note, idx) => (
                      <div key={idx} className="note-item">{note}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedResults.caution.length > 0 && (
        <div className="result-group caution-group">
          <h3 className="result-group-title">
            <span className="status-icon">⚠️</span> {t('caution')}
          </h3>
          <div className="result-items">
            {groupedResults.caution.map((food) => (
              <div key={food.foodName} className="result-item">
                <div className="food-name">{food.foodName}</div>
                <div className="food-category">{food.category}</div>
                {food.restrictionNotes.length > 0 && (
                  <div className="food-notes">
                    {food.restrictionNotes.map((note, idx) => (
                      <div key={idx} className="note-item">{note}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {groupedResults.avoid.length > 0 && (
        <div className="result-group avoid-group">
          <h3 className="result-group-title">
            <span className="status-icon">❌</span> {t('avoid')}
          </h3>
          <div className="result-items">
            {groupedResults.avoid.map((food) => (
              <div key={food.foodName} className="result-item">
                <div className="food-name">{food.foodName}</div>
                <div className="food-category">{food.category}</div>
                {food.restrictionNotes.length > 0 && (
                  <div className="food-notes">
                    {food.restrictionNotes.map((note, idx) => (
                      <div key={idx} className="note-item">{note}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsList;







