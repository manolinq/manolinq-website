import { useSeo } from '../hooks/useSeo';
import ServiceDetail from '../components/ServiceDetail';

export default function AISystemsPage() {
  useSeo({
    title: 'AI Assistants & Automations | Save Time, Capture Leads — Manolinq',
    description:
      'AI chat assistants and automated workflows that answer questions, qualify leads and notify you instantly — so no opportunity is missed.',
    path: '/services/ai-systems',
  });

  return (
    <ServiceDetail
      tag="AI Assistants & Automations"
      title={<>AI that works <span className="electric-gradient-text">while you sleep</span></>}
      description="AI chat assistants and automated workflows that answer questions, qualify leads and notify you the moment someone is interested — so no opportunity slips away."
      path="/services/ai-systems"
      seoTitle=""
      seoDescription=""
      features={[
        {
          title: 'AI chatbot setup',
          description: 'A custom-trained AI assistant that answers common questions about your services, pricing and availability — instantly, 24/7, in your brand voice.',
        },
        {
          title: 'Lead qualification flows',
          description: 'The assistant asks the right questions to qualify leads, capturing name, contact details and intent before handing them to you.',
        },
        {
          title: 'WhatsApp & email automations',
          description: 'Automated messages and follow-ups via WhatsApp and email, so leads get an instant response and you get an instant notification.',
        },
        {
          title: 'Form-to-notification systems',
          description: 'Every form submission triggers an instant notification to your phone or team — via Telegram, WhatsApp or email — so you never miss a lead.',
        },
        {
          title: 'CRM or Notion integrations',
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
      ]}
    />
  );
}
