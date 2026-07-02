import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useInView } from '../hooks/useInView';
import ServiceDetail from '../components/ServiceDetail';

export default function AISystemsPage() {
  useSeo({
    title: 'AI Assistants & Automations | Capture & Qualify Leads — Manolinq',
    description:
      'AI systems that help capture, qualify and follow up with leads. Chatbots, WhatsApp and email automation, lead flows and CRM integrations. From €1,250.',
    path: '/services/ai-systems',
  });

  const { ref: priceRef, inView: priceInView } = useInView();

  return (
    <>
      <ServiceDetail
        tag="AI Assistants & Automations"
        title={<>AI systems that help <span className="electric-gradient-text">capture, qualify and follow up</span> with leads</>}
        description="AI assistants, chatbots, WhatsApp and email automation, and lead qualification flows — so your business captures every opportunity, around the clock."
        path="/services/ai-systems"
        seoTitle=""
        seoDescription=""
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
        deliverables={[
          { text: 'Custom-trained AI chat assistant' },
          { text: 'Lead qualification conversation flow' },
          { text: 'Instant lead notifications (Telegram/WhatsApp/email)' },
          { text: 'Automated WhatsApp or email follow-ups' },
          { text: 'Form-to-notification system' },
          { text: 'CRM or Notion integration setup' },
          { text: 'Embeddable chat widget for your site' },
          { text: 'Training on your services and FAQs' },
        ]}
        process={[
          { step: '01', title: 'Map the workflow', description: 'We define what the assistant should answer, which leads to capture, and where notifications should go.' },
          { step: '02', title: 'Train & build', description: 'We train the AI on your services and FAQs, then build the automation flows and integrations.' },
          { step: '03', title: 'Test & connect', description: 'We test the assistant and notifications end-to-end, then connect it to your site and channels.' },
          { step: '04', title: 'Launch & monitor', description: 'We deploy the assistant and automation, then monitor and refine based on real conversations.' },
        ]}
        faqs={[
          { q: 'What can the AI assistant answer?', a: 'The assistant is trained on your services, pricing, FAQs and business details. It answers common questions instantly and hands complex or serious enquiries to you with a notification.' },
          { q: 'How do I get notified about leads?', a: 'Every qualified lead triggers an instant notification to your phone via Telegram, WhatsApp or email — you choose the channel. No enquiry goes unnoticed.' },
          { q: 'Can it integrate with my existing tools?', a: 'Yes. We can connect the lead flow to your CRM, Notion workspace, email or messaging channels so everything stays organised in one place.' },
          { q: 'Does the assistant replace me?', a: 'No — it supports you. It handles repetitive questions and captures leads around the clock, while serious enquiries and bookings are handed to you directly.' },
          { q: 'Does this work without a website?', a: 'The AI and automation systems work best when combined with a website or landing page. The starting price of €1,250 reflects the combined website + AI system package.' },
        ]}
      />

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
              Starting from <span className="electric-gradient-text">€1,250</span>
            </h2>
            <p className="mb-2 mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '32rem' }}>
              When combined with a Business Website. Final price depends on content, integrations and project scope.
            </p>
            <p className="mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '28rem' }}>
              Request a free audit and we'll recommend the right setup for your business — no obligation.
            </p>
            <Link to="/contact" className="btn-primary">
              Build My AI System
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
