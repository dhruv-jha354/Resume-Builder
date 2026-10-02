import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import TemplatesPage from "./pages/TemplatesPage";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/resumeCreate/ResumeBuilder";
import DemoGallery from "./pages/DemoGallery";
import DemoPreview from "./pages/DemoPreview";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/create" element={<TemplatesPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume-builder/:id" element={<ResumeBuilder />} />
          <Route path="/demo" element={<DemoGallery />} />
          <Route path="/demo/:resumeId" element={<DemoPreview />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;