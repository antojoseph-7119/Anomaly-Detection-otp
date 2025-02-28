import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './components/WelcomePage'; // Ensure correct import path


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

