import React, { useRef, useState, useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
export default function EditInfo(props) {
    const EditInfo = props.isOpen ? "new-paper-content open" : "new-paper-content";
    const user = JSON.parse(localStorage.getItem('user'))
    const username =  useRef("Hello")
    const firstName =  useRef("Hi again")
    const lastName =  useRef()
    const gender =  useRef()
    const SNN =  useRef()
    const major =  useRef()
    const degree =  useRef()
    const university =  useRef()
    const country =  useRef()
    const city =  useRef()
    const field =  useRef()
    const email =  useRef()
    const password =  useRef()
    const [error, setError] = useState("")
    //initialize form fields
    useEffect(() => {
        username.current.value = user['username']
        // password.current.value = user['password']
        firstName.current.value = user['first_name']
        lastName.current.value = user['last_name']
        gender.current.value = user['gender']
        SNN.current.value = user['SNN']
        major.current.value = user['major']
        degree.current.value = user['degree']
        university.current.value = user['university']
        country.current.value = user['country']
        city.current.value = user['city']
        email.current.value = user['email']

      });

    function handleClick(e) {
        e.preventDefault()
        const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
        }

        const result = axios.post(
            'http://127.0.0.1:8000/editInfo',
            {"username":username.current.value,
             "password":password.current.value,
              "email":email.current.value,
               "first_name":firstName.current.value,
               "last_name":lastName.current.value,
               "gender":gender.current.value,
               "SNN":SNN.current.value,
               "major":major.current.value,
               "degree":degree.current.value,
               "university":university.current.value,
               "country":country.current.value,
               "city":city.current.value,
               "field":field.current.value,
              }
            , config
          ).then((response) => response)
          .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data))
              setError("Info Updated successfully")
        })
    }
    return(
          <div className={EditInfo}>
            <Container>
            <Form onSubmit={handleClick} className="w-100 shadow p-3 mb-5 bg-white rounded">
                <Form.Group >
                  <h2>Edit Info</h2>
                  {error==="Info Updated successfully" &&
                    <Alert variant='success'>{error}</Alert>
                    }
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" ref={username} required />
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" ref={password} required />
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="text" ref={firstName} required />
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type="text" ref={lastName} required />
                  <Form.Label>Gender:</Form.Label>
                  <Form.Control type="text" ref={gender} required />
                  <Form.Label>SNN:</Form.Label>
                  <Form.Control type="text" ref={SNN} required />
                  <Form.Label>Major:</Form.Label>
                  <Form.Control type="text" ref={major} required />
                  <Form.Label>Degree:</Form.Label>
                  <Form.Control type="text" ref={degree} required />
                  <Form.Label>University:</Form.Label>
                  <Form.Control type="text" ref={university} required />
                  <Form.Label>Country:</Form.Label>
                  <Form.Control type="text" ref={country} required />
                  <Form.Label>City:</Form.Label>
                  <Form.Control type="text" ref={city} required />
                  <Form.Label>Field:</Form.Label>
                  <Form.Control type="text" ref={field} required />
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" ref={email} required />
                </Form.Group>
                <Button type="submit" className="mr-2">Submit</Button>
              </Form>
            </Container>
          </div>
    )
}