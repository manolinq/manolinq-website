import { Target, Eye, Users, Zap, ShieldCheck } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';

const values = [
  { icon: Target,     title: 'Outcome-driven',    description: 'Every project is measured by one thing: does it bring you more leads, bookings and clients.' },
  { icon: Zap,        title: 'Fast & focused',     description: 'We move quickly, communicate clearly and keep the process simple and stress-free.' },
  { icon: ShieldCheck,title: 'Transparent',       description: 'Clear scope, clear price, no jargon. You always know what is happening and why.' },
  { icon: Users,      title: 'Built around you',   description: 'No templates. Every site and system is designed around your business and your clients.' },
];

const stats = [
  { value: '24h',   label: 'Average reply time' },
  { value: '1–2',   label: 'Weeks to launch' },
  { value: '100%',  label: 'Custom built' },
  { value: '0',     label: 'Hidden fees' },
];

const approach = [
  {
    title: 'We start with the audience',
    description: 'Before designing anything, we focus on who your clients are, what they care about and what makes them contact you. Every page, headline and button serves that journey.',
  },
  {
    title: 'Design that builds trust',
    description: 'A premium look signals a premium business. We design sites that make visitors feel confident reaching out — clean, modern and professional on every screen.',
  },
  {
    title: 'Systems, not just pages',
    description: 'A website alone is not enough. We connect it to forms, notifications, AI assistants and automations so every lead is captured and every opportunity is followed up.',
  },
  {
    title: 'Clear and human',
    description: 'No technical jargon, no endless meetings. We explain things simply, deliver on what we promise and stay available when you need us.',
  },
];

export default function AboutPage() {
  useSeo({
    title: 'About | Who We Are & How We Work — Manolinq',
    description:
      'Manolinq builds premium websites, landing pages and AI systems for businesses that want more leads, bookings and clients. Learn about our mission, values and approach.',
    path: '/about',
  });

  const { ref, inView } = useInView();
  const { ref: ref2, inView: inView2 } = useInView();
  const { ref: ref3, inView: inView3 } = useInView();

  return (
    <>
      <PageHeader
        tag="About Manolinq"
        title={<>We build digital systems that <span className="electric-gradient-text">grow businesses</span></>}
        description="Manolinq helps businesses attract more clients and close more deals online — through premium websites, high-converting landing pages and AI-powered automations."
      />

      {/* Mission + vision */}
      <section ref={ref} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            <div
              className={`rounded-2xl p-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: 'linear-gradient(160deg, #0c1628 0%, #090b18 60%, #07070f 100%)', border: '1px solid rgba(12,147,232,0.22)', boxShadow: 'inset 0 1px 0 rgba(12,147,232,0.1),0 0 60px rgba(12,147,232,0.08)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(12,147,232,0.16)', border: '1px solid rgba(12,147,232,0.26)' }}>
                <Target size={19} strokeWidth={1.75} style={{ color: 'rgba(147,212,253,0.9)' }} />
              </div>
              <div className="section-tag" style={{ marginBottom: '0.75rem' }}>
                <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
                Mission
              </div>
              <h3 className="text-white font-bold mb-3" style={{ fontSize: '1.4rem', letterSpacing: '-0.025em' }}>
                Bring businesses more clients
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem', lineHeight: 1.85 }}>
                We exist to help businesses grow by building digital systems that attract, capture and convert leads — making great businesses easy to find and easy to contact.
              </p>
            </div>

            <div
              className={`rounded-2xl p-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(12,147,232,0.08)', border: '1px solid rgba(12,147,232,0.14)' }}>
                <Eye size={19} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.72)' }} />
              </div>
              <div className="section-tag" style={{ marginBottom: '0.75rem' }}>
                <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
                Vision
              </div>
              <h3 className="text-white font-bold mb-3" style={{ fontSize: '1.4rem', letterSpacing: '-0.025em' }}>
                Premium digital presence for every business
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem', lineHeight: 1.85 }}>
                We believe every business deserves a website and systems that look premium and work hard for them — without the enterprise price tag or the technical complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center rounded-2xl p-7 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ background: 'rgba(11,11,21,0.5)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: `${i * 90}ms` }}
              >
                <div className="electric-gradient-text font-bold mb-2" style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', letterSpacing: '0.02em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={ref2} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              What We Stand For
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Our <span className="electric-gradient-text">values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`rounded-2xl p-6 transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ background: 'rgba(11,11,21,0.6)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(12,147,232,0.08)', border: '1px solid rgba(12,147,232,0.14)' }}>
                  <v.icon size={17} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.72)' }} />
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: '0.95rem' }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.83rem', lineHeight: 1.75 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section ref={ref3} className="relative py-20 lg:py-24 overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Our Approach
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              How we <span className="electric-gradient-text">think</span>
            </h2>
          </div>

          <div className="space-y-4">
            {approach.map((a, i) => (
              <div
                key={a.title}
                className={`flex gap-5 rounded-2xl p-7 transition-all duration-700 ${inView3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)', border: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold" style={{ background: 'rgba(12,147,232,0.1)', border: '1px solid rgba(12,147,232,0.22)', color: 'rgba(54,175,247,0.9)', fontSize: '0.92rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1.5" style={{ fontSize: '1.05rem', letterSpacing: '-0.018em' }}>{a.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8 }}>{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Let's Talk"
        title="Want to work"
        highlight="together?"
        description="Tell us about your business and we'll show you how we can help you grow — starting with a free audit."
      />
    </>
  );
}
