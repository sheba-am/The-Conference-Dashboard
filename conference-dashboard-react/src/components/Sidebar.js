import React from "react";
import { StandardSidebarData, DabirConferenceSidebarData, JudgeSidebarData, DabirBakhshSidebarData, DabirKhaneSidebarData} from '../data/SidebarData';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import SubMenu from "./SubMenu";
const Sidebar = props => {
  // the css changes when sidebar is open
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    const user = JSON.parse(localStorage.getItem("user")); //retrieve the object
    let SidebarData = StandardSidebarData;
    if(user){
      if (user.status==="dabirConference"){
        SidebarData = DabirConferenceSidebarData
      } else if (user.status==='dabirKhane') {
        SidebarData = DabirKhaneSidebarData
      } else if (user.status==='dabirBakhsh') {
        SidebarData = DabirBakhshSidebarData
      } else if (user.status==="judge") {
        SidebarData = JudgeSidebarData
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
              {/* {
                  SidebarData.map((item, index) => {
                      return (
                          <li  key={index} class="nav-item " >
                              <div class="nav-link sidebar-item" >
                              <Link class="link-of-nav" onClick={props.toggleSidebar} to={item.path}>
                                  {item.icon}  {item.title}
                              </Link>
                              </div>
                          </li>
                      );
                  })
              } */}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}              
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