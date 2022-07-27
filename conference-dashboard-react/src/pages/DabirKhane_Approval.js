import React,{useState} from 'react'
import {DabirKhaneApproval} from '../data/FormData'
import axios from 'axios'
function DabirKhane_Approval({paper}) {
    //const [thepaper, setPaper] = useState(JSON.parse(localStorage.getItem("selectedPaper"))); //retrieve the object
    const dabirKhaneArr =paper.dabirKhane? paper.dabirKhane.split(':'):[' ','']
    const [approval, setApproval] = useState(dabirKhaneArr[0]);
    const [approvalMsg, setApprovalMsg] = useState(dabirKhaneArr[1]);
    console.log('array',dabirKhaneArr)

    // ========== Submit ===========
    const handleSubmit = (evt) => {
        //evt.preventDefault()
        var approvalForServer=approval+':'+approvalMsg
        // var approvalForServer=approval==='revise'?approval+':'+approvalMsg:approval+':'
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }
        const result = axios.post(
            'http://127.0.0.1:8000/dabirkhaneApproval',
            {'title':paper.title,'approval':approvalForServer}
            ,config
            ).then((response) => response)
            .then((response) => {
                //put the new data into local storage 
                localStorage.setItem("selectedPaper", JSON.stringify(response.data))
                
        })

        
    }
    //when there's any state but revise clear the message box
    function handleApproval(e) {
        setApproval(e)
        if (e !=='revise'){
            setApprovalMsg('')
        }

      };     
    return (
    <div class=' container details-of-paper'>
        <br/>
        <form onSubmit={handleSubmit}>
            <div class='row'>
                <div class='col-2'>
                    status
                </div>
                <div class='col-6'>
                    <select class="form-select edit-paper-select" aria-label="Default select example"
                        value={approval} onChange={(e) => handleApproval(e.target.value)}
                        >
                        <option defaultValue={approval} disabled hidden></option>
                        {DabirKhaneApproval.map(( item ) => (
                            <option value={item.value}> {item.label} </option>
                            )
                        )}
                    </select>
            
                </div>
            </div>
            <br/>
            <div class='row'>
                <div class='col-2'>
                    message
                </div>
                    <div class='col'>
                        <textarea class="form-control"  rows="3" value={approvalMsg}
                        onChange={e => setApprovalMsg(e.target.value)}
                        disabled={approval !=='revise'}></textarea>
                    </div>
            </div>
            <br />
            <button id="button-addon2" class="btn btn-primary" type="submit">Save Changes</button>
        </form>        
        <br/>
    </div>
    )
}

export default DabirKhane_Approval