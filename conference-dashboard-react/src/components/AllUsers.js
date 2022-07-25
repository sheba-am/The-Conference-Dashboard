import React, { useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import {userStatusData, fields} from '../data/FormData'
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
      function ChangeRole(username, e) {
        // console.log("e",e)
        // console.log('username',username)
        // e.preventDefault()
        const result = axios.post(
          'http://127.0.0.1:8000/promote',
          {'username':username,'status':e}
          , config
        ).then((response) => response)
        .then((response) => {
          setUsers(response.data)
          console.log(response.data)
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
                    <th scope="col" class='papers-table-header-item'>change role</th>
                  </tr>
                </thead>
                <tbody class="papers-table-body">
                    {
                        users.map((user,index) => {
                            return(
                                user.status!=='dabirConference' &&<tr key={user.username}  >
                                    <th scope="row" class='table-index'>{index+1}</th>
                                    <td>{user.username}</td>
                                    
                                      { 
                                      //userStatusData.find(userStatus => userStatus.value === user.status)
                                      userStatusData.map((statusData,index)=>(statusData.value===user.status &&<td key={index}> {statusData.label} </td>))
                                      }
                                    
                                    { 
                                      //userStatusData.find(userStatus => userStatus.value === user.status)
                                      fields.map((singelField,index)=>(singelField.value===user.field &&<td key={index}> {singelField.label} </td>))
                                      }
                                    <td>
                                    <select class="form-select edit-paper-select" 
                                      value={user.status} onChange={(e) => ChangeRole(user.username,e.target.value)}
                                      >
                                        <option defaultValue={user.status} disabled hidden></option>
                                        {userStatusData.map(( item ) => (
                                          <option value={item.value}> {item.label} </option>
                                          )
                                        )}
                                    </select>
                                    </td>
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