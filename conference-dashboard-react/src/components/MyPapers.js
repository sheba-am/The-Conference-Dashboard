import React , {useContext, useState, useEffect}from 'react'
import { Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import {myPaperColumnsData} from '../data/columns';
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
    () => myPaperColumnsData,[]
  )
    var pendingPapers = []
    var revisedPapers = []
    var approvedPapers = []  
    var rejectedPapers = []
    if(papersData) {
      for(let i=0 ; i<papersData.length ; i++) {
        if(papersData[i].dabirConference && papersData[i].dabirConference==='approve') {
          approvedPapers.push(papersData[i])
        } else if(papersData[i].dabirConference && papersData[i].dabirConference==='reject') {
          rejectedPapers.push(papersData[i])
        } else if(papersData[i].dabirKhane && papersData[i].dabirKhane.includes('reject')) {
          rejectedPapers.push(papersData[i])
        } else if(papersData[i].dabirKhane && papersData[i].dabirKhane.includes('revise')) {
          revisedPapers.push(papersData[i])
        } else {
          pendingPapers.push(papersData[i])
        } 
      }
    }    
  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div  className={PapersCss}>
      
      <div class="container mt-3">
        

        <div class="d-flex bd-highlight mb-3">
          <div class="p-2 bd-highlight"><h2>My Papers</h2></div>
          <div class="ms-auto p-2 bd-highlight">
            <Link to='/dashboard/new-paper'  class="btn add-paper-btn" >
              +New Paper
            </Link>
          </div>
        </div>
        <div className='tab'>         
          <ul class="nav nav-tabs" role="tablist">
            <div class="line-1"> </div>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh active" data-bs-toggle="tab" href="#menu0">All Papers <span className='number-badge'>{papersData && papersData.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu1">Pending Papers <span className='number-badge'>{pendingPapers.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu2">Revise Papers <span className='number-badge'>{revisedPapers.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link down down-bakhsh" data-bs-toggle="tab" href="#menu3">Aprroved Papers <span className='number-badge'>{approvedPapers.length}</span> </a>
            </li>
            <li class="nav-item">
              <a class="nav-link up up-bakhsh" data-bs-toggle="tab" href="#menu4">Rejected Papers <span className='number-badge'>{rejectedPapers.length}</span> </a>
            </li>
          </ul>
          <br />
          {/* ======== Tab Content ========== */}
          <div class="tab-content">
            <div id="menu0" class="container tab-pane active"><br />
              <h3>All</h3>
              {papersData ? <MyPapersTable columns={columns} data={papersData}  myPaper={true} />:<h4>Loading...</h4>}
              <br />
            </div>
            <div id="menu1" class="container tab-pane fade"><br />
              <h3>Pending</h3>
              {pendingPapers.length>0 ? <MyPapersTable columns={columns} data={pendingPapers} myPaper={true}/>:<h4>No Results</h4>}
              <br />
            </div>
            <div id="menu2" class="container tab-pane fade"><br />
              <h3>Revise</h3>
              {revisedPapers.length>0 ? <MyPapersTable columns={columns} data={revisedPapers} myPaper={true} />:<h4>No Results</h4>}
              <br />
            </div>
            <div id="menu3" class="container tab-pane fade"><br />
              <h3>Aprroved</h3>
              {approvedPapers.length>0 ? <MyPapersTable columns={columns} data={approvedPapers} myPaper={true} />:<h4>No Results</h4>}
              <br />
            </div>
            <div id="menu4" class="container tab-pane fade"><br />
              <h3>Rejected</h3>
              {rejectedPapers.length>0 ? <MyPapersTable columns={columns} data={rejectedPapers} myPaper={true} />:<h4>No Results</h4>}
              <br />
            </div>
          </div>
        </div>        
      
        

       
      </div>

    </div>
  )
}

export default MyPapers