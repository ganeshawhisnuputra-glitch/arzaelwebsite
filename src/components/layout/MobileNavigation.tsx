import React from 'react';
import { NavLink } from 'react-router-dom';
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../data/navigation';
import { useModal } from '../../context/ModalContext';
import { X, Mail } from 'lucide-react';
import { OuroborosMotif } from '../common/OuroborosMotif';

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
      className="fixed inset-0 z-50 bg-petrol-950/98 flex flex-col justify-between p-6 animate-fade-in md:hidden"
    >
      <div className="flex items-center justify-between border-b border-petrol-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg tracking-widest-artist font-semibold text-text-primary">
            ARZAEL
          </span>
          <span className="font-mono text-[9px] text-flesh-400 tracking-widest uppercase border border-flesh-800/40 px-1 py-0.5">
            WORLD
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2 text-text-muted hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-flesh-400"
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
              `text-lg font-serif tracking-editorial transition-colors flex items-center justify-between ${
                isActive ? 'text-flesh-300 font-bold' : 'text-text-primary hover:text-petrol-300'
              }`
            }
          >
            <span>{item.label}</span>
            {item.description && (
              <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">
                {item.description}
              </span>
            )}
          </NavLink>
        ))}

        <div className="pt-4 border-t border-petrol-800/60 space-y-3">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `text-sm font-mono tracking-widest-artist uppercase block ${
                  isActive ? 'text-flesh-300' : 'text-text-muted hover:text-text-primary'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom action and cyclical emblem */}
      <div className="border-t border-petrol-800/80 pt-6 flex flex-col items-center gap-4">
        <button
          onClick={() => {
            onClose();
            openLetters();
          }}
          className="w-full py-3 bg-flesh-900/60 border border-flesh-500/60 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 flex items-center justify-center gap-2 flesh-glow"
        >
          <Mail className="w-4 h-4" />
          WRITE TO ME
        </button>

        <div className="flex items-center gap-2 text-text-dim text-[10px] font-mono">
          <OuroborosMotif size="sm" interactive={false} />
          <span>A PRIVATE PLACE ON THE INTERNET</span>
        </div>
      </div>
    </div>
  );
};
