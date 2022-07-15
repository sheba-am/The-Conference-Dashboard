import React, {useContext, useEffect, useState} from 'react'
// import { PapersData } from './PapersData';
import { Link, Navigate, resolvePath } from "react-router-dom";
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import DeleteModal from './DeleteModal';
  // let feedbacks = []
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}

function PaperDetails(props) {
  const [feedbacks, setFeedbacks] = useState([]);
  const PaperDetails = props.isOpen ? "paper-details-content open" : "paper-details-content";
  //var selectedPaper = PapersData[0];
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  //var paper;
  // this const is for toggle of delteModal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleViewDelete = () => {
    setDeleteOpen(!deleteOpen);
  };
  const [paper, setPaper] = useState(JSON.parse(localStorage.getItem("selectedPaper"))); //retrieve the object
 

  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    const result = axios.post(
      'http://127.0.0.1:8000/viewAllFeedback',
      {
        'title':paper.title
      }
      , config
    ).then((response) => response)
    .then((response) => {
      setFeedbacks(response.data)
    })
  }, []);

function handleClick(e) {
    e.preventDefault()
    const config = {
      headers: {
          'Content-type': 'application/json',
          
      }
    }
  const result = axios.post(
      'http://127.0.0.1:8000/getPaperFile',
      {
        'title':paper.title
      },
      config
    ).then((response) => response)
    .then((response) => {
      console.log(response)
  })
  }
  function handlePublish(e) {
    e.preventDefault()
    const config = {
      headers: {
          'Content-type': 'application/json',
          
      }
    }
  const result = axios.post(
      'http://127.0.0.1:8000/publish',
      {
        'title':paper.title
      },
      config
    ).then((response) => response)
    .then((response) => {
      localStorage.setItem("selectedPaper", JSON.stringify(response.data))
      setPaper(response.data)
  })
  }

  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={PaperDetails}>
        {/* ==== The Paper Details ==== */}
        <div className='details-of-paper'>
          <div class='container'>
            <div class='row'>
              <div class='col-1'>
                <button class="btn btn-primary">
                  history
                </button>
              </div>
              <div class='col-1'>
                <Link to='/dashboard/edit-paper' class="btn btn-primary">
                    edit
                </Link> 
              </div>
              <div class='col-1'>
                <button class="btn btn-primary" onClick={handleViewDelete}>
                  delete
                </button>
              </div>
              {/* TODO: assign judge only if admin*/}
              <div class='col-1'>
                  <Link to='/dashboard/assign-judge' class="btn btn-primary">
                      Assign Judge
                  </Link> 
              </div>
              
              {user.status=='admin' && paper.published == false?<div class='col-1'><button class="btn btn-primary" onClick={handlePublish}>
                  publish
                </button></div>:<div></div>}
              <div class='col-9'>
                id:{paper.id}
              </div>         
            </div>
          </div>
          <div><DeleteModal isOpen={deleteOpen} toggleDelete={handleViewDelete} /></div> 
          <div>
            Paper Title: {paper.title}
          </div>
          <div>
            Paper Authors: {paper.authors}
          </div>
          <div>
            {/* Sent Date: {paper.send_date} */}
          </div>   
          <div>
            Paper File: <button onClick={handleClick}>get file</button>
          </div>
          <div>
            number of pages: {paper.NOM}
          </div>             
          <div>
            Abstract: {paper.summary}
          </div> 
          <div>
            Published: {paper.published?"Yes":"No"}
          </div> 
                    
        </div>
        {/*==== Judges Table ==== */}
        <div>
          <div>Judges: {paper.judges}</div>
          <table class="table papers-table justify-content-center table table-hover align-middle">
          <thead>
            <tr class="float-right">
              <th scope="col">#</th>
              <th scope="col">Judge name</th>
              <th scope="col">state</th>
              <th scope="col">score</th>
              <th scope="col">feedback</th>             
            </tr>
          </thead>
          <tbody>
            
              {
                  feedbacks.map((item) => {
                      return (
                        
                            <tr key={item.id}  >
                              <th scope="row">{item.id + 1}</th>
                              <td>{item.judge}</td>
                              <td> {item.status}</td>
                              <td> {item.score}</td>
                              <td> {item.description}</td>
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


export default PaperDetails;