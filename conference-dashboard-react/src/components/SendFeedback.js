import React, {useContext, useEffect, useState, useRef} from 'react'

import { Link, Navigate } from "react-router-dom";
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { MdArrowBackIosNew } from "react-icons/md";
export default function SendFeedback (props) {
  const SendFeedbackCss = props.isOpen ? "papers-content open" : "papers-content";
    var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    var user = JSON.parse(localStorage.getItem("user"));
    const score =  useRef()
    const status =  useRef()
    const description =  useRef()
    const [error, setError] = useState("")
    function handleClick(e) {
        e.preventDefault()
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const result = axios.post(
              'http://127.0.0.1:8000/sendFeedback',
              {"title":paper.title,
               "username":user.username,
                "score":score.current.value,
                "status":status.current.value,
                "description":description.current.value
                }
              , config
            ).then((response) => response)
            .then((response) => {
                if(response.status==200){
                    setError("Your feedback has been submitted.")
                }
                
          })
    }
    return(
        <div className={SendFeedbackCss}>
            <div class='container details-of-paper'>
              <div class='row'>
                  <div class='col-lg-1 col-md-1 col-sm-2 '>
                    <Link to='/dashboard/papers' class="btn btn-primary">
                        <MdArrowBackIosNew />
                    </Link>
                  </div>
              </div>
              <div>
                Paper Title: {paper.title}
              </div>
              <div>
                Paper Authors: {paper.authors}
              </div>
              <div>
                Paper File: <button  class="btn btn-primary" onClick={handleClick}>get file</button>
              </div>
              <div>
                number of pages: {paper.NOM}
              </div>
              <div>
                Abstract: {paper.summary}
              </div>
            </div>
            
            <div class='container details-of-paper'>
              <Form onSubmit={handleClick} >
              <Form.Group >
                <h2 className='send-feedback-header'>Send Feedback</h2>
                {error==="Your feedback has been submitted." &&
                    <Alert variant='success'>{error}</Alert>
                  }
                <Form.Label>Score: </Form.Label>
                <Form.Control type="text" ref={score} required />
                <Form.Label>Status:</Form.Label>
                <Form.Control type="text" ref={status} required />
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" ref={description} id='description' rows={3} />
              </Form.Group>
              <Button type="submit" className="mr-2">Send Feedback</Button>
              </Form>
            </div>
        </div>
    )
}