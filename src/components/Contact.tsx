import { useState } from 'react';
import { Send, MessageCircle, Mail, Instagram, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const budgetOptions = [
  '€500–€750', '€750–€1,250', '€1,250+', 'Not sure yet',
];

const serviceOptions = [
  'Business Website', 'Landing Page', 'Website + AI System', 'Not sure yet',
];

const contactLinks = [
  { href: 'mailto:hello@manolinq.com',              icon: Mail,          label: 'hello@manolinq.com',   external: false },
  { href: 'https://wa.me/32400000000',               icon: MessageCircle, label: 'WhatsApp us directly', external: true  },
  { href: 'https://instagram.com/manolinq',          icon: Instagram,     label: '@manolinq',            external: true  },
];

interface FormData {
  name: string; businessName: string; email: string;
  whatsapp: string; service: string; budget: string; message: string;
}

/* Shared inline styles to avoid multiline className rendering artifacts */
const labelStyle: React.CSSProperties = {
  display: 'block',
  color: 'rgba(255,255,255,0.42)',
  fontSize: '0.68rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  marginBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d0d1a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  color: '#e2e2e8',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
};

function Field({
  label, name, type = 'text', required = false, placeholder, value, onChange,
}: {
  label: string; name: string; type?: string; required?: boolean;
  placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type} name={name} required={required}
        value={value} onChange={onChange} placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: focused ? 'rgba(12,147,232,0.55)' : 'rgba(255,255,255,0.1)',
          boxShadow: focused ? '0 0 0 3px rgba(12,147,232,0.1)' : 'none',
          background: focused ? '#0f0f20' : '#0d0d1a',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function SelectField({
  label, name, required = false, placeholder, value, options, onChange,
}: {
  label: string; name: string; required?: boolean; placeholder: string;
  value: string; options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        name={name} required={required} value={value} onChange={onChange}
        style={{
          ...inputStyle,
          appearance: 'none',
          cursor: 'pointer',
          color: value ? '#e2e2e8' : 'rgba(255,255,255,0.28)',
          borderColor: focused ? 'rgba(12,147,232,0.55)' : 'rgba(255,255,255,0.1)',
          boxShadow: focused ? '0 0 0 3px rgba(12,147,232,0.1)' : 'none',
          background: focused ? '#0f0f20' : '#0d0d1a',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="" disabled style={{ background: '#0d0d1a', color: 'rgba(255,255,255,0.35)' }}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: '#0d0d1a', color: '#e2e2e8' }}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label, name, rows, placeholder, value, onChange,
}: {
  label: string; name: string; rows: number; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name} rows={rows} value={value} onChange={onChange}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          resize: 'none',
          borderColor: focused ? 'rgba(12,147,232,0.55)' : 'rgba(255,255,255,0.1)',
          boxShadow: focused ? '0 0 0 3px rgba(12,147,232,0.1)' : 'none',
          background: focused ? '#0f0f20' : '#0d0d1a',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState<FormData>({
    name: '', businessName: '', email: '',
    whatsapp: '', service: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="section-divider absolute top-0" />

      {/* Ambient bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(12,147,232,0.045) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20 items-start">

          {/* ── Left ── */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="section-tag">
              <span style={{ display: 'inline-block', width: 4, height: 14, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }} />
              Let's Talk
            </div>
            <h2
              className="text-white font-bold leading-[1.08] tracking-[-0.03em] mb-5"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)' }}
            >
              Ready to start?{' '}
              <span className="electric-gradient-text">Get in touch.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              Fill in the form and we'll review your business, website or social page within 24 hours with a clear next-step recommendation.
            </p>

            {/* Contact links */}
            <div className="space-y-3">
              {contactLinks.map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-3.5 group transition-all duration-200"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-[#0f0f20]"
                    style={{ background: '#0b0b15', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <Icon size={15} strokeWidth={1.75} style={{ color: 'rgba(12,147,232,0.7)' }} />
                  </div>
                  <span style={{ fontSize: '0.87rem', fontWeight: 500 }}>{label}</span>
                </a>
              ))}
            </div>

            {/* Free audit box */}
            <div
              className="mt-11 p-6 rounded-2xl"
              style={{
                background: 'rgba(12,147,232,0.05)',
                border: '1px solid rgba(12,147,232,0.14)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 9999, background: '#0c93e8', flexShrink: 0 }}
                />
                <p style={{ color: '#4db8ff', fontWeight: 600, fontSize: '0.87rem', letterSpacing: '-0.01em' }}>
                  Free Website Audit
                </p>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.845rem', lineHeight: 1.75 }}>
                Share your current website, Instagram page or business idea and we'll show you what can be improved — free of charge.
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-24 text-center px-8 rounded-2xl"
                style={{ background: '#0b0b15', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-7"
                  style={{ background: 'rgba(12,147,232,0.1)', border: '1px solid rgba(12,147,232,0.18)' }}
                >
                  <CheckCircle size={28} strokeWidth={1.75} className="text-electric-400" />
                </div>
                <h3 className="text-white font-bold text-[1.5rem] tracking-[-0.025em] mb-3">
                  Message received!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: '20rem', lineHeight: 1.8 }}>
                  Thanks for reaching out. We'll review your info and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 sm:p-10 space-y-6"
                style={{
                  background: 'rgba(11,11,21,0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 60px rgba(12,147,232,0.03)',
                }}
              >
                {/* Name + Business */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your Name *" name="name" required placeholder="John Smith"
                    value={form.name} onChange={handleChange} />
                  <Field label="Business Name *" name="businessName" required placeholder="Your Business"
                    value={form.businessName} onChange={handleChange} />
                </div>

                {/* Email + WhatsApp */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email *" name="email" type="email" required placeholder="you@example.com"
                    value={form.email} onChange={handleChange} />
                  <Field label="WhatsApp Number" name="whatsapp" type="tel" placeholder="+32 4XX XX XX XX"
                    value={form.whatsapp} onChange={handleChange} />
                </div>

                {/* Service + Budget */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <SelectField label="What do you need? *" name="service" required
                    placeholder="Select a service" value={form.service}
                    options={serviceOptions} onChange={handleChange} />
                  <SelectField label="Budget Range" name="budget"
                    placeholder="Select a range" value={form.budget}
                    options={budgetOptions} onChange={handleChange} />
                </div>

                {/* Message */}
                <TextAreaField
                  label="Message" name="message" rows={4}
                  placeholder="Tell us about your business, current website/social page and what you want to improve."
                  value={form.message} onChange={handleChange}
                />

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 font-semibold rounded-xl transition-all duration-200"
                  style={{
                    padding: '1rem',
                    fontSize: '0.95rem',
                    color: '#fff',
                    background: loading ? 'rgba(12,147,232,0.6)' : 'linear-gradient(160deg,#1a9ef5 0%,#0a88d8 100%)',
                    boxShadow: loading ? 'none' : '0 1px 0 rgba(255,255,255,0.16) inset, 0 4px 20px rgba(12,147,232,0.38), 0 0 0 1px rgba(12,147,232,0.18)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      const el = e.currentTarget;
                      el.style.background = 'linear-gradient(160deg,#2eb0ff 0%,#0c93e8 100%)';
                      el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.18) inset, 0 8px 32px rgba(12,147,232,0.52), 0 0 0 1px rgba(12,147,232,0.28)';
                      el.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      const el = e.currentTarget;
                      el.style.background = 'linear-gradient(160deg,#1a9ef5 0%,#0a88d8 100%)';
                      el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.16) inset, 0 4px 20px rgba(12,147,232,0.38), 0 0 0 1px rgba(12,147,232,0.18)';
                      el.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="animate-spin rounded-full"
                        style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>Request Free Audit<Send size={15} strokeWidth={2} /></>
                  )}
                </button>

                <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.78rem', textAlign: 'center', letterSpacing: '0.02em' }}>
                  We reply within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
