import React, { useRef, useState, useEffect } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select';
export default function EditInfo(props) {
    const EditInfo = props.isOpen ? "new-paper-content open" : "new-paper-content";
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
        console.log(major.current.props.value.value)
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
            <Container>
            <Form onSubmit={handleClick} className="w-100 shadow p-3 mb-5 bg-white rounded">
                <Form.Group >
                  <h2>Edit Info</h2>
                  {error==="Info Updated successfully" &&
                    <Alert variant='success'>{error}</Alert>
                    }
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" ref={username} readOnly="readonly" required />
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
                  defaultValue={{value: user['gender'], label: user['gender']}}
                  />
                  <Form.Label>SNN:</Form.Label>
                  <Form.Control type="text" ref={SNN} required />
                  <Form.Label>Major:</Form.Label>
                  <Select id="major" ref={major}
                  value={majors.value}
                  options={majors}
                  defaultValue={{value: user['major'], label: user['major']}}
                  />
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
                <Button type="submit" className="mr-2">Submit</Button>
              </Form>
            </Container>
          </div>
    )
}