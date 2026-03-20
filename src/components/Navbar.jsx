import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen]           = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`relative px-4 py-1.5 rounded-full text-[0.875rem] font-medium transition-all duration-200
        ${isActive(to)
          ? 'bg-white text-navy shadow-sm'
          : 'text-white/80 hover:text-white hover:bg-white/10'}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-navy/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
        : 'bg-navy shadow-[0_1px_0_rgba(255,255,255,0.06)]'}`}>

      <div className="max-w-7xl mx-auto flex items-center justify-between h-[62px] px-5 gap-4">

        {/* ── Brand ── */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center
                          ring-1 ring-white/20 group-hover:bg-white/15 transition-colors duration-200">
            <img src="/images/ccs.png" alt="CCS" className="h-6 w-auto" />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-semibold text-[0.95rem] leading-none tracking-tight block">
              SetSit
            </span>
            <span className="text-white/45 text-[0.7rem] tracking-wide">
              College of Computer Studies
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-1 bg-white/8 rounded-full px-2 py-1.5
                        ring-1 ring-white/10">
          {navLink('/', 'Home')}

          {/* Community dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.875rem]
                               font-medium text-white/80 hover:text-white hover:bg-white/10
                               transition-all duration-200 cursor-pointer">
              Community
              <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-transform duration-200 group-hover:rotate-180"
                fill="none" viewBox="0 0 10 6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-48
                            bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-gray-100
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden">
              {[['#', 'Announcements'], ['#', 'Forums'], ['#', 'Resources']].map(([href, label]) => (
                <Link key={label} to={href}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[0.875rem] text-gray-600
                             hover:text-navy hover:bg-gray-50 transition-colors duration-150">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy/30 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {navLink('/about', 'About')}
          {navLink('/login', 'Login')}

          <Link to="/register"
            className={`ml-1 px-4 py-1.5 rounded-full text-[0.875rem] font-semibold transition-all duration-200
              ${isActive('/register')
                ? 'bg-white text-navy shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25 ring-1 ring-white/20'}`}>
            Register
          </Link>
        </div>

        {/* ── Hamburger ── */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]
                     bg-white/10 rounded-lg ring-1 ring-white/20 cursor-pointer flex-shrink-0
                     hover:bg-white/15 transition-colors duration-150"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300
            ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300
            ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300
            ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-1">
          {[['/', 'Home'], ['/about', 'About'], ['/login', 'Login']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive(to) ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white hover:bg-white/10'}`}>
              {label}
            </Link>
          ))}

          {/* Mobile community */}
          <div>
            <button onClick={() => setCommunityOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm
                         font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors duration-150">
              Community
              <svg className={`w-3 h-3 transition-transform duration-200 ${communityOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 10 6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {communityOpen && (
              <div className="ml-4 mt-1 flex flex-col gap-0.5">
                {['Announcements', 'Forums', 'Resources'].map(label => (
                  <Link key={label} to="#" onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-[0.85rem] text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-150">
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/register" onClick={() => setMenuOpen(false)}
            className="mt-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-center
                       bg-white/15 text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors duration-150">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
