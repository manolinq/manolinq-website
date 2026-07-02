import { Link } from 'react-router-dom';
import { Globe, LayoutTemplate, Bot, ArrowRight, Check, HelpCircle } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';

const services = [
  {
    icon: Globe,
    title: 'Business Websites',
    tag: 'Full Sites',
    description:
      'A modern, mobile-friendly website built around your business — designed to build trust, explain your services clearly and turn visitors into enquiries.',
    features: [
      'Custom design tailored to your brand',
      'Mobile-first responsive layout',
      'Service pages built to convert',
      'Contact form + WhatsApp integration',
      'SEO foundations & analytics setup',
    ],
    featured: true,
    badge: 'Best For Most Businesses',
    href: '/services/websites',
    cta: 'See Website Packages',
  },
  {
    icon: LayoutTemplate,
    title: 'Landing Pages',
    tag: 'High-Converting',
    description:
      'Focused pages built for one goal: conversion. Ideal for campaigns, ads, promotions, services or product launches — no distractions, just results.',
    features: [
      'Clear offer structure',
      'Strong headline and CTA flow',
      'Lead capture form',
      'Fast-loading mobile layout',
      'Analytics-ready setup',
    ],
    featured: false,
    badge: null,
    href: '/services/landing-pages',
    cta: 'Explore Landing Pages',
  },
  {
    icon: Bot,
    title: 'AI Assistants & Automations',
    tag: 'Next-Level',
    description:
      'AI systems that capture, qualify and follow up with leads — while you focus on running your business. From chatbots to WhatsApp automations.',
    features: [
      'AI chatbot setup',
      'Lead qualification flows',
      'WhatsApp & email automations',
      'Form-to-notification systems',
      'CRM or Notion integrations',
    ],
    featured: false,
    badge: null,
    href: '/services/ai-systems',
    cta: 'Explore AI Systems',
  },
];

const choosePaths = [
  {
    question: 'Need a stronger online presence?',
    answer:
      'Choose a Business Website if you need a professional website that explains your services, builds trust and captures enquiries.',
    cta: 'View Business Websites',
    href: '/services/websites',
  },
  {
    question: 'Promoting one offer?',
    answer:
      'Choose a Landing Page if you want one focused page for ads, campaigns, launches or a specific service.',
    cta: 'View Landing Pages',
    href: '/services/landing-pages',
  },
  {
    question: 'Want to automate leads?',
    answer:
      'Choose an AI System if you want a chatbot, lead qualification flow, WhatsApp/email automation or form-to-notification system.',
    cta: 'View AI Systems',
    href: '/services/ai-systems',
  },
];

export default function ServicesPage() {
  useSeo({
    title: 'Services | Websites, Landing Pages & AI Systems — Manolinq',
    description:
      'Explore Manolinq services: business websites, high-converting landing pages, and AI assistants & automations built to capture and convert more leads.',
    path: '/services',
  });

  const { ref: cardsRef, inView: cardsInView } = useInView();
  const { ref: chooseRef, inView: chooseInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  return (
    <>
      <PageHeader
        tag="What We Build"
        title={<>Services built to <span className="electric-gradient-text">grow your business</span></>}
        description="From websites to AI systems, Manolinq helps businesses create a stronger online presence and capture more leads."
      />

      {/* Service cards */}
      <section ref={cardsRef} className="relative py-12 lg:py-16 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} inView={cardsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section ref={chooseRef} className="relative py-14 lg:py-18 overflow-hidden">
        <div className="section-divider absolute top-0" />

        {/* ambient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.04) 0%, transparent 65%)' }}
        />

        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-9 transition-all duration-700 ${chooseInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              How To Choose
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Not sure what you <span className="electric-gradient-text">need yet?</span>
            </h2>
            <p className="mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '34rem' }}>
              Here's the simple way to choose the right Manolinq service based on where your business is right now.
            </p>
          </div>

          {/* Choose cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {choosePaths.map((path, i) => (
              <ChooseCard key={path.href} path={path} index={i} inView={chooseInView} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="relative py-14 lg:py-20 overflow-hidden section-alt">
        <div className="section-divider absolute top-0" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[460px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.075) 0%, transparent 60%)' }}
        />

        <div
          className={`relative max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center
                      transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Ready When You Are
          </div>

          <h2 className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Still not sure what{' '}
            <span className="electric-gradient-text">fits your business?</span>
          </h2>

          <p className="mx-auto mb-7" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.02rem', lineHeight: 1.8, maxWidth: '34rem' }}>
            Send your website, Instagram page or business idea and we'll recommend the best setup — free of charge.
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

type Service = typeof services[number];

function ServiceCard({
  service, index, inView,
}: { service: Service; index: number; inView: boolean }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (service.featured) return;
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.22)';
    el.style.background = 'linear-gradient(160deg, #0d0d1e 0%, #09090f 100%)';
    el.style.boxShadow =
      'inset 0 1px 0 rgba(255,255,255,0.05),0 0 44px rgba(12,147,232,0.09),0 20px 60px rgba(0,0,0,0.35)';
    el.style.transform = 'translateY(-4px)';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (service.featured) return;
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.13)';
    el.style.background = 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)';
    el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04),0 0 20px rgba(12,147,232,0.05)';
    el.style.transform = 'translateY(0)';
  };

  const baseStyle: React.CSSProperties = service.featured
    ? {
        background: 'linear-gradient(160deg, #0c1628 0%, #090b18 60%, #07070f 100%)',
        border: '1px solid rgba(12,147,232,0.28)',
        boxShadow:
          'inset 0 1px 0 rgba(12,147,232,0.14),0 0 0 1px rgba(12,147,232,0.1),0 0 60px rgba(12,147,232,0.1),0 0 120px rgba(12,147,232,0.04)',
      }
    : {
        background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
        border: '1px solid rgba(12,147,232,0.13)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04),0 0 20px rgba(12,147,232,0.05)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      };

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-700
                  ${service.featured ? 'order-first md:order-none' : ''}
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ ...baseStyle, transitionDelay: `${index * 130}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {service.featured && <div className="absolute top-0 left-0 right-0 h-[1px] shimmer-line" />}
      {service.badge && (
        <div className="absolute top-5 right-5 z-10">
          <span
            className="inline-flex items-center text-[0.63rem] font-bold uppercase tracking-[0.1em] px-2.5 py-[5px] rounded-full"
            style={{ background: 'rgba(12,147,232,0.14)', border: '1px solid rgba(12,147,232,0.28)', color: 'rgba(147,212,253,0.9)' }}
          >
            {service.badge}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-7">
        <div className="mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: service.featured ? 'rgba(12,147,232,0.16)' : 'rgba(12,147,232,0.07)',
              border: service.featured ? '1px solid rgba(12,147,232,0.26)' : '1px solid rgba(12,147,232,0.12)',
            }}
          >
            <service.icon size={19} strokeWidth={1.75} style={{ color: service.featured ? 'rgba(147,212,253,0.9)' : 'rgba(54,175,247,0.72)' }} />
          </div>
          <span className="block mt-3 mb-0.5" style={{ color: 'rgba(54,175,247,0.5)', fontSize: '0.67rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            {service.tag}
          </span>
          <h3 className="text-white font-bold leading-snug" style={{ fontSize: '1.06rem', letterSpacing: '-0.02em' }}>
            {service.title}
          </h3>
        </div>

        <p className="mb-6" style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.875rem', lineHeight: 1.82 }}>
          {service.description}
        </p>

        <div className="h-px mb-6" style={{ background: service.featured ? 'rgba(12,147,232,0.12)' : 'rgba(255,255,255,0.055)' }} />

        <ul className="space-y-2.5 flex-1 mb-7">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-[17px] h-[17px] rounded-full flex items-center justify-center"
                style={{
                  background: service.featured ? 'rgba(12,147,232,0.18)' : 'rgba(12,147,232,0.08)',
                  border: service.featured ? '1px solid rgba(12,147,232,0.22)' : 'none',
                }}
              >
                <Check size={8} strokeWidth={3} style={{ color: 'rgba(54,175,247,0.85)' }} />
              </span>
              <span style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.845rem', lineHeight: 1.5 }}>{feat}</span>
            </li>
          ))}
        </ul>

        <Link
          to={service.href}
          className="inline-flex items-center gap-2 text-[0.84rem] font-semibold transition-all duration-200 group mt-auto"
          style={{ color: service.featured ? 'rgba(54,175,247,0.9)' : 'rgba(255,255,255,0.55)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = service.featured ? 'rgba(147,212,253,1)' : 'rgba(54,175,247,0.9)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = service.featured ? 'rgba(54,175,247,0.9)' : 'rgba(255,255,255,0.55)'; }}
        >
          {service.cta ?? 'Explore this service'}
          <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}

type ChoosePath = typeof choosePaths[number];

function ChooseCard({ path, index, inView }: { path: ChoosePath; index: number; inView: boolean }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.28)';
    el.style.background = 'linear-gradient(160deg, #0d0d20 0%, #09090f 100%)';
    el.style.boxShadow = '0 0 44px rgba(12,147,232,0.1),0 16px 48px rgba(0,0,0,0.3)';
    el.style.transform = 'translateY(-3px)';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(255,255,255,0.07)';
    el.style.background = 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)';
    el.style.boxShadow = '0 0 0 transparent';
    el.style.transform = 'translateY(0)';
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 transition-all duration-700
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        transitionDelay: `${index * 110}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Question mark icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{ background: 'rgba(12,147,232,0.08)', border: '1px solid rgba(12,147,232,0.15)' }}
      >
        <HelpCircle size={15} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.7)' }} />
      </div>

      <h3 className="text-white font-semibold mb-2.5" style={{ fontSize: '0.98rem', letterSpacing: '-0.015em', lineHeight: 1.4 }}>
        {path.question}
      </h3>

      <p className="flex-1 mb-5" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.855rem', lineHeight: 1.78 }}>
        {path.answer}
      </p>

      <Link
        to={path.href}
        className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold group transition-colors duration-200 mt-auto"
        style={{ color: 'rgba(54,175,247,0.75)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(147,212,253,1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(54,175,247,0.75)'; }}
      >
        {path.cta}
        <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
  );
}
