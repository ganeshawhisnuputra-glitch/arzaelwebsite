import React from 'react';
import { NavLink } from 'react-router-dom';
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../data/navigation';
import { useModal } from '../../context/ModalContext';
import { X, Mail } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { openLetters } = useModal();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 bg-[#041D1E]/98 flex flex-col justify-between p-6 animate-fade-in md:hidden"
    >
      <div className="flex items-center justify-between border-b border-[#0D5659]/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl tracking-widest-artist font-semibold text-beige-100">
            ARZAEL
          </span>
          <span className="font-sans text-[10px] text-flesh-500 tracking-widest uppercase border border-flesh-500/40 px-1.5 py-0.5">
            SELF SABOTAGE
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2 text-beige-100/70 hover:text-beige-100 focus:outline-none focus:ring-1 focus:ring-flesh-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col space-y-5 my-auto py-8">
        {PRIMARY_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl font-serif tracking-editorial transition-colors flex items-center justify-between ${
                isActive ? 'text-flesh-500 font-bold' : 'text-beige-100/90 hover:text-flesh-500'
              }`
            }
          >
            <span>{item.label}</span>
            {item.description && (
              <span className="font-sans text-[11px] text-beige-100/50 uppercase tracking-wider">
                {item.description}
              </span>
            )}
          </NavLink>
        ))}

        <div className="pt-4 border-t border-[#0D5659]/60 space-y-3">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `text-sm font-sans tracking-widest uppercase block ${
                  isActive ? 'text-flesh-500' : 'text-beige-100/60 hover:text-beige-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom action and cyclical emblem */}
      <div className="border-t border-[#0D5659]/60 pt-6 flex flex-col items-center gap-4">
        <button
          onClick={() => {
            onClose();
            openLetters();
          }}
          className="w-full py-3 bg-[#072C2E] border border-flesh-500 text-xs font-sans tracking-widest uppercase text-flesh-500 hover:bg-flesh-500 hover:text-[#041D1E] flex items-center justify-center gap-2 transition-colors font-medium cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>WRITE TO ME</span>
        </button>

        <div className="flex items-center gap-2 text-beige-100/40 text-[10px] font-sans">
          <span>A PRIVATE PLACE ON THE INTERNET</span>
        </div>
      </div>
    </div>
  );
};
