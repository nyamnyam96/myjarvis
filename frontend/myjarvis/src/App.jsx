import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StyleGuide from "./pages/StyleGuide";

function App() {
    return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<StyleGuide />} /> {/* 기본 경로 */}
          <Route path="/style-guide" element={<StyleGuide />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App
