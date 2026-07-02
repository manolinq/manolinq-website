import { Link } from 'react-router-dom';
import { Globe, LayoutTemplate, Bot, ArrowRight, Check } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';

const services = [
  {
    icon: Globe,
    title: 'Business Websites',
    tag: 'Full Sites',
    description:
      'Premium, mobile-friendly websites that make your business look professional, explain your services clearly and turn visitors into leads.',
    features: [
      'Custom design & branding',
      'Mobile-first responsive layout',
      'Service pages built to convert',
      'Contact form + WhatsApp integration',
      'Basic SEO foundations',
    ],
    featured: true,
    badge: 'Best For Most Businesses',
    href: '/services/websites',
  },
  {
    icon: LayoutTemplate,
    title: 'Landing Pages',
    tag: 'High-Converting',
    description:
      'Focused one-page websites built for one offer, campaign or service. Perfect for ads, promotions, launches or lead generation.',
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
  },
  {
    icon: Bot,
    title: 'AI Assistants & Automations',
    tag: 'Next-Level',
    description:
      'AI chat assistants and automated workflows that help answer questions, qualify leads and notify you when someone is interested.',
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
  },
];

export default function ServicesPage() {
  useSeo({
    title: 'Services | Websites, Landing Pages & AI Systems — Manolinq',
    description:
      'Explore Manolinq services: business websites, high-converting landing pages, and AI assistants & automations built to capture and convert more leads.',
    path: '/services',
  });

  const { ref, inView } = useInView();

  return (
    <>
      <PageHeader
        tag="What We Build"
        title={<>Services designed to <span className="electric-gradient-text">grow your business</span></>}
        description="Everything you need to attract more clients and close more deals online — from full business websites to AI-powered automations."
      />

      {/* Service cards */}
      <section ref={ref} className="relative py-12 lg:py-16 section-alt overflow-hidden">
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which service"
        highlight="fits your business?"
        description="Tell us about your business and we'll recommend the right approach — free of charge."
      />
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
          Explore this service
          <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
