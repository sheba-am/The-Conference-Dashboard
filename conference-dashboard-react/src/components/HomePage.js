import React, {useEffect, useState} from "react";
import { Button, Container } from "react-bootstrap";
import Slideshow from "./Slideshow";
import Nav from 'react-bootstrap/Nav';
import Navbar from './NavbarComp';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import NavbarComp from "./NavbarComp";
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
        
            <div id='Homepage'>
              <NavbarComp></NavbarComp>
              <Container >
                {/* <Navbar></Navbar> */}
                <Carousel style={{paddingTop:'20px'}}>
                  <Carousel.Item interval={1500}>
                    <img
                      className="d-block w-100"
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                      alt="Image One"
                    />
                    <Carousel.Caption>
                      {/* <h3>Label for first slide</h3>
                      <p>Sample Text for Image One</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={500}>
                    <img
                      className="d-block w-100"
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                      alt="Image Two"
                    />
                    <Carousel.Caption>
                      {/* <h3>Label for second slide</h3>
                      <p>Sample Text for Image Two</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              
              <h2 style={{paddingTop:'20px'}}>Published Articles</h2>
              <div id='papers-table' class="table-responsive-md">
                      <table style={{padding:'50px'}}class="table papers-table justify-content-center table table-hover align-middle">
                        <thead class='papers-table-header'>
                          <tr class="float-right">
                            <th scope="col" class='papers-table-header-item'>#</th>
                            <th scope="col" class='papers-table-header-item'>Title</th>
                            <th scope="col" class='papers-table-header-item'>Authors</th>
                            <th scope="col" class='papers-table-header-item'>File</th>
                          </tr>
                        </thead>
                        <tbody class="papers-table-body">
                          {papers?papers.map((item, index) => {
                                    return (
                                      <tr key={index}  >
                                            <th scope="row"  class='table-index'>{index+1}</th>
                                            <td>
                                              {item.title}
                                            </td>
                                            <td>
                                              {item.authors}
                                            </td>
                                            <td>
                                              <button class='btn send-feedback-btn' id={item.title} onClick={handleClick}>
                                                get file
                                              </button>
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