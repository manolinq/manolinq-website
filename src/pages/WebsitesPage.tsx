import { Link } from 'react-router-dom';
import { Check, ArrowRight, Users, Zap, TrendingUp } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import ServiceDetail from '../components/ServiceDetail';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';

const whoItIsFor = [
  'Service businesses that need to look professional online',
  'Local businesses without a website or with an outdated one',
  'Tradespeople, consultants and freelancers looking for more enquiries',
  'Businesses running on social media alone and ready to level up',
];

const whyItWorks = [
  {
    icon: Users,
    title: 'Built around your clients',
    description: 'Every headline, section and call-to-action is structured around how your ideal clients think — not just what looks good.',
  },
  {
    icon: TrendingUp,
    title: 'Designed to convert',
    description: 'Trust signals, clear service explanations and frictionless contact points are built into every page to turn visitors into leads.',
  },
  {
    icon: Zap,
    title: 'Fast and reliable',
    description: 'Pages load in under a second on mobile. No bloated templates, no slow builders — just lean, modern code that performs.',
  },
];

export default function WebsitesPage() {
  useSeo({
    title: 'Business Websites | Premium Sites That Convert — Manolinq',
    description:
      'Manolinq builds modern, mobile-friendly websites for businesses that need trust, clarity and more enquiries. Starting from €750.',
    path: '/services/websites',
  });

  const { ref: whoRef, inView: whoInView } = useInView();
  const { ref: whyRef, inView: whyInView } = useInView();
  const { ref: priceRef, inView: priceInView } = useInView();

  return (
    <>
      <ServiceDetail
        tag="Business Websites"
        title={<>Premium websites built to turn <span className="electric-gradient-text">visitors into leads</span></>}
        description="Manolinq builds modern, mobile-friendly websites for businesses that need trust, clarity and more enquiries. Every site is designed from scratch — no templates, no shortcuts."
        path="/services/websites"
        seoTitle=""
        seoDescription=""
        features={[
          {
            title: 'Custom design & branding',
            description: 'Every site is designed from scratch around your brand — colours, typography, imagery and layout that reflect the quality of your business.',
          },
          {
            title: 'Mobile-first responsive layout',
            description: 'Over 70% of visitors browse on mobile. Your site looks and works flawlessly on every screen size, from phone to desktop.',
          },
          {
            title: 'Service pages built to convert',
            description: 'Each page is structured around a clear offer and call-to-action, guiding visitors toward contacting you or booking a service.',
          },
          {
            title: 'Contact form + WhatsApp integration',
            description: 'Make it effortless to reach you — integrated contact forms, clickable WhatsApp, and direct links to your social profiles.',
          },
          {
            title: 'SEO foundations',
            description: 'Clean meta tags, semantic structure, fast load times and canonical URLs so search engines can find and index your pages.',
          },
          {
            title: 'Analytics setup',
            description: 'Your site is connected to tracking from day one so you can see where visitors come from and what pages perform best.',
          },
        ]}
        deliverables={[
          { text: 'Custom homepage designed around your business' },
          { text: 'Up to 5 service or info pages' },
          { text: 'Mobile-first responsive design' },
          { text: 'Contact form with lead capture' },
          { text: 'WhatsApp & social media integration' },
          { text: 'On-page SEO setup (meta, canonical, sitemap)' },
          { text: 'Fast, secure hosting deployment' },
          { text: 'Analytics-ready structure' },
        ]}
        process={[
          { step: '01', title: 'Discovery call', description: 'We learn about your business, your services, your clients and what makes you different.' },
          { step: '02', title: 'Design & build', description: 'We design and build your site page by page, sharing progress and gathering your feedback.' },
          { step: '03', title: 'Review & refine', description: 'You review the full site, request changes, and we polish every detail until it feels right.' },
          { step: '04', title: 'Launch', description: 'We deploy your site to your domain with SSL, sitemap and SEO foundations in place.' },
        ]}
        faqs={[
          { q: 'How long does a business website take?', a: 'Most business websites are completed within 1–2 weeks, depending on the number of pages and how quickly content and feedback are provided.' },
          { q: 'Do I need to provide the content?', a: 'You can provide your own text and images, or we can help structure and write the copy based on a short conversation about your business.' },
          { q: 'Will the website work on mobile?', a: 'Yes — every site is built mobile-first and tested across screen sizes from small phones to large desktops.' },
          { q: 'Can I update the website later?', a: 'Yes. We can set up the site so you can edit content yourself, or you can come back to us for updates whenever you need them.' },
          { q: 'What is included in SEO foundations?', a: 'We set up proper meta titles, descriptions, canonical URLs, a sitemap and semantic HTML structure — the technical baseline that search engines need to index your site correctly.' },
        ]}
      />

      {/* Who it's for */}
      <section ref={whoRef} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${whoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Who It's For
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Built for <span className="electric-gradient-text">service businesses</span>
            </h2>
            <p className="mt-4 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '32rem' }}>
              A business website from Manolinq is designed for businesses that want a stronger online presence and more inbound enquiries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {whoItIsFor.map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-3.5 rounded-xl p-5 transition-all duration-700 ${whoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ background: 'rgba(11,11,21,0.6)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: `${i * 70}ms` }}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(12,147,232,0.12)', border: '1px solid rgba(12,147,232,0.2)' }}>
                  <Check size={11} strokeWidth={3} style={{ color: 'rgba(54,175,247,0.9)' }} />
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section ref={whyRef} className="relative py-20 lg:py-24 overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Why It Works
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em]" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Not just a website — a <span className="electric-gradient-text">lead machine</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {whyItWorks.map((item, i) => (
              <div
                key={item.title}
                className={`rounded-2xl p-7 transition-all duration-700 ${whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ background: 'linear-gradient(160deg, #0c0c1a 0%, #090910 100%)', border: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${i * 110}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(12,147,232,0.08)', border: '1px solid rgba(12,147,232,0.14)' }}>
                  <item.icon size={17} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.72)' }} />
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: '1rem', letterSpacing: '-0.015em' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.8 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section ref={priceRef} className="relative py-20 lg:py-24 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />
        <div className="max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${priceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Pricing
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Starting from <span className="electric-gradient-text">€750</span>
            </h2>
            <p className="mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '30rem' }}>
              Final price depends on content, number of pages and project scope. Request a free audit and get a tailored quote — no obligation.
            </p>
            <Link to="/contact" className="btn-primary">
              Request a Free Website Audit
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
