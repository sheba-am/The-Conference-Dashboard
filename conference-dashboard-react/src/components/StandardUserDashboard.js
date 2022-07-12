
import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Header from './Header'
import DashboradMainPage from "../pages/DashboardMainPage";
import EditInfo from "./EditInfo";
import Papers from "./Papers";
import PaperDetails from "./PaperDetails";
import NewPaper from "../pages/NewPaper";
import EditPaper from "./EditPaper";
import { PaperContext } from "../contexts/PaperContext";
import AssignJudge from './AssignJudge'
import Signup from './Signup'
export default function StandardUserDashboard(){
  // this const is for toggle of sidebar
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };    
    const [selectedPaper, setSelectedPaper] = useState(null);
    const providerValue = useMemo(() => ({selectedPaper, setSelectedPaper}),[selectedPaper, setSelectedPaper]);
    return(
        <span>
        {/* <Header onClick={handleViewSidebar} /> */}
        <div class="container">
          <div class="row">
            <div class="col">
            <Router>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
              <PaperContext.Provider value={providerValue}>
                <Routes>
                  <Route path='/' element={<DashboradMainPage isOpen={sidebarOpen}/>} />
                  <Route path='/editinfo' element={<EditInfo isOpen={sidebarOpen}/>} />
                  <Route path='/papers' element={<Papers isOpen={sidebarOpen}/>} />
                  <Route path='/paper-details' element={<PaperDetails isOpen={sidebarOpen}/>} />
                  <Route path='/new-paper' element={<NewPaper isOpen={sidebarOpen}/>} />
                  <Route path='edit-paper' element={<EditPaper isOpen={sidebarOpen} />} />
                  {/* <Route path='assign-judge' element={<AssignJudge isOpen={sidebarOpen} />} /> */}
                  <Route path='Signup' element={<Signup isOpen={sidebarOpen} />} />
                </Routes>
              </PaperContext.Provider>
            </Router>              
            </div>      
          </div>
  
        </div>
        
      </span>
    )
}