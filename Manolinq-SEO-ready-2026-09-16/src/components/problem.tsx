import { AlertTriangle, TrendingDown, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Outdated First Impression',
    text: 'An old or messy website makes your business look less trustworthy before a visitor even contacts you.',
  },
  {
    icon: TrendingDown,
    title: 'No Clear Lead Capture',
    text: "If there's no strong call-to-action, form, WhatsApp button or follow-up system, interested visitors leave without becoming leads.",
  },
  {
    icon: Users,
    title: 'Confusing Customer Journey',
    text: "When people can't quickly understand what you offer, why it matters and how to contact you, they move on.",
  },
];

export default function Problem() {
  const { ref, inView } = useInView();

  return (
    <section id="problem" ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      <div className="section-divider absolute top-0" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.04) 0%, transparent 65%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-8">

        {/* Header */}
        <div
          className={`text-center max-w-[640px] mx-auto mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: 'rgba(239,68,68,0.7)', flexShrink: 0 }} />
            The Problem
          </div>
          <h2
            className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2rem,4.5vw,2.9rem)' }}
          >
            Your website should do more than{' '}
            <span className="electric-gradient-text">just look good.</span>
          </h2>
          <p className="text-white/40 text-[1.05rem] leading-[1.8]">
            Most businesses don't lose clients because their service is bad. They lose them because
            their website looks outdated, feels unclear or gives visitors no easy way to take action.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {painPoints.map((point, i) => (
            <div
              key={point.title}
              className={`group relative rounded-2xl overflow-hidden flex flex-col
                          transition-all duration-500 ease-out
                          active:scale-[0.985] active:brightness-110
                          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                background: 'linear-gradient(160deg, #0d0d1c 0%, #090910 100%)',
                /* Mobile: always show subtle red accent border and glow */
                border: '1px solid rgba(220,38,38,0.16)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.04),' +
                  '0 0 24px rgba(220,38,38,0.05)',
                transitionDelay: `${i * 130 + 200}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = '1px solid rgba(220,38,38,0.22)';
                el.style.background = 'linear-gradient(160deg, #100c1a 0%, #0b0910 100%)';
                el.style.boxShadow =
                  'inset 0 1px 0 rgba(255,255,255,0.05),' +
                  '0 0 48px rgba(220,38,38,0.07),' +
                  '0 20px 60px rgba(0,0,0,0.4)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = '1px solid rgba(220,38,38,0.16)';
                el.style.background = 'linear-gradient(160deg, #0d0d1c 0%, #090910 100%)';
                el.style.boxShadow =
                  'inset 0 1px 0 rgba(255,255,255,0.04),' +
                  '0 0 24px rgba(220,38,38,0.05)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent line — always visible on mobile, brightens on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]
                            opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }}
              />

              {/* Ghost number */}
              <span
                className="absolute -bottom-3 -right-1 font-black select-none leading-none tracking-tighter"
                style={{ fontSize: '5.5rem', color: 'rgba(255,255,255,0.018)' }}
              >
                {i + 1}
              </span>

              <div className="relative flex flex-col flex-1 p-8">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 flex-shrink-0
                              transition-colors duration-300"
                  style={{
                    background: 'rgba(220,38,38,0.07)',
                    border: '1px solid rgba(220,38,38,0.13)',
                  }}
                >
                  <point.icon size={18} strokeWidth={1.75} style={{ color: 'rgba(248,113,113,0.72)' }} />
                </div>

                <h3
                  className="text-white font-semibold mb-3.5 leading-snug"
                  style={{ fontSize: '1.01rem', letterSpacing: '-0.015em' }}
                >
                  {point.title}
                </h3>
                <p
                  className="flex-1"
                  style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem', lineHeight: 1.82 }}
                >
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 transition-all duration-700 delay-[550ms] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className="max-w-xl mx-auto rounded-2xl px-8 py-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.018)',
              border: '1px solid rgba(255,255,255,0.065)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            <p
              className="mb-6"
              style={{ color: 'rgba(226,226,232,0.46)', fontSize: '0.97rem', lineHeight: 1.7 }}
            >
              If this sounds familiar, your website is probably costing you leads.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 font-semibold text-white text-[0.88rem]
                         tracking-[-0.01em] px-7 py-[13px] rounded-xl
                         transition-all duration-200"
              style={{
                background: 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 18px rgba(12,147,232,0.32)',
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
