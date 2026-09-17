import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface PageHeaderProps {
  tag: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

/**
 * Standard top-of-page hero used across all inner pages. Keeps a consistent
 * layout with the electric-blue design system: eyebrow tag, large gradient
 * headline, supporting copy, ambient glow, scroll-in animation.
 */
export default function PageHeader({ tag, title, description, children }: PageHeaderProps) {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden">
      {/* Ambient bloom */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.07) 0%, transparent 65%)' }}
      />
      {/* Grid backdrop */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div
        className={`relative max-w-3xl mx-auto px-5 sm:px-7 lg:px-8 text-center
                    transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="section-tag justify-center">
          <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
          {tag}
        </div>

        <h1
          className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-6"
          style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)' }}
        >
          {title}
        </h1>

        <p
          className="mx-auto"
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '38rem' }}
        >
          {description}
        </p>

        {children}
      </div>
    </section>
  );
}
