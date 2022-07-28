import React, {useContext, useEffect, useState} from 'react'
// import { PapersData } from './PapersData';
import { Link, Navigate, resolvePath } from "react-router-dom";
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import DeleteModal from './DeleteModal';
import JudgesTable from './JudgesTable';
import {JudgeTable} from '../data/PapersData'
import AssignJudge from './AssignJudge';
import { MdArrowBackIosNew } from "react-icons/md";
import { Container } from 'react-bootstrap';
import PaperInfo from './PaperInfo';
import DabirKhane_Approval from '../pages/DabirKhane_Approval';
  // let feedbacks = []
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}

function MyPaperDetails(props) {
  const [feedbacks, setFeedbacks] = useState([]);
  const PaperDetails = props.isOpen ? "content open" : "content";
  // const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  // ========== Delete Modal Toggle ==========
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleViewDelete = () => {
    setDeleteOpen(!deleteOpen);
  };
  const [paper, setPaper] = useState(JSON.parse(localStorage.getItem("selectedPaper"))); //retrieve the object
  //========= Edit Judges =============
  const [editJudgesOpen, setEditJudgesOpen] = useState(false);
  const handleViewEditJudges = () => {
    setEditJudgesOpen(!editJudgesOpen);
  };  
  // var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
 
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



  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div className={PaperDetails}>
      <div class="container" >
        {/* ==== The Paper Details ==== */}
        <div class=' container details-of-paper'>
      
          <div class='row'>
            <div class='col-lg-1 col-md-1 col-sm-2 '>
              <Link to='/dashboard/my-papers' class="btn btn-primary">
                  <MdArrowBackIosNew />
              </Link>
            </div>
            
            <div class='col-lg-1 col-md-2 col-sm-2 '>
              <Link to='/dashboard/edit-paper' class="btn btn-primary">
                  edit
              </Link>
            </div>
            
          
            <div class='col-lg-2 col-md-2 col-sm-3'>
              <button class="btn btn-primary" onClick={handleViewDelete}>
                delete
              </button>
            </div>
            

            {user.status=='dabirconference' && paper.published == false?<div class='col-lg-2 col-md-2 col-sm-3'><button class="btn btn-primary" onClick={handlePublish}>
                publish
              </button></div>:<div></div>}
          
          </div>
          <div><DeleteModal isOpen={deleteOpen} toggleDelete={handleViewDelete} /></div>
          <PaperInfo />
        </div>
        <br />
          {/*==== Judges Table ==== */}
        <div>
          <div class='row paper-details-judge-header'>
            <div class='col-md-2 col-sm-3 '>
              <h3>Judges: </h3>
            </div>
            <div class='col-md-5 col-sm-5 '>
              {user.status=='dabirconference' &&
              <div>
                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off" onClick={handleViewEditJudges}/>
                <label class="btn edit-judges-checked" for="btn-check-outlined">Edit Judges</label><br></br>
              </div>              

               }
            </div>
          </div>
          {
            editJudgesOpen && <AssignJudge assignedJudgeData={feedbacks}  />
      
          }
          {
            !editJudgesOpen && <JudgesTable assignedJudgeData={feedbacks} />
          }
        </div>
      
      </div>
    </div>
  )
}


export default MyPaperDetails;