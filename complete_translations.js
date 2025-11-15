import fs from 'fs';
import path from 'path';

const localesDir = 'src/i18n/locales';

// TR dosyasını referans olarak al (tam çevrilmiş)
const trFile = JSON.parse(fs.readFileSync(path.join(localesDir, 'tr.json'), 'utf8'));

// EN dosyasını da al
const enFile = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// Çevirileri güncelle
const translations = {
  es: {
    'dietFilter.general': 'General',
    'dietFilter.diabetes': 'Diabetes',
    'dietFilter.keto': 'Keto',
    'dietFilter.lowcarb': 'Bajo Carbohidratos',
    'dietFilter.kids': 'Niños',
    'dietAdvice.ketoSuitable': 'Adecuado para dieta keto',
    'dietAdvice.ketoNotSuitable': 'No adecuado para dieta keto - Alto en carbohidratos',
    'dietAdvice.diabetesCaution': 'Adecuado con precaución para diabetes',
    'dietAdvice.diabetesNotSuitable': 'No recomendado para diabetes - Alto en azúcar',
    'dietAdvice.lowcarbSuitable': 'Adecuado para dieta baja en carbohidratos',
    'dietAdvice.lowcarbNotSuitable': 'No adecuado para dieta baja en carbohidratos',
    'dietAdvice.kidsSuitable': 'Adecuado para niños',
    'dietAdvice.kidsModerate': 'Se recomienda consumo moderado para niños',
    'popularFoods': 'Alimentos Populares',
    'recentSearches': 'Búsquedas Recientes',
    'favorites': 'Favoritos',
    'addFavorite': 'Agregar a Favoritos',
    'removeFavorite': 'Quitar de Favoritos',
    'portion': 'Tamaño de Porción',
    'sugarLevel.low': 'Bajo',
    'sugarLevel.medium': 'Medio',
    'sugarLevel.high': 'Alto'
  },
  fr: {
    'dietFilter.general': 'Général',
    'dietFilter.diabetes': 'Diabète',
    'dietFilter.keto': 'Kéto',
    'dietFilter.lowcarb': 'Faible en Glucides',
    'dietFilter.kids': 'Enfants',
    'dietAdvice.ketoSuitable': 'Adapté au régime kéto',
    'dietAdvice.ketoNotSuitable': 'Non adapté au régime kéto - Riche en glucides',
    'dietAdvice.diabetesCaution': 'Adapté avec précaution pour le diabète',
    'dietAdvice.diabetesNotSuitable': 'Non recommandé pour le diabète - Riche en sucre',
    'dietAdvice.lowcarbSuitable': 'Adapté au régime faible en glucides',
    'dietAdvice.lowcarbNotSuitable': 'Non adapté au régime faible en glucides',
    'dietAdvice.kidsSuitable': 'Adapté aux enfants',
    'dietAdvice.kidsModerate': 'Consommation modérée recommandée pour les enfants',
    'popularFoods': 'Aliments Populaires',
    'recentSearches': 'Recherches Récentes',
    'favorites': 'Favoris',
    'addFavorite': 'Ajouter aux Favoris',
    'removeFavorite': 'Retirer des Favoris',
    'portion': 'Taille de Portion',
    'sugarLevel.low': 'Faible',
    'sugarLevel.medium': 'Moyen',
    'sugarLevel.high': 'Élevé'
  },
  de: {
    'dietFilter.general': 'Allgemein',
    'dietFilter.diabetes': 'Diabetes',
    'dietFilter.keto': 'Keto',
    'dietFilter.lowcarb': 'Kohlenhydratarm',
    'dietFilter.kids': 'Kinder',
    'dietAdvice.ketoSuitable': 'Geeignet für Keto-Diät',
    'dietAdvice.ketoNotSuitable': 'Nicht geeignet für Keto-Diät - Hohe Kohlenhydrate',
    'dietAdvice.diabetesCaution': 'Mit Vorsicht geeignet für Diabetes',
    'dietAdvice.diabetesNotSuitable': 'Nicht empfohlen für Diabetes - Hoher Zucker',
    'dietAdvice.lowcarbSuitable': 'Geeignet für kohlenhydratarme Diät',
    'dietAdvice.lowcarbNotSuitable': 'Nicht geeignet für kohlenhydratarme Diät',
    'dietAdvice.kidsSuitable': 'Geeignet für Kinder',
    'dietAdvice.kidsModerate': 'Moderater Verzehr für Kinder empfohlen',
    'popularFoods': 'Beliebte Lebensmittel',
    'recentSearches': 'Letzte Suche',
    'favorites': 'Favoriten',
    'addFavorite': 'Zu Favoriten hinzufügen',
    'removeFavorite': 'Aus Favoriten entfernen',
    'portion': 'Portionsgröße',
    'sugarLevel.low': 'Niedrig',
    'sugarLevel.medium': 'Mittel',
    'sugarLevel.high': 'Hoch'
  },
  it: {
    'dietFilter.general': 'Generale',
    'dietFilter.diabetes': 'Diabete',
    'dietFilter.keto': 'Keto',
    'dietFilter.lowcarb': 'Basso Contenuto di Carboidrati',
    'dietFilter.kids': 'Bambini',
    'dietAdvice.ketoSuitable': 'Adatto alla dieta chetogenica',
    'dietAdvice.ketoNotSuitable': 'Non adatto alla dieta chetogenica - Alto contenuto di carboidrati',
    'dietAdvice.diabetesCaution': 'Adatto con cautela per il diabete',
    'dietAdvice.diabetesNotSuitable': 'Non raccomandato per il diabete - Alto contenuto di zucchero',
    'dietAdvice.lowcarbSuitable': 'Adatto alla dieta a basso contenuto di carboidrati',
    'dietAdvice.lowcarbNotSuitable': 'Non adatto alla dieta a basso contenuto di carboidrati',
    'dietAdvice.kidsSuitable': 'Adatto ai bambini',
    'dietAdvice.kidsModerate': 'Consumo moderato raccomandato per i bambini',
    'popularFoods': 'Alimenti Popolari',
    'recentSearches': 'Ricerche Recenti',
    'favorites': 'Preferiti',
    'addFavorite': 'Aggiungi ai Preferiti',
    'removeFavorite': 'Rimuovi dai Preferiti',
    'portion': 'Dimensione della Porzione',
    'sugarLevel.low': 'Basso',
    'sugarLevel.medium': 'Medio',
    'sugarLevel.high': 'Alto'
  },
  pt: {
    'dietFilter.general': 'Geral',
    'dietFilter.diabetes': 'Diabetes',
    'dietFilter.keto': 'Cetogênica',
    'dietFilter.lowcarb': 'Baixo Carboidrato',
    'dietFilter.kids': 'Crianças',
    'dietAdvice.ketoSuitable': 'Adequado para dieta cetogênica',
    'dietAdvice.ketoNotSuitable': 'Não adequado para dieta cetogênica - Alto teor de carboidratos',
    'dietAdvice.diabetesCaution': 'Adequado com cautela para diabetes',
    'dietAdvice.diabetesNotSuitable': 'Não recomendado para diabetes - Alto teor de açúcar',
    'dietAdvice.lowcarbSuitable': 'Adequado para dieta baixa em carboidratos',
    'dietAdvice.lowcarbNotSuitable': 'Não adequado para dieta baixa em carboidratos',
    'dietAdvice.kidsSuitable': 'Adequado para crianças',
    'dietAdvice.kidsModerate': 'Consumo moderado recomendado para crianças',
    'popularFoods': 'Alimentos Populares',
    'recentSearches': 'Pesquisas Recentes',
    'favorites': 'Favoritos',
    'addFavorite': 'Adicionar aos Favoritos',
    'removeFavorite': 'Remover dos Favoritos',
    'portion': 'Tamanho da Porção',
    'sugarLevel.low': 'Baixo',
    'sugarLevel.medium': 'Médio',
    'sugarLevel.high': 'Alto'
  },
  ru: {
    'dietFilter.general': 'Общий',
    'dietFilter.diabetes': 'Диабет',
    'dietFilter.keto': 'Кето',
    'dietFilter.lowcarb': 'Низкоуглеводная',
    'dietFilter.kids': 'Дети',
    'dietAdvice.ketoSuitable': 'Подходит для кето-диеты',
    'dietAdvice.ketoNotSuitable': 'Не подходит для кето-диеты - Высокое содержание углеводов',
    'dietAdvice.diabetesCaution': 'Подходит с осторожностью при диабете',
    'dietAdvice.diabetesNotSuitable': 'Не рекомендуется при диабете - Высокое содержание сахара',
    'dietAdvice.lowcarbSuitable': 'Подходит для низкоуглеводной диеты',
    'dietAdvice.lowcarbNotSuitable': 'Не подходит для низкоуглеводной диеты',
    'dietAdvice.kidsSuitable': 'Подходит для детей',
    'dietAdvice.kidsModerate': 'Рекомендуется умеренное потребление для детей',
    'popularFoods': 'Популярные Продукты',
    'recentSearches': 'Недавние Поиски',
    'favorites': 'Избранное',
    'addFavorite': 'Добавить в Избранное',
    'removeFavorite': 'Удалить из Избранного',
    'portion': 'Размер Порции',
    'sugarLevel.low': 'Низкий',
    'sugarLevel.medium': 'Средний',
    'sugarLevel.high': 'Высокий'
  },
  zh: {
    'dietFilter.general': '通用',
    'dietFilter.diabetes': '糖尿病',
    'dietFilter.keto': '生酮',
    'dietFilter.lowcarb': '低碳水',
    'dietFilter.kids': '儿童',
    'dietAdvice.ketoSuitable': '适合生酮饮食',
    'dietAdvice.ketoNotSuitable': '不适合生酮饮食 - 高碳水',
    'dietAdvice.diabetesCaution': '糖尿病患者需谨慎食用',
    'dietAdvice.diabetesNotSuitable': '不建议糖尿病患者食用 - 高糖',
    'dietAdvice.lowcarbSuitable': '适合低碳水饮食',
    'dietAdvice.lowcarbNotSuitable': '不适合低碳水饮食',
    'dietAdvice.kidsSuitable': '适合儿童',
    'dietAdvice.kidsModerate': '建议儿童适量食用',
    'popularFoods': '热门食物',
    'recentSearches': '最近搜索',
    'favorites': '收藏',
    'addFavorite': '添加到收藏',
    'removeFavorite': '从收藏中移除',
    'portion': '份量',
    'sugarLevel.low': '低',
    'sugarLevel.medium': '中',
    'sugarLevel.high': '高'
  },
  ja: {
    'dietFilter.general': '一般',
    'dietFilter.diabetes': '糖尿病',
    'dietFilter.keto': 'ケト',
    'dietFilter.lowcarb': '低炭水化物',
    'dietFilter.kids': '子供',
    'dietAdvice.ketoSuitable': 'ケトジェニックダイエットに適しています',
    'dietAdvice.ketoNotSuitable': 'ケトジェニックダイエットに適していません - 高炭水化物',
    'dietAdvice.diabetesCaution': '糖尿病患者は注意して摂取できます',
    'dietAdvice.diabetesNotSuitable': '糖尿病患者には推奨されません - 高糖質',
    'dietAdvice.lowcarbSuitable': '低炭水化物ダイエットに適しています',
    'dietAdvice.lowcarbNotSuitable': '低炭水化物ダイエットに適していません',
    'dietAdvice.kidsSuitable': '子供に適しています',
    'dietAdvice.kidsModerate': '子供には適度な摂取が推奨されます',
    'popularFoods': '人気の食べ物',
    'recentSearches': '最近の検索',
    'favorites': 'お気に入り',
    'addFavorite': 'お気に入りに追加',
    'removeFavorite': 'お気に入りから削除',
    'portion': '分量',
    'sugarLevel.low': '低',
    'sugarLevel.medium': '中',
    'sugarLevel.high': '高'
  },
  ko: {
    'dietFilter.general': '일반',
    'dietFilter.diabetes': '당뇨병',
    'dietFilter.keto': '케토',
    'dietFilter.lowcarb': '저탄수화물',
    'dietFilter.kids': '어린이',
    'dietAdvice.ketoSuitable': '케토 다이어트에 적합합니다',
    'dietAdvice.ketoNotSuitable': '케토 다이어트에 적합하지 않습니다 - 고탄수화물',
    'dietAdvice.diabetesCaution': '당뇨병 환자는 주의하여 섭취할 수 있습니다',
    'dietAdvice.diabetesNotSuitable': '당뇨병 환자에게 권장되지 않습니다 - 고당',
    'dietAdvice.lowcarbSuitable': '저탄수화물 다이어트에 적합합니다',
    'dietAdvice.lowcarbNotSuitable': '저탄수화물 다이어트에 적합하지 않습니다',
    'dietAdvice.kidsSuitable': '어린이에게 적합합니다',
    'dietAdvice.kidsModerate': '어린이에게는 적당한 섭취가 권장됩니다',
    'popularFoods': '인기 음식',
    'recentSearches': '최근 검색',
    'favorites': '즐겨찾기',
    'addFavorite': '즐겨찾기에 추가',
    'removeFavorite': '즐겨찾기에서 제거',
    'portion': '분량',
    'sugarLevel.low': '낮음',
    'sugarLevel.medium': '중간',
    'sugarLevel.high': '높음'
  },
  hi: {
    'dietFilter.general': 'सामान्य',
    'dietFilter.diabetes': 'मधुमेह',
    'dietFilter.keto': 'कीटो',
    'dietFilter.lowcarb': 'कम कार्बोहाइड्रेट',
    'dietFilter.kids': 'बच्चे',
    'dietAdvice.ketoSuitable': 'कीटो आहार के लिए उपयुक्त',
    'dietAdvice.ketoNotSuitable': 'कीटो आहार के लिए उपयुक्त नहीं - उच्च कार्बोहाइड्रेट',
    'dietAdvice.diabetesCaution': 'मधुमेह के लिए सावधानी के साथ उपयुक्त',
    'dietAdvice.diabetesNotSuitable': 'मधुमेह के लिए अनुशंसित नहीं - उच्च चीनी',
    'dietAdvice.lowcarbSuitable': 'कम कार्बोहाइड्रेट आहार के लिए उपयुक्त',
    'dietAdvice.lowcarbNotSuitable': 'कम कार्बोहाइड्रेट आहार के लिए उपयुक्त नहीं',
    'dietAdvice.kidsSuitable': 'बच्चों के लिए उपयुक्त',
    'dietAdvice.kidsModerate': 'बच्चों के लिए मध्यम खपत की सिफारिश की जाती है',
    'popularFoods': 'लोकप्रिय खाद्य पदार्थ',
    'recentSearches': 'हाल की खोजें',
    'favorites': 'पसंदीदा',
    'addFavorite': 'पसंदीदा में जोड़ें',
    'removeFavorite': 'पसंदीदा से हटाएं',
    'portion': 'भाग का आकार',
    'sugarLevel.low': 'कम',
    'sugarLevel.medium': 'मध्यम',
    'sugarLevel.high': 'उच्च'
  },
  ar: {
    'dietFilter.general': 'عام',
    'dietFilter.diabetes': 'السكري',
    'dietFilter.keto': 'الكيتو',
    'dietFilter.lowcarb': 'قليل الكربوهيدرات',
    'dietFilter.kids': 'الأطفال',
    'dietAdvice.ketoSuitable': 'مناسب لنظام الكيتو الغذائي',
    'dietAdvice.ketoNotSuitable': 'غير مناسب لنظام الكيتو الغذائي - عالي الكربوهيدرات',
    'dietAdvice.diabetesCaution': 'مناسب بحذر لمرضى السكري',
    'dietAdvice.diabetesNotSuitable': 'غير موصى به لمرضى السكري - عالي السكر',
    'dietAdvice.lowcarbSuitable': 'مناسب لنظام غذائي منخفض الكربوهيدرات',
    'dietAdvice.lowcarbNotSuitable': 'غير مناسب لنظام غذائي منخفض الكربوهيدرات',
    'dietAdvice.kidsSuitable': 'مناسب للأطفال',
    'dietAdvice.kidsModerate': 'يُنصح باستهلاك معتدل للأطفال',
    'popularFoods': 'الأطعمة الشائعة',
    'recentSearches': 'البحوث الأخيرة',
    'favorites': 'المفضلة',
    'addFavorite': 'إضافة إلى المفضلة',
    'removeFavorite': 'إزالة من المفضلة',
    'portion': 'حجم الحصة',
    'sugarLevel.low': 'منخفض',
    'sugarLevel.medium': 'متوسط',
    'sugarLevel.high': 'عالٍ'
  }
};

// Helper function to set nested key
function setNestedKey(obj, key, value) {
  const keys = key.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

// Tüm dilleri güncelle
Object.keys(translations).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const file = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  Object.keys(translations[lang]).forEach(key => {
    setNestedKey(file, key, translations[lang][key]);
  });
  
  fs.writeFileSync(filePath, JSON.stringify(file, null, 2) + '\n', 'utf8');
  console.log(`✓ ${lang.toUpperCase()} çevirileri tamamlandı`);
});

console.log('\n✅ TÜM DİLLER OPTİMİZE EDİLDİ!');

