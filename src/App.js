import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './pages/NavBar';
import HeroSection from './pages/Dashboard';
import AboutSection from './pages/AboutSection';
import ProjectsSection from './pages/ProjectsSection';
import ExperienceSection from './pages/ExperienceSection';
import ContactSection from './pages/ContactSection';
import EducationSection from './pages/EducationSection';

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
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
        {/* <Route path="/project/:id" element={<ProjectDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
