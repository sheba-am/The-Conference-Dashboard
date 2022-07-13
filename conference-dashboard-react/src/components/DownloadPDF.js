import axios from 'axios';
import React from "react";
//import {Button} from 'react-bootstrap'
export default function DownloadPDF() {

    function handleClick(e) {
        e.preventDefault()
        const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
        }
    
    const result = axios.get(
        'http://127.0.0.1:8000/getPaperFile',
         config
      ).then((response) => response)
      .then((response) => {
          console.log(response)
    })
    }
    return(
        <button onClick={handleClick}>Submit</button>
    )
}