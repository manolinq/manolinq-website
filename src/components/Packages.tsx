import { Check, ArrowRight, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';

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

export default function Packages() {
  const { ref, inView } = useInView();

  const goToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" ref={ref} className="relative py-32 lg:py-40 section-dark overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />

      {/* Background bloom */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[900px] h-[600px] rounded-full
                        bg-[radial-gradient(ellipse_at_center,rgba(12,147,232,0.06)_0%,transparent_65%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center max-w-[600px] mx-auto mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">
            <span className="w-1 h-3.5 bg-electric-500 rounded-full" />
            Packages & Pricing
          </div>
          <h2
            className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2rem,4.5vw,2.9rem)' }}
          >
            Clear pricing,{' '}
            <span className="electric-gradient-text">no surprises</span>
          </h2>
          <p className="text-white/40 text-[1.05rem] leading-[1.8]">
            Choose the package that fits where you are now — you can always upgrade later.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl overflow-hidden
                          transition-all duration-700
                          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                          ${pkg.featured
                            ? 'glow-border-blue bg-gradient-to-b from-[#0c1628]/90 via-[#090b18] to-[#07070f] border border-electric-500/[0.25]'
                            : 'bg-[#0b0b15] border border-white/[0.065] hover:border-electric-500/[0.16] hover:bg-[#0d0d1a] hover:shadow-[0_0_40px_rgba(12,147,232,0.05)] transition-colors duration-300'
                          }`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              {/* Featured shimmer */}
              {pkg.featured && (
                <div className="absolute top-0 left-0 right-0 h-[1px] shimmer-line" />
              )}

              {/* Badge */}
              {pkg.featured && pkg.badge && (
                <div className="flex justify-center pt-6 pb-0">
                  <span
                    className="inline-flex items-center gap-1.5 text-electric-400 text-[0.65rem] font-bold px-3 py-1.5 rounded-full tracking-[0.12em] uppercase"
                    style={{ background: 'rgba(12,147,232,0.13)', border: '1px solid rgba(12,147,232,0.28)' }}
                  >
                    <Zap size={9} strokeWidth={3} />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="flex flex-col flex-1 p-8">
                {/* Name + price */}
                <div className="mb-8">
                  <h3 className="text-white font-bold text-[1.15rem] tracking-[-0.02em] mb-3">
                    {pkg.name}
                  </h3>
                  <div className={`text-[2.2rem] font-black tracking-[-0.05em] leading-none mb-4 ${
                    pkg.featured ? 'electric-gradient-text' : 'text-white/90'
                  }`}>
                    {pkg.price}
                  </div>
                  <p className="text-white/38 text-[0.85rem] leading-[1.75]">{pkg.description}</p>
                </div>

                {/* Divider */}
                <div className={`h-px mb-8 ${
                  pkg.featured ? 'bg-electric-500/[0.12]' : 'bg-white/[0.05]'
                }`} />

                {/* Features */}
                <ul className="space-y-3.5 flex-1 mb-9">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-[1px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                        style={pkg.featured
                          ? { background: 'rgba(12,147,232,0.18)', border: '1px solid rgba(12,147,232,0.22)' }
                          : { background: 'rgba(12,147,232,0.08)' }
                        }
                      >
                        <Check size={9} className="text-electric-400" strokeWidth={3} />
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.85rem', lineHeight: 1.6 }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  onClick={goToContact}
                  className={`flex items-center justify-center gap-2.5 font-semibold
                               py-3.5 px-6 rounded-xl transition-all duration-200 group
                               text-[0.88rem] tracking-[-0.01em]
                              ${pkg.featured
                                ? 'bg-electric-500 text-white hover:bg-electric-400 hover:-translate-y-[2px] hover:shadow-[0_4px_24px_rgba(12,147,232,0.45)]'
                                : 'border border-white/[0.18] text-white/80 bg-white/[0.04] hover:text-white hover:border-electric-500/[0.38] hover:bg-white/[0.07] hover:-translate-y-[1px] hover:shadow-[0_2px_16px_rgba(12,147,232,0.12)]'
                              }`}
                >
                  {pkg.cta}
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`text-center text-white/35 text-[0.8rem] mt-10 transition-all duration-700 delay-500 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Final price depends on content, number of pages, integrations and project scope.
        </p>
      </div>
    </section>
  );
}
