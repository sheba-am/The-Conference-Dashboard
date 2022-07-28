import React , {useContext, useState, useEffect}from 'react'
import { Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import {columnsData} from '../data/columns';
import MyPapersTable from '../components/MyPapersTable'
import { Link } from 'react-router-dom';



const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}
function MyPapers(props) {
  const user = JSON.parse(localStorage.getItem("user"))
  const PapersCss = props.isOpen ? "content open" : "content";
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  const [papersData, setPapersData] = useState()
  const [judgeFeedbackData, setJudgeFeedbackData] = useState()

 
  useEffect(() => {
    if(user){
      //get all the papers which current user is author of
      const result = axios.post(
        'http://127.0.0.1:8000/viewPapers',
        {'username': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setPapersData(response.data)
        localStorage.setItem("papers", JSON.stringify(papersData))
      })


    } 
  }, [])
  
  const columns = React.useMemo(
    () => columnsData,[]
  )
 

  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div  className={PapersCss}>
      
      <div class="container mt-3">
        
        <h2>My Papers</h2>    
        <Link to='/dashboard/new-paper'  class="btn add-paper-btn" >
          +New Paper
        </Link>

        <div>         
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#menu0">All</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu1">Pending</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu2">Revise</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu3">Aprroved</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#menu4">Rejected</a>
            </li>
          </ul>

          <div class="tab-content">
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
              {papersData ? <MyPapersTable columns={columns} data={papersData} />:<h2>Loading...</h2>}
            </div>
            <div id="menu1" class="container tab-pane fade"><br />
              <h3>Pending</h3>

            </div>
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Revise</h3>

            </div>
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Aprroved</h3>

            </div>
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Rejected</h3>

            </div>
          </div>
        </div>        
                
        

       
      </div>

    </div>
  )
}

export default MyPapers