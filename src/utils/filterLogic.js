/**
 * Filter foods based on selected restrictions
 * Logic: For a food to be "Safe" (✅), it must be status 1 (✅) for ALL selected filters
 * For "Caution" (⚠️), at least one filter must be status 2 (⚠️) and none status 3 (❌)
 * For "Avoid" (❌), at least one filter must be status 3 (❌)
 */
export function filterFoods(foods, selectedFilters) {
  if (!selectedFilters || selectedFilters.length === 0) {
    return [];
  }

  return foods.map(food => {
    // Get statuses for selected filters only
    const relevantStatuses = selectedFilters
      .map(filterKey => food.restrictions[filterKey]?.status)
      .filter(status => status !== undefined);

    // Collect notes for relevant restrictions
    const restrictionNotes = selectedFilters
      .map(filterKey => {
        const restriction = food.restrictions[filterKey];
        if (restriction && restriction.note) {
          const filterName = getFilterDisplayName(filterKey);
          return `${filterName}: ${restriction.note}`;
        }
        return null;
      })
      .filter(note => note !== null);

    // Determine overall status
    // If any restriction is status 3 (❌), overall is ❌
    if (relevantStatuses.some(status => status === 3)) {
      return {
        ...food,
        overallStatus: 3, // ❌ Avoid
        restrictionNotes,
      };
    }

    // If all are status 1 (✅), overall is ✅
    if (relevantStatuses.every(status => status === 1)) {
      return {
        ...food,
        overallStatus: 1, // ✅ Safe
        restrictionNotes,
      };
    }

    // Otherwise, it's ⚠️ Caution (mix of 1 and 2)
    return {
      ...food,
      overallStatus: 2, // ⚠️ Caution
      restrictionNotes,
    };
  }).filter(food => {
    // Only return foods that have data for all selected filters
    return selectedFilters.every(filterKey => food.restrictions[filterKey] !== undefined);
  }).sort((a, b) => {
    // Sort by status (Safe first, then Caution, then Avoid)
    return a.overallStatus - b.overallStatus;
  });
}

function getFilterDisplayName(filterKey) {
  const names = {
    lowSugar: 'Keto',
    lowHistamine: 'Histamin',
    lowFODMAP: 'FODMAP',
    lowAcid: 'GERD',
  };
  return names[filterKey] || filterKey;
}




