import { Search, FileText, Hammer, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Free Audit',
    description: 'We review your current website, social page or business setup and identify what needs to improve to get more leads.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Plan & Proposal',
    description: 'You get a clear recommendation, project scope, timeline and price before anything starts. No confusion, no surprises.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build & Review',
    description: 'We design and build your website, landing page or AI system, then review it with you before launch.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We connect your domain, forms, WhatsApp links and basic tracking, then support you through the launch period.',
  },
];

export default function Process() {
  const { ref, inView } = useInView();

  return (
    <section id="process" ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      <div className="section-divider absolute top-0" />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.045) 0%, transparent 65%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">

        {/* Header */}
        <div
          className={`flex flex-col items-center text-center max-w-[600px] mx-auto mb-14
                      transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            How It Works
          </div>
          <h2
            className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-5"
            style={{ fontSize: 'clamp(2rem,4.5vw,2.9rem)' }}
          >
            Simple process,{' '}
            <span className="electric-gradient-text">clear result</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '1.02rem', lineHeight: 1.8 }}>
            From first audit to live website — here's exactly how we work together.
          </p>
        </div>

        {/* Desktop — 4 columns */}
        <div className="hidden md:grid md:grid-cols-4 gap-5 relative">

          {/* Connecting track */}
          <div className="absolute top-[2.6rem] left-[12.5%] right-[12.5%] h-px pointer-events-none z-0">
            <div
              className="h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(12,147,232,0.22) 20%, rgba(12,147,232,0.3) 50%, rgba(12,147,232,0.22) 80%, transparent 100%)',
              }}
            />
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="h-full w-20"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(12,147,232,0.55), transparent)',
                  animation: 'slide-right 3s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} inView={inView} />
          ))}
        </div>

        {/* Mobile — vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <MobileStep key={step.title} step={step} index={i} inView={inView} last={i === steps.length - 1} />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 flex justify-center transition-all duration-700 delay-[650ms] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className="w-full max-w-xl rounded-2xl px-8 py-7 flex flex-col items-center"
            style={{
              background: 'linear-gradient(160deg, rgba(12,147,232,0.07) 0%, rgba(255,255,255,0.018) 100%)',
              border: '1px solid rgba(12,147,232,0.2)',
              boxShadow:
                'inset 0 1px 0 rgba(12,147,232,0.1),' +
                '0 0 50px rgba(12,147,232,0.07)',
            }}
          >
            <p
              className="mb-5 text-center font-medium"
              style={{ color: 'rgba(226,226,232,0.78)', fontSize: '1.02rem', lineHeight: 1.7 }}
            >
              Ready to see what your website needs?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 font-semibold text-white text-[0.88rem]
                         tracking-[-0.01em] px-7 py-[13px] rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)',
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.16) inset,' +
                  '0 4px 20px rgba(12,147,232,0.42),' +
                  '0 0 0 1px rgba(12,147,232,0.18)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'linear-gradient(160deg, #2eb0ff 0%, #0c93e8 100%)';
                el.style.boxShadow =
                  '0 1px 0 rgba(255,255,255,0.18) inset,' +
                  '0 8px 32px rgba(12,147,232,0.55),' +
                  '0 0 0 1px rgba(12,147,232,0.3)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)';
                el.style.boxShadow =
                  '0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 18px rgba(12,147,232,0.32)';
                el.style.transform = 'translateY(0)';
              }}
            >
              Get a Free Website Audit
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

type Step = typeof steps[number];

function StepCard({ step, index, inView }: { step: Step; index: number; inView: boolean }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(-5px)';
    el.style.background = 'rgba(255,255,255,0.025)';
    el.style.borderColor = 'rgba(12,147,232,0.18)';
    el.style.boxShadow =
      'inset 0 1px 0 rgba(255,255,255,0.04),' +
      '0 12px 40px rgba(0,0,0,0.3),' +
      '0 0 32px rgba(12,147,232,0.06)';

    const iconWrap = el.querySelector('[data-icon-wrap]') as HTMLElement | null;
    if (iconWrap) {
      iconWrap.style.boxShadow = '0 0 20px rgba(12,147,232,0.28)';
      iconWrap.style.borderColor = 'rgba(12,147,232,0.28)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(0)';
    el.style.background = 'rgba(255,255,255,0.012)';
    el.style.borderColor = 'rgba(255,255,255,0.065)';
    el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03)';

    const iconWrap = el.querySelector('[data-icon-wrap]') as HTMLElement | null;
    if (iconWrap) {
      iconWrap.style.boxShadow = 'none';
      iconWrap.style.borderColor = 'rgba(255,255,255,0.09)';
    }
  };

  return (
    <div
      className={`relative z-10 text-center flex flex-col items-center
                  rounded-2xl px-5 pt-7 pb-7 cursor-default
                  active:scale-[0.985]
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        background: 'rgba(255,255,255,0.012)',
        border: '1px solid rgba(255,255,255,0.065)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        transitionDelay: `${index * 150}ms`,
        transition: 'opacity 0.7s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon circle */}
      <div className="relative mb-6 flex-shrink-0">
        <div
          data-icon-wrap
          className="w-[4.2rem] h-[4.2rem] rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(160deg, #0d0d1e 0%, #090910 100%)',
            border: '1px solid rgba(255,255,255,0.09)',
            transition: 'box-shadow 0.3s, border-color 0.3s',
          }}
        >
          <step.icon size={21} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.82)' }} />
        </div>
        {/* Number badge */}
        <div
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1a9ef5, #0a7fc8)',
            boxShadow: '0 0 10px rgba(12,147,232,0.5)',
          }}
        >
          <span className="text-white font-black" style={{ fontSize: '0.58rem' }}>{index + 1}</span>
        </div>
      </div>

      <h3
        className="text-white font-semibold mb-3"
        style={{ fontSize: '0.97rem', letterSpacing: '-0.015em' }}
      >
        {step.title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.46)', fontSize: '0.845rem', lineHeight: 1.8 }}>
        {step.description}
      </p>
    </div>
  );
}

function MobileStep({
  step,
  index,
  inView,
  last,
}: {
  step: Step;
  index: number;
  inView: boolean;
  last: boolean;
}) {
  return (
    <div
      className={`relative flex gap-4 transition-all duration-700 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      {/* Left column: icon + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(160deg, #0d0d1e 0%, #090910 100%)',
            border: '1px solid rgba(12,147,232,0.2)',
            boxShadow: '0 0 12px rgba(12,147,232,0.08)',
          }}
        >
          <step.icon size={17} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.8)' }} />
        </div>
        {!last && (
          <div
            className="w-px flex-1 my-2"
            style={{
              background: 'linear-gradient(to bottom, rgba(12,147,232,0.28), transparent)',
            }}
          />
        )}
      </div>

      {/* Right column: text */}
      <div
        className="flex-1 rounded-xl px-4 py-4 mb-4 active:scale-[0.985] active:brightness-110
                   transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.018)',
          border: '1px solid rgba(12,147,232,0.14)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.03),' +
            '0 0 16px rgba(12,147,232,0.05)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            style={{
              color: 'rgba(54,175,247,0.4)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}
          >
            {step.number}
          </span>
          <h3
            className="text-white font-semibold"
            style={{ fontSize: '0.97rem', letterSpacing: '-0.015em' }}
          >
            {step.title}
          </h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.46)', fontSize: '0.845rem', lineHeight: 1.8 }}>
          {step.description}
        </p>
      </div>
    </div>
  );
}
