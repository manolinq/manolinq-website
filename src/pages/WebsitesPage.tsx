import { useSeo } from '../hooks/useSeo';
import ServiceDetail from '../components/ServiceDetail';

export default function WebsitesPage() {
  useSeo({
    title: 'Business Websites | Professional Sites That Convert — Manolinq',
    description:
      'Premium, mobile-friendly business websites that make your business look professional, explain your services clearly and turn visitors into leads.',
    path: '/services/websites',
  });

  return (
    <ServiceDetail
      tag="Business Websites"
      title={<>Professional websites that <span className="electric-gradient-text">win clients</span></>}
      description="A full custom website built around your business — designed to look premium, explain your services clearly, and turn visitors into enquiries, bookings and sales."
      path="/services/websites"
      seoTitle=""
      seoDescription=""
      features={[
        {
          title: 'Custom design & branding',
          description: 'Every site is designed from scratch around your brand — colours, typography, imagery and layout that reflect the quality of your business.',
        },
        {
          title: 'Mobile-first responsive layout',
          description: 'Over 70% of visitors browse on mobile. Your site looks and works flawlessly on every screen size, from phone to desktop.',
        },
        {
          title: 'Service pages built to convert',
          description: 'Each page is structured around a clear offer and call-to-action, guiding visitors toward contacting you or booking a service.',
        },
        {
          title: 'Contact form + WhatsApp integration',
          description: 'Make it effortless to reach you — integrated contact forms, clickable WhatsApp, and direct links to your social profiles.',
        },
        {
          title: 'Basic SEO foundations',
          description: 'Clean meta tags, semantic structure, fast load times and canonical URLs so search engines can find and index your pages.',
        },
        {
          title: 'Fast, reliable hosting setup',
          description: 'Your site is deployed on modern infrastructure with SSL, fast global delivery and dependable uptime.',
        },
      ]}
      deliverables={[
        { text: 'Custom homepage designed around your business' },
        { text: 'Up to 5 service or info pages' },
        { text: 'Mobile-first responsive design' },
        { text: 'Contact form with lead capture' },
        { text: 'WhatsApp & social media integration' },
        { text: 'On-page SEO setup (meta, canonical, sitemap)' },
        { text: 'Fast, secure hosting deployment' },
        { text: 'Analytics-ready structure' },
      ]}
      process={[
        { step: '01', title: 'Discovery call', description: 'We learn about your business, your services, your clients and what makes you different.' },
        { step: '02', title: 'Design & build', description: 'We design and build your site page by page, sharing progress and gathering your feedback.' },
        { step: '03', title: 'Review & refine', description: 'You review the full site, request changes, and we polish every detail until it feels right.' },
        { step: '04', title: 'Launch', description: 'We deploy your site to your domain with SSL, sitemap and SEO foundations in place.' },
      ]}
      faqs={[
        { q: 'How long does a business website take?', a: 'Most business websites are completed within 1–2 weeks, depending on the number of pages and how quickly content and feedback are provided.' },
        { q: 'Do I need to provide the content?', a: 'You can provide your own text and images, or we can help structure and write the copy based on a short conversation about your business.' },
        { q: 'Will the website work on mobile?', a: 'Yes — every site is built mobile-first and tested across screen sizes from small phones to large desktops.' },
        { q: 'Can I update the website later?', a: 'Yes. We can set up the site so you can edit content yourself, or you can come back to us for updates whenever you need them.' },
      ]}
    />
  );
}
