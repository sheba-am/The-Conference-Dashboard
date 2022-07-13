import React, { useRef, useState, useEffect} from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'
export default function AllUsers() {
    const [users, setUsers] = useState();
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
            
        }
      }
      useEffect(() => {
        console.log("run")
        const result = axios.post(
          'http://127.0.0.1:8000/getUsers'
          , config
        ).then((response) => response)
        .then((response) => {
          console.log(response.data)
          setUsers(response.data)
        })
      }, []);
      function handleClick(e) {
        e.preventDefault()
        const result = axios.post(
            'http://127.0.0.1:8000/promoteToJudge',
            {'username':e.target.id}
            , config
          ).then((response) => response)
          .then((response) => {
            setUsers(response.data)
          })
      }
    return(
        <Container>
            {users?
            <table class="table papers-table justify-content-center table table-hover align-middle">
            <thead>
              <tr class="float-right">
                {/* <th scope="col">#</th> */}
                <th scope="col">username</th>
                <th scope="col">status</th>
                <th scope="col">field</th>            
              </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => {
                        return(
                            <tr key={user.username}  >
                                <td>{user.username}</td>
                                <td>{user.status}</td>
                                <td>{user.field}</td>
                                {user.status !== 'judge'? <Button id={user.username} onClick={handleClick}>Promote to judge</Button>: <div></div>}
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
          </table>:
            <h1>Loading...</h1>}
        </Container>
    )

}