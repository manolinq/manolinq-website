import { Link } from 'react-router-dom';
import { Search, FileText, Hammer, Rocket, ArrowRight, Check } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Free Audit',
    tag: 'Day 0',
    description: 'We review your current website, social page or business setup and identify exactly what needs to improve to get more leads.',
    details: [
      'Review of your current website or social presence',
      'Identify what is costing you leads and bookings',
      'Highlight quick wins and bigger opportunities',
      'No cost, no obligation',
    ],
  },
  {
    number: '02',
    icon: FileText,
    title: 'Plan & Proposal',
    tag: 'Day 1–2',
    description: 'You get a clear recommendation, project scope, timeline and price before anything starts. No confusion, no surprises.',
    details: [
      'Clear recommendation tailored to your business',
      'Detailed project scope and deliverables',
      'Transparent timeline and price',
      'Written proposal before any work begins',
    ],
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build & Review',
    tag: 'Day 3–14',
    description: 'We design and build your website, landing page or AI system, then review it with you before launch.',
    details: [
      'Design and build in your brand style',
      'Regular progress updates and previews',
      'Structured revision rounds',
      'Final review and approval before launch',
    ],
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    tag: 'Launch + After',
    description: 'We connect your domain, forms, WhatsApp links and basic tracking, then support you through the launch period.',
    details: [
      'Domain, SSL and hosting setup',
      'Form, WhatsApp and tracking connections',
      'Post-launch support window',
      'Guidance on how to use and update your site',
    ],
  },
];

const principles = [
  {
    title: 'No jargon, no confusion',
    description: 'We explain everything in plain language. You always know what is happening and why.',
  },
  {
    title: 'Clear scope upfront',
    description: 'You get a written scope and price before work starts. No surprise invoices.',
  },
  {
    title: 'Built around your business',
    description: 'Every decision is made with your clients, services and goals in mind — not a template.',
  },
  {
    title: 'You own everything',
    description: 'Your website, domain, content and accounts belong to you. We just build and support.',
  },
];

export default function ProcessPage() {
  useSeo({
    title: 'Process | How We Build Websites & AI Systems — Manolinq',
    description:
      'A simple four-step process: free audit, plan and proposal, build and review, then launch and support. Clear scope, transparent pricing, no surprises.',
    path: '/process',
  });

  const { ref, inView } = useInView();
  const { ref: ref2, inView: inView2 } = useInView();

  return (
    <>
      <PageHeader
        tag="How It Works"
        title={<>A simple, <span className="electric-gradient-text">clear process</span></>}
        description="From first conversation to launch and beyond — a straightforward process designed to keep things clear, transparent and stress-free."
      />

      {/* Steps timeline */}
      <section ref={ref} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex gap-5 sm:gap-7 rounded-2xl p-7 sm:p-8 transition-all duration-700
                            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transitionDelay: `${i * 140}ms`,
                }}
              >
                {/* Number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(12,147,232,0.1)', border: '1px solid rgba(12,147,232,0.22)' }}
                  >
                    <step.icon size={19} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.9)' }} />
                  </div>
                  <span className="text-electric-400/50 font-bold" style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}>{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 mb-2.5">
                    <h3 className="text-white font-bold" style={{ fontSize: '1.15rem', letterSpacing: '-0.02em' }}>{step.title}</h3>
                    <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(12,147,232,0.1)', border: '1px solid rgba(12,147,232,0.18)', color: 'rgba(54,175,247,0.7)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {step.tag}
                    </span>
                  </div>
                  <p className="mb-5" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8 }}>{step.description}</p>

                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-[16px] h-[16px] rounded-full flex items-center justify-center" style={{ background: 'rgba(12,147,232,0.1)' }}>
                          <Check size={8} strokeWidth={3} style={{ color: 'rgba(54,175,247,0.85)' }} />
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.5 }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 flex justify-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/contact" className="btn-primary">
              Start with a Free Audit
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section ref={ref2} className="relative py-20 lg:py-24 overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Our Principles
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              How we <span className="electric-gradient-text">work with you</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={`rounded-2xl p-7 transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ background: 'rgba(11,11,21,0.6)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: '1rem', letterSpacing: '-0.015em' }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.8 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to start"
        highlight="with a free audit?"
        description="Share your website, social page or business idea and we'll show you what can be improved — free of charge."
      />
    </>
  );
}
