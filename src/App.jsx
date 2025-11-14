import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, Clock, AlertTriangle, BarChart3, Heart, HeartOff, Check, AlertCircle } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import SEOHead from './components/SEOHead';
import foodsData from './data/foods.json';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState('general');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [portion, setPortion] = useState(100);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const searchInputRef = useRef(null);
  const { t, i18n } = useTranslation();
  
  // Get current language
  const currentLang = i18n.language || 'en';
  
  // Helper function to get food name in current language
  const getFoodName = (food) => {
    if (food.names && food.names[currentLang]) {
      return food.names[currentLang];
    }
    // Fallback to Turkish name or foodName
    return food.names?.tr || food.foodName;
  };
  
  // Helper function to search in all languages
  const searchFood = (searchTerm, foods) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return foods.find(food => {
      // Search in current language name
      const currentName = getFoodName(food).toLowerCase();
      if (currentName === normalizedSearch || currentName.includes(normalizedSearch)) {
        return true;
      }
      
      // Search in all language names
      if (food.names) {
        const allNames = Object.values(food.names).map(name => name.toLowerCase());
        return allNames.some(name => name === normalizedSearch || name.includes(normalizedSearch));
      }
      
      // Fallback to Turkish name
      const turkishName = (food.names?.tr || food.foodName).toLowerCase();
      return turkishName === normalizedSearch || turkishName.includes(normalizedSearch);
    });
  };

  // Load recent searches and favorites from localStorage
  useEffect(() => {
    const savedRecent = localStorage.getItem('recentSearches');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedRecent) setRecentSearches(JSON.parse(savedRecent));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Autocomplete when user types
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const normalizedSearch = searchTerm.toLowerCase().trim();
      const suggestions = foodsData
        .filter(food => {
          const currentName = getFoodName(food).toLowerCase();
          if (currentName.includes(normalizedSearch)) return true;
          
          // Search in all language names
          if (food.names) {
            const allNames = Object.values(food.names).map(name => name.toLowerCase());
            return allNames.some(name => name.includes(normalizedSearch));
          }
          return false;
        })
        .slice(0, 5)
        .map(food => getFoodName(food));
      setAutocompleteSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setAutocompleteSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, currentLang]);

  // Search for food when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      return;
    }

    const found = searchFood(searchTerm, foodsData);

    if (found) {
      setSearchResults(found);
      // Add to recent searches (current language name)
      const currentName = getFoodName(found);
      const updatedRecent = [currentName, ...recentSearches.filter(item => item !== currentName)].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    } else {
      setSearchResults(null);
    }
  }, [searchTerm, currentLang]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const handleChipClick = (foodName) => {
    setSearchTerm(foodName);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const toggleFavorite = (food) => {
    const currentName = getFoodName(food);
    const newFavorites = isFavorite(food)
      ? favorites.filter(f => {
          // Remove if it matches this food in any language
          const favFood = foodsData.find(fd => getFoodName(fd) === f || fd.names && Object.values(fd.names).includes(f));
          return !favFood || favFood.foodName !== food.foodName;
        })
      : [...favorites, currentName];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (food) => {
    const currentName = getFoodName(food);
    return favorites.some(fav => {
      // Check if favorite matches current name or any language name
      const favFood = foodsData.find(f => getFoodName(f) === fav || f.names && Object.values(f.names).includes(fav));
      return favFood && favFood.foodName === food.foodName;
    });
  };

  const getSugarLevel = (sugar) => {
    if (sugar < 5) return { level: 'low', color: '#4caf50', label: t('sugarLevel.low') };
    if (sugar < 15) return { level: 'medium', color: '#ff9800', label: t('sugarLevel.medium') };
    return { level: 'high', color: '#f44336', label: t('sugarLevel.high') };
  };

  const getDietAdvice = (food, diet) => {
    if (diet === 'general') return null;
    
    const restrictions = food.restrictions || {};
    if (diet === 'keto' && restrictions.lowSugar) {
      return restrictions.lowSugar.status === 1 
        ? { suitable: true, message: t('dietAdvice.ketoSuitable') }
        : { suitable: false, message: t('dietAdvice.ketoNotSuitable') };
    }
    if (diet === 'diabetes' && food.sugarContent !== undefined) {
      return food.sugarContent < 10 
        ? { suitable: true, message: t('dietAdvice.diabetesCaution') }
        : { suitable: false, message: t('dietAdvice.diabetesNotSuitable') };
    }
    if (diet === 'lowcarb' && food.sugarContent !== undefined) {
      return food.sugarContent < 5 
        ? { suitable: true, message: t('dietAdvice.lowcarbSuitable') }
        : { suitable: false, message: t('dietAdvice.lowcarbNotSuitable') };
    }
    if (diet === 'kids' && food.sugarContent !== undefined) {
      return food.sugarContent < 12 
        ? { suitable: true, message: t('dietAdvice.kidsSuitable') }
        : { suitable: false, message: t('dietAdvice.kidsModerate') };
    }
    return null;
  };

  // Get popular foods in current language
  const getPopularFoods = () => {
    const popularFoodKeys = ['Elma', 'Muz', 'Çilek', 'Domates', 'Brokoli', 'Salatalık'];
    return popularFoodKeys.map(key => {
      const food = foodsData.find(f => f.foodName === key || f.names?.tr === key);
      return food ? getFoodName(food) : key;
    });
  };
  
  const popularFoods = getPopularFoods();

  const calculatedSugar = searchResults?.sugarContent 
    ? ((searchResults.sugarContent * portion) / 100).toFixed(1)
    : null;

  const sugarLevel = searchResults?.sugarContent ? getSugarLevel(searchResults.sugarContent) : null;
  const dietAdvice = searchResults ? getDietAdvice(searchResults, selectedDiet) : null;

  return (
    <div className="App">
      <SEOHead />
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">🍎 SafeEats</div>
          <div className="language-selector-container">
            <LanguageSelector />
          </div>
        </div>
      </nav>

      <div className="main-container">
        <div className="content-wrapper">
          <div className="left-column">
            <h1 className="main-title">{t('welcome')}</h1>
            <p className="subtitle">{t('subtitle')}</p>
            
            {/* Diet Filter Buttons */}
            <div className="diet-filters">
              <button 
                className={`diet-filter-btn ${selectedDiet === 'general' ? 'active' : ''}`}
                onClick={() => setSelectedDiet('general')}
              >
                {t('dietFilter.general')}
              </button>
              <button 
                className={`diet-filter-btn ${selectedDiet === 'diabetes' ? 'active' : ''}`}
                onClick={() => setSelectedDiet('diabetes')}
              >
                {t('dietFilter.diabetes')}
              </button>
              <button 
                className={`diet-filter-btn ${selectedDiet === 'keto' ? 'active' : ''}`}
                onClick={() => setSelectedDiet('keto')}
              >
                {t('dietFilter.keto')}
              </button>
              <button 
                className={`diet-filter-btn ${selectedDiet === 'lowcarb' ? 'active' : ''}`}
                onClick={() => setSelectedDiet('lowcarb')}
              >
                {t('dietFilter.lowcarb')}
              </button>
              <button 
                className={`diet-filter-btn ${selectedDiet === 'kids' ? 'active' : ''}`}
                onClick={() => setSelectedDiet('kids')}
              >
                {t('dietFilter.kids')}
              </button>
            </div>
            
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="food-search-input"
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && autocompleteSuggestions.length > 0 && (
                  <div className="autocomplete-dropdown">
                    {autocompleteSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="autocomplete-item"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Popular Foods Chips */}
            {searchTerm.trim() === '' && (
              <div className="popular-foods">
                <p className="section-label">{t('popularFoods')}</p>
                <div className="food-chips">
                  {popularFoods.map((food, idx) => (
                    <button
                      key={idx}
                      className="food-chip"
                      onClick={() => handleChipClick(food)}
                    >
                      {food}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && searchTerm.trim() === '' && (
              <div className="recent-searches">
                <div className="section-header">
                  <p className="section-label">{t('recentSearches')}</p>
                  <button 
                    className="clear-btn-small"
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('recentSearches');
                    }}
                  >
                    {t('clear')}
                  </button>
                </div>
                <div className="food-chips">
                  {recentSearches.map((food, idx) => (
                    <button
                      key={idx}
                      className="food-chip"
                      onClick={() => handleChipClick(food)}
                    >
                      {food}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites */}
            {favorites.length > 0 && searchTerm.trim() === '' && (
              <div className="favorites-section">
                <div className="section-header">
                  <p className="section-label">⭐ {t('favorites')}</p>
                  <button 
                    className="clear-btn-small"
                    onClick={() => {
                      setFavorites([]);
                      localStorage.removeItem('favorites');
                    }}
                  >
                    {t('clear')}
                  </button>
                </div>
                <div className="food-chips">
                  {favorites.map((food, idx) => (
                    <button
                      key={idx}
                      className="food-chip favorite"
                      onClick={() => handleChipClick(food)}
                    >
                      {food}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchTerm.trim() !== '' && !searchResults && (
              <div className="no-results">
                <p>{t('foodNotFound')}</p>
              </div>
            )}
          </div>

          <div className="right-column">
            {searchResults ? (
              <div className="food-result-card">
                <div className="card-header">
                  <div>
                    <h2 className="food-name">{getFoodName(searchResults)}</h2>
                    <div className="food-category">{searchResults.category}</div>
                  </div>
                  <button
                    className={`favorite-btn ${isFavorite(searchResults) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(searchResults)}
                    title={isFavorite(searchResults) ? t('removeFavorite') : t('addFavorite')}
                  >
                    {isFavorite(searchResults) ? (
                      <Heart className="favorite-icon" size={20} fill="#e53e3e" stroke="#e53e3e" />
                    ) : (
                      <HeartOff className="favorite-icon" size={20} />
                    )}
                  </button>
                </div>

                {searchResults.sugarContent !== undefined ? (
                  <>
                    {/* Sugar Level Indicator */}
                    {sugarLevel && (
                      <div className="sugar-level-indicator" style={{ backgroundColor: sugarLevel.color + '20', borderColor: sugarLevel.color }}>
                        <span className="sugar-level-dot" style={{ backgroundColor: sugarLevel.color }}></span>
                        <span className="sugar-level-label">{sugarLevel.label}</span>
                      </div>
                    )}

                    {/* Portion Selector */}
                    <div className="portion-selector">
                      <label>{t('portion')}</label>
                      <div className="portion-buttons">
                        {[100, 150, 200].map(size => (
                          <button
                            key={size}
                            className={`portion-btn ${portion === size ? 'active' : ''}`}
                            onClick={() => setPortion(size)}
                          >
                            {size}g
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sugar Amount */}
                    <div className="sugar-info">
                      <div className="sugar-amount">
                        <span className="sugar-value">{calculatedSugar}</span>
                        <span className="sugar-unit">g / {portion}g</span>
                      </div>
                      <div className="sugar-bar">
                        <div 
                          className="sugar-bar-fill" 
                          style={{ 
                            width: `${Math.min((searchResults.sugarContent / 20) * 100, 100)}%`,
                            backgroundColor: sugarLevel?.color
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Diet Advice */}
                    {dietAdvice && (
                      <div className={`diet-advice ${dietAdvice.suitable ? 'suitable' : 'not-suitable'}`}>
                        <div className="diet-advice-icon-wrapper">
                          {dietAdvice.suitable ? (
                            <Check className="diet-advice-icon" size={20} />
                          ) : (
                            <AlertCircle className="diet-advice-icon" size={20} />
                          )}
                        </div>
                        <span className="diet-advice-text">{dietAdvice.message}</span>
                      </div>
                    )}

                    <div className="sugar-comment">
                      {searchResults.sugarContent < 5 && t('sugarComment.low')}
                      {searchResults.sugarContent >= 5 && searchResults.sugarContent < 10 && t('sugarComment.moderate')}
                      {searchResults.sugarContent >= 10 && searchResults.sugarContent < 15 && t('sugarComment.medium')}
                      {searchResults.sugarContent >= 15 && t('sugarComment.high')}
                    </div>

                    {/* Detailed Information */}
                    {searchResults.comments && (
                      <div className="detailed-info-section">
                        <h3 className="detailed-info-title">{t('detailedInfo')}</h3>

                        {/* Diet Recommendations */}
                        {searchResults.comments.dietRecommendations && searchResults.comments.dietRecommendations[currentLang] && searchResults.comments.dietRecommendations[currentLang].length > 0 && (
                          <div className="info-block">
                            <div className="info-block-header">
                              <div className="info-icon-wrapper">
                                <UtensilsCrossed className="info-icon" size={22} />
                              </div>
                              <h4 className="info-block-title">{t('dietRecommendations')}</h4>
                            </div>
                            <ul className="info-list">
                              {searchResults.comments.dietRecommendations[currentLang].map((rec, idx) => (
                                <li key={idx} className="info-list-item">{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Consumption Timing */}
                        {searchResults.comments.consumptionTiming && searchResults.comments.consumptionTiming[currentLang] && (
                          <div className="info-block">
                            <div className="info-block-header">
                              <div className="info-icon-wrapper">
                                <Clock className="info-icon" size={22} />
                              </div>
                              <h4 className="info-block-title">{t('consumptionTiming')}</h4>
                            </div>
                            <p className="info-text">{searchResults.comments.consumptionTiming[currentLang]}</p>
                          </div>
                        )}

                        {/* Allergy Info */}
                        {searchResults.comments.allergyInfo && searchResults.comments.allergyInfo[currentLang] && (
                          <div className="info-block">
                            <div className="info-block-header">
                              <div className="info-icon-wrapper">
                                <AlertTriangle className="info-icon" size={22} />
                              </div>
                              <h4 className="info-block-title">{t('allergyInfo')}</h4>
                            </div>
                            <p className="info-text">{searchResults.comments.allergyInfo[currentLang]}</p>
                          </div>
                        )}

                        {/* Daily Intake */}
                        {searchResults.comments.dailyIntake && searchResults.comments.dailyIntake[currentLang] && (
                          <div className="info-block">
                            <div className="info-block-header">
                              <div className="info-icon-wrapper">
                                <BarChart3 className="info-icon" size={22} />
                              </div>
                              <h4 className="info-block-title">{t('dailyIntake')}</h4>
                            </div>
                            <p className="info-text daily-intake-text">{searchResults.comments.dailyIntake[currentLang]}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-sugar-data">
                    {t('noSugarData')}
                  </div>
                )}
              </div>
            ) : (
              <div className="info-card">
                <p className="info-text">{t('searchInstructions')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
