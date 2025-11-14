import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SEOHead() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const lang = i18n.language?.split('-')[0] || 'en';
    
    // Update title
    document.title = t('seo.title');
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t('seo.description'));
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', t('seo.keywords'));
    
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
    
    // Open Graph meta tags
    updateMetaTag('property', 'og:title', t('seo.title'));
    updateMetaTag('property', 'og:description', t('seo.description'));
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:locale', lang);
    updateMetaTag('property', 'og:url', window.location.href);
    
    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', t('seo.title'));
    updateMetaTag('name', 'twitter:description', t('seo.description'));
    
    // Canonical URL
    const updateLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };
    
    updateLinkTag('canonical', window.location.href);
    
    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t('seo.title'),
      description: t('seo.description'),
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      inLanguage: lang,
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
    
  }, [i18n.language, t]);

  return null; // This component doesn't render anything
}

export default SEOHead;

