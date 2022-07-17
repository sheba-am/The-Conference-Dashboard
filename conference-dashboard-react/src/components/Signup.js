import React, { useRef, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'
import Select from 'react-select';
import NavbarComp from './NavbarComp';
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
    const genders = [
      {value: 'female', label: 'female'},
      {value: 'male', label: 'male'},
    ]
    const majors = [
      {value: 'computer science', label: 'computer science'},
      {value: 'medicine', label: 'medicine'},
      {value: 'chemistry', label: 'chemistry'},
      {value: 'architecture', label: 'architecture'},
      {value: 'art', label: 'art'},
    ]
    const degrees = [
      {value: 'BS', label: 'BS'},
      {value: 'BA', label: 'BA'},
      {value: 'MS', label: 'MS'},
      {value: 'MA', label: 'MA'},
      {value: 'PHD', label: 'PHD'},
    ]
    const universities = [
      {value: 'University of Guilan', label: 'University of Guilan'},
      {value: 'University of Isfahan', label: 'University of Isfahan'},
      {value: 'University of Tehran', label: 'University of Tehran'},
      {value: 'Sharif University of Technology', label: 'Sharif University of Technology'},
      {value: 'Shahid Beheshti University', label: 'Shahid Beheshti University'},
    ]
    const countries = [
      {value: "iran", label: "iran"}
    ]
    const cities = [
      {value: "rasht", label: "rasht"},
      {value: "tehran", label: "tehran"},
      {value: "isfahan", label: "isfahan"},
    ]
    const fields = [
      {value: "Computer Science", label: "Computer Science"},
      {value: "Medicine", label: "Medicine"},
    ]
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
            "gender":gender.current.props.value.value,
            "SNN":SNN.current.value,
            "major":major.current.props.value.value,
            "degree":degree.current.props.value.value,
            "university":university.current.props.value.value,
            "country":country.current.props.value.value,
            "city":city.current.props.value.value,
            "field":field.current.props.value.value,
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
            navigate('/dashboard')
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
            navigate('/dashboard')
          }
          
        })
        
      }

    //redirect if the user is not authenticated
  return ((user)? <Navigate to="/dashboard"/> :
        <div id='Signup'>
          <NavbarComp></NavbarComp>
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
                    <h2>Sign up</h2>
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
                    <Select ref={gender}
                    value={genders.value}
                    options={genders}
                    />
                    <Form.Label>SNN:</Form.Label>
                    <Form.Control type="text" ref={SNN} required />
                    <Form.Label>Major:</Form.Label>
                    <Select ref={major}
                    value={majors.value}
                    options={majors}
                    />
                    <Form.Label>Degree:</Form.Label>
                    <Select ref={degree}
                    value={degrees.value}
                    options={degrees}
                    />
                    <Form.Label>University:</Form.Label>
                    <Select ref={university}
                    value={universities.value}
                    options={universities}
                    />
                    <Form.Label>Country:</Form.Label>
                    <Select ref={country}
                    value={countries.value}
                    options={countries}
                    />
                    <Form.Label>City:</Form.Label>
                    <Select ref={city}
                    value={cities.value}
                    options={cities}
                    />
                    <Form.Label>Field:</Form.Label>
                    <Select ref={field}
                    value={fields.value}
                    options={fields}
                    />
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" ref={email} required />
                  </Form.Group>
                  <Button type="submit" className="mr-2">Submit</Button>
                </Form>
          </Container>
        </div>
      )
}  

