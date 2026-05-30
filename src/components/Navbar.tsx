import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Process',  href: '#process'  },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const id = href.slice(1);
      if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

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
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center flex-shrink-0 focus-visible:outline-none"
          style={{ lineHeight: 0 }}
        >
          <img
            src="/manolinq-logo-transparent.svg"
            alt="Manolinq"
            className="w-auto object-contain block"
            style={{ height: 'clamp(30px, 5vw, 40px)', display: 'block' }}
            draggable={false}
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-[0.84rem] font-medium px-4 py-2 rounded-lg
                               transition-all duration-200
                              ${isActive
                                ? 'text-white'
                                : 'text-white/45 hover:text-white/90'
                              }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-white/[0.055]" />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary text-[0.84rem] py-2.5 px-5"
          >
            Get Free Audit
          </a>
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
          menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#06060c]/98 backdrop-blur-2xl border-b border-white/[0.055]
                        px-5 pb-6 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-3 px-3 text-[0.88rem] font-medium rounded-xl
                             transition-all flex items-center justify-between
                            ${isActive
                              ? 'text-white bg-white/[0.06]'
                              : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                            }`}
              >
                {link.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-400 flex-shrink-0" />
                )}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary mt-3 justify-center"
          >
            Get Free Audit
          </a>
        </div>
      </div>
    </header>
  );
}
