import React, {useState} from 'react'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
function Judge_Approval() {
    const user = JSON.parse(localStorage.getItem("user"))
    const paper = JSON.parse(localStorage.getItem("selectedPaper"))
    const [error, setError] = useState("")

    // ========== Submit ===========
    const handleSubmit = (e) => {
        //console.log('e',e)
        //evt.preventDefault()
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }
        const result = axios.post(
            'http://127.0.0.1:8000/acceptPaper',
            {'title':paper.title, 'username':user.username, 'approval':e}
            ,config
            ).then((response) => response)
            .then((response) => {
                if(response.status==200){
                    setError("Saved")
                }
                
        })

        
    }    
  return (
    <div class=' container details-of-paper'>
        <h2> Approve for Judging:</h2>
        <h5> Do you approve judging this paper?</h5>
        <div class='row'>
            <div class='col-2'>
                <button  class="btn mr-2" value='True' onClick={(e) => handleSubmit(e.target.value)} >Yes</button>
            </div>
            <div class='col-2'>
                <button  class="btn mr-2"  value='False' onClick={(e) => handleSubmit(e.target.value)} >No</button>
            </div>            
        </div>
        {error==="Saved" &&
            <Alert variant='success'>{error}</Alert>
        } 
        <br />
    </div>
  )
}

export default Judge_Approval