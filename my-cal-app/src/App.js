import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalApp from "./CalApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalApp />} />
      </Routes>
    </Router>
  );
}

export default App;
