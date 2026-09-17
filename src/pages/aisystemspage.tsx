import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, Filter, BellRing, Repeat2 } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import PageHeader from '../components/PageHeader';
import {
  FeaturesSection,
  DeliverablesSection,
  ProcessSection,
  FaqSection,
  OtherServices,
} from '../components/ServiceDetail';

const trustItems = [
  { icon: Clock,    label: '24/7 lead capture'       },
  { icon: Filter,   label: 'Lead qualification'       },
  { icon: BellRing, label: 'Instant notifications'    },
  { icon: Repeat2,  label: 'Follow-up automation'     },
];

export default function AISystemsPage() {
  useSeo({
    title: 'AI Assistants & Automations | Capture & Qualify Leads — Manolinq',
    description:
      'AI systems that help capture, qualify and follow up with leads. Chatbots, WhatsApp and email automation, lead flows and CRM integrations. From €1,250.',
    path: '/services/ai-systems',
  });

  const { ref: priceRef, inView: priceInView } = useInView();
  const { ref: ctaRef,   inView: ctaInView   } = useInView();

  return (
    <>
      {/* Hero */}
      <PageHeader
        tag="AI Assistants & Automations"
        title={<>AI systems that capture, qualify and <span className="electric-gradient-text">follow up with leads</span></>}
        description="AI assistants, chatbots, WhatsApp and email automations, and lead qualification flows — so your business captures every opportunity, even outside working hours."
      >
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link to="/contact" className="btn-primary text-[0.95rem] px-8 py-[13px] justify-center">
            Build My AI System
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
          <Link to="/pricing" className="btn-secondary text-[0.95rem] px-8 py-[13px] justify-center">
            View Pricing
          </Link>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
          {trustItems.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.82rem' }}>
              <Icon size={13} strokeWidth={1.75} style={{ color: 'rgba(54,175,247,0.6)' }} />
              {label}
            </span>
          ))}
        </div>
      </PageHeader>

      {/* Back link */}
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

      {/* What's included */}
      <FeaturesSection
        headline={<>Everything built to <span className="electric-gradient-text">capture and qualify leads</span></>}
        features={[
          {
            title: 'AI chatbot setup',
            description: 'A custom-trained AI assistant that answers common questions about your services, pricing and availability — instantly, 24/7, in your brand voice.',
          },
          {
            title: 'Lead qualification',
            description: 'The assistant asks the right questions to qualify leads, capturing name, contact details and intent before handing them to you.',
          },
          {
            title: 'Form-to-notification systems',
            description: 'Every form submission triggers an instant notification to your phone or team — via Telegram, WhatsApp or email — so you never miss a lead.',
          },
          {
            title: 'WhatsApp and email automation',
            description: 'Automated messages and follow-ups via WhatsApp and email, so leads get an instant response and you get an instant notification.',
          },
          {
            title: 'CRM/Notion integration',
            description: 'Connect your lead flow to your CRM or Notion workspace so every enquiry is logged, organised and easy to follow up on.',
          },
          {
            title: 'Always-on availability',
            description: 'Your assistant works around the clock — answering questions and capturing leads even outside business hours and on weekends.',
          },
        ]}
      />

      {/* Deliverables */}
      <DeliverablesSection deliverables={[
        { text: 'Custom-trained AI chat assistant'                                 },
        { text: 'Lead qualification conversation flow'                             },
        { text: 'Instant lead notifications via Telegram, WhatsApp or email'       },
        { text: 'Automated WhatsApp or email follow-ups'                           },
        { text: 'Form-to-notification system'                                      },
        { text: 'CRM or Notion integration setup'                                  },
        { text: 'Embeddable chat widget for your site'                             },
        { text: 'Training on your services and FAQs'                               },
      ]} />

      {/* Process */}
      <ProcessSection process={[
        { step: '01', title: 'Map the workflow',   description: 'We define what the assistant should answer, which leads to capture and where notifications should go.' },
        { step: '02', title: 'Train & build',      description: 'We train the AI on your services and FAQs, then build the automation flows and integrations.' },
        { step: '03', title: 'Test & connect',     description: 'We test the assistant and notifications end-to-end, then connect it to your site and channels.' },
        { step: '04', title: 'Launch & monitor',   description: 'We deploy the assistant and automation, then monitor and refine based on real conversations.' },
      ]} />

      {/* Pricing */}
      <section ref={priceRef} className="relative py-14 lg:py-18 section-alt overflow-hidden">
        <div className="section-divider absolute top-0" />
        <div className="section-divider absolute bottom-0" style={{ top: 'auto', bottom: 0 }} />

        <div className="max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${priceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-tag justify-center">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Pricing
            </div>
            <h2 className="text-white font-bold tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)' }}>
              Starting from <span className="electric-gradient-text">€1,250</span>
            </h2>
            <p className="mb-7 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '32rem' }}>
              When combined with a Business Website. Final price depends on content, integrations and project scope. Request a free audit and we'll recommend the right setup for your business — no obligation.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Build My AI System
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={[
        { q: 'What can the AI assistant answer?',        a: 'The assistant is trained on your services, pricing, FAQs and business details. It answers common questions instantly and hands complex or serious enquiries to you with a notification.' },
        { q: 'How do I get notified about leads?',       a: 'Every qualified lead triggers an instant notification to your phone via Telegram, WhatsApp or email — you choose the channel. No enquiry goes unnoticed.' },
        { q: 'Can it integrate with my existing tools?', a: 'Yes. We can connect the lead flow to your CRM, Notion workspace, email or messaging channels so everything stays organised in one place.' },
        { q: 'Does the assistant replace me?',           a: 'No — it supports you. It handles repetitive questions and captures leads around the clock, while serious enquiries and bookings are handed to you directly.' },
        { q: 'Does this work without a website?',        a: 'The AI and automation systems work best when combined with a website or landing page. The starting price of €1,250 reflects the combined website + AI system package.' },
      ]} />

      {/* Other services */}
      <OtherServices currentPath="/services/ai-systems" />

      {/* Final CTA */}
      <section ref={ctaRef} className="relative py-14 lg:py-20 overflow-hidden">
        <div className="section-divider absolute top-0" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.07) 0%, transparent 60%)' }}
        />

        <div
          className={`relative max-w-2xl mx-auto px-5 sm:px-7 lg:px-8 text-center
                      transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-tag justify-center">
            <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
            Ready When You Are
          </div>

          <h2 className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Want this for{' '}
            <span className="electric-gradient-text">your business?</span>
          </h2>

          <p className="mx-auto mb-7" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.02rem', lineHeight: 1.8, maxWidth: '34rem' }}>
            Tell us about your business, your current lead process and what you want automated. We'll recommend the right AI setup for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-primary text-[0.95rem] px-9 py-4 justify-center">
              Build My AI System
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link to="/pricing" className="btn-secondary text-[0.95rem] px-9 py-4 justify-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
