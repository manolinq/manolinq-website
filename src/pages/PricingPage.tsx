import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Globe, Bot, MessageCircle } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';

const packages = [
  {
    name: 'Starter Website',
    price: 'From €500',
    description: 'A clean, professional website for businesses that need a strong basic online presence.',
    features: [
      '1–3 pages',
      'Mobile-responsive design',
      'Contact form setup',
      'WhatsApp/Instagram buttons',
      'Basic SEO setup',
      '1 revision round',
    ],
    cta: 'Start With Starter',
    featured: false,
  },
  {
    name: 'Business Website',
    price: 'From €750',
    description: 'A premium website built to explain your services clearly, build trust and turn visitors into leads.',
    features: [
      'Up to 5 pages',
      'Premium UI/UX design',
      'Service pages built to convert',
      'Lead capture form',
      'WhatsApp integration',
      'Basic SEO setup',
      'Analytics setup',
      '2 revision rounds',
    ],
    cta: 'Request Business Website',
    featured: true,
    badge: 'Best For Most Businesses',
  },
  {
    name: 'Website + AI System',
    price: 'From €1,250',
    description: 'A complete website combined with AI and automation systems that capture, qualify and follow up with leads.',
    features: [
      'Everything in Business Website',
      'AI chatbot/assistant setup',
      'Lead qualification flow',
      'Automated email/WhatsApp follow-up',
      'Form-to-notification system',
      'CRM or Notion integration',
      '3 revision rounds',
      '30-day launch support',
    ],
    cta: 'Build My AI System',
    featured: false,
  },
];

const comparison = [
  { feature: 'Pages included',            starter: '1–3',         business: 'Up to 5',         ai: 'Up to 5' },
  { feature: 'Premium UI/UX design',      starter: 'Standard',    business: 'Yes',             ai: 'Yes' },
  { feature: 'Lead capture form',         starter: 'Yes',         business: 'Yes',             ai: 'Yes' },
  { feature: 'WhatsApp integration',      starter: 'Buttons',     business: 'Full integration',ai: 'Full + automation' },
  { feature: 'Service pages built to convert', starter: '—',      business: 'Yes',             ai: 'Yes' },
  { feature: 'SEO foundations',           starter: 'Basic',       business: 'Basic',           ai: 'Basic' },
  { feature: 'Analytics setup',           starter: '—',           business: 'Yes',             ai: 'Yes' },
  { feature: 'AI chatbot / assistant',    starter: '—',           business: '—',               ai: 'Yes' },
  { feature: 'Lead qualification flow',   starter: '—',           business: '—',               ai: 'Yes' },
  { feature: 'Automated follow-ups',      starter: '—',           business: '—',               ai: 'Yes' },
  { feature: 'Instant lead notifications',starter: '—',           business: '—',               ai: 'Yes' },
  { feature: 'CRM / Notion integration',  starter: '—',           business: '—',               ai: 'Yes' },
  { feature: 'Revision rounds',           starter: '1',           business: '2',               ai: '3' },
  { feature: 'Launch support',            starter: '—',           business: '—',               ai: '30 days' },
];

const addOns = [
  { icon: Globe,          title: 'Additional pages',           desc: 'Extra service or info pages beyond your package.' },
  { icon: Bot,            title: 'AI assistant add-on',        desc: 'Add an AI chatbot to an existing website.' },
  { icon: MessageCircle,  title: 'Automation workflows',       desc: 'Custom WhatsApp, email or CRM automations.' },
  { icon: Zap,            title: 'Ongoing support & updates',  desc: 'Monthly maintenance and content updates.' },
];

export default function PricingPage() {
  useSeo({
    title: 'Pricing | Websites & AI Systems — Manolinq',
    description:
      'Transparent pricing for business websites, landing pages and AI systems. Packages from €500 to €1,250+ with clear deliverables and no hidden fees.',
    path: '/pricing',
  });

  const { ref, inView } = useInView();
  const { ref: ref2, inView: inView2 } = useInView();
  const { ref: ref3, inView: inView3 } = useInView();

  return (
    <>
      <PageHeader
        tag="Pricing"
        title={<>Clear pricing, <span className="electric-gradient-text">no surprises</span></>}
        description="Choose a package that fits your business. Every package includes a free audit, clear deliverables and no hidden fees."
      />

      {/* Package cards */}
      <section ref={ref} className="relative py-12 lg:py-16 section-alt overflow-hidden">
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.name} pkg={pkg} index={i} inView={inView} />
            ))}
          </div>

          <p className="text-center mt-10" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
            Prices are starting points. Final pricing depends on scope — request a free audit for a tailored quote.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section ref={ref2} className="relative py-20 lg:py-24 overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Compare
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Full <span className="electric-gradient-text">comparison</span>
            </h2>
          </div>

          <div
            className={`overflow-x-auto rounded-2xl transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ background: 'rgba(11,11,21,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <table className="w-full text-left" style={{ minWidth: 560 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th className="p-5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Feature</th>
                  <th className="p-5 text-center" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600 }}>Starter</th>
                  <th className="p-5 text-center" style={{ color: 'rgba(54,175,247,0.9)', fontSize: '0.82rem', fontWeight: 700 }}>Business</th>
                  <th className="p-5 text-center" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600 }}>Website + AI</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: i === comparison.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="p-4" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem' }}>{row.feature}</td>
                    <td className="p-4 text-center" style={{ color: row.starter === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>{row.starter}</td>
                    <td className="p-4 text-center" style={{ color: row.business === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)', fontSize: '0.82rem', background: 'rgba(12,147,232,0.035)' }}>{row.business}</td>
                    <td className="p-4 text-center" style={{ color: row.ai === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section ref={ref3} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Add-ons
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Need something <span className="electric-gradient-text">extra?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((a, i) => (
              <div
                key={a.title}
                className={`rounded-2xl p-6 transition-all duration-700 ${inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ background: 'rgba(11,11,21,0.6)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: `${i * 90}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(12,147,232,0.08)', border: '1px solid rgba(12,147,232,0.14)' }}>
                  <a.icon size={17} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.72)' }} />
                </div>
                <h3 className="text-white font-semibold mb-1.5" style={{ fontSize: '0.92rem' }}>{a.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.7 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Still unsure which"
        highlight="package is right?"
        description="Tell us about your business and we'll recommend the best option — no pressure, no obligation."
      />
    </>
  );
}

type Package = typeof packages[number];

function PricingCard({ pkg, index, inView }: { pkg: Package; index: number; inView: boolean }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pkg.featured) return;
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.22)';
    el.style.background = 'linear-gradient(160deg, #0d0d1e 0%, #09090f 100%)';
    el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.05),0 0 44px rgba(12,147,232,0.09),0 20px 60px rgba(0,0,0,0.35)';
    el.style.transform = 'translateY(-4px)';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pkg.featured) return;
    const el = e.currentTarget;
    el.style.border = '1px solid rgba(12,147,232,0.13)';
    el.style.background = 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)';
    el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04),0 0 20px rgba(12,147,232,0.05)';
    el.style.transform = 'translateY(0)';
  };

  const baseStyle: React.CSSProperties = pkg.featured
    ? {
        background: 'linear-gradient(160deg, #0c1628 0%, #090b18 60%, #07070f 100%)',
        border: '1px solid rgba(12,147,232,0.28)',
        boxShadow: 'inset 0 1px 0 rgba(12,147,232,0.14),0 0 0 1px rgba(12,147,232,0.1),0 0 60px rgba(12,147,232,0.1),0 0 120px rgba(12,147,232,0.04)',
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
                  ${pkg.featured ? 'order-first md:order-none' : ''}
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ ...baseStyle, transitionDelay: `${index * 130}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {pkg.featured && <div className="absolute top-0 left-0 right-0 h-[1px] shimmer-line" />}
      {pkg.badge && (
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center text-[0.63rem] font-bold uppercase tracking-[0.1em] px-2.5 py-[5px] rounded-full" style={{ background: 'rgba(12,147,232,0.14)', border: '1px solid rgba(12,147,232,0.28)', color: 'rgba(147,212,253,0.9)' }}>
            {pkg.badge}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-7">
        <h3 className="text-white font-bold mb-1" style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{pkg.name}</h3>
        <p className="mb-5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.7 }}>{pkg.description}</p>

        <div className="mb-6">
          <span className="text-white font-bold" style={{ fontSize: '1.75rem', letterSpacing: '-0.03em' }}>{pkg.price}</span>
        </div>

        <div className="h-px mb-6" style={{ background: pkg.featured ? 'rgba(12,147,232,0.12)' : 'rgba(255,255,255,0.055)' }} />

        <ul className="space-y-2.5 flex-1 mb-7">
          {pkg.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-[17px] h-[17px] rounded-full flex items-center justify-center" style={{ background: pkg.featured ? 'rgba(12,147,232,0.18)' : 'rgba(12,147,232,0.08)', border: pkg.featured ? '1px solid rgba(12,147,232,0.22)' : 'none' }}>
                <Check size={8} strokeWidth={3} style={{ color: 'rgba(54,175,247,0.85)' }} />
              </span>
              <span style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.845rem', lineHeight: 1.5 }}>{feat}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={`flex items-center justify-center gap-2.5 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 group text-[0.88rem] tracking-[-0.01em]
                     ${pkg.featured
                       ? 'bg-electric-500 text-white hover:bg-electric-400 hover:-translate-y-[2px] hover:shadow-[0_4px_24px_rgba(12,147,232,0.45)]'
                       : 'border border-white/[0.18] text-white/80 bg-white/[0.04] hover:text-white hover:border-electric-500/[0.38] hover:bg-white/[0.07] hover:-translate-y-[1px] hover:shadow-[0_2px_16px_rgba(12,147,232,0.12)]'
                     }`}
        >
          {pkg.cta}
          <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
