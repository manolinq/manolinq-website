import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import ServiceDetail from '../components/ServiceDetail';

export default function LandingPagesPage() {
  useSeo({
    title: 'Landing Pages | High-Converting One-Page Sites — Manolinq',
    description:
      'Focused, high-converting landing pages built for one offer, campaign or service. Starting from €500. Perfect for ads, promotions, launches and lead generation.',
    path: '/services/landing-pages',
  });

  const { ref: priceRef, inView: priceInView } = useInView();

  return (
    <>
      <ServiceDetail
        tag="Landing Pages"
        title={<>Focused pages built for <span className="electric-gradient-text">one goal: conversion</span></>}
        description="Landing pages are built for campaigns, ads, promotions, offers, services or launches. One clear message, one strong call-to-action — no distractions, just results."
        path="/services/landing-pages"
        seoTitle=""
        seoDescription=""
        features={[
          {
            title: 'Clear offer structure',
            description: 'A single, focused page that communicates your offer, benefits and proof — no distractions, no dead ends, just a clear path to action.',
          },
          {
            title: 'Strong headline and CTA flow',
            description: 'A headline that grabs attention, supporting copy that builds trust, and repeated calls-to-action that make contact frictionless.',
          },
          {
            title: 'Lead capture form',
            description: 'A built-in form captures name, email and details — sent straight to your inbox and CRM so no enquiry slips through.',
          },
          {
            title: 'Fast mobile layout',
            description: 'Lightweight and optimised so the page loads instantly on mobile data connections, keeping bounce rates low and conversions high.',
          },
          {
            title: 'Analytics-ready setup',
            description: 'Structured for easy integration with tracking tools so you can measure clicks, conversions and where your leads come from.',
          },
          {
            title: 'Ad-campaign friendly',
            description: 'Designed to pair with paid ads or social campaigns — one consistent message from ad to page to action.',
          },
        ]}
        deliverables={[
          { text: 'Single high-converting landing page' },
          { text: 'Clear headline and offer structure' },
          { text: 'Lead capture form with notifications' },
          { text: 'WhatsApp & social links' },
          { text: 'Mobile-first fast-loading design' },
          { text: 'Analytics-ready setup' },
          { text: 'On-page SEO (meta, canonical, sitemap)' },
          { text: 'Secure hosting deployment' },
        ]}
        process={[
          { step: '01', title: 'Define the offer', description: 'We clarify the single offer, audience and goal for the page so every element serves that purpose.' },
          { step: '02', title: 'Write & design', description: 'We craft the headline, copy and visual layout, then build the page with a clear conversion flow.' },
          { step: '03', title: 'Test & refine', description: 'We test the form, load speed and mobile layout, then refine based on your feedback.' },
          { step: '04', title: 'Launch', description: 'We deploy to your domain or campaign URL, ready to receive traffic and capture leads.' },
        ]}
        faqs={[
          { q: 'What is a landing page vs a website?', a: 'A landing page is a single focused page built around one offer or campaign, while a website is a full multi-page presence. Landing pages are ideal for ads, promotions and lead generation.' },
          { q: 'Can I run ads to the landing page?', a: 'Yes. Landing pages are designed to pair with paid ads and social campaigns, keeping the message consistent from ad to page to action.' },
          { q: 'How fast can a landing page be ready?', a: 'Most landing pages are completed within 3–7 days, depending on the offer and how quickly content and feedback are provided.' },
          { q: 'Will the form send leads to me?', a: 'Yes. Every form submission is sent to your inbox and can be forwarded to your CRM or notification channels like WhatsApp and Telegram.' },
          { q: 'Can I use a landing page for multiple campaigns?', a: 'Each landing page is built around one specific offer or audience. For multiple campaigns we recommend a separate page per campaign to keep the message sharp and the conversion rate high.' },
        ]}
      />

      {/* Pricing CTA */}
      <section ref={priceRef} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${priceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Pricing
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Starting from <span className="electric-gradient-text">€500</span>
            </h2>
            <p className="mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '30rem' }}>
              Final price depends on content, integrations and project scope. Request a free audit and get a tailored quote — no obligation.
            </p>
            <Link to="/contact" className="btn-primary">
              Request a Landing Page
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
