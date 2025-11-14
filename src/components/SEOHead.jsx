import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SEOHead() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const lang = i18n.language?.split('-')[0] || 'en';
    const currentUrl = window.location.origin + window.location.pathname;
    const siteUrl = window.location.origin;
    
    // Update title
    document.title = t('seo.title');
    
    // Update lang attribute
    document.documentElement.lang = lang;
    
    // Helper function to update meta tags
    const updateMetaTag = (attr, name, content) => {
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Helper function to update link tags
    const updateLinkTag = (rel, href, attributes = {}) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      Object.keys(attributes).forEach(key => {
        link.setAttribute(key, attributes[key]);
      });
    };

    // Basic Meta Tags
    updateMetaTag('name', 'description', t('seo.description'));
    updateMetaTag('name', 'keywords', t('seo.keywords'));
    updateMetaTag('name', 'author', t('seo.author') || 'ClearPlate');
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'googlebot', 'index, follow');
    updateMetaTag('name', 'theme-color', '#0f766e');
    updateMetaTag('name', 'msapplication-TileColor', '#0f766e');
    updateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    
    // Open Graph Meta Tags (Enhanced)
    updateMetaTag('property', 'og:title', t('seo.title'));
    updateMetaTag('property', 'og:description', t('seo.description'));
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:site_name', 'ClearPlate');
    updateMetaTag('property', 'og:locale', lang);
    
    // Open Graph Image (you can add your logo/og-image later)
    const ogImage = `${siteUrl}/og-image.png`; // Add this image later
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:alt', t('seo.title'));
    updateMetaTag('property', 'og:image:type', 'image/png');
    
    // Twitter Card Meta Tags (Enhanced)
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', t('seo.title'));
    updateMetaTag('name', 'twitter:description', t('seo.description'));
    updateMetaTag('name', 'twitter:image', ogImage);
    updateMetaTag('name', 'twitter:image:alt', t('seo.title'));
    updateMetaTag('name', 'twitter:site', '@clearplate'); // Update with your Twitter handle
    updateMetaTag('name', 'twitter:creator', '@clearplate'); // Update with your Twitter handle
    
    // Additional Meta Tags
    updateMetaTag('name', 'apple-mobile-web-app-title', 'ClearPlate');
    updateMetaTag('name', 'apple-mobile-web-app-capable', 'yes');
    updateMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('name', 'application-name', 'ClearPlate');
    updateMetaTag('name', 'mobile-web-app-capable', 'yes');
    
    // Canonical URL
    updateLinkTag('canonical', currentUrl);
    
    // Alternate language links (hreflang)
    const supportedLangs = ['en', 'tr', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi', 'ko'];
    supportedLangs.forEach(supportedLang => {
      const hreflangLink = document.querySelector(`link[hreflang="${supportedLang}"]`);
      if (hreflangLink) {
        hreflangLink.remove();
      }
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', supportedLang);
      link.setAttribute('href', `${siteUrl}?lang=${supportedLang}`);
      document.head.appendChild(link);
    });
    
    // Default hreflang (x-default)
    const xDefaultLink = document.querySelector('link[hreflang="x-default"]');
    if (xDefaultLink) {
      xDefaultLink.remove();
    }
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${siteUrl}?lang=en`);
    document.head.appendChild(defaultLink);
    
    // Structured Data - Enhanced JSON-LD
    const structuredData = [
      // Organization Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ClearPlate',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`, // Add your logo
        description: t('seo.description'),
        sameAs: [
          // Add your social media links here when available
          // 'https://twitter.com/clearplate',
          // 'https://facebook.com/clearplate',
          // 'https://instagram.com/clearplate'
        ]
      },
      // WebSite Schema
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ClearPlate',
        url: siteUrl,
        description: t('seo.description'),
        inLanguage: lang,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      // SoftwareApplication Schema
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: t('seo.title'),
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        description: t('seo.description'),
        url: siteUrl,
        inLanguage: lang,
        featureList: [
          t('seo.feature1'),
          t('seo.feature2'),
          t('seo.feature3'),
          t('seo.feature4')
        ],
        screenshot: ogImage,
        browserRequirements: 'Requires JavaScript. Requires HTML5.'
      },
      // BreadcrumbList Schema (if needed)
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl
          }
        ]
      }
    ];

    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Add new structured data
    structuredData.forEach(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
    
  }, [i18n.language, t]);

  return null; // This component doesn't render anything
}

export default SEOHead;

