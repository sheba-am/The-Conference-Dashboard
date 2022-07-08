import React from 'react'
import { PapersData } from '../components/PapersData';
import { Link } from 'react-router-dom';
//import ReactTable from "react-table";
const NewPaper = props => {
  const Papers = props.isOpen ? "new-paper-content open" : "new-paper-content";
  return (
    <div className={Papers}>
        <h3>Add new paper</h3>

        <form class="edit-info-form">
        
            <div class="mb-3">

                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}


export default NewPaper;