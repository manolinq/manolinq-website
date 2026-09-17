import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Pricing',  to: '/pricing'  },
  { label: 'Process',  to: '/process'  },
  { label: 'Contact',  to: '/contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const goHomeTop = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#06060c]/80 backdrop-blur-2xl border-b border-white/[0.055] shadow-[0_1px_0_rgba(255,255,255,0.035),0_8px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between"
        style={{ height: 64 }}
      >
        {/* Logo */}
        <button
          onClick={goHomeTop}
          className="flex items-center flex-shrink-0 focus-visible:outline-none"
          style={{ lineHeight: 0 }}
          aria-label="Manolinq home"
        >
          {/* Mobile: icon mark only */}
          <img
            src="/manolinq-icon.svg"
            alt="Manolinq"
            className="md:hidden w-auto object-contain block"
            style={{ height: 34 }}
            draggable={false}
          />
          {/* Desktop: full wordmark */}
          <img
            src="/manolinq-logo-transparent.svg"
            alt="Manolinq"
            className="hidden md:block w-auto object-contain"
            style={{ height: 'clamp(30px, 5vw, 40px)' }}
            draggable={false}
          />
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`relative text-[0.84rem] font-medium px-4 py-2 rounded-lg
                               transition-all duration-200
                              ${active
                                ? 'text-white'
                                : 'text-white/45 hover:text-white/90'
                              }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-lg bg-white/[0.055]" />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Link to="/contact" className="btn-primary text-[0.84rem] py-2.5 px-5">
            Get Free Audit
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/50 hover:text-white transition-colors
                     flex items-center justify-center rounded-lg hover:bg-white/[0.05]
                     active:bg-white/[0.08]"
          style={{ width: 40, height: 40 }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={19} strokeWidth={2} /> : <Menu size={19} strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#06060c]/98 backdrop-blur-2xl border-b border-white/[0.055]
                        px-5 pb-6 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-3 text-[0.88rem] font-medium rounded-xl
                             transition-all flex items-center justify-between
                            ${active
                              ? 'text-white bg-white/[0.06]'
                              : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                            }`}
              >
                {link.label}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-400 flex-shrink-0" />
                )}
              </Link>
            );
          })}
          <Link to="/about" className={`py-3 px-3 text-[0.88rem] font-medium rounded-xl transition-all flex items-center justify-between ${isActive('/about') ? 'text-white bg-white/[0.06]' : 'text-white/50 hover:text-white hover:bg-white/[0.04]'}`}>
            About
            {isActive('/about') && <span className="w-1.5 h-1.5 rounded-full bg-electric-400 flex-shrink-0" />}
          </Link>
          <Link to="/contact" className="btn-primary mt-3 justify-center">
            Get Free Audit
          </Link>
        </div>
      </div>
    </header>
  );
}
