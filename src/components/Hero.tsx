import { ArrowRight, ChevronDown, Globe, MessageSquare, BarChart2, Check, Zap, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const trustPoints = [
  'Lead-focused websites',
  'Mobile-first builds',
  'AI-ready systems',
];

const statPills = [
  { value: '48h',  label: 'First Preview' },
  { value: '100%', label: 'Mobile-First'  },
  { value: '∞',    label: 'Custom Built'  },
];

export default function Hero() {
  const { ref, inView } = useInView();

  const vis = (delay = 0) =>
    `transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-[${delay}ms]`;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(12,147,232,0.013) 1px,transparent 1px),' +
          'linear-gradient(90deg,rgba(12,147,232,0.013) 1px,transparent 1px)',
        backgroundSize: '88px 88px',
      }}
    >
      {/* ── Ambient layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Headline-side glow */}
        <div
          className="absolute top-[38%] left-[0%] -translate-y-1/2 w-[640px] h-[640px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.065) 0%, transparent 65%)' }}
        />
        {/* Dashboard-side large bloom */}
        <div
          className="absolute top-[46%] right-[-8%] -translate-y-1/2 w-[780px] h-[780px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.07) 0%, transparent 60%)' }}
        />
        {/* Tight hotspot on mockup */}
        <div
          className="absolute top-[42%] right-[14%] -translate-y-1/2 w-[340px] h-[340px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.1) 0%, transparent 65%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#06060c] to-transparent" />
        <div className="absolute top-0   left-0 right-0 h-28 bg-gradient-to-b from-[#06060c] to-transparent" />
      </div>

      {/* ── Content wrapper ── */}
      <div
        className="relative z-10 w-full mx-auto
                   pb-10 lg:pt-0 lg:pb-0 lg:min-h-screen lg:flex lg:items-center"
        style={{ maxWidth: '1440px', padding: '0 clamp(20px, 5vw, 80px)' }}
      >
        <div
          className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center w-full
                     pt-24 pb-16 lg:pt-0 lg:pb-0"
        >

          {/* ══ LEFT ══ */}
          <div className="max-w-[600px]">

            {/* Eyebrow */}
            <div className={`mb-9 ${vis(0)}`}>
              <div
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
                  <span className="animate-ping absolute inset-0 rounded-full bg-electric-400 opacity-50" />
                  <span className="relative rounded-full h-[7px] w-[7px] bg-electric-400" />
                </span>
                <span style={{ color: 'rgba(226,226,232,0.42)', fontSize: '0.77rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                  Websites&ensp;·&ensp;Landing Pages&ensp;·&ensp;AI Systems
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className={`font-extrabold mb-7 ${vis(100)}`}
              style={{
                fontSize: 'clamp(2.1rem, 5.5vw, 3.75rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.034em',
              }}
            >
              <span style={{ color: '#f2f2f6' }}>Websites & AI Systems</span>
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(100deg, #a8dcfe 0%, #36aff7 42%, #0b8fde 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Built To Bring You
              </span>
              <br />
              <span style={{ color: '#f2f2f6' }}>More Clients</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`mb-10 ${vis(200)}`}
              style={{
                fontSize: '1.01rem',
                lineHeight: 1.88,
                color: 'rgba(226,226,232,0.56)',
                maxWidth: '480px',
              }}
            >
              Manolinq builds premium websites, landing pages and AI assistants that help
              businesses capture leads, automate follow-up and turn visitors into clients.
            </p>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 mb-10 ${vis(300)}`}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5
                           font-semibold text-white text-[0.88rem] tracking-[-0.01em]
                           px-7 py-[14px] rounded-xl w-full sm:w-auto
                           transition-all duration-200
                           active:scale-[0.98] active:translate-y-0"
                style={{
                  background: 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)',
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.15) inset,' +
                    '0 4px 18px rgba(12,147,232,0.35)',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'linear-gradient(160deg, #2eb0ff 0%, #0c93e8 100%)';
                  el.style.boxShadow =
                    '0 1px 0 rgba(255,255,255,0.18) inset,' +
                    '0 8px 32px rgba(12,147,232,0.6),' +
                    '0 0 0 1px rgba(12,147,232,0.35),' +
                    '0 0 60px rgba(12,147,232,0.18)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'linear-gradient(160deg, #1a9ef5 0%, #0a88d8 100%)';
                  el.style.boxShadow =
                    '0 1px 0 rgba(255,255,255,0.15) inset,' +
                    '0 4px 18px rgba(12,147,232,0.35)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                Get a Free Website Audit
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2.5
                           font-semibold text-[0.88rem] tracking-[-0.01em]
                           px-7 py-[14px] rounded-xl w-full sm:w-auto
                           transition-all duration-200
                           active:scale-[0.98] active:translate-y-0"
                style={{
                  color: 'rgba(226,226,232,0.56)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  background: 'rgba(255,255,255,0.028)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'rgba(226,226,232,0.88)';
                  el.style.border = '1px solid rgba(255,255,255,0.22)';
                  el.style.background = 'rgba(255,255,255,0.055)';
                  el.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'rgba(226,226,232,0.56)';
                  el.style.border = '1px solid rgba(255,255,255,0.13)';
                  el.style.background = 'rgba(255,255,255,0.028)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                View Services
              </a>
            </div>

            {/* Trust points */}
            <div className={`flex flex-wrap gap-x-7 gap-y-3 ${vis(440)}`}>
              {trustPoints.map((label) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span
                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(12,147,232,0.12)',
                      border: '1px solid rgba(12,147,232,0.22)',
                    }}
                  >
                    <Check size={8} className="text-electric-400" strokeWidth={3} />
                  </span>
                  <span style={{ color: 'rgba(226,226,232,0.4)', fontSize: '0.82rem' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — Dashboard mockup ══ */}
          <div
            className={`relative transition-all duration-1000 delay-[380ms]
                        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Central glow orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[560px] h-[560px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.22) 0%, rgba(12,147,232,0.06) 45%, transparent 68%)' }}
            />

            {/* Perspective shell — overflow hidden on mobile so floaters don't bleed */}
            <div className="relative overflow-hidden lg:overflow-visible" style={{ perspective: '1000px' }}>

              {/* ── MAIN BROWSER CARD ── */}
              <div
                className="relative rounded-[18px] overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #12122a 0%, #0a0a14 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow:
                    '0 2px 0 rgba(255,255,255,0.07) inset,' +
                    '0 36px 100px rgba(0,0,0,0.7),' +
                    '0 0 0 1px rgba(12,147,232,0.06)',
                }}
              >
                {/* Chrome bar */}
                <div
                  className="flex items-center gap-1.5 px-4 py-[11px]"
                  style={{
                    background: 'rgba(255,255,255,0.032)',
                    borderBottom: '1px solid rgba(255,255,255,0.072)',
                  }}
                >
                  <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'rgba(255,95,87,0.45)' }} />
                  <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'rgba(255,189,46,0.45)' }} />
                  <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'rgba(39,201,63,0.45)' }} />
                  <div
                    className="ml-4 flex-1 max-w-[190px] rounded-md px-3 py-[5px]
                                flex items-center gap-1.5"
                    style={{
                      background: 'rgba(255,255,255,0.035)',
                      border: '1px solid rgba(255,255,255,0.055)',
                    }}
                  >
                    <Globe size={9} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.63rem' }}>yourbusiness.com</span>
                  </div>
                </div>

                {/* Page body */}
                <div className="p-5 space-y-3">
                  {/* Hero area */}
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(12,147,232,0.13) 0%, rgba(10,10,22,0.55) 100%)',
                      border: '1px solid rgba(12,147,232,0.16)',
                    }}
                  >
                    <div className="flex gap-2.5 items-center mb-4">
                      <div className="w-5 h-5 rounded-md" style={{ background: 'rgba(12,147,232,0.3)' }} />
                      <div className="h-2 w-20 rounded-full" style={{ background: 'rgba(12,147,232,0.22)' }} />
                    </div>
                    <div className="h-[11px] w-[70%] rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.17)' }} />
                    <div className="h-[11px] w-[52%] rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    <div className="flex gap-2.5">
                      <div
                        className="h-8 w-[96px] rounded-lg"
                        style={{ background: 'linear-gradient(90deg, #0c93e8, #36aff7)' }}
                      />
                      <div
                        className="h-8 w-[76px] rounded-lg"
                        style={{
                          background: 'rgba(255,255,255,0.045)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Service cards row */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { label: 'Website', accent: true  },
                      { label: 'Landing', accent: false },
                      { label: 'AI Bot',  accent: false },
                    ].map(({ label, accent }) => (
                      <div
                        key={label}
                        className="rounded-xl p-3"
                        style={{
                          background: accent
                            ? 'linear-gradient(135deg,rgba(12,147,232,0.16),rgba(10,10,22,0.65))'
                            : 'rgba(255,255,255,0.038)',
                          border: accent
                            ? '1px solid rgba(12,147,232,0.22)'
                            : '1px solid rgba(255,255,255,0.072)',
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg mb-2.5 flex items-center justify-center"
                          style={{ background: accent ? 'rgba(12,147,232,0.22)' : 'rgba(255,255,255,0.05)' }}
                        >
                          <div
                            className="w-[9px] h-[9px] rounded-sm"
                            style={{ background: accent ? '#36aff7' : 'rgba(255,255,255,0.2)' }}
                          />
                        </div>
                        <div className="h-1.5 w-full rounded-full mb-1.5"
                          style={{ background: accent ? 'rgba(12,147,232,0.18)' : 'rgba(255,255,255,0.06)' }} />
                        <div className="h-1.5 w-2/3 rounded-full" style={{ background: 'rgba(255,255,255,0.035)' }} />
                      </div>
                    ))}
                  </div>

                  {/* Analytics bar */}
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-4"
                    style={{
                      background: 'rgba(255,255,255,0.032)',
                      border: '1px solid rgba(255,255,255,0.068)',
                    }}
                  >
                    <TrendingUp size={13} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.6)', flexShrink: 0 }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.61rem' }}>Monthly leads</span>
                        <span style={{ color: 'rgba(54,175,247,0.8)', fontSize: '0.61rem', fontWeight: 600 }}>+38%</span>
                      </div>
                      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: '68%', background: 'linear-gradient(90deg,#0c93e8,#36aff7)' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── LEAD NOTIFICATION — top-right floating ── */}
              <div
                className="absolute -top-6 -right-4 lg:-right-10 w-[192px] rounded-2xl px-4 py-4"
                style={{
                  background: 'linear-gradient(145deg, rgba(11,19,40,0.98) 0%, rgba(9,10,22,0.98) 100%)',
                  border: '1px solid rgba(12,147,232,0.28)',
                  boxShadow:
                    '0 20px 60px rgba(0,0,0,0.7),' +
                    '0 0 0 1px rgba(12,147,232,0.1),' +
                    '0 0 44px rgba(12,147,232,0.14),' +
                    'inset 0 1px 0 rgba(12,147,232,0.14)',
                  backdropFilter: 'blur(24px)',
                }}
              >
                {/* Shimmer top */}
                <div
                  className="absolute top-0 left-6 right-6 h-[1px] shimmer-line"
                  style={{ opacity: 0.65 }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(12,147,232,0.18)',
                      border: '1px solid rgba(12,147,232,0.28)',
                      boxShadow: '0 0 10px rgba(12,147,232,0.22)',
                    }}
                  >
                    <Zap size={11} style={{ color: '#36aff7' }} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: '0.67rem', fontWeight: 600, lineHeight: 1 }} className="mb-[3px]">
                      New Lead
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.24)', fontSize: '0.59rem' }}>just now</div>
                  </div>
                  <div
                    className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: '#36aff7', boxShadow: '0 0 7px rgba(54,175,247,0.9)' }}
                  />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.77rem', fontWeight: 600, letterSpacing: '-0.01em' }} className="mb-[3px]">
                  Sarah M.
                </div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.66rem' }} className="mb-3.5">
                  Requested website audit
                </div>
                <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: '74%', background: 'linear-gradient(90deg,#0c93e8,#36aff7)' }}
                  />
                </div>
              </div>

              {/* ── AI CHAT — bottom-left floating ── */}
              <div
                className="absolute -bottom-8 -left-4 lg:-left-10 w-[210px] rounded-2xl p-4"
                style={{
                  background: 'linear-gradient(150deg, rgba(10,12,26,0.98) 0%, rgba(8,8,18,0.98) 100%)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow:
                    '0 20px 60px rgba(0,0,0,0.7),' +
                    'inset 0 1px 0 rgba(255,255,255,0.055)',
                  backdropFilter: 'blur(24px)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(12,147,232,0.16)',
                        border: '1px solid rgba(12,147,232,0.24)',
                      }}
                    >
                      <MessageSquare size={10} style={{ color: '#36aff7' }} strokeWidth={2} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.66rem', fontWeight: 500 }}>
                      AI Assistant
                    </span>
                  </div>
                  <div className="flex gap-[3px] items-end pb-0.5">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-[3px] h-[3px] rounded-full animate-bounce"
                        style={{ background: 'rgba(54,175,247,0.55)', animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className="rounded-xl rounded-tl-sm px-3 py-2.5"
                    style={{
                      background: 'rgba(255,255,255,0.045)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.66rem', lineHeight: '1.6' }}>
                      Hi! How can I help your business today?
                    </span>
                  </div>
                  <div
                    className="rounded-xl rounded-tr-sm px-3 py-2.5 ml-4"
                    style={{
                      background: 'rgba(12,147,232,0.1)',
                      border: '1px solid rgba(12,147,232,0.17)',
                    }}
                  >
                    <span style={{ color: 'rgba(147,212,253,0.72)', fontSize: '0.66rem', lineHeight: '1.6' }}>
                      I need a new website for my business...
                    </span>
                  </div>
                </div>
              </div>

              {/* ── ANALYTICS CARD — bottom-right ── */}
              <div
                className="absolute -bottom-3 right-6 lg:right-2 w-[152px] rounded-2xl px-4 py-3.5"
                style={{
                  background: 'linear-gradient(150deg, rgba(11,11,24,0.98) 0%, rgba(8,8,17,0.98) 100%)',
                  border: '1px solid rgba(255,255,255,0.085)',
                  boxShadow:
                    '0 14px 44px rgba(0,0,0,0.6),' +
                    'inset 0 1px 0 rgba(255,255,255,0.045)',
                  backdropFilter: 'blur(24px)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.63rem', fontWeight: 500 }}>
                    Conversion
                  </span>
                  <BarChart2 size={11} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.52)' }} />
                </div>
                <div
                  className="font-black leading-none mb-[3px]"
                  style={{
                    fontSize: '1.4rem',
                    letterSpacing: '-0.04em',
                    backgroundImage: 'linear-gradient(135deg, #93d4fd, #0c93e8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  +34%
                </div>
                <div style={{ color: 'rgba(54,175,247,0.52)', fontSize: '0.62rem' }} className="mb-4">
                  ↑ vs last month
                </div>
                <div className="flex items-end gap-[3px] h-8">
                  {[30, 50, 42, 68, 58, 78, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 6
                            ? 'linear-gradient(180deg, #36aff7, #0c93e8)'
                            : 'rgba(255,255,255,0.07)',
                        boxShadow: i === 6 ? '0 0 7px rgba(12,147,232,0.45)' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Stat pills ── desktop only ── */}
            <div className="hidden lg:flex items-center gap-2.5 mt-12 justify-center">
              {statPills.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-full px-4 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.022)',
                    border: '1px solid rgba(255,255,255,0.062)',
                  }}
                >
                  <span
                    className="font-bold"
                    style={{
                      fontSize: '0.83rem',
                      letterSpacing: '-0.02em',
                      backgroundImage: 'linear-gradient(90deg, #7ac9fb, #0c93e8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {value}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.24)', fontSize: '0.73rem' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <a
        href="#problem"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-float
                   transition-colors duration-300"
        style={{ color: 'rgba(255,255,255,0.12)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(54,175,247,0.45)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.12)'; }}
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </a>
    </section>
  );
}
