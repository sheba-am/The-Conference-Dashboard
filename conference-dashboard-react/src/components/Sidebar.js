import React from "react";
import { SidebarData } from "./SidebarData";
import { Link } from 'react-router-dom';
const Sidebar = props => {
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    return (
      <div className={sidebarClass}>
        <nav class="navbar navbar-expand d-flex flex-column align-item-start">
          <dov class="navbar-brand text-light mt-5" > 
            <div class="display-5 font-weight-bold"> LOGO </div>
          </dov>
          <ul class="navbar-nav d-flex flex-column mt-5 w-100">
            <li class="nav-item w-100">
              <dov class="nav-link text-light pl-4">ویرایش اطلاعات </dov>
            </li>

            {
                SidebarData.map((item, index) => {
                    return (
                      <li class="nav-item w-100">
                          <div key={index} class="nav-link text-light pl-4" >
                          <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                          </Link>
                          </div>
                      </li>
                    );
                })
            }           
          </ul>
        </nav>
        <button onClick={props.toggleSidebar} className="sidebar-toggle">
          Toggle Sidebar
        </button>

      </div>
    );
  };
export default Sidebar;