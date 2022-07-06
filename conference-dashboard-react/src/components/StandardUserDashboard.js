
import React, { useState } from "react";

import Sidebar from './Sidebar';
// import Header from './Header'
import DashboradMainPage from "./DashboardMainPage";
export default function StandardUserDashboard(){
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
                <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </div>
            <div class="col-12">
                <DashboradMainPage isOpen={sidebarOpen} />
              
            </div>      
          </div>
  
        </div>
        
      </span>
    )
}