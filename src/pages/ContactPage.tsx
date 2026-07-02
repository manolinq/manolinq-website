import { useSeo } from '../hooks/useSeo';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  useSeo({
    title: 'Contact | Get a Free Website Audit — Manolinq',
    description:
      'Get in touch with Manolinq for a free website audit. Email us, WhatsApp us or fill in the form and we will reply within 24 hours with clear next steps.',
    path: '/contact',
  });

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.06) 0%, transparent 65%)' }}
      />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm animate={false} />
      </div>
    </section>
  );
}
