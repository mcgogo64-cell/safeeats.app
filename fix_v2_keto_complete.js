import fs from 'fs';

const foods = JSON.parse(fs.readFileSync('src/data/foods.json', 'utf8'));

// V2 kategorileri
const v2Categories = ["Et", "Süt Ürünleri", "Tahıl", "Atıştırmalık", "İşlenmiş"];

// Özel kurallar ve istisnalar
const specialRules = {
  // Süt Ürünleri - Laktoz içerenler keto için uygun değil
  "Süt Ürünleri": {
    // Keto uygun olanlar (laktoz içermeyen veya çok düşük laktoz)
    ketoFriendly: {
      "Tereyağı": { status: 1, note: "Keto diyet için mükemmel - Yağ kaynağı" },
      "Butter": { status: 1, note: "Perfect for Keto diet - Fat source" },
      "Yağlı Peynir": { status: 1, note: "Yüksek yağ, düşük karbonhidrat - Keto uygun" },
      "Cheddar Peyniri": { status: 1, note: "Keto diyet için uygun" },
      "Mozzarella": { status: 1, note: "Keto diyet için uygun" },
      "Kaşar Peyniri": { status: 1, note: "Keto diyet için uygun" },
      "Cream Cheese": { status: 1, note: "Keto diyet için uygun" },
      "Krema": { status: 1, note: "Keto diyet için mükemmel" },
      "Heavy Cream": { status: 1, note: "Perfect for Keto diet" },
      "Sour Cream": { status: 1, note: "Keto diyet için uygun - Dikkatli porsiyon" },
      "Ricotta": { status: 1, note: "Keto diyet için uygun - Dikkatli porsiyon" },
      "Mascarpone": { status: 1, note: "Keto diyet için mükemmel" },
      "Parmesan": { status: 1, note: "Keto diyet için uygun" },
      "Brie": { status: 1, note: "Keto diyet için uygun" },
      "Gouda": { status: 1, note: "Keto diyet için uygun" },
      "Feta": { status: 1, note: "Keto diyet için uygun" }
    },
    // Keto uygun OLMAYANLAR (laktoz içerenler)
    notKeto: {
      "Tam Yağlı Süt": { status: 3, note: "Laktoz içerir - Keto için uygun değil" },
      "Whole Milk": { status: 3, note: "Contains lactose - Not suitable for Keto" },
      "Yağsız Süt": { status: 3, note: "Laktoz içerir - Keto için uygun değil" },
      "Skim Milk": { status: 3, note: "Contains lactose - Not suitable for Keto" },
      "Yoğurt": { status: 3, note: "Laktoz ve şeker içerir - Keto için uygun değil" },
      "Yogurt": { status: 3, note: "Contains lactose and sugar - Not suitable for Keto" },
      "Süzme Yoğurt": { status: 3, note: "Laktoz içerir - Keto için uygun değil" },
      "Greek Yogurt": { status: 3, note: "Contains lactose - Not suitable for Keto" },
      "Ayran": { status: 3, note: "Laktoz içerir - Keto için uygun değil" },
      "Buttermilk": { status: 3, note: "Contains lactose - Not suitable for Keto" },
      "Kefir": { status: 3, note: "Laktoz içerir - Keto için uygun değil" },
      "Kefir": { status: 3, note: "Contains lactose - Not suitable for Keto" },
      "Dondurma": { status: 3, note: "Yüksek şeker - Keto için uygun değil" },
      "Ice Cream": { status: 3, note: "High sugar - Not suitable for Keto" },
      "Meyveli Yoğurt": { status: 3, note: "Yüksek şeker - Keto için uygun değil" },
      "Fruit Yogurt": { status: 3, note: "High sugar - Not suitable for Keto" },
      "Çikolatalı Süt": { status: 3, note: "Yüksek şeker - Keto için uygun değil" },
      "Chocolate Milk": { status: 3, note: "High sugar - Not suitable for Keto" }
    }
  },
  
  // Et Ürünleri - Genelde uygun ama işlenmişler dikkatli
  "Et": {
    processed: {
      "Sosis": { status: 2, note: "İşlenmiş et ürünü - Porsiyonu sınırlayın" },
      "Sucuk": { status: 2, note: "İşlenmiş et ürünü - Porsiyonu sınırlayın" },
      "Pastırma": { status: 1, note: "İşlenmiş ama genelde keto uygun" },
      "Bacon": { status: 1, note: "İşlenmiş ama genelde keto uygun - Yüksek yağ" }
    }
  },
  
  // İşlenmiş - Bitter çikolata hariç çoğu uygun değil
  "İşlenmiş": {
    // Bitter çikolata %85+ kakao ise keto uygun
    "Bitter Çikolata": { status: 1, note: "%85+ kakao - Keto uygun, porsiyona dikkat" },
    "Dark Chocolate": { status: 1, note: "%85+ cocoa - Keto suitable, watch portion" },
    // Diğer işlenmiş ürünler genelde uygun değil
    defaultStatus: 3
  }
};

function updateFoodKeto(food) {
  const category = food.category;
  const foodName = food.foodName;
  const foodNameEn = food.names?.en || foodName;
  const carbs = food.carbs || 0;
  const sugar = food.sugarContent || 0;
  
  if (!v2Categories.includes(category)) {
    return; // V2 kategorisi değilse atla
  }
  
  // Özel kuralları kontrol et
  if (specialRules[category]) {
    const rules = specialRules[category];
    
    // Keto-friendly listesi varsa kontrol et
    if (rules.ketoFriendly) {
      if (rules.ketoFriendly[foodName] || rules.ketoFriendly[foodNameEn]) {
        const rule = rules.ketoFriendly[foodName] || rules.ketoFriendly[foodNameEn];
        food.restrictions.lowSugar = {
          status: rule.status,
          note: rule.note || ""
        };
        return;
      }
    }
    
    // Not keto listesi varsa kontrol et
    if (rules.notKeto) {
      if (rules.notKeto[foodName] || rules.notKeto[foodNameEn]) {
        const rule = rules.notKeto[foodName] || rules.notKeto[foodNameEn];
        food.restrictions.lowSugar = {
          status: rule.status,
          note: rule.note || ""
        };
        return;
      }
    }
    
    // İşlenmiş et kontrolü
    if (rules.processed) {
      if (rules.processed[foodName] || rules.processed[foodNameEn]) {
        const rule = rules.processed[foodName] || rules.processed[foodNameEn];
        food.restrictions.lowSugar = {
          status: rule.status,
          note: rule.note || ""
        };
        return;
      }
    }
    
    // Özel isim kontrolü (ör. bitter çikolata)
    if (rules[foodName] || rules[foodNameEn]) {
      const rule = rules[foodName] || rules[foodNameEn];
      food.restrictions.lowSugar = {
        status: rule.status,
        note: rule.note || ""
      };
      return;
    }
  }
  
  // Kategoriye göre genel kurallar
  if (category === "Et") {
    // Et ürünleri: Karbonhidrat 0-2g ise uygun
    if (carbs === 0 || carbs < 3) {
      food.restrictions.lowSugar = {
        status: 1,
        note: "Keto diyet için uygun"
      };
    } else {
      food.restrictions.lowSugar = {
        status: 2,
        note: "İşlenmiş et ürünü - Porsiyonu sınırlayın"
      };
    }
  } else if (category === "Tahıl") {
    // Tahıllar: Genelde uygun değil (yüksek karbonhidrat)
    food.restrictions.lowSugar = {
      status: 3,
      note: carbs > 20 ? "Yüksek karbonhidrat - Keto için uygun değil" : "Keto için uygun değil"
    };
  } else if (category === "Atıştırmalık") {
    // Atıştırmalıklar: Kuruyemişler uygun (porsiyona dikkat), diğerleri değil
    const nuts = ["Ceviz", "Walnut", "Badem", "Almond", "Fındık", "Hazelnut", 
                  "Pecan", "Macadamia", "Brezilya Cevizi", "Brazil Nut",
                  "Chia Tohumu", "Chia Seeds", "Keten Tohumu", "Flax Seeds",
                  "Kabak Çekirdeği", "Pumpkin Seeds", "Ay Çekirdeği", "Sunflower Seeds"];
    
    if (nuts.includes(foodName) || nuts.includes(foodNameEn)) {
      // Kuruyemişler: Net karbonhidrat düşük (lif yüksek) olduğu için keto uygun
      // Ancak porsiyona dikkat edilmeli (genelde 20-30g net karbonhidrat)
      const netCarbs = carbs > 20 ? carbs - 10 : carbs; // Lif hesabı (yaklaşık)
      if (netCarbs < 10) {
        food.restrictions.lowSugar = {
          status: 1,
          note: "Yağlı kuruyemiş - Keto uygun, porsiyona dikkat"
        };
      } else {
        food.restrictions.lowSugar = {
          status: 2,
          note: "Keto için dikkatli tüketin - Porsiyonu sınırlayın"
        };
      }
    } else if (carbs > 10 || sugar > 5) {
      // Cips, kraker, çikolata gibi ürünler
      food.restrictions.lowSugar = {
        status: 3,
        note: "Yüksek karbonhidrat - Keto için uygun değil"
      };
    } else {
      food.restrictions.lowSugar = {
        status: 2,
        note: "Keto için dikkatli tüketin"
      };
    }
  } else if (category === "İşlenmiş") {
    // İşlenmiş ürünler: Genelde uygun değil (şeker, un, nişasta içerir)
    if (carbs > 20 || sugar > 15) {
      food.restrictions.lowSugar = {
        status: 3,
        note: "Yüksek karbonhidrat/şeker - Keto için uygun değil"
      };
    } else if (carbs > 10 || sugar > 5) {
      food.restrictions.lowSugar = {
        status: 2,
        note: "Keto için dikkatli tüketin - Porsiyonu sınırlayın"
      };
    } else {
      // Yağlar (zeytinyağı, hindistancevizi yağı gibi)
      food.restrictions.lowSugar = {
        status: 1,
        note: "Keto diyet için mükemmel yağ kaynağı"
      };
    }
  } else if (category === "Süt Ürünleri") {
    // Süt ürünleri: Laktoz içerenler uygun değil
    // Eğer özel kural yoksa karbonhidrat değerine göre karar ver
    if (carbs > 5 || sugar > 3) {
      food.restrictions.lowSugar = {
        status: 3,
        note: "Laktoz/şeker içerir - Keto için uygun değil"
      };
    } else if (carbs === 0 && fat > 20) {
      // Tereyağı gibi yağlı ürünler
      food.restrictions.lowSugar = {
        status: 1,
        note: "Keto diyet için mükemmel - Yağ kaynağı"
      };
    } else {
      food.restrictions.lowSugar = {
        status: 2,
        note: "Keto için dikkatli tüketin - Porsiyonu sınırlayın"
      };
    }
  }
}

// Tüm V2 ürünlerini güncelle
let updated = 0;
foods.forEach(food => {
  if (v2Categories.includes(food.category)) {
    if (!food.restrictions) {
      food.restrictions = {};
    }
    if (!food.restrictions.lowSugar) {
      food.restrictions.lowSugar = { status: 2, note: "" };
    }
    updateFoodKeto(food);
    updated++;
  }
});

fs.writeFileSync('src/data/foods.json', JSON.stringify(foods, null, 2), 'utf8');
console.log(`✓ ${updated} V2 ürünün keto uygunluğu tam olarak güncellendi!`);

