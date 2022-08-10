import React, {useState} from 'react'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
function DabirConference_Approval() {
    const user = JSON.parse(localStorage.getItem("user"))
    const paper = JSON.parse(localStorage.getItem("selectedPaper"))
    const [error, setError] = useState("")

    // ========== Submit ===========
    const handleSubmit = (e) => {
        console.log('e',e)
        //evt.preventDefault()
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }
        const result = axios.post(
            'http://127.0.0.1:8000/dabirConferenceApproval',
            {'title':paper.title, 'approval':e}
            ,config
            ).then((response) => response)
            .then((response) => {
                console.log(response.data)
                if(response.status==200){
                    setError("Saved")
                }
                
        })

        
    }    
  return (
    <div class=' container details-of-paper'>
        <h2> Dabir Conference Approval:</h2>
        <h5> Do you approve this paper?</h5>
        <div class='row'>
            <div class='col-3'>
                <button  class="btn mr-2" value='approved' onClick={(e) => handleSubmit(e.target.value)} >Approve</button>
            </div>
            <div class='col-3'>
                <button  class="btn mr-2"  value='rejected' onClick={(e) => handleSubmit(e.target.value)} >Reject</button>
            </div>            
        </div>
        {error==="Saved" &&
            <Alert variant='success'>{error}</Alert>
        } 
        <br />
    </div>
  )
}

export default DabirConference_Approval