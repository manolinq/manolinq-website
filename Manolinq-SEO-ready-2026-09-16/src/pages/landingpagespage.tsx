import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap, Target, Smartphone, BarChart2 } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import {
  FeaturesSection,
  DeliverablesSection,
  ProcessSection,
  FaqSection,
  OtherServices,
} from '../components/ServiceDetail';

const trustItems = [
  { icon: Zap,         label: 'Fast delivery'    },
  { icon: Target,      label: 'Lead-focused'     },
  { icon: Smartphone,  label: 'Mobile-first'     },
  { icon: BarChart2,   label: 'Campaign-ready'   },
];

export default function LandingPagesPage() {
  useSeo({
    title: 'Landing Pages | High-Converting One-Page Sites — Manolinq',
    description:
      'Focused, high-converting landing pages built for one offer, campaign or service. Starting from €500. Perfect for ads, promotions, launches and lead generation.',
    path: '/services/landing-pages',
  });

  const { ref: priceRef, inView: priceInView } = useInView();
  const { ref: ctaRef,   inView: ctaInView   } = useInView();

  return (
    <>
      {/* Hero */}
      <PageHeader
        tag="Landing Pages"
        title={<>Focused landing pages built for <span className="electric-gradient-text">one goal: conversion</span></>}
        description="Landing pages are built for campaigns, ads, promotions, offers, services or launches. One clear message, one strong call-to-action — no distractions, just results."
      >
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link to="/contact" className="btn-primary text-[0.95rem] px-8 py-[13px] justify-center">
            Request a Landing Page
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
          <Link to="/pricing" className="btn-secondary text-[0.95rem] px-8 py-[13px] justify-center">
            View Pricing
          </Link>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
          {trustItems.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.82rem' }}>
              <Icon size={13} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.6)' }} />
              {label}
            </span>
          ))}
        </div>
      </PageHeader>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8 -mt-6 mb-4">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70
                     text-[0.82rem] font-medium transition-colors duration-200"
        >
          <ArrowLeft size={13} strokeWidth={2.25} />
          All services
        </Link>
      </div>

      {/* What's included */}
      <FeaturesSection features={[
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
      ]} />

      {/* Deliverables */}
      <DeliverablesSection deliverables={[
        { text: 'Custom landing page designed around one offer'  },
        { text: 'Strong headline and section copy'               },
        { text: 'Mobile-first responsive layout'                 },
        { text: 'Lead capture form'                              },
        { text: 'WhatsApp/social media integration'              },
        { text: 'On-page SEO setup'                              },
        { text: 'Analytics-ready structure'                      },
        { text: 'Fast deployment'                                },
      ]} />

      {/* Process */}
      <ProcessSection process={[
        { step: '01', title: 'Define the offer',  description: 'We clarify the offer, audience and goal so every section has one clear purpose.' },
        { step: '02', title: 'Write & design',    description: 'We create the headline, copy and visual layout around a focused conversion flow.' },
        { step: '03', title: 'Test & refine',     description: 'We test the form, mobile layout and CTA flow, then refine based on your feedback.' },
        { step: '04', title: 'Launch',            description: 'We deploy the page to your domain or campaign URL, ready to receive traffic and capture leads.' },
      ]} />

      {/* Pricing */}
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
              Starting from <span className="electric-gradient-text">€500</span>
            </h2>
            <p className="mb-7 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '30rem' }}>
              Final price depends on content, integrations and project scope. Request a free audit and get a tailored quote — no obligation.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Request a Landing Page
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={[
        { q: 'What is a landing page vs a website?',         a: 'A landing page is a single focused page built around one offer or campaign, while a website is a full multi-page presence. Landing pages are ideal for ads, promotions and lead generation.' },
        { q: 'Can I run ads to the landing page?',           a: 'Yes. Landing pages are designed to pair with paid ads and social campaigns, keeping the message consistent from ad to page to action.' },
        { q: 'How fast can a landing page be ready?',        a: 'Most landing pages are completed within 3–7 days, depending on the offer and how quickly content and feedback are provided.' },
        { q: 'Will the form send leads to me?',              a: 'Yes. Every form submission is sent to your inbox and can be forwarded to your CRM or notification channels like WhatsApp and Telegram.' },
        { q: 'Can I use a landing page for multiple campaigns?', a: 'Each landing page is built around one specific offer or audience. For multiple campaigns we recommend a separate page per campaign to keep the message sharp and the conversion rate high.' },
      ]} />

      {/* Other services */}
      <OtherServices currentPath="/services/landing-pages" />

      {/* Final CTA */}
      <section ref={ctaRef} className="relative py-14 lg:py-20 overflow-hidden">
        <div className="section-divider absolute top-0" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.07) 0%, transparent 60%)' }}
        />

        <div
          className={`relative max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center
                      transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Ready When You Are
          </div>

          <h2 className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Want this for{' '}
            <span className="electric-gradient-text">your business?</span>
          </h2>

          <p className="mx-auto mb-7" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.02rem', lineHeight: 1.8, maxWidth: '34rem' }}>
            Tell us about your offer, campaign or service and we'll show you how a landing page could help turn visitors into leads.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-primary text-[0.95rem] px-9 py-4 justify-center">
              Request Free Audit
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link to="/pricing" className="btn-secondary text-[0.95rem] px-9 py-4 justify-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
