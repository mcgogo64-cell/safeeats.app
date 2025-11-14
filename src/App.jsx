import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import FilterSelector from './components/FilterSelector';
import ResultsList from './components/ResultsList';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import SEOHead from './components/SEOHead';
import { filterFoods } from './utils/filterLogic';
import foodsData from './data/foods.json';
import './App.css';

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const { t } = useTranslation();

  // Check if disclaimer was accepted before (stored in localStorage)
  useEffect(() => {
    const accepted = localStorage.getItem('disclaimerAccepted') === 'true';
    setDisclaimerAccepted(accepted);
  }, []);

  // Filter foods when selectedFilters change
  useEffect(() => {
    if (selectedFilters.length > 0) {
      const results = filterFoods(foodsData, selectedFilters);
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [selectedFilters]);

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    localStorage.setItem('disclaimerAccepted', 'true');
  };

  const handleClear = () => {
    setSelectedFilters([]);
    setFilteredResults([]);
  };

  if (!disclaimerAccepted) {
    return <MedicalDisclaimer onAccept={handleDisclaimerAccept} />;
  }

  return (
    <div className="App">
      <SEOHead />
      <header className="App-header">
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
        <h1>{t('welcome')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
        
        <FilterSelector
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
        />

        {selectedFilters.length > 0 && (
          <div className="action-buttons">
            <button 
              className="clear-btn"
              onClick={handleClear}
            >
              {t('clear')}
            </button>
          </div>
        )}

        {selectedFilters.length === 0 && (
          <p className="info">{t('selectFilters')}</p>
        )}

        {filteredResults.length > 0 && (
          <ResultsList results={filteredResults} />
        )}
      </header>
    </div>
  );
}

export default App;
