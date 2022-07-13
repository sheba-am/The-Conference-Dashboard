import React, { useRef, useState, useEffect, useContext} from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Navigate, Link } from "react-router-dom";
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
export default function AllPapers() {
    const [papers, setPapers] = useState();
    const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
            
        }
      }
      useEffect(() => {
        console.log("run")
        const result = axios.post(
          'http://127.0.0.1:8000/viewAllPapers'
          , config
        ).then((response) => response)
        .then((response) => {
          console.log(response.data)
          setPapers(response.data)
        })
      }, []);
      const showDetails = (selected) => {
        localStorage.setItem("selectedPaper", JSON.stringify(selected))
        // alert(a.id);
        console.log(selected)
        setSelectedPaper(selected)
      }
    return(
        <Container>
            {papers?
            <table class="table papers-table justify-content-center table table-hover align-middle">
            <thead>
              <tr class="float-right">
                {/* <th scope="col">#</th> */}
                <th scope="col">username</th>
                <th scope="col">authors</th>
                <th scope="col">judges</th>
                <th scope="col">field</th>            
              </tr>
            </thead>
            <tbody>
                {
                    papers.map((paper) => {
                        return(
                            <tr key={paper.title}  >
                                <td>{paper.title}</td>
                                <td>{paper.authors}</td>
                                <td>{paper.judges}</td>
                                <td>{paper.field}</td>
                                <Link to='/dashboard/paper-details' class="btn btn-primary" onClick={() => showDetails(paper)}>
                                    details
                                </Link> 
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
          </table>:
            <h1>Loading...</h1>}
        </Container>
    )

}