import React , {useContext, useState, useEffect}from 'react'

import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import {useTable, useGlobalFilter} from 'react-table';
import {columnsData} from '../data/columns';
import { GlobalFilter } from './GlobalFilter';
//get papers


  //csss changes when sidebar is open
function Table({ columns, data }) {
  const user = JSON.parse(localStorage.getItem("user"))

  const showDetails = (selected) => {
    localStorage.setItem("selectedPaper", JSON.stringify(selected))
    // alert(a.id);
    console.log("context",selected)
    // setSelectedPaper(selected)
  }
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state, 
    setGlobalFilter
  } = useTable({
    columns,
    data,
  },useGlobalFilter)

  const {globalFilter} = state
  // Render the UI for your table
  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th>#</th>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
              {/* <th scope="col">Score</th> */}
              { user.status==="admin" &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
              { user.status==="standard" &&<th scope="col-1"  class='papers-table-header-item'>More</th>}
              {user.status==="judge" && <th scope="col-1"  class='papers-table-header-item'>Feedback</th>}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              <td>{i+1}</td>
              {row.cells.map(cell => {
                return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                )
              })}
              {  user.status==="admin" &&
                <td class='col-1'>
                <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                      ...
                  </Link>
                </td>
                // console.log(row.original)//this is replacement of item 
              }
              { user.status==="standard" &&
                <td class='col-1'>
                <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                      ...
                  </Link>
                </td>
              }                                
            
              {
                user.status==="judge"&&
                <td class='col-1'>
                <Link to='/dashboard/send-feedback' class="btn btn-primary  send-feedback-btn" onClick={() => showDetails(row.original)}>
                    Send Feedback
                </Link>
                </td>
              }
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
      
  }
}

function Papers(props) {
  const user = JSON.parse(localStorage.getItem("user"))
  const PapersCss = props.isOpen ? "content open" : "content";
  const {selectedPaper,setSelectedPaper} =useContext(PaperContext)
  const [papersData, setPapersData] = useState()

  useEffect(() => {
    if(user){
      //get all the papers for admin and assigned papers for judge and standard user
      var request = ''
      if(user.status=='admin'){
        request = "viewAllPapers"
      }else{
        request = "viewPapers"
      }
      const result = axios.post(
        'http://127.0.0.1:8000/' + request,
        {'username': user.username}
        , config
      ).then((response) => response)
      .then((response) => {
        setPapersData(response.data)
        console.log(papersData)
        localStorage.setItem("papers", JSON.stringify(papersData))
      })
    } 
  }, [])
  const isTableEmpty = papersData && papersData.length >0 ? "table papers-table justify-content-center  table-hover align-middle" : "table papers-table-empty justify-content-center  table-hover align-middle";
  
  const columns = React.useMemo(
    () => columnsData,[]
  )

  //redirect if the user is not authenticated
  return ((!user)? <Navigate to="/signup"/> :
    <div  className={PapersCss}>
      <Container>
        <h3> Papers </h3>
        
          {user.status==='standard'?<Link to='/dashboard/new-paper'  class="btn add-paper-btn" >
          +New Paper
          </Link>:<div></div>}
      
        {/* ========The Table======= */}
        {papersData ? <Table columns={columns} data={papersData} />:<h2>Loading...</h2>}

      </Container>

    </div>
  )
}
export default Papers;