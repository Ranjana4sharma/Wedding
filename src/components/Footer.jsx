import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '9193648939';
const PHONE_1 = '9193648939';
const PHONE_2 = '9193898182';
const ADDRESS = 'Mandi Tiraha Bidhuna Road Bharthana Etawah';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services' },
  { to: '/#portfolio', label: 'Portfolio' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { href: '#', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.919 0 3.204-.012 3.584-.069 4.919-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.859-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.919 0-3.243.012-3.583.07-4.919.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.859-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { href: '#', label: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 overflow-x-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {/* Brand - full width on mobile, then 1 col on lg */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="font-display font-bold text-lg sm:text-xl text-white inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs font-bold shrink-0">P</span>
              Print Studio
            </Link>
            <p className="mt-2 text-sm leading-snug text-slate-400 max-w-sm">
              Premium printing and card design services. Visiting cards, wedding cards, banners and flex printing.
            </p>
          </div>

          {/* Quick Links - mobile: left column */}
          <div className="col-span-1">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="mt-2 sm:mt-3 flex flex-col gap-0.5 sm:gap-0">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.to}
                    className="flex items-center py-0.5 sm:py-1 text-sm hover:text-white transition-colors min-h-[32px] sm:min-h-0 touch-manipulation"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - mobile: right column (aamne saamne Quick Links) */}
          <div className="col-span-1">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Contact</h4>
            <ul className="mt-2 sm:mt-3 space-y-0.5 text-sm">
              <li>
                <span className="text-slate-500 text-xs uppercase tracking-wider">Address</span>
                <span className="block mt-0.5 text-slate-400 leading-tight">{ADDRESS}</span>
              </li>
              <li>
                <a href={`tel:${PHONE_1}`} className="hover:text-white transition-colors flex items-center py-0.5 min-h-[32px] sm:min-h-0 touch-manipulation">
                  {PHONE_1.replace(/(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3')}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_2}`} className="hover:text-white transition-colors flex items-center py-0.5 min-h-[32px] sm:min-h-0 touch-manipulation">
                  {PHONE_2.replace(/(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3')}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2 py-0.5 min-h-[32px] sm:min-h-0 touch-manipulation"
                >
                  <span className="text-green-400">WhatsApp</span> Chat with us
                </a>
              </li>
            </ul>
          </div>

          {/* Social - mobile: full width next row */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Follow Us</h4>
            <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors touch-manipulation shrink-0"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500 px-2">
          © {new Date().getFullYear()} Print Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
