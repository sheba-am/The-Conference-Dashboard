
import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import FirstPage from "./FirstPage";
import AllUsers from "./AllUsers";
import AllPapers from "./AllPapers";
import SendFeedback from "./SendFeedback";
import History from "./History";
export default function StandardUserDashboard(){
  // this const is for toggle of sidebar
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };    
    const [selectedPaper, setSelectedPaper] = useState(null);
    const providerValue = useMemo(() => ({selectedPaper, setSelectedPaper}),[selectedPaper, setSelectedPaper]);
    const user = JSON.parse(localStorage.getItem("user"))
    return(
      (!user)? <Navigate to="/signup"/> :

        <div id="dashboard">
          <div class="row">
            
            <div class='col'>
              <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </div>
              <div class='col'>
                <PaperContext.Provider value={providerValue}>
                  <Routes>
                
                    <Route path='/' element={<DashboradMainPage isOpen={sidebarOpen}/>} />
                    <Route path='/editinfo' element={<EditInfo isOpen={sidebarOpen}/>} />
                    <Route path='/papers' element={<Papers isOpen={sidebarOpen}/>} />
                    <Route path='/paper-details' element={<PaperDetails isOpen={sidebarOpen}/>} />
                    <Route path='/new-paper' element={<NewPaper isOpen={sidebarOpen}/>} />
                    <Route path='edit-paper' element={<EditPaper isOpen={sidebarOpen} />} />
                    <Route path='allusers' element={<AllUsers isOpen={sidebarOpen} />} />
                    <Route path='allPapers' element={<AllPapers isOpen={sidebarOpen} />} />
                    <Route path='assign-judge' element={<AssignJudge isOpen={sidebarOpen} />} />
                    <Route path='/send-feedback' element={<SendFeedback isOpen={sidebarOpen}/>} />
                    {/* <Route path='/edit-paper' element={<EditPaper isOpen={sidebarOpen} />} /> */}
                    <Route path='/history' element={<History />} />
                    {/* <Route path='assign-judge' element={<AssignJudge isOpen={sidebarOpen} />} /> */}
                    {/* <Route path='/signup' element={<Signup isOpen={sidebarOpen} />} /> */}
                  </Routes>
                </PaperContext.Provider>
              </div>
                          
          </div>
  
        </div>
        
      
    )
}