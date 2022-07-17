
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Signup  from './components/Signup';
import EditInfo from './components/EditInfo';
import DownloadPDF from './components/DownloadPDF';
import AssignJudge from './components/AssignJudge';
import FirstPage from './components/FirstPage';
import HomePage from "./components/HomePage";
import NavbarComp from './components/NavbarComp';
export default function App() {

  return (
    <div id='App'>
      
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/' element={<FirstPage />} /> */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard/*' element={<Dashboard />} />

        </Routes>
      </Router>
      {/* <Signup/> */}
      {/* <EditInfo/> */}
      {/* <DownloadPDF/> */}
      {/* <AssignJudge/> */}

    </div>
  );
}
