import React from "react";
import { SidebarData} from '../data/SidebarData';
import { GiHamburgerMenu } from "react-icons/gi";
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
      <div id='sidebar'>
        <div className={sidebarClass}>
          {/* <nav class=" navbar-expand d-flex flex-column align-item-start"> */}
          <nav>
            <div class="navbar-brand text-light mt-5" >
              {/* <div class="display-5 font-weight-bold sidebar-item"> LOGO </div> */}
            </div>

            <ul class="navbar-nav  d-flex flex-column  w-100">
              {
                  SidebarData_subset.map((item, index) => {
                      return (
                        <li class="nav-item " >
                            <div key={index} class="nav-link sidebar-item" >
                            <Link class="link-of-nav" onClick={props.toggleSidebar} to={item.path}>
                                {item.icon}  {item.title}
                            </Link>
                            </div>
                        </li>
                      );
                  })
              }
            </ul>
          </nav>
        </div>
        {/* <i class="bi bi-list"></i> */}
        <button class="btn btn-primary sidebar-toggle" onClick={props.toggleSidebar} >
          <GiHamburgerMenu />
        </button>

      </div>
    );
  };
export default Sidebar;