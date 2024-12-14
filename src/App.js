import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Encode from "./components/EncodePage";
import Decode from "./components/DecodePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/encode" element={<Encode />} />
        <Route path="/decode" element={<Decode />} />
        <Route path="/" element={<Encode />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
