import React, { useRef, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'
export default function Signup() {
    const username =  useRef()
    const firstName =  useRef()
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
    const logUser = useRef()
    const logPass = useRef()
    const [error, setError] = useState("")
    const user = localStorage.getItem("user")
    let navigate = useNavigate(); 
    function handleRegister(e) {
        e.preventDefault()
        const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
        }
        const result = axios.post(
          'http://127.0.0.1:8000/signup',
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
             "status":"standard"
            }
          , config
        ).then((response) => response)
        .then((response) => {
          if (response.data === "username already registered"){
            console.log('yes')
            localStorage.removeItem('user')
            setError(response.data)
          }else{
            localStorage.setItem("user", JSON.stringify(response.data))
            navigate('/')
          }
        })
      }

      function handleLogin(e) {
        e.preventDefault() //prevent from refreshing
        const config = {
          headers: {
              'Content-type': 'application/json',
          }
        }
      
        const result = axios.post(
          'http://127.0.0.1:8000/login',
          {"username":logUser.current.value, "password":logPass.current.value}
          , config
        ).then((response) => response)
        .then((response) => {

          if (response.data === "username and password don't match"){
            console.log('yes')
            localStorage.removeItem('user')
            setError(response.data)
          }else{
            localStorage.setItem("user", JSON.stringify(response.data))
            navigate('/')
          }
          
        })
        
      }

    //redirect if the user is not authenticated
  return ((user)? <Navigate to="/"/> :
        <Container className="align-itms-center d-flex" style={{ height: 'auto' }}>
          <Form onSubmit={handleLogin} className="w-100 shadow p-3 mb-5 bg-white rounded">
            <Form.Group >
              <h2>Login</h2>
              {error==="username and password don't match" && 
                 <Alert variant='danger'>{error}</Alert>
                }
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" ref={logUser} required />
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={logPass} required />
            </Form.Group>   
            <Button type="submit" className="mr-2">Login</Button>
          </Form>
          <Form onSubmit={handleRegister} className="w-100 shadow p-3 mb-5 bg-white rounded">
            <Form.Group >
              <h2>Signup</h2>
              {error==="username already registered" && 
                    <Alert variant='danger'>{error}</Alert>
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
            <Button type="submit" className="mr-2">Sign up</Button>
          </Form>
        </Container>
      )
}  

