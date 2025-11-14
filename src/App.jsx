import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import SEOHead from './components/SEOHead';
import foodsData from './data/foods.json';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const { t } = useTranslation();

  // Search for food when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      return;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const found = foodsData.find(food => 
      food.foodName.toLowerCase() === normalizedSearch ||
      food.foodName.toLowerCase().includes(normalizedSearch)
    );

    setSearchResults(found || null);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <SEOHead />
      <header className="App-header">
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
        <h1>{t('welcome')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
        
        <div className="search-container">
          <input
            type="text"
            className="food-search-input"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {searchResults ? (
          <div className="sugar-analysis">
            <div className="food-result-card">
              <h2 className="food-name">{searchResults.foodName}</h2>
              <div className="food-category">{searchResults.category}</div>
              {searchResults.sugarContent !== undefined ? (
                <div className="sugar-info">
                  <div className="sugar-amount">
                    <span className="sugar-label">{t('sugarContent')}:</span>
                    <span className="sugar-value">{searchResults.sugarContent}</span>
                    <span className="sugar-unit">g/100g</span>
                  </div>
                  <div className="sugar-bar">
                    <div 
                      className="sugar-bar-fill" 
                      style={{ 
                        width: `${Math.min((searchResults.sugarContent / 20) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="sugar-comment">
                    {searchResults.sugarContent < 5 && t('sugarComment.low')}
                    {searchResults.sugarContent >= 5 && searchResults.sugarContent < 10 && t('sugarComment.moderate')}
                    {searchResults.sugarContent >= 10 && searchResults.sugarContent < 15 && t('sugarComment.medium')}
                    {searchResults.sugarContent >= 15 && t('sugarComment.high')}
                  </div>
                </div>
              ) : (
                <div className="no-sugar-data">
                  {t('noSugarData')}
                </div>
              )}
            </div>
          </div>
        ) : searchTerm.trim() !== '' && (
          <div className="no-results">
            <p>{t('foodNotFound')}</p>
          </div>
        )}

        {searchTerm.trim() === '' && (
          <div className="search-instructions">
            <p>{t('searchInstructions')}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
