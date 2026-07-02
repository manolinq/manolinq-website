import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  useSeo({
    title: 'Contact | Get a Free Website Audit — Manolinq',
    description:
      'Get in touch with Manolinq for a free website audit. Share your website, social page or business idea and we will reply within 24 hours with clear next steps.',
    path: '/contact',
  });

  const { ref, inView } = useInView();

  return (
    <>
      {/* Header */}
      <section ref={ref} className="relative pt-36 pb-12 lg:pt-44 lg:pb-16 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.07) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        <div className={`relative max-w-3xl mx-auto px-5 sm:px-7 lg:px-8 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Let's Talk
          </div>
          <h1
            className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)' }}
          >
            Ready to start?{' '}
            <span className="electric-gradient-text">Get in touch.</span>
          </h1>
          <p
            className="mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '38rem' }}
          >
            Fill in the form and we'll review your business, website or social page within 24 hours with a clear next-step recommendation.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative py-12 lg:py-16 pb-28 lg:pb-36 overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.045) 0%, transparent 65%)' }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm animate={false} />
        </div>
      </section>
    </>
  );
}
