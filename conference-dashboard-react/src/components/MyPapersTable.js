import React , {useContext, useState, useEffect}from 'react'

import { Link, Navigate } from 'react-router-dom';
import { PaperContext } from '../contexts/PaperContext';
import axios from 'axios'
import { Container } from 'react-bootstrap';
import {useTable, useGlobalFilter,Row, Tabs,Tab} from 'react-table';
import {columnsData} from '../data/columns';
import { GlobalFilter } from './GlobalFilter';
function MyPapersTable({ columns, data }) {
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
    const isTableEmpty = data && data.length >0 ? "table papers-table justify-content-center  table-hover align-middle" : "table papers-table-empty justify-content-center  table-hover align-middle";
    // Render the UI for your table
    return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
  
      <div id='papers-table' class="table-responsive-md">
        <table class={isTableEmpty} {...getTableProps()}>
          <thead class='papers-table-header'>
            {headerGroups.map(headerGroup => (
              <tr class="float-right " {...headerGroup.getHeaderGroupProps()}>
                <th scope="col-1" class='papers-table-header-item'>#</th>
                {headerGroup.headers.map(column => (
                  <th scope="col" class='papers-table-header-item' {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                  <th scope="col-1"  class='papers-table-header-item'>More</th>
                  {/* <th scope="col">Score</th> */}
                  {/* { user.status==="dabirconference" &&<th scope="col-1"  class='papers-table-header-item'>More</th>} */}
                  {/* { user.status==="standard" &&<th scope="col-1"  class='papers-table-header-item'>More</th>} */}
                  {/* {user.status==="judge" && <th scope="col-1"  class='papers-table-header-item'>Feedback</th>} */}
              </tr>
            ))}
          </thead>
          <tbody class="papers-table-body" {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row)
              return (
                <tr key={index} {...row.getRowProps()}>
                  <th scope="row" class='col-1 table-index'>{index+1}</th>
                  {row.cells.map(cell => {
                    return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                  
                  <td class='col-1'>
                  <Link to='/dashboard/paper-details' class="btn btn-primary details-btn" onClick={() => showDetails(row.original)}>
                        ...
                    </Link>
                  </td>
                  
        
                  {/* {
                    user.status==="judge"&&
                    <td class='col-1'>
                    <Link to='/dashboard/send-feedback' class="btn btn-primary  send-feedback-btn" onClick={() => showDetails(row.original)}>
                        Send Feedback
                    </Link>
                    </td>
                  } */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </>
    )
  }
export default MyPapersTable;