import React, { useRef, useState, useEffect} from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'
export default function AllUsers(props) {
    const AllUsersCss = props.isOpen ? "content open" : "content";
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
        <div className={AllUsersCss}>
          <Container>
              <h3>Manage Users</h3>
              {users?
              <div id='papers-table'class="table-responsive-md">
                <table  class="table papers-table justify-content-center table table-hover align-middle">
                <thead class='papers-table-header'>
                  <tr class="float-right">
                    <th scope="col" class='papers-table-header-item'>#</th>
                    <th scope="col" class='papers-table-header-item'>username</th>
                    <th scope="col" class='papers-table-header-item'>status</th>
                    <th scope="col" class='papers-table-header-item'>field</th>
                    <th scope="col" class='papers-table-header-item'>promote</th>
                  </tr>
                </thead>
                <tbody class="papers-table-body">
                    {
                        users.map((user,index) => {
                            return(
                                <tr key={user.username}  >
                                    <th scope="row" class='table-index'>{index+1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.status}</td>
                                    <td>{user.field}</td>
                                    <td>{user.status !== 'judge' && <button class='btn send-feedback-btn' id={user.username} onClick={handleClick}>Promote to judge</button>}</td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
                            </table>
              </div>:
              <h1>Loading...</h1>}
          </Container>
        </div>
    )

}