import React , {useContext, useState, useEffect}from 'react'

import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { Container } from 'react-bootstrap';
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
    console.log("context",selected)
    setSelectedPaper(selected)
  }
  //csss changes when sidebar is open
  const PapersCss = props.isOpen ? "content open" : "content";

  useEffect(() => {
    if(user){
      //get all the papers for admin and assigned papers for judge and standard user
      var request = ''
      if(user.status=='admin'){
        request = "viewAllPapers"
      }else{
        request = "viewPapers"
      }
      const result = axios.post(
        'http://127.0.0.1:8000/' + request,
        {'username': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setPapersData(response.data)
        console.log(papersData)
        localStorage.setItem("papers", JSON.stringify(papersData))
      })
    } 
  }, [])
  const isTableEmpty = papersData && papersData.length >0 ? "table papers-table justify-content-center  table-hover align-middle" : "table papers-table-empty justify-content-center  table-hover align-middle";
  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div  className={PapersCss}>
      <Container>
        <h3> Papers </h3>
        
          {user.status=='standard'?<Link to='/dashboard/new-paper'  class="btn add-paper-btn" >
          +New Paper
          </Link>:<div></div>}
      
        {/* ========The Table======= */}
        <div id='papers-table' class="table-responsive-md">
          <table class={isTableEmpty}>
            <thead class='papers-table-header'>
              <tr class="float-right ">
                <th scope="col-1" class='papers-table-header-item'>#</th>
                <th scope="col-1"  class='papers-table-header-item'>Id</th>
                <th scope="col-7"  class='papers-table-header-item'>Title</th>
                <th scope="col-2"  class='papers-table-header-item'>Authors</th>
                {/* <th scope="col">Score</th> */}
                { user.status==="admin" &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
                { user.status==="standard" &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
                {user.status==="judge" && <th scope="col-1"  class='papers-table-header-item'>Feedback</th>}
              </tr>
            </thead>
            <tbody class="papers-table-body">
      
                {
                    papersData?papersData.map((item, index) => {
                        return (
      
                              <tr key={index}  >
                                 <th scope="row" class='col-1 table-index'>{index+1}</th>
                                <td class='col-1'>
                                  {item.id}
                                </td>
                                <td class='col-7'>
                                  {item.title}
                                </td>
                                <td class='col-2'>
                                  {item.authors}
                                </td>
                                {/* <td>
                                  {item.avg_score}
                                </td> */}
                                
                                  {  user.status==="admin" &&
                                  <td class='col-1'>
                                  <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(item)}>
                                        ...
                                    </Link>
                                  </td>
                                  }
                                  { user.status==="standard" &&
                                  <td class='col-1'>
                                  <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(item)}>
                                        ...
                                    </Link>
                                  </td>
                                  }                                
                                
                                  {
                                    user.status==="judge"&&
                                    <td class='col-1'>
                                    <Link to='/dashboard/send-feedback' class="btn btn-primary  send-feedback-btn" onClick={() => showDetails(item)}>
                                        Send Feedback
                                    </Link>
                                    </td>
                                  }
                                
                              </tr>
      
                        );
                    }):<h2>Loading...</h2>
                }
      
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
export default Papers;