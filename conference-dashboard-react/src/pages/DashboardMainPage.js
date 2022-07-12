import React from "react"
import { SidebarData } from "../components/SidebarData";
import { Link, Navigate } from "react-router-dom";
const DashboradMainPage = props => {
    //dashboard will be a little smaller when sidebar is open
    const DashboardMainPage = props.isOpen ? "content open" : "content";
    let SidebarData_subset = SidebarData.slice(1, 3)
    const user = localStorage.getItem("user")

    //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={DashboardMainPage}>
        <div class="container">
            <div class="row">  
                        {
                            SidebarData_subset.map((item, index) => {
                                return (
                                <div class="col-sm-6">
                                    <div class="card">
                                    <div class="card-body">
                                            <div key={index}  >                                          
                                                {//item.icon
                                                }
                                                <h5 class="card-title">{item.title}</h5>
                                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                                <Link to={item.path}  class="btn btn-primary">
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
