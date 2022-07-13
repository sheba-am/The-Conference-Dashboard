import React , {useContext, useState, useEffect}from 'react'
// import { PapersData } from './PapersData';
import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
//import ReactTable from "react-table";

//get papers

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}

function Papers(props) {
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  const user = JSON.parse(localStorage.getItem("user"))
  const [papersData, setPapersData] = useState()
  const showDetails = (selected) => {
    localStorage.setItem("selectedPaper", JSON.stringify(selected))
    // alert(a.id);
    console.log(selected)
    setSelectedPaper(selected)
  }
  //csss changes when sidebar is open
  const Papers = props.isOpen ? "papers-content open" : "papers-content";

  useEffect(() => {
    if(user){
      console.log(user)
      const result = axios.post(
        'http://127.0.0.1:8000/viewPapers',
        {'authors': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setPapersData(response.data)
        console.log(papersData)
        localStorage.setItem("papers", JSON.stringify(papersData))
      })
    } 
  }, [])
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
        <Link to='/dashboard/new-paper'  class="btn btn-primary">
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
                  papersData?papersData.map((item, index) => {
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
                                <Link to='/dashboard/paper-details' class="btn btn-primary" onClick={() => showDetails(item)}>
                                    details
                                </Link> 
                              </td>
                            </tr>
                        
                      );
                  }):<h2>Loading...</h2>
              }                
            

          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Papers;