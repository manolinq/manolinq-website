import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
}

const SITE = 'https://manolinq.com';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page SEO: updates <title>, meta description, canonical URL,
 * Open Graph + Twitter tags, and ensures robots can index the page.
 */
export function useSeo({ title, description, path }: SeoOptions) {
  useEffect(() => {
    const canonical = `${SITE}${path}`;

    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow');

    setLink('canonical', canonical);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'website');

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }, [title, description, path]);
}
