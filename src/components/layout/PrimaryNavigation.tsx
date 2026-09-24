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

  // If on a sub-route, consider navigation always revealed
  const isSubRoute = location.pathname !== '/';
  const isNavVisible = hasEntered || isSubRoute;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#041D1E]/90 backdrop-blur-md border-b border-[#0D5659]/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand signature */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-flesh-500 p-1"
        >
          <span className="font-serif text-lg sm:text-xl tracking-widest-artist font-semibold text-beige-100 group-hover:text-flesh-500 transition-colors">
            ARZAEL
          </span>
          {isNavVisible && (
            <span className="hidden sm:inline-block font-sans text-[10px] text-flesh-500/90 tracking-widest uppercase border-l border-[#0D5659] pl-3 py-0.5">
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
                    `text-xs font-sans tracking-widest-artist uppercase py-1 transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'text-flesh-500 border-b-2 border-flesh-500'
                        : 'text-beige-100/70 hover:text-beige-100'
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
                    `text-xs font-sans tracking-widest-artist uppercase py-1 transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'text-flesh-500 border-b-2 border-flesh-500'
                        : 'text-beige-100/50 hover:text-beige-100/80'
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
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#072C2E]/90 border border-flesh-500/50 text-[11px] font-sans tracking-widest uppercase text-flesh-500 hover:bg-flesh-500 hover:text-[#041D1E] transition-all rounded-xs cursor-pointer font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>WRITE TO ME</span>
              </button>

              {/* Mobile hamburger menu button */}
              <button
                onClick={onOpenMobileMenu}
                aria-label="Open navigation menu"
                className="md:hidden p-2 text-beige-100/80 hover:text-beige-100 focus:outline-none focus:ring-1 focus:ring-flesh-500"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-right">
            <span className="font-serif italic text-xs text-beige-100/50">
              at the entrance
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
