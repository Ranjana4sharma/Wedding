import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/category/visiting', label: 'Visiting Card' },
  { to: '/category/wedding', label: 'Wedding Card' },
  { to: '/category/banner', label: 'Shop Banner' },
  { to: '/category/flex', label: 'Flex Printing' },
  { to: '/#contact', label: 'Contact', isHash: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (link) => {
    if (link.isHash) return location.pathname === '/' && location.hash === '#contact';
    return location.pathname === link.to;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[56px] sm:min-h-[64px] lg:min-h-[72px]">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-base sm:text-xl text-slate-900 tracking-tight flex items-center gap-2 min-w-0"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">P</span>
            <span className="truncate">Print Studio</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.isHash ? (
                  <a
                    href={link.to}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${isActive(link) ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${isActive(link) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold min-h-[40px] hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30"
            >
              Get Quote
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-fade-in max-h-[85vh] overflow-y-auto overflow-x-hidden">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.isHash ? (
                  <a
                    href={link.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center min-h-[44px] px-4 py-3 rounded-xl text-base font-medium ${isActive(link) ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center min-h-[44px] px-4 py-3 rounded-xl text-base font-medium ${isActive(link) ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center mt-4 px-5 py-3.5 rounded-xl bg-slate-900 text-white font-semibold min-h-[48px]"
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
