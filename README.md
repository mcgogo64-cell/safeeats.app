# SafeEats App

Modern çok dilli web uygulaması - React + Vite + i18next

## Özellikler

- ✅ 13 global dil desteği (varsayılan: İngilizce)
- ✅ React 18 + Vite
- ✅ i18next ile çok dilli yapı
- ✅ Netlify deployment hazır
- ✅ RTL (Sağdan sola) dil desteği (Arapça için)

## Desteklenen Diller

1. 🇺🇸 English (İngilizce) - **Varsayılan**
2. 🇹🇷 Türkçe (Turkish)
3. 🇪🇸 Español (Spanish)
4. 🇫🇷 Français (French)
5. 🇩🇪 Deutsch (German)
6. 🇮🇹 Italiano (Italian)
7. 🇵🇹 Português (Portuguese)
8. 🇷🇺 Русский (Russian)
9. 🇨🇳 中文 (Chinese)
10. 🇯🇵 日本語 (Japanese)
11. 🇸🇦 العربية (Arabic)
12. 🇮🇳 हिन्दी (Hindi)
13. 🇰🇷 한국어 (Korean)

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

Uygulama http://localhost:5173 adresinde çalışacaktır.

## Build

```bash
npm run build
```

Build dosyaları `dist` klasörüne oluşturulacaktır.

## Netlify Deploy

1. Projeyi GitHub'a push edin
2. Netlify hesabınıza giriş yapın
3. "New site from Git" seçeneğini seçin
4. GitHub reposunu bağlayın
5. Build ayarları otomatik olarak `netlify.toml` dosyasından alınacaktır

## Çok Dilli Yapı

Dil çevirileri `src/i18n/locales/` klasöründe bulunur. Her dil için ayrı JSON dosyası vardır.

Yeni çeviri eklemek için:
1. `src/i18n/locales/` klasörüne yeni dil dosyası ekleyin (örn: `nl.json`)
2. `src/i18n/config.js` dosyasına yeni dili import edin ve resources'a ekleyin
3. `src/components/LanguageSelector.jsx` dosyasına yeni dili ekleyin

## Proje Yapısı

```
safeeats.app/
├── src/
│   ├── components/
│   │   ├── LanguageSelector.jsx
│   │   └── LanguageSelector.css
│   ├── i18n/
│   │   ├── config.js
│   │   └── locales/
│   │       ├── en.json
│   │       ├── tr.json
│   │       ├── es.json
│   │       ├── fr.json
│   │       ├── de.json
│   │       ├── it.json
│   │       ├── pt.json
│   │       ├── ru.json
│   │       ├── zh.json
│   │       ├── ja.json
│   │       ├── ar.json
│   │       ├── hi.json
│   │       └── ko.json
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── netlify.toml
├── package.json
└── README.md
```

## Kullanılan Teknolojiler

- **React 18** - UI kütüphanesi
- **Vite** - Build tool ve dev server
- **i18next** - Çok dilli yapı
- **react-i18next** - React için i18next entegrasyonu
- **i18next-browser-languagedetector** - Tarayıcı dil tespiti

