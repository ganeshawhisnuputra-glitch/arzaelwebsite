import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PrimaryNavigation } from './PrimaryNavigation';
import { MobileNavigation } from './MobileNavigation';
import { Footer } from './Footer';
import { MusicPlayer } from '../audio/MusicPlayer';
import { LettersModal } from '../letters/LettersModal';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#041D1E] text-beige-100 selection:bg-flesh-500/30 selection:text-beige-100 relative">
      {/* Navigation Header — hidden on homepage (it has its own overlay) */}
      {!isHomepage && (
        <>
          <PrimaryNavigation onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          <MobileNavigation
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        </>
      )}

      {/* Main Page Body (Routes render here) */}
      <main className={`flex-1 w-full flex flex-col ${isHomepage ? '' : 'relative z-10'}`}>
        <Outlet />
      </main>

      {/* Persistent Audio Player */}
      <MusicPlayer />

      {/* Letters Modal */}
      <LettersModal />

      {/* Global Footer — hidden on homepage (single viewport) */}
      {!isHomepage && <Footer />}
    </div>
  );
};
