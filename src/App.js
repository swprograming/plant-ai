import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Basic from "./components/Basic";
import Advanced from "./components/Advanced";
import About from "./components/About";
import './i18n'; // Ensure i18n is imported for translations

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;