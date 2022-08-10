import React, {useContext, useEffect, useState} from 'react'

import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import { MdArrowBackIosNew } from "react-icons/md";
import PaperInfo from './PaperInfo';
import { FeedbackQuestions } from '../data/FormData';
import Judge_Approval from '../pages/Judge_Approval';
export default function SendFeedback (props) {
  const SendFeedbackCss = props.isOpen ? "content open" : "content";
    var paper = JSON.parse(localStorage.getItem("selectedPaper")); //retrieve the object
    var user = JSON.parse(localStorage.getItem("user"));

    const [feedback, setFeedback] = useState();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
          
      }
    }
    useEffect(() => {
      const viewfeedback = axios.post(
        'http://127.0.0.1:8000/viewFeedback',
        {
          'title':paper.title,
          'username':user.username
        }
        , config
      ).then((response) => response)
      .then((response) => {
        setFeedback(response.data)
        console.log('viewfeedback', response.data)
      })
    }, []);
    console.log(feedback)
    var timeLeft = feedback && feedback.timeLeft.split(',')

    var scoresArr =feedback?feedback.scores: new Array(FeedbackQuestions.length).fill(0) 
    const[scores,setScores]=useState(scoresArr)
    const [error, setError] = useState("")
    const [description,setDescription] =feedback?useState(feedback.scores):useState("")
    const handleScoreChange = (e, index) => {
      const { value } = e.target;
      const list = [...scores];
      list[index] = value;
      setScores(list);
    };

    function handleSubmit(e) {
        e.preventDefault()
        let scores_string = scores.toString();
        console.log(paper.title, user.username)
        console.log(scores_string)
        console.log(description)

        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const result = axios.post(
              'http://127.0.0.1:8000/sendFeedback',
              {"title":paper.title,
               "username":user.username,
               "scores":scores_string,
               "description":description,
                // "score":score.current.value,
                // "status":status.current.value,
                // "description":description.current.value
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
              <div class="ml-auto">
                Days Left: {timeLeft && timeLeft[0]}
              </div>
              <PaperInfo />
              <br />
            </div>
            <br />
            {(feedback && feedback.accepted !==true) &&<Judge_Approval />}
            <div class='container details-of-paper'>
              {(feedback && feedback.accepted ===true) && <form onSubmit={handleSubmit}>
                <h2 className='send-feedback-header'>Send Feedback</h2>
                 
                  {/* ======Questions===== */ 
                    FeedbackQuestions.map((singleQ,index) => (
                    <div key={index}>
                      <br />
                      <label >{singleQ.label}</label>
                      <div class='row mb-3'>
                        <label class='col-1 col-form-label'>score:</label>
                        <div class='col-sm-11'>
                          <input type="number" id={singleQ.value}class=" form-control" onChange={(e) => handleScoreChange(e, index)} required/>
                        </div>
                      </div>
                    </div>
                      ))
                  }  
                  <br />
                  <div class='row mb-3'>
                    <label class='col-2 col-form-label'>Description:</label>
                    <div class='col-sm-10'>
                      <textarea class="form-control"  rows="3" value={description}
                          onChange={e => setDescription(e.target.value)}></textarea>                    
                    </div>
                  </div>
                <button type="submit" class="btn mr-2">Send Feedback</button>
                {error==="Your feedback has been submitted." &&
                    <Alert variant='success'>{error}</Alert>
                  }  
                <br />              
              </form>}
            </div>
        </div>
    )
}