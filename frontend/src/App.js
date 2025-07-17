import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './NavBar';
import TrueBar from './TrueBar';
import HomePage from './pages/HomePage'
import CreateUserPage from './pages/CreateUserPage'



function App() {
  return (
      <div style={{ padding: '2rem' }}>
         {/*TRUEBAR OVER ALL PAGES*/}
        <TrueBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createuser" element={<CreateUserPage />} />
        </Routes>

        {/*LOW NAVBAR (also over all pages?)*/}
        <NavBar />
      </div>
  );
}

export default App;
