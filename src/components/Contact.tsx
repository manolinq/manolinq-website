import { useInView } from '../hooks/useInView';
import ContactForm from './ContactForm';

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="section-divider absolute top-0" />

      {/* Ambient bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.045) 0%, transparent 65%)' }}
      />

      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <ContactForm />
      </div>
    </section>
  );
}
