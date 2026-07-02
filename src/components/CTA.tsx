import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

export default function CTA() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden section-alt">
      <div className="section-divider absolute top-0" />
      <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />

      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep centre bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[900px] h-[600px] rounded-full
                        bg-[radial-gradient(ellipse_at_center,rgba(12,147,232,0.09)_0%,transparent_65%)]
                        animate-glow-pulse" />
        {/* Inner tighter bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[400px] h-[300px] rounded-full
                        bg-[radial-gradient(ellipse_at_center,rgba(12,147,232,0.06)_0%,transparent_70%)]" />
        {/* Radial vignette */}
        <div className="absolute inset-0
                        bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_50%,#07070f_100%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow */}
        <div
          className={`inline-flex items-center gap-2.5 mb-9 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-2 bg-electric-500/[0.08] border border-electric-500/[0.18]
                          rounded-full px-4 py-2">
            <Sparkles size={12} className="text-electric-400" />
            <span className="text-electric-400 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
              Free, no commitment
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2
          className={`text-white font-bold leading-[1.06] tracking-[-0.035em] mb-7
                      transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}
        >
          Want to know what your{' '}
          <span className="electric-gradient-text">business needs?</span>
        </h2>

        {/* Body */}
        <p
          className={`text-white/40 text-[1.05rem] max-w-[520px] mx-auto mb-12
                      leading-[1.8] transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Send your current website or business page and we'll give you a quick free audit —
          what's working, what's not, and exactly what you need to start getting more clients.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-8
                      transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link to="/contact" className="btn-primary text-[0.95rem] px-10 py-4 justify-center">
            Request Free Audit
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <a
            href="https://wa.me/32456326720?text=Hey%2C%20I%27m%20interested%20in%20a%20website%20or%20AI%20system.%20Can%20you%20take%20a%20quick%20look%20at%20my%20business%3F"
            className="btn-secondary text-[0.95rem] px-10 py-4 justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Trust note */}
        <p
          className={`text-white/18 text-[0.82rem] tracking-[0.04em]
                      transition-all duration-700 delay-400 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          No sales calls.&nbsp;&nbsp;No pressure.&nbsp;&nbsp;Just honest advice.
        </p>
      </div>
    </section>
  );
}
