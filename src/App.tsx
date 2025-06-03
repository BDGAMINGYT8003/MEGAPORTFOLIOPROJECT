// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/Layout/PageLayout';
import HomePage from './pages/HomePage';
import DossierPage from './pages/DossierPage';
import LaboratoryPage from './pages/LaboratoryPage';
import CaseFilesPage from './pages/CaseFilesPage';
import EvidencePage from './pages/EvidencePage';
import ChroniclePage from './pages/ChroniclePage';
import OraclePage from './pages/OraclePage';
import DispatchPage from './pages/DispatchPage';
import NotFoundPage from './pages/NotFoundPage'; // For 404 routes

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dossier" element={<DossierPage />} />
          <Route path="/laboratory" element={<LaboratoryPage />} />
          <Route path="/casefiles" element={<CaseFilesPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/chronicle" element={<ChroniclePage />} />
          <Route path="/oracle" element={<OraclePage />} />
          <Route path="/dispatch" element={<DispatchPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
