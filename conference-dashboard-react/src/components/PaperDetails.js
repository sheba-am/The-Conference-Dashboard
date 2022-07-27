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

function PaperDetails(props) {
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
      {/* ==== The Paper Details ==== */}
      <div class="container" >
        <PaperInfo />
        <br />
        <DabirKhane_Approval paper={paper}/>
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


export default PaperDetails;