
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Header from './Header'
import DashboradMainPage from "../pages/DashboardMainPage";
import EditInfo from "../pages/EditInfo";
import Papers from "../pages/Papers"
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
            <div class="col-3">
            </div>
            <div class="col-12">
            <Router>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />

              <Routes>
                <Route path='/' element={<DashboradMainPage isOpen={sidebarOpen}/>} />
                <Route path='/editinfo' element={<EditInfo/>} />
                <Route path='/papers' element={<Papers/>} />
              </Routes>
            </Router>              
            </div>      
          </div>
  
        </div>
        
      </span>
    )
}