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

function PaperInfo() {
    const [paper, setPaper] = useState(JSON.parse(localStorage.getItem("selectedPaper"))); //retrieve the object
    const user = JSON.parse(localStorage.getItem("user"))

    function getFile(e) {
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
   
  return (
    <div>

            <div>
                id:{paper.id}
            </div>      
            <div>
              Paper Title: {paper.title}
            </div>
            <div>
              Paper Authors: {paper.authors}
            </div>
            <div>
              Field: {paper.field}
            </div>
            <div>
              Subfield: {paper.subfields}
            </div>                        
            <div>
              {/* Sent Date: {paper.send_date} */}
            </div>
            <div>
              Paper File: <button class="btn btn-primary" onClick={getFile}>get file</button>
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
  )
}

export default PaperInfo