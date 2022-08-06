import React, {useState} from "react";
import { StandardSidebarData, DabirConferenceSidebarData, JudgeSidebarData, DabirBakhshSidebarData, DabirKhaneSidebarData, userStatus} from '../data/SidebarData';
import { GiHamburgerMenu } from "react-icons/gi";
import {MdLogout} from "react-icons/md";
import { Link } from 'react-router-dom';
import SubMenu from "./SubMenu";
import img from '../photos/profile-icon.png'
const Sidebar = props => {
  // the css changes when sidebar is open
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    const user = JSON.parse(localStorage.getItem("user")); //retrieve the object
    const [userState, setUserState] = useState()

    let SidebarData = StandardSidebarData;
    if(user){
      if (user.status==="dabirconference"){
        SidebarData = DabirConferenceSidebarData
      } else if (user.status==='dabirkhane') {
        SidebarData = DabirKhaneSidebarData
      } else if (user.status==='dabirbakhsh') {
        SidebarData = DabirBakhshSidebarData
      } else if (user.status==="judge") {
        SidebarData = JudgeSidebarData
      }

    }
    function handleLogout(e) {
      e.preventDefault()
      localStorage.removeItem('user')
      setUserState(undefined)
      // navigate('/')
      window.location.reload()
    }
    return (
      <div id='sidebar'>
        <div className={sidebarClass}>
          {/* <nav class=" navbar-expand d-flex flex-column align-item-start"> */}
          <nav>
            <br />

            <div>
              <img alt='profile picture' className='profile-pic' src={img}></img>            
            </div>
            <div class="navbar-header text-light mt-2" >
              
              {// field && fieldsData.find((single) => single.value ===field)
              /* <div class="display-5 font-weight-bold sidebar-item"> LOGO </div> */}
              <div> {user && userStatus.find((single) => single.value===user.status).label }</div>
              <button className=' sidebar-logout' onClick={handleLogout}>
                <MdLogout />
              </button>
              <hr class="rounded" />

            </div>

            <ul class="navbar-nav  d-flex flex-column  w-100">
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