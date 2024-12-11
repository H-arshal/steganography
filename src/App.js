import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";  // Import Navbar component
import Encode from "./components/EncodePage";  // Import Encode component
import Decode from "./components/DecodePage";  // Import Decode component
import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/encode" element={<Encode />} />
          <Route path="/decode" element={<Decode />} />
          <Route path="/" element={<Encode />} />  {/* Default to EncodePage */}
        </Routes>
    </Router>
  );
};

export default App;
