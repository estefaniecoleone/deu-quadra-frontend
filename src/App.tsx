import React, { Suspense, createContext, useState } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HomePage, SearchPage } from './pages/SimplePage/Search/SearchPage';
import { SimplePage } from './pages/SimplePage/SimplePage';
import { WorkPage } from './pages/SimplePage/Work/WorkPage';
import { AuthResult, useAuth } from './hooks/Auth';
import { GuardedRoute } from './routes/GuardedRoutes';
import { AuthenticationContext } from './contexts/Auth';
import { LoginPage } from './pages/SimplePage/Login/LoginPage';

import { Modal } from '@components/Modal/Modal';
import { ModalProvider } from '@components/Modal/ModalProvider';
import { LandingPage } from './pages/SimplePage/Landing/LandingPage';
import { AllocatePage } from './pages/SimplePage/Allocate/AllocatePage';
import { LanguageContext } from './contexts/Language';
import { LanguageProvider } from './hooks/Language';
import { LocadorPage } from './pages/SimplePage/Locador/LocadorPage';
import { IncluirQuadraPage } from './pages/SimplePage/Quadra/IncluirQuadra';
import { InfosQuadraPage } from './pages/SimplePage/Quadra/InfosQuadraPage';




export function App() {
  const authentication = useAuth();

  return (
    <div>
      <ModalProvider>
        <LanguageProvider>
          <AuthenticationContext.Provider value={authentication}>
            <Modal />
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/search" element={<SearchPage />} />
                <Route path="/novaQuadra" element={<IncluirQuadraPage />} />
                <Route path="/infosQuadra/:id" element={<InfosQuadraPage />} />
                <Route
                  path="/allocate/:id"
                  element={
                    <GuardedRoute>
                      <AllocatePage />
                    </GuardedRoute>
                  }
                />
                <Route
                  path="/empresa/:id"
                  element={
                    <GuardedRoute>
                      <LocadorPage />
                    </GuardedRoute>
                  }
                />
              </Routes>
            </Router>
          </AuthenticationContext.Provider>
        </LanguageProvider>
      </ModalProvider>
    </div>
  );
}
