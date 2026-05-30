import { Globe, LayoutTemplate, Bot, ArrowRight, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const services = [
  {
    icon: Globe,
    title: 'Business Website Builds',
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
  },
];

export default function Services() {
  const { ref, inView } = useInView();

  const goToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" ref={ref} className="relative py-28 lg:py-36 section-alt overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">

        {/* Header */}
        <div
          className={`flex flex-col items-center text-center max-w-[600px] mx-auto mb-16
                      transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            What We Build
          </div>
          <h2
            className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(2rem,4.5vw,2.9rem)' }}
          >
            Services designed to{' '}
            <span className="electric-gradient-text">grow your business</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '1.02rem', lineHeight: 1.8 }}>
            Everything you need to attract more clients and close more deals online.
          </p>
        </div>

        {/* Cards — featured first on mobile via order */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              inView={inView}
              goToContact={goToContact}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

type Service = typeof services[number];

function ServiceCard({
  service,
  index,
  inView,
  goToContact,
}: {
  service: Service;
  index: number;
  inView: boolean;
  goToContact: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (service.featured) return;
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.22)';
    el.style.background = 'linear-gradient(160deg, #0d0d1e 0%, #09090f 100%)';
    el.style.boxShadow =
      'inset 0 1px 0 rgba(255,255,255,0.05),' +
      '0 0 44px rgba(12,147,232,0.09),' +
      '0 20px 60px rgba(0,0,0,0.35)';
    el.style.transform = 'translateY(-4px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (service.featured) return;
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.13)';
    el.style.background = 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)';
    el.style.boxShadow =
      'inset 0 1px 0 rgba(255,255,255,0.04),' +
      '0 0 20px rgba(12,147,232,0.05)';
    el.style.transform = 'translateY(0)';
  };

  const baseStyle: React.CSSProperties = service.featured
    ? {
        background: 'linear-gradient(160deg, #0c1628 0%, #090b18 60%, #07070f 100%)',
        border: '1px solid rgba(12,147,232,0.28)',
        boxShadow:
          'inset 0 1px 0 rgba(12,147,232,0.14),' +
          '0 0 0 1px rgba(12,147,232,0.1),' +
          '0 0 60px rgba(12,147,232,0.1),' +
          '0 0 120px rgba(12,147,232,0.04)',
      }
    : {
        background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
        /* Mobile: subtle blue default glow */
        border: '1px solid rgba(12,147,232,0.13)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.04),' +
          '0 0 20px rgba(12,147,232,0.05)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      };

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden
                  transition-all duration-700 active:scale-[0.985] active:brightness-105
                  ${service.featured ? 'order-first md:order-none' : ''}
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ ...baseStyle, transitionDelay: `${index * 130}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured shimmer line */}
      {service.featured && (
        <div className="absolute top-0 left-0 right-0 h-[1px] shimmer-line" />
      )}

      {/* Badge */}
      {service.badge && (
        <div className="absolute top-5 right-5 z-10">
          <span
            className="inline-flex items-center text-[0.63rem] font-bold
                       uppercase tracking-[0.1em] px-2.5 py-[5px] rounded-full"
            style={{
              background: 'rgba(12,147,232,0.14)',
              border: '1px solid rgba(12,147,232,0.28)',
              color: 'rgba(147,212,253,0.9)',
            }}
          >
            {service.badge}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-7">

        {/* Icon + tag row */}
        <div className="mb-5">
          <IconBox service={service} />
          <span
            className="block mt-3 mb-0.5"
            style={{
              color: 'rgba(54,175,247,0.5)',
              fontSize: '0.67rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {service.tag}
          </span>
          <h3
            className="text-white font-bold leading-snug"
            style={{ fontSize: '1.06rem', letterSpacing: '-0.02em' }}
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="mb-6"
          style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.875rem', lineHeight: 1.82 }}
        >
          {service.description}
        </p>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background: service.featured
              ? 'rgba(12,147,232,0.12)'
              : 'rgba(255,255,255,0.055)',
          }}
        />

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-7">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-[17px] h-[17px] rounded-full flex items-center justify-center"
                style={{
                  background: service.featured
                    ? 'rgba(12,147,232,0.18)'
                    : 'rgba(12,147,232,0.08)',
                  border: service.featured
                    ? '1px solid rgba(12,147,232,0.22)'
                    : 'none',
                }}
              >
                <Check size={8} strokeWidth={3} style={{ color: 'rgba(54,175,247,0.85)' }} />
              </span>
              <span style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.845rem', lineHeight: 1.5 }}>
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={goToContact}
          className="inline-flex items-center gap-2 text-[0.84rem] font-semibold
                     transition-all duration-200 group mt-auto"
          style={{
            color: service.featured
              ? 'rgba(54,175,247,0.9)'
              : 'rgba(255,255,255,0.55)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = service.featured
              ? 'rgba(147,212,253,1)'
              : 'rgba(54,175,247,0.9)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = service.featured
              ? 'rgba(54,175,247,0.9)'
              : 'rgba(255,255,255,0.55)';
          }}
        >
          Request this service
          <ArrowRight
            size={13}
            strokeWidth={2.5}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </a>

      </div>
    </div>
  );
}

function IconBox({ service }: { service: typeof services[number] }) {
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center"
      style={{
        background: service.featured
          ? 'rgba(12,147,232,0.16)'
          : 'rgba(12,147,232,0.07)',
        border: service.featured
          ? '1px solid rgba(12,147,232,0.26)'
          : '1px solid rgba(12,147,232,0.12)',
      }}
    >
      <service.icon
        size={19}
        strokeWidth={1.75}
        style={{
          color: service.featured
            ? 'rgba(147,212,253,0.9)'
            : 'rgba(54,175,247,0.72)',
        }}
      />
    </div>
  );
}
