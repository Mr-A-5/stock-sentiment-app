import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockInfo from './pages/StockInfo.jsx';
import PostDetail from './pages/PostDetail.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:stockName" element={<StockInfo />} />
        <Route path="/:stockName/:id" element={<PostDetail/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
