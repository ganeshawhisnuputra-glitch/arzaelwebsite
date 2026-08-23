import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../data/navigation';
import { useModal } from '../../context/ModalContext';
import { useEntry } from '../../context/EntryContext';
import { Mail } from 'lucide-react';

interface PrimaryNavProps {
  onOpenMobileMenu: () => void;
}

export const PrimaryNavigation: React.FC<PrimaryNavProps> = ({ onOpenMobileMenu }) => {
  const { openLetters } = useModal();
  const { hasEntered } = useEntry();
  const location = useLocation();

  // If on a sub-route (e.g., /about, /self-sabotage), consider navigation always revealed
  const isSubRoute = location.pathname !== '/';
  const isNavVisible = hasEntered || isSubRoute;

  return (
    <header className="sticky top-0 z-30 w-full bg-petrol-950/90 backdrop-blur-md border-b border-petrol-800/60 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand signature */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-flesh-400 p-1"
        >
          <span className="font-serif text-lg sm:text-xl tracking-widest-artist font-semibold text-text-primary group-hover:text-petrol-300 transition-colors">
            ARZAEL
          </span>
          {isNavVisible && (
            <span className="hidden sm:inline-block font-mono text-[9px] text-flesh-400/80 tracking-widest uppercase border border-flesh-800/50 px-1.5 py-0.5 animate-fade-in">
              SELF SABOTAGE
            </span>
          )}
        </Link>

        {/* Revealed Navigation Content */}
        {isNavVisible ? (
          <>
            {/* Desktop primary nav items */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center space-x-6 lg:space-x-8 animate-fade-in"
            >
              {PRIMARY_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xs font-mono tracking-widest-artist uppercase py-1 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-petrol-400 ${
                      isActive
                        ? 'text-flesh-300 border-b border-flesh-400'
                        : 'text-text-muted hover:text-text-primary hover:border-b hover:border-petrol-500/50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {SECONDARY_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xs font-mono tracking-widest-artist uppercase py-1 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-petrol-400 ${
                      isActive
                        ? 'text-flesh-300 border-b border-flesh-400'
                        : 'text-text-dim hover:text-text-muted'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Action button & Mobile toggle */}
            <div className="flex items-center gap-3 animate-fade-in">
              <button
                onClick={openLetters}
                aria-label="Open Letters from ARZAEL"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-petrol-900/80 border border-flesh-500/40 text-[11px] font-mono tracking-widest uppercase text-flesh-300 hover:bg-flesh-900/60 hover:text-white transition-all flesh-glow"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>WRITE TO ME</span>
              </button>

              {/* Mobile hamburger menu button */}
              <button
                onClick={onOpenMobileMenu}
                aria-label="Open navigation menu"
                className="md:hidden p-2 text-text-muted hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-flesh-400"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-right">
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
              ENTRY REQUIRED
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
