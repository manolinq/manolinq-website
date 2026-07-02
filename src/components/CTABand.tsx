import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

interface CTABandProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
}

/**
 * Reusable bottom-of-page CTA band. Visual match to the homepage CTA section.
 */
export default function CTABand({
  eyebrow = 'Ready When You Are',
  title,
  highlight,
  description,
}: CTABandProps) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      <div className="section-divider absolute top-0" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[460px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.075) 0%, transparent 60%)' }}
      />

      <div
        className={`relative max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center
                    transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="section-tag justify-center">
          <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
          {eyebrow}
        </div>

        <h2
          className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-5"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
        >
          {title}{' '}
          {highlight && <span className="electric-gradient-text">{highlight}</span>}
        </h2>

        {description && (
          <p
            className="mx-auto mb-9"
            style={{ color: 'rgba(255,255,255,0.42)', fontSize: '1.02rem', lineHeight: 1.8, maxWidth: '34rem' }}
          >
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact" className="btn-primary text-[0.95rem] px-9 py-4 justify-center">
            Request Free Audit
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link to="/pricing" className="btn-secondary text-[0.95rem] px-9 py-4 justify-center">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
