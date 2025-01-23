import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillMatchLandingPage from './pages/landing';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkillMatchLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;