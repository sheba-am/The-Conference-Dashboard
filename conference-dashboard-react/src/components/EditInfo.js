import React, { useRef, useState, useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select';
import {fields, cities,countries, universities, degrees, majors, genders} from '../data/FormData'
export default function EditInfo(props) {
    const EditInfo = props.isOpen ? "content open" : "content";
    const user = JSON.parse(localStorage.getItem('user'))
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
        field.current.value = user['field']

      });

    function handleClick(e) {
        e.preventDefault()
        const config = {
          headers: {
              'Content-type': 'application/json',
              
          }
        }
        // console.log(major.current.props.value.value)
        const result = axios.post(
            'http://127.0.0.1:8000/editInfo',
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
            <Container id='edit-info'>
              <Form onSubmit={handleClick} id='edit-info-form' className="w-100 shadow p-3 mb-5 bg-white rounded ">
                <Form.Group >
                  <h2>Edit Info</h2>
                  {error==="Info Updated successfully" &&
                    <Alert variant='success'>{error}</Alert>
                    }
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" ref={username} disabled required />
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" ref={password} required />
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="text" ref={firstName} required />
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type="text" ref={lastName} required />
                  <Form.Label>Gender:</Form.Label>
                  <Select ref={gender} id='gender'
                  value={genders.value}
                  options={genders}
                  defaultValue={{value: user['gender'], label: user['gender']}}
                  />
                  
                  {/* <select class="form-select edit-paper-select" 
                  ref={gender}  
                  >
                    <option defaultValue={user['gender']} disabled hidden></option>
                   
                    {genders.map(( item ) => (
                      <option value={item.value}> {item.label} </option>
                      )
                    )}                      
                    
                  </select>                   */}
                  <Form.Label>SNN:</Form.Label>
                  <Form.Control type="text" ref={SNN} required />
                  <Form.Label>Major:</Form.Label>
                  <Select id="major" ref={major}
                  value={majors.value}
                  options={majors}
                  defaultValue={{value: user['major'], label: user['major']}}
                  />
                  {/* <select class="form-select edit-paper-select" id="major"
                  value={majors.value} ref={major}  
                  >
                    <option defaultValue={user['major']} disabled hidden></option>
                   
                    {majors.map(( item ) => (
                      <option value={item.value}> {item.label} </option>
                      )
                    )}                      
                    
                  </select>                    */}
                  <Form.Label>Degree:</Form.Label>
                  <Select ref={degree}
                  value={degrees.value}
                  options={degrees}
                  defaultValue={{value: user['degree'], label: user['degree']}}
                  />
                  <Form.Label>University:</Form.Label>
                  <Select ref={university}
                  value={universities.value}
                  options={universities}
                  defaultValue={{value: user['university'], label: user['university']}}
                  />
                  <Form.Label>Country:</Form.Label>
                  <Select ref={country}
                  value={countries.value}
                  options={countries}
                  defaultValue={{value: "iran", label: "iran"}}
                  />
                  <Form.Label>City:</Form.Label>
                  <Select ref={city}
                  value={cities.value}
                  options={cities}
                  defaultValue={{value: user['city'], label: user['city']}}
                  />
                  <Form.Label>Field:</Form.Label>
                  <Select ref={field}
                  value={fields.value}
                  options={fields}
                  defaultValue={{value: user['field'], label: user['field']}}
                  />
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" ref={email} required />
                </Form.Group>
                <button type="submit" class="btn btn-submit">Submit</button>
              </Form>
            </Container>
          </div>
    )
}