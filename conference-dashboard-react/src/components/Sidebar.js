import React from "react";

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
            <li class="nav-item w-100">
              <dov class="nav-link text-light pl-4">مقالات </dov>
            </li>
           
          </ul>
        </nav>
        <button onClick={props.toggleSidebar} className="sidebar-toggle">
          Toggle Sidebar
        </button>
      </div>
    );
  };
export default Sidebar;