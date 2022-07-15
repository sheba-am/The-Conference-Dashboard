import React, {useEffect, useState} from "react";
import { Button, Container } from "react-bootstrap";
import Slideshow from "./Slideshow";
import axios from 'axios'
export default function HomePage() {

    const [papers, setPapers] = useState([]);
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
            
        }
      }
    useEffect(() => {
        const result = axios.post(
          'http://127.0.0.1:8000/viewpublished',
           config
        ).then((response) => response)
        .then((response) => {
            console.log(response)
          setPapers(response.data)
        })
      }, []);

      function handleClick(e) {
        e.preventDefault()
        const result = axios.post(
            'http://127.0.0.1:8000/getPaperFile',
            {
              'title':e.target.id
            },
            config
          ).then((response) => response)
          .then((response) => {
            console.log(response)
        })
        
      }
    return(
        <div>
            <Container>
            <Slideshow></Slideshow>
            
            <h2>Published Articles</h2>
            <div class="table-responsive-md">
        <table class="table papers-table justify-content-center table table-hover align-middle">
          <thead>
            <tr class="float-right">
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Authors</th>
              <th scope="col">Score</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            {papers?papers.map((item, index) => {
                      return (
                        <tr key={index}  >
                               <th scope="row">{index+1}</th>
                              <td>
                                {item.id}
                              </td> 
                              <td>
                                {item.title}
                              </td>
                              <td>
                                {item.authors}
                              </td>
                              <td>
                              <Button id={item.title} onClick={handleClick}>get file</Button>
                              </td>
                            </tr>
                      );
                    }):<h2>Loading...</h2>}
                    </tbody>
        </table>
      </div>
            </Container>
            
        </div>
    )
}