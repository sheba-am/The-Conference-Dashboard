
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
export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </Router>
      {/* <Signup/> */}
      {/* <EditInfo/> */}
      {/* <DownloadPDF/> */}
      {/* <AssignJudge/> */}

    </div>
  );
}
