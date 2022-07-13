import React, { useRef, useState, useEffect, useContext } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
export default function AssignJudge() {
    const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
    const [judges,setJudges] = useState()

    useEffect(() => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const result = axios.post(
              'http://127.0.0.1:8000/viewJudges',
              {'field':selectedPaper.field}
              ,config
            ).then((response) => response)
            .then((response) => {
                setJudges(response.data)
          })

      },[]);

      const handleSubmit = (evt) => {
        let selectedJudges = ""
        evt.preventDefault();
        for (let i = 0; i < judges.length; i++) {
            var checkbox = document.getElementById(judges[i].username);
            if(checkbox.checked){
                selectedJudges += checkbox.value + "," 
            }
          }
          const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
          }
          const result = axios.post(
              'http://127.0.0.1:8000/assignJudge',
              {'judges': selectedJudges, 'title':selectedPaper.title}
              ,config
            ).then((response) => response)
            .then((response) => {
                console.log(response)
          })
      }

      return (
        <Container>
           <h3>Title:{selectedPaper.title}</h3>
           <form onSubmit={handleSubmit}>
           {
            judges? judges.map((item) => {
                return(
                    <div>
                        <input type="checkbox" id={item.username} name={item.username} value={item.username}/>
                        <label for={item.username}> {item.username}</label><br/>
                    </div>
                )
            }

            ):<div></div>
           }
                <button class="btn btn-primary" type="submit">Assign Judges</button>
            </form>
           
        </Container>
     )
}