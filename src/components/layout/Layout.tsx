import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PrimaryNavigation } from './PrimaryNavigation';
import { MobileNavigation } from './MobileNavigation';
import { Footer } from './Footer';
import { MusicPlayer } from '../audio/MusicPlayer';
import { LettersModal } from '../letters/LettersModal';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-petrol-950 text-text-primary selection:bg-flesh-500/30 selection:text-flesh-200">
      {/* Navigation Header */}
      <PrimaryNavigation onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer Menu */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Page Body (Routes render here) */}
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      {/* Persistent Audio Player (stays persistent across page navigation) */}
      <MusicPlayer />

      {/* Letters Modal */}
      <LettersModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
