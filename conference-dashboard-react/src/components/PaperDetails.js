import React, {useContext, useEffect, useState} from 'react'
import { PapersData } from './PapersData';
import { Link, Navigate } from "react-router-dom";
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
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
  
  var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
 

  const user = localStorage.getItem("user")
  useEffect(() => {
    console.log("run")
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
  console.log(paper.title)
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
                <button class="btn btn-primary">
                  delete
                </button>
              </div>
              {/* TODO: assign judge only if admin*/}
              <div class='col-1'>
                  {/* <Link to='/assign-judge' class="btn btn-primary">
                      Assign Judge
                  </Link>  */}
              </div>
              <div class='col-9'>
                id:{paper.id}
              </div>              
            </div>
          </div>

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