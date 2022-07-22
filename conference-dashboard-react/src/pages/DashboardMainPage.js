import React, {useState, useEffect} from "react"
import { DashboadMainPageData} from '../data/SidebarData';
import { Link, Navigate } from "react-router-dom";
const DashboradMainPage = props => {
    //dashboard will be a little smaller when sidebar is open
    const DashboardMainPage = props.isOpen ? "content open" : "content";
    let DashboadMainPageData_subset = DashboadMainPageData.slice(0, 3)
    const user = JSON.parse(localStorage.getItem("user"))
    const [userState, setUserState] = useState()

    if(user){
        if (user.status==="admin"){
          DashboadMainPageData_subset = DashboadMainPageData.slice(3, 8)
        } else {
          DashboadMainPageData_subset = DashboadMainPageData.slice(0, 3)
        }
      }

      function handleLogout(e) {
        e.preventDefault()
        localStorage.removeItem('user')
        setUserState(undefined)
        // navigate('/')
        window.location.reload()
      }
      useEffect(() => {

      },[userState]);
    //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={DashboardMainPage}>
        <div id='main-page' class="container">
            <div class="row">
            <div class='col-lg-1 col-md-2'>
                <button class='btn logout-btn' onClick={handleLogout}>
                  Logout
                </button>
              </div>              
              <div class="col">
                <h3 class='main-page-header'>
                  Welcome {user.first_name} {user.last_name}
                </h3>
              </div>

            </div>
            <div class="row">  
                        {
                            DashboadMainPageData_subset.map((item, index) => {
                                return (
                                <div key={index} class="col-sm-6">
                                    <div class="card main-page-card">
                                      <div class="card-body ">
                                              <div   >                                          
                                                  <h5 class="card-title">{item.icon} {item.title}</h5>
                                                  <p class="card-text"> {item.description} </p>
                                                  <Link to={item.path}  class="btn main-page-card-btn">
                                                      go
                                                  </Link> 
                                              </div>
                                      </div>
                                    </div>
                                </div>
                                );
                            })
                        }                        
            </div>
        </div>
    </div>
  );
};
export default DashboradMainPage;
