
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Header from './Header'
import DashboradMainPage from "../pages/DashboardMainPage";
import EditInfo from "../pages/EditInfo";
import Papers from "../pages/Papers"
import PaperDetails from "../pages/PaperDetails";
import NewPaper from "../pages/NewPaper";
export default function StandardUserDashboard(){
  // this const is for toggle of sidebar
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };    
    return(
        <span>
        {/* <Header onClick={handleViewSidebar} /> */}
        <div class="container">
          <div class="row">
            <div class="col">
            <Router>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />

              <Routes>
                <Route path='/' element={<DashboradMainPage isOpen={sidebarOpen}/>} />
                <Route path='/editinfo' element={<EditInfo isOpen={sidebarOpen}/>} />
                <Route path='/papers' element={<Papers isOpen={sidebarOpen}/>} />
                <Route path='/paper-details' element={<PaperDetails isOpen={sidebarOpen}/>} />
                <Route path='/new-paper' element={<NewPaper isOpen={sidebarOpen}/>} />
              </Routes>
            </Router>              
            </div>      
          </div>
  
        </div>
        
      </span>
    )
}