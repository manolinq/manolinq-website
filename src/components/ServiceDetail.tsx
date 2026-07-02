import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import PageHeader from './PageHeader';
import CTABand from './CTABand';

export interface Feature {
  title: string;
  description: string;
}

export interface Deliverable {
  text: string;
}

export interface FAQ {
  q: string;
  a: string;
}

interface ServiceDetailProps {
  tag: string;
  title: ReactNode;
  description: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  features: Feature[];
  deliverables: Deliverable[];
  faqs: FAQ[];
  process: { step: string; title: string; description: string }[];
}

/**
 * Shared layout for the three service detail pages. Keeps a consistent
 * structure: header, features grid, deliverables list, mini-process, FAQs,
 * and a closing CTA — all in the electric-blue glassmorphism design system.
 */
export default function ServiceDetail(props: ServiceDetailProps) {
  // useSeo must be called in the page component itself (hook ordering), so we
  // accept seoTitle/seoDescription here and call the hook in the wrapper page.
  void props.seoTitle;
  void props.seoDescription;

  return (
    <>
      <PageHeader tag={props.tag} title={props.title} description={props.description} />

      {/* Back to services */}
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

      {/* Features grid */}
      <FeaturesSection features={props.features} />

      {/* What you get */}
      <DeliverablesSection deliverables={props.deliverables} />

      {/* How it works */}
      <ProcessSection process={props.process} />

      {/* FAQs */}
      <FaqSection faqs={props.faqs} />

      {/* Other services */}
      <OtherServices currentPath={props.path} />

      <CTABand
        title="Want this for"
        highlight="your business?"
        description="Tell us about your business and we'll show you exactly how this service would work for you."
      />
    </>
  );
}

function FeaturesSection({ features }: { features: Feature[] }) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-20 lg:py-24 overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            What's Included
          </div>
          <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
            Everything built to <span className="electric-gradient-text">convert visitors into clients</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-2xl p-7 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <h3 className="text-white font-semibold mb-2.5" style={{ fontSize: '1.05rem', letterSpacing: '-0.018em' }}>
                {f.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection({ deliverables }: { deliverables: Deliverable[] }) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-20 lg:py-24 section-alt overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
      <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Deliverables
          </div>
          <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
            Exactly what <span className="electric-gradient-text">you receive</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {deliverables.map((d, i) => (
            <div
              key={d.text}
              className={`flex items-center gap-3.5 rounded-xl p-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                background: 'rgba(11,11,21,0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(12,147,232,0.12)', border: '1px solid rgba(12,147,232,0.2)' }}
              >
                <Check size={11} strokeWidth={3} style={{ color: 'rgba(54,175,247,0.9)' }} />
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.5 }}>{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ process }: { process: ServiceDetailProps['process'] }) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-20 lg:py-24 overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            How It Works
          </div>
          <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
            A simple, <span className="electric-gradient-text">clear process</span>
          </h2>
        </div>

        <div className="space-y-4">
          {process.map((step, i) => (
            <div
              key={step.step}
              className={`flex gap-5 rounded-2xl p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
              style={{
                background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold"
                style={{ background: 'rgba(12,147,232,0.1)', border: '1px solid rgba(12,147,232,0.22)', color: 'rgba(54,175,247,0.9)', fontSize: '0.95rem' }}
              >
                {step.step}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1.5" style={{ fontSize: '1.02rem', letterSpacing: '-0.018em' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.75 }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: FAQ[] }) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-20 lg:py-24 section-alt overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
      <div className="max-w-3xl mx-auto px-5 sm:px-7 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Questions
          </div>
          <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
            Frequently <span className="electric-gradient-text">asked</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`rounded-2xl p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ background: 'rgba(11,11,21,0.6)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: `${i * 90}ms` }}
            >
              <h3 className="text-white font-semibold mb-2" style={{ fontSize: '0.98rem', letterSpacing: '-0.015em' }}>{faq.q}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.8 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const otherServices = [
  { label: 'Business Websites',      href: '/services/websites',      desc: 'Full premium sites' },
  { label: 'Landing Pages',          href: '/services/landing-pages', desc: 'One-page converters' },
  { label: 'AI Assistants & Automations', href: '/services/ai-systems', desc: 'Chat + workflow AI' },
];

function OtherServices({ currentPath }: { currentPath: string }) {
  const { ref, inView } = useInView();
  const others = otherServices.filter((s) => s.href !== currentPath);

  return (
    <section ref={ref} className="relative py-20 lg:py-24 overflow-hidden">
      <div className="section-divider absolute top-0" />
      <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-white font-bold tracking-[-0.03em] mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Other <span className="electric-gradient-text">services</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.92rem' }}>Explore what else we can build for you.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {others.map((s, i) => (
            <Link
              key={s.href}
              to={s.href}
              className={`group flex items-center justify-between rounded-2xl p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                transitionDelay: `${i * 120}ms`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(12,147,232,0.22)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div>
                <h3 className="text-white font-semibold mb-0.5" style={{ fontSize: '0.98rem' }}>{s.label}</h3>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>{s.desc}</p>
              </div>
              <ArrowRight size={16} strokeWidth={2.25} className="text-white/30 group-hover:text-electric-400 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
