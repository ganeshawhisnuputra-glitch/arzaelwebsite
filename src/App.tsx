import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { ModalProvider } from './context/ModalContext';
import { EntryProvider } from './context/EntryContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Layout } from './components/layout/Layout';

import { HomePage } from './pages/HomePage';
import { SelfSabotagePage } from './pages/SelfSabotagePage';
import { ArchivePage } from './pages/ArchivePage';
import { WatchPage } from './pages/WatchPage';
import { ShopPage } from './pages/ShopPage';
import { LettersPage } from './pages/LettersPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <EntryProvider>
        <AudioProvider>
          <ModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="self-sabotage" element={<SelfSabotagePage />} />
                  <Route path="archive" element={<ArchivePage />} />
                  <Route path="watch" element={<WatchPage />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="letters" element={<LettersPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ModalProvider>
        </AudioProvider>
      </EntryProvider>
    </ErrorBoundary>
  );
};

export default App;
