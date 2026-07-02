import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home',          to: '/'                      },
  { label: 'Services',      to: '/services'              },
  { label: 'Websites',      to: '/services/websites'     },
  { label: 'Landing Pages', to: '/services/landing-pages'},
  { label: 'AI Systems',    to: '/services/ai-systems'   },
  { label: 'Pricing',       to: '/pricing'               },
  { label: 'Process',       to: '/process'               },
  { label: 'About',         to: '/about'                 },
  { label: 'Contact',       to: '/contact'               },
];

const contactLinks = [
  { href: 'mailto:support.manolinq@gmail.com', icon: Mail,        label: 'support.manolinq@gmail.com' },
  { href: 'https://www.instagram.com/manolinq?igsh=MTk5aW5uNjV0NXh0dQ==', icon: Instagram, label: '@manolinq', external: true },
  { href: 'https://wa.me/32456326720?text=Hey%2C%20I%27m%20interested%20in%20a%20website%20or%20AI%20system.%20Can%20you%20take%20a%20quick%20look%20at%20my%20business%3F', icon: MessageCircle, label: 'WhatsApp', external: true },
];

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/[0.045] bg-[#04040a]">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]
                      bg-gradient-to-r from-transparent via-electric-500/[0.18] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10"
           style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="grid sm:grid-cols-3 gap-10 mb-14">

          {/* Brand */}
          <div>
            <img
              src="/manolinq-logo-transparent.svg"
              alt="Manolinq"
              className="h-[30px] w-auto object-contain mb-5"
            />
            <p className="text-white/28 text-[0.82rem] leading-[1.7] max-w-[200px]">
              Websites · Landing Pages · AI Systems
            </p>
            <p className="text-white/18 text-[0.78rem] leading-[1.75] mt-1.5 max-w-[200px]">
              We build digital systems that bring businesses more clients, bookings and sales.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/35 text-[0.67rem] font-semibold uppercase tracking-[0.2em] mb-5">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/28 hover:text-white/70 text-[0.84rem]
                               transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/35 text-[0.67rem] font-semibold uppercase tracking-[0.2em] mb-5">
              Get In Touch
            </p>
            <div className="space-y-4">
              {contactLinks.map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-2.5 text-white/28 hover:text-white/65
                             text-[0.84rem] transition-colors duration-200 group"
                >
                  <Icon
                    size={13}
                    strokeWidth={1.75}
                    className="text-electric-400/45 group-hover:text-electric-400/70
                               transition-colors flex-shrink-0"
                  />
                  {label}
                  <ArrowUpRight
                    size={10}
                    className="opacity-0 group-hover:opacity-50 transition-opacity ml-auto"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-7 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-white/16 text-[0.78rem]">
            © {new Date().getFullYear()} Manolinq. All rights reserved.
          </p>
          <button
            onClick={toTop}
            className="text-white/16 hover:text-electric-400/40 text-[0.78rem]
                       transition-colors duration-200"
          >
            Back to top ↑
          </button>
        </div>
      </div>

    </footer>
  );
}
