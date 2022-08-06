import React, { useRef, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'
import Select from 'react-select';
import NavbarComp from './NavbarComp';
import {cities,countries, universities, degrees, majors, genders,fieldsData} from '../data/FormData'
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
    //const field =  useRef()
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
            "gender":gender.current.props.value.value,
            "SNN":SNN.current.value,
            "major":major.current.props.value.value,
            "degree":degree.current.props.value.value,
            "university":university.current.props.value.value,
            "country":country.current.props.value.value,
            "city":city.current.props.value.value,
            "field":field,
             "status":"standard",
             "subfields":subFieldList.toString(),
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
      // ======Change Field=====
      const [field, setField] = useState("");
      function ChangeField(e) {
        //when we change field we need to clear subfield
        setField(e)
        setSubFieldList([""])
      }
      //=========subfield input ===========
      
      const [subFieldList, setSubFieldList] = useState([""]);
      const dynamicSubField = subFieldList.length == 1 ? "one-author-select": "author-select";
      const handleSubFieldChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...subFieldList];
        list[index] = value;
        setSubFieldList(list);
      };

      const handleSubFieldRemove = (index) => {
        const list = [...subFieldList];
        list.splice(index, 1);
        setSubFieldList(list);
      };

      const handleSubFieldAdd = () => {
        setSubFieldList([...subFieldList, ""]);
      };
    //redirect if the user is not authenticated
  return ((user)? <Navigate to="/dashboard"/> :
        <div id='Signup'>
          <NavbarComp></NavbarComp>
          <Container  >
              <div class='row'>
                <div class='col-6'>
                  <Form onSubmit={handleLogin} className="w-100 shadow p-3 mb-5 signup-container">
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
                    <button class='btn signup-btn mr-2' type="submit" >Login</button>
                  </Form>
                </div>
                <div class='col-6'>
                  <Form onSubmit={handleRegister} className="w-100 shadow p-3 mb-5 signup-container">
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
                          defaultValue={{value: 'female', label: 'female'}}
                          />
                          <Form.Label>SNN:</Form.Label>
                          <Form.Control type="text" ref={SNN} required />
                          <Form.Label>Major:</Form.Label>
                          <Select ref={major}
                          value={majors.value}
                          options={majors}
                          defaultValue={{value: 'computer science', label: 'computer science'}}
                          />
                          <Form.Label>Degree:</Form.Label>
                          <Select ref={degree}
                          required
                          value={degrees.value}
                          options={degrees}
                          defaultValue={{value: 'BS', label: 'BS'}}
                          />
                          <Form.Label>University:</Form.Label>
                          <Select ref={university}
                          value={universities.value}
                          options={universities}
                          defaultValue={{value: 'University of Guilan', label: 'University of Guilan'}}
                          />
                          <Form.Label>Country:</Form.Label>
                          <Select ref={country}
                          value={countries.value}
                          options={countries}
                          defaultValue={{value: "iran", label: "iran"}}
                          />
                          <Form.Label>City:</Form.Label>
                          <Select ref={city}
                          required
                          value={cities.value}
                          options={cities}
                          defaultValue={{value: "rasht", label: "rasht"}}
                          />
                          <Form.Label>Field:</Form.Label>
                          {/* <Select 
                          required = 'required'
                          value={field}
                          options={fieldsData}
                          
                          onChange={(e) => ChangeField(e.target.value)}
                          /> */}
                          <select class="form-select edit-paper-select" aria-label="Default select example"
                          value={field} onChange={(e) => ChangeField(e.target.value)}
                          >
                            <option value="" selected disabled hidden>Choose field...</option>
                            {fieldsData.map(( item ) => (
                              <option value={item.value}> {item.label} </option>
                              )
                            )}
                          </select>                          
                          <Form.Label>SubField:</Form.Label>
                            {subFieldList.map((singlesubfield, index) => (
                                <div key={index} >
                                  <div class="input-group mb-3">
                                    <select class="form-select" 
                                      id={dynamicSubField}
                                      value={singlesubfield}
                                      onChange={(e) => handleSubFieldChange(e, index)}
                                      required
                                    >
                                      <option value="" selected disabled hidden>Choose subfield...</option>
                                      {field && fieldsData.find((single) => single.value ===field).subfields.map(( item ) => (
                                        <option value={item.value}> {item.label} </option>
                                        )
                                      )}
                                    </select>
                                    {subFieldList.length !== 1 && (
                                      <button class="btn btn-outline-secondary" type="button" id="button-remove"
                                        onClick={() => handleSubFieldRemove(index)}
                  
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                  <div>
                                    {/*  maximum number of authers is 4 */}
                                    {subFieldList.length - 1 === index && subFieldList.length < 4 && (
                                        <button
                                        class="btn btn-outline-secondary" type="button" id="button-addon2"
                                          onClick={handleSubFieldAdd}
                                        >
                                          Add
                                        </button>
                                    )}
                                  </div>
                                </div>
                              ))}                  
                          <Form.Label>Email:</Form.Label>
                          <Form.Control type="email" ref={email} required />
                        </Form.Group>
                        <button class='btn signup-btn mr-2' type="submit" >Signup</button>
                      </Form>
                </div>
              </div>
          </Container>
        </div>
      )
}  

