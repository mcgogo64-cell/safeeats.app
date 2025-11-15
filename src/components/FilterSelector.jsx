import { useTranslation } from 'react-i18next';
import './FilterSelector.css';

const FILTERS = [
  { key: 'lowSugar', labelKey: 'filters.lowSugar' },
  { key: 'lowHistamine', labelKey: 'filters.lowHistamine' },
  { key: 'lowFODMAP', labelKey: 'filters.lowFODMAP' },
  { key: 'lowAcid', labelKey: 'filters.lowAcid' },
];

function FilterSelector({ selectedFilters, onFilterChange }) {
  const { t } = useTranslation();

  const handleFilterToggle = (filterKey) => {
    if (selectedFilters.includes(filterKey)) {
      onFilterChange(selectedFilters.filter(f => f !== filterKey));
    } else {
      onFilterChange([...selectedFilters, filterKey]);
    }
  };

  return (
    <div className="filter-selector">
      <h2 className="filter-title">{t('myRestrictions')}</h2>
      <div className="filter-checkboxes">
        {FILTERS.map((filter) => (
          <label key={filter.key} className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={selectedFilters.includes(filter.key)}
              onChange={() => handleFilterToggle(filter.key)}
              className="filter-checkbox"
            />
            <span>{t(filter.labelKey)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterSelector;







