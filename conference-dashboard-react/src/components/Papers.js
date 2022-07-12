import React , {useContext}from 'react'
// import { PapersData } from './PapersData';
import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
//import ReactTable from "react-table";
let PapersData = [];
const user = JSON.parse(localStorage.getItem("user"))
//get papers

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}
if(user){
  console.log(user)
  const result = axios.post(
    'http://127.0.0.1:8000/viewPapers',
    {'authors': user.username}
    , config
  ).then((response) => response)
  .then((response) => {
    PapersData = response.data
    localStorage.setItem("papers", JSON.stringify(PapersData))
  })
}


function Papers(props) {
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  const showDetails = (a) => {
    
    // alert(a.id);
    setSelectedPaper(a)
  }
  //csss changes when sidebar is open
  const Papers = props.isOpen ? "papers-content open" : "papers-content";
  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={Papers}>
      {/* ==== Add new paper ==== */}
      {/* <div class='container'>
        <div class='row'>
          <div class="col-3"> Add new paper:</div>
          <div class="col"><button class="btn btn-primary">+new</button></div>
        </div>
      </div> */}
      <div> Add new paper</div>
      <div>
        <Link to='/new-paper'  class="btn btn-primary">
        +new
        </Link>         
      </div>
      {/* ========The Table======= */}
      <div class="table-responsive-md">
        <table class="table papers-table justify-content-center table table-hover align-middle">
          <thead>
            <tr class="float-right">
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Authors</th>
              <th scope="col">Score</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            
              {
                  PapersData.map((item, index) => {
                      return (
                        
                            <tr key={index}  >
                               <th scope="row">{index+1}</th>
                              <td>
                                {item.id}
                              </td> 
                              <td>
                                {item.title}
                              </td>
                              <td>
                                {item.authors}
                              </td>
                              <td>
                                {item.avg_score}
                              </td>
                              <td>
                                <Link to='/paper-details' class="btn btn-primary" onClick={() => showDetails(item)}>
                                    details
                                </Link> 
                              </td>
                            </tr>
                        
                      );
                  })
              }                
            

          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Papers;