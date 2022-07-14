import React from "react";
import { SidebarData} from '../data/SidebarData';
import { Link } from 'react-router-dom';
const Sidebar = props => {
  // the css changes when sidebar is open
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    const user = JSON.parse(localStorage.getItem("user")); //retrieve the object
    let SidebarData_subset = SidebarData.slice(0, 3);
    if(user){
      if (user.status==="admin"){
        SidebarData_subset = SidebarData.slice(3, 8)
      } else {
        SidebarData_subset = SidebarData.slice(0, 3)
      }
    }
    return (
      <div className={sidebarClass}>
        <nav class=" navbar-expand d-flex flex-column align-item-start">
          <dov class="navbar-brand text-light mt-5" > 
            <div class="display-5 font-weight-bold"> LOGO </div>
          </dov>
          <ul class="navbar-nav  d-flex flex-column mt-5 w-100">
            {
                SidebarData_subset.map((item, index) => {
                    return (
                      <li class="w-100">
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
          Toggle 
        </button>

      </div>
    );
  };
export default Sidebar;