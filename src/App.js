import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './pages/NavBar';
import HeroSection from './pages/Dashboard';
import AboutSection from './pages/AboutSection';
import SkillsSection from './pages/SkillsSection';
import ProjectsSection from './pages/ProjectsSection';
import ExperienceSection from './pages/ExperienceSection';
import EducationSection from './pages/EducationSection';
import ContactSection from './pages/ContactSection';

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;