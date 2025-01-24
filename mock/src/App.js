import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillMatchLandingPage from './pages/landing';
import AuthPage from './pages/AuthPage';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkillMatchLandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;