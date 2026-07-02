import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield, Smartphone, BarChart2, Pencil } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import {
  FeaturesSection,
  DeliverablesSection,
  ProcessSection,
  FaqSection,
  OtherServices,
} from '../components/ServiceDetail';

const trustItems = [
  { icon: Smartphone, label: 'Mobile-first' },
  { icon: BarChart2,  label: 'Lead-focused' },
  { icon: Shield,     label: 'SEO-ready'    },
  { icon: Pencil,     label: 'Custom built' },
];

const features = [
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
    title: 'SEO foundations',
    description: 'Clean meta tags, semantic structure, fast load times and canonical URLs so search engines can find and index your pages.',
  },
  {
    title: 'Analytics setup',
    description: 'Your site is connected to tracking from day one so you can see where visitors come from and what pages perform best.',
  },
];

const deliverables = [
  { text: 'Custom homepage designed around your business' },
  { text: 'Up to 5 service or info pages' },
  { text: 'Mobile-first responsive design' },
  { text: 'Contact form with lead capture' },
  { text: 'WhatsApp & social media integration' },
  { text: 'On-page SEO setup (meta, canonical, sitemap)' },
  { text: 'Fast, secure hosting deployment' },
  { text: 'Analytics-ready structure' },
];

const process = [
  { step: '01', title: 'Discovery call',   description: 'We learn about your business, your services, your clients and what makes you different.' },
  { step: '02', title: 'Design & build',   description: 'We design and build your site page by page, sharing progress and gathering your feedback.' },
  { step: '03', title: 'Review & refine',  description: 'You review the full site, request changes, and we polish every detail until it feels right.' },
  { step: '04', title: 'Launch',           description: 'We deploy your site to your domain with SSL, sitemap and SEO foundations in place.' },
];

const faqs = [
  { q: 'How long does a business website take?',     a: 'Most business websites are completed within 1–2 weeks, depending on the number of pages and how quickly content and feedback are provided.' },
  { q: 'Do I need to provide the content?',          a: 'You can provide your own text and images, or we can help structure and write the copy based on a short conversation about your business.' },
  { q: 'Will the website work on mobile?',           a: 'Yes — every site is built mobile-first and tested across screen sizes from small phones to large desktops.' },
  { q: 'Can I update the website later?',            a: 'Yes. We can set up the site so you can edit content yourself, or you can come back to us for updates whenever you need them.' },
  { q: 'What is included in SEO foundations?',       a: 'We set up proper meta titles, descriptions, canonical URLs, a sitemap and semantic HTML structure — the technical baseline that search engines need to index your site correctly.' },
  { q: 'Can you connect the website to WhatsApp, email or Telegram?', a: 'Yes. We can connect contact forms, WhatsApp buttons, email links and notification systems so new enquiries are easier to follow up with.' },
];

export default function WebsitesPage() {
  useSeo({
    title: 'Business Websites | Premium Sites That Convert — Manolinq',
    description: 'Manolinq builds modern, mobile-friendly websites for businesses that need trust, clarity and more enquiries. Starting from €750.',
    path: '/services/websites',
  });

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: priceRef, inView: priceInView } = useInView();

  return (
    <>
      {/* ── Custom Hero ── */}
      <section ref={heroRef} className="relative pt-36 pb-14 lg:pt-44 lg:pb-16 overflow-hidden">
        {/* Ambient bloom */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.07) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        <div
          className={`relative max-w-3xl mx-auto px-5 sm:px-7 lg:px-8 text-center
                      transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Back link */}
          <div className="flex justify-center mb-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/65
                         text-[0.8rem] font-medium transition-colors duration-200"
            >
              <ArrowLeft size={12} strokeWidth={2.25} />
              All services
            </Link>
          </div>

          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Business Websites
          </div>

          <h1
            className="text-white font-bold leading-[1.07] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)' }}
          >
            Premium business websites built to turn{' '}
            <span className="electric-gradient-text">visitors into leads</span>
          </h1>

          <p
            className="mx-auto mb-8"
            style={{ color: 'rgba(255,255,255,0.48)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '38rem' }}
          >
            Manolinq builds modern, mobile-friendly websites that make your business look professional, explain your services clearly and help visitors contact you.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link to="/contact" className="btn-primary text-[0.95rem] px-8 py-[14px] justify-center">
              Request Free Website Audit
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link to="/pricing" className="btn-secondary text-[0.95rem] px-8 py-[14px] justify-center">
              View Pricing
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-3 justify-center">
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: 'rgba(12,147,232,0.07)',
                  border: '1px solid rgba(12,147,232,0.16)',
                }}
              >
                <Icon size={12} strokeWidth={2} style={{ color: 'rgba(54,175,247,0.75)' }} />
                <span style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.78rem', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content sections (shared, spacing already tightened) ── */}
      <FeaturesSection features={features} />
      <DeliverablesSection deliverables={deliverables} />
      <ProcessSection process={process} />
      <FaqSection faqs={faqs} />
      <OtherServices currentPath="/services/websites" />

      {/* ── Pricing CTA ── */}
      <section ref={priceRef} className="relative py-14 lg:py-18 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${priceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Pricing
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Starting from <span className="electric-gradient-text">€750</span>
            </h2>
            <p className="mb-7 mx-auto" style={{ color: 'rgba(255,255,255,0.48)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '30rem' }}>
              Final price depends on content, number of pages and project scope. Request a free audit and get a tailored quote — no obligation.
            </p>
            <Link to="/contact" className="btn-primary justify-center inline-flex">
              Request a Free Website Audit
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.065) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center">
          <h2 className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
            Want this for <span className="electric-gradient-text">your business?</span>
          </h2>
          <p className="mb-7 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '32rem' }}>
            Tell us about your business and we'll show you exactly how a Manolinq website would work for you — free of charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-primary text-[0.95rem] px-8 py-[14px] justify-center">
              Request Free Audit
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <Link to="/pricing" className="btn-secondary text-[0.95rem] px-8 py-[14px] justify-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
